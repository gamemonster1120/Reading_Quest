
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, PlanIcon, ShopIcon, RankIcon, ProfileIcon } from './icons/NavIcons';

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
    const commonClasses = "flex flex-col items-center justify-center w-full h-full transition-colors duration-200";
    const activeClass = "text-green-400";
    const inactiveClass = "text-gray-400 hover:text-white";
  
    return (
      <NavLink
        to={to}
        className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
      >
        {icon}
        <span className="text-xs font-bold">{label}</span>
      </NavLink>
    );
  };
  
const NavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-800 border-t border-gray-700 shadow-lg max-w-lg mx-auto">
      <div className="flex justify-around items-center h-full">
        <NavItem to="/" icon={<HomeIcon />} label="홈" />
        <NavItem to="/plan" icon={<PlanIcon />} label="계획" />
        <NavItem to="/shop" icon={<ShopIcon />} label="상점" />
        <NavItem to="/rank" icon={<RankIcon />} label="랭킹" />
        <NavItem to="/profile" icon={<ProfileIcon />} label="내 정보" />
      </div>
    </nav>
  );
};

export default NavBar;
