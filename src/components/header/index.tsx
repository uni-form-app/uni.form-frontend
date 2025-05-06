import { Home, LogOut, Menu, Package, Plus, ShoppingBag, User } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "../../providers/authProvider";
import { useCart } from "../../hooks/useCart";

export const Header = () => {
  const pathname = window.location.pathname;

  const navigation = [
    { name: "Início", href: "/", icon: Home },
    { name: "Meus Pedidos", href: "/purchases", icon: Package },
    { name: "Anunciar", href: "/produtos/novo", icon: Plus },
  ]

  const { user, logout } = useAuth();
  const { total } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">    <div className="container mx-auto flex h-16 items-center justify-between">
      <div className="flex items-center gap-2 md:gap-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 text-lg font-medium ${pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">uni.form</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium ${pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 relative">
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
            </Button>
            {total > 0 && (
              <span className="absolute top-0 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {total}
              </span>
            )}
          </Link>
        </div>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user?.username.slice(0, 2).toUpperCase() || "UU"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/perfil" className="cursor-pointer flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/produtos/meus" className="cursor-pointer flex items-center">
                <Package className="mr-2 h-4 w-4" />
                <span>Meus Anúncios</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer flex items-center" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    </header>
  );
};
