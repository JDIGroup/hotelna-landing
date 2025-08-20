"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle, Sun, Moon, Instagram, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"
import { content, socialLinks } from "@/lib/content"
import { getCardStyles, getFooterStyles, themeConfig } from "@/lib/theme"
import { createElementHoverAnimation } from "@/lib/animations"

type GSAPInstance = {
  timeline: (vars?: object) => GSAPTimeline
  to: (targets: string | Element | HTMLElement | NodeList, vars: object) => GSAPTween
  fromTo: (targets: string | Element | HTMLElement | NodeList, fromVars: object, toVars: object) => GSAPTween
}

type GSAPTimeline = {
  to: (targets: string | Element | HTMLElement | NodeList, vars: object, position?: string | number) => GSAPTimeline
  repeat: (value: number) => GSAPTimeline
}

type GSAPTween = {
  duration: (value: number) => GSAPTween
  repeat: (value: number) => GSAPTween
  yoyo: (value: boolean) => GSAPTween
}

interface MainContentProps {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
  gsapRef: React.MutableRefObject<GSAPInstance | null>
  themeStyles: React.CSSProperties
}

export const MainContent: React.FC<MainContentProps> = ({
  isDark,
  setIsDark,
  gsapRef,
}) => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log("Newsletter signup:", email)
      setIsSubmitted(true)
      setEmail("")
    }
  }

  const handleElementHover = useCallback((element: HTMLElement, isEntering: boolean) => {
    if (gsapRef.current) {
      createElementHoverAnimation(element, isEntering, gsapRef.current)
    }
  }, [gsapRef])

  const iconComponents = {
    Instagram,
    Facebook,
    Linkedin,
  }

  return (
    <>
      {/* Theme Toggle Button */}
      {/* <div className="absolute top-6 right-6 z-50">
        <Button
          onClick={() => setIsDark(!isDark)}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full backdrop-blur-sm hover:scale-105 active:scale-95 transition-all duration-200"
          style={{
            border: `1px solid ${isDark ? themeConfig.colors.dark.border : themeConfig.colors.light.border}`,
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {isDark ? (
            <Sun
              className="w-5 h-5 transition-all duration-200 rotate-0 hover:rotate-90"
              style={{ color: themeConfig.colors.white }}
            />
          ) : (
            <Moon
              className="w-5 h-5 transition-all duration-200 rotate-0 hover:rotate-12"
              style={{ color: themeConfig.colors.accent }}
            />
          )}
        </Button>
      </div> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center relative z-10"
      style={{
        background: "url('/images/HOTELNA PATTERNS-01.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
      }}>
        <div
          className="mb-12 transform transition-transform duration-300 cursor-pointer"
          onMouseEnter={(e) => handleElementHover(e.currentTarget, true)}
          onMouseLeave={(e) => handleElementHover(e.currentTarget, false)}
        >
          {/* <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center transition-all duration-300">
            <Image
              width={128}
              height={128}
              src={isDark ? "/images/hotelna-logo-dark.png" : "/images/hotelna-logo-light.png"}
              alt={content.accessibility.logoAlt}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
            </div> */}
            <div className="w-100">
            <Image
            width={300}
            height={100}
            src={isDark ? "/images/hotelna-brand-dark.png" : "/images/Asset 8.png"}
            alt={content.accessibility.logoAlt}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
            </div>

        </div>

        {/* Heading */}
        {/* <h2
          className="text-3xl md:text-5xl lg:text-6xl font-semibold uppercase mb-6 max-w-4xl leading-tight transition-colors duration-300 font-sans tracking-wide"
          style={{ color: isDark ? themeConfig.colors.dark.text : themeConfig.colors.light.text }}
        >
          {content.brand.tagline}
        </h2> */}

        {/* Description */}
        <p
          className="text-lg md:text-xl font-light mb-8 max-w-2xl transition-colors duration-300 font-sans"
          style={{ color: isDark ? themeConfig.colors.secondary : themeConfig.colors.accent }}
        >
          Under-construction
          {/* {content.brand.description} */}
          {/* {content.brand.subtitle} */}
        </p>

        {/* Animated Coming Soon */}
        {/* <div className="mb-8 relative h-20 md:h-24 lg:h-28 flex items-center justify-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold relative overflow-visible leading-none"
            style={{
              color: isDark ? themeConfig.colors.primary : themeConfig.colors.accent,
              textShadow: isDark
                ? '0 0 20px rgba(213, 177, 95, 0.5), 0 0 40px rgba(213, 177, 95, 0.3)'
                : '0 0 20px rgba(47, 71, 99, 0.3)',
              height: 'fit-content',
            }}
          > */}
            {/* Animated text with staggered letters */}
            {/* <span className="inline-block">
              {content.brand.comingsoon?.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-bounce"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '2s',
                    animationIterationCount: 'infinite',
                    transformOrigin: 'center bottom',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span> */}

            {/* Glowing underline effect */}
            {/* <div
              className="absolute bottom-0 left-0 h-1 animate-pulse"
              style={{
                width: '100%',
                background: `linear-gradient(90deg, transparent, ${themeConfig.colors.primary}, transparent)`,
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            /> */}

            {/* Sparkle effects */}
            {/* <div className="absolute -top-2 -right-2 w-3 h-3 animate-ping">
              <div
                className="w-full h-full rounded-full opacity-75"
                style={{ backgroundColor: themeConfig.colors.primary }}
              />
            </div>
            <div className="absolute top-1/2 -left-4 w-2 h-2 animate-ping">
              <div
                className="w-full h-full rounded-full opacity-60"
                style={{
                  backgroundColor: themeConfig.colors.primary,
                  animationDelay: '1s'
                }}
              />
            </div>
            <div className="absolute -bottom-1 right-1/4 w-2 h-2 animate-ping">
              <div
                className="w-full h-full rounded-full opacity-50"
                style={{
                  backgroundColor: themeConfig.colors.primary,
                  animationDelay: '2s'
                }}
              />
            </div>
          </h1>
        </div> */}

        {/* Newsletter Card */}
        {/* <Card
          className="w-full max-w-md mb-12 shadow-lg hover:shadow-xl transition-all duration-300"
          style={getCardStyles(isDark)}
        >
          <CardContent className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3
                  className="text-lg font-semibold uppercase mb-4 transition-colors duration-300"
                  style={{ color: isDark ? themeConfig.colors.dark.text : themeConfig.colors.light.text }}
                >
                  {content.form.title}
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={content.form.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 focus:ring-[#d5b15f] focus:border-[#d5b15f] transition-colors duration-300"
                    style={{
                      border: `1px solid ${isDark ? themeConfig.colors.dark.border : themeConfig.colors.light.border}`,
                      backgroundColor: isDark ? themeConfig.colors.dark.background : themeConfig.colors.light.background,
                      color: isDark ? themeConfig.colors.dark.text : themeConfig.colors.light.text,
                    }}
                  />
                  <Button
                    type="submit"
                    className="font-semibold px-6 transform hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundColor: themeConfig.colors.primary,
                      color: "#000000",
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {content.form.buttonText}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <CheckCircle
                  className="w-8 h-8 mx-auto mb-3 animate-bounce"
                  style={{ color: themeConfig.colors.primary }}
                />
                <h3
                  className="text-lg font-semibold uppercase mb-2 transition-colors duration-300"
                  style={{ color: isDark ? themeConfig.colors.dark.text : themeConfig.colors.light.text }}
                >
                  {content.form.successTitle}
                </h3>
                <p
                  className="font-light transition-colors duration-300"
                  style={{ color: isDark ? themeConfig.colors.secondary : themeConfig.colors.accent }}
                >
                  {content.form.successMessage}
                </p>
              </div>
            )}
          </CardContent>
        </Card> */}

        {/* Social Links */}
        {/* <div className="flex gap-6 mb-8">
          {socialLinks.map((link, index) => {
            const IconComponent = iconComponents[link.icon as keyof typeof iconComponents]
            return (
              <a
                key={index}
                href={link.href}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12 active:scale-95"
                style={{
                  backgroundColor: isDark ? themeConfig.colors.accent : themeConfig.colors.accent,
                  color: isDark ? "#ffffff" : "#ffffff",
                }}
                aria-label={content.accessibility.socialLinks[link.name.toLowerCase() as keyof typeof content.accessibility.socialLinks]}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            )
          })}
        </div> */}
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-4 transition-colors duration-300 relative z-10"
        style={getFooterStyles(isDark)}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="font-light text-sm transition-colors duration-300"
            style={{ color: isDark ? themeConfig.colors.white : themeConfig.colors.accent }}
          >
            {content.footer.copyright}
          </p>
        </div>
      </footer>
    </>
  )
}
