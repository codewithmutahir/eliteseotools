// Utility functions for text processing tools (no API needed)

export const textUtils = {
  // Word Counter
  countWords: (text: string): number => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  },

  // Character Counter
  countCharacters: (text: string, includeSpaces: boolean = true): number => {
    if (includeSpaces) return text.length;
    return text.replace(/\s/g, '').length;
  },

  // Sentence Counter
  countSentences: (text: string): number => {
    if (!text.trim()) return 0;
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    return sentences ? sentences.length : 0;
  },

  // Paragraph Counter
  countParagraphs: (text: string): number => {
    if (!text.trim()) return 0;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    return paragraphs.length;
  },

  // Reading Time Calculator (assumes 200 words per minute)
  calculateReadingTime: (text: string, wpm: number = 200): string => {
    const words = textUtils.countWords(text);
    const minutes = Math.ceil(words / wpm);
    if (minutes < 1) return "Less than 1 minute";
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  },

  // Remove Extra Spaces
  removeExtraSpaces: (text: string): string => {
    return text.replace(/\s+/g, ' ').trim();
  },

  // Remove Line Breaks
  removeLineBreaks: (text: string): string => {
    return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  },

  // Remove Duplicate Lines
  removeDuplicateLines: (text: string): string => {
    const lines = text.split('\n');
    const uniqueLines = [...new Set(lines)];
    return uniqueLines.join('\n');
  },

  // Sort Lines A-Z
  sortLinesAZ: (text: string): string => {
    const lines = text.split('\n');
    return lines.sort((a, b) => a.localeCompare(b)).join('\n');
  },

  // Sort Lines Z-A
  sortLinesZA: (text: string): string => {
    const lines = text.split('\n');
    return lines.sort((a, b) => b.localeCompare(a)).join('\n');
  },

  // Text Case Converters
  toUpperCase: (text: string): string => text.toUpperCase(),
  
  toLowerCase: (text: string): string => text.toLowerCase(),
  
  toCapitalizedCase: (text: string): string => {
    return text.replace(/\b\w/g, char => char.toUpperCase());
  },
  
  toSentenceCase: (text: string): string => {
    return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
  },

  // Find & Replace
  findAndReplace: (text: string, find: string, replace: string, caseSensitive: boolean = false): string => {
    if (!find) return text;
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    return text.replace(regex, replace);
  },

  // Reverse Text
  reverseText: (text: string): string => {
    return text.split('').reverse().join('');
  },

  // JSON Formatter
  formatJSON: (text: string, spaces: number = 2): { formatted: string; error?: string } => {
    try {
      const parsed = JSON.parse(text);
      return { formatted: JSON.stringify(parsed, null, spaces) };
    } catch (error) {
      return { formatted: text, error: 'Invalid JSON' };
    }
  },

  // HTML Cleaner (strip HTML tags)
  stripHTML: (text: string): string => {
    return text.replace(/<[^>]*>/g, '');
  },

  // URL Encoder
  encodeURL: (text: string): string => {
    try {
      return encodeURIComponent(text);
    } catch (error) {
      return text;
    }
  },

  // URL Decoder
  decodeURL: (text: string): string => {
    try {
      return decodeURIComponent(text);
    } catch (error) {
      return text;
    }
  },

  // Base64 Encode
  encodeBase64: (text: string): string => {
    try {
      return Buffer.from(text, 'utf-8').toString('base64');
    } catch (error) {
      return btoa(text);
    }
  },

  // Base64 Decode
  decodeBase64: (text: string): string => {
    try {
      return Buffer.from(text, 'base64').toString('utf-8');
    } catch (error) {
      try {
        return atob(text);
      } catch {
        return 'Invalid Base64';
      }
    }
  },

  // Word Density Analyzer
  analyzeWordDensity: (text: string): Array<{ word: string; count: number; density: number }> => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2); // Filter out short words
    
    const totalWords = words.length;
    const wordCount: { [key: string]: number } = {};
    
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    const densityArray = Object.entries(wordCount).map(([word, count]) => ({
      word,
      count,
      density: parseFloat(((count / totalWords) * 100).toFixed(2))
    }));
    
    return densityArray.sort((a, b) => b.count - a.count).slice(0, 20);
  },

  // Text Compare (calculate differences)
  compareTexts: (text1: string, text2: string): { 
    similarity: number; 
    differences: number;
    details: string;
  } => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    let differences = 0;
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      if (lines1[i] !== lines2[i]) {
        differences++;
      }
    }
    
    const similarity = maxLines > 0 
      ? parseFloat((((maxLines - differences) / maxLines) * 100).toFixed(2))
      : 100;
    
    return {
      similarity,
      differences,
      details: `${differences} line(s) differ out of ${maxLines} total lines.`
    };
  }
};

