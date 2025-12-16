import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext({ path: '/', navigate: () => {} })

export function BrowserRouter({ children }) {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/')

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useMemo(() => {
    return (to) => {
      if (typeof window === 'undefined') return
      if (to !== path) {
        window.history.pushState({}, '', to)
        setPath(to)
      }
    }
  }, [path])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])

  return React.createElement(RouterContext.Provider, { value }, children)
}

export function Routes({ children }) {
  const { path } = useContext(RouterContext)
  let match = null

  React.Children.forEach(children, (child) => {
    if (match || !React.isValidElement(child)) return
    const { path: childPath, element } = child.props || {}
    if (childPath === path) {
      match = element ?? null
    }
  })

  return match
}

export function Route() {
  return null
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext)
  return navigate
}

export function Link({ to, children, ...rest }) {
  const navigate = useNavigate()
  const handleClick = (event) => {
    event.preventDefault()
    navigate(to)
  }

  return React.createElement('a', { href: to, onClick: handleClick, ...rest }, children)
}

export function useLocation() {
  const { path } = useContext(RouterContext)
  return { pathname: path }
}

export default {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
}
