import React from "react";
import {
  ChakraProvider,
  Flex,
  Heading,
  Box,
  extendTheme,
  useColorMode,
  Button,
  VStack,
  ThemeComponentProps,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
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

// Define a custom theme with dark mode as default
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: ThemeComponentProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
      },
    }),
  },
});

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} size="sm" variant="outline">
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

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
    <ChakraProvider theme={theme}>
      <Box minHeight="100vh">
        <Flex
          direction="column"
          align="center"
          justify="center"
          minHeight="100vh"
          p={8}
        >
          <VStack spacing={4} mb={8} width="100%">
            <Flex justify="space-between" width="100%" align="center">
              <Heading as="h1" size="xl">
                Expandable Table Example
              </Heading>
              <ColorModeToggle />
            </Flex>
          </VStack>
          <ExpandableTable data={data} />
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default App;
