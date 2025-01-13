import { Href } from '@react-types/shared'
import { IconType } from 'react-icons/lib'
import { MdExtension, MdHome, MdInventory, MdSettings, MdOutlineExtension } from 'react-icons/md'

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
        icon: MdInventory,
        i18Key: 'Mods.title'
    },
    {
        name: 'Extensions',
        url: '/extension',
        icon: MdExtension,
        i18Key: 'Extensions.title'
    },
    {
        name: 'Setting',
        url: '/setting',
        icon: MdSettings,
        i18Key: 'Setting.title'
    }
]

export const ExtensionMenuItems: MenuItem[] = [
    {
        name: 'ServerEdit',
        url: '/extension/ServerEdit',
        icon: MdOutlineExtension,
        i18Key: 'Extension.ServerEdit.title'
    }
]