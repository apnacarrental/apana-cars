'use client'

import React, { useRef, useEffect } from 'react'

interface HighwayParticlesProps {
  speedMultiplier?: number
  density?: number
  className?: string
}

export function HighwayStreamCanvas({
  speedMultiplier = 1,
  density = 60,
  className = '',
}: HighwayParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Highway light streak particles
    interface Streak {
      x: number
      y: number
      z: number
      length: number
      speed: number
      color: string
    }

    const streaks: Streak[] = []
    const colors = [
      'rgba(255, 255, 255, 0.45)',
      'rgba(255, 255, 255, 0.25)',
      'rgba(240, 240, 235, 0.35)',
      'rgba(255, 215, 120, 0.3)', // subtle warm headlamp
    ]

    for (let i = 0; i < density; i++) {
      streaks.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * width,
        length: 12 + Math.random() * 28,
        speed: (2 + Math.random() * 4) * speedMultiplier,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let mouseX = 0
    let targetSpeed = 1
    let currentSpeed = 1

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - width / 2) * 0.05
      targetSpeed = 1.6 // accelerate slightly on interaction
    }

    const handleMouseLeave = () => {
      targetSpeed = 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      // Smooth dampening speed
      currentSpeed += (targetSpeed - currentSpeed) * 0.05

      ctx.clearRect(0, 0, width, height)

      const fov = 350
      const cx = width / 2 + mouseX
      const cy = height * 0.65 // perspective horizon point slightly lower

      for (let i = 0; i < streaks.length; i++) {
        const p = streaks[i]
        p.z -= p.speed * currentSpeed

        if (p.z <= 0) {
          p.z = width
          p.x = (Math.random() - 0.5) * width * 1.8
          p.y = (Math.random() - 0.5) * height * 1.8
        }

        const k = fov / p.z
        const px = p.x * k + cx
        const py = p.y * k + cy

        const pzPrev = p.z + p.length * currentSpeed
        const kPrev = fov / pzPrev
        const pxPrev = p.x * kPrev + cx
        const pyPrev = p.y * kPrev + cy

        // Only draw streaks within screen bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, Math.max(0, 1 - p.z / width))
          ctx.beginPath()
          ctx.moveTo(pxPrev, pyPrev)
          ctx.lineTo(px, py)
          ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, `${(alpha * 0.5).toFixed(2)})`)
          ctx.lineWidth = Math.max(0.6, (1 - p.z / width) * 2.2)
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [density, speedMultiplier])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-[1] opacity-75 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
