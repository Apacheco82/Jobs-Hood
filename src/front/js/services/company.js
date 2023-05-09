import {URL} from ".";

export const companyRegister = async (data) => {

  try {
    const response = await fetch(`${URL}/company`, {
      
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"},
      redirect: "follow",
    });
    //console.log(data)
    //console.log("status",response.status)
  } catch (error) {
    console.log("Error en post:", error);
  }
};

export const GetAllCompanies = async () => {
  try {
    const response = await fetch(`${URL}/company`, {
      method: "GET",
      redirect: "follow",
    });
    return await response.json();
  } catch (error) {
    console.log("Error en get:", error);
  }
};

export const getReviewPerCompany = async (id) => {
  try {
    const response = await fetch(`${URL}/review/company/${id}`, {
      method: "GET",
      redirect: "follow",
    });
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
};
