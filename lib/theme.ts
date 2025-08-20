import type React from "react"

export const themeConfig = {
  colors: {
    primary: "#d5b15f", // Gold
    secondary: "#cfc0ae", // Light beige
    accent: "#2f4763", // Navy blue
    black: "#000000",
    white: "#ffffff",
    background: "#ffffff",
    text: "#000000",
    border: "#2f4763",
    cardBg: "rgba(255, 255, 255, 0.95)",
    footerBg: "rgba(207, 192, 174, 0.1)",
  },
  gradients: {
    main: "radial-gradient(ellipse 600px 400px, rgba(213, 177, 95, 0.15), rgba(47, 71, 99, 0.1), rgba(207, 192, 174, 0.06), transparent)",
  },
  transitions: {
    theme: "all 0.5s",
    standard: "all 0.3s",
    fast: "all 0.2s",
  },
}

// Light theme styles (no need for caching since there's only one theme)
export const getThemeStyles = (): React.CSSProperties => ({
  backgroundColor: themeConfig.colors.background,
  color: themeConfig.colors.text,
})

export const getCardStyles = (): React.CSSProperties => ({
  border: `1px solid ${themeConfig.colors.border}`,
  backgroundColor: themeConfig.colors.cardBg,
})

export const getFooterStyles = (): React.CSSProperties => ({
  borderTop: `1px solid ${themeConfig.colors.border}`,
  backgroundColor: themeConfig.colors.footerBg,
})

export const getGradientBlob = () => themeConfig.gradients.main
