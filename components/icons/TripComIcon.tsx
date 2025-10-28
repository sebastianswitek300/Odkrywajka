
import React from 'react';
import type { IconProps } from './IconProps';

const TripComIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <div className={`flex items-center justify-center font-bold text-white bg-blue-500 rounded-md ${className}`}>
        T
    </div>
);
export default TripComIcon;
