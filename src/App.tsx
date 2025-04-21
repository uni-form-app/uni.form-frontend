import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ProductContainer } from "./modules/products";

const routes = [
  { path: '/', element: <ProductContainer /> },
];

export function App() {
  return (
    <div className="w-full h-full p-4">
      <Header />
      <div className="h-screen flex">
        <div>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}
