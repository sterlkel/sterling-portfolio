import { Container } from "@mui/material";

const CustomContainer = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return <Container className={className}>{children}</Container>;
};

export default CustomContainer;
