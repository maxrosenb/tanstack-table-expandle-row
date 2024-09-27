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
import { createRandomAlbums, AlbumItem } from "./utils/mockData";
import { format } from "date-fns";

import "focus-visible";

// Define a custom theme with dark mode as default and button styles
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
      // Add this CSS rule to remove focus styles after mouse clicks
      ".js-focus-visible :focus:not([data-focus-visible-added])": {
        outline: "none",
        boxShadow: "none",
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
  const [data, setData] = useState<AlbumItem[]>([]);

  useEffect(() => {
    setData(
      createRandomAlbums(10).map((album) => ({
        ...album,
        releaseDate: format(new Date(album.releaseDate), "MMMM d yyyy"),
      }))
    );
  }, []);

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
                Classic Rock Albums (60s-70s)
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
