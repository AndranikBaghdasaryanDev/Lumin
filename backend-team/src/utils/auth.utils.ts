import api from "../lib/api.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { CurrentUser } from "../types/api-responses/currentUser.ts";

export async function getUserId(token: string){
  const userResponse = await api.get<ApiResponse<CurrentUser>>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = userResponse.data.data;

  return user?.id;
}
