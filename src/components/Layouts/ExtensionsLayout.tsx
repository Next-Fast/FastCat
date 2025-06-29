/* import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { PageLayout, PageLayoutProps } from "./PageLayout";
import { Href } from "@react-types/shared";
import { useNavigate, useRouter } from "@tanstack/react-router";

const _Props: PageLayoutProps = {
    title: "Extensions.title",
}

export function ExtensionsLayout({ children, className, breadcrumbsInfos } 
    : 
    { children?: React.ReactNode, className?: string, breadcrumbsInfos?: { href: Href, title: string }[]}) 
{
    const { t } = useTranslation();
    const router = useRouter();
    const items : { href: Href, title: string }[]  = [{
        href: "/extension",
        title: t("Extensions.title")
    }];

    if (breadcrumbsInfos) {
        items.push(...breadcrumbsInfos);
    }

    return (
        <PageLayout props={_Props} className={className}>
            <Breadcrumbs
                size="md"
                classNames={{
                    list: "w-full bg-gradient-to-br from-blue-500 to-blue-300 shadow-xl rounded-xl px-8 py-4",
                }}
                underline="hover"
                variant="solid"
                separator="/"
                onAction={(key) => {
                    router.navigate({ to: key as string });
                }}
            >
                {items.map((info) => (
                    <BreadcrumbItem
                        key={info.href as string}
/*                         href={info.href} 
                        isCurrent={router.state.location.pathname === info.href}
                    >
                        {info.title}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
            {children}
        </PageLayout>
    )
} */