import React, {useState, useEffect} from "react";
import {getUserPrivate} from "../services";
import {useNavigate} from "react-router-dom";
import UserWorker from "../component/UserWorker.jsx";
import Spinner from "../component/Spinner.jsx";

export const Profile = (props) => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const [data, setData] = useState({});

  async function getProfile() {
    let token = localStorage.getItem("token");
    if (token) {
      setSpinner(true)
      const dataFromFetch = await getUserPrivate();
      setData(dataFromFetch);
      setSpinner(false)
      return dataFromFetch;
    }
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      getProfile();
    };
    fetchData();
  }, []);

  return ( <>
    {spinner ? (<Spinner />): ( <React.Fragment>
    <UserWorker user={data} showEditButton={true} />
  </React.Fragment>)}
  </>
  );
};
