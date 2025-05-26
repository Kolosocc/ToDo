'use client';

import {
  addDays,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
} from 'date-fns';
import { ru } from 'date-fns/locale'; // Импортируем русскую локализацию

interface CalendarGridMobileProps {
  currentMonth: Date; // Текущий месяц
  selectedDate: Date; // Выбранная дата
  onDateSelect: (date: Date) => void; // Обработчик выбора даты
}

const CalendarGridMobile: React.FC<CalendarGridMobileProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfMonth(monthEnd);

  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      days.push(
        <button
          key={cloneDay.toISOString()}
          className={`p-2 text-sm rounded-full w-10 h-10
            ${isSameDay(cloneDay, selectedDate) ? 'bg-blue-500 text-white' : ''}
            ${!isSameMonth(cloneDay, monthStart) ? 'text-gray-400' : ''}
            hover:bg-blue-100 dark:hover:bg-blue-900 transition`}
          onClick={() => onDateSelect(cloneDay)}
        >
          {format(cloneDay, 'd', { locale: ru })}{' '}
        </button>
      );
      day = addDays(day, 1);
    }
  }

  return (
    <div className='grid grid-cols-7 gap-1'>
      {/* Заголовки дней недели */}
      {weekdays.map((weekday, index) => (
        <div
          key={index}
          className='text-center text-sm font-semibold text-gray-600 dark:text-gray-300'
        >
          {weekday}
        </div>
      ))}
      {/* Сетка дней */}
      {days}
    </div>
  );
};

export default CalendarGridMobile;
