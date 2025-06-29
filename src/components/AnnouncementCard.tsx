import { useAnnouncementLatest } from "@/lib/hooks/use-swr-tauri";
import { AnnouncementResponse } from "@/lib/Types";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Markdown from 'react-markdown'

const hasShowAtom = atom(false);
const loadedAtom = atom(false);
const announcementAtom = atom<AnnouncementResponse | undefined>(undefined);

export function AnnouncementCard({ className }: { className?: string; }) {
    const { t } = useTranslation();
    const [hasShow, setHasShow] = useAtom(hasShowAtom);
    const [loaded, setLoaded] = useAtom(loadedAtom);
    const [announcement, setAnnouncement] = useAtom(announcementAtom);

    useAsyncEffect(async () => {
        if (!loaded) {
            var data = useAnnouncementLatest();
            if (data.data && data.data.has_new) {
                setAnnouncement(data.data);
                setLoaded(true);
            } else {
                setHasShow(true);
            }
        }
    }, [loaded]);

    if (hasShow || !announcement) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="max-w-lg w-full">
                <Card className={`shadow-lg rounded-lg border border-primary-200 bg-white ${className ?? ""}`}>
                    <CardHeader className="flex flex-col items-center py-6  rounded-t-lg">
                        <h3 className="text-2xl font-bold">{t("Announcement")}</h3>
                    </CardHeader>
                    <CardBody className="px-6 py-4 text-gray-700">
                        <Markdown>{announcement.announcement}</Markdown>
                    </CardBody>
                    <CardFooter className="flex justify-center py-4 bg-gray-50 rounded-b-lg">
                        <Button
                        color="primary"
                        className="px-6 py-2 rounded-full font-semibold shadow-md transition-all hover:scale-105"
                        onPress={() => setHasShow(true)}
                        >
                            {t("Close")}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}