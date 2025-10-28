
import React from 'react';
import type { IconProps } from './IconProps';

const GlobeAltIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c1.355 0 2.707-.158 4.008-.462M12 21c-1.355 0-2.707-.158-4.008-.462m0 0A9.004 9.004 0 0 1 12 3c1.355 0 2.707.158 4.008.462m-8.016 0A9.004 9.004 0 0 0 12 3c1.355 0 2.707.158 4.008.462m0 0h.01M12 3v18m0 0c1.355 0 2.707-.158 4.008-.462M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
);
export default GlobeAltIcon;
