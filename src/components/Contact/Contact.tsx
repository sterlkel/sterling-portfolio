import { Card, CardContent, CardHeader, Container } from "@mui/material";
import ContactForm from "./ContactForm";
import { useEffect, useState } from "react";
import { getEmailSent } from "@/app/actions";

const Contact = () => {
  const [emailSent, setEmailSent] = useState(false);
  useEffect(() => {
    getEmailSent().then((date) => setEmailSent(date));
  }, []);
  return (
    <div className="h-screen d-flex" id="contact">
      <Container className="mt-2 justify-content-center d-flex flex-column">
        <Card className="bg-secondary">
          <CardHeader
            className="px-4"
            title="Get In Touch"
            subheader="Contact me!"
          />
          <CardContent className="d-flex">
            {!emailSent ? (
              <ContactForm />
            ) : (
              <div className="justify-content-center">
                <h1>Email Sent</h1>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
