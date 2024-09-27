import React from "react";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import ExpandableTable from "./ExpandableTable";

interface DataItem {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
}

const App: React.FC = () => {
  const data: DataItem[] = React.useMemo(
    () => [
      {
        id: "1",
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St, City, Country",
      },
      {
        id: "2",
        name: "Jane Smith",
        age: 25,
        email: "jane@example.com",
        phone: "098-765-4321",
        address: "456 Elm St, Town, Country",
      },
    ],
    []
  );

  return (
    <ChakraProvider>
      <Box p={8}>
        <Heading as="h1" mb={4}>
          Expandable Table Example
        </Heading>
        <ExpandableTable data={data} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
