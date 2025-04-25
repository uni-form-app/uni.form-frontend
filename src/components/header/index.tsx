import { CircleUser } from "lucide-react";
import { Input } from "../ui/input";

export const Header = () => {
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
        <CircleUser size={24} />
      </div>
    </header>
  );
};
