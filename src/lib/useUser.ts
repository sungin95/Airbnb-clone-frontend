import { useQuery } from "@tanstack/react-query";
import { getMe } from "../routes/api";

export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getMe, {
    retry: false,
  });
  console.log(isError);
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
