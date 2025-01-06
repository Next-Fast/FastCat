import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip'
import { createFileRoute } from '@tanstack/react-router'
import { atom, useAtom } from 'jotai'
import { Button as ShadcnButton } from '@components/shadcn/ui/button'
import { MdFolder } from 'react-icons/md'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const isVanildAtom = atom(true)

function RouteComponent() {
  const { t } = useTranslation();

  const _props: PageLayoutProps = {
    title: t('Home.title'),
    image: '/home-bg.jpg'
  }

  const [isVanild, setIsVanild] = useAtom(isVanildAtom);
  const buttonText = isVanild ? t('Home.StartVanild') : t('Home.StartModed');
  const gamePath =  "C:/Program Files (x86)/Steam/steamapps/common/Don't Starve Together";

  return(
    <PageLayout props={_props}>
      <div className='game_lancher_Content flex flex-col-reverse items-center justify-center fixed bottom-[3.8rem] right-[3.5rem]'>
        <Button size='lg' color="primary" variant='shadow' className='w-[11rem] h-[3rem] font-bold'>
          {buttonText}
        </Button>
        
        <Tooltip content={gamePath} delay={250} closeDelay={0} color='foreground' className='opacity-[80%]'>
          <ShadcnButton className='font-bold mb-[1rem] w-[11rem] h-[1.85rem] opacity-[80%] flex items-center justify-start'>
            <MdFolder className='text-xl text-white -ml-2' />
            <span className='truncate'>{gamePath}</span>
          </ShadcnButton>
        </Tooltip>
      </div>
    </PageLayout>
  )
}
