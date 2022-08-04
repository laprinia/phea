import React from "react";
import "./App.css";
import { MantineProvider, Space } from "@mantine/core";
import CardSection from "./comps/view/CardSection";
import NavBar from "./comps/navigation/NavBar";
import Layout from "./comps/layout/Layout";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <NavBar />
      <Layout title={"marching cubes viz"}>
        <Space h="sm" />
        <CardSection />
      </Layout>
    </MantineProvider>
  );
}

export default App;
