import { useState } from "react";
import axios from 'axios'

function SignUp() {

    const [userInfo, setUserInfo] = useState([{
        email: '', name: '', password: ''
    }]);

    const [button, setButton] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:8080/auth/signup',
            {
                email: userInfo.email, name: userInfo.name, password: userInfo.password
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                이메일:
                <input type="email" value={userInfo.email}
                       onChange={e => setUserInfo({...userInfo, email: e.target.value})}/>
            </label>
            <label>
                닉네임:
                <input type="name" value={userInfo.name}
                       onChange={e => setUserInfo({...userInfo, name: e.target.value})}/>
            </label>
            <br/>
            <label>
                비밀번호:
                <input type="password" value={userInfo.password}
                       onChange={e => setUserInfo({...userInfo, password: e.target.value})}/>
            </label>
            <br/>
            <button type="submit">회원가입</button>
        </form>
    );

}

export default SignUp;