import React from 'react';
import type { NavItem } from '../types';
import UserIcon from './icons/UserIcon';
import MapIcon from './icons/MapIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import SettingsIcon from './icons/SettingsIcon';

interface BottomNavProps {
    active: NavItem;
    onNavigate: (item: NavItem) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate }) => {
    const navItems = [
        { id: 'trip', icon: UserIcon, label: 'Moja podróż' },
        { id: 'map', icon: MapIcon, label: 'Mapa' },
        { id: 'reservations', icon: BookmarkIcon, label: 'Rezerwacje' },
        { id: 'settings', icon: SettingsIcon, label: 'Ustawienia' },
    ] as const;

    return (
        <div className="absolute bottom-0 left-0 w-full bg-[#D22B42] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-30">
            <div className="flex justify-around items-center h-20">
                {navItems.map(item => {
                    const isActive = active === item.id;
                    return (
                        <button 
                            key={item.id} 
                            onClick={() => onNavigate(item.id)}
                            className={`flex flex-col items-center justify-center space-y-1 w-full text-white transition-opacity ${isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <item.icon className="w-7 h-7" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default BottomNav;
