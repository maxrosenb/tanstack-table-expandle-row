import React from "react";
import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import ExpandableTable from "./components/ExpandableTable";

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
        employmentStatus: "Employed",
        eyeColor: "Brown",
      },
      {
        id: "2",
        name: "Jane Smith",
        age: 25,
        email: "jane@example.com",
        phone: "098-765-4321",
        address: "456 Elm St, Town, Country",
        employmentStatus: "Self-employed",
        eyeColor: "Blue",
      },
      {
        id: "3",
        name: "Alice Johnson",
        age: 35,
        email: "alice@example.com",
        phone: "555-123-4567",
        address: "789 Oak St, Village, Country",
        employmentStatus: "Unemployed",
        eyeColor: "Green",
      },
    ],
    []
  );

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        p={8}
      >
        <Heading as="h1" mb={4} textAlign="center">
          Expandable Table Example
        </Heading>
        <ExpandableTable data={data} />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
