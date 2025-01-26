import { ModInfo } from "@/lib/Types";
import { cn } from "@/lib/utils";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image";

function ItemButtonGroup({ info } : { info: ModInfo }) {
    return (
    <>

    </>
    )
}

export function ModsList(
    { className, mods, _setDetail } : 
    { className?: string, mods: ModInfo[], _setDetail: (value : {open: boolean,mod: ModInfo | null}) => void}) 
{
    return (
        <div className={cn("flex flex-col gap-2 overflow-y-auto", className)}>
            {
                mods.map((mod, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <h1>{mod.Name}</h1>
                        </CardHeader>
                        <CardBody>
                            {
                                mod.imagePath && <Image src={mod.imagePath} alt={mod.Name + "image"} width={200} height={200} />
                            }
                            <p>{mod.Description}</p>
                        </CardBody>
                        <CardFooter>
                            <ItemButtonGroup info={mod} />
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}