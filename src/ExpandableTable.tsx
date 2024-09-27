import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  ExpandedState,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ExpandedRowContent from "./ExpandedRowContent";

interface DataItem {
  id: string; // Add this line
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
}

interface ExpandableTableProps {
  data: DataItem[];
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = useMemo<ColumnDef<DataItem>[]>(
    () => [
      {
        id: "expander",
        header: ({ table }) => (
          <IconButton
            aria-label="Expand all"
            icon={
              table.getIsAllRowsExpanded() ? (
                <ChevronDownIcon />
              ) : (
                <ChevronRightIcon />
              )
            }
            onClick={table.getToggleAllRowsExpandedHandler()}
            size="sm"
            variant="ghost"
          />
        ),
        cell: ({ row }) => (
          <IconButton
            aria-label="Expand row"
            icon={
              row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />
            }
            onClick={() => row.toggleExpanded()}
            size="sm"
            variant="ghost"
          />
        ),
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Box overflowX="auto">
      <Table variant="simple">
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
            <React.Fragment key={row.id}>
              <Tr>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
              {row.getIsExpanded() && (
                <Tr>
                  <Td colSpan={row.getVisibleCells().length}>
                    <ExpandedRowContent rowData={row.original} />
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpandableTable;
