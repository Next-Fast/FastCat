import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();

  const _props: PageLayoutProps = {
    title: t('Setting.title')
  }

  return (
    <PageLayout props={_props}>
      <div>Setting</div>
    </PageLayout>
  )
}
