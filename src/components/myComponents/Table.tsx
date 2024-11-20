import {
  Table as BaseTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import example from "@/./components/example.json";

interface TableProps {
  data: Record<string, string>[];
}

export function Table({ data }: TableProps) {
  return (
    <BaseTable>
      <TableHeader>
        <TableRow>
          {Object.keys(data[0]).map((key) => (
            <TableHead >{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {Object.values(row).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </BaseTable>
  );
}
