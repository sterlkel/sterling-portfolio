import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const CollapseButton = ({ isExpanded, toggleIsExpanded }: { isExpanded: boolean; toggleIsExpanded: () => void }) => {
    return (
        <IconButton onClick={() => toggleIsExpanded()}>
            {isExpanded ?
                <ExpandLess
                    sx={{ color: '#145da0' }}
                /> : <ExpandMore
                    sx={{ color: '#145da0' }}
                />}
        </IconButton>
    )
}

export default CollapseButton;