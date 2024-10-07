/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';


export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        subtitle: 'Dashboard',
        type: 'group',
        children: [{
            id: 'dashboard',
            title: 'Dashboard',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: '/dashboard/managment',
        },
        ],
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
            }
        ],
    },

    {
        id: 'marketing',
        title: 'Marketing',
        subtitle: 'Messaggistica e promozioni',
        type: 'group',
        icon: 'heroicons_outline:chart-bar-square',
        children: [

            {
                id   : 'app.whatsapp',
                title: 'Messaggistica',
                type : 'basic',
                icon : 'heroicons_outline:device-phone-mobile',
                link : '/dashboard/whatsapp',
            },
            {
                id   : 'app.promo',
                title: 'Promozioni',
                type : 'basic',
                icon : 'heroicons_outline:gift',
                link : '/dashboard/promo',
            },
            {
                id   : 'app.fidelity',
                title: 'Fidelity',
                type : 'basic',
                icon : 'heroicons_outline:heart',
                link : '/dashboard/fidelity',
            },{
                id   : 'app.config',
                title: 'Configura',
                type : 'basic',
                icon : 'heroicons_outline:adjustments-vertical',
                link : '/dashboard/config',
            },{
                id   : 'customers',
                title: 'I miei clienti',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/dashboard/customers',
            },

        ],
    },
    {
        id: 'settings',
        title: 'Impostazioni',
        subtitle: '',
        type: 'group',
        children: [
            {
                id: 'settings',
                title: 'Settings',
                type: 'basic',
                icon: 'heroicons_outline:cog-8-tooth',
                link: '/dashboard/settings',
            },
        ]
    },



];
