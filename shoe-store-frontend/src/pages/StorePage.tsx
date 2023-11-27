// StoreTable.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";

interface Store {
  id: string;
  shoe_models: any[];
  name: string;
}

export const StoreTable = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/stores")
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <Box width="100%" p={4}>
      <Button mb={4}>New Order</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Store Name</Th>
            <Th>Number of Shoe Models</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stores.map((store, index) => (
            <Tr key={index} onClick={() => navigate(`/shoe/${store.id}`)}>
              <Td>{store.name}</Td>
              <Td>{store.shoe_models.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
