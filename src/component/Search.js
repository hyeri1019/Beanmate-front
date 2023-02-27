import { useState } from "react";
import { Select, MenuItem } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { CustomButton } from './MyStyle';
import {useNavigate} from "react-router-dom";


    function SearchBar({setPage, page, options, onSearch}) {

        var navigate = useNavigate()

        const [option,setOption] = useState(options[0]);
        const [keyword, setKeyword] = useState('');
        console.log(option)
        console.log(keyword)

        return (
            <>
                <SearchOption options={options} onChange={setOption} />
                <SearchKeyword onChange={setKeyword} />
                <CustomButton variant="contained" onClick={()=> {
                    setPage(1);
                    navigate('/board/1')
                    onSearch(option, keyword, 1);
                }}>검색</CustomButton>
            </>
        )

    }

function SearchOption({ options, onChange }) {
    const [option, setOption] = useState(options[0]);

    const handleChange = (event) => {
        const option = event.target.value;
        setOption(option);
        onChange(option);
    };

    return (
        <Select
            value={option}
            onChange={handleChange}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
}

    function SearchKeyword({ onChange }) {

        function keywordHandler(option) {
            setKeyword(option);
        }


        const[keyword, setKeyword] = useState('');
        return (
            <TextField
                variant="outlined"
                type="text"
                value={keyword}
                onChange={e => {
                    keywordHandler(e.target.value);
                    onChange(e.target.value);
                }}
            />
        )
    }



export default SearchBar;
