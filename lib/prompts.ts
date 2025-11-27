// AI instruction templates for different tools

export const prompts = {
  paraphrase: (text: string) => `Paraphrase the following text while maintaining its original meaning. Make it sound natural and fluent:

${text}`,

  grammarCheck: (text: string) => `Act as a grammar checker. Analyze the following text and:
1. Identify all grammar, spelling, and punctuation errors
2. Provide the corrected version
3. List the errors found with explanations

Text to check:
${text}

Format your response as:
CORRECTED TEXT:
[corrected version]

ERRORS FOUND:
- [error 1]: [explanation]
- [error 2]: [explanation]`,

  summarize: (text: string) => `Summarize the following text in a concise manner, capturing the main points and key ideas:

${text}`,

  rewrite: (text: string) => `Rewrite the following article completely while keeping the same meaning. Use different sentence structures, synonyms, and phrasing to make it unique:

${text}`,

  expand: (text: string) => `Expand and improve the following text. Make it longer, more detailed, and more engaging while maintaining the original message:

${text}`,

  plagiarismCheck: (text: string) => `Analyze the following text for potential plagiarism indicators:
1. Identify if the writing style is consistent throughout
2. Check for phrases that seem copied or overly formal
3. Detect sudden changes in vocabulary or tone
4. Flag any suspicious patterns

Text to analyze:
${text}

Provide a plagiarism risk score (0-100%) and detailed analysis.`,
};

