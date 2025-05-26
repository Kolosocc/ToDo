'use client';

type FilterStatus = 'all' | 'completed' | 'pending';

interface FilterBarProps {
  search: string;
  status: FilterStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: FilterStatus) => void;
  onCreateTask: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onCreateTask,
}) => {
  return (
    <div className='flex flex-col  w-full  lg:flex-row md:items-center gap-2 '>
      <input
        type='text'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Поиск по названию...'
        className='w-auto md:w-1/2 p-2 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
      />

      <div className='flex flex-row flex-wrap  md:gap-2'>
        {(['all', 'completed', 'pending'] as FilterStatus[]).map((filter) => (
          <button
            key={filter}
            onClick={() => onStatusChange(filter)}
            className={`px-1 py-1 m-1 md:px-4 rounded border
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
