import {Stack} from "@mantine/core";
import {PropsWithChildren} from "react";

interface Props {
    title: string;
}

const Layout: React.FC<PropsWithChildren<Props>> = ({title, children}) => {
    return <Stack align="center">{children}</Stack>;
};
export default Layout;
