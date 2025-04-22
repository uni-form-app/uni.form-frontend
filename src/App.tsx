import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ProductContainer } from "./modules/products";
import { LoginContainer } from "./modules/login";
import { jwtDecode } from "jwt-decode";
import { JSX } from "react";

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
  const token = localStorage.getItem("authToken");

  // if (!token || !isValid(token)) {
  //   localStorage.removeItem("authToken");
  //   return <Navigate to="/login" replace />;
  // }

  return element;
};

const routes = [
  { path: "/", element: <ProtectedRoute element={< ProductContainer />} /> },
  { path: "/login", element: <LoginContainer /> },
];

const AppContent = ({ isLoginPage }: { isLoginPage: boolean }) => {
  if (isLoginPage) {
    return (
      <div className="flex-1">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col max-w-7xl p-6">
      <Header />
      <div className="flex-1">
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
  const isLoginPage = location.pathname === '/login';

  return <AppContent isLoginPage={isLoginPage} />

}
