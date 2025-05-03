"use client"

import { useEffect, useRef } from "react"

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create stars
    const stars: Star[] = []
    const numStars = Math.floor((canvas.width * canvas.height) / 800) // Increased star density

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.05,
        pulse: Math.random() * 0.1,
        pulseSpeed: 0.01 + Math.random() * 0.03,
      })
    }

    // Create constellation lines
    const constellationPoints: Point[] = []
    const numPoints = 40 // Increased number of points
    const lines: Line[] = []

    for (let i = 0; i < numPoints; i++) {
      constellationPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      })
    }

    // Connect points that are close enough
    const connectPoints = () => {
      lines.length = 0
      for (let i = 0; i < constellationPoints.length; i++) {
        for (let j = i + 1; j < constellationPoints.length; j++) {
          const p1 = constellationPoints[i]
          const p2 = constellationPoints[j]
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

          if (distance < canvas.width / 7) {
            // Increased connection distance
            lines.push({
              x1: p1.x,
              y1: p1.y,
              x2: p2.x,
              y2: p2.y,
              opacity: 1 - distance / (canvas.width / 7),
            })
          }
        }
      }
    }

    // Animation loop
    let time = 0
    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#100804")
      gradient.addColorStop(1, "#0a0500")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some nebula-like effects
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * Math.sin(time * 0.1 + i) * 0.2 + canvas.width * 0.5
        const y = canvas.height * Math.cos(time * 0.1 + i) * 0.2 + canvas.height * 0.5

        const grd = ctx.createRadialGradient(x, y, 0, x, y, canvas.width * 0.3)
        grd.addColorStop(0, `rgba(255, 204, 112, 0.03)`)
        grd.addColorStop(1, "rgba(20, 10, 0, 0)")

        ctx.fillStyle = grd
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Update and draw stars
      stars.forEach((star) => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Pulsing effect
        star.opacity += Math.sin(time * star.pulseSpeed) * star.pulse
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      // Update constellation points
      constellationPoints.forEach((point) => {
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1
      })

      // Update and draw constellation lines
      connectPoints()
      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.strokeStyle = `rgba(255, 204, 112, ${line.opacity * 0.2})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  pulse: number
  pulseSpeed: number
}

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
  opacity: number
}
