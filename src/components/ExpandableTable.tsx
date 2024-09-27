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
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ExpandedRowContent from "./ExpandedRowContent";

interface DataItem {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  employmentStatus: string;
  eyeColor: string;
}

interface ExpandableTableProps {
  data: DataItem[];
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const bgColor = useColorModeValue("white", "gray.800");
  const headerColor = useColorModeValue("gray.100", "gray.700");
  const hoverColor = useColorModeValue("gray.50", "gray.700");
  const expandedBgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
            color={textColor}
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
            color={textColor}
          />
        ),
        size: 50,
      },
      {
        header: "Name",
        accessorKey: "name",
        size: 200,
      },
      {
        header: "Age",
        accessorKey: "age",
        size: 100,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        size: 150,
      },
    ],
    [textColor]
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
    <Box
      overflowX="auto"
      width="100%"
      borderRadius="xl"
      boxShadow="2xl"
      bg={bgColor}
    >
      <Table style={{ width: "100%", tableLayout: "fixed" }} color={textColor}>
        <Thead bg={headerColor}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  width={header.column.getSize()}
                  py={4}
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={textColor}
                  borderColor={borderColor}
                >
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
              <Tr
                _hover={{ bg: hoverColor }}
                transition="background-color 0.2s"
              >
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    width={cell.column.getSize()}
                    py={3}
                    borderColor={borderColor}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
              {row.getIsExpanded() && (
                <Tr>
                  <Td
                    colSpan={row.getVisibleCells().length}
                    p={0}
                    borderColor={borderColor}
                  >
                    <Box p={4} bg={expandedBgColor} borderRadius="md">
                      <ExpandedRowContent rowData={row.original} />
                    </Box>
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
