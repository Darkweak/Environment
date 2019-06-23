import { Welcome } from "./components/Welcome";
import { List as CategoryList } from "./components/Category/List";
import { Item as CategoryItem } from "./components/Category/Item";
import { List as SubjectList } from "./components/Item/List";
import { Item as SubjectItem } from "./components/Item/Item";
import { Connection } from "./components/Connection";
import { Profile } from "./components/User";
import { ChangePassword } from "./components/User/ChangePassword";

export const routes = [
    {
        component: ChangePassword,
        path: '/change-password'
    },
    {
        component: Profile,
        path: '/profile'
    },
    {
        component: SubjectItem,
        path: '/subjects/:id'
    },
    {
        component: CategoryItem,
        path: '/category/:name'
    },
    {
        component: CategoryList,
        path: '/categories'
    },
    {
        component: Connection,
        path: '/connection'
    },
    {
        component: SubjectList,
        path: '/subjects'
    },
    {
        component: Welcome,
        path: '/'
    },
];
