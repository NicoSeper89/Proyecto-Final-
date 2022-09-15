import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getDetail, clean} from "../../redux/actions"
import { useEffect } from "react";


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
  const {id} = useParams()

  useEffect(()=>{
    dispatch(getDetail(id))
    dispatch(clean())
  },[dispatch])



  return (
    <div>
      {miStateDetail.length > 0 ? (
        <article>
          <div>
            <img />
          </div>

          <div>
            <h1>price: {miStateDetail[0].price}</h1>
            <h3>typeofProp: {miStateDetail[0].typeofProp}</h3>
            <h4>city: {miStateDetail[0].city}</h4>
            <span>superficie: {miStateDetail[0].superficie}</span>
            <span>environments: {miStateDetail[0].environments}</span>
            <span>garage: {miStateDetail[0].garage}</span>
          </div>
          <hgroup>
            <div>address: {miStateDetail[0].address}</div>
            <ul>
              <li>surface: {miStateDetail[0].surface}</li>
              <li>environments: {miStateDetail[0].environments}</li>
              <li>bathrooms: {miStateDetail[0].bathrooms}</li>
              <li>rooms: {miStateDetail[0].rooms}</li>
              <li>garage: {miStateDetail[0].garage}</li>
              <li>yard: {miStateDetail[0].yard}</li>
              <li>pets: {miStateDetail[0].pets}</li>
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
          <div>DATOS PERSONA</div>
        </article>
      ) : (
        <div>no hay propiedad</div>
      )}
    </div>
  );
}
