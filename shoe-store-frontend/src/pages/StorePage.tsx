// StoreTable.tsx
import React, { useEffect, useState, useRef } from "react";
import { Channel } from "actioncable";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useToast,
  Button,
} from "@chakra-ui/react";
import { consumer } from "../actionCableSetup";

interface Store {
  id: string;
  shoe_models: any[];
  name: string;
}

export const StoreTable = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const navigate = useNavigate();
  const subscription = useRef<Channel | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:3000/stores")
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    subscription.current = consumer.subscriptions.create("InventoryChannel", {
      connected: () => {
        console.log("Connected to InventoryChannel");
      },
      disconnected: () => {
        console.log("Disconnected from InventoryChannel");
      },
      received: (data: any) => {
        toast({
          title: "Inventory Update",
          description: data.broadcastMessage,
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      },
      unsubscribed: () => {
        console.log("Unsubscribed from InventoryChannel");
      },
      perform: (action: any, data: any) => {
        console.log(`Performing ${action} with ${JSON.stringify(data)}`);
      },
    });

    return () => {
      if (subscription.current) {
        subscription.current.unsubscribe();
      }
    };
  }, [toast]);

  return (
    <Box width="100%" p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Store Name</Th>
            <Th>Inventory</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stores.map((store, index) => (
            <Tr key={index}>
              <Td>{store.name}</Td>
              <Td>
                <Button
                  colorScheme="yellow"
                  onClick={() =>
                    navigate(`/shoe/${store.id}`, { state: { store } })
                  }
                >
                  View Store Inventory
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
