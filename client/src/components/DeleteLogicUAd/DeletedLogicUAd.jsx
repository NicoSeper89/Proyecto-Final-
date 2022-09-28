 import React from "react";
 import Cards from "../Cards/Cards";
 import Footer from "../Footer/Footer.jsx";
 import Header from "../Header/Header.jsx";
 
 import { useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import {
     getAll,
     getPublications,
     getPubliNoAvail,
   getInfoUser,
 } from "../../redux/actions/index.js";
 import { Box, Select } from "@chakra-ui/react";

 const DeletedLogicUAd = () => {
   
 
 
 // import style from "./Home.module.css";
 

     const dispatch = useDispatch();

    const infoPublications = useSelector((state)=>state.houses)
    const filters= useSelector((state)=>state.filters)
    const sorting =useSelector((state)=> state.sorting) 
    const infoUser = useSelector((state) => state.infoUser);
   // const services = useSelector((state) => state.services);
   // const typeOfProperties = useSelector((state) => state.typeOfProperties);
    useEffect(() => {
        
      const dataUser = window.localStorage.getItem("User");
      dataUser && dispatch(getInfoUser(JSON.parse(dataUser)));
      dispatch(getAll());
      console.log(JSON.parse(dataUser)); //si tengo un usuario iniciado me lo setea en el global
      // if (dataUser) {
      //   dispatch(getFavsUser(infoUser[0].id));
      // }
    }, [dispatch]);
  
//     useEffect(() => {
//       dispatch(getPublications(filters, sorting, ""));
//       dispatch(getPublicationsPremium());
//     }, [dispatch, filters, sorting, cities]);
   const handleChange = (e)=> {
     if(e.target.value==="Available") dispatch(getPublications(filters,sorting,""))
     if(e.target.value==="NoAvailable") dispatch(getPubliNoAvail())
     if(e.target.value === "All") dispatch(getAll())  

   }
  
    return (
      <Box backgroundColor={"#EDEDED"}>
          <Select placeholder='Select option' onChange={(e)=> handleChange(e)}>
            <option value='All'>All</option>
            <option value='NoAvailable'>Not Available</option>
            <option value='Available'>Available</option>

        </Select>
        <Box zIndex={"100px"}>
          
          
          
          <Cards />
          
        </Box>
        {/* <Maps/> ok */}
      </Box>
    );
  };
  
   export default DeletedLogicUAd;
