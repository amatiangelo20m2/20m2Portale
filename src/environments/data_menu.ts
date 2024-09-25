/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';


export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard/managment',
    },
    {
        id      : 'prenotazioni',
        title   : 'Prenotazioni',
        type    : 'group',
        icon    : 'heroicons_outline:clipboard',
        children: [
            {
                id   : 'booking',
                title: 'Prenotazioni',
                type : 'basic',
                icon : 'heroicons_mini:calendar-days',
                link : '/dashboard/bookings',
            },{
                id   : 'settings',
                title: 'Configura Apertura',
                type : 'basic',
                icon : 'heroicons_outline:wrench-screwdriver',
                link : '/dashboard/configure',
            },
            {
                id   : 'forms',
                title: 'Form',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-list',
                link : '/dashboard/forms',
            },
            {
                id   : 'whatsapp',
                title: 'Configura What\'s App',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-list',
                link : '/dashboard/whatsapp',
            }
        ],
    },
    {
        id   : 'customers',
        title: 'I miei clienti',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/dashboard/customers',
    },
    {
        id: 'settings',
        title: 'Settings',
        type: 'basic',
        icon: 'heroicons_outline:cog-8-tooth',
        link: '/dashboard/settings',
    }
];
