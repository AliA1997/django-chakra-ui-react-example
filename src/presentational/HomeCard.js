import React from "react";
import { Box, Stack, Text, Tag } from "@chakra-ui/react";

const DisplayValue = (value) => (
  <Tag size="lg" variant="solid" color="green.100">
    {value}
  </Tag>
);

const HomeCard = ({
  selectHome,
  id,
  property_name,
  //   mortgage_amount,
  //   desired_rent,
  address1,
  //   address2,
  city,
  zipcode,
  state,
}) => (
  <Stack backgroundColor="green.200" margin="10" onClick={() => selectHome(id)}>
    <Text as="h2">Test</Text>
    <Stack flexDir="column" flexWrap="wrap">
      <Box>{DisplayValue(`Property Name: ${property_name}`)}</Box>
      <Box>{DisplayValue(`Address: ${address1}`)}</Box>
      <Box>{DisplayValue(`City: ${city}`)}</Box>
      <Box>{DisplayValue(`State: ${state}`)}</Box>
      <Box>{DisplayValue(`Zip Code: #${zipcode}`)}</Box>
    </Stack>
  </Stack>
);

export default HomeCard;
