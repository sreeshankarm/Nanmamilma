

import api from "./axios";
import type { UserResponse } from "../types";

export const getUserApi = () =>
  api.get<UserResponse>("/user");

