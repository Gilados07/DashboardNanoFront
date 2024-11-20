import { Column } from "node_modules/ag-grid-community/dist/types/core/main";

const MIN_VALUE_THRESHOLD = -50

export const applyCellConditions = (
  data: Record<string, string>,
  column: Column
) => {
  if (
    data?.Downgrade &&
    (column.getColId() === "Downgrade" || column.getColId() === "Publisher")
  ) {
    const valueWithoutSign = data?.Downgrade.replace(/[$,%]/g, "");

    return +valueWithoutSign < MIN_VALUE_THRESHOLD
      ? { color: "#ef4444" }
      : { color: "inherit" };
  }

  return undefined;
};
