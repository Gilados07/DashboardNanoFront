import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef } from "node_modules/ag-grid-community/dist/types/core/main";
import { applyCellConditions } from "./utils";
import { NoDataMessage } from "../NoDataMessage";

interface TableProps {
  data: Record<string, string>[];
  pinnedCols?: number[];
}

export function Table({ data, pinnedCols }: TableProps) {
  const { columns } = useTable({ data, pinnedCols });

  if (!columns.length) {
    return <NoDataMessage />;
  }

  return (
    <div className="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        enableCellTextSelection
        // domLayout="autoHeight"
        rowData={data}
        columnDefs={columns}
      />
    </div>
  );
}

const useTable = ({ data, pinnedCols }: TableProps) => {
  if (!data.length) {
    return { columns: [] };
  }

  const columns: ColDef[] = Object.keys(data[0]).map((key, index) => ({
    field: key,
    pinned: pinnedCols?.includes(index),
    filter: true,
    flex: 1,
    resizable: false,
    minWidth: 200,
    maxWidth: 400,
    cellStyle: ({ data, column }) => {
      return applyCellConditions(data, column);
    },
    comparator: (element1, element2) => {
      if (!isNaN(+element1) && !isNaN(+element2)) {
        return +element1 - +element2;
      } else if (element1.includes("$")) {
        element1 = +element1.substring(0, element1.length - 1);
        element2 = +element2.substring(0, element2.length - 1);

        return element1 - element2;
      } else if (element1.includes("%")) {
        element1 = +element1.substring(0, element1.length - 1);
        element2 = +element2.substring(0, element2.length - 1);

        return element1 - element2;
      }

      return element1.localeCompare(element2);
    },
  }));

  return { columns };
};
