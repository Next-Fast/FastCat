import { ModInfo } from "@/lib/Types";
import { cn } from "@/lib/utils";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react"
import { Image } from "@heroui/react";

function ItemButtonGroup({ info, onViewDetail } : { info: ModInfo, onViewDetail: (mod: ModInfo) => void }) {
    return (
    <div className="flex gap-2">
        <button 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => onViewDetail(info)}
        >
            查看详情
        </button>
        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            安装
        </button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            卸载
        </button>
    </div>
    )
}

export function ModsList(
    { className, mods, _setDetail } : 
    { className?: string, mods: ModInfo[], _setDetail: (value : {open: boolean,mod: ModInfo | null}) => void}) 
{
    const handleViewDetail = (mod: ModInfo) => {
        _setDetail({ open: true, mod: mod });
    };

    return (
        <div className={cn("flex flex-col gap-2 overflow-y-auto", className)}>
            {
                mods.length === 0 ? (
                    <div className="flex justify-center items-center p-8 text-gray-500">
                        <p>暂无模组数据</p>
                    </div>
                ) : (
                    mods.map((mod, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <h1 className="text-xl font-bold">{mod.Name}</h1>
                                <div className="text-sm text-gray-500">作者: {mod.Author}</div>
                            </CardHeader>
                            <CardBody className="flex flex-col md:flex-row gap-4">
                                {
                                    mod.imagePath && (
                                        <div className="flex-shrink-0">
                                            <Image 
                                                src={mod.imagePath} 
                                                alt={mod.Name + "image"} 
                                                width={200} 
                                                height={200} 
                                                className="rounded object-cover"
                                            />
                                        </div>
                                    )
                                }
                                <div className="flex-grow">
                                    <p className="mb-2">{mod.Description}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="px-2 py-1 bg-gray-200 rounded text-sm">版本: {mod.Versions[0]}</span>
                                        <span className="px-2 py-1 bg-gray-200 rounded text-sm">加载器: {mod.Loader}</span>
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <ItemButtonGroup info={mod} onViewDetail={handleViewDetail} />
                            </CardFooter>
                        </Card>
                    ))
                )
            }
        </div>
    )
}