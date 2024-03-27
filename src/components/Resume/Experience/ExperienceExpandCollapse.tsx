import { ExpandCircleDown } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

// create a redux action for selecting an experience, so that only the selected experience is shown when it is expanded

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
        <h5 className="mr-3">{`See ${isFirstPart ? "More" : "Less"}`}</h5>
        <ExpandCircleDown
          fontSize="large"
          className={`${isFirstPart ? "" : "rotate-180"}`}
        />
      </Button>
    </Stack>
  );
};

export default ExperienceExpandCollapse;
