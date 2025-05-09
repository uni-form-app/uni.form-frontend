import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface FilterMenuProps {
  sortBy: 'price' | 'createdAt' | 'name';
  sortOrder: 'asc' | 'desc';
  onSortByChange: (value: 'price' | 'createdAt' | 'name') => void;
  onSortOrderToggle: () => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderToggle,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <ArrowUpDown className="h-4 w-4" />
          <span className="sr-only">Ordenar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={sortBy === "price" ? "font-medium" : ""}
          onClick={() => onSortByChange("price")}
        >
          Preço {sortBy === "price" && (sortOrder === "asc" ? "(menor para maior)" : "(maior para menor)")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={sortBy === "name" ? "font-medium" : ""}
          onClick={() => onSortByChange("name")}
        >
          Nome {sortBy === "name" && (sortOrder === "asc" ? "(A-Z)" : "(Z-A)")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={sortBy === "createdAt" ? "font-medium" : ""}
          onClick={() => onSortByChange("createdAt")}
        >
          Data {sortBy === "createdAt" && (sortOrder === "asc" ? "(mais antigos)" : "(mais recentes)")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSortOrderToggle}>
          Ordem: {sortOrder === "asc" ? "Crescente ↑" : "Decrescente ↓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};