import { Container, TextField } from "@mui/material";

const Contact = () => {
  const fieldTypes = ["name", "email", "nessage"];
  const renderFields = () => {
    return fieldTypes.map((type, index) => {
      const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
      const label = `Your ${capitalized}`;
      const placeholder = `What's your ${type}?`;
      return (
        <TextField
          label={label}
          placeholder={placeholder}
          className="my-3"
          key={index}
        />
      );
    });
  };
  return (
    <div className="h-screen" id="contact">
      <Container className="mt-2 rounded mb-2">
        <div className="bg-secondary my-auto">
          <div>
            <h3 className="pt-3">Get in Touch</h3>
            <h1 className="pt-1 mb-5">Contact</h1>
          </div>
          <div className="d-flex flex-column">{renderFields()}</div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
