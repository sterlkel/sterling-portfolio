import { ExpandCircleDown } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

const ExperienceExpandCollapse = ({
  isFirstPart,
  setIsFirstPart,
}: {
  isFirstPart: boolean;
  setIsFirstPart: (value: boolean) => void;
}) => {
  const marginVerticalValue = 2;
  return (
    <Stack
      direction={"row"}
      spacing={2}
      justifyContent="center"
      className={`m${isFirstPart ? "t" : "b"}-${marginVerticalValue}`}
    >
      <Button
        onClick={() => {
          setIsFirstPart(!isFirstPart);
        }}
        variant="contained"
        className="text-white font-mulish bg-secondary"
      >
        <h3 className="mr-3">{`See ${isFirstPart ? "More" : "Less"}`}</h3>
        <ExpandCircleDown
          fontSize="large"
          className={`${isFirstPart ? "" : "rotate-180"}`}
        />
      </Button>
    </Stack>
  );
};

export default ExperienceExpandCollapse;
