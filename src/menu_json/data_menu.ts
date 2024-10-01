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
        id: 'apps',
        title: 'Calendario',
        subtitle: 'Prenotazioni e form',
        type: 'group',
        icon: 'heroicons_outline:calendar-days',
        children: [
            {
                id: 'apps.calendar',
                title: 'Calendario',
                type: 'collapsable',
                icon: 'heroicons_outline:calendar-days',
                children: [
                    {
                        id: 'apps.calendar',
                        title: 'Prenotazioni',
                        type: 'basic',
                        icon: 'heroicons_mini:calendar-days',
                        link: '/dashboard/bookings',
                    },
                    {
                        id: 'apps.calendar',
                        title: 'Form',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/dashboard/forms',
                    },{
                        id: 'apps.calendar',
                        title: 'Tag',
                        type: 'basic',
                        icon: 'heroicons_outline:tag',
                        link: '/dashboard/tags',
                    },
                ],
            },
            {
                id   : 'app.whatsapp',
                title: 'Configura What\'s App',
                type : 'basic',
                icon : 'heroicons_outline:device-phone-mobile',
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
    },

];
