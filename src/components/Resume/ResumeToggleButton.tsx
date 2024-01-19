import { ResumeRouteTypes } from "@/types";
import { ToggleButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

type ResumeToggleButtonProps = {
  item: ResumeRouteTypes;
};

const ResumeToggleButton = ({ item }: ResumeToggleButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = !(
    pathname.includes("exp") ||
    pathname.includes("edu") ||
    pathname.includes("skills")
  );
  const renderButtonString = (text: string) => {
    switch (text) {
      case "exp":
        return "Experience";
      case "edu":
        return "Education";
      case "skills":
        return "Skills And Interests";

      default:
        return "Unknown";
    }
  };
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
};

export default ResumeToggleButton;
