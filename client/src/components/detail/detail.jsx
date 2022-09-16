import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getDetail, clean} from "../../redux/actions"
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
import SearchBar from "../Search/searchBar.jsx";
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



export default function Detail() {
  const dispatch = useDispatch()
  const miStateDetail = useSelector((state) => state.detail)
  // const miUseerState = useSelector((state) => state.user)
  // const miPublicationState = useSelector((state) => state.publication)
  // console.log(miStateDetail)
  var url = window.location.href.split("/")

  useEffect(() => {
         dispatch(getDetail(url[url.length-1]*1))
       return ()=> {dispatch(clean())}
      }
  ,[dispatch])


  return (
    <div>
      <NavBar />
      <SearchBar />
     <Link to={"/"}> <button className={style.buttons}>volver al home </button></Link>
      {miStateDetail.length > 0 ? (
        <div >
          <div>
            <img src ={miStateDetail[0].img}/>
          </div>

          <div>
            <FontAwesomeIcon icon={faHeart} />
            <h1>price: {miStateDetail[0].precio}</h1>
            <h3>typeofProp: {miStateDetail[0].typeofProp}</h3>
            <FontAwesomeIcon icon={faHouse} />
            <h4>city: {miStateDetail[0].ciudad}</h4>
            <span>superficie: {miStateDetail[0].ciudad}</span>
            <span>environments: {miStateDetail[0].ambientes}</span>
            <FontAwesomeIcon icon={faDoorOpen} />
            <span>garage: {miStateDetail[0].garage}</span>
          </div>
          <hgroup>
            <div>address: {miStateDetail[0].address}</div>
            <ul>
              <li>surface: {miStateDetail[0].metros}</li>
              <li>environments: {miStateDetail[0].environments}</li>
              <li>bathrooms: {miStateDetail[0].baño}</li>
              <FontAwesomeIcon icon={faToilet} />
              <li>rooms: {miStateDetail[0].dormitorio}</li>
              <FontAwesomeIcon icon={faBed} />
              <li>garage: {miStateDetail[0].garage}</li>
              <li>yard: {miStateDetail[0].yard}</li>
              <li>pets: {miStateDetail[0].mascota}</li>
              <FontAwesomeIcon icon={faPaw} />
              <li>age: {miStateDetail[0].age}</li>
              <li></li>
            </ul>

            <div>
              <p>description: {miStateDetail[0].description}</p>
            </div>
            {/* <div>
            <textarea placeholder="preguntar aca">
      
            </textarea>
            <button>
           preguntar
            </button>
          </div> */}
          </hgroup>
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
