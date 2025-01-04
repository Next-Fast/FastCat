import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const _props : PageLayoutProps = {
  title: 'Home'
}

function RouteComponent() {
  return(
    <PageLayout props={_props}>
      <>
      </>
    </PageLayout>
  )
}
