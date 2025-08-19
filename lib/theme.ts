export const themeConfig = {
  colors: {
    primary: "#d5b15f", // Gold
    secondary: "#cfc0ae", // Light beige
    accent: "#2f4763", // Navy blue
    black: "#000000",
    white: "#ffffff",
    light: {
      background: "#ffffff",
      text: "#000000",
      border: "#2f4763",
      cardBg: "rgba(255, 255, 255, 0.95)",
      footerBg: "rgba(207, 192, 174, 0.1)",
    },
    dark: {
      background: "#000000",
      text: "#ffffff",
      border: "rgba(255, 255, 255, 0.15)",
      cardBg: "rgba(0, 0, 0, 0.95)",
      footerBg: "rgba(0, 0, 0, 0.95)",
    },
  },
  gradients: {
    light: "radial-gradient(ellipse 600px 400px, rgba(213, 177, 95, 0.15), rgba(47, 71, 99, 0.1), rgba(207, 192, 174, 0.06), transparent)",
    dark: "radial-gradient(ellipse 600px 400px, rgba(213, 177, 95, 0.2), rgba(207, 192, 174, 0.12), rgba(47, 71, 99, 0.08), transparent)",
  },
  transitions: {
    theme: "all 0.5s",
    standard: "all 0.3s",
    fast: "all 0.2s",
  },
}

export const getThemeStyles = (isDark: boolean) => ({
  backgroundColor: isDark ? themeConfig.colors.dark.background : themeConfig.colors.light.background,
  color: isDark ? themeConfig.colors.dark.text : themeConfig.colors.light.text,
})

export const getCardStyles = (isDark: boolean) => ({
  border: `1px solid ${isDark ? themeConfig.colors.dark.border : themeConfig.colors.light.border}`,
  backgroundColor: isDark ? themeConfig.colors.dark.cardBg : themeConfig.colors.light.cardBg,
})

export const getFooterStyles = (isDark: boolean) => ({
  borderTop: `1px solid ${isDark ? themeConfig.colors.dark.border : themeConfig.colors.light.border}`,
  backgroundColor: isDark ? themeConfig.colors.dark.footerBg : themeConfig.colors.light.footerBg,
})

export const getGradientBlob = (isDark: boolean) =>
  isDark ? themeConfig.gradients.dark : themeConfig.gradients.light
