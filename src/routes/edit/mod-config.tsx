import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/mod-config')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/mod-config"!</div>
}
