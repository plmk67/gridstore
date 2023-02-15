import React, { useState } from "react";
import {
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

import { IoChevronBack } from "react-icons/io5";

const CheckoutForm = () => {
  const [error, setError] = useState();
  const router = useRouter();
  const provinces = [
    "AB",
    "BC",
    "MB",
    "NB",
    "NL",
    "NS",
    "ON",
    "PE",
    "QC",
    "SK",
    "NT",
    "NU",
    "YT",
  ];

  const addressSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9._-]+@/, "Please remove special characters"),
    first_name: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Please remove special characters"),
    last_name: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Please remove special characters"),
    address1: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Please remove special characters"),
    address2: Yup.string()
      .max(30)
      .matches(/^[a-zA-Z0-9#]/, "Please remove special characters"),
    city: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Invalid City"),
    postal_code: Yup.string()
      .required("Required")
      .max(30)
      .matches(/([\w ]+)/, "Invalid Postal Code"),
    phone_number: Yup.string()
      .required("Required")
      .max(16, "")
      .matches(/^[0-9()-]/, "Invalid number"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        order_created: new Date(),
        email: "test@test.com",
        first_name: "John",
        last_name: "Doe",
        address1: "123 rue Jarry",
        address2: "Apt 210",
        city: "Montreal",
        province: "QC",
        postal_code: "H2S 1F1",
        phone_number: "438 123-2342",
      },
      validationSchema: addressSchema,
      onSubmit: (values) => {
        router.push("/checkout/payment");
        console.log(JSON.stringify(values, null, 2));
      },
    });

  return (
    <>
      <Formik>
        {(props) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <h1>Contact information</h1>
            </div>
            <div className="pt-2">
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={errors.email && touched.email}>
                    <Input
                      value={values.email}
                      onChange={handleChange}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </div>

            <div className="pt-4">
              <div>
                <h1>Shipping address</h1>
              </div>
              <div className="flex flex-row pt-2">
                <div className="pr-2 w-1/2">
                  <Field name="first_name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={errors.first_name && touched.first_name}
                      >
                        <Input
                          id="first_name"
                          name="first_name"
                          placeholder="First name"
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className="w-1/2">
                  <Field name="last_name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={errors.last_name && touched.last_name}
                      >
                        <Input
                          id="last_name"
                          name="last_name"
                          placeholder="Last name"
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.last_name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
              <div className="flex flex-row pt-2">
                <div className="w-full">
                  <Field name="address1">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={errors.address1 && touched.address1}
                      >
                        <Input
                          id="address1"
                          name="address1"
                          placeholder="Address"
                          value={values.address1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.address1}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full">
                  <Field name="address2">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={errors.address2 && touched.address2}
                      >
                        <Input
                          id="address2"
                          name="address2"
                          placeholder="Apartement, suite, etc. (optional)"
                          value={values.address2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.address2}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
            </div>
            <div className="flex flex-row pt-2">
              <div className="pr-2 w-1/3">
                <Field name="city">
                  {({ field, form }) => (
                    <FormControl isInvalid={errors.city && touched.city}>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.city}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="w-1/3">
                <Field name="province">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={errors.province && touched.province}
                    >
                      <Select
                        id="province"
                        name="province"
                        placeholder="Province"
                        value={values.province}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {provinces.map((province, index) => {
                          return (
                            <option value={province} key={index}>
                              {province}
                            </option>
                          );
                        })}
                      </Select>
                      <FormErrorMessage>{errors.province}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="relative w-1/3 focus:outline-none focus:ring-0">
                <Field name="postal_code">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={errors.postal_code && touched.postal_code}
                    >
                      <Input
                        id="postal_code"
                        name="postal_code"
                        placeholder="Postal code"
                        value={values.postal_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <FormErrorMessage>{errors.postal_code}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
            </div>
            <div className="flex flex-row pt-2">
              <div className="w-full">
                <Field name="phone_number">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={errors.phone_number && touched.phone_number}
                    >
                      <Input
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        placeholder="Phone number"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.phone_number}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
            </div>
            <div>{error && <h1 className="text-red-400">{error}</h1>}</div>
            <div className="flex flex-row pt-4 justify-between items-center w-full">
              <div>
                <Link href="/cart">
                  <div className="flex flex-row items-center">
                    <div className="pr-1">
                      <IoChevronBack size={18} />
                    </div>
                    <div>Return to cart</div>
                  </div>
                </Link>
              </div>
              <div>
                <Button isLoading={props.isSubmitting} type="submit">
                  Continue to Payment
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CheckoutForm;
