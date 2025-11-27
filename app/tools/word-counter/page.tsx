"use client"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function WordCounterPage() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: "",
  })

  useEffect(() => {
    setStats({
      words: textUtils.countWords(text),
      characters: textUtils.countCharacters(text, true),
      charactersNoSpaces: textUtils.countCharacters(text, false),
      sentences: textUtils.countSentences(text),
      paragraphs: textUtils.countParagraphs(text),
      readingTime: textUtils.calculateReadingTime(text),
    })
  }, [text])

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and calculate reading time instantly."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Enter Your Text</label>
          <Textarea
            placeholder="Start typing or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.words}</div>
              <div className="text-sm text-muted-foreground mt-1">Words</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.characters}</div>
              <div className="text-sm text-muted-foreground mt-1">Characters</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.charactersNoSpaces}</div>
              <div className="text-sm text-muted-foreground mt-1">Characters (no spaces)</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.sentences}</div>
              <div className="text-sm text-muted-foreground mt-1">Sentences</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.paragraphs}</div>
              <div className="text-sm text-muted-foreground mt-1">Paragraphs</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="p-4 text-center">
              <div className="text-lg font-bold text-primary">{stats.readingTime}</div>
              <div className="text-sm text-muted-foreground mt-1">Reading Time</div>
            </Card>
          </motion.div>
        </div>
      </div>
    </ToolLayout>
  )
}

