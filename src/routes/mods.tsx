import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { ModsList } from '@/components/ModsList'
import { get_data_path } from '@/lib/checker'
import { ModInfo } from '@/lib/Types/data'
import { Divider } from "@heroui/divider"
import { createFileRoute } from '@tanstack/react-router'
import { exists, readTextFile } from '@tauri-apps/plugin-fs'

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
  var path = await get_data_path("Mods.json");
  if (!await exists(path))
      return;

  var mods = JSON.parse(await readTextFile(path)) as ModInfo[];
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
