import {URL} from ".";


const HEADERS = {
  "Content-Type": "application/json",
};


export const companyRegister = async (user) => {
  try {
    const response = await fetch(`${URL}/company`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    return await response.json()
  } catch (error) {
    console.log("Error al registrar la empresa", error);
    throw error
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
