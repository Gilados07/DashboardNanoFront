import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef } from "node_modules/ag-grid-community/dist/types/core/main";

interface TableProps {
  data: Record<string, string>[];
  pinnedCols?: number[];
}

export function Table({ data, pinnedCols }: TableProps) {
  const columns: ColDef[] = Object.keys(data[0]).map((key, index) => ({ field: key, pinned: pinnedCols?.includes(index) }));
  
  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: "auto" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact domLayout="autoHeight" rowData={data} columnDefs={columns} />
    </div>
  );
}
