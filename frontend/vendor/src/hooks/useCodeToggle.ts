import { useState, useEffect } from "react"

export const useCodeToggle = () => {
  const [showCode, setShowCode] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<Record<string, boolean>>({})

  const handleShowCode = (id: number) => {
    setShowCode((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied((prev) => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [id]: false }))
      }, 2000)
    })
  }

  useEffect(() => {
    window.HSStaticMethods?.autoInit()
  }, [])

  return {
    showCode,
    copied,
    handleShowCode,
    handleCopy,
  }
}
