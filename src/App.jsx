import React, { Suspense } from 'react';
import './app.scss'
import { ProductPage } from './pages';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoadingComponet, PageContainer, PageNotFound } from './components';
import ContextProvider from './context/ContextProvider';

const MenPage = React.lazy(() => import('./pages/MenPage'))
const WomenPage = React.lazy(() => import('./pages/WomenPage'))
const BestSellers = React.lazy(() => import('./pages/BestSellersPage'))
const NewArrivals = React.lazy(() => import('./pages/NewArrivalsPage'))
const Offers = React.lazy(() => import('./pages/OffersPage'))
const Unisex = React.lazy(() => import('./pages/UnisexPage'))

const suspenseWrapper = (Component) => (
  <Suspense fallback={<LoadingComponet />}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer />,
    children: [
      {
        path: "task-deploy",
        index: true,
        element: <ProductPage />,
      },
      {
        path: "men",
        element: suspenseWrapper(MenPage)
      },
      {
        path: "women",
        element: suspenseWrapper(WomenPage)
      },
      {
        path: "unisex",
        element: suspenseWrapper(Unisex)
      },
      {
        path: "bestSeller",
        element: suspenseWrapper(BestSellers)
      },
      {
        path: "newArrivals",
        element: suspenseWrapper(NewArrivals)
      },
      {
        path: "offers",
        element: suspenseWrapper(Offers)
      },
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  },
]);


function App() {

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App
