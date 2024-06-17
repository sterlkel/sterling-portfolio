import { ContactFieldTypes } from "@/types";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { FieldError } from "react-hook-form";

type ContactFieldProps = {
  type: ContactFieldTypes;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
};

const ContactField = ({ type, onChange, error }: ContactFieldProps) => {
  const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
  const label = `Your ${capitalized}`;
  const id = `${type}-input`
  const placeholder = `What's your ${type}?`;
  const getHelperText = () => {
    if (error!.type == "required") {
      return `Your ${type} is required`;
    } else if (error!.message) {
      return error!.message;
    }
    return "Unknown error";
  };
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      className="my-3 contactField"
      error={!!error}
      helperText={error ? getHelperText() : undefined}
      onChange={onChange}
      variant={type !== "message" ? "standard" : undefined}
      multiline={type === "message" ? true : false}
      minRows={type === "message" ? 3 : undefined}
      type={type === "email" ? "email" : undefined}
    />
  );
};

export default ContactField;
