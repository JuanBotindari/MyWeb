"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export function ContactSection() {
  const { t } = useI18n()

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t.nav.contact}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t.language === "en"
              ? "Interested in working together or have a question about AI? Let's connect and explore the possibilities."
              : "¿Interesado en trabajar juntos o tienes una pregunta sobre IA? Conectemos y exploremos las posibilidades."}
          </p>

          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 font-medium mb-8"
            asChild
          >
            <a href="mailto:hello@example.com" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              hello@example.com
            </a>
          </Button>

          <div className="flex items-center justify-center gap-4">
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
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-muted-foreground font-mono">
            {new Date().getFullYear()} AI Specialist Portfolio
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
