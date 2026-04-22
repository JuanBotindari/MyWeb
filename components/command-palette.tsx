"use client"

import { useEffect, useState } from "react"
import { Command } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Briefcase,
  Award,
  Mail,
  Download,
  Globe,
  FileText,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { t, language, setLanguage } = useI18n()
  const [search, setSearch] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    onClose()
  }

  const handleDownloadCV = () => {
    // Trigger CV download
    const link = document.createElement("a")
    link.href = "/cv.pdf"
    link.download = "AI_Specialist_CV.pdf"
    link.click()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-[90%] max-w-lg"
          >
            <Command
              className="rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden"
              loop
            >
              <div className="flex items-center border-b border-white/10 px-4">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder={t.commandPalette.placeholder}
                  className="w-full bg-transparent py-4 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  autoFocus
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  {t.commandPalette.noResults}
                </Command.Empty>

                <Command.Group
                  heading={t.commandPalette.navigation}
                  className="text-xs text-muted-foreground px-2 py-1.5"
                >
                  <CommandItem
                    icon={<User className="h-4 w-4" />}
                    onSelect={() => scrollTo("#about")}
                  >
                    {t.nav.about}
                  </CommandItem>
                  <CommandItem
                    icon={<Briefcase className="h-4 w-4" />}
                    onSelect={() => scrollTo("#experience")}
                  >
                    {t.nav.experience}
                  </CommandItem>
                  <CommandItem
                    icon={<Award className="h-4 w-4" />}
                    onSelect={() => scrollTo("#certifications")}
                  >
                    {t.nav.certifications}
                  </CommandItem>
                  <CommandItem
                    icon={<Mail className="h-4 w-4" />}
                    onSelect={() => scrollTo("#contact")}
                  >
                    {t.nav.contact}
                  </CommandItem>
                </Command.Group>

                <Command.Group
                  heading={t.commandPalette.actions}
                  className="text-xs text-muted-foreground px-2 py-1.5 mt-2"
                >
                  <CommandItem
                    icon={<Download className="h-4 w-4" />}
                    onSelect={handleDownloadCV}
                  >
                    {t.nav.downloadCV}
                  </CommandItem>
                  <CommandItem
                    icon={<Globe className="h-4 w-4" />}
                    onSelect={() => {
                      setLanguage(language === "en" ? "es" : "en")
                      onClose()
                    }}
                  >
                    {t.commandPalette.language} ({language === "en" ? "ES" : "EN"})
                  </CommandItem>
                </Command.Group>
              </Command.List>

              <div className="border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CommandItem({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  onSelect: () => void
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground rounded-lg cursor-pointer transition-colors data-[selected=true]:bg-white/5 hover:bg-white/5"
    >
      <span className="text-muted-foreground">{icon}</span>
      {children}
    </Command.Item>
  )
}
