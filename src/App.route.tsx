import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/page';
import TodosPage from './pages/todos/page';
import { AppLayout } from './layout/AppLayout';

export const AppRoute = () => {
    return (
        <Routes>
            <Route Component={AppLayout}>
                <Route index path='' element={<HomePage/>}/>
                <Route path='todos' element={<TodosPage/>}/>
            </Route>
        </Routes>
    )
}