import React, {useState, useEffect,useContext} from "react";
import {getUserPrivate, userById} from "../services";
import {useNavigate, useParams} from "react-router-dom";
import UserWorker from "../component/UserWorker.jsx";
import Spinner from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";
import Review from "../component/review.jsx";

export const Profile = () => {
  const navigate = useNavigate();
  const  params = useParams();
  const {store,actions} = useContext(Context );
  

  const [spinner, setSpinner] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
 

  // let token = localStorage.getItem("token"); 

  const getInfoUser = async () => {
    if (params.id) {
      //perfil publico
      const info = await userById(params.id); //llamamos a la función que obtiene un USER filtrando por su ID
      return info.data;
    } //perfil privado
    const workerData = await getUserPrivate();
    return workerData;
  };

  const handleEdit = async() =>{  
    navigate('/edit/profile-worker')
  }

  const fetchData = async () => {

    setSpinner(true);
    const infoWorker = await getInfoUser();
    actions.setUser(infoWorker)
    setUserReviews(infoWorker.written_reviews)
    setSpinner(false)
  }

  useEffect(() => { 
    
    fetchData();
  }, []);

  
  return ( <>
    {spinner  ? (<Spinner />) : ( <React.Fragment>
    <UserWorker   onClick = {handleEdit}  user={store.user} userPrivate= {!params.id} showEditButton={!params.id} />
    <div className="container">
      <h4> Opiniones del usuario :</h4>
    {userReviews.map((review, index) => (
                    <Review
                      key={index}
                      text={review.text}
                      user_name={review.user_name}
                      rating={review.rating}
                      data={review.data_create}
                    />
                  ))}
    </div>
    
  </React.Fragment>)}
 
  </>
  );
};

