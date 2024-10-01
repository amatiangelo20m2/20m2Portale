import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from "./layout/layout.component";

export const appRoutes: Route[] = [

    {path: '', pathMatch : 'full', redirectTo: 'dashboard/managment'},
    {path: 'dashboard', pathMatch : 'full', redirectTo: 'dashboard/managment'},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard/managment'},

    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            // {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')},
            // {path: 'reservotp', loadChildren: () => import('app/modules/pages/booking/booking.routes')},
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')},

        ]
    },

    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            // Reservation route available for both signed-in and signed-out users
            { path: 'reservation', loadChildren: () => import('app/modules/customer/forms/form.routes')},
        ]
    },

    // // Landing routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //
    //         // {path: 'reservation', loadChildren: () => import('app/modules/pages/booking/booking.routes')},
    //
    //     ]
    // },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'managment', loadChildren: () => import('app/modules/admin/dashboard/dashboard.routes')},
            { path: 'bookings', loadChildren: () => import('app/modules/admin/restaurant/bookingpage/bookingpage.routes')},
            { path: 'customers', loadChildren: () => import('app/modules/admin/restaurant/customers/customers.routes')},
            { path: 'forms', loadChildren: () => import('app/modules/admin/restaurant/form/formlist/formlist.routes')},
            { path: 'tags', loadChildren: () => import('app/modules/admin/restaurant/tag/tag.routes')},
            { path: 'whatsapp', loadChildren: () => import('app/modules/admin/restaurant/whatsappconf/whats-app-conf.routes')},
            { path: 'settings', loadChildren: () => import('app/modules/pages/settings/settings.routes')},
        ]
    },{
        path: '**',
        redirectTo: '/'
    }
];
