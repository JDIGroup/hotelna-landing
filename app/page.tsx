"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BackgroundEffects } from "@/components/background-effects"
import { MainContent } from "@/components/main-content"
import { useAnimations } from "@/hooks/use-animations"
import { getThemeStyles } from "@/lib/theme"

export default function HotelnaLanding() {
  const [isDark, setIsDark] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const { containerRef, particlesRef, gsapRef, handleClick } = useAnimations({
    isDark,
    mousePosition,
    setClickRipples,
  })

  const themeStyles = getThemeStyles(isDark)

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("hotelna-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [])

  // Apply theme styles to document body
  useEffect(() => {
    console.log("[v0] Theme changing to:", isDark ? "dark" : "light")
    localStorage.setItem("hotelna-theme", isDark ? "dark" : "light")

    document.body.style.backgroundColor = isDark ? "#000000" : "#ffffff"
    document.body.style.color = isDark ? "#ffffff" : "#000000"

    console.log("[v0] Applied theme styles directly")
  }, [isDark])

  // Update mouse position for animations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      style={themeStyles}
      className="min-h-screen flex flex-col relative overflow-hidden transition-all duration-500 cursor-crosshair"
      onClick={handleClick}
    >
      <BackgroundEffects
        isDark={isDark}
        mousePosition={mousePosition}
        particlesRef={particlesRef}
        clickRipples={clickRipples}
      />

      <MainContent
        isDark={isDark}
        setIsDark={setIsDark}
        gsapRef={gsapRef}
        themeStyles={themeStyles}
      />
    </div>
  )
}
