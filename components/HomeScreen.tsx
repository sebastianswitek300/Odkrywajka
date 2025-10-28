import React, { useState } from 'react';
import { destinations } from '../data';
import type { Destination } from '../types';
import SearchIcon from './icons/SearchIcon';
import UserIcon from './icons/UserIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import MenuIcon from './icons/MenuIcon';
import CalendarIcon from './icons/CalendarIcon';
import DatePickerModal from './DatePickerModal';

interface HomeScreenProps {
  onSelectDestination: (destination: Destination) => void;
  selectedDates: { startDate: Date | null, endDate: Date | null };
  onDatesChange: (dates: { startDate: Date | null, endDate: Date | null }) => void;
}

const DestinationCard: React.FC<{ destination: Destination; onClick: () => void; }> = ({ destination, onClick }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300" onClick={onClick}>
        <img src={destination.image} alt={destination.name} className="w-full h-32 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900">{destination.name}</h3>
            <p className="text-sm text-gray-500">{destination.description}</p>
        </div>
    </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectDestination, selectedDates, onDatesChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const matchedDestination = destinations.find(
      dest => dest.name.toLowerCase() === query
    );

    if (matchedDestination) {
      onSelectDestination(matchedDestination);
    } else {
      alert(`Nie znaleziono kierunku: "${searchQuery}"`);
    }
  };
  
  const handleDateConfirm = (dates: { startDate: Date | null, endDate: Date | null }) => {
    onDatesChange(dates);
    setDatePickerVisible(false);
  };
  
  const formatDateRange = () => {
    if (!selectedDates.startDate) {
      return "Kiedy jedziesz?";
    }

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const start = selectedDates.startDate.toLocaleDateString('pl-PL', options).replace('.', '');
    
    if (!selectedDates.endDate || selectedDates.startDate.getTime() === selectedDates.endDate.getTime()) {
      return start;
    }

    const end = selectedDates.endDate.toLocaleDateString('pl-PL', options).replace('.', '');
    return `${start} - ${end}`;
  };


  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-[#D22B42]">Odkrywajka</h1>
        <div className="flex items-center space-x-4">
            <SearchIcon className="w-6 h-6 text-gray-700"/>
            <UserIcon className="w-6 h-6 text-gray-700"/>
            <MenuIcon className="w-6 h-6 text-gray-700"/>
        </div>
      </header>
      
      {/* Hero */}
      <div className="relative h-80 bg-cover bg-center text-white p-6 flex flex-col justify-center items-center text-center" style={{backgroundImage: "url('https://picsum.photos/seed/paris/375/288')"}}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 w-full">
            <h2 className="text-4xl font-bold mb-2">Zaplanuj swoją podróż</h2>
            <p className="mb-6 text-lg">Inspiracje i trasy dopasowane do Ciebie</p>
            <div className="w-full max-w-sm mx-auto space-y-3">
                <form onSubmit={handleSearch} className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Dokąd jedziesz?" 
                      className="w-full bg-white text-gray-800 rounded-full py-3 pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D22B42]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                 <button
                  onClick={() => setDatePickerVisible(true)}
                  className="w-full bg-white/20 backdrop-blur-sm text-white rounded-full py-3 px-4 shadow-lg flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <CalendarIcon className="w-5 h-5" />
                  <span>{formatDateRange()}</span>
                </button>
                <div className="pt-4 flex items-center justify-center">
                    <button
                        onClick={() => onSelectDestination(destinations[0])}
                        className="bg-[#D22B42] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-colors transform hover:scale-105"
                    >
                        Odkrywaj
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      <main className="p-6 bg-white space-y-8">
        {/* Popularne kierunki */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Popularne kierunki</h2>
            <button className="flex items-center text-sm font-semibold text-[#D22B42]">
              Zobacz więcej <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {destinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} onClick={() => onSelectDestination(dest)} />
            ))}
          </div>
        </section>

        {/* Spersonalizowane rekomendacje */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Spersonalizowane rekomendacje</h2>
            <button className="flex items-center text-sm font-semibold text-[#D22B42]">
              Zobacz więcej <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

       {isDatePickerVisible && (
        <DatePickerModal
          initialDates={selectedDates}
          onClose={() => setDatePickerVisible(false)}
          onConfirm={handleDateConfirm}
        />
      )}
    </div>
  );
};

export default HomeScreen;