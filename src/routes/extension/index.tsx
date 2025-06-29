import { PageLayout, PageLayoutProps } from '@/components/Layouts/PageLayout'
import { ExtensionMenuItem, ExtensionMenuItems } from '@/lib/MenuItem'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/extension/')({
  component: RouteComponent,
})

const pageLayoutProps: PageLayoutProps = {
  title: 'Extensions.title',
}


function ExtensionCard({ item }: { item: ExtensionMenuItem }) {
  const { t } = useTranslation();
  const nav = useNavigate();

  return (
    <Card isPressable onPress={() => {
      nav({ to: item.url })
    }} className="max-w-xs shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden rounded-lg ">
      <CardHeader className="flex items-center gap-2 bg-primary/10 px-4 py-3">
        {item.icon && (
          <item.icon className="text-2xl text-primary shrink-0" />
        )}
        <span className="text-base font-bold text-primary">
          {item.i18Key ? t(item.i18Key + ".title") : item.name}
        </span>
      </CardHeader>
      <CardBody className="text-sm px-4 py-2 h-20 font-normal text-gray-700">
        <p>{t(item.i18Key + ".description", { defaultValue: item.description ?? t("Extensions.NoDescription") })}</p>
      </CardBody>
    </Card>
  )
}

function RouteComponent() {

  return (
    <PageLayout props={pageLayoutProps}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-3 ml-3 mr-3">
        {
          ExtensionMenuItems.map(item => (
              <ExtensionCard item={item} key={`extension-Card-${item.name}`} />
          ))
        }
      </div>
    </PageLayout>
  )
}
