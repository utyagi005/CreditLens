import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ShaderLoadingScreen } from './loading/ShaderLoadingScreen'

type AppLoaderProps = {
  children: ReactNode
}

export function AppLoader({ children }: AppLoaderProps) {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.sessionStorage.getItem('creditlens-shader-loader-seen') !== 'true'
  })

  const complete = useCallback(() => {
    window.sessionStorage.setItem('creditlens-shader-loader-seen', 'true')
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) return
    const safeTimeout = window.setTimeout(complete, 6500)
    return () => window.clearTimeout(safeTimeout)
  }, [complete, isLoading])

  return (
    <>
      <AnimatePresence>
        {isLoading && <ShaderLoadingScreen onComplete={complete} />}
      </AnimatePresence>
      {children}
    </>
  )
}
