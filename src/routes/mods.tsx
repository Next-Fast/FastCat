import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mods')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mods"!</div>
}
