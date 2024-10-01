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
                title: 'Prenotazioni',
                type: 'basic',
                icon: 'heroicons_mini:calendar-days',
                link: '/dashboard/bookings',
            },
            {
                id   : 'app.forms',
                title: 'Form',
                type : 'group',
                icon : 'heroicons_outline:clipboard-document-list',
                children: [
                    {
                        id: 'apps.calendar',
                        title: 'Form Prenotazioni',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/dashboard/forms',
                    },
                ]
            },
            {
                id   : 'app.whatsapp',
                title: 'Configura What\'s App',
                type : 'basic',
                icon : 'heroicons_outline:device-phone-mobile',
                link : '/dashboard/whatsapp',
            },
            {
                id: 'apps.ecommerce',
                title: 'ECommerce',
                type: 'collapsable',
                icon: 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id: 'apps.ecommerce.inventory',
                        title: 'Inventory',
                        type: 'basic',
                        link: '/apps/ecommerce/inventory',
                    },
                ],
            },
            {
                id: 'apps.file-manager',
                title: 'File Manager',
                type: 'basic',
                icon: 'heroicons_outline:cloud',
                link: '/apps/file-manager',
            },
            // {
            //     id: 'apps.help-center',
            //     title: 'Help Center',
            //     type: 'collapsable',
            //     icon: 'heroicons_outline:information-circle',
            //     link: '/apps/help-center',
            //     children: [
            //         {
            //             id: 'apps.help-center.home',
            //             title: 'Home',
            //             type: 'basic',
            //             link: '/apps/help-center',
            //             exactMatch: true,
            //         },
            //         {
            //             id: 'apps.help-center.faqs',
            //             title: 'FAQs',
            //             type: 'basic',
            //             link: '/apps/help-center/faqs',
            //         },
            //         {
            //             id: 'apps.help-center.guides',
            //             title: 'Guides',
            //             type: 'basic',
            //             link: '/apps/help-center/guides',
            //         },
            //         {
            //             id: 'apps.help-center.support',
            //             title: 'Support',
            //             type: 'basic',
            //             link: '/apps/help-center/support',
            //         },
            //     ],
            // },
            // {
            //     id: 'apps.mailbox',
            //     title: 'Mailbox',
            //     type: 'basic',
            //     icon: 'heroicons_outline:envelope',
            //     link: '/apps/mailbox',
            //     badge: {
            //         title: '27',
            //         classes: 'px-2 bg-pink-600 text-white rounded-full',
            //     },
            // },
            // {
            //     id: 'apps.notes',
            //     title: 'Notes',
            //     type: 'basic',
            //     icon: 'heroicons_outline:pencil-square',
            //     link: '/apps/notes',
            // },
            // {
            //     id: 'apps.scrumboard',
            //     title: 'Scrumboard',
            //     type: 'basic',
            //     icon: 'heroicons_outline:view-columns',
            //     link: '/apps/scrumboard',
            // },
            // {
            //     id: 'apps.tasks',
            //     title: 'Tasks',
            //     type: 'basic',
            //     icon: 'heroicons_outline:check-circle',
            //     link: '/apps/tasks',
            // },
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
