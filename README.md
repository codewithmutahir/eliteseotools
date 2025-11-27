# SmallSEOTools Clone

A comprehensive multi-tool web application featuring AI-powered and text processing tools built with Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, and OpenAI GPT-4.1.

## 🚀 Features

### AI-Powered Tools (6 tools)
1. **Paraphrasing Tool** - Rewrite text while maintaining meaning
2. **Grammar Checker** - Check grammar, spelling, and punctuation
3. **Text Summarizer** - Generate concise summaries
4. **Article Rewriter** - Completely rewrite articles
5. **Text Expander** - Make text longer and more detailed
6. **AI Plagiarism Checker** - Detect potential plagiarism patterns

### Text Processing Tools (18 tools)
7. **Word Counter** - Count words, characters, sentences, paragraphs
8. **Text Case Converter** - Convert between uppercase, lowercase, etc.
9. **Remove Extra Spaces** - Clean up whitespace
10. **Remove Line Breaks** - Convert to single line
11. **Remove Duplicate Lines** - Keep only unique lines
12. **Sort Lines** - Sort alphabetically (A→Z or Z→A)
13. **Find & Replace** - Search and replace text
14. **Reverse Text** - Reverse character order
15. **JSON Formatter** - Format and beautify JSON
16. **HTML Cleaner** - Strip HTML tags
17. **URL Encoder/Decoder** - Encode or decode URLs
18. **Base64 Encode/Decode** - Base64 encoding/decoding
19. **Word Density Analyzer** - Analyze keyword frequency
20. **Text Compare** - Compare two texts side-by-side

## 🛠️ Tech Stack

- **Framework:** Next.js 15.1.4 (App Router + Turbopack)
- **Runtime:** React 19.0.0
- **Language:** TypeScript 5.7.3
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** ShadCN UI
- **Animations:** Framer Motion 11.15.0
- **AI:** OpenAI GPT-4.1 (via OpenRouter)
- **Image Processing:** Sharp 0.33.5
- **PDF Processing:** pdf-lib 1.17.1 + pdf-parse 1.1.1
- **Dark Mode:** next-themes 0.4.4

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd smallseotools
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=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
   OPENAI_BASE_URL=https://openrouter.ai/api/v1
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=SmallSEOTools Clone
   ```

4. **Run the development server (with Turbopack):**
   ```bash
   npm run dev
   ```
   ⚡ Powered by Turbopack for 2-3x faster dev builds!

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚡ Performance

- **Dev Server:** ~1-2 seconds (with Turbopack)
- **Hot Reload:** ~100-300ms
- **Build Time:** ~30-40 seconds
- **Production:** Fully optimized with Next.js 15

## 📁 Project Structure

```
smallseotools/
├── app/
│   ├── api/               # API routes for AI tools
│   │   ├── paraphrase/
│   │   ├── grammar/
│   │   ├── summarize/
│   │   ├── rewrite/
│   │   ├── expand/
│   │   └── plagiarism/
│   ├── tools/             # Tool pages
│   │   ├── paraphraser/
│   │   ├── grammar-checker/
│   │   ├── word-counter/
│   │   └── ... (all 24 tools)
│   ├── about/
│   ├── contact/
│   ├── layout.tsx
│   ├── page.tsx           # Dashboard
│   └── globals.css
├── components/
│   ├── ui/                # ShadCN UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ToolLayout.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── textUtils.ts       # Text processing utilities
│   ├── prompts.ts         # AI prompts
│   ├── openai.ts          # OpenAI configuration
│   └── cn.ts              # Utility functions
└── ... (config files)
```

## 🎨 Features

- ✅ **24 Tools** - 6 AI-powered + 18 text processing tools
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Dark Mode** - Built-in theme switching
- ✅ **Smooth Animations** - Framer Motion transitions
- ✅ **SEO Friendly** - Proper metadata for all pages
- ✅ **Type Safe** - Full TypeScript coverage
- ✅ **Modern UI** - Beautiful ShadCN components
- ✅ **Fast** - Client-side processing for text tools
- ✅ **Privacy Focused** - No data storage or logging

## 🔧 Configuration

### Using a Different AI Model

Edit `lib/openai.ts` to change the model:
```typescript
export const AI_MODEL = "openai/gpt-4.1-mini"; // or "openai/gpt-4.1"
```

### Customizing Prompts

Edit prompts in `lib/prompts.ts` to adjust AI behavior.

### Styling

- Global styles: `app/globals.css`
- Theme colors: `tailwind.config.ts`
- Component styles: Inline with Tailwind classes

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SITE_NAME`
4. Deploy!

### Other Platforms (Netlify, Railway, etc.)

Build the project:
```bash
npm run build
npm start
```

**Note:** Sharp and canvas may need system dependencies on some platforms. Check platform-specific docs.

## 🆕 What's New in This Version

### Latest Updates (2024)
- ✅ **Next.js 15.1.4** with Turbopack
- ✅ **React 19** with latest features
- ✅ **38 Tools** (6 AI + 18 Text + 7 Image + 7 PDF)
- ✅ **Full PDF text extraction** with pdf-parse
- ✅ **PDF page extraction** working
- ✅ **All packages updated** to latest versions
- ✅ **No deprecated packages** - everything current!

### Performance Improvements
- 2-3x faster dev server with Turbopack
- Better build optimization
- Enhanced image processing
- Improved bundle sizes

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For support or inquiries, visit the Contact page in the app.

---

Built with ❤️ using Next.js and OpenAI

