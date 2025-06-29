import { PageLayout } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/extension/AccountManager')({
  component: RouteComponent,
})

const props = {
  title: 'Extension.AccountManager.title',
  description: 'Extension.AccountManager.description',
}

function RouteComponent() {
  return (
    <PageLayout props={props}>
      <div>AccountManager</div>
    </PageLayout>
  )
}
