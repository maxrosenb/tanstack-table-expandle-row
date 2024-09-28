import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";
import { AlbumItem, Song } from "../utils/mockData";

interface ExpandedRowContentProps {
  rowData: Partial<AlbumItem>;
}

export const ExpandedRowContent: React.FC<ExpandedRowContentProps> = ({
  rowData,
}) => {
  const { songs = [], ...albumInfo } = rowData;
  const entries = Object.entries(albumInfo);

  return (
    <VStack align="stretch" spacing={4}>
      <Box overflowX="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              {entries.map(([key]) => (
                <Th key={key}>{key}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {entries.map(([key, value]) => (
                <Td key={key}>{value?.toString() || "N/A"}</Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          Songs:
        </Text>
        {Array.isArray(songs) && songs.length > 0 ? (
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Duration</Th>
              </Tr>
            </Thead>
            <Tbody>
              {songs.map((song: Song) => (
                <Tr key={song.id}>
                  <Td>{song.title}</Td>
                  <Td>{song.duration}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No songs available for this album.</Text>
        )}
      </Box>
    </VStack>
  );
};

export default ExpandedRowContent;
