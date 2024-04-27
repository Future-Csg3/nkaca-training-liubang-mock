import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import LoginForm from './components/AdminLoginForm';

const AdminRoute: React.FC = () => {

    const masterKey = sessionStorage.getItem('x-master-key');

    if (masterKey == null) {
        document.location = "/admin/login";
    }
    return <><h1>Admin</h1></>
}

export default AdminRoute;