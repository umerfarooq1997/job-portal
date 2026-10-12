const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async post(endpoint: string, data: unknown) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },

  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  },
};
