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
import { config } from "../constants/constants";

import { IoChevronBack } from "react-icons/io5";

const ShippingAddressForm = (props) => {
  const router = useRouter();
  const URL = config.url;
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
    firstName: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Please remove special characters"),
    lastName: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Please remove special characters"),
    line1: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Please remove special characters"),
    line2: Yup.string()
      .max(30)
      .matches(/^[a-zA-Z0-9#]/, "Please remove special characters"),
    city: Yup.string()
      .required("Required")
      .max(30)
      .matches(/^[a-zA-Z0-9]/, "Invalid City"),
    postalCode: Yup.string()
      .required("Required")
      .max(30)
      .matches(/([\w ]+)/, "Invalid Postal Code"),
    phoneNumber: Yup.string()
      .required("Required")
      .max(16, "")
      .matches(/^[0-9()-]/, "Invalid number"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "jane_doe@gmail.com",
        firstName: "Jane",
        lastName: "Doe",
        line1: "354 Gladstone Avenue",
        line2: "Apt 123",
        city: "Ottawa",
        province: "ON",
        postalCode: "K2P 0R4",
        phoneNumber: "(438) 123-2342",
      },
      validationSchema: addressSchema,
      onSubmit: (values) => {
        const {
          email,
          firstName,
          lastName,
          line1,
          line2,
          city,
          province,
          postalCode,
          phoneNumber,
        } = values;

        let addShippingAddress = {
          shippingAddress: {
            firstName,
            lastName,
            line1,
            line2,
            city,
            province,
            postalCode,
          },
        };

        fetch(`${URL}/api/order/shipping-address/${props.orderId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shippingAddress: addShippingAddress.shippingAddress,
            email: email,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data.order));
        router.push(`/checkout/${props.orderId}/payment`, null, {
          shallow: true,
        });
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
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={errors.firstName && touched.firstName}
                      >
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First name"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className="w-1/2">
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={errors.lastName && touched.lastName}
                      >
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last name"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
              <div className="flex flex-row pt-2">
                <div className="w-full">
                  <Field name="line1">
                    {({ field, form }) => (
                      <FormControl isInvalid={errors.line1 && touched.line1}>
                        <Input
                          id="line1"
                          name="line1"
                          placeholder="Address"
                          value={values.line1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.line1}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full">
                  <Field name="line2">
                    {({ field, form }) => (
                      <FormControl isInvalid={errors.line2 && touched.line2}>
                        <Input
                          id="line2"
                          name="line2"
                          placeholder="Apartement, suite, etc. (optional)"
                          value={values.line2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.line2}</FormErrorMessage>
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
                <Field name="postalCode">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={errors.postal_code && touched.postal_code}
                    >
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="Postal code"
                        value={values.postalCode}
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
                <Field name="phoneNumber">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={errors.phoneNumber && touched.phoneNumber}
                    >
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Phone number"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
            </div>
            {/* <div>{errors && <h1 className="text-red-400">{errors}</h1>}</div> */}
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

export default ShippingAddressForm;
