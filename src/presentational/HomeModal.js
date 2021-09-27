import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  Tag,
} from "@chakra-ui/react";
import Form from "./Form";
import HomeApi from "../services/HomeApi";

const DisplayValue = (value) => (
  <Tag size="lg" variant="solid" color="green.500">
    {value}
  </Tag>
);

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

const HomeModal = ({ id, isOpen, closeModal }) => {
  const [info, setInfo] = React.useState(undefined);
  const [showAddressForm, setShowAddressForm] = React.useState(false);
  const [showHomeForm, setShowHomeForm] = React.useState(false);
  const [homeInputFields, setHomeInputFields] = React.useState([]);

  React.useEffect(() => {
    async function getHome(id) {
      const home = await HomeApi.getHome(id);
      setInfo(home);
    }

    async function getAddressOptions() {
      const addressOptions = await HomeApi.getAddressOptions();
      setHomeInputFields([
        { name: "property_name", type: "text" },
        { name: "mortgage_amount", type: "number" },
        { name: "desired_rent", type: "number" },
        { name: "address", type: "select", options: addressOptions },
      ]);
    }

    getHome(id);
    getAddressOptions();
  }, []);

  const onSubmitAddress = async (form) => {
    await HomeApi.updateAddress(form);
  };

  const onSubmitHome = async (form) => {
    await HomeApi.updateHome(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>House Info</ModalHeader>
      <ModalBody>
        {showAddressForm ? (
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
        ) : (
          <Stack flexDir="column" maxH="500px">
            {info &&
              Object.keys(info.address).map((infoKey) => (
                <Box width="50%">{DisplayValue(info.address[infoKey])}</Box>
              ))}
          </Stack>
        )}
        {showHomeForm && homeInputFields.length ? (
          <Form
            fields={homeInputFields}
            typeOfForm="Home"
            onSubmit={onSubmitHome}
            initialObject={{
                property_name: "",
                mortgage_amount: 0,
                desired_rent: 0,
                address: '',
            }}
          />
        ) : (
          <Stack flexDir="column" maxH="500px">
            {info &&
              Object.keys(info.home).map((infoKey) => (
                <Box width="50%">{DisplayValue(info.home[infoKey])}</Box>
              ))}
          </Stack>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="green.500"
          type="button"
          onClick={() => setShowAddressForm(!showAddressForm)}
        >
          {showAddressForm ? "Cancel Edit Address" : "Edit Address"}
        </Button>
        <Button
          color="green.500"
          type="button"
          onClick={() => setShowHomeForm(!showHomeForm)}
        >
          {showHomeForm ? "Cancel Edit Home" : "Edit Home"}
        </Button>
        <Button color="gray.100" type="button" onClick={() => closeModal()}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default HomeModal;
