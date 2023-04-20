import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Skeleton,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  getAmenities,
  getCategories,
  getRoom,
  IEditRoomVariables,
  uploadRoomDetail,
} from "./api";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UploadRoom() {
  const { roomPk } = useParams();
  const { data, isLoading } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { register, handleSubmit } = useForm<IEditRoomVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadRoomDetail, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "Room created",
        position: "bottom-right",
      });
      navigate(`/rooms/${data.id}`);
    },
  });
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  useHostOnlyPage();
  const onSubmit = (data: IEditRoomVariables) => {
    if (roomPk) {
      const roomData: IEditRoomVariables = { ...data, roomPk };
      mutation.mutate(roomData);
    }
  };

  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
                defaultValue={data?.name}
              />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
                defaultValue={data?.country}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
                defaultValue={data?.city}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
                defaultValue={data?.address}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  min={0}
                  defaultValue={data?.price}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  type="number"
                  min={0}
                  defaultValue={data?.rooms}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  type="number"
                  min={0}
                  defaultValue={data?.toilets}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description", { required: true })}
                defaultValue={data?.toilets}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                {...register("pet_friendly", { required: true })}
                defaultChecked={data?.pet_friendly}
              >
                Pet friendly?
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="Choose a kind"
                defaultValue={data?.kind}
              >
                <option value={"entire_place"}>Entire Place</option>
                <option value={"private_room"}>Private Room</option>
                <option value={"shared_room"}>Shared Room</option>
              </Select>
              <FormHelperText>
                What kind of room are you renting?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a category"
                defaultValue={data?.category.pk}
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                What category describes your room?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>Something went wrong</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size="lg"
              w={"100%"}
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
      <h1>Upload RoomDetail</h1>
    </ProtectedPage>
  );
}
