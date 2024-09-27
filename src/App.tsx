import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/data?count=5")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(data);
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
