import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/header";
import { jwtDecode } from "jwt-decode";
import { JSX, useEffect } from "react";
import { LoginContainer } from "./modules/Login/containers/login";
import { ProductContainer } from "./modules/Products/containers/ProductContainer";
import { useLocalStorage } from "./providers/local-storage";
import { PartnerContainer } from "./modules/Partners/containers/PartnerContainer";
import { ProfileContainer } from "./modules/Profile/containers/ProfileContainer";
import { useAuth } from "./providers/auth-context";

export interface decodedUser {
  exp: number;
  id: string;
  email: string;
  username: string;
}

const isValid = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

const decodeToken = (token: string): decodedUser => {
  try {
    return jwtDecode<decodedUser>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    throw new Error("Invalid token");
  }
}

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
  { path: "/", element: <ProtectedRoute element={<ProductContainer />} /> },
  { path: "/login", element: <LoginContainer /> },
  { path: "/partners", element: <PartnerContainer /> },
  { path: "/:username", element: <ProtectedRoute element={<ProfileContainer />} /> },
];

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { setAuth } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      setAuth(decodedUser);
    }
  }, [setAuth]);

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
    <div className="h-screen w-full flex flex-col p-6">
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
