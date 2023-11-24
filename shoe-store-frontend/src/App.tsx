import React from "react";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

// Define your data type
interface Store {
  productCode: string;
  product: string;
  specialInstructions: string;
  status: "Completed" | "In Progress" | "Advance Notification";
  date: string;
  quantity: string;
  name: string; // Assuming this is the store name
}

// Dummy data
const stores: Store[] = [
  {
    productCode: "1234",
    product: "Running Shoes",
    specialInstructions: "Deliver before 12pm",
    status: "Completed",
    date: "2022-01-01",
    quantity: "10",
    name: "ALDO Centre Eaton",
  },
  {
    productCode: "5678",
    product: "Hiking Boots",
    specialInstructions: "Deliver after 3pm",
    status: "In Progress",
    date: "2022-01-02",
    quantity: "5",
    name: "ALDO Destiny USA Mall",
  },
  {
    productCode: "9012",
    product: "Casual Sneakers",
    specialInstructions: "Deliver anytime",
    status: "Advance Notification",
    date: "2022-01-03",
    quantity: "20",
    name: "ALDO Pheasant Lane Mall",
  },
];

export const App = () => {
  return (
    <ChakraProvider>
      <Box width="100%" p={4}>
        <Button mb={4}>New Order</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product Code</Th>
              <Th>Product</Th>
              <Th isNumeric>Quantity</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Store Name</Th>
              {/* Add more headers if needed */}
            </Tr>
          </Thead>
          <Tbody>
            {stores.map((store, index) => (
              <Tr key={index}>
                <Td>{store.productCode}</Td>
                <Td>{store.product}</Td>
                <Td isNumeric>{store.quantity}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      store.status === "Completed" ? "green" : "orange"
                    }
                  >
                    {store.status}
                  </Badge>
                </Td>
                <Td>{store.date}</Td>
                <Td>{store.name}</Td>
                {/* Add more data cells if needed */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default App;
