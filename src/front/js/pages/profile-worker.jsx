import React, {useState, useEffect,useContext} from "react";
import {getUserPrivate, userById} from "../services";
import {useNavigate, useParams} from "react-router-dom";
import UserWorker from "../component/UserWorker.jsx";
import Spinner from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {store,actions} = useContext(Context );
  

  const [spinner, setSpinner] = useState(false);
 


  async function getProfile() {
    let token = localStorage.getItem("token");  // alcance de la funcion. duda
    if (token) {
      setSpinner(true)
      const dataFromFetch = await getUserPrivate();
      console.log("DATA PRIVADA CON TOKEN",dataFromFetch)
      actions.setUser(dataFromFetch);
      console.log("EL STORE USER",store.user)
      setSpinner(false)
      return dataFromFetch;
    }
    navigate("/login");
  }

  const handleEdit = async() =>{  
    navigate('/edit/profile-worker')
  }

  useEffect(() => { // notas: consultar mañana ya que no carga la info 
    const fetchData = async () => {
      const workerId = id;
      if(!workerId){
        await getProfile();
      }else{
        setSpinner(true);
        const workerInfo = await userById(workerId);
        console.log("EL WORKER INFOOO",workerInfo)
        actions.setUser(workerInfo.data);
        setSpinner(false)
        return workerInfo
      }
      
    fetchData();
  }}, [id]);

  
  return ( <>
    {spinner  ? (<Spinner />) : ( <React.Fragment>
    <UserWorker   onClick = {handleEdit}  user={store.user} userPrivate= {!id} showEditButton={!id} />
  </React.Fragment>)}
 
  </>
  );
};

