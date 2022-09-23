import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuHeader from "../components/auth/MenuHeader";

const Home = () => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    displayUsers();
  
  }, []); // Sans les crochets ça tourne en boucle

  
  const displayUsers = async () => {
    await axios.get("http://localhost:8000/api/current-user",{
      "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
      }).then((res) => {
      setUser(res.data);
      // console.log(res.data);
    });

  };

  return (
    <div>
      <MenuHeader />
      <h1>Page d'accueil dddddd</h1>
      <p>je m'apelle {user.firstName}</p>
    </div>
  );
};

export default Home;
