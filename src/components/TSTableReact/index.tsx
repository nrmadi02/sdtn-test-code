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
import classNames from "classnames";
import { BaseButton } from "../Button";
import Spinner from "../Spinner";

interface ReactTableProps<T extends object> {
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

const Table = <T extends object>({
  data,
  columns,
  renderSubComponent,
  pagination,
  pageCount,
  className,
  setPagination,
  isLoading,
  thLength,
}: ReactTableProps<T>) => {
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
    <div className="inline-block max-w-full w-full overflow-x-auto">
      <div className="overflow-x-auto">
        <table
          className={classNames("w-full min-w-[800px] md:w-full table-auto", className)}
        >
          <thead className="bg-emerald-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={thLength}>
                  <div className="flex w-full flex-row items-center justify-center p-5">
                    <Spinner />
                    <p>Loading...</p>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <tr
                      className={classNames(
                        {
                          "bg-gray-50 transition-colors": row.getIsExpanded(),
                        },
                        "border-b-[1px] border-dashed border-emerald-100 text-[14px] transition-colors hover:bg-emerald-50"
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className="px-3 py-3"
                          style={{
                            width: cell.column.getSize(),
                          }}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>

                    {renderSubComponent ? (
                      <tr key={row.id + "-expanded"}>
                        <td colSpan={columns.length}>
                          {renderSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
    </div>
  );
};

export default Table;

const Pagination = <T extends object>({
  table,
}: PropsWithChildren<{
  table: ReactTable<T>;
}>) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-3 justify-center md:justify-between px-4 py-4">
      <div className="flex flex-row items-center gap-2 text-sm">
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
