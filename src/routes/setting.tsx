import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'
import { Select, SelectItem } from '@nextui-org/select'
import { ManagerConfig, SupportLanguages } from '@/lib/Types'
import { SharedSelection } from '@nextui-org/system'
import { useGetConfig } from '@/lib/hooks/use-swr-tauri'
import { Invoke_Command } from '@/lib/utils'
import { changeLanguage } from 'i18next'

export const Route = createFileRoute('/setting')({
  component: RouteComponent,
})

const _props: PageLayoutProps = {
  title: ('Setting.title')
}

async function SelectLanguage(config : ManagerConfig | undefined,selection: SharedSelection) 
{
  if (!config || !config.GameConfig) {
    return;
  }

  changeLanguage(selection.currentKey);
  Invoke_Command('set_config', { lang : selection.currentKey, game : config.GameConfig})
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
          onSelectionChange={async (key) => SelectLanguage(config, key)}>
          {
            SupportLanguages.map((lang) => {
              return (
                <SelectItem key={lang} value={lang} description={lang}>
                  {t(`Language.${lang}`)}
                </SelectItem>
              )
            })
          }
        </Select>
      </div>
    </PageLayout>
  )
}
