import { ModDownloadSource, ModInfo } from "@/lib/Types"
import { cn } from "@/lib/utils"
import { Badge, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Image } from "@heroui/react"

interface modDetailProps {
    
}

export function ModsDetail({ className, isOpen, setOpen, modProps }: { className?: string, isOpen: boolean, setOpen: (open: boolean) => void, modProps: modDetailProps | undefined }) {
    if (!modProps) 
        return <></>
    
    const { t } = useTranslation()

    return (
        <Drawer placement="right" isOpen={isOpen} onOpenChange={setOpen} backdrop="transparent" isDismissable={false}>
            <DrawerContent>
                <DrawerHeader>

                </DrawerHeader>
                <DrawerBody>

                </DrawerBody>
                <DrawerFooter>
                    <Button color="primary" onPress={() => setOpen(false)}>
                        {t("Close")}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}