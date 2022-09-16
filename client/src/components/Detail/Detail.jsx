import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getPublicationsDetail, clean} from "../../redux/actions"
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faToilet } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faPaw, faHouse,faGarage } from "@fortawesome/free-solid-svg-icons";
import style from "./Detail.module.css"
import {Link} from "react-router-dom"
import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../Search/SearchBar.jsx";
import Footer from "../Footer/Footer.jsx";


 //property

//address, surface, price, environments, rooms, bathrooms, rooms, garage, yard, pets, age
// image url

// publication
// description, status

// PropertyImage // URL

// typeofProp
// name

//user
// name, description, rating

//user Image 
// url



export default function Detail(props) {
  const dispatch = useDispatch()
  const miStateDetail = useSelector((state) => state.detail)
  // const miUseerState = useSelector((state) => state.user)
  // const miPublicationState = useSelector((state) => state.publication)
  // console.log(miStateDetail)
  var url = window.location.href.split("/")

  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id))
    dispatch(clean())
  }, [dispatch, props.match.params.id])


  return (
    <div>
      <NavBar />
      <SearchBar />
     <Link to={"/"}> <button className={style.buttons}>volver al home </button></Link>
      {miStateDetail.length > 0 ? (
        <div >
          <div>
            <img src ={miStateDetail[0].img}/>
            <h1>{miStateDetail[0].property.premium}</h1>
          </div>

          <div>
            <FontAwesomeIcon icon={faHeart} />
            <h1>price: {miStateDetail[0].property.price}</h1>
            <h3>typeofProp: {miStateDetail[0].property.typeofProp.name}</h3>
            <FontAwesomeIcon icon={faHouse} />
            <h4>city: {miStateDetail[0].property.city.name}</h4>
            <span>superficie: {miStateDetail[0].property.surface}</span>
            <span>environments: {miStateDetail[0].property.environments}</span>
            <FontAwesomeIcon icon={faDoorOpen} />
            <span>garage: {miStateDetail[0].property.garage}</span>
          </div>
          <div>
            <div>address: {miStateDetail[0].property.address}</div>
            <ul>
              <li>surface: {miStateDetail[0].property.metros}</li>
              <li>environments: {miStateDetail[0].property.environments}</li>
              <li>bathrooms: {miStateDetail[0].property.bathrooms}</li>
              <FontAwesomeIcon icon={faToilet} />
              <li>rooms: {miStateDetail[0].property.rooms}</li>
              <FontAwesomeIcon icon={faBed} />
              <li>garage: {miStateDetail[0].property.garage}</li>
              <li>yard: {miStateDetail[0].property.yard}</li>
              <li>pets: {miStateDetail[0].property.pets}</li>
              <FontAwesomeIcon icon={faPaw} />
              <li>age: {miStateDetail[0].property.age}</li>
              <li>{miStateDetail[0].property.service.name}</li>
            </ul>

            <div>
              <p>description: {miStateDetail[0].property.description}</p>
            </div>
          </div>
          <div>DATOS PROPIETARIO

            {/* <h1>{miUseerState[0].name}</h1>
            
            <h3>{miUseerState.mail}</h3>
            <h3>{miUseerState[0].rating}</h3>
            <h3>{miUseerState[0].description}</h3> */}
          </div>
          <Footer />
        </div>
        
      ) : (
        <div>no hay propiedad</div>
      )}
    </div>
  );
}