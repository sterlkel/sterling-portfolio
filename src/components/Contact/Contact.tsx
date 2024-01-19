import { Card, CardContent, CardHeader, Container } from "@mui/material";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="h-screen d-flex bg-primary hasBgImage" id="contact">
      <Container className="mt-2 justify-content-center d-flex flex-column">
        <Card className="bg-secondary px-5 py-3">
          <CardHeader
            className="px-4 text-white"
            title="Get In Touch"
            subheader="Contact me!"
          />
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
