"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Brain, Code2, Database, Cloud, Cpu, Zap, MapPin, Circle } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useRef, type MouseEvent } from "react"

const techStack = [
  { icon: Brain, label: "LLMs", color: "text-blue-400" },
  { icon: Code2, label: "Python", color: "text-yellow-400" },
  { icon: Database, label: "Vector DBs", color: "text-green-400" },
  { icon: Cloud, label: "AWS/GCP", color: "text-orange-400" },
  { icon: Cpu, label: "PyTorch", color: "text-red-400" },
  { icon: Zap, label: "LangChain", color: "text-purple-400" },
]

export function BentoAbout() {
  const { t } = useI18n()

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-12"
        >
          {t.about.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Current Focus - Large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                {t.about.currentFocus}
              </span>
            </div>
            <p className="text-lg text-foreground leading-relaxed">
              {t.about.currentFocusText}
            </p>
          </motion.div>

          {/* Live Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Circle className="h-3 w-3 fill-green-500 text-green-500" />
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                {t.about.liveStatus}
              </span>
            </div>
            <p className="text-foreground font-medium mb-2">
              {t.about.available}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>{t.about.location}</span>
            </div>
          </motion.div>

          {/* Tech Stack - 3D Tilt Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
          >
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-6 block">
              {t.about.techStack}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {techStack.map((tech, index) => (
                <TiltCard key={tech.label} tech={tech} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TiltCard({
  tech,
  index,
}: {
  tech: { icon: typeof Brain; label: string; color: string }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = tech.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
    >
      <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.04]">
        <motion.div
          style={{ transform: "translateZ(20px)" }}
          className={`${tech.color}`}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
        <span
          className="text-xs font-mono text-muted-foreground"
          style={{ transform: "translateZ(10px)" }}
        >
          {tech.label}
        </span>
      </div>
    </motion.div>
  )
}
