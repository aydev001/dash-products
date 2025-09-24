import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/home/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import ProductsPanelPage from "@/pages/products/products-panel/ProductsPanelPage";
import ProductDetailPage from "@/pages/products/product-detail/ProductDetailPage";
import CreateProductPage from "@/pages/products/product-modal/CreateProductPage";
import EditProductPage from "@/pages/products/product-modal/EditProductPage";
import type { RouteObject } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { pages } from "@/shared/constants/pages";
import ModalWrapper from "@/components/modal-wrapper/ui/ModalWrapper";
import GuestRoute from "./GuestRoute";
import AuthLayout from "@/layouts/AuthLayout";

export const mainRoutes: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            { path: pages.home, element: <HomePage /> },
            {
                path: pages.dashboard,
                element:
                    <ProtectedRoute>
                        <ProductsPanelPage />
                    </ProtectedRoute>
            },
            {
                path: pages.products.detail(":id"),
                element:
                    <ProtectedRoute>
                        <ProductDetailPage />
                    </ProtectedRoute>
            },
            {
                path: pages.products.new,
                element:
                    <ProtectedRoute>
                        <ModalWrapper>
                            <CreateProductPage />
                        </ModalWrapper>
                    </ProtectedRoute>
            },
            {
                path: pages.products.edit(":id"),
                element:
                    <ProtectedRoute>
                        <ModalWrapper>
                            <EditProductPage />
                        </ModalWrapper>
                    </ProtectedRoute>
            }
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            { path: pages.login, element: <GuestRoute><LoginPage /></GuestRoute> },
            { path: pages.register, element: <GuestRoute><RegisterPage /></GuestRoute> },
        ]
    }
]
