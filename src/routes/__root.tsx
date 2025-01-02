import { TanStackRouterDevtools } from '@/lib/utils/route-utils'
import { NavigateOptions, Outlet, ToOptions, createRootRoute, useRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SWRConfig } from 'swr'
import { NextUIProvider } from "@nextui-org/system"
import styles from '@/styles/scss/__root.module.scss'
import Sidebar from '@/components/SiderBar'
import { clsx } from 'clsx'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const queryClient = new QueryClient();

function ErrorFallback({ error, resetErrorBoundary } : FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function MainLayout({ children } : { children: React.ReactNode }) {
  const isHome = location.pathname === '/';
  
  return (
    <div className={styles.layout}>
      <div className={clsx(styles.SiderBarLayout, "flex flex-col justify-between")}>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full h-full">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  )
}

function AnimeOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  return (
    <> 
      <QueryClientProvider client={queryClient}>
        <SWRConfig>
          <NextUIProvider 
            navigate={(to, options) => router.navigate({ to, ...options })}
            useHref={(to) => router.buildLocation({ to }).href}
          >
            <MainLayout>
              <AnimeOutlet />
            </MainLayout>
          </NextUIProvider>
        </SWRConfig>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  )
}

