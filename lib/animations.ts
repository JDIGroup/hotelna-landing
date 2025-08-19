// gsap is dynamically imported, so we don't need the import here
// import { gsap } from "gsap"

// GSAP type definition for dynamic imports
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

export const animationConfig = {
  particles: {
    count: 12,
    maxTrails: 8,
    throttleDelay: 12,
    influenceRadius: 250,
    maxInfluenceRadius: 300,
  },
  durations: {
    elementHover: 0.4,
    gradientBlob: 0.2,
    particleInteraction: 0.3,
    trailAnimation: 1.5,
    particleBurst: 0.6,
    pageLoad: 1.2,
  },
  easings: {
    hover: "back.out(1.7)",
    blob: "power3.out",
    particle: "power3.out",
    trail: "power2.out",
    burst: "back.out(1.7)",
    pageLoad: "back.out(1.7)",
  },
}

export const particleAnimations = {
  spiral: (particle: HTMLElement, index: number, gsap: GSAPInstance) => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(particle, {
      duration: 12,
      rotation: 720,
      scale: 1.5,
      transformOrigin: "center center",
      ease: "power2.inOut",
    }).to(
      particle,
      {
        duration: 6,
        x: `+=${Math.sin(index) * 200}`,
        y: `+=${Math.cos(index) * 150}`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0,
    )
    return tl
  },

  pulse: (particle: HTMLElement, index: number, gsap: GSAPInstance) => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(particle, {
      duration: 4,
      scale: 2,
      opacity: 0.8,
      rotation: 360,
      ease: "power3.inOut",
      yoyo: true,
    }).to(
      particle,
      {
        duration: 8,
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 200 - 100}`,
        ease: "elastic.inOut(1, 0.3)",
        repeat: -1,
        yoyo: true,
      },
      0,
    )
    return tl
  },

  magnetic: (particle: HTMLElement, index: number, gsap: GSAPInstance) => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(particle, {
      duration: 10,
      rotation: 540,
      scale: 0.3,
      ease: "back.inOut(1.7)",
      yoyo: true,
    }).to(
      particle,
      {
        duration: 6,
        x: `+=${Math.sin(index * 0.5) * 250}`,
        y: `+=${Math.cos(index * 0.3) * 180}`,
        ease: "power4.inOut",
        repeat: -1,
        yoyo: true,
      },
      0,
    )
    return tl
  },

  quantum: (particle: HTMLElement, index: number, gsap: GSAPInstance) => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(particle, {
      duration: 5,
      scale: 1.8,
      rotation: -270,
      opacity: 0.9,
      ease: "bounce.inOut",
      yoyo: true,
    }).to(
      particle,
      {
        duration: 7,
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 300 - 150}`,
        ease: "circ.inOut",
        repeat: -1,
        yoyo: true,
      },
      0,
    )
    return tl
  },
}

export const pageLoadAnimation = (gsap: GSAPInstance) => {
  return gsap.fromTo(
    "main > *",
    {
      y: 60,
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
      rotationX: 15,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotationX: 0,
      duration: animationConfig.durations.pageLoad,
      stagger: 0.15,
      ease: animationConfig.easings.pageLoad,
      delay: 0.3,
    },
  )
}

export const createGradientBlobAnimation = (
  element: Element,
  position: { x: number; y: number },
  gsap: GSAPInstance,
) => {
  return gsap.to(element, {
    duration: animationConfig.durations.gradientBlob,
    x: position.x - 256,
    y: position.y - 256,
    scale: 1.3,
    rotation: Math.sin(Date.now() * 0.001) * 10,
    ease: animationConfig.easings.blob,
    overwrite: "auto",
  })
}

export const createParticleInteraction = (
  particle: HTMLElement,
  mousePosition: { x: number; y: number },
  index: number,
  gsap: GSAPInstance,
) => {
  const rect = particle.getBoundingClientRect()
  const particleX = rect.left + rect.width / 2
  const particleY = rect.top + rect.height / 2
  const distance = Math.sqrt(
    Math.pow(mousePosition.x - particleX, 2) + Math.pow(mousePosition.y - particleY, 2),
  )

  if (distance < animationConfig.particles.influenceRadius) {
    const force = (animationConfig.particles.influenceRadius - distance) / animationConfig.particles.influenceRadius
    const angle = Math.atan2(mousePosition.y - particleY, mousePosition.x - particleX)
    const direction = index % 2 === 0 ? 1 : -1

    return {
      animation: gsap.to(particle, {
        duration: animationConfig.durations.particleInteraction,
        x: `+=${Math.cos(angle) * force * 25 * direction}`,
        y: `+=${Math.sin(angle) * force * 25 * direction}`,
        scale: 1 + force * 0.6,
        rotation: `+=${force * 60 * direction}`,
        ease: animationConfig.easings.particle,
        overwrite: "auto",
      }),
      force,
      particleX,
      particleY,
    }
  }
  return null
}

export const createParticleBurst = (
  particle: HTMLElement,
  clickPosition: { x: number; y: number },
  gsap: GSAPInstance,
) => {
  const rect = particle.getBoundingClientRect()
  const particleX = rect.left + rect.width / 2
  const particleY = rect.top + rect.height / 2
  const distance = Math.sqrt(
    Math.pow(clickPosition.x - particleX, 2) + Math.pow(clickPosition.y - particleY, 2),
  )

  if (distance < animationConfig.particles.maxInfluenceRadius) {
    const force = (animationConfig.particles.maxInfluenceRadius - distance) / animationConfig.particles.maxInfluenceRadius
    const angle = Math.atan2(particleY - clickPosition.y, particleX - clickPosition.x)

    return gsap.to(particle, {
      duration: animationConfig.durations.particleBurst,
      x: `+=${Math.cos(angle) * force * 80}`,
      y: `+=${Math.sin(angle) * force * 80}`,
      scale: 1.5 + force,
      rotation: `+=${force * 180}`,
      ease: animationConfig.easings.burst,
      overwrite: "auto",
    })
  }
  return null
}

export const createElementHoverAnimation = (
  element: HTMLElement,
  isEntering: boolean,
  gsap: GSAPInstance,
) => {
  if (isEntering) {
    return gsap.to(element, {
      duration: animationConfig.durations.elementHover,
      scale: 1.05,
      rotationY: 5,
      rotationX: 2,
      z: 30,
      ease: animationConfig.easings.hover,
      overwrite: "auto",
    })
  } else {
    return gsap.to(element, {
      duration: animationConfig.durations.elementHover,
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      z: 0,
      ease: "power2.out",
      overwrite: "auto",
    })
  }
}
