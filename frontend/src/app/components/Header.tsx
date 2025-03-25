"use client";

import Link from "next/link";
import DashboardButton from "./DashBoardButton";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-12">
      <div className="text-sm md:text-xl font-bold text-blue-600">
        <Link href="/">Link shortener app</Link>
      </div>
      <nav className="flex items-center space-x-6">
        <Link
          href="/#why-us"
          className="text-sm md:text-xl font-medium text-primary-text"
        >
          Why us
        </Link>
        <Link
          href="/#about"
          className="text-sm md:text-xl font-medium text-primary-text"
        >
          About
        </Link>

        <DashboardButton />
      </nav>
    </header>
  );
};

export default Header;
