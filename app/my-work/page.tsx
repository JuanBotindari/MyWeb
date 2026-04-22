"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import { I18nProvider } from "@/lib/i18n"
import { NeuralNetworkBackground } from "@/components/neural-network-background"
import { SpotlightEffect } from "@/components/spotlight-effect"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { Navbar } from "@/components/navbar"
import { CommandPalette } from "@/components/command-palette"
import { WorksGallery } from "@/components/works-gallery"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export default function MyWorkPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  return (
    <I18nProvider>
      <div className="relative min-h-screen bg-background film-grain">
        {/* Background Effects */}
        <NeuralNetworkBackground />
        <SpotlightEffect />
        <MagneticCursor />

        {/* Navigation */}
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />

        {/* Main Content */}
        <main className="relative z-10 pt-24">
          <WorksGallery />
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-16 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-sm text-muted-foreground font-mono">
                {new Date().getFullYear()} AI Specialist Portfolio
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </I18nProvider>
  )
}
