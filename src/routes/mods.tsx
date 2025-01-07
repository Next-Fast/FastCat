import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mods')({
  component: RouteComponent,
})

const _prop: PageLayoutProps = {
  title: 'Mods.title',
}

function RouteComponent() {

  return (
    <PageLayout props={_prop}>
      <>
      </>
    </PageLayout>
  )
}
