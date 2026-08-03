import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { IconButton } from "@mui/material";

const CollapseButton = ({ isExpanded, toggleIsExpanded }: { isExpanded: boolean; toggleIsExpanded: () => void }) => {
    return (
        <IconButton onClick={() => toggleIsExpanded()}>
            {isExpanded ?
                <IconChevronUp color="#145da0" /> : <IconChevronDown color="#145da0" />}
        </IconButton>
    )
}

export default CollapseButton;