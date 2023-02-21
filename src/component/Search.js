import {useState} from "react";
import {useNavigate} from "react-router-dom";



    function SearchBar({setPage, page, options, onSearch}) {

        let navigate = useNavigate();

        const [option,setOption] = useState(options[0]);
        const [keyword, setKeyword] = useState('');
        console.log(option)
        console.log(keyword)

        return (
            <>
                <SearchOption options={options} onChange={setOption} />
                <SearchKeyword onChange={setKeyword} />
                <button onClick={()=> {
                    setPage(1);
                    onSearch(option, keyword, page);
                }}>검색</button>
            </>
        )

    }


    function SearchOption({options, onChange}) {

        function optionHandler(option) {
            setOption(option);
        }

        /*  options[0] : 기본 옵션 '제목' */
        const [option, setOption] = useState(options[0]);
        console.log(option)
        return (
            <select value={option} onChange={e => {
                optionHandler(e.target.value);
                onChange(e.target.value);
            }}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

        );
    }

    function SearchKeyword({ onChange }) {

        function keywordHandler(option) {
            setKeyword(option);
        }


        const[keyword, setKeyword] = useState('');
        console.log(keyword)
        return (
            <input
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
