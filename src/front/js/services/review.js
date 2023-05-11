import {URL} from ".";

export const createReview = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const info = await fetch(`${URL}/review`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        redirect: "follow",
      },
    });
    return await info.json();

  } catch (error) {
    console.log("Error creando la review:", error);
  }
};
