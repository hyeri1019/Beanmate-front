import {createContext, useState} from "react";

export const CategoryContext = createContext();

export function CategoryProvider(props) {
    const [category, setCategory] = useState('post');

    const [categories, setCategories] = useState([
        { mainCategory: 'POST', subCategories: ['news', 'post', 'event'] },
        { mainCategory: 'CONTACT US', subCategories: ['chat'] },
    ]);

    return (
                                        /* 하위 컴포넌트에 전달 */
        <CategoryContext.Provider value={{ category, setCategory, categories }}>
            {props.children}
        </CategoryContext.Provider>
    );
}

