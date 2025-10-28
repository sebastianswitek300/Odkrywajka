import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ClockIcon from './icons/ClockIcon';
import PhoneIcon from './icons/PhoneIcon';
import GlobeAltIcon from './icons/GlobeAltIcon';
import GoogleMapsIcon from './icons/GoogleMapsIcon';
import TripAdvisorIcon from './icons/TripAdvisorIcon';

interface TravelMapScreenProps {
  onBack: () => void;
}

const LocationCard: React.FC<{
    number: number;
    name: string;
    description: string;
    hours: string;
    phone: string;
    website: string;
    image: string;
}> = ({ number, name, description, hours, phone, website, image }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4">
            <div className="flex items-start space-x-3">
                <div className="relative">
                    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w.org/2000/svg" className="drop-shadow-md">
                        <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 16 40 16 40C16 40 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" fill="#D22B42"/>
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{number}</text>
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-1">{name}</h2>
            </div>
            <div className="mt-3 flex space-x-4">
                <div className="flex-grow">
                    <p className="text-gray-600 text-sm mb-3">{description}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center"><ClockIcon className="w-4 h-4 mr-2" /><span>{hours}</span></div>
                        <div className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2" /><span>{phone}</span></div>
                        <div className="flex items-center"><GlobeAltIcon className="w-4 h-4 mr-2" /><span>{website}</span></div>
                    </div>
                </div>
                <img src={image} alt={name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Otwórz w:</p>
                <div className="flex space-x-2">
                    <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors">
                        <GoogleMapsIcon className="w-5 h-5" />
                        <span>Google Maps</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors">
                        <TripAdvisorIcon className="w-5 h-5" />
                        <span>Tripadvisor</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const TravelMapScreen: React.FC<TravelMapScreenProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-full">
        <header className="bg-[#D22B42] text-white p-4 flex items-center sticky top-0 z-10 h-[60px]">
            <button onClick={onBack} className="mr-4"><ArrowLeftIcon className="w-6 h-6" /></button>
            <h1 className="text-xl font-bold text-center flex-grow">Mapa podróży</h1>
            <div className="w-6"></div>
        </header>

        <div className="w-full h-60">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39063.38531742468!2d21.01358913915161!3d52.236599980645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2sus!4v1672932452378!5m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Warsaw">
            </iframe>
        </div>
        
        <main className="p-4 bg-gray-50 space-y-4">
            <LocationCard 
                number={1}
                name="Muzeum Narodowe"
                description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
                hours="Sobota: 10:00-20:00"
                phone="+48 567 678 789"
                website="www.muzeumnarodowe.pl"
                image="https://i.imgur.com/QkY5F2Z.jpeg"
            />
            
            <div className="border-t border-gray-200 my-2">
                <div className="p-3">
                    <h3 className="font-semibold text-gray-800">Następny punkt: Restauracja Podniebienie</h3>
                    <p className="text-sm text-gray-500">Dystans: 1.2 km · Komunikacja miejska: Autobus 175</p>
                </div>
            </div>

            <LocationCard 
                number={2}
                name="Restauracja Podniebienie"
                description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
                hours="Sobota: 10:00-23:00"
                phone="+48 567 678 789"
                website="www.podniebienie.pl"
                image="https://i.imgur.com/5u03oBD.jpeg"
            />
        </main>
    </div>
  );
};

export default TravelMapScreen;