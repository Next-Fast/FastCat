import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { ModsList } from '@/components/ModsList'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mods')({
  component: RouteComponent,
})

const _prop: PageLayoutProps = {
  title: 'Mods.title',
}

const hasInit = atom(false);

function RouteComponent() {
  const [init, setInit] = useAtom(hasInit);

  useAsyncEffect(async () => {

    setInit(true);
  }, [!init]);

  return (
    <PageLayout className='grid' props={_prop}>
      <ModsList className='grid-cols-1' mods={[]} />
      <Divider className='my-4'/>
      <div className='grid-cols-2 grid-rows-1 flex'>
        <Button>
          导入模组
        </Button>
        <Button>
          导入模组包
        </Button>
      </div>

    </PageLayout>
  )
}
