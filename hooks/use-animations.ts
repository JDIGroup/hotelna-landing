"use client"

import type React from "react"
import { useRef, useEffect, useCallback } from "react"
import {
  animationConfig,
  particleAnimations,
  pageLoadAnimation,
  createGradientBlobAnimation,
  createParticleInteraction,
  createParticleBurst,
} from "@/lib/animations"

interface UseAnimationsProps {
  isDark: boolean
  mousePosition: { x: number; y: number }
  setClickRipples: React.Dispatch<React.SetStateAction<Array<{ id: number; x: number; y: number }>>>
}

export const useAnimations = ({ isDark, mousePosition, setClickRipples }: UseAnimationsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const gsapRef = useRef<any>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastMouseTime = useRef<number>(0)
  const isAnimating = useRef<boolean>(false)
  const activeAnimations = useRef<any[]>([])
  const trailPool = useRef<HTMLDivElement[]>([])
  const rippleIdRef = useRef<number>(0)

  // Initialize GSAP and particle animations
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      gsapRef.current = gsap

      // Initialize particles
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          // Set performance optimizations
          particle.style.willChange = "transform"
          particle.style.transform = "translate3d(0,0,0)"
          particle.style.backfaceVisibility = "hidden"
          particle.style.perspective = "1000px"

          // Set initial position
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 360,
            scale: 0.6 + Math.random() * 0.8,
            transformOrigin: "center center",
          })

          // Apply animation based on index
          const animationType = index % 4
          let timeline

          switch (animationType) {
            case 0:
              timeline = particleAnimations.spiral(particle, index, gsap)
              break
            case 1:
              timeline = particleAnimations.pulse(particle, index, gsap)
              break
            case 2:
              timeline = particleAnimations.magnetic(particle, index, gsap)
              break
            default:
              timeline = particleAnimations.quantum(particle, index, gsap)
          }

          activeAnimations.current.push(timeline)
        }
      })

      // Page load animation
      pageLoadAnimation(gsap)
    }

    loadGSAP()

    return () => {
      activeAnimations.current.forEach((animation) => {
        if (animation && animation.kill) {
          animation.kill()
        }
      })
      activeAnimations.current = []
    }
  }, [])

  const createIntenseTrail = useCallback((x: number, y: number, index: number, intensity: number) => {
    if (!gsapRef.current || !containerRef.current) return

    let trail = trailPool.current.pop()

    if (!trail) {
      trail = document.createElement("div")
      trail.style.position = "absolute"
      trail.style.borderRadius = "50%"
      trail.style.pointerEvents = "none"
      trail.style.zIndex = "5"
    }

    const size = 3 + intensity * 4
    trail.style.width = `${size}px`
    trail.style.height = `${size}px`
    trail.style.left = `${x - size / 2}px`
    trail.style.top = `${y - size / 2}px`

    const colors = ["#d5b15f", "#cfc0ae", "#2f4763"]
    trail.style.background = `radial-gradient(circle, ${colors[index % 3]}, transparent)`
    trail.style.opacity = "1"
    trail.style.transform = "scale(0)"
    trail.style.boxShadow = `0 0 ${size * 2}px ${colors[index % 3]}40`

    containerRef.current.appendChild(trail)

    gsapRef.current.fromTo(
      trail,
      { scale: 0, opacity: 1, rotation: 0 },
      {
        duration: animationConfig.durations.trailAnimation,
        scale: 2 + intensity,
        opacity: 0,
        rotation: 360,
        ease: animationConfig.easings.trail,
        onComplete: () => {
          if (trail && trail.parentNode) {
            trail.parentNode.removeChild(trail)
            if (trailPool.current.length < animationConfig.particles.maxTrails) {
              trailPool.current.push(trail)
            }
          }
        },
      },
    )
  }, [])

  const throttledMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMouseTime.current < animationConfig.particles.throttleDelay) return
    lastMouseTime.current = now

    if (isAnimating.current) return
    isAnimating.current = true

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const newPosition = { x: e.clientX, y: e.clientY }

      if (gsapRef.current && containerRef.current) {
        // Animate gradient blob
        const gradientBlob = containerRef.current.querySelector(".gradient-blob")
        if (gradientBlob) {
          createGradientBlobAnimation(gradientBlob, newPosition, gsapRef.current)
        }

        // Particle interactions
        particlesRef.current.forEach((particle, index) => {
          if (particle && index < animationConfig.particles.count) {
            const result = createParticleInteraction(particle, newPosition, index, gsapRef.current)

            if (result && result.force > 0.5 && Math.random() > 0.7) {
              createIntenseTrail(result.particleX, result.particleY, index, result.force)
            }
          }
        })
      }

      isAnimating.current = false
    })
  }, [createIntenseTrail])

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = rippleIdRef.current++

    setClickRipples((prev) => [...prev, { id, x, y }])

    // Remove ripple after animation
    setTimeout(() => {
      setClickRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 1000)

    // Particle burst effect
    if (gsapRef.current) {
      particlesRef.current.forEach((particle) => {
        if (particle) {
          createParticleBurst(particle, { x, y }, gsapRef.current)
        }
      })
    }
  }, [setClickRipples])

  // Mouse move event listener
  useEffect(() => {
    window.addEventListener("mousemove", throttledMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [throttledMouseMove])

  return {
    containerRef,
    particlesRef,
    gsapRef,
    handleClick,
  }
}
