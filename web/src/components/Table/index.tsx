import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'


export type TableProps = {
  columns: any;
  data:any[];
  handleRowClick?: Function | undefined
}
export const Table = ({ columns = {}, data = [], handleRowClick}:TableProps) => {
  const columnHelper = createColumnHelper<any>();
  const table = useReactTable({
    data,
    columns: Object.keys(columns).map((colId:string) => (
      columnHelper.accessor(colId, {
        cell: info => columns[colId]?.content ? columns[colId]?.content(info) : info.getValue(),
        header: columns[colId]?.header || colId  
      })
    )),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetAll: false
  })

  return (
    <>
      <table className="min-w-max table-auto w-full max-h-[400px]  overflow-hidden">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className={`bg-gray-200 text-gray-600 uppercase text-sm leading-normal` }>
                {headerGroup.headers.map(header => 
                   (
                  <th key={header.id} style={columns[header.id]?.width ? { width: columns[header.id]?.width} : {}} className={
                    `text-xs bg-gray-100 py-3 px-6 
                    ${columns[header.id]?.align ? `text-${columns[header.id]?.align}` : 'text-left'}`
                  }>
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
        <tbody className="text-gray-600 text-sm font-light">
          {table.getRowModel().rows.map(row => (
              <tr key={row.id} className={`border-b border-gray-200 hover:bg-gray-100 ${handleRowClick && 'cursor-pointer'}`} onClick={(e) => {
                
                handleRowClick && handleRowClick(row)
              }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-3 px-6 text-left whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <a href="javascript:;" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
          <a href="javascript:;" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Exibindo&nbsp;
              <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>&nbsp;
              de&nbsp;
              <span className="font-medium">{table.getPageCount()}</span>&nbsp;
              de&nbsp;
              <span className="font-medium">{table.getPrePaginationRowModel().rows.length}</span>&nbsp;
              registros
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="javascript:;" onClick={() =>table.getCanPreviousPage() && table.previousPage()}  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Anterior</span>
                {/* Heroicon name: solid/chevron-left */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
              {/* <a href="#" aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a> */}
              <a href="javascript:;" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" 
              onClick={() => table.getCanNextPage() && table.nextPage()}>
                <span className="sr-only"> Próximo</span>
                {/* Heroicon name: solid/chevron-right */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
  
}