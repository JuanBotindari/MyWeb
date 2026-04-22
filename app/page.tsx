"use client"

import { useState } from "react"
import { I18nProvider } from "@/lib/i18n"
import { NeuralNetworkBackground } from "@/components/neural-network-background"
import { SpotlightEffect } from "@/components/spotlight-effect"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { Navbar } from "@/components/navbar"
import { CommandPalette } from "@/components/command-palette"
import { HeroSection } from "@/components/hero-section"
import { BentoAbout } from "@/components/bento-about"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Certifications } from "@/components/certifications"
import { ContactSection } from "@/components/contact-section"
import { AIChat } from "@/components/ai-chat"

export default function Home() {
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
        <main className="relative z-10">
          <HeroSection />
          <BentoAbout />
          <ExperienceTimeline />
          <Certifications />
          <ContactSection />
        </main>

        {/* AI Chat */}
        <AIChat />
      </div>
    </I18nProvider>
  )
}
