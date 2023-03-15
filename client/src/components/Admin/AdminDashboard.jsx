import React from 'react'
import AdminMenu from './AdminMenu'
import { useLocation } from 'react-router-dom'

export default function AdminDashboard() {
    const location = useLocation();
    const isAdminRoute = location.pathname.includes('admin');

    if (isAdminRoute)

        return (
            <div>Dashboard</div>
        )
}
