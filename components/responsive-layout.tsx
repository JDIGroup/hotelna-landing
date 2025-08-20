"use client"

import type React from "react"
import { useResponsiveDesign } from "@/hooks/use-responsive"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
  mobileClassName?: string
  tabletClassName?: string
  desktopClassName?: string
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  className = "",
  mobileClassName = "",
  tabletClassName = "",
  desktopClassName = ""
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsiveDesign()

  const getResponsiveClasses = () => {
    let classes = className

    if (isMobile && mobileClassName) {
      classes += ` ${mobileClassName}`
    } else if (isTablet && tabletClassName) {
      classes += ` ${tabletClassName}`
    } else if (isDesktop && desktopClassName) {
      classes += ` ${desktopClassName}`
    }

    return classes.trim()
  }

  return (
    <div className={getResponsiveClasses()}>
      {children}
    </div>
  )
}

interface ResponsiveContainerProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'md',
  className = ""
}) => {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-4xl',
    'xl': 'max-w-6xl',
    '2xl': 'max-w-7xl',
    'full': 'max-w-full'
  }

  const paddingClasses = {
    'none': '',
    'sm': 'px-2 sm:px-4',
    'md': 'px-3 sm:px-4 md:px-6 lg:px-8',
    'lg': 'px-4 sm:px-6 md:px-8 lg:px-12'
  }

  return (
    <div className={`mx-auto w-full ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: React.ReactNode
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, lg: 3 },
  gap = 'md',
  className = ""
}) => {
  const gapClasses = {
    'sm': 'gap-2 sm:gap-3',
    'md': 'gap-3 sm:gap-4 md:gap-6',
    'lg': 'gap-4 sm:gap-6 md:gap-8'
  }

  const getGridClasses = () => {
    let classes = 'grid '

    if (columns.xs) classes += `grid-cols-${columns.xs} `
    if (columns.sm) classes += `sm:grid-cols-${columns.sm} `
    if (columns.md) classes += `md:grid-cols-${columns.md} `
    if (columns.lg) classes += `lg:grid-cols-${columns.lg} `
    if (columns.xl) classes += `xl:grid-cols-${columns.xl} `

    classes += gapClasses[gap]

    return classes
  }

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {children}
    </div>
  )
}

interface ResponsiveTextProps {
  children: React.ReactNode
  variant?: 'body' | 'heading' | 'subheading' | 'caption'
  className?: string
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  className = ""
}) => {
  const variantClasses = {
    'body': 'text-sm sm:text-base md:text-lg',
    'heading': 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
    'subheading': 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    'caption': 'text-xs sm:text-sm'
  }

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

interface ResponsiveSpacingProps {
  children: React.ReactNode
  y?: 'sm' | 'md' | 'lg' | 'xl'
  x?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const ResponsiveSpacing: React.FC<ResponsiveSpacingProps> = ({
  children,
  y = 'md',
  x = 'md',
  className = ""
}) => {
  const ySpacingClasses = {
    'sm': 'py-2 sm:py-3 md:py-4',
    'md': 'py-3 sm:py-4 md:py-6 lg:py-8',
    'lg': 'py-4 sm:py-6 md:py-8 lg:py-12',
    'xl': 'py-6 sm:py-8 md:py-12 lg:py-16'
  }

  const xSpacingClasses = {
    'sm': 'px-2 sm:px-3 md:px-4',
    'md': 'px-3 sm:px-4 md:px-6 lg:px-8',
    'lg': 'px-4 sm:px-6 md:px-8 lg:px-12',
    'xl': 'px-6 sm:px-8 md:px-12 lg:px-16'
  }

  return (
    <div className={`${ySpacingClasses[y]} ${xSpacingClasses[x]} ${className}`}>
      {children}
    </div>
  )
}
