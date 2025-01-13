import { region_config_path } from '@/lib/constant/tauri-constant';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/extension/ServerEdit')({
  component: RouteComponent,
})

function RouteComponent() {
    const [hasServerConfig, setHasConfig] = useAtom(atom<boolean>(false));

    useAsyncEffect(async () => {
        var path = await region_config_path();
        setHasConfig(path !== "")
    })
    
    return <div>Hello "/extension/ServerEdit"!</div>
}
