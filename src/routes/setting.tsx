import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  const _props: PageLayoutProps = {
    title: 'Setting'
  }

  return (
    <PageLayout props={_props}>
      <div>Setting</div>
    </PageLayout>
  )
}
