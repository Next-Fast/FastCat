import style from '@styles/scss/main-layout.module.scss'
import { ErrorBoundary } from 'react-error-boundary'
import clsx from 'clsx'

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={clsx('bg-linear-to-t from-sky-500 to-sky-200', style.layout)}>
            <SiderBar/>

            <div className={clsx(style.container, 'ml-1')}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    {children}
                </ErrorBoundary>
            </div>
        </div>
    )
}