import { useEffect, useState } from 'react'
import { Container, Text, Button, LogoHeader } from '../../components'
import { IoMusicalNotesSharp, IoPersonSharp } from "react-icons/io5";
import { RiDiscFill } from "react-icons/ri";
import DiscoverSongs from '../../layouts/DiscoverSongs'
import DiscoverArtists from '../../layouts/DiscoverArtists'
import DiscoverAlbums from '../../layouts/DiscoverAlbums'
import { BLACK, WHITE } from '../../styles/colors'

type DiscoverType = 'songs' | 'artists' | 'albums';

export default function Discover() {

    const [activeDiscoverType, setActiveDiscoverType] = useState<null | DiscoverType>(null);

    return (
        <Container
          centerX
          paddingX={30}
          paddingY={30}
        >
            <LogoHeader />

            <Text
                color={WHITE}
                size={25}
                paddingY={20}
            >Discover new music recommendations with OpenAI</Text>

            <Container width={100} horizontal>
                <Container
                    onClick={() => setActiveDiscoverType('songs')}
                    backgroundColor={BLACK}
                    borderRadius={20}
                    width={33}
                    centerX
                    paddingY={20}
                    marginX={5}
                >
                    <IoMusicalNotesSharp size={80}/>
                    <Text size={30}>Songs</Text>
                </Container>
                <Container
                    onClick={() => setActiveDiscoverType('artists')}
                    backgroundColor={BLACK}
                    borderRadius={20}
                    width={33}
                    centerX
                    paddingY={20}
                    marginX={5}
                >
                    <IoPersonSharp size={80}/>
                    <Text size={30}>Artists</Text>
                </Container>
                <Container
                    onClick={() => setActiveDiscoverType('albums')}
                    backgroundColor={BLACK}
                    borderRadius={20}
                    width={33}
                    centerX
                    paddingY={20}
                    marginX={5}
                >
                    <RiDiscFill size={80}/>
                    <Text size={30}>Albums</Text>
                </Container>
            </Container>

            {activeDiscoverType && (
                <Container>
                    {activeDiscoverType === "songs" ? (
                        <DiscoverSongs />
                    ) : activeDiscoverType === "artists" ? (
                        <DiscoverArtists />
                    ) : <DiscoverAlbums />}
                </Container>
            )}

        </Container>
    )
}