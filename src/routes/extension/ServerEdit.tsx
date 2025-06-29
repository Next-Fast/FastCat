import { PageLayout } from '@/components/Layouts/PageLayout';
import { createFileRoute } from '@tanstack/react-router'
import { readFile } from '@tauri-apps/plugin-fs';
import { useAsyncEffect } from 'ahooks'

export const Route = createFileRoute('/extension/ServerEdit')({
  component: RouteComponent,
})

const hasServerConfigAtom = atom<boolean>(false);
const props = {
  title: 'Extension.ServerEdit.title',
  description: 'Extension.ServerEdit.description',
}

function RouteComponent() {
/*     const [hasServerConfig, setHasConfig] = useAtom(hasServerConfigAtom);
    const { t } = useTranslation();

    useAsyncEffect(async () => {
        var path = await region_config_path();
        var hasPath = path !== undefined && path !== null;
        setHasConfig(hasPath)
        if (hasPath) {
            var file = await readFile(path!);
            console.log(file)
        }
    })

    if (!hasServerConfig) {
        return (
            <PageLayout props={props}>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-2xl font-bold mb-4">{t('Extension.ServerEdit.NoConfig')}</div>
                    <div className="text-gray-500">{t('Extension.ServerEdit.NoConfigDescription')}</div>
                </div>
            </PageLayout>
        )
    } */
    
    return (
      <PageLayout props={props}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl font-bold mb-4">Server Edit</div>
          <div className="text-gray-500">This is the Server Edit page</div>
          {/* Add your content here */}
        </div>
      </PageLayout>
    )
}
