import React from "react";
import { Calendar, User } from "lucide-react";

interface SellerInfoProps {
  sellerName: string;
  rating: number;
  joinDate: string;
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ sellerName, rating, joinDate }) => {
  return (
    <div>
      <h2 className="font-medium text-lg mb-2">Vendedor</h2>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">{sellerName}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>⭐ {rating}</span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {joinDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};