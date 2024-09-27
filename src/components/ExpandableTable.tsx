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
import { motion, AnimatePresence } from "framer-motion";
import { ExpandedRowContent } from "./ExpandedRowContent";
import { AlbumItem } from "../utils/mockData";

interface ExpandableTableProps {
  data: AlbumItem[];
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ data }) => {
  console.log("Table data:", data); // Add this line

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const bgColor = useColorModeValue("white", "gray.800");
  const headerColor = useColorModeValue("gray.100", "gray.700");
  const hoverColor = useColorModeValue("gray.50", "gray.700");
  const expandedBgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const columns = useMemo<ColumnDef<AlbumItem>[]>(
    () => [
      {
        id: "expander",
        header: () => null,
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
        header: "Album Name",
        accessorKey: "title",
        size: 200,
      },
      {
        header: "Artist",
        accessorKey: "artist",
        size: 150,
      },
      {
        header: "Release Year",
        accessorKey: "releaseDate",
        size: 100,
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
              <AnimatePresence initial={false}>
                {row.getIsExpanded() && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Td
                      colSpan={row.getVisibleCells().length}
                      p={0}
                      borderColor={borderColor}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Box p={4} bg={expandedBgColor} borderRadius="md">
                          <ExpandedRowContent rowData={row.original} />
                        </Box>
                      </motion.div>
                    </Td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpandableTable;
