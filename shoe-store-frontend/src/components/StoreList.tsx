import { List, ListItem } from "@chakra-ui/react";

export default function StoreList() {
  const mockData = [
    { name: "ALDO Centre Eaton" },
    { name: "ALDO Destiny USA Mall" },
    { name: "ALDO Pheasant Lane Mall" },
    // add more stores as needed
  ];

  return (
    <List spacing={3}>
      {mockData.map((store) => (
        <ListItem key={store.name}>{store.name}</ListItem>
      ))}
    </List>
  );
}
