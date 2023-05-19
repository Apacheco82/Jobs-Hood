import {URL} from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

// este parametro user(linea 12) es el parametro que pasamos en en form-register-user.jsx como registro del useState
// body: el cuerpo de la peticion que vamos a enviar, los datos como parametros

export const registerUser = async (user) => {
  try {
    const response = await fetch(`${URL}/user/worker`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
   /* if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al registrar el usuario: ${errorData.message}`);
    }*/
    return await response.json();
  } catch (error) {
    console.log("Error al registrar el usuario", error);
    throw error;
  }
};


export const loginUser = async (user) => {
  try {
    const response = await fetch(`${URL}/user/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    const data = await response.json();
    localStorage.setItem("token", data.token); // localStorage es para guardar el dato de token lo encontramos en la consola en aplication -localstorage
    return true;
  } catch (error) {
    console.log("Error al iniciar sesión!", error);
    return false;
  }
};

export const getUserPrivate = async () => {
  try {
    const token = localStorage.getItem("token"); // obtengo del localStorage mi item que lo hemos llamado como token -- linea 35
    const response = await fetch(`${URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // para poder acceder a partes privadas tengo que pasar en headers este formato el token es una interpolacion ya que ira cambiando segun el user
        ...HEADERS, // + tmb los headers generales se añaden
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Acceso denegado!", error);
  }
};

export const userById = async (uid) => {
  try {
    const response = await fetch(`${URL}/user/${uid}`.trim(), {
      method: "GET",
      headers: HEADERS,
      redirect: "follow",
    });
    return await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export const uploadAvatar = async (body) => {
  try {
    const token = localStorage.getItem("token");
    
    const res = await fetch(`${URL}/user/update_avatar`, {
      method: "PUT",
      body: body,
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    const data = await res.json();
    return data
  } catch (err) {
    console.log("Error Update User", err);
  }
};

export const editUser = async (user) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${URL}/user/edit`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${token}`, // para poder acceder a partes privadas tengo que pasar en headers este formato el token es una interpolacion ya que ira cambiando segun el user
        ...HEADERS, // + tmb los headers generales se añaden
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error al editar usuario!", error);
  }
};

export const checkUser = async (registro, mode) => {
  try {
    const response = await fetch(`${URL}/user/check/${mode}`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(registro)
    });
    return await response.json();
  } catch (error) {
    console.log("Error check", error);
    return error;
  }
};
