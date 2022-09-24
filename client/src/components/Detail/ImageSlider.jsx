import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({ slides }) => {
  
  const renderMin = (mins) => {

    return (mins.map((min, i)=> <Image w={"2rem"} h={"4rem"} borderRadius={"5px"} key={i} src={min.props.src}/>))

  }

  return (
    <Carousel renderThumbs={renderMin} thumbWidth={"13%"} infiniteLoop>
      
      {slides.map((slide, i) => {
        return <Image src={slide.url} key={i} minH={"100%"} minW={"100%"} />;
      })}

    </Carousel>
  );
};

export default ImageSlider;