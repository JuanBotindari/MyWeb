"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Building2, Calendar } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string[]
  technologies: string[]
}

const experiences: Experience[] = [
  {
    id: "1",
    company: "TechCorp AI",
    role: "Senior AI Engineer",
    period: "2023",
    description: [
      "Led development of production LLM systems serving 10M+ users",
      "Architected RAG pipelines reducing hallucination by 40%",
      "Implemented fine-tuning strategies for domain-specific models",
      "Mentored team of 5 engineers on ML best practices",
    ],
    technologies: ["PyTorch", "LangChain", "OpenAI", "Pinecone", "AWS"],
  },
  {
    id: "2",
    company: "DataFlow Systems",
    role: "Machine Learning Engineer",
    period: "2021 - 2023",
    description: [
      "Built real-time ML inference pipelines processing 1M events/day",
      "Developed NLP models for sentiment analysis and entity extraction",
      "Created automated model monitoring and retraining systems",
      "Reduced model deployment time by 60% through MLOps automation",
    ],
    technologies: ["Python", "TensorFlow", "Kubernetes", "Apache Kafka", "GCP"],
  },
  {
    id: "3",
    company: "InnovateTech",
    role: "Data Scientist",
    period: "2019 - 2021",
    description: [
      "Developed predictive models for customer churn with 92% accuracy",
      "Built recommendation systems increasing user engagement by 35%",
      "Created data pipelines processing 50TB+ of structured data",
      "Presented insights to C-suite executives for strategic decisions",
    ],
    technologies: ["Python", "Scikit-learn", "SQL", "Tableau", "Spark"],
  },
  {
    id: "4",
    company: "StartupX",
    role: "Junior ML Engineer",
    period: "2018 - 2019",
    description: [
      "Implemented computer vision models for quality inspection",
      "Built chatbot systems using early NLP techniques",
      "Contributed to open-source ML libraries",
    ],
    technologies: ["Python", "OpenCV", "NLTK", "Docker"],
  },
]

export function ExperienceTimeline() {
  const { t } = useI18n()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-12"
        >
          {t.experience.title}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <TimelineEntry
                key={exp.id}
                experience={exp}
                index={index}
                isExpanded={expandedId === exp.id}
                onToggle={() => toggleExpand(exp.id)}
                presentLabel={t.experience.present}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({
  experience,
  index,
  isExpanded,
  onToggle,
  presentLabel,
}: {
  experience: Experience
  index: number
  isExpanded: boolean
  onToggle: () => void
  presentLabel: string
}) {
  const isPresent = experience.period === "2023"

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-[38px] flex justify-center">
        <motion.div
          animate={{
            scale: isExpanded ? 1.2 : 1,
            backgroundColor: isExpanded ? "rgb(100 180 255)" : "rgb(38 38 38)",
          }}
          className="w-3 h-3 rounded-full border-2 border-accent"
        />
      </div>

      <motion.button
        onClick={onToggle}
        className="w-full text-left p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.04]"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-mono">
                {isPresent ? `${experience.period} - ${presentLabel}` : experience.period}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{experience.company}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/10">
                <ul className="space-y-2 mb-4">
                  {experience.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-accent mt-1.5">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
