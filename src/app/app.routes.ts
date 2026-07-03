import { Routes } from '@angular/router';
import { MainPage } from './layout/mainpage/mainpage';
import { Home } from './pages/home/home';
import { Summary } from './pages/summary/summary';
import { Board } from './pages/board/board';
import { AddTask } from './pages/add-task/add-task';
import { Contacts } from './pages/contacts/contacts';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { LegalNotice } from './pages/legal-notice/legal-notice';
import { Help } from './pages/help/help';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        title: 'Join'
    },
    {
        path: '',  //leer da noch kein Login
        component: MainPage,
        children: [
            {
                path: 'summary',
                component: Summary,
                title: 'Summary'

            },
            {
                path: 'add-task',
                component: AddTask,
                title: 'Add-Task'
            },
            {
                path: 'board',
                component: Board,
                title: 'Board'

            },
            {
                path: 'contacts',
                component: Contacts,
                title: 'Contacts'
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicy,
                title: 'Privacy Policy'
            },
            {
                path: 'legal-notice',
                component: LegalNotice,
                title: 'Legal Notice'
            },
            {
                path: 'help',
                component: Help,
                title: 'Help'
            },
            {
                path: '',
                redirectTo: 'board',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
