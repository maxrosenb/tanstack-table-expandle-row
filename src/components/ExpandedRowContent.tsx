import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

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
  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th>Email</Th>
          <Th>Address</Th>
          <Th>Employment Status</Th>
          <Th>Eye Color</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{rowData.email}</Td>
          <Td>{rowData.address}</Td>
          <Td>{rowData.employmentStatus}</Td>
          <Td>{rowData.eyeColor}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default ExpandedRowContent;
