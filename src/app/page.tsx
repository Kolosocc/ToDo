'use client';
import { useState } from 'react';
import FilterBar from './components/FilterBar';
import Calendar from './components/calendar/Calendar';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'completed' | 'pending'>('all');

  const handleMonthChange = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  return (
    <>
      <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
        <div className='container mx-auto p-4'>
          <div className='flex justify-between items-center mb-6'>
            <FilterBar
              search={search}
              status={status}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
            />
            <ThemeToggle />
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
              tasks={[]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
