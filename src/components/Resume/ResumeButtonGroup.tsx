"use client";
import { ToggleButtonGroup } from "@mui/material";
import { usePathname } from "next/navigation";
import ResumeToggleButton from "./ResumeToggleButton";
import { ResumeRouteTypes } from "@/types";

// FIX: Can't really see which button is selected, should change colors
const ResumeButtonGroup = () => {
  const pathname = usePathname();
  const renderButtons = () => {
    return ["exp", "edu", "skills"].map((item) => {
      return <ResumeToggleButton item={item as ResumeRouteTypes} key={item} />;
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
      value={getCurrentTab()}
      exclusive
      className="align-self-center text-white my-3"
    >
      {renderButtons()}
    </ToggleButtonGroup>
  );
};

export default ResumeButtonGroup;
