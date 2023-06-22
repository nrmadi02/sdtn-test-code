import {
  type ColumnDef,
  type PaginationState,
  type Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Table as ReactTable,
  type OnChangeFn,
} from "@tanstack/react-table";
import { Fragment, type PropsWithChildren } from "react";
import { BaseButton } from "../Button";
import Spinner from "../Spinner";

interface ReactListProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, string>[];
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  pagination?: PaginationState | undefined;
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState> | undefined;
  className?: string;
  isLoading?: boolean;
  thLength?: number;
}

const ListReactArticle = <T extends object>({
  data,
  columns,
  pagination,
  pageCount,
  setPagination,
  isLoading,
}: ReactListProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="flex w-full flex-col items-center">
      {isLoading ? (
        <div className="flex h-[300px] w-full flex-row items-center justify-center p-5">
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {table.getRowModel().rows.length !== 0 ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Fragment>
                ))}
              </Fragment>
            ))
          ) : (
            <div className="flex h-[300px] col-span-2 w-full flex-row items-center justify-center p-5">
              <p>No Data</p>
            </div>
          )}
        </div>
      )}
      <Pagination table={table} />
    </div>
  );
};

export default ListReactArticle;

const Pagination = <T extends object>({
  table,
}: PropsWithChildren<{
  table: ReactTable<T>;
}>) => {
  return (
    <div className="flex flex-row flex-wrap w-full items-center justify-center px-4 py-4">
      <div className="hidden flex-row items-center gap-2 text-sm">
        <p>Page size:</p>
        <select
          className="rounded-md border p-1 outline-none transition duration-150 ease-in-out focus-within:border-emerald-500"
          defaultValue={table.initialState.pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.currentTarget.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span className="ml-3 flex items-center gap-1 text-sm">
          <div>Page</div>

          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
      <div className="flex items-center gap-2 ">
        <BaseButton
          variant="ghost"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </BaseButton>

        <BaseButton
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </BaseButton>

        <BaseButton
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </BaseButton>

        <BaseButton
          variant="ghost"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </BaseButton>
      </div>
    </div>
  );
};
