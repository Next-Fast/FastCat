import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/extension/')({
  component: RouteComponent,
})

const _prop : PageLayoutProps = {
  title: 'Extensions.title'
}

function RouteComponent() {
  return (
    <PageLayout props={_prop}>
      <>
      </>
    </PageLayout>
  )
}
