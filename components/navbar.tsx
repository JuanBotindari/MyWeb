"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { Globe, Menu, X, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n, type Language } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  onOpenCommandPalette: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { language, setLanguage, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const pathname = usePathname()
  const isMyWorkPage = pathname === "/my-work"

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#certifications", label: t.nav.certifications },
    { href: "#contact", label: t.nav.contact },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenCommandPalette()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onOpenCommandPalette])

  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
      >
        <nav className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-accent via-accent/50 to-transparent"
            style={{ width: progressWidth }}
          />

          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <motion.a
              href="#"
              className="font-mono text-sm font-medium tracking-tight text-foreground"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-accent">&lt;</span>
              AI.Specialist
              <span className="text-accent">/&gt;</span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {isMyWorkPage ? (
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t.myWork.backToHome}
                  </Button>
                </Link>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      size="sm"
                      onClick={() => scrollTo(item.href)}
                      className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Button>
                  ))}
                  {/* My Work - External Page Link */}
                  <Link href="/my-work">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors font-serif italic"
                    >
                      {t.nav.myWork}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 px-3 text-muted-foreground hover:text-foreground hover:bg-white/5 gap-2"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="font-mono text-sm">{language === "es" ? "ES" : "US"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={language === "en" ? "text-accent" : "text-foreground"}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("es")}
                    className={language === "es" ? "text-accent" : "text-foreground"}
                  >
                    Español
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Command Palette Trigger */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-2 h-10 px-3 text-muted-foreground hover:text-foreground hover:bg-white/5 font-mono text-sm"
              >
                <Search className="h-5 w-5" />
                <span className="text-xs text-muted-foreground/60">Cmd+K</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Nav */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-6 pb-4 space-y-1">
              {isMyWorkPage ? (
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/5 gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t.myWork.backToHome}
                  </Button>
                </Link>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/5"
                      onClick={() => scrollTo(item.href)}
                    >
                      {item.label}
                    </Button>
                  ))}
                  <Link href="/my-work">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/5 font-serif italic"
                    >
                      {t.nav.myWork}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </nav>
      </motion.header>
    </>
  )
}
