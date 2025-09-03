import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../styles/register.css';
import bgb from "../img/bgb.png";
import mgb from "../img/mgb.png";
import sgb from "../img/sgb.png";
import bb from "../img/bb.png";
import nomyfyLogo from "../img/nomyfy.png";
import EmailConfirmation from '../elements/EmailConfirmation';
import arrow from "../icons/ArrowLeft.png";
import successIcon from "../icons/success.png";
import eyeOpen from "../icons/EyeOpen.png";
import eyeClose from "../icons/EyeClose.png";

function Form1({emailCorrect, email, setEmail, toggleForm, t}) {
    return (
        <div className='form-content'>
            <div className='info right' style={{ marginTop: '15px', marginBottom: "10px" }}>
                <span>{t("forgot_password")}</span>
                <br />
                <span>{t("enter_email_to_restore")}</span>
            </div>
            <input
                        className='input'
                        style={{color: emailCorrect ? 'white' : 'red', border: emailCorrect ? '' : '2px solid red'}}
                        type="email"
                        placeholder='e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
            <br />
            <button className='login' type="submit" disabled={!emailCorrect | email.length === 0} onClick={() => toggleForm()}>{t("send_code2")}</button>
        </div>
    );
}

function Form3({password, setPassword, passwordConf, setPasswordConf, passwordCorrect, passwordCorrectConf, toggleForm, t}) {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    return (
        <div className='form-content'>
            <div className='info right' style={{ marginTop: '15px', marginBottom: "10px" }}>
                <span>{t("reset_password")}</span>
            </div>
            <div style={{ position: "relative", width: "100%" }}>
                <input
                    className='input'
                    type={show1 ? "text" : "password"}
                    placeholder={t("password_new")}
                    style={{color: passwordCorrect ? 'white' : 'red', border: passwordCorrect ? '' : '2px solid red'}}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />
            
                <img 
                    src={show1 ? eyeOpen : eyeClose} 
                    alt={show1 ? "Hide" : "Show"} 
                    onClick={() => setShow1(!show1)} 
                    className='eye'
                />
                <br />
            </div>

            <div style={{ position: "relative", width: "100%" }}>
                <input
                    className='input'
                    type={show2 ? "text" : "password"}
                    placeholder={t("password_confirm")}
                    style={{color: passwordCorrectConf ? 'white' : 'red', border: passwordCorrectConf ? '' : '2px solid red'}}
                    value={passwordConf}
                    onChange={(e) => {
                        setPasswordConf(e.target.value);
                    }}
                    required
                />
            
                <img 
                    src={show2 ? eyeOpen : eyeClose} 
                    alt={show2 ? "Hide" : "Show"} 
                    onClick={() => setShow2(!show2)} 
                    className='eye'
                />
                <br />
            </div>

            <button className='login' type="submit" disabled={!passwordCorrect | password.length === 0 | !passwordCorrectConf | passwordConf.length === 0 | password !== passwordConf} onClick={() => toggleForm()}>{t("update_password")}</button>
        </div>
    );
}

function Form4({t}) {
    const navigate = useNavigate();
    return (
        <div className='form-content'>
            <img src={successIcon} alt="Success" style={{ width: '50px', height: '50px', marginBottom: '20px', marginTop: "10px" }} />
            <br />
            <span className='info'>{t("password_update_success")}</span>
            <br />
            <button className='continue' onClick={() => navigate("/login")}>{t("to_login")}</button>
        </div>
    );
}

function RestorePasswordPage() {
    const { t } = useTranslation();
    const navigateTo = useNavigate();
    const [email, setEmail] = useState('');
    // Можливо, варто хешувати пароль на стороні фронтенду, а не бекенду
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [emailCorrect, setEmailCorrect] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [passwordCorrectConf, setPasswordCorrectConf] = useState(false);
    const [error, setError] = useState('');
    const [activeForm, setActiveForm] = useState(1);
    const emailConf = useRef();

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    useEffect(() => {
        setEmailCorrect(emailRegex.test(email) || email.length === 0);
    }, [email]);

    useEffect(() => {
        setPasswordCorrect(passwordRegex.test(password) || password.length === 0);
    }, [password]);

    useEffect(() => {
        setPasswordCorrectConf(passwordRegex.test(passwordConf) || passwordConf.length === 0);
    }, [passwordConf]);

    const toggleForm = async () => {
        setError('');
        if (activeForm === 1) {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/api/Auth/exist/" + email,
                {},
                {
                    validateStatus: () => true
                }
            );
            if (response.status !== 200) {
                setError(t("user_not_exist"));
                return;
            }
            await emailConf.current.handleCreateCode();
        }
        if (activeForm === 2) {
            const isConfirmed = await emailConf.current.handleConfirmEmail();
            if (!isConfirmed) return;
        }
        if (activeForm === 3) {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_URL + "/api/Auth/change/password",
                    { email, password }
                );
                if (response.status !== 200) {
                    return;
                }
            } catch (err) {
                setError(t("reset_password_error"));
                return;
            }
        }
        setActiveForm(activeForm % 4 + 1);
    };

    const backForm = () => {
        if (activeForm > 1) {
            setActiveForm(activeForm - 1);
        }
        else {
            navigateTo(-1);
        }
    } 

    return (
        <div className='bg'>
            <div className='nomyfy'>
                    <img src={nomyfyLogo} alt='nomyfy'/>
            </div>
            <div className='bgb'>
                    <img src={bgb} alt='green ball'/>
            </div>
            <div className='mgb'>
                    <img src={mgb} alt='green ball'/>
            </div>
            <div className='sgb'>
                    <img src={sgb} alt='green ball'/>
            </div>
            <div className='bb'>
                    <img src={bb} alt='blue ball'/>
            </div>
            <div className='glass' style={{height: activeForm !== 4 ? "480px" : "300px", transition: "height 0.8s ease"}}>
                {activeForm !== 4 ? (
                    <div>
                        <div style={{ textAlign: "left", marginTop: "20px" }}>
                            <img src={arrow} alt='arrow back' onClick={() => backForm()} style={{height: "25px", width: "25px", marginLeft: "20px", cursor: "pointer"}} />
                        </div>
                        <h2 style={{ fontFamily: '"Kodchasan", sans-serif', fontWeight: 400, fontSize: '40px', marginTop: '0px', marginBottom: '10px' }}>
                            {t("login1")}
                        </h2>
                    </div>
                ) : (
                    <h2 style={{ fontFamily: '"Kodchasan", sans-serif', fontWeight: 400, fontSize: '40px', marginBottom: '10px', marginTop: "30px" }}>
                        {t("success")}
                    </h2>
                )}
                {error && (
                    <span className='incorrect-data'>{error}</span>
                )}
                <div className="form-wrapper">
                   <div className={`forms-container ${
                        activeForm === 1 ? '' : activeForm === 2 ? 'slide-left' : activeForm ===3 ? 'slide-left-2' : `slide-left-3`
                    }`}>
                        <Form1 emailCorrect={emailCorrect} email={email} setEmail={setEmail} toggleForm={toggleForm} t={t}/>
                        <EmailConfirmation email={email} toggleForm={toggleForm} ref={emailConf} t={t}/>
                        <Form3 password={password} setPassword={setPassword} passwordConf={passwordConf} setPasswordConf={setPasswordConf} passwordCorrect={passwordCorrect} passwordCorrectConf={passwordCorrectConf} toggleForm={toggleForm} t={t}/>
                        <Form4 t={t}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestorePasswordPage;