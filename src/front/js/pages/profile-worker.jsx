import React, {useState, useEffect,useContext} from "react";
import {getUserPrivate} from "../services";
import {useNavigate} from "react-router-dom";
import UserWorker from "../component/UserWorker.jsx";
import Spinner from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Profile = (props) => {
  const navigate = useNavigate();
  const {store,actions} = useContext(Context );


  const [spinner, setSpinner] = useState(false);
  
  async function getProfile() {
    let token = localStorage.getItem("token");
    if (token) {
      setSpinner(true)
      const dataFromFetch = await getUserPrivate();
      actions.setUser(dataFromFetch);
      setSpinner(false)
      return dataFromFetch;
    }
    navigate("/login");
  }

  const handleEdit = async() =>{  
    navigate('/edit/profile-worker')
  }

  useEffect(() => {
    const fetchData = async () => {
      getProfile();
    };
    fetchData();
  }, []);

  return ( <>
    {spinner ? (<Spinner />): ( <React.Fragment>
    <UserWorker onClick = {handleEdit} user={store.user} showEditButton={true} />
  </React.Fragment>)}
  </>
  );
};
