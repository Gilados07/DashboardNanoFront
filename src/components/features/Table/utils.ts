import { Column } from "node_modules/ag-grid-community/dist/types/core/main";

export const applyCellConditions = (
  data: Record<string, string>,
  column: Column
) => {
  if (
    data?.Downgrade &&
    (column.getColId() === "Downgrade" || column.getColId() === "Publisher")
  ) {
    const valueWithoutSign = data?.Downgrade.replace(/[$,%]/g, "");

    return +valueWithoutSign < -50
      ? { color: "#ef4444" }
      : { color: "inherit" };
  }

  return undefined;
};
