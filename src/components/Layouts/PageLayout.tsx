
export interface PageLayoutProps {
    title : string
}

export function PageLayout({ props, children }: { props : PageLayoutProps, children: React.ReactNode }) {
    return (
        <>
            <header className="Page Header">
                <h1 className="font-sans text-3xl mt-5 ml-2">{props.title}</h1>
            </header>

            <div className="Page Conetnt">
                {children}
            </div>
        </>
    )
}