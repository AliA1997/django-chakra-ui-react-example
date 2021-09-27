import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import Form from "../presentational/Form";
import HomeApi from "../services/HomeApi";

const cityOptions = [
  { value: 1, label: "Los Angeles, CA, USA" },
  { value: 2, label: "San Francisco, CA, USA" },
];

const addressFields = [
  { name: "address1", type: "text" },
  { name: "address2", type: "text" },
  { name: "city", type: "select", options: cityOptions },
  { name: "zipcode", type: "number", maxlength: 5 },
  { name: "state", type: "text", maxlength: 3 },
];

const CreateHome = () => {
  const [homeInputFields, setHomeInputFields] = React.useState([]);
  const [isAddressCreated, setIsAddressCreated] = React.useState(false);
  const [createdAddressId, setCreatedAddressId] = React.useState(undefined);

  const onSubmitAddress = async (form) => {
    const addressId = await HomeApi.createAddress(form);
    setCreatedAddressId(addressId);
    setIsAddressCreated(true);
  };

  const onSubmitHome = async (form) => {
    await HomeApi.createHome(form);
    setIsAddressCreated(false);
  };

  React.useState(() => {
    async function getAddressOptions() {
      const addressOptions = await HomeApi.getAddressOptions();
      setHomeInputFields([
        { name: "property_name", type: "text" },
        { name: "mortgage_amount", type: "number" },
        { name: "desired_rent", type: "number" },
        { name: "address", type: "select", options: addressOptions },
      ]);
    }

    getAddressOptions();
  }, [isAddressCreated]);

  return (
    <Stack>
      <Box>
        {!isAddressCreated && (
          <Form
            fields={addressFields}
            typeOfForm="Address"
            onSubmit={onSubmitAddress}
            initialObject={{
              address1: "",
              address2: "",
              city: "",
              zipcode: "",
              state: "",
            }}
          />
        )}
        {isAddressCreated && (
          <Form
            fields={homeInputFields}
            typeOfForm="Home"
            onSubmit={onSubmitHome}
            initialObject={{
              property_name: "",
              mortgage_amount: 0,
              desired_rent: 0,
              address: createdAddressId,
            }}
          />
        )}
      </Box>
    </Stack>
  );
};

export default CreateHome;
