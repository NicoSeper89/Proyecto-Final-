import GoogleMaps from './GoogleMaps';
import useMaps from './useMaps';
import {Box} from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect } from 'react';

const Success = ({position}) => {
  
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //     libraries: ["places"],
    //   });
    
    //   if (!isLoaded) return <div>Loading...</div>;
    //   return <Map />;
    
    useEffect(()=>{
        setTimeout(()=>{
            setShow(true)
        },1000)
    }, [])
    const [show, setShow] = useState(false)
    const location = useMaps(position.property.address);

  return (
    <Box>
        <Box>
        {show && <GoogleMaps data={location} />}
        </Box>
    </Box>
  );
}

export default Success;