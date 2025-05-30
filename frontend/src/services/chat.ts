import { api } from "./api";

import { type AxiosResponse } from "axios";
import type { ChatRequest, ChatResponse } from "../types";

export const chatApi = {
  sendMessage: (request: ChatRequest): Promise<AxiosResponse<ChatResponse>> =>
    api.post("/chat", {
      message: request.message,
      patient_context: request.patient_context,
      timestamp: new Date().toISOString(),
    }),
};
