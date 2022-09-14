import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const property = {
  address,
};
//address, surface, price, environments, bathrooms, rooms, garage, yard, pets, age
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
  // const dispatch = useDispatch()
  //   const miStateDetail = useSelector((state) => state.detail)

  return (
    <div>
      {miStateDetail.length > 0 ? (
        <article>
          <div>
            <img />
          </div>

          <div>
            <h1>price</h1>
            <h3>typeofProp</h3>
            <span>superficie</span>
            <span>environments</span>
            <span>garage</span>
          </div>
          <hgroup>
            <div>address</div>
            <ul>
              <li>surface</li>
              <li>environments</li>
              <li>bathrooms</li>
              <li>garage</li>
              <li>yard</li>
              <li>pets</li>
              <li>age</li>
              <li></li>
            </ul>

            <div>
              <p>description</p>
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
