import API from "../types/api";

export interface VozRequest {
  texto: string;
}

class VozService {
  async agendar(texto: string) {
    const request: VozRequest = {
      texto,
    };

    const response = await API.post("ai/chat", request);

    return response.data;
  }
}

export default new VozService();
