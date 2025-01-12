import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { Button, ButtonGroup } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip'
import { createFileRoute } from '@tanstack/react-router'
import { atom, useAtom } from 'jotai'
import { Button as ShadcnButton } from '@components/shadcn/ui/button'
import { MdFolder, MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useGetConfig } from '@/lib/hooks/use-swr-tauri';
import { open } from '@tauri-apps/plugin-dialog'
import { Invoke_Command } from '@/lib/utils/tarui-utlis';
import { ManagerConfig } from '@/lib/Types';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const isVanildAtom = atom(true)

const _props: PageLayoutProps = {
  title: 'Home.title',
  image: '/home-bg.jpg'
}

async function OnSlectDirPath(config: ManagerConfig | undefined) {
  const dir = await open({
    multiple: false,
    directory: true,
  })

  if (config && dir)
  {
    config.GameConfig.DirPath = dir;
    Invoke_Command('set_config', { lang : config.lang, game : config.GameConfig });
  }
}

async function StartGame(isVanild: boolean) {

}

function RouteComponent() {
  const { t } = useTranslation();

  const [isVanild, setIsVanild] = useAtom(isVanildAtom);
  const buttonText = isVanild ? t('Home.StartVanild') : t('Home.StartModed');
  const config = useGetConfig();
  const gamePath = config?.data?.GameConfig.DirPath || 'Not set';

  return(
    <PageLayout props={_props}>
      <div className='game_lancher_Content flex flex-col-reverse items-center justify-center fixed bottom-[3.8rem] right-[3.5rem]'>
        <ButtonGroup size='lg' color="primary" className='h-[3rem] font-bold' >
          <Button  className='w-[10rem]' onPress={async () => await StartGame(isVanild)}>
            {buttonText}
          </Button>
          <Button className='w-[2rem]' isIconOnly={true} onPress={() => setIsVanild(!isVanild)}>
            { isVanild ? <MdOutlineArrowBackIos /> : <MdOutlineArrowForwardIos /> }
          </Button>
        </ButtonGroup>
        
        <Tooltip content={gamePath} delay={250} closeDelay={0} color='foreground' className='opacity-[80%]'>
          <ShadcnButton
            className='font-bold mb-[1rem] w-[11rem] h-[1.85rem] opacity-[80%] flex items-center justify-start'
            onClick={async () => OnSlectDirPath(config?.data)}
          >
            <MdFolder className='text-xl text-white -ml-2' />
            <span className='truncate'>{gamePath}</span>
          </ShadcnButton>
        </Tooltip>
      </div>
    </PageLayout>
  )
}
