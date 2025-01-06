import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/extension/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/extension/"!</div>
}
