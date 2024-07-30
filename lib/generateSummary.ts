import { baseUrl } from ".";

type Data = {
  message: string;
  body: string;
};
export async function generateSummary(data: Data) {
  try {
    const response = await fetch(`${baseUrl}/gemini`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const summary = await response.json();
    return summary;
  } catch (error) {
    console.error(error);
    return null;
  }
}



