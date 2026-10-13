'use client'

import React, { useRef, useState } from 'react'

interface TiltCard3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxTilt?: number
  glareOpacity?: number
  className?: string
  style?: React.CSSProperties
}

export function TiltCard3D({
  children,
  maxTilt = 8,
  glareOpacity = 0.2,
  className = '',
  style = {},
  ...props
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)')
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) translateZ(10px)`
    )
    setGlarePosition({ x: glareX, y: glareY, opacity: glareOpacity })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)')
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      {...props}
    >
      {children}
      {/* Dynamic Specular Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300 ease-out"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  )
}
