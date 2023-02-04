import { Image } from '@chakra-ui/react';

export default function Logo(props: {size: number}) {
    return <Image boxSize={props.size} alt="EATinerant logo" src="https://i.imgur.com/1UiHA9v.png"/>
}