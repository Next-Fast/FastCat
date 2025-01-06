import { Href } from '@react-types/shared'
import { IconType } from 'react-icons/lib'
import { MdExtension, MdHome, MdInventory, MdSettings } from 'react-icons/md'

interface MenuItem {
    name: string,
    url: Href,
    icon?: IconType,
    i18Key?: string
}


export const DefaultMenuItems: MenuItem[] = [
    {
        name: 'Home',
        url: '/',
        icon: MdHome,
        i18Key: 'Home.title'
    },
    {
        name: 'Mods',
        url: '/mods',
        icon: MdInventory
    },
    {
        name: 'Extensions',
        url: '/extension',
        icon: MdExtension
    },
    {
        name: 'Setting',
        url: '/setting',
        icon: MdSettings,
        i18Key: 'Setting.title'
    }
]