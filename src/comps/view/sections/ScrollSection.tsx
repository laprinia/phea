import {Divider, Group, Space, Stack, Text} from "@mantine/core";
import React, {PropsWithChildren} from "react";

interface Props {
    title: string;
    spaceBetween: number;
}

const ScrollSection: React.FC<PropsWithChildren<Props>> = ({
                                                               title,
                                                               spaceBetween,
                                                               children,
                                                           }) => {
    return <Stack spacing={spaceBetween}><Text size={"sm"}>{title}</Text><Stack spacing="xl">{children}</Stack></Stack>;
};
export default ScrollSection;
