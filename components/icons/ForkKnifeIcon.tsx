import React from 'react';
import type { IconProps } from './IconProps';

const ForkKnifeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5m-13.5 7.5h13.5m-1.5-15l-1.5 15m-6-15l1.5 15m-6-15l1.5 15M5.25 8.25L3 3.75l2.25-1.5M18.75 8.25L21 3.75l-2.25-1.5" />
    </svg>
);
export default ForkKnifeIcon;
