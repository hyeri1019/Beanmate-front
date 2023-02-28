import {createContext, useState, useEffect} from "react";
import axios from "axios";
import {CategoryContext} from "./CategoryContext";

export const PrincipalContext = createContext();

export function PrincipalProvider(props) {
    const [principal, setPrincipal] = useState(localStorage.getItem("email"));

    return (
        /* 하위 컴포넌트에 전달 */
        <CategoryContext.Provider value={{ principal }}>
            {props.children}
        </CategoryContext.Provider>
    );
}