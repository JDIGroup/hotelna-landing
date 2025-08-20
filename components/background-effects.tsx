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
      {/* Gold Pattern Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pattern-shift"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%),
            linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%)
          `,
          backgroundSize: '60px 60px',
          backgroundColor: isDark ? 'rgba(213, 177, 95, 0.08)' : 'rgba(213, 177, 95, 0.12)',
          opacity: isDark ? 0.15 : 0.25,
        }}
      />

      {/* Subtle H pattern overlay */}
      <div
        className="absolute inset-0 subtle-glow"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgba(213, 177, 95, 0.3) 20px,
              rgba(213, 177, 95, 0.3) 22px,
              transparent 22px,
              transparent 38px,
              rgba(213, 177, 95, 0.3) 38px,
              rgba(213, 177, 95, 0.3) 40px,
              transparent 40px,
              transparent 60px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 15px,
              rgba(213, 177, 95, 0.3) 15px,
              rgba(213, 177, 95, 0.3) 17px,
              transparent 17px,
              transparent 43px,
              rgba(213, 177, 95, 0.3) 43px,
              rgba(213, 177, 95, 0.3) 45px,
              transparent 45px,
              transparent 60px
            )
          `,
          backgroundSize: '60px 60px',
          opacity: 0.1,
        }}
      />

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
