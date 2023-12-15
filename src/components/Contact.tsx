import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  TextField,
} from "@mui/material";

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
    <div className="h-screen d-flex bg-primary hasBgImage" id="contact">
      <Container className="mt-2 justify-content-center d-flex flex-column">
        <Card className="bg-secondary">
          <CardHeader
            className="px-4 text-white"
            title="Get In Touch"
            subheader="Contact me!"
          />
          <CardContent>
            <Container>
              <Stack>{renderFields()}</Stack>
              <Container className="justify-content-end d-flex">
                <Button variant="contained">Send it!</Button>
              </Container>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
