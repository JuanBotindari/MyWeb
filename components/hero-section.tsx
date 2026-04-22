"use client"

import { motion } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-mono text-muted-foreground">
            {t.hero.greeting}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-foreground mb-6"
        >
          <span className="block text-balance">{t.hero.title}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 font-medium"
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {t.hero.cta}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-white/10 hover:bg-white/5 font-medium"
            onClick={() => {
              const link = document.createElement("a")
              link.href = "/cv.pdf"
              link.download = "AI_Specialist_CV.pdf"
              link.click()
            }}
          >
            {t.nav.downloadCV}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-mono">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
