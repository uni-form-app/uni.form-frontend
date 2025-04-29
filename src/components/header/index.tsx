import { Link } from "react-router-dom";
import { useAuth } from "../../providers/auth-context";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between max-w-7x">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">
          uni.<span className="font-normal">form</span>
        </h1>
        <div className="relative w-64">
          <Input
            placeholder="Buscar produtos..."
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to={`/${user?.username}`}>
          <Avatar asChild>
            <AvatarFallback>{user?.username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};
