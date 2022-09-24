import React, { useEffect } from 'react'
import './maps.css'
import { Map, TileLayer, Popup, Marker } from 'react-leaflet'
import { useState } from 'react'

export default function Maps(props){
   
    // const dispatch = useDispatch()
    // const city = useSelector(state => state.detail.property.city.name)
    const [cityPos, setCityPos] = useState([-24.792028,-65.413284])
    const map = {
        'Salta': [-24.792028,-65.413284],
        'Mendoza': [-32.889458,-68.845840],
        'Entre Ríos': [-32.056789,-59.201801],
        'Buenos Aires': [-34.603683,-58.381557],
        'Ciudad Autónoma de Buenos Aires': [-34.603683,-58.381557],
        'Misiones': [-26.5723523,-63.3437116,5],
        'San Luis': [-33.295068, -66.333096],
        'San Juan': [-31.5316976,-68.5676963],
        'Santa Cruz': [49.1043794,-74.1196033],
        'Chubut': [43.9039192,-72.3757432],
        'Río Negro': [38.4288203,-84.939688],
        'Córdoba': [31.399084,-64.3344313],
        'La Rioja': [-29.4141291,-66.9258179],
        'Catamarca': [-28.4643652,-65.8452007],
        'Santa Fe': [-31.6179774,-60.7762978],
        'La Pampa': [-37.1398025,-68.0834879],
        'Santiago del Estero': [-27.8015453,-64.3370892],
        'Corrientes': [-27.4856853,-59.0630148],
        'Tucumán': [-26.8326885,-65.2926345],
        'Neuquén': [-38.9410801,-68.1854412],
        'Chaco': [-26.0533116,-63.1445224],
        'Formosa': [-26.1719849,-58.2650108],
        'Jujuy': [-24.2051671,-65.3755963],
        'Tierra del Fuego, Antártida e Islas del Atlántico Sur': [-53.83674,-68.4440534]
    }
    useEffect(()=>{
        if(props.position){
            setCityPos(map[props.position.property.city.name])    
        }
        console.log(props.position.property.city.name)
    }, [props])

    return(
        <Map center={cityPos} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={cityPos}>
                <Popup>{props.position.property.city.name}</Popup>
            </Marker>
        </Map>
    )
}
