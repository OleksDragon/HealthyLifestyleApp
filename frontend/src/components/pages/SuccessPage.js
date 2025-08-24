import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
import bgb from "../img/bgb.png";
import mgb from "../img/mgb.png";
import sgb from "../img/sgb.png";
import bb from "../img/bb.png";
import nomyfyLogo from "../img/nomyfy.png";
import successIcon from "../icons/success.png";

function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div className='bg'>
            <div className='nomyfy'>
                    <img src={nomyfyLogo}/>
            </div>
            <div className='bgb'>
                    <img src={bgb}/>
            </div>
            <div className='mgb'>
                    <img src={mgb}/>
            </div>
            <div className='sgb'>
                    <img src={sgb}/>
            </div>
            <div className='bb'>
                    <img src={bb}/>
            </div>
            <div className='glass' style={{height: "330px"}}>
                <h2 style={{ fontFamily: '"Kodchasan", sans-serif', fontWeight: 400, fontSize: '40px', marginTop: '30px', marginBottom: '10px' }}>
                    УСПІШНО
                </h2>
                <img src={successIcon} alt="Success" style={{ width: '50px', height: '50px', marginBottom: '20px', marginTop: "10px" }} />
                <br />
                <span className='info'>реєстрація успішна</span>
                <br />
                <button className='continue' onClick={() => navigate("/login")}>Розпочати</button>

            </div>
        </div>
    );
}

export default SuccessPage;