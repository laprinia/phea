import React from "react";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import Viewport from "./Viewport";
import NavBar from "./comps/nav/NavBar";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <NavBar />
      <Viewport />
    </MantineProvider>
  );
}

export default App;
