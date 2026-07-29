const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async post(endpoint: string, data: unknown) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
};
