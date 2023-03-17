import {useEffect, useState} from "react";
import Api from "../../customApi";
import {Paper, Typography} from "@mui/material";
import "../css/Tier.css"
import {CustomButton} from "../MyStyle";
import {useNavigate} from "react-router-dom";

function ShowPatronTier({creator}) {

    let navigate = useNavigate();
    const [tiers, setTiers] = useState([
        { tier: '', amount: '', benefits: '' },
    ]);

    useEffect(()=> {
        Api.get('/tier?creator='+creator)
            .then(res => {
                setTiers(res.data);
            })
    },[creator])

    return (
        <div>
            <Paper variant="outlined" className="tier-container">
                <Typography variant="h4" align="center" gutterBottom>
                    Select a Membership Level
                </Typography>
                <div className="tier-wrapper">
                    {tiers.map((tier, index) => (
                        <div key={index} className="tier">
                            <p className="tier-title">{tier.tier}</p>
                            <p className="tier-amount">금액 {tier.amount}</p>
                            <p className="tier-benefits">혜택 {tier.benefits}</p>
                            <CustomButton onClick={()=>{
                            navigate('/payment/'+creator)}
                            }>Join</CustomButton>
                        </div>
                    ))}
                </div>
            </Paper>

        </div>
    );
}

export default ShowPatronTier;