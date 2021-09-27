import React from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import _ from "lodash";

const Form = ({ onSubmit, fields, initialObject, typeOfForm }) => {
  <Formik
    initialValues={initialObject}
    validate={(values) => {
      const errors = {};
      fields.forEach((field) => {
        if (!values[field.name])
          errors[field.name] = `Please provide a ${field.name.replace(
            /_/g,
            " "
          )}.`;
      });

      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isSubmitting,
      submitForm,
      /* and other goodies */
    }) => (
      <div>
        <Text>{typeOfForm} Form</Text>
        <Stack flexDir="ro`w" flexWrap="wrap">
          {fields &&
            fields.map((field) => (
              <Box maxW="50%">
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={`${field.name.replace(/_/g, " ")}`}
                  value={values[field.name]}
                />
                {errors[field.name] && touched[field.name] && (
                  <Text color="red.100">{errors[field.name]}</Text>
                )}
              </Box>
            ))}
        </Stack>
        <Button
          type="submit"
          disabled={isSubmitting}
          color="green.100"
          onClick={() => {
            submitForm();
          }}
        >
          Submit
        </Button>
        `
      </div>
    )}
  </Formik>;
};

export default Form;
