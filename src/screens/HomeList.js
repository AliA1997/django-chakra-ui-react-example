import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import HomeApi from '../services/HomeApi';
import HomeCard from '../presentational/HomeCard';
import HomeModal from '../presentational/HomeModal';

const HomeList = (props) => {
    const [homes, setHomes] = React.useState(undefined);
    const [selectedHome, setSelectedHome] = React.useState(undefined);
    const [openModal, setOpenModal] = React.useState(false);
    
    React.useEffect(
        () => {
            async function getHomes() {
                const results = await HomeApi.getHomes();
                setHomes(results);
            }

            getHomes();
        },
        [homes]
    );

    const selectHome = (id) => {
        alert(id);
        setOpenModal(true);
        setSelectedHome(id);
    }

    const closeModal = () => setOpenModal(false);

    return (
        <>
            <Stack maxW="1000px" marginRight="auto" marginLeft="auto">
                <Text as="h2">Houser App</Text>
                <Box>
                    {homes && homes.map((home, keyIdx) => <HomeCard key={keyIdx} {...home} selectHome={selectHome} />)}
                </Box>
            </Stack>
            <HomeModal selectedHome={selectedHome} closeModal={closeModal} isOpen={openModal} />
        </>
    );
}

export default HomeList;