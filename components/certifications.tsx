"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, ExternalLink, Calendar } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl?: string
  description: string
}

const certifications: Certification[] = [
  {
    id: "1",
    title: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
    description:
      "Validates expertise in building, training, tuning, and deploying machine learning models using AWS Cloud.",
  },
  {
    id: "2",
    title: "Google Cloud Professional ML Engineer",
    issuer: "Google Cloud",
    date: "2023",
    credentialUrl: "#",
    description:
      "Demonstrates ability to design, build, and productionize ML models on Google Cloud Platform.",
  },
  {
    id: "3",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2023",
    credentialUrl: "#",
    description:
      "Five-course specialization covering neural networks, CNNs, RNNs, and sequence models.",
  },
  {
    id: "4",
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2022",
    credentialUrl: "#",
    description:
      "Proficiency in using TensorFlow to solve deep learning and ML problems.",
  },
  {
    id: "5",
    title: "LangChain for LLM Application Development",
    issuer: "DeepLearning.AI",
    date: "2024",
    credentialUrl: "#",
    description:
      "Building applications with LLMs using prompts, parsers, memory, chains, and agents.",
  },
]

export function Certifications() {
  const { t } = useI18n()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-12"
        >
          {t.certifications.title}
        </motion.h2>

        <div className="space-y-2">
          {certifications.map((cert, index) => (
            <CertificationItem
              key={cert.id}
              certification={cert}
              index={index}
              isHovered={hoveredId === cert.id}
              onHover={() => setHoveredId(cert.id)}
              onLeave={() => setHoveredId(null)}
              viewCredentialLabel={t.certifications.viewCredential}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationItem({
  certification,
  index,
  isHovered,
  onHover,
  onLeave,
  viewCredentialLabel,
}: {
  certification: Certification
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  viewCredentialLabel: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group"
    >
      <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.04]">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Award className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-foreground font-medium">{certification.title}</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{certification.issuer}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {certification.date}
              </span>
            </div>
          </div>
        </div>

        {certification.credentialUrl && (
          <motion.a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
            whileHover={{ x: 2 }}
          >
            <span className="hidden sm:inline">{viewCredentialLabel}</span>
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        )}
      </div>

      {/* Ghost Preview */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-full mt-2 p-4 rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl z-10"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {certification.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
