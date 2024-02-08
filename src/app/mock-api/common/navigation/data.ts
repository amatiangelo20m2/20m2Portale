/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';


export const defaultNavigation: FuseNavigationItem[] = [

    {
        id      : 'generale',
        title   : '20m2',
        type    : 'group',
        icon    : 'heroicons_outline:currency-euro',
        children: [
            {
                id   : 'dashboard',
                title: 'Home',
                type : 'basic',
                icon : 'heroicons_outline:home',
                link : '/dashboard/managment',
            },{
                id   : 'booking',
                title: 'Prenotazioni',
                type : 'basic',
                icon : 'heroicons_outline:clipboard',
                link : '/dashboard/bookings',
            },
            {
                id   : 'customers',
                title: 'I miei clienti',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/dashboard/customers',
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
            },{
                id   : 'supplier',
                title: 'Fornitori e Prodotti',
                type : 'basic',
                icon : 'heroicons_outline:truck',
                link : '/dashboard/suppliers',
            },
        ],
    },
    {
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
