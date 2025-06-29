import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { ModsList } from '@/components/ModsList'
import { ModsDetail } from '@/components/ModsDetail'
import { ModInfo } from '@/lib/Types/data'
import { Divider, Card, CardHeader, CardBody, Button, Spinner, CardFooter, Switch } from "@heroui/react"
import { createFileRoute } from '@tanstack/react-router'
import { BaseDirectory, exists, readTextFile } from '@tauri-apps/plugin-fs'
import { useAtom } from 'jotai'
import { atom } from 'jotai'
import { has_bepinex } from '@/lib/constant/tauri-constant'
import { useBepInExVersion, useGetConfig, useHasBepInEx } from '@/lib/hooks/use-swr-tauri'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

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

const singleAtom = atom(true);

function BepInExHeader() {
  const { t } = useTranslation();
  const hasBepInEx = useHasBepInEx();
  const bepInEx_Version = useBepInExVersion();
  const [isSingle, setSingle] = useAtom(singleAtom); 

  const state = hasBepInEx.data ? t("Installed") : t("NotInstalled");

  return (
    <Card className="mb-3 shadow-xl transition-shadow duration-200 rounded-2xl">
      <CardHeader>
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-500">
          BepInEx
        </h2>
      </CardHeader>
      <CardBody className="pt-2 pb-4">
        <p className="font-medium text-lg text-primary-500">{t("Mods.BepInEx.Description")}</p>
      </CardBody>
      <Divider className='bg-primary-500'/>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-5">
          <Button variant="solid" color="primary" size="md" className="rounded-md">
            {t("Mods.BepInEx.Download")}
          </Button>
          <Button variant="solid" color="primary" size="md" className="rounded-md">
            {t("Mods.BepInEx.Configure")}
          </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary-500">
                {t("Mods.BepInEx.SingleMode")}
              </span>
              <Switch isSelected={isSingle} onValueChange={setSingle} size="md" />
            </div>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm text-primary-500">
            {t("Mods.BepInEx.Version", { version: bepInEx_Version.data || t("Unknown") })}
          </p>
          <p className={cn("text-sm", hasBepInEx.data ? "text-green-500" : "text-red-500")}>
            {t("Mods.BepInEx.Status", { status: state })}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
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
{/*       <ModsList className='grid-cols-1' mods={mods} _setDetail={setDetail}/> */}
      {/* { detail.open && <ModsDetail mod={detail.mod} />} */}
    </PageLayout>
  )
}
