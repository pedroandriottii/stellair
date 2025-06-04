"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home as HomeIcon, Search as SearchIcon, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();

  const getIconColor = (route: string) => {
    return pathname === route ? "text-[#B9FF25]" : "text-[#A1A1A1]";
  };

  return (
    <nav className="border-t bg-white fixed bottom-0 inset-x-0">
      <div className="flex justify-around py-3">
        <Link href="/home">
          <div className={`flex flex-col items-center ${getIconColor("/")}`}>
            <HomeIcon className={cn("h-6 w-6", getIconColor("/home"))}  />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        <Link href="/home/search">
          <div className={`flex flex-col items-center ${getIconColor("/search")}`}>
            <SearchIcon className={cn("h-6 w-6", getIconColor("/home/search"))} />
            <span className="text-xs">Buscar</span>
          </div>
        </Link>

        <Link href="/profile">
          <div className={`flex flex-col items-center ${getIconColor("/profile")}`}>
            <UserIcon className={cn("h-6 w-6", getIconColor("/profile"))} />
            <span className="text-xs">Perfil</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
