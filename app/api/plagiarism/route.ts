import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODEL } from '@/lib/openai';
import { 
  analyzePlagiarism, 
  PlagiarismResult,
  SuspiciousPhrase 
} from '@/lib/plagiarismUtils';

// Extended result with AI suggestions
interface EnhancedPlagiarismResult extends PlagiarismResult {
  aiAnalysis?: {
    additionalInsights: string;
    rephrasingSuggestions: { original: string; suggestion: string }[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const { text, includeAI = true } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 10,000 characters.' },
        { status: 400 }
      );
    }

    // Perform algorithmic analysis
    const algorithmicResult = analyzePlagiarism(text);
    
    // Prepare the enhanced result
    const result: EnhancedPlagiarismResult = {
      ...algorithmicResult
    };

    // If AI analysis requested and there are suspicious phrases, get rephrasing suggestions
    if (includeAI && algorithmicResult.suspiciousPhrases.length > 0) {
      try {
        const topSuspicious = algorithmicResult.suspiciousPhrases
          .filter(p => p.severity !== 'low')
          .slice(0, 5);
        
        if (topSuspicious.length > 0) {
          const phrasesToRephrase = topSuspicious.map(p => p.text).join('\n- ');
          
          const completion = await openai.chat.completions.create({
            model: AI_MODEL,
            messages: [
              {
                role: 'system',
                content: `You are a writing assistant that helps rephrase suspicious or potentially plagiarized phrases into original content. 
                
For each phrase, provide a natural, original alternative that conveys the same meaning but sounds more authentic and personal.

Respond in JSON format only:
{
  "insights": "Brief analysis of the writing patterns detected",
  "suggestions": [
    {"original": "phrase 1", "suggestion": "rephrased version 1"},
    {"original": "phrase 2", "suggestion": "rephrased version 2"}
  ]
}`
              },
              {
                role: 'user',
                content: `Analyze and rephrase these potentially suspicious phrases:\n- ${phrasesToRephrase}`
              }
            ],
            temperature: 0.7,
            max_tokens: 1000,
          });

          const aiResponse = completion.choices[0]?.message?.content || '';
          
          try {
            // Try to parse JSON response
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              result.aiAnalysis = {
                additionalInsights: parsed.insights || '',
                rephrasingSuggestions: parsed.suggestions || []
              };
              
              // Add suggestions to suspicious phrases
              if (parsed.suggestions) {
                for (const suggestion of parsed.suggestions) {
                  const matchingPhrase = result.suspiciousPhrases.find(
                    p => p.text.toLowerCase().includes(suggestion.original.toLowerCase()) ||
                         suggestion.original.toLowerCase().includes(p.text.toLowerCase())
                  );
                  if (matchingPhrase) {
                    matchingPhrase.suggestion = suggestion.suggestion;
                  }
                }
              }
            }
          } catch (parseError) {
            // If JSON parsing fails, just include raw insights
            result.aiAnalysis = {
              additionalInsights: aiResponse,
              rephrasingSuggestions: []
            };
          }
        }
      } catch (aiError) {
        // AI enhancement failed, but algorithmic analysis still valid
        console.warn('AI enhancement failed:', aiError);
      }
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Plagiarism check API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check for plagiarism' },
      { status: 500 }
    );
  }
}
