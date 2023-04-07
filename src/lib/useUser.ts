import { useQuery } from "@tanstack/react-query";
import { getMe } from "../routes/api";
import { IUser } from "../types";

export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getMe, {
    retry: false,
  });
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
