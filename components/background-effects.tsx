"use client"

import type React from "react"
import { particleStyles, geometricPatterns } from "@/lib/particle-styles"
import { getGradientBlob } from "@/lib/theme"
import { animationConfig } from "@/lib/animations"

interface BackgroundEffectsProps {
  isDark: boolean
  mousePosition: { x: number; y: number }
  particlesRef: React.MutableRefObject<HTMLDivElement[]>
  clickRipples: Array<{ id: number; x: number; y: number }>
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  isDark,
  mousePosition,
  particlesRef,
  clickRipples,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced gradient blob */}
      <div
        className="gradient-blob absolute w-[512px] h-[512px] blur-3xl transition-opacity duration-500"
        style={{
          left: mousePosition.x - 256,
          top: mousePosition.y - 256,
          background: getGradientBlob(isDark),
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Enhanced particle system */}
      {[...Array(animationConfig.particles.count)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
          className="absolute transition-opacity duration-300"
          style={{
            left: `${5 + ((i * 8) % 90)}%`,
            top: `${10 + ((i * 12) % 80)}%`,
            width: particleStyles.getSize(i),
            height: particleStyles.getSize(i),
            borderRadius: particleStyles.getShape(i),
            background: particleStyles.getBackground(i, isDark),
            opacity: particleStyles.getOpacity(i),
            willChange: "transform",
            transform: "translate3d(0,0,0)",
            boxShadow: particleStyles.getShadow(i),
          }}
        />
      ))}

      {/* Enhanced geometric patterns */}
      {geometricPatterns.map((pattern, index) => (
        <div
          key={index}
          className={pattern.className}
          style={pattern.getStyle(isDark)}
        />
      ))}

      {/* Click ripple effects */}
      {clickRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: `radial-gradient(circle, transparent 30%, ${isDark ? "#d5b15f" : "#2f4763"}40, transparent 70%)`,
            border: `2px solid ${isDark ? "#d5b15f" : "#2f4763"}60`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  )
}
