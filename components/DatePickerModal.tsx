import React, { useState, useMemo } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface DatePickerModalProps {
  onClose: () => void;
  onConfirm: (dates: { startDate: Date | null, endDate: Date | null }) => void;
  initialDates: { startDate: Date | null, endDate: Date | null };
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ onClose, onConfirm, initialDates }) => {
  const [currentDate, setCurrentDate] = useState(initialDates.startDate || new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialDates.startDate);
  const [endDate, setEndDate] = useState<Date | null>(initialDates.endDate);
  const [selecting, setSelecting] = useState<'start' | 'end'>(initialDates.endDate ? 'start' : 'end');

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthName = currentDate.toLocaleString('pl-PL', { month: 'long' });

  const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentMonth, currentYear]);
  const firstDayOfMonth = useMemo(() => {
    const day = new Date(currentYear, currentMonth, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday as 0
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    
    if (selecting === 'start' || !startDate || (endDate && clickedDate > endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      setSelecting('end');
    } else { 
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
        setEndDate(null);
        setSelecting('end');
      } else {
        setEndDate(clickedDate);
        setSelecting('start');
      }
    }
  };
  
  const handleConfirm = () => onConfirm({ startDate, endDate });

  const weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
  const calendarCells = [...Array(firstDayOfMonth).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon className="w-5 h-5" /></button>
            <div className="font-bold text-lg capitalize">{monthName} {currentYear}</div>
            <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-7 text-center text-sm text-gray-500 font-medium">
            {weekDays.map(day => <div key={day}>{day}</div>)}
          </div>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-7 text-center">
            {calendarCells.map((day, index) => {
              if (!day) return <div key={`blank-${index}`}></div>;
              
              const date = new Date(currentYear, currentMonth, day);
              const isStartDate = startDate && isSameDay(date, startDate);
              const isEndDate = endDate && isSameDay(date, endDate);
              const isInRange = startDate && endDate && date > startDate && date < endDate;

              let wrapperClasses = "py-1";
              let cellClasses = "w-10 h-10 mx-auto flex items-center justify-center rounded-full cursor-pointer transition-colors";

              if (isInRange) {
                wrapperClasses += " bg-red-100";
                cellClasses += " text-red-800";
              } else {
                cellClasses += " hover:bg-gray-100";
              }

              if (isStartDate) {
                cellClasses += " bg-[#D22B42] text-white";
                if (endDate) wrapperClasses += " bg-red-100 rounded-l-full";
              }

              if (isEndDate) {
                cellClasses += " bg-[#D22B42] text-white";
                wrapperClasses += " bg-red-100 rounded-r-full";
              }

              return (
                <div key={day} className={wrapperClasses}>
                  <div className={cellClasses} onClick={() => handleDayClick(day)}>
                    {day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 flex justify-end space-x-2 border-t border-gray-200">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Anuluj</button>
            <button onClick={handleConfirm} className="px-4 py-2 rounded-lg bg-[#D22B42] text-white font-semibold hover:bg-red-700 transition-colors">Zatwierdź</button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DatePickerModal;