import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { StoreTable } from "./pages/StorePage";
import { ShoePage } from "./pages/ShoePage";

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<StoreTable />} />
          <Route path="/shoe/:storeId" element={<ShoePage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
