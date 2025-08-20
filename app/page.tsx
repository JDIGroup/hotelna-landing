"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, memo } from "react"
import dynamic from "next/dynamic"
import { useAnimations } from "@/hooks/use-animations"
import { getThemeStyles } from "@/lib/theme"

// Lazy load heavy components
const BackgroundEffects = dynamic(() => import("@/components/background-effects").then(mod => ({ default: mod.BackgroundEffects })), {
  ssr: false,
  loading: () => null
})

const MainContent = dynamic(() => import("@/components/main-content").then(mod => ({ default: mod.MainContent })), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
})

function HotelnaLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const { containerRef, particlesRef, gsapRef, handleClick } = useAnimations({
    mousePosition,
    setClickRipplesAction: setClickRipples,
  })

  // Memoize theme styles to prevent recalculation (always light theme)
  const themeStyles = useMemo(() => getThemeStyles(), [])

  // Memoize background gradient to prevent recalculation (always light theme)
  const backgroundStyle = useMemo(() => ({
    ...themeStyles,
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
  }), [themeStyles])

  // Apply light theme styles to document body
  useEffect(() => {
    localStorage.setItem("hotelna-theme", "light")
    document.body.style.backgroundColor = "#ffffff"
    document.body.style.color = "#000000"
  }, [])

  // Optimize mouse tracking with throttling and passive listeners
  useEffect(() => {
    let lastUpdate = 0
    const throttleDelay = 16 // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate >= throttleDelay) {
        setMousePosition({ x: e.clientX, y: e.clientY })
        lastUpdate = now
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      style={backgroundStyle}
      className="min-h-screen flex flex-col relative overflow-hidden transition-all duration-500 cursor-crosshair will-change-auto mobile-safe-area responsive-bg"
      onClick={handleClick}
    >
      <MainContent
        gsapRef={gsapRef}
        themeStyles={themeStyles}
      />
    </div>
  )
}

export default memo(HotelnaLanding)
