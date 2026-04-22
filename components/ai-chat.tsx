"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Download,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isThinking?: boolean
  showCVButton?: boolean
}

// Simulated responses based on keywords
const getResponse = (
  input: string,
  language: "en" | "es"
): { content: string; showCVButton: boolean } => {
  const lowercaseInput = input.toLowerCase()

  // CV/Resume related
  if (
    lowercaseInput.includes("cv") ||
    lowercaseInput.includes("resume") ||
    lowercaseInput.includes("pdf") ||
    lowercaseInput.includes("download") ||
    lowercaseInput.includes("curriculum")
  ) {
    return {
      content:
        language === "en"
          ? "I'd be happy to help you get the CV! Click the button below to download it directly."
          : "¡Estaré encantado de ayudarte a obtener el CV! Haz clic en el botón de abajo para descargarlo directamente.",
      showCVButton: true,
    }
  }

  // Experience related
  if (
    lowercaseInput.includes("experience") ||
    lowercaseInput.includes("work") ||
    lowercaseInput.includes("job") ||
    lowercaseInput.includes("experiencia") ||
    lowercaseInput.includes("trabajo")
  ) {
    return {
      content:
        language === "en"
          ? "I have 6+ years of experience in AI and Machine Learning. My journey started as a Data Scientist and evolved into leading AI engineering teams. I've worked with companies like TechCorp AI and DataFlow Systems, building production LLM systems serving millions of users. My expertise includes RAG pipelines, fine-tuning, and MLOps."
          : "Tengo más de 6 años de experiencia en IA y Machine Learning. Mi trayectoria comenzó como Científico de Datos y evolucionó hacia liderar equipos de ingeniería de IA. He trabajado con empresas como TechCorp AI y DataFlow Systems, construyendo sistemas LLM en producción que sirven a millones de usuarios.",
      showCVButton: false,
    }
  }

  // Skills related
  if (
    lowercaseInput.includes("skill") ||
    lowercaseInput.includes("tech") ||
    lowercaseInput.includes("stack") ||
    lowercaseInput.includes("habilidad") ||
    lowercaseInput.includes("tecnología")
  ) {
    return {
      content:
        language === "en"
          ? "My core tech stack includes Python, PyTorch, TensorFlow, and LangChain for AI development. I'm proficient with vector databases like Pinecone and Weaviate for RAG systems. For infrastructure, I work with AWS, GCP, Kubernetes, and various MLOps tools. I also have experience with Next.js and React for building AI-powered interfaces."
          : "Mi stack tecnológico principal incluye Python, PyTorch, TensorFlow y LangChain para desarrollo de IA. Soy competente con bases de datos vectoriales como Pinecone y Weaviate para sistemas RAG. Para infraestructura, trabajo con AWS, GCP, Kubernetes y varias herramientas MLOps.",
      showCVButton: false,
    }
  }

  // Projects related
  if (
    lowercaseInput.includes("project") ||
    lowercaseInput.includes("portfolio") ||
    lowercaseInput.includes("built") ||
    lowercaseInput.includes("proyecto") ||
    lowercaseInput.includes("construido")
  ) {
    return {
      content:
        language === "en"
          ? "I've built various AI systems including: Production RAG pipelines reducing hallucination by 40%, real-time ML inference processing 1M events/day, customer churn prediction models with 92% accuracy, and recommendation systems increasing engagement by 35%. I'm particularly proud of implementing fine-tuning strategies for domain-specific LLMs."
          : "He construido varios sistemas de IA incluyendo: Pipelines RAG en producción reduciendo alucinaciones en un 40%, inferencia ML en tiempo real procesando 1M eventos/día, modelos de predicción de abandono con 92% de precisión, y sistemas de recomendación aumentando el engagement en 35%.",
      showCVButton: false,
    }
  }

  // Contact related
  if (
    lowercaseInput.includes("contact") ||
    lowercaseInput.includes("email") ||
    lowercaseInput.includes("hire") ||
    lowercaseInput.includes("contacto") ||
    lowercaseInput.includes("correo") ||
    lowercaseInput.includes("contratar")
  ) {
    return {
      content:
        language === "en"
          ? "Great! You can reach out via email at hello@example.com. I'm currently open to new opportunities and would love to discuss how I can help with your AI initiatives. You can also connect on LinkedIn or check out my GitHub for code samples."
          : "¡Genial! Puedes contactarme por correo electrónico en hello@example.com. Actualmente estoy abierto a nuevas oportunidades y me encantaría discutir cómo puedo ayudar con tus iniciativas de IA. También puedes conectar en LinkedIn o ver mi GitHub para ejemplos de código.",
      showCVButton: false,
    }
  }

  // Default response
  return {
    content:
      language === "en"
        ? "Thanks for your question! I'm an AI representation that can tell you about this portfolio's owner - their experience in AI/ML, technical skills, certifications, or projects. I can also help you download their CV. What would you like to know?"
        : "¡Gracias por tu pregunta! Soy una representación de IA que puede contarte sobre el propietario de este portafolio - su experiencia en IA/ML, habilidades técnicas, certificaciones o proyectos. También puedo ayudarte a descargar su CV. ¿Qué te gustaría saber?",
    showCVButton: false,
  }
}

export function AIChat() {
  const { t, language } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add greeting message
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: t.chat.greeting,
        },
      ])
    }
  }, [isOpen, messages.length, t.chat.greeting])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const simulateTyping = async (
    content: string,
    showCVButton: boolean
  ): Promise<void> => {
    setIsTyping(true)

    // Add thinking message
    const thinkingId = Date.now().toString()
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "assistant", content: "", isThinking: true },
    ])

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500))

    // Remove thinking and add streaming response
    setMessages((prev) => prev.filter((m) => m.id !== thinkingId))

    const responseId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      { id: responseId, role: "assistant", content: "", showCVButton: false },
    ])

    // Stream the response character by character
    for (let i = 0; i <= content.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15 + Math.random() * 10))
      setMessages((prev) =>
        prev.map((m) =>
          m.id === responseId ? { ...m, content: content.slice(0, i) } : m
        )
      )
    }

    // Add CV button if needed
    if (showCVButton) {
      setMessages((prev) =>
        prev.map((m) => (m.id === responseId ? { ...m, showCVButton: true } : m))
      )
    }

    setIsTyping(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    const response = getResponse(input, language)
    await simulateTyping(response.content, response.showCVButton)
  }

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = t.nav.cvFile
    link.download = t.nav.cvFile.split("/").pop() || "CV.pdf"
    link.click()
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        data-magnetic="true"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open AI Chat</span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {t.chat.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.isThinking ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">{t.chat.thinking}...</span>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] ${
                        message.role === "user"
                          ? "bg-foreground text-background rounded-2xl rounded-br-md px-4 py-2"
                          : "space-y-2"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-2">
                          <p className="text-sm text-foreground leading-relaxed">
                            {message.content}
                            {isTyping &&
                              messages[messages.length - 1]?.id === message.id && (
                                <span className="inline-block w-1.5 h-4 bg-accent ml-0.5 animate-pulse" />
                              )}
                          </p>
                        </div>
                      )}
                      {message.role === "user" && (
                        <p className="text-sm">{message.content}</p>
                      )}
                      {message.showCVButton && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Button
                            onClick={handleDownloadCV}
                            size="sm"
                            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {t.chat.downloadCV}
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.placeholder}
                  disabled={isTyping}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-white/20 transition-colors disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="h-10 w-10 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
