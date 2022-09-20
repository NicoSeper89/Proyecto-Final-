import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux"


const ImageSlider = ({ slides }) => {

  const image = useSelector((state) => state.detail)

  const renderMin = (mins) => {

    console.log(mins[0])

    return (mins.map((min, i)=> <Image w={"2rem"} h={"4rem"} borderRadius={"5px"} key={i} src={min.props.src}/>))

}

  return (
    <Carousel renderThumbs={renderMin} thumbWidth={"13%"} infiniteLoop>
      {slides.map((slide) => {
        return <Image src={slide.url} key={slide.id} minH={"100%"} minW={"100%"} />;
      })}
      {/*  <Carousel   infiniteLoop renderThumbs={e => e}>

        {slides.map((slide, i) => <Image  id={i} src={slide.url} key={i} />)}

      </Carousel> */}
    </Carousel>

    /*  <Carousel  infiniteLoop>
       {slides.map((slide) => {
         return <Image src={slide.url} key={slide.id} height="auto" width="800px" />;
       })}
     </Carousel>
*/

  );
};

export default ImageSlider;