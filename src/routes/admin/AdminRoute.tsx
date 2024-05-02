


import AdminFrame from './components/AdminFrame';

const AdminRoute: React.FC = () => {

    const masterKey = sessionStorage.getItem('x-master-key');

    if (masterKey == null) {
        document.location = "/admin/login";
        return <></>
    }
    return (
        <AdminFrame />
    )
}

export default AdminRoute;