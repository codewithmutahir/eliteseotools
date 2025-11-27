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

    if (text.length > 3000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 3000 characters.' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'user',
          content: prompts.expand(text),
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const result = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Expand API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to expand text' },
      { status: 500 }
    );
  }
}

