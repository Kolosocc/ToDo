import { FilterStatus } from './FilterStatus';
import { SortType } from './SortType';

export interface FilterBarProps {
  search: string;
  status: FilterStatus;
  sortType: SortType;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: FilterStatus) => void;
  onSortChange: (sortType: SortType) => void;
  onCreateTask: () => void;
}
