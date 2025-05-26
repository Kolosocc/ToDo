'use client';

import { useState } from 'react';

type FilterStatus = 'all' | 'completed' | 'pending';

interface FilterBarProps {
  search: string;
  status: FilterStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: FilterStatus) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <div className='flex flex-col w-auto md:flex-row md:items-center gap-2 p-4'>
      <input
        type='text'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Поиск по названию...'
        className='w-full md:w-1/2 p-2 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
      />

      <div className='flex-row md:flex '>
        {(['all', 'completed', 'pending'] as FilterStatus[]).map((filter) => (
          <button
            key={filter}
            onClick={() => onStatusChange(filter)}
            className={`px-4 py-1 m-1 rounded border
              ${
                status === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700'
              }
              dark:border-gray-600 hover:scale-105 transition`}
          >
            {filter === 'all'
              ? 'Все'
              : filter === 'completed'
              ? 'Выполненные'
              : 'Невыполненные'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
