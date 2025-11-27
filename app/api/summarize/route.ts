import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODEL } from '@/lib/openai';
import { prompts } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 10000 characters.' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'user',
          content: prompts.summarize(text),
        },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    const result = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Summarize API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to summarize text' },
      { status: 500 }
    );
  }
}

