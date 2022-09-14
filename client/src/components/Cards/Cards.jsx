import React from "react";
import Card from "./Card";
import style from "./Cards.module.css";

export default function Cards() {
  //Data moqueada
  const data = [
    {
      id: 1,
      img: [
        "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/9/16/0/IO_Tongue-and-Groove_Beech-Street_3.jpg.rend.hgtvcom.616.411.suffix/1568648112267.jpeg",
        "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/9/16/0/IO_Tongue-and-Groove_Beech-Street_3.jpg.rend.hgtvcom.616.411.suffix/1568648112267.jpeg",
        "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/9/16/0/IO_Tongue-and-Groove_Beech-Street_3.jpg.rend.hgtvcom.616.411.suffix/1568648112267.jpeg",
      ],
      precio: 40.0,
      ciudad: "Posadas",
      metros: 45,
      baño: 1,
      dormitorio: 2,
      ambientes: 4,
      mascota: true,
    },
    {
      id: 2,
      img: [
        "https://images.adsttc.com/media/images/5f59/552a/63c0/178c/4900/0015/newsletter/Flickr_CC_User_Tammy_Strobel.jpg?1599690022",
        "https://images.adsttc.com/media/images/5f59/552a/63c0/178c/4900/0015/newsletter/Flickr_CC_User_Tammy_Strobel.jpg?1599690022",
        "https://images.adsttc.com/media/images/5f59/552a/63c0/178c/4900/0015/newsletter/Flickr_CC_User_Tammy_Strobel.jpg?1599690022",
      ],
      precio: 80.0,
      ciudad: "Iguazú",
      metros: 60,
      baño: 2,
      dormitorio: 3,
      ambientes: 5,
      mascota: true,
    },
    {
      id: 3,
      img: [
        "https://s3.amazonaws.com/timeinc-houseplans-v2-production/region/images/539/original/Adaptive_Cottage_front_resize.jpg?1657733110",
        "https://s3.amazonaws.com/timeinc-houseplans-v2-production/region/images/539/original/Adaptive_Cottage_front_resize.jpg?1657733110",
        "https://s3.amazonaws.com/timeinc-houseplans-v2-production/region/images/539/original/Adaptive_Cottage_front_resize.jpg?1657733110",
      ],
      precio: 50.0,
      ciudad: "Bs. As.",
      metros: 42,
      baño: 1,
      dormitorio: 2,
      ambientes: 4,
      mascota: false,
    },
  ];

  return (
    <div className={style.container}>
      {data.map((r) => {
        return (
          <div key={r.id}>
            <Card
              img={r.img}
              precio={r.precio}
              ciudad={r.ciudad}
              metros={r.metros}
              baño={r.baño}
              dormitorio={r.dormitorio}
              ambientes={r.ambientes}
              mascota={r.mascota}
            />
          </div>
        );
      })}
    </div>
  );
}
