/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';


export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/dashboard/managment',
    },
    {
        id   : 'catering',
        title: 'Catering',
        type : 'basic',
        icon : 'heroicons_outline:globe-asia-australia',
        link : '/dashboard/catering',
    },
    {
        id   : 'foodcost',
        title: 'Food Cost',
        type : 'basic',
        icon : 'heroicons_outline:currency-euro',
        link : '/dashboard/foodcost',
    },
    {
        id   : 'iva',
        title: 'Iva',
        type : 'basic',
        icon : 'heroicons_outline:circle-stack',
        link : '/dashboard/vat',
    }

    ,{
        id      : 'settings',
        title   : 'Settings',
        type    : 'group',
        icon    : 'heroicons_outline:currency-euro',
        children: [
            {
                id   : 'pages.settings',
                title: 'Settings',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : '/dashboard/settings',
            },
        ],
    },
];
