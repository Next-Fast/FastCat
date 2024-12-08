import { createFileRoute } from '@tanstack/react-router'
import App from '@/components/page/App'

export const Route = createFileRoute('/')({
  component: App,
})

function RouteComponent() {
  return App();
}
