import {useEffect, useState} from "react";
import Api from "../../customApi";

function PatronTierRegister() {
    const [tiers, setTiers] = useState([
        { tier: "", amount: "", benefits: "" },
    ]);

    function handleSubmit(e) {
        e.preventDefault();

        Api.post("/tier", tiers);
    }

    function handleAddTier() {
        setTiers([...tiers, { tier: "", amount: "", benefits: "" }]);
    }

    function handleTierChange(index, field, value) {
        const newTiers = [...tiers];
        newTiers[index][field] = value;
        setTiers(newTiers);
    }

    return (
        <form onSubmit={handleSubmit}>
            {tiers.map((tier, index) => (
                <div key={index}>
                    <label>
                        등급:
                        <input
                            value={tier.tier}
                            onChange={(e) =>
                                handleTierChange(index, "tier", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        금액:
                        <input
                            value={tier.amount}
                            onChange={(e) =>
                                handleTierChange(index, "amount", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        혜택:
                        <input
                            value={tier.benefits}
                            onChange={(e) =>
                                handleTierChange(index, "benefits", e.target.value)
                            }
                        />
                    </label>
                </div>
            ))}
            <button type="button" onClick={handleAddTier}>
                등급 추가
            </button>
            <button type="submit">등급 등록</button>
        </form>
    );
}
export default PatronTierRegister;