import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { createPhoto, getUploadURL, uploadImage } from "./api";

interface IForm {
  file: FileList;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "I love react",
          file: `https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: any) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  useHostOnlyPage();
  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              {/* accept를 해서 이미지 파일만 받도록 설정 */}
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button
              isLoading={
                createPhotoMutation.isLoading ||
                uploadImageMutation.isLoading ||
                uploadURLMutation.isLoading
              }
              type="submit"
              w="full"
              colorScheme={"red"}
            >
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
