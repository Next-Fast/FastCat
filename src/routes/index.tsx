import { createFileRoute } from '@tanstack/react-router'
import App from '@/components/page/App'
import Welcome from '@/components/page/welcome'
import { Invoke_Command } from '@/lib/utils/tarui-utlis'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  var isFirst : boolean = false;
  return(
    <div>
      {
        isFirst ? <App /> : <Welcome />
      }
    </div>
  )
}
