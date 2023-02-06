import React from "react";
import { Input, Button, Select } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

const CheckoutForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      telephone: "",
      first_name: "",
      last_name: "",
      city: "",
      province: "",
      postal_code: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div>
              <h1>Contact information</h1>
            </div>
            <div className="pt-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
          </div>
          <div className="pt-4">
            <div>
              <h1>Shipping Address</h1>
            </div>
            <div className="flex flex-row pt-2">
              <div className="w-full pr-2">
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="First name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
              </div>
              <div className="w-full">
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Last name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
              </div>
            </div>
            <div className="pt-2">
              <div className="flex flex-row">
                <div className="w-full pr-2">
                  <Input
                    id="address1"
                    name="Address"
                    placeholder="Address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex flex-row">
                <div className="w-full pr-2">
                  <Input
                    id="address2"
                    name="Address2"
                    placeholder="Apartement, suite, etc. (optional)"
                    onChange={formik.handleChange}
                    value={formik.values.address2}
                  />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex flex-row">
                <div className="w-full pr-2">
                  <Input
                    id="city"
                    name="city"
                    placeholder="City"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                </div>
                <div className="w-full pr-2">
                  <Select
                    id="province"
                    name="province"
                    placeholder="Province"
                    onChange={formik.handleChange}
                    value={formik.values.province}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </div>
                <div className="w-full ">
                  <Input
                    id="postal_code"
                    name="postal_code"
                    placeholder="Postal code"
                    onChange={formik.handleChange}
                    value={formik.values.postal_code}
                  />
                </div>
              </div>
              <div className="pt-2">
                <div>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    placeholder="Phone number"
                    onChange={formik.handleChange}
                    value={formik.values.telephone}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between pt-4">
            <div>Return to cart</div>
            <div>
              <Button type="submit">Continue to shipping</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
