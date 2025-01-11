import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { Divider } from '@nextui-org/divider'
import { createFileRoute } from '@tanstack/react-router'
import { Listbox, ListboxItem } from '@nextui-org/listbox'

export const Route = createFileRoute('/mods')({
  component: RouteComponent,
})

const _prop: PageLayoutProps = {
  title: 'Mods.title',
}

function RouteComponent() {

  const mods = [
    {
      name: 'Mod 1',
      description: 'This is a description for mod 1',
      author: 'Author 1',
      version: '1.0.0',
    },
    {
      name: 'Mod 2',
      description: 'This is a description for mod 2',
      author: 'Author 2',
      version: '1.0.0',
    },
    {
      name: 'Mod 3',
      description: 'This is a description for mod 3',
      author: 'Author 3',
    },
    {
      name: 'Mod 4',
      description: 'This is a description for mod 4',
      author: 'Author 4',
    },
    {
      name: 'Mod 5',
      description: 'This is a description for mod 5',
      author: 'Author 5',
    },
    {
      name: 'Mod 6',
      description: 'This is a description for mod 6',
      author: 'Author 6',
    },
    {
      name: 'Mod 7',
      description: 'This is a description for mod 7',
      author: 'Author 7',
    },
    {
      name: 'Mod 8',
      description: 'This is a description for mod 8',
      author: 'Author 8',
    },
    {
      name: 'Mod 9',
      description: 'This is a description for mod 9',
      author: 'Author 9',
    },
    {
      name: 'Mod 10',
      description: 'This is a description for mod 10',
      author: 'Author 10',
    },
    {
      name: 'Mod 11',
      description: 'This is a description for mod 11',
      author: 'Author 11',
    },
    {
      name: 'Mod 12',
      description: 'This is a description for mod 12',
      author: 'Author 12',
    },
    {
      name: 'Mod 13',
      description: 'This is a description for mod 13',
      author: 'Author 13',
    },
    {
      name: 'Mod 14',
      description: 'This is a description for mod 14',
      author: 'Author 14',
    },
    {
      name: 'Mod 15',
      description: 'This is a description for mod 15',
      author: 'Author 15',
    }
  ]

  return (
    <PageLayout props={_prop}>
      <>
      </>
    </PageLayout>
  )
}
