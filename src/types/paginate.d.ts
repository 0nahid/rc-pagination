import { Dispatch, SetStateAction } from "react";

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  color?: string;
  possibleLimits?: number[];
}

declare const Pagination: React.FC<PaginationProps>;

export default Pagination;
