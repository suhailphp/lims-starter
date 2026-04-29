import React, { useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { CommonDataTableProps } from "../../types/types";
import type { SortOrder } from "primereact/datatable";
import { DropdownMenu } from "../dropdown-menu/dropdownMenu";

const CommonDataTable: React.FC<CommonDataTableProps> = ({
  data,
  columns,
  title,
  rows: defaultRows = 10,
}) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sortField, _setSortField] = useState<string | null>(null);
  const [sortOrder, _setSortOrder] = useState<SortOrder>(1);

  // Pagination state
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(defaultRows);

  const totalRecords = data.length;
  const totalPages = rows === -1 ? 1 : Math.ceil(totalRecords / rows);
  const currentPage = rows === -1 ? 1 : Math.floor(first / rows) + 1;

  const onPageChange = (page: number) => {
    if (rows === -1) return;
    const newPage = Math.max(1, Math.min(page, totalPages));
    setFirst((newPage - 1) * rows);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setRows(value === -1 ? totalRecords : value);
    setFirst(0);
  };

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  }, [data, globalFilter]);

  const paginatedData =
    rows === -1
      ? filteredData
      : filteredData.slice(first, first + rows);

  const pageNumbers =
    rows === -1
      ? [1]
      : Array.from({ length: totalPages }, (_, i) => i + 1);

  const startEntry =
    filteredData.length === 0 ? 0 : first + 1;
  const endEntry =
    rows === -1 ? filteredData.length : Math.min(first + rows, filteredData.length);

  return (
    <div className="bg-white rounded-md border border-border-color custom-datatable">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between flex-wrap gap-2 custom-table-header">
        <h5 className="text-[17.5px]">{title}</h5>
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="dt-search">
            <input
              type="search"
              className="dt-input"
              id="dt-search-0"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              aria-controls="DataTables_Table_0"
            />
            <label htmlFor="dt-search-0"></label>
          </div>

          <DropdownMenu
            trigger={
              <>
                <i className="icon-arrow-up-narrow-wide"></i>Sort
              </>
            }
            triggerClassName="btn h-[35px] cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
            menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-10"
          >
            <div className="p-2 space-y-1">
              <a
                className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-none"
                href="#"
              >
                Newest
              </a>
              <a
                className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-none"
                href="#"
              >
                Oldest
              </a>
              <a
                className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-none"
                href="#"
              >
                Recently Created
              </a>
              <a
                className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-none"
                href="#"
              >
                Last Modified
              </a>
            </div>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <DataTable
          value={paginatedData}
          globalFilter={globalFilter}
          sortField={sortField || undefined}
          sortOrder={sortOrder}
          className="min-w-full divide-y divide-border-color"
          stripedRows
          responsiveLayout="scroll"
        >
          {columns.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              sortable={col.sortable || false}
              filter={col.filter || false}
              body={col.body}
              className="px-4 py-3 text-start text-dark"
            />
          ))}
        </DataTable>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-12 px-4 gap-2 py-3">
        {/* Rows per page */}
        <div className="sm:col-span-4 col-span-12">
          <div id="tablelength" className="flex justify-center sm:block">
            <div className="dt-length">
              <label htmlFor="dt-length-0">
                Show{" "}
                <select
                  aria-controls="DataTables_Table_0"
                  className="dt-input"
                  id="dt-length-0"
                  value={rows === totalRecords ? -1 : rows}
                  onChange={handleRowsChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={-1}>All</option>
                </select>{" "}
                Entries
              </label>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="sm:col-span-4 col-span-12 flex items-center justify-center">
          <div id="tablepage" className="flex justify-center sm:block">
            <div className="dt-paging">
              <nav aria-label="pagination">
                <button
                  className={`dt-paging-button first ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => onPageChange(1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button
                  className={`dt-paging-button previous ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="icon icon-chevron-left"></i>
                </button>

                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    className={`dt-paging-button ${currentPage === num ? "current" : ""}`}
                    onClick={() => onPageChange(num)}
                    aria-current={currentPage === num ? "page" : undefined}
                  >
                    {num}
                  </button>
                ))}

                <button
                  className={`dt-paging-button next ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="icon icon-chevron-right"></i>
                </button>
                <button
                  className={`dt-paging-button last ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => onPageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Info text */}
        <div className="sm:col-span-4 col-span-12 flex items-center sm:justify-end justify-center">
          <div id="tableinfo" className="flex justify-center sm:block">
            <div className="dt-info" aria-live="polite" role="status">
              {startEntry} - {endEntry} of {filteredData.length} Entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonDataTable;