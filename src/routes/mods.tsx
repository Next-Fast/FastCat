import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { ModsList } from '@/components/ModsList'
import { ModInfo } from '@/lib/Types/data'
import { Divider } from "@heroui/react"
import { createFileRoute } from '@tanstack/react-router'
import { BaseDirectory, exists, readTextFile } from '@tauri-apps/plugin-fs'

export const Route = createFileRoute('/mods')({
  component: RouteComponent,
})

const _prop: PageLayoutProps = {
  title: 'Mods.title',
}

const hasInit = atom(false);
const modsAtom = atom<ModInfo[]>([]);
const detailAtom = atom<{
  open: boolean,
  mod: ModInfo | null,
}>({ open: false, mod: null });

async function init_mods(_setMods : (mods : ModInfo[]) => void) {
  var has_exists = await exists("Mods.json", { baseDir: BaseDirectory.AppData });
  if (!has_exists)
      return;

  var mods = JSON.parse(await readTextFile("Mods.json", { baseDir: BaseDirectory.AppData })) as ModInfo[];
  if (mods)
  {
    _setMods(mods);
  }
}

function BepInExHeader() {
  return (
    <>
    </>
  )
}

function RouteComponent() {
  const [init, setInit] = useAtom(hasInit);
  const [mods, setMods] = useAtom(modsAtom);
  const [detail, setDetail] = useAtom(detailAtom);

  useAsyncEffect(async () => {
    await init_mods(setMods);

    setInit(true);
  }, [!init]);

  return (
    <PageLayout className='grid' props={_prop}>
      <BepInExHeader />
      <ModsList className='grid-cols-1' mods={mods} _setDetail={setDetail}/>
      { detail.open && <Divider /> }
      { detail.open && <ModsDetail mod={detail.mod} />}
    </PageLayout>
  )
}
