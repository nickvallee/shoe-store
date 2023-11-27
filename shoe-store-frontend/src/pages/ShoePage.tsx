import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";

interface ShoeModel {
  name: string;
  inventory: number;
}

export const ShoePage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [shoeModels, setShoeModels] = useState<ShoeModel[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/stores/${storeId}`)
      .then((response) => response.json())
      .then((data) => {
        setShoeModels(data.shoe_models);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [storeId]);

  return (
    <Box width="100%" p={4}>
      <Button mb={4} onClick={() => navigate("/")}>
        Back
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Shoe Model</Th>
            <Th>Inventory</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shoeModels.map((shoeModel, index) => (
            <Tr key={index}>
              <Td>{shoeModel.name}</Td>
              <Td>{shoeModel.inventory}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
