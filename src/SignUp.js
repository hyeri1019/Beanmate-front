import { useState } from "react";
import axios from 'axios'

function SignUp() {

    const [userInfo, setUserInfo] = useState([{
        email: '', password: ''
    }]);

    const [button, setButton] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(userInfo.password, userInfo.email);

        axios.post('http://localhost:8080/auth/signup',
            {
                email: userInfo.email, password: userInfo.password
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={userInfo.email}
                       onChange={e => setUserInfo({...userInfo, email: e.target.value})}/>
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