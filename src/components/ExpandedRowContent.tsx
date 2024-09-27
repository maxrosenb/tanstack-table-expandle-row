import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

interface ExpandedRowContentProps {
  rowData: {
    email: string;
    phone: string;
    address: string;
  };
}

const ExpandedRowContent: React.FC<ExpandedRowContentProps> = ({ rowData }) => {
  const columns = useMemo<ColumnDef<typeof rowData>[]>(
    () => [
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone",
        accessorKey: "phone",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
    ],
    []
  );

  const data = useMemo(() => [rowData], [rowData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box p={4} bg="gray.50">
      <Table size="sm" variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpandedRowContent;
