"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  connections: number[]
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 25000)
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        connections: [],
      }))

      // Pre-calculate connections
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.forEach((other, j) => {
          if (i !== j) {
            const dx = node.x - other.x
            const dy = node.y - other.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 150) {
              node.connections.push(j)
            }
          }
        })
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const mouse = mouseRef.current

      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 0.5

      nodes.forEach((node, i) => {
        node.connections.forEach((j) => {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.08
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })

      // Update and draw nodes
      nodes.forEach((node) => {
        // Mouse interaction
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const mouseDistance = Math.sqrt(dx * dx + dy * dy)

        if (mouseDistance < 200) {
          const force = (200 - mouseDistance) / 200
          node.vx -= (dx / mouseDistance) * force * 0.02
          node.vy -= (dy / mouseDistance) * force * 0.02
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Boundary bounce
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Damping
        node.vx *= 0.99
        node.vy *= 0.99

        // Draw node
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 2
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
