import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'
import { Select, SelectItem } from "@heroui/react"
import { SupportLanguages, SuprrortLanguage } from '@/lib/Types'
import { useGetConfig } from '@/lib/hooks/use-swr-tauri'
import { ALL_PROXY_URL, set_proxy } from '@/lib/constant/github-proxy'
import { set_language } from '@/lib/locale'

export const Route = createFileRoute('/setting')({
  component: RouteComponent,
})

const _props: PageLayoutProps = {
  title: ('Setting.title')
}

function RouteComponent() {
  const { t } = useTranslation()
  const config = useGetConfig().data;

  return (
    <PageLayout props={_props}>
      <div className="grid grid-flow-col items-center justify-start mt-3 ml-2">
        <Select 
          color='primary'
          className='w-40'
          aria-label='Select Language'
          defaultSelectedKeys={[config?.lang as string]} 
          placeholder={t('Setting.SelectLanguage')} 
          onSelectionChange={async selection => set_language(selection.currentKey as SuprrortLanguage)}>
          {
            SupportLanguages.map((lang) => {
              return (
                <SelectItem key={lang} description={lang}>
                  {t(`Language.${lang}`)}
                </SelectItem>
              )
            })
          }
        </Select>
        <Select 
          color='primary'
          className='w-40'
          aria-label='Select Proxy'
          defaultSelectedKeys={[config?.GithubProxy as string]} 
          placeholder={t('Setting.SelectProxy')} 
          onSelectionChange={async selection => await set_proxy(selection.currentKey as string)}
        >
          {
            ALL_PROXY_URL.map(proxy => {
              return (
                <SelectItem key={proxy.name} description={proxy.url}>
                  {proxy.name}
                </SelectItem>
              )
            })
          }
        </Select>
      </div>
    </PageLayout>
  )
}
