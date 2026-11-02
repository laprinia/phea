import React from "react";
import {
    Image,
    Text,
    Badge,
    Group,
    Button,
    Divider,
} from "@mantine/core";

function NavBar() {
    return (
        <Group
            position="apart"
            noWrap
            sx={{background: "#171825", padding: "9px 20px"}}
        >
            <Group spacing="xs" noWrap>
                <Image
                    src="https://i.postimg.cc/P5Yz47gr/lotus-alt.png"
                    width={30}
                    height={30}
                    fit="contain"
                    withPlaceholder
                />
                <Text size="xl" weight={900} color="blueGray">
                    phea
                </Text>
                <Divider
                    sx={{height: "24px", alignSelf: "center"}}
                    orientation="vertical"
                />
            </Group>
            <Group noWrap>
                <Divider
                    sx={{height: "24px", alignSelf: "center"}}
                    orientation="vertical"
                />
                <Button variant="outline" radius="xs" color="blueGray" uppercase>
                    Demo
                </Button>
                <Button variant="outline" radius="xs" color="blueGray" uppercase>
                    About
                </Button>
                <Badge color="blueGray" size="lg">
                    Dev
                </Badge>
            </Group>
        </Group>
    );
}

export default NavBar;
