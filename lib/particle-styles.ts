export const particleStyles = {
  sizes: ["16px", "10px", "14px", "12px", "8px"],
  shapes: [
    "50%", // Circle
    "30% 70% 70% 30% / 30% 30% 70% 70%", // Organic blob
    "20% 80%", // Ellipse
    "40% 60%", // Rounded rectangle
  ],
  getBackground: (index: number, isDark: boolean) => {
    const mod = index % 5
    switch (mod) {
      case 0:
        return "linear-gradient(45deg, #d5b15f, #cfc0ae)"
      case 1:
        return isDark
          ? "radial-gradient(circle, #cfc0ae, rgba(207, 192, 174, 0.4), transparent)"
          : "radial-gradient(circle, #2f4763, rgba(47, 71, 99, 0.4), transparent)"
      case 2:
        return `conic-gradient(from ${index * 30}deg, #d5b15f, #cfc0ae, #2f4763, #d5b15f)`
      case 3:
        return isDark
          ? "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.5), transparent)"
          : "linear-gradient(135deg, #000000, rgba(0,0,0,0.5), transparent)"
      default:
        return `linear-gradient(${index * 45}deg, #d5b15f, transparent, #cfc0ae)`
    }
  },
  getShadow: (index: number) => {
    const mod = index % 3
    switch (mod) {
      case 0:
        return "0 0 25px rgba(213, 177, 95, 0.4)"
      case 1:
        return "0 0 20px rgba(207, 192, 174, 0.3)"
      default:
        return "0 0 15px rgba(47, 71, 99, 0.2)"
    }
  },
  getOpacity: (index: number) => 0.3 + (index % 4) * 0.15,
  getSize: (index: number) => particleStyles.sizes[index % 5],
  getShape: (index: number) => particleStyles.shapes[index % 4],
}

export const geometricPatterns = [
  {
    className: "absolute top-1/6 left-1/8 w-12 h-12 opacity-30 transition-all duration-500 animate-spin-slow",
    getStyle: (isDark: boolean) => ({
      background: `conic-gradient(from 45deg, ${isDark ? "#cfc0ae" : "#2f4763"}, #d5b15f, ${isDark ? "#ffffff" : "#000000"}, #d5b15f)`,
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      willChange: "transform",
      transform: "translate3d(0,0,0)",
      filter: "blur(0.5px)",
    }),
  },
  {
    className: "absolute top-1/5 right-1/3 w-8 h-8 opacity-25 transition-all duration-500 animate-pulse",
    getStyle: (isDark: boolean) => ({
      background: `linear-gradient(60deg, #d5b15f, ${isDark ? "#cfc0ae" : "#2f4763"})`,
      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      willChange: "transform",
      transform: "translate3d(0,0,0)",
      animation: "float-slow 6s ease-in-out infinite",
    }),
  },
  {
    className: "absolute top-3/4 right-1/6 w-10 h-10 opacity-35 transition-all duration-500 animate-pulse",
    getStyle: (isDark: boolean) => ({
      background: `radial-gradient(ellipse, #d5b15f, ${isDark ? "#cfc0ae" : "#2f4763"}, transparent)`,
      borderRadius: "50%",
      willChange: "transform",
      transform: "translate3d(0,0,0)",
      boxShadow: "0 0 30px rgba(213, 177, 95, 0.4)",
    }),
  },
  {
    className: "absolute top-2/3 left-1/5 w-6 h-12 opacity-30 transition-all duration-500",
    getStyle: (isDark: boolean) => ({
      background: `linear-gradient(90deg, ${isDark ? "#ffffff" : "#000000"}, #d5b15f, transparent)`,
      clipPath: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
      willChange: "transform",
      transform: "translate3d(0,0,0) rotate(15deg)",
      animation: "float-slow 10s ease-in-out infinite",
    }),
  },
  {
    className: "absolute top-1/2 left-1/6 w-10 h-6 opacity-28 transition-all duration-500",
    getStyle: (isDark: boolean) => ({
      background: `conic-gradient(from 90deg, #cfc0ae, #d5b15f, ${isDark ? "#ffffff" : "#2f4763"})`,
      borderRadius: "50% 10% 50% 10%",
      willChange: "transform",
      transform: "translate3d(0,0,0)",
      animation: "spin-slow 12s linear infinite",
    }),
  },
]
