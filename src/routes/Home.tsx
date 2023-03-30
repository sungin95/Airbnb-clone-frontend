import { FaStar, FaRegHeart } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      // base는 스마트폰 사용자를 위해 만들어짐
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1].map((index) => (
        <Room key={index} />
      ))}
    </Grid>
  );
}
