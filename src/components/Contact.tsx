import { TextField } from "@mui/material";

const Contact = () => {
  return (
    <div>
      <div>
        <div>
          <h3>Get in Touch</h3>
          <h1>Contact</h1>
        </div>
        <TextField label="Your Name" placeholder="What's your name?" />
        <TextField label="Your Email" placeholder="What's your email?" />
        <TextField label="Your Message" placeholder="What's your message" />
      </div>
    </div>
  );
};

export default Contact;
