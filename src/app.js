import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/about.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { UserProvider } from "./utils/UserContext";
import { CartProvider } from "./utils/CartContext";
import Cart from "./components/Cart.js";
import Checkout from "./components/Checkout.js";
import Shimmer from "./components/shimmer.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

const Grocery = lazy(() => import("./components/Grocery.js"));

const AppLayout = () => {
  return (
    <UserProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
