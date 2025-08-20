// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startMeasure(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark(`${name}-start`)
    }
  }

  endMeasure(name: string): number {
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)

      const measures = performance.getEntriesByName(name, 'measure')
      const duration = measures[measures.length - 1]?.duration || 0

      this.metrics.set(name, duration)

      // Clean up marks
      performance.clearMarks(`${name}-start`)
      performance.clearMarks(`${name}-end`)
      performance.clearMeasures(name)

      return duration
    }
    return 0
  }

  getMetric(name: string): number {
    return this.metrics.get(name) || 0
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  logPerformance(): void {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics')
      this.metrics.forEach((duration, name) => {
        const status = duration < 16 ? '✅' : duration < 50 ? '⚠️' : '❌'
        console.log(`${status} ${name}: ${duration.toFixed(2)}ms`)
      })
      console.groupEnd()
    }
  }
}

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  const monitor = PerformanceMonitor.getInstance()

  const measureRender = (componentName: string) => {
    monitor.startMeasure(`${componentName}-render`)

    return {
      end: () => monitor.endMeasure(`${componentName}-render`)
    }
  }

  const measureAsyncOperation = async <T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    monitor.startMeasure(operationName)
    try {
      const result = await operation()
      monitor.endMeasure(operationName)
      return result
    } catch (error) {
      monitor.endMeasure(operationName)
      throw error
    }
  }

  return {
    measureRender,
    measureAsyncOperation,
    getMetrics: () => monitor.getAllMetrics(),
    logPerformance: () => monitor.logPerformance()
  }
}

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
        timeoutId = null
      }, delay - (currentTime - lastExecTime))
    }
  }) as T
}

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout | null = null

  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}

// RAF throttle for animations
export const rafThrottle = <T extends (...args: any[]) => any>(func: T): T => {
  let rafId: number | null = null

  return ((...args: Parameters<T>) => {
    if (rafId) return

    rafId = requestAnimationFrame(() => {
      func(...args)
      rafId = null
    })
  }) as T
}
