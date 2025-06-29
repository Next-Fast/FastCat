import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'
import { Select, SelectItem, Tab, Tabs } from "@heroui/react"
import { ManagerConfig, SupportLanguages, SuprrortLanguage } from '@/lib/Types'
import { useGetConfig } from '@/lib/hooks/use-swr-tauri'
import { ALL_PROXY_URL, set_proxy } from '@/lib/constant/github-proxy'
import { set_language } from '@/lib/locale'
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons/lib'
import { MdBook, MdOutlineSettings } from 'react-icons/md'

export const Route = createFileRoute('/setting')({
  component: RouteComponent,
})

const _props: PageLayoutProps = {
  title: ('Setting.title')
}

interface SettingTabItem{
  name: string;
  i18nKey: string;
  icon: IconType;
  content: (arg : any) => React.ReactNode;
}

function GeneralTabContent({ config } : { config: ManagerConfig}) {
  const { t } = useTranslation();
  const defaultKey = ALL_PROXY_URL.find(proxy => proxy.url === config?.GithubProxy) ?? ALL_PROXY_URL[0];

  return (
    <>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
          {t('Setting.SelectLanguage')}
        </label>
        <Select
          color="primary"
          className="w-1/2"
          aria-label="Select Language"
          defaultSelectedKeys={[config.lang as string]}
          onSelectionChange={async selection => set_language(selection.currentKey as SuprrortLanguage)}
        >
          {SupportLanguages.map((lang) => (
            <SelectItem key={lang} description={lang}>
              {t(`Language.${lang}`)}
            </SelectItem>
          ))}
        </Select>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
          {t('Setting.SelectProxy')}
        </label>
        <Select
          color="primary"
          className="w-1/2"
          aria-label="Select Proxy"
          defaultSelectedKeys={[defaultKey.name]}
          onSelectionChange={async selection => await set_proxy(selection.currentKey as string)}
        >
          {ALL_PROXY_URL.map(proxy => (
            <SelectItem key={proxy.name} description={proxy.url}>
              {proxy.name}
            </SelectItem>
          ))}
        </Select>
    </ >
  );
}

const SettingTabItems: SettingTabItem[] = [
  {
    name: 'General',
    i18nKey: 'Setting.Tab.General',
    icon: MdOutlineSettings,
    content: (props) => <GeneralTabContent config={props.config} />
  },
  {
    name: 'Advanced',
    i18nKey: 'Setting.Tab.Advanced',
    icon: MdBook,
    content: (props) => <div>Advanced</div>
  }
];

function RouteComponent() {
  const { t } = useTranslation();
  const { data: config } = useGetConfig();

  if (!config) {
    return (
      <PageLayout props={_props}>
        <div className="flex justify-center items-center h-[60vh]">
          <span className="text-xl text-zinc-500 dark:text-zinc-400">
            {t('Setting.NoConfig')}
          </span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout props={_props}>
      <Tabs
          aria-label="Settings"
          isVertical
          items={SettingTabItems}
          color="primary"
          className="w-1/4 h-full"
          classNames={{ tabList: 'w-full bg-default-200/50', tabWrapper: 'mt-5 mx-5'}}
        >
          {(item) => (
            <Tab
              key={item.name}
              title={
                <div className="flex items-center gap-2">
                  <item.icon />
                  <span>{t(item.i18nKey)}</span>
                </div>
              }
              className="w-full"
            >
              <div className="ml-5 mt-2 mb-5">
                {item.content({ config })}
              </div>
            </Tab>
          )}
        </Tabs>
  
    </PageLayout>
  );
}
