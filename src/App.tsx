import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/header";
import { jwtDecode } from "jwt-decode";
import { JSX } from "react";
import { LoginContainer } from "./modules/Login/containers/login";
import { ProductContainer } from "./modules/Products/containers/ProductContainer";
import { useLocalStorage } from "./providers/local-storage";
import { ProductDetailContainer } from "./modules/Products/containers/ProductDetailContainer";
import { PurchasesContainer } from "./modules/Purchases/containers/PurchasesContainer";
import { CartContainer } from "./modules/Cart/containers/CartContainer";

interface JwtPayload {
  exp: number;
}

const isValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { get } = useLocalStorage();
  const token = get("token");

  if (!token || !isValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return element;
};

const routes = [
  { path: "/login", element: <LoginContainer /> },
  { path: "/", element: <ProtectedRoute element={<ProductContainer />} /> },
  { path: "/purchases", element: <ProtectedRoute element={<PurchasesContainer />} /> },
  { path: "/product/:id", element: <ProtectedRoute element={<ProductDetailContainer />} /> },
  { path: "/cart", element: <ProtectedRoute element={<CartContainer />} /> }
];

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-7x">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export function App() {
  return <AppContent />;
}
