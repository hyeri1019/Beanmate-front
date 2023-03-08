import Api from "../customApi";
import {useState, useEffect, useCallback} from "react";
import { TextField, Grid } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {CustomLoginButton} from "./MyStyle";


function Mypage() {

    const navigate = useNavigate();

    const [myInfo, setMyInfo] = useState({
        email:'', password:''
    });

    const myPage = useCallback(async() => {
        await Api.get('/me')
            .then(res => {
                setMyInfo(res.data)
            })
    })

    useEffect(()=>{
        myPage();
    },[])

    const update = (e) => {
        e.preventDefault();
        Api.patch('/me', {
            email: myInfo.email,
            password: myInfo.password,
        })
            .then( res => {
                    alert('정보 수정이 완료되었습니다.')
                }
            )
    }


    return (
        <>
            <header className="head">
                <a href={`/`} onClick={(e) => {
                    e.preventDefault();
                    navigate('/')}}>
                    <img src={process.env.PUBLIC_URL + '/head.png'} alt="head" /></a>
            </header>

            <form onSubmit={update}>
            <div className="my-info">
                <TextField label="email" type="email" value={myInfo.email}/>
                <TextField label="password" type="password" value={myInfo.password}
                           onChange={e => setMyInfo({...myInfo, password: e.target.value})}/>
                <CustomLoginButton type="submit">수정</CustomLoginButton>
            </div>
            </form>

        </>
    );
};


export default Mypage;