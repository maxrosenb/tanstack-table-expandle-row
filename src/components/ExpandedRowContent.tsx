import React from "react";
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

interface ExpandedRowContentProps {
  rowData: {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    address: string;
    employmentStatus: string;
    eyeColor: string;
  };
}

const ExpandedRowContent: React.FC<ExpandedRowContentProps> = ({ rowData }) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const labelColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      borderWidth={1}
      borderColor={borderColor}
      bg={bgColor}
    >
      <Flex flexWrap="wrap" p={4}>
        <Box flexBasis="50%" p={2}>
          <Text fontWeight="bold" color={labelColor}>
            Email
          </Text>
          <Text color={textColor}>{rowData.email}</Text>
        </Box>
        <Box flexBasis="50%" p={2}>
          <Text fontWeight="bold" color={labelColor}>
            Address
          </Text>
          <Text color={textColor}>{rowData.address}</Text>
        </Box>
        <Box flexBasis="50%" p={2}>
          <Text fontWeight="bold" color={labelColor}>
            Employment Status
          </Text>
          <Text color={textColor}>{rowData.employmentStatus}</Text>
        </Box>
        <Box flexBasis="50%" p={2}>
          <Text fontWeight="bold" color={labelColor}>
            Eye Color
          </Text>
          <Text color={textColor}>{rowData.eyeColor}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpandedRowContent;
