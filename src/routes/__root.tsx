import { TanStackRouterDevtools } from '@/lib/utils/route-utils'
import { NavigateOptions, Outlet, ToOptions, createRootRoute, useRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SWRConfig } from 'swr'
import { NextUIProvider } from "@nextui-org/system"
import styles from '@/styles/scss/__root.module.scss'

const queryClient = new QueryClient();


export function StyleOutlet()
{
  return (
    <div className={styles.layout}>
      <div className='page'>
        <Outlet />
      </div>
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
            <StyleOutlet />
          </NextUIProvider>
        </SWRConfig>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  )
}

