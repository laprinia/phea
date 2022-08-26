import React from "react";
import "./App.css";
import { MantineProvider, Space } from "@mantine/core";
import CardSection from "./comps/view/CardSection";
import NavBar from "./comps/navigation/NavBar";
import Layout from "./comps/layout/Layout";
import { CustomFonts } from "./fonts/CustomFonts";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        colors: {
          portlandOrange: [
            "#FEECE6",
            "#FCC8BA",
            "#FBA58E",
            "#F98262",
            "#F75F36",
            "#fb5b2a",
            "#C43008",
            "#932406",
            "#621804",
            "#310C02",
          ],
          champagnePink: [
            "#FCF1E8",
            "#F8D8BF",
            "#F3BE95",
            "#EFA56C",
            "#EA8C43",
            "#E67319",
            "#B85C14",
            "#8A450F",
            "#faefe6",
            "#faefe6",
          ],
          pistachio: [
            "#EFF7ED",
            "#D2EACD",
            "#B5DCAC",
            "#97CF8C",
            "#7AC16C",
            "#5DB34C",
            "#4A903C",
            "#386C2D",
            "#7AC16C",
            "#13240F",
          ],
        },
        fontFamily: "Modernist",
      }}
    >
      <CustomFonts />
      <NavBar />
      <Layout title={"marching cubes viz"}>
        <Space h="sm" />
        <CardSection />
      </Layout>
    </MantineProvider>
  );
}

export default App;
