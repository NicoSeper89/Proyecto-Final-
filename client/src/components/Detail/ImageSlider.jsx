import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useSelector} from "react-redux"


const ImageSlider = ({ slides }) => {
   
    const image = useSelector((state) => state.detail)

    return (
      <Carousel  infiniteLoop showThumbs={false}>
        {slides.map((slide) => {
          return <Image src={slide.url} key={slide.id} height="auto" width="800px" />;
        })}
      </Carousel>
    );
  };
  
  export default ImageSlider;