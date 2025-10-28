import React, { useState } from 'react';
import type { Attraction } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import StarIcon from './icons/StarIcon';
import LocationMarkerIcon from './icons/LocationMarkerIcon';
import ClockIcon from './icons/ClockIcon';
import PhoneIcon from './icons/PhoneIcon';
import GlobeAltIcon from './icons/GlobeAltIcon';
import TicketIcon from './icons/TicketIcon';
import TripComIcon from './icons/TripComIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface DetailScreenProps {
  attraction: Attraction;
  onBack: () => void;
}

const InfoRow: React.FC<{ icon: React.ElementType, text: string }> = ({ icon: Icon, text }) => (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-200 last:border-b-0">
        <Icon className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700">{text}</span>
    </div>
);

const DetailScreen: React.FC<DetailScreenProps> = ({ attraction, onBack }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const ticketLogos: { [key: string]: React.ElementType } = {
        'ticket': TicketIcon,
        'tripcom': TripComIcon,
    };
    
    return (
        <div>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-20 flex items-center p-4 bg-[#E60049] text-white">
                <button onClick={onBack} className="mr-4"><ArrowLeftIcon /></button>
                <h1 className="text-xl font-bold">Szczegóły</h1>
            </header>

            {/* Image Carousel */}
            <div className="relative pt-16">
                <div className="overflow-hidden">
                    <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                        {attraction.images.map((img, index) => (
                            <img key={index} src={img} alt={`${attraction.name} ${index + 1}`} className="w-full flex-shrink-0 h-64 object-cover" />
                        ))}
                    </div>
                </div>
                <div className="absolute top-20 left-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-md">{attraction.category}</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {attraction.images.map((_, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2.5 h-2.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></button>
                    ))}
                </div>
            </div>

            <main className="p-4 space-y-6">
                {/* Title and Rating */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900">{attraction.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(attraction.rating)} className="w-5 h-5" />)}
                        </div>
                        <span className="font-bold text-gray-800">{attraction.rating}</span>
                        <span className="text-gray-500">({attraction.reviews} reviews)</span>
                    </div>
                </section>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{attraction.description}</p>

                {/* Info */}
                <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <InfoRow icon={LocationMarkerIcon} text={attraction.address} />
                    <InfoRow icon={ClockIcon} text={`Godziny otwarcia: ${attraction.hours}`} />
                    <InfoRow icon={PhoneIcon} text={attraction.phone} />
                    <InfoRow icon={GlobeAltIcon} text={attraction.website} />
                </section>
                
                {/* Tip */}
                <section className="bg-orange-50 p-4 rounded-lg flex items-center space-x-4">
                    <div className="bg-[#F9A825] text-white font-bold text-2xl rounded-full w-16 h-16 flex items-center justify-center">
                        {attraction.avgTime}
                    </div>
                    <div>
                        <h3 className="font-bold text-orange-800">Odkrywajka Tip</h3>
                        <p className="text-sm text-orange-700">Inni podróżnicy spędzają tu średnio {attraction.avgTime} godziny</p>
                    </div>
                </section>

                {/* Tickets */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Kup bilet</h3>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-200">
                        {attraction.ticketProviders.map(provider => {
                            const Logo = ticketLogos[provider.logo] || TicketIcon;
                            return (
                                <div key={provider.name} className="p-4 flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                        <Logo className="w-8 h-8 text-gray-600" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{provider.name}</p>
                                            <p className="text-sm text-gray-500">{provider.type}</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center text-[#E60049] font-bold">
                                        {provider.price.toFixed(2)} zł <ChevronRightIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DetailScreen;