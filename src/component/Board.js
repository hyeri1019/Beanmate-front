import {useState, useEffect, useCallback} from "react";
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import './Board.css'
import SearchBar from './Search.js'


function Board() {
    let {pages} = useParams();
    let navigate = useNavigate();

    const options = ['title', 'content', 'writer'];
    const [option, setOption] = useState();
    const [keyword, setKeyword] = useState();
    const [page, setPage] = useState(0);

    const [boardList, setBoardList] = useState([{
        pno: '', title: '', writer: '', viewCnt: ''
    }])
    const [paging, setPaging] = useState([{
        totalPages: 0, startPage: 0, endPage: 0, hasNext: false, hasPrev: false, prevIndex: 0, nextIndex: 0
    }])

    const arr = [];
        for (let i = paging.startPage; i <= paging.endPage; i++) {
            arr.push(i);
        }


    const handleSearch = useCallback(async (option, keyword, page) => {
        setOption(option)
        setKeyword(keyword)
        setPage(page)

       await axios.get('http://localhost:8080/boards?page='+page+'&option='+option+'&keyword='+keyword)
             .then(result => { setPaging(result.data.pagination)
                             setBoardList(result.data.posts) })
                .catch(error => console.log('board error'))

    },[page])

    useEffect(() => {
        handleSearch(option, keyword, page);
    }, [option, keyword, page]);



    return (
        <div className="board">

            <div className="SearchBar">
                <SearchBar options={options} page={page} setPage={setPage} onSearch={handleSearch}/>
            </div>

            <div className="main-bg">
                <button onClick={()=>{
                    navigate('/board')
                }}>글쓰기</button>

        <table className="boardList">
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>조회수</th>
            </tr>
            <tbody>
            {boardList.map((post, i)=> {
                return (
                    <tr key={post.i}>
                        <td>{post.pno}</td>
                        <td onClick={()=>{
                            navigate('/board/'+pages+'/'+post.pno)
                        }}>{post.title}</td>
                        <td>{post.writer}</td>
                        <td>{post.viewCnt}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>

            <div className="pagination">
                <button onClick={()=>{
                    setPage(1)
                    navigate('/board/'+1)
                }}>
                    &lt;&lt;
                </button>

                <button onClick={()=>{
                    if(paging.hasNext!==false){
                        setPage(paging.prevIndex);
                        navigate('/board/'+paging.prevIndex)
                    }

                }}>
                    &lt;
                </button>


                {arr.map((a,i)=>{
                    return(
                        <button onClick={async ()=>{
                            /* 검색결과를 유지하며 페이징하기 위해 option, keyword 전달
                               a : 클릭한 page 값 */
                            setPage(a);
                            await handleSearch(option,keyword,page);
                            navigate('/board/'+a)
                        }}>
                            {a}
                        </button>
                    )
                })}

                <button onClick={()=>{
                    if(paging.hasPrev!==false) {
                        setPage(paging.nextIndex);
                        navigate('/board/' + paging.nextIndex)
                    }
                }}>
                    &gt;
                </button>

                <button onClick={()=>{
                    setPage(paging.totalPages);
                    navigate('/board/'+paging.totalPages)
                }}>
                    &gt;&gt;
                </button>

            </div>
            </div>
        </div>


    )
}

export default Board;