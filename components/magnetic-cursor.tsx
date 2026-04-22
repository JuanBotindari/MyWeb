"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.magnetic === "true"
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeaveElement = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeaveElement)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeaveElement)
    }
  }, [cursorX, cursorY])

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 60 : 12,
            height: isHovering ? 60 : 12,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9997] rounded-full border border-white/30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.05 }}
      />
    </>
  )
}
