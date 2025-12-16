import type { ReactElement, ReactNode } from 'react'

export interface RouteProps {
  path: string
  element: ReactElement | null
}

export interface BrowserRouterProps {
  children?: ReactNode
}

export interface RoutesProps {
  children?: ReactNode
}

export declare function BrowserRouter(props: BrowserRouterProps): ReactElement
export declare function Routes(props: RoutesProps): ReactElement | null
export declare function Route(props: RouteProps): null
export declare function useNavigate(): (to: string) => void
export declare function Link(
  props: { to: string; children?: ReactNode } & Omit<JSX.IntrinsicElements['a'], 'href'>,
): ReactElement
export declare function useLocation(): { pathname: string }
