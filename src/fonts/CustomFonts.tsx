import { Global } from "@mantine/core";
import regular from "./Modernist.woff2";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Modernist",
            src: `url('${regular}') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
