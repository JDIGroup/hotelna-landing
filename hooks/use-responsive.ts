"use client"

import { useState, useEffect } from "react"

interface ScreenSize {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  height: number
  orientation: 'portrait' | 'landscape'
  isTouch: boolean
}

export const useResponsiveDesign = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1200,
    height: 800,
    orientation: 'landscape',
    isTouch: false
  })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const orientation = width > height ? 'landscape' : 'portrait'
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
        height,
        orientation,
        isTouch
      })
    }

    // Initial check
    updateScreenSize()

    // Listen for resize events
    window.addEventListener('resize', updateScreenSize)
    window.addEventListener('orientationchange', updateScreenSize)

    return () => {
      window.removeEventListener('resize', updateScreenSize)
      window.removeEventListener('orientationchange', updateScreenSize)
    }
  }, [])

  return screenSize
}

// Breakpoint utilities
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

export const useBreakpoint = (breakpoint: keyof typeof breakpoints): boolean => {
  const { width } = useResponsiveDesign()
  return width >= breakpoints[breakpoint]
}

// Media query hook
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

// Common responsive utilities
export const getResponsiveValue = <T>(
  values: {
    xs?: T
    sm?: T
    md?: T
    lg?: T
    xl?: T
    '2xl'?: T
  },
  currentWidth: number
): T | undefined => {
  if (currentWidth >= breakpoints['2xl'] && values['2xl']) return values['2xl']
  if (currentWidth >= breakpoints.xl && values.xl) return values.xl
  if (currentWidth >= breakpoints.lg && values.lg) return values.lg
  if (currentWidth >= breakpoints.md && values.md) return values.md
  if (currentWidth >= breakpoints.sm && values.sm) return values.sm
  if (values.xs) return values.xs

  // Return the first available value as fallback
  return Object.values(values)[0]
}

// Responsive spacing utility
export const getResponsiveSpacing = (
  mobile: string,
  tablet?: string,
  desktop?: string
): string => {
  const { isMobile, isTablet } = useResponsiveDesign()

  if (isMobile) return mobile
  if (isTablet && tablet) return tablet
  if (desktop) return desktop

  return mobile
}

// Safe area utilities for mobile devices
export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })

  useEffect(() => {
    const updateSafeArea = () => {
      const computedStyle = getComputedStyle(document.documentElement)

      setSafeArea({
        top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
        right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
        left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0')
      })
    }

    updateSafeArea()
    window.addEventListener('resize', updateSafeArea)
    window.addEventListener('orientationchange', updateSafeArea)

    return () => {
      window.removeEventListener('resize', updateSafeArea)
      window.removeEventListener('orientationchange', updateSafeArea)
    }
  }, [])

  return safeArea
}
