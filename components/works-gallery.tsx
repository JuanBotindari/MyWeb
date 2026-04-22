"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Download, FileText, Calendar, ExternalLink } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"

interface Work {
  id: string
  title: string
  type: "paper" | "project" | "publication"
  date: string
  shortDescription: string
  fullDescription: string
  tags: string[]
  downloadUrl?: string
  externalUrl?: string
}

// Sample works data - you can replace this with your actual works
const works: Work[] = [
  {
    id: "1",
    title: "Optimizing RAG Pipelines for Enterprise Applications",
    type: "paper",
    date: "2024",
    shortDescription: "A comprehensive study on reducing hallucination rates in production RAG systems through advanced chunking strategies and hybrid retrieval methods.",
    fullDescription: "This paper presents novel approaches to building production-grade Retrieval Augmented Generation systems. We explore multi-stage retrieval architectures, semantic chunking strategies, and reranking techniques that achieve a 40% reduction in hallucination rates compared to baseline implementations. The study includes benchmarks across multiple enterprise datasets and provides practical guidelines for implementation.",
    tags: ["RAG", "LLM", "NLP", "Enterprise AI"],
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Fine-tuning Strategies for Domain-Specific LLMs",
    type: "paper",
    date: "2024",
    shortDescription: "Exploring efficient fine-tuning methods including LoRA, QLoRA, and adapter-based approaches for specialized language models.",
    fullDescription: "We present a comparative analysis of parameter-efficient fine-tuning techniques for adapting large language models to specialized domains. Our experiments cover medical, legal, and financial domains, demonstrating that LoRA with carefully curated datasets can achieve 95% of full fine-tuning performance with only 0.1% of trainable parameters. The paper includes detailed ablation studies and a practical framework for selecting the optimal fine-tuning strategy based on use case requirements.",
    tags: ["Fine-tuning", "LoRA", "Domain Adaptation", "Transfer Learning"],
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Real-time ML Inference at Scale",
    type: "project",
    date: "2023",
    shortDescription: "Architecting and deploying ML inference systems capable of processing 1M+ events per day with sub-100ms latency.",
    fullDescription: "This project documents the design and implementation of a distributed machine learning inference platform built to handle enterprise-scale workloads. Key innovations include dynamic batching, model caching strategies, and a custom load balancer optimized for GPU utilization. The system achieved 99.9% uptime while maintaining p99 latency under 100ms for complex NLP models.",
    tags: ["MLOps", "Kubernetes", "Inference", "Distributed Systems"],
    externalUrl: "#",
  },
  {
    id: "4",
    title: "Building Conversational AI Agents with Tool Use",
    type: "publication",
    date: "2023",
    shortDescription: "A practical guide to implementing AI agents that can interact with external tools and APIs while maintaining coherent conversations.",
    fullDescription: "This publication provides a comprehensive framework for building production-ready AI agents capable of tool use. We cover prompt engineering techniques, function calling patterns, error handling strategies, and evaluation methodologies. The guide includes code examples in Python and TypeScript, along with best practices for deploying agents in customer-facing applications.",
    tags: ["AI Agents", "Tool Use", "Function Calling", "LLM"],
    downloadUrl: "#",
    externalUrl: "#",
  },
]

export function WorksGallery() {
  const { t } = useI18n()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const getTypeIcon = (type: Work["type"]) => {
    switch (type) {
      case "paper":
        return <FileText className="h-4 w-4" />
      case "project":
        return <ExternalLink className="h-4 w-4" />
      case "publication":
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: Work["type"]) => {
    switch (type) {
      case "paper":
        return "Paper"
      case "project":
        return "Project"
      case "publication":
        return "Publication"
    }
  }

  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {t.myWork.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t.myWork.subtitle}
          </p>
        </motion.div>

        <div className="space-y-8">
          {works.map((work, index) => (
            <WorkEntry
              key={work.id}
              work={work}
              index={index}
              isExpanded={expandedId === work.id}
              isHovered={hoveredId === work.id}
              onToggle={() => toggleExpand(work.id)}
              onHover={() => setHoveredId(work.id)}
              onLeave={() => setHoveredId(null)}
              getTypeIcon={getTypeIcon}
              getTypeLabel={getTypeLabel}
              downloadLabel={t.myWork.download}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkEntry({
  work,
  index,
  isExpanded,
  isHovered,
  onToggle,
  onHover,
  onLeave,
  getTypeIcon,
  getTypeLabel,
  downloadLabel,
}: {
  work: Work
  index: number
  isExpanded: boolean
  isHovered: boolean
  onToggle: () => void
  onHover: () => void
  onLeave: () => void
  getTypeIcon: (type: Work["type"]) => React.ReactNode
  getTypeLabel: (type: Work["type"]) => string
  downloadLabel: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        onClick={onToggle}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="w-full text-left p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.04]"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.995 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Type and Date */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                {getTypeIcon(work.type)}
                <span className="font-mono text-xs">{getTypeLabel(work.type)}</span>
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="h-3.5 w-3.5" />
                {work.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {work.title}
            </h3>

            {/* Short Description - visible on hover or always */}
            <AnimatePresence>
              {(isHovered || isExpanded) && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground text-sm leading-relaxed"
                >
                  {work.shortDescription}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="mt-2"
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>

        {/* Expanded Content */}
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
              <div className="pt-6 mt-6 border-t border-white/10">
                {/* Full Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {work.fullDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {work.downloadUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 bg-accent/10 border-accent/30 hover:bg-accent/20 hover:border-accent/50 text-accent"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(work.downloadUrl, "_blank")
                      }}
                    >
                      <Download className="h-4 w-4" />
                      {downloadLabel}
                    </Button>
                  )}
                  {work.externalUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-white/20 hover:border-white/40 hover:bg-white/5"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(work.externalUrl, "_blank")
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
