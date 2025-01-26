import { cn } from "@/lib/utils";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image";

export interface ModCardProps {
    image?: string;
    title: string;
    description: string;
}

export function ModsList({ className, mods } : { className?: string, mods: ModCardProps[] }) {
    return (
        <div className={cn("flex flex-col gap-2 overflow-y-auto", className)}>
            {
                mods.map((mod, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <h1>{mod.title}</h1>
                        </CardHeader>
                        <CardBody>
                            {
                                mod.image && <Image src={mod.image} alt={mod.title} width={200} height={200} />
                            }
                            <p>{mod.description}</p>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}