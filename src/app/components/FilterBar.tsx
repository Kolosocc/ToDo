'use client';

type FilterStatus = 'all' | 'completed' | 'pending';
type SortType = 'date' | 'priority';

interface FilterBarProps {
  search: string;
  status: FilterStatus;
  sortType: SortType; // New prop for sort type
  onSearchChange: (value: string) => void;
  onStatusChange: (status: FilterStatus) => void;
  onSortChange: (sortType: SortType) => void; // New prop for sort change
  onCreateTask: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  status,
  sortType,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onCreateTask,
}) => {
  return (
    <div className='flex flex-col w-full lg:flex-row md:items-center gap-2'>
      <input
        type='text'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Поиск по названию...'
        className='w-full md:w-1/2 p-2 border rounded text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600'
      />
      <div className='flex flex-row flex-wrap items-center gap-2'>
        {(['all', 'completed', 'pending'] as FilterStatus[]).map((filter) => (
          <button
            key={filter}
            onClick={() => onStatusChange(filter)}
            className={`px-1 py-1 m-1 md:px-4 rounded border
              ${
                status === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
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
        <select
          value={sortType}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className='px-1 py-1 m-1 md:px-4 rounded border bg-white dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600 hover:scale-105 transition'
        >
          <option value='priority'>По важности</option>
          <option value='date'>По дате</option>
        </select>
        <button
          onClick={onCreateTask}
          className='px-4 py-1 m-1 rounded border bg-green-700 text-white dark:border-gray-600 hover:scale-105 transition'
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
