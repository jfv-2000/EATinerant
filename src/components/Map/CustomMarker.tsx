import { Marker } from "@react-google-maps/api";

export default function(props: {position: any, icon: any}) {
    return (
        <Marker position={props.position} icon={props.icon}></Marker>
    )
}