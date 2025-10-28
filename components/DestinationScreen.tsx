import React from 'react';
import type { Destination, Attraction } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import CalendarIcon from './icons/CalendarIcon';
import UserIcon from './icons/UserIcon';
import LocationMarkerIcon from './icons/LocationMarkerIcon';
import HeartIcon from './icons/HeartIcon';
import StarIcon from './icons/StarIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface DestinationScreenProps {
  destination: Destination;
  onBack: () => void;
  onSelectAttraction: (attraction: Attraction) => void;
  selectedDates: { startDate: Date | null, endDate: Date | null };
}

const CategoryButton: React.FC<{ active?: boolean, children: React.ReactNode }> = ({ active, children }) => (
    <button className={`px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${active ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-white'}`}>
        {children}
    </button>
);

const AttractionCard: React.FC<{ attraction: Attraction, onClick: () => void }> = ({ attraction, onClick }) => (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden mb-4 cursor-pointer" onClick={onClick}>
        <img src={attraction.images[0]} alt={attraction.name} className="w-28 h-auto object-cover"/>
        <div className="p-3 flex-grow flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{attraction.name}</h3>
                    <HeartIcon className="w-5 h-5 text-gray-400"/>
                </div>
                <p className="text-sm text-gray-500">{attraction.address}</p>
                <p className="text-sm text-gray-500">Otwarte: {attraction.hours}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-700 ml-1">{attraction.rating}</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-[#E60049]">
                    Więcej <ChevronRightIcon className="w-4 h-4"/>
                </div>
            </div>
        </div>
    </div>
);


const DestinationScreen: React.FC<DestinationScreenProps> = ({ destination, onBack, onSelectAttraction, selectedDates }) => {
  const formatDateRange = () => {
    if (!selectedDates.startDate) {
      return "Nie wybrano daty";
    }

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const start = selectedDates.startDate.toLocaleDateString('pl-PL', options);
    
    if (!selectedDates.endDate || selectedDates.startDate.getTime() === selectedDates.endDate.getTime()) {
      return start;
    }

    const end = selectedDates.endDate.toLocaleDateString('pl-PL', options);
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-[#E60049] text-white p-4">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4"><ArrowLeftIcon /></button>
          <h1 className="text-2xl font-bold">{destination.name}</h1>
        </div>
        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 space-x-2">
            <CalendarIcon className="w-5 h-5 text-white" />
            <span className="font-semibold text-sm tracking-wide">{formatDateRange()}</span>
        </div>
        <div className="mt-4 -mx-4 px-4 overflow-x-auto">
          <div className="flex space-x-2">
            <CategoryButton active>Kultura</CategoryButton>
            <CategoryButton>Jedzenie</CategoryButton>
            <CategoryButton>Natura</CategoryButton>
            <CategoryButton>Sport</CategoryButton>
            <CategoryButton>Rozrywka</CategoryButton>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Atrakcje */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Odkryj miejsca i atrakcje</h2>
          {destination.attractions.map(attraction => (
              <AttractionCard key={attraction.id} attraction={attraction} onClick={() => onSelectAttraction(attraction)} />
          ))}
          <button className="w-full bg-[#F9A825] text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-500 transition-colors">
            Zobacz więcej atrakcji
          </button>
        </section>

        {/* Nocleg */}
        <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Potrzebujesz noclegu?</h2>
            <div className="space-y-3">
                <div className="relative">
                    <LocationMarkerIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" defaultValue={destination.name} className="w-full bg-gray-100 rounded-lg py-3 pl-10 pr-3 focus:outline-none"/>
                </div>
                <div className="flex space-x-2">
                    <div className="relative flex-1">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="4/10-5/10" className="w-full bg-gray-100 rounded-lg py-3 pl-10 pr-3 focus:outline-none"/>
                    </div>
                    <div className="relative flex-1">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="2" className="w-full bg-gray-100 rounded-lg py-3 pl-10 pr-3 focus:outline-none"/>
                    </div>
                    <button className="bg-gray-200 text-gray-700 font-semibold px-6 rounded-lg hover:bg-gray-300">Szukaj</button>
                </div>
            </div>
        </section>

        {/* Czas */}
        <section>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Ile masz czasu na odkrywanie?</h2>
                <button className="flex items-center text-sm font-semibold text-[#E60049]">
                    Więcej <ChevronRightIcon className="w-4 h-4"/>
                </button>
            </div>
            <div className="flex justify-around items-center">
                <button className="w-20 h-20 flex items-center justify-center bg-white border-2 border-[#F9A825] text-[#F9A825] font-bold text-2xl rounded-full shadow-sm">12h</button>
                <button className="w-20 h-20 flex items-center justify-center bg-[#E60049] text-white font-bold text-2xl rounded-full shadow-lg">24h</button>
                <button className="w-20 h-20 flex items-center justify-center bg-[#E60049] text-white font-bold text-2xl rounded-full shadow-lg">48h</button>
            </div>
        </section>

      </main>
    </div>
  );
};

export default DestinationScreen;