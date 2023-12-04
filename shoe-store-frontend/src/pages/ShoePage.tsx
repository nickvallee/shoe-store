import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";
import { consumer } from "../actionCableSetup";

interface ShoeModel {
  name: string;
  inventory: number;
}

export const ShoePage = () => {
  const locationState = useLocation();
  const { state } = locationState;
  const store = state?.store;
  const navigate = useNavigate();
  const [shoeModels, setShoeModels] = useState<ShoeModel[]>([]);
  const subscription = useRef<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/stores/${store.id}`)
      .then((response) => response.json())
      .then((data) => {
        setShoeModels(data.shoe_models);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // @ts-ignore
    subscription.current = consumer.subscriptions.create("InventoryChannel", {
      received: (data: any) => {
        console.log("data", data);

        if (data.store === store.name) {
          console.log(" update state HAPPENS");

          setShoeModels((currentShoeModels) => {
            return currentShoeModels.map((shoeModel) => {
              if (shoeModel.name === data.model) {
                return { ...shoeModel, inventory: data.inventory };
              }
              return shoeModel;
            });
          });
        }
      },
    });

    return () => {
      if (subscription.current) {
        subscription.current.unsubscribe();
      }
    };
  }, [store]);

  const addInventory = (shoeModelName: string) => {
    if (subscription.current) {
      console.log("sent!!");
      subscription.current.perform("add_inventory", {
        store: store.name,
        model: shoeModelName,
      });
    }
  };

  const decreaseInventory = (shoeModelName: string) => {
    if (subscription.current) {
      console.log("sent!!");
      subscription.current.perform("decrease_inventory", {
        store: store.name,
        model: shoeModelName,
      });
    }
  };

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
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {shoeModels.map((shoeModel, index) => (
            <Tr key={index}>
              <Td>{shoeModel.name}</Td>
              <Td>{shoeModel.inventory}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  onClick={() => addInventory(shoeModel.name)}
                >
                  Add Inventory
                </Button>
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => decreaseInventory(shoeModel.name)}
                >
                  Trigger Sale
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
