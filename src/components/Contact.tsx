import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const Contact = () => {
  const fieldTypes = ["name", "email", "message"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const renderFields = () => {
    const getFieldState = (type: "name" | "email" | "message") => {
      switch (type) {
        case "name":
          return {
            value: name,
            setter: setName,
          };
        case "email":
          return {
            value: email,
            setter: setEmail,
          };
        case "message":
          return {
            value: message,
            setter: setMessage,
          };
        default:
          return {
            value: "",
            setter: (str: string) => {
              throw new Error("There is no state connected to " + str);
            },
          };
      }
    };
    // see if there is a way to automatically construct the type from the array above
    // add appropriate props to the text fields
    // add validation
    // change color to white when focused
    // determine the root of color
    return fieldTypes.map((type, index) => {
      const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
      const fieldState = getFieldState(type);
      const label = `Your ${capitalized}`;
      const placeholder = `What's your ${type}?`;
      return (
        <TextField
          id={`${type}-input`}
          label={label}
          placeholder={placeholder}
          className="my-3"
          key={index}
          value={fieldState.value}
          onChange={(e) => fieldState.setter(e.target.value)}
          variant={type !== "message" ? "standard" : undefined}
          multiline={type === "message" ? true : false}
          minRows={type === "message" ? 3 : undefined}
        />
      );
    });
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    let data = {
      name,
      email,
      message,
    };
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
    <div className="h-screen d-flex" id="contact">
      <Container className="mt-2 justify-content-center d-flex flex-column">
        <Card className="bg-secondary">
          <CardHeader
            className="px-4"
            title="Get In Touch"
            subheader="Contact me!"
          />
          <CardContent>
            <Container>
              <Stack>{renderFields()}</Stack>
              <Container className="justify-content-end d-flex">
                <Button
                  variant="contained"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Send it!
                </Button>
              </Container>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
