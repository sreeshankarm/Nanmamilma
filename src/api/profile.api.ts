

import api from "./axios";
import type { UserProfile } from "../types";

export const getMyProfileApi = () =>
  api.post<UserProfile>("/myprofile");

