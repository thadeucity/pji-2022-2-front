import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  selector: string
}

export const Portal: React.FC<PortalProps> = ({ 
  selector, 
  children 
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!selector) {
      throw new Error('Portal Selector is required')
    }

    const selectorPrefixed = '#' + selector.replace(/^#/, '')
    ref.current = document.querySelector(selectorPrefixed)

    if (!ref.current) {
      const div = document.createElement('div')
      div.setAttribute('id', selector)
      document.body.appendChild(div)
      ref.current = div
    }

    setMounted(true)
  }, [selector])

  return mounted && !!ref.current 
    ? createPortal(children, ref.current) 
    : null
}
