import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Layouts/Dashboard";
import { ProtectedRoute } from './ProtectedRoute'

const Login = lazy(() => import('../screens/auth'));
const Products = lazy(() => import('../screens/products'));

export const Navigation = () => {
    return (
        <Routes>

            <Route element={<Dashboard />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Products />} />
                </Route>
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    )
}