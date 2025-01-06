import { Href } from '@react-types/shared'
import { IconType } from 'react-icons/lib'
import { MdExtension, MdHome, MdInventory, MdSettings } from 'react-icons/md'

interface MenuItem {
    name: string,
    url: Href,
    icon?: IconType
}


export const DefaultMenuItems: MenuItem[] = [
    {
        name: 'Home',
        url: '/',
        icon: MdHome
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
        icon: MdSettings
    }
]