import { FaStar } from "react-icons/fa";
import {
  Box,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={4}
      rowGap={8}
      templateColumns={"repeat(5, 1fr)"}
    >
      <VStack alignItems={"flex-start"}>
        <Box overflow={"hidden"} mb={"3"} rounded={"3xl"}>
          <Image
            h="280"
            src="https://a0.muscache.com/im/pictures/5b6242a9-8832-432b-ac79-38de2a3d0b0d.jpg?im_w=720"
          />
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as={"b"} noOfLines={1} fontSize={"md"}>
              Niseko, Abuta District, 일본
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color="gray.600">
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize={"sm"} color="gray.600">
          <Text as={"b"}>$72</Text>/ night
        </Text>
      </VStack>
    </Grid>
  );
}
