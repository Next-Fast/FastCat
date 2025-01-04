import { TanStackRouterDevtools } from '@/lib/utils/route-utils'
import { NavigateOptions, ToOptions, createRootRoute, useRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SWRConfig } from 'swr'
import { NextUIProvider } from "@nextui-org/system"
import { MainLayout } from '@/components/Layouts/MainLayout'
import { AnimeOutlet } from '@/components/AnimeOutlet'

const queryClient = new QueryClient();

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

