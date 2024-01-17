"use client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const ResumeToggleButton = ({
  value,
  children,
}: React.PropsWithChildren<{ value: string }>) => {
  return (
    <ToggleButton
      value={value}
      // className="text-white border-white"
    >
      {children}
    </ToggleButton>
  );
};

const ResumeButtonGroup = () => {
  const router = useRouter();
  const pathname = usePathname();
  const renderButtons = () => {
    const renderButtonString = (text: string) => {
      switch (text) {
        case "exp":
          return "Experience";
        // break;
        case "edu":
          return "Education";
        // break;
        case "skills":
          return "Skills And Interests";

        default:
          return "Unknown";
      }
    };
    return ["exp", "edu", "skills"].map((item) => {
      console.log(item);
      const isHomePage = !(
        pathname.includes("exp") ||
        pathname.includes("edu") ||
        pathname.includes("skills")
      );
      return (
        <ToggleButton
          value={item}
          key={item}
          onClick={() => router.push(`${isHomePage ? "resume/" : ""}${item}`)}
          className="text-white border-white"
        >
          {renderButtonString(item)}
        </ToggleButton>
      );
    });
  };
  const getCurrentTab = () => {
    if (pathname.includes("edu")) {
      return "edu";
    } else if (pathname.includes("skills")) {
      return "skills";
    } else if (pathname.includes("exp")) {
      return "exp";
    }
    return "";
  };
  return (
    <ToggleButtonGroup
      //   onChange={(event, newValue) => {
      //     alert(newValue);
      //   }}
      //   value={currTab}
      value={getCurrentTab()}
      //   onChange={(event, newValue) => {
      //     console.log(pathname);
      //   }}
      exclusive
      className="align-self-center text-white my-3"
    >
      {/* <ResumeToggleButton value="exp">Experience</ResumeToggleButton> */}
      {/* <ToggleButton value="exp">Education</ToggleButton>
      <ToggleButton value="edu">Education</ToggleButton>
      <ToggleButton value="ski">Skills and Interests</ToggleButton> */}
      {renderButtons()}
    </ToggleButtonGroup>
  );
};

export default ResumeButtonGroup;
