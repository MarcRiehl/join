import { Routes } from '@angular/router';
import { MainPage } from './layout/mainpage/mainpage';
import { Home } from './pages/home/home';
import { Summary } from './pages/summary/summary';
import { Board } from './pages/board/board';
import { AddTask } from './pages/add-task/add-task';
import { Contacts } from './pages/contacts/contacts';

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
