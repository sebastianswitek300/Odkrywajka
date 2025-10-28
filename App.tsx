import React, { useState } from 'react';
import type { Screen, Destination, Attraction, NavItem } from './types';
import { destinations } from './data';

import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import DestinationScreen from './components/DestinationScreen';
import DetailScreen from './components/DetailScreen';
import TravelPlanScreen from './components/TravelPlanScreen';
import TravelMapScreen from './components/TravelMapScreen';
import BottomNav from './components/BottomNav';
import BookmarkIcon from './components/icons/BookmarkIcon';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(destinations[0]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [travelPlan, setTravelPlan] = useState<Attraction[]>([]);
  const [activeNav, setActiveNav] = useState<NavItem>('map');
  const [lastScreen, setLastScreen] = useState<Screen>('home');
  const [selectedDates, setSelectedDates] = useState<{ startDate: Date | null, endDate: Date | null }>({ startDate: null, endDate: null });

  const handleDatesChange = (dates: { startDate: Date | null, endDate: Date | null }) => {
    setSelectedDates(dates);
  };

  const navigateTo = (screen: Screen) => {
    setLastScreen(currentScreen);
    setCurrentScreen(screen);
  }

  const addToPlan = (attraction: Attraction) => {
    const isInPlan = travelPlan.some(item => item.id === attraction.id);
    if (isInPlan) {
      setTravelPlan(prevPlan => prevPlan.filter(item => item.id !== attraction.id));
    } else {
      setTravelPlan(prevPlan => [...prevPlan, attraction]);
      setActiveNav('trip');
      navigateTo('travelPlan');
    }
  };

  const handleNav = (item: NavItem) => {
      setActiveNav(item);
      if (item === 'trip') {
          navigateTo('travelPlan');
      } else {
          navigateTo('home');
      }
  };

  const startExploring = () => {
    navigateTo('home');
  };

  const navigateToDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    navigateTo('destination');
  };

  const navigateToDetails = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    navigateTo('details');
  };

  const navigateToTravelMap = () => {
    navigateTo('travelMap');
  };

  const goBack = () => {
    if (currentScreen === 'details') {
      navigateTo('destination');
    } else if (currentScreen === 'destination') {
      navigateTo('home');
    } else if (currentScreen === 'travelMap') {
      navigateTo('travelPlan');
    } else if (currentScreen === 'travelPlan') {
      navigateTo(lastScreen === 'travelPlan' ? 'home' : lastScreen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onStart={startExploring} />;
      case 'home':
        return <HomeScreen 
                  onSelectDestination={navigateToDestination}
                  selectedDates={selectedDates}
                  onDatesChange={handleDatesChange} 
                />;
      case 'destination':
        return selectedDestination ? (
          <DestinationScreen
            destination={selectedDestination}
            onBack={goBack}
            onSelectAttraction={navigateToDetails}
            selectedDates={selectedDates}
          />
        ) : null;
      case 'details':
        return selectedAttraction && selectedDestination ? (
          <DetailScreen
            attraction={selectedAttraction}
            onBack={goBack}
          />
        ) : null;
      case 'travelPlan':
        return <TravelPlanScreen onBack={goBack} onShowMap={navigateToTravelMap} />;
       case 'travelMap':
        return <TravelMapScreen onBack={goBack} />;
      default:
        return <HomeScreen 
                  onSelectDestination={navigateToDestination} 
                  selectedDates={selectedDates}
                  onDatesChange={handleDatesChange}
                />;
    }
  };
  
  const shouldShowNav = currentScreen !== 'splash';
  const isInPlan = selectedAttraction ? travelPlan.some(item => item.id === selectedAttraction.id) : false;

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="w-[375px] h-[812px] bg-white shadow-2xl overflow-hidden relative" style={{contain: 'layout paint style'}}>
        <div className={`h-full overflow-y-auto ${currentScreen === 'details' ? 'pb-44' : shouldShowNav ? 'pb-20' : ''}`}>
            {renderScreen()}
        </div>

        {currentScreen === 'details' && selectedAttraction && (
             <div className="absolute bottom-20 left-0 w-full p-4 bg-white/80 backdrop-blur-sm z-20">
                <button
                    onClick={() => addToPlan(selectedAttraction)}
                    className={`w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 text-lg transition-colors ${
                        isInPlan
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-[#F9A825] text-white hover:bg-orange-500'
                    }`}
                >
                    <BookmarkIcon className="w-6 h-6" />
                    <span>{isInPlan ? 'Dodano do planu' : 'Dodaj do planu podróży'}</span>
                </button>
            </div>
        )}
        
        {shouldShowNav && <BottomNav active={activeNav} onNavigate={handleNav} />}
      </div>
    </div>
  );
};

export default App;