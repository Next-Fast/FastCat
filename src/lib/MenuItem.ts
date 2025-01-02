import { Href } from '@react-types/shared'
import { IconType } from 'react-icons/lib'
import { MdHome, MdSettings } from 'react-icons/md'

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
        name: 'Setting',
        url: '/setting',
        icon: MdSettings
    }
]