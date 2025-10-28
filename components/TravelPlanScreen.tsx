import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import UserIcon from './icons/UserIcon';
import LocationMarkerIcon from './icons/LocationMarkerIcon';
import CalendarIcon from './icons/CalendarIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import MapIcon from './icons/MapIcon';
import ShareIcon from './icons/ShareIcon';
import CarIcon from './icons/CarIcon';
import ForkKnifeIcon from './icons/ForkKnifeIcon';

interface TravelPlanScreenProps {
  onBack: () => void;
  onShowMap: () => void;
}

const ItineraryItem: React.FC<{ icon: React.ReactElement, title: string, time: string, isLast?: boolean, editable?: boolean }> = ({ icon, title, time, isLast = false, editable = false }) => {
    return (
        <div className="flex items-start">
            <div className="flex flex-col items-center mr-4 flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center text-gray-700">
                    {React.cloneElement(icon, { className: "w-6 h-6" })}
                </div>
                {!isLast && <div className="w-px h-16 flex-grow border-l-2 border-dashed border-gray-300 my-1"></div>}
            </div>
            <div className="flex-grow pt-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-gray-800">{title}</p>
                        <p className="text-sm text-gray-500">{time}</p>
                    </div>
                    {editable && (
                        <button className="flex items-center text-sm text-gray-600 font-medium">
                            Edytuj <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
};

const TravelPlanScreen: React.FC<TravelPlanScreenProps> = ({ onBack, onShowMap }) => {

    const saturdayPlan = [
        { icon: <CarIcon />, title: 'Wyjazd do Warszawy', time: '10:00 - 12:00', editable: true },
        { icon: <LocationMarkerIcon />, title: 'Muzeum Narodowe', time: '14:00 - 16:00' },
        { icon: <ForkKnifeIcon />, title: 'Kolacja w restauracji "Podniebienie"', time: '17:00 - 18:00' }
    ];
    
    const sundayPlan = [
        { icon: <LocationMarkerIcon />, title: 'Teatr Narodowy', time: '10:00 - 13:00', editable: true },
        { icon: <ForkKnifeIcon />, title: 'Obiad w restauracji "Kozacy"', time: '14:00 - 16:00' },
        { icon: <CarIcon />, title: 'Powrót', time: '18:00 - 20:00' }
    ];

    return (
        <div className="bg-gray-100 min-h-full">
            <header className="bg-[#D22B42] text-white p-4 flex justify-between items-center sticky top-0 z-10 h-[60px]">
                <button onClick={onBack}><ArrowLeftIcon className="w-6 h-6" /></button>
                <h1 className="text-xl font-bold">Twój plan podróży</h1>
                <UserIcon className="w-6 h-6" />
            </header>

            <div className="w-full">
                <img src="https://i.imgur.com/u5n9tqf.jpeg" alt="Panorama Warszawy" className="w-full h-40 object-cover" />
                
                <div className="p-4 bg-white border-b border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <LocationMarkerIcon className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <span className="text-gray-500">Miejsce:</span>
                            <p className="font-bold text-gray-800">Warszawa</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <CalendarIcon className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <span className="text-gray-500">Data pobytu:</span>
                            <p className="font-bold text-gray-800">4 - 5 październik 2025</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-6">
                    {/* Saturday */}
                    <section>
                         <h2 className="text-lg font-bold mb-3">Sobota <span className="text-orange-500">4 października</span></h2>
                         <div className="space-y-2">
                            {saturdayPlan.map((item, index) => (
                                <ItineraryItem key={index} {...item} isLast={index === saturdayPlan.length - 1} />
                            ))}
                         </div>
                         <button 
                            onClick={onShowMap}
                            className="mt-4 w-full justify-center flex items-center space-x-2 bg-orange-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                            <MapIcon className="w-5 h-5" />
                            <span>Zobacz na mapie</span>
                         </button>
                    </section>
                    
                    <hr className="border-gray-200"/>

                    {/* Sunday */}
                    <section>
                         <h2 className="text-lg font-bold mb-3">Niedziela <span className="text-orange-500">5 października</span></h2>
                         <div className="space-y-2">
                             {sundayPlan.map((item, index) => (
                                <ItineraryItem key={index} {...item} isLast={index === sundayPlan.length - 1} />
                            ))}
                         </div>
                          <button 
                            onClick={onShowMap}
                            className="mt-4 w-full justify-center flex items-center space-x-2 bg-orange-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                            <MapIcon className="w-5 h-5" />
                            <span>Zobacz na mapie</span>
                         </button>
                    </section>
                </div>
                 
                 <div className="p-4">
                    <button className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                        <ShareIcon className="w-5 h-5" />
                        <span>Udostępnij Plan</span>
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default TravelPlanScreen;
