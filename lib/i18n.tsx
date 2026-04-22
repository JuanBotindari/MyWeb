"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Language = "en" | "es"

interface Translations {
  nav: {
    about: string
    experience: string
    certifications: string
    contact: string
    downloadCV: string
    cvFile: string
    myWork: string
  }
  hero: {
    greeting: string
    title: string
    subtitle: string
    cta: string
  }
  about: {
    title: string
    currentFocus: string
    currentFocusText: string
    techStack: string
    liveStatus: string
    available: string
    location: string
  }
  experience: {
    title: string
    present: string
  }
  certifications: {
    title: string
    viewCredential: string
  }
  chat: {
    title: string
    placeholder: string
    thinking: string
    greeting: string
    cvPrompt: string
    downloadCV: string
  }
  commandPalette: {
    placeholder: string
    noResults: string
    navigation: string
    actions: string
    theme: string
    language: string
  }
  myWork: {
    title: string
    subtitle: string
    download: string
    viewDetails: string
    backToHome: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      certifications: "Certifications",
      contact: "Contact",
      downloadCV: "Download CV",
      cvFile: "/Curriculum Vitae (EN) - Juan Ignacio Botindari.pdf",
      myWork: "My Work",
    },
    hero: {
      greeting: "Hello, I am",
      title: "AI & LLM Specialist",
      subtitle: "Building intelligent systems that transform how humans interact with technology. Specializing in Large Language Models, Neural Networks, and Production AI Systems.",
      cta: "Let's talk",
    },
    about: {
      title: "About Me",
      currentFocus: "Current Focus",
      currentFocusText: "Developing production-grade LLM applications with focus on RAG systems, fine-tuning, and AI agents for enterprise solutions.",
      techStack: "Tech Stack",
      liveStatus: "Live Status",
      available: "Available for opportunities",
      location: "San Francisco, CA",
    },
    experience: {
      title: "Experience",
      present: "Present",
    },
    certifications: {
      title: "Certifications",
      viewCredential: "View Credential",
    },
    chat: {
      title: "AI Digital Twin",
      placeholder: "Ask me anything about my experience...",
      thinking: "Thinking",
      greeting: "Hello! I'm an AI representation of this portfolio's owner. I can answer questions about their experience, skills, projects, or help you download their CV. What would you like to know?",
      cvPrompt: "I'd be happy to help you get the CV!",
      downloadCV: "Download CV",
    },
    commandPalette: {
      placeholder: "Type a command or search...",
      noResults: "No results found.",
      navigation: "Navigation",
      actions: "Actions",
      theme: "Toggle theme",
      language: "Switch language",
    },
    myWork: {
      title: "My Work",
      subtitle: "A collection of papers, projects, and publications I've contributed to",
      download: "Download",
      viewDetails: "View Details",
      backToHome: "Back to Home",
    },
  },
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      certifications: "Certificaciones",
      contact: "Contacto",
      downloadCV: "Descargar CV",
      cvFile: "/Curriculum Vitae (ES) - Juan Ignacio Botindari.pdf",
      myWork: "Mi Trabajo",
    },
    hero: {
      greeting: "Hola, soy",
      title: "Especialista en IA y LLM",
      subtitle: "Construyendo sistemas inteligentes que transforman la forma en que los humanos interactúan con la tecnología. Especializado en Modelos de Lenguaje, Redes Neuronales y Sistemas de IA en Producción.",
      cta: "Hablemos",
    },
    about: {
      title: "Sobre Mí",
      currentFocus: "Enfoque Actual",
      currentFocusText: "Desarrollando aplicaciones LLM de nivel productivo con enfoque en sistemas RAG, fine-tuning y agentes de IA para soluciones empresariales.",
      techStack: "Stack Tecnológico",
      liveStatus: "Estado Actual",
      available: "Disponible para oportunidades",
      location: "San Francisco, CA",
    },
    experience: {
      title: "Experiencia",
      present: "Presente",
    },
    certifications: {
      title: "Certificaciones",
      viewCredential: "Ver Credencial",
    },
    chat: {
      title: "Gemelo Digital IA",
      placeholder: "Pregúntame sobre mi experiencia...",
      thinking: "Pensando",
      greeting: "¡Hola! Soy una representación de IA del propietario de este portafolio. Puedo responder preguntas sobre su experiencia, habilidades, proyectos o ayudarte a descargar su CV. ¿Qué te gustaría saber?",
      cvPrompt: "¡Estaré encantado de ayudarte a obtener el CV!",
      downloadCV: "Descargar CV",
    },
    commandPalette: {
      placeholder: "Escribe un comando o busca...",
      noResults: "No se encontraron resultados.",
      navigation: "Navegación",
      actions: "Acciones",
      theme: "Cambiar tema",
      language: "Cambiar idioma",
    },
    myWork: {
      title: "Mi Trabajo",
      subtitle: "Una colección de papers, proyectos y publicaciones en las que he contribuido",
      download: "Descargar",
      viewDetails: "Ver Detalles",
      backToHome: "Volver al Inicio",
    },
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
