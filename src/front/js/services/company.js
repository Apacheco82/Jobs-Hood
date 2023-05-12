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

export const editCompany = async (company) => {

  try{ 
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL}/company/edit`,
      {method:"PUT",
      body: JSON.stringify(company),
      headers:{
        Authorization: `Bearer ${token}`, // para poder acceder a partes privadas tengo que pasar en headers este formato el token es una interpolacion ya que ira cambiando segun el user
        ...HEADERS, // + tmb los headers generales se añaden
      },
      redirect:"follow" })
      const data = await response.json()
      return data

  } catch(error){ console.log("Error al editar usuario!",error)}
}
