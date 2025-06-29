import { PageLayout } from '@/components/Layouts/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/extension/ToolBox')({
  component: RouteComponent,
})

const props = {
  title: 'Extension.ToolBox.title',
  description: 'Extension.ToolBox.description',
}

function RouteComponent() {
  return (
    <PageLayout props={props}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-bold mb-4">ToolBox
        </div>
        <div className="text-lg">Coming soon...</div> 
      </div>
    </PageLayout>
  )
}
