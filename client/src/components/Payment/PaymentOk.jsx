import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function PaymentOk() {
  /*  const [loading, setLoading] = useState(false); */
  const publicationInfo = useSelector((state) => state.publicationP);
  const busqueda = useLocation().search;
  const asignPremium = async (publicationInfo) => {
    const respuesta = {
      status: new URLSearchParams(busqueda).get("status"),
      collection_status: new URLSearchParams(busqueda).get("collection_status"),
      payment_id: new URLSearchParams(busqueda).get("payment_id"),
    };
    if (respuesta && respuesta.status === "approved") {
      await axios.put("/publication/makePremium/" + publicationInfo,
        {
          /* description: publicationInfo.description,
          status: publicationInfo.status,
          premium: true */
      });
  }
};
useEffect(async () => {
  /* setLoading(true); */
  /* if (isAuthenticated()) {
    const userInfo = await getUserInfo();
 
    createSuscription(userInfo);
  } */
  asignPremium(publicationInfo);
}, []);

return (
  <div>
    <h1>Felicidades, destacaste tu publicacion</h1>
  </div>
);
}