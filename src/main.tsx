import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Toaster } from 'sonner';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { ShopPage } from '@/pages/ShopPage'
import { ProductDetailsPage } from '@/pages/ProductDetailsPage'
import { KnowledgePage } from '@/pages/KnowledgePage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/knowledge",
    element: <KnowledgePage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="top-center" />
    </ErrorBoundary>
  </QueryClientProvider>,
)