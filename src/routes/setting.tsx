import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setting')({
  component: RouteComponent,
})

const _props: PageLayoutProps = {
  title: ('Setting.title')
}

function RouteComponent() {

  return (
    <PageLayout props={_props}>
      <>
      </>
    </PageLayout>
  )
}
