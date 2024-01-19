"use client";
import { Button, Container, Stack } from "@mui/material";
import {
  Controller,
  FieldError,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ContactField from "./ContactField";
import { ContactFieldTypes } from "@/types";

const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fieldTypes: ContactFieldTypes[] = ["name", "email", "message"];

  const renderFields = () => {
    // see if there is a way to automatically construct the type from the array above
    // change color to white when focused
    return fieldTypes.map((type, index) => {
      const getError = () => {
        return errors[type] ? (errors[type] as FieldError) : undefined;
      };
      const getRules = () => {
        let rules: Pick<
          RegisterOptions<FieldValues>,
          "maxLength" | "minLength" | "validate" | "required" | "pattern"
        > = { required: true };
        if (type == "email") {
          rules = {
            ...rules,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          };
        }
        return rules;
      };
      return (
        <Controller
          key={index}
          name={type}
          control={control}
          rules={getRules()}
          render={({ field }) => (
            <ContactField {...field} type={type} error={getError()} />
          )}
        />
      );
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>{renderFields()}</Stack>

        <Container className="justify-content-end d-flex">
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Send it!
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default ContactForm;
