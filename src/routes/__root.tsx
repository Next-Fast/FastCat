import { TanStackRouterDevtools } from '@/lib/utils/route-utils'
import type { NavigateOptions, ToOptions } from '@tanstack/react-router';
import { createRootRoute,  Outlet,  useRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SWRConfig } from 'swr'
import { HeroUIProvider } from "@heroui/react"
import { MainLayout } from '@/components/Layouts/MainLayout'
import { useGetConfig } from '@/lib/hooks/use-swr-tauri'
import { RouterConfig } from '@react-types/shared';

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
  const lang = useGetConfig().data?.lang ?? "en";
  const langCode = lang === "zh" ? "zh-CN" : "en-US";

  return (
    <> 
      <QueryClientProvider client={queryClient}>
        <SWRConfig>
          <HeroUIProvider 
            locale={langCode}
            navigate={(to, options : RouterConfig | undefined) => router.navigate({ to, ...options })}
            useHref={(to) => router.buildLocation({ to }).href}
            className='light'
          >
            <MainLayout>
              <Outlet/>
            </MainLayout>
{/* 
            {
              ExComponents.map((Component, index) => <Component key={index} />)
            } */}
          </HeroUIProvider>
        </SWRConfig>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  )
}

