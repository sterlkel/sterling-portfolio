import { Card, CardContent, CardHeader, Container } from "@mui/material";
import ContactForm from "./ContactForm";
import { useEffect, useState } from "react";
import { getEmailSent } from "@/app/actions";
import { MarkEmailRead } from "@mui/icons-material";

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
              <div className="justify-content-center w-100">
                <h1 className="text-center">
                  Email Sent
                  <MarkEmailRead className="ml-5" />
                </h1>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
