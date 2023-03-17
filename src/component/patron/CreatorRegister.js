import { useState } from "react";
import Api from "../../customApi";

function CreatorRegister() {

    const [profile, setProfile] = useState([{
        about: '',
    }]);

    const [button, setButton] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        Api.post('/creator',
            {
                about: profile.about,
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                about:
                <input value={profile.about}
                       onChange={e => setProfile({...profile, about: e.target.value})}/>
            </label>
            <button type="submit">크리에이터 등록</button>
        </form>
    );

}

export default CreatorRegister;