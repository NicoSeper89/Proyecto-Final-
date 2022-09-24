import React from 'react'
import './maps.css'
import { Map, TileLayer, Popup, Marker } from 'react-leaflet'


export default function Maps(){
    
    return(
        <Map center={[-32.889822, -68.84428]} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
        </Map>
    )
}