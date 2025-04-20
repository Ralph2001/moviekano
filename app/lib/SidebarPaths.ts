import { FaFilm, FaInfoCircle, FaSearch, FaTv, FaWpexplorer } from "react-icons/fa"
import { IoSearchOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib"
import { LuTv } from "react-icons/lu";

interface SidebarPathsProps {
    name: string,
    path: string,
    icon: IconType
}

export const SidebarPaths: SidebarPathsProps[] = [
    {
        name: 'Search',
        path: '/search',
        icon: IoSearchOutline
    },
    {
        name: 'Explore',
        path: '/',
        icon: FaWpexplorer
    },
    {
        name: 'Movies',
        path: '/movie',
        icon: FaFilm
    },
    {
        name: 'TV Shows',
        path: '/tv',
        icon: LuTv
    },

    // {
    //     name: 'About',
    //     path: '/info',
    //     icon: FaInfoCircle
    // },
]
