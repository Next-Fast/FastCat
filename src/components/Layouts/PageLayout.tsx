import clsx from 'clsx'
import { Image, Tooltip } from "@heroui/react"
import { cn } from '@/lib/utils';

export interface PageLayoutProps {
    title : string,
    image? : string,
    description? : string,
}

function ImageContainer({ image }: { image: string | undefined }) {
    return (
        <>
            {image && (
                <Image
                    removeWrapper={true}
                    className="absolute inset-0 w-full h-full -z-0 overflow-hidden object-cover "
                    src={image}
                    alt="Background"
                />
            )}
        </>
    )
}

export function PageLayout({ props, children, className }: { props: PageLayoutProps, children: React.ReactNode, className?: string }) {
    const { t } = useTranslation();

    return (
        <div className="Page Layout flex flex-col">
            <header className="Page Header flex flex-col items-start justify-center">
                {props.description ? (
                    <Tooltip content={t(props.description)} delay={250} closeDelay={0} color='foreground' className='opacity-[60%]'>
                        <h1 className="font-sans text-3xl mt-4 ml-5">{t(props.title)}</h1>
                    </Tooltip>
                ) : (<h1 className="font-sans text-3xl mt-4 ml-5">{t(props.title)}</h1>)}
            </header>

            <div className={clsx('Page Main relative rounded-3xl ml-3 mt-1 w-[95%] h-[31.35rem]',
                !props.image && "bg-linear-to-tr from-white to-zinc-100",
            )}>
                <ImageContainer image={props.image} />

                <div className={cn("Content relative z-10", className)}>
                    {children}
                </div>
            </div>
        </div>
    )
}