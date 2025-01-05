import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/server')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/server"!</div>
}
