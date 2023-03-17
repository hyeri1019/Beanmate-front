import {useContext, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, ListItemText, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CategoryContext} from "../CategoryContext";
import "../component/css/Main.css";
import {CustomAccordion, CustomButton, CustomList, CustomTypography, CustomListItemButton} from "./MyStyle";
import {useNavigate} from "react-router-dom";

function CategoryMenu() {

    var navigate = useNavigate();
    const { category, setCategory } = useContext(CategoryContext);
    const { categories } = useContext(CategoryContext);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (index) => (e, isExpanded) => {
        setExpanded(isExpanded ? index : false);
    };

    return (
        <div className="category-menu">
            {categories.map((category, index) => (
                <CustomAccordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <CustomTypography className="category-text">
                            {category.mainCategory}
                        </CustomTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CustomList>
                            {category.subCategories.map((subCategory, subIndex) => (
                                <CustomListItemButton
                                    key={subIndex}
                                    onClick={() => {
                                        if (category.mainCategory === 'CONTACT US') {
                                            navigate('/chat');
                                        } else {
                                            setCategory(subCategory);
                                            navigate(`/board/${subCategory}/1`);
                                        }
                                    }}
                                >
                                    <ListItemText primary={subCategory} />
                                </CustomListItemButton>
                            ))}
                        </CustomList>
                    </AccordionDetails>
                </CustomAccordion>
            ))}
        </div>
    );
}

export default CategoryMenu;