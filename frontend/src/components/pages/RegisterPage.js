import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFacebookF, faGoogle, faTelegram, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import telegramIcon from "../icons/Telegram.png";
import bgb from "../img/bgb.png";
import mgb from "../img/mgb.png";
import sgb from "../img/sgb.png";
import bb from "../img/bb.png";
import nomyfyLogo from "../img/nomyfy.png";
import '../styles/register.css';
import EmailConfirmation from '../elements/EmailConfirmation';

function Form1({emailCorrect, email, setEmail, password, setPassword, passwordCorrect, show, setShow, setConfirmPassword}) {
  return (
    <div className='form-content'>
        <input
            className='input'
            style={{color: emailCorrect ? 'black' : 'red'}}
            type="email"
            placeholder='e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />

            <div style={{ position: "relative", width: "100%" }}>
                <input
                    className='input'
                    type={show ? "text" : "password"}
                    placeholder='пароль'
                    style={{color: passwordCorrect ? 'black' : 'red'}}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setConfirmPassword(e.target.value);
                    }}
                    required
                />

            <button
                type="button"
                onClick={() => setShow(!show)}
                className='eye'
                aria-label={show ? "Скрыть пароль" : "Показать пароль"}
            >
                <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
            </button>
            <br />
        </div>
    </div>
  );
}

function HomePage() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [gender, setGender] = useState(null);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [emailCorrect, setEmailCorrect] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [show, setShow] = useState(false);
    const [activeForm, setActiveForm] = useState(1);
    const emailConf = useRef();

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    
    useEffect(() => {
        setEmailCorrect(emailRegex.test(email));
    }, [email]);
    
    useEffect(() => {
        setPasswordCorrect(passwordRegex.test(password));
    }, [password]);

    const toggleForm = async () => {
        if (activeForm === 2) {
            const isConfirmed = await emailConf.current.handleConfirmEmail();
            if (!isConfirmed) return;
        }
        setActiveForm((activeForm + 1) % 3 + 1);
        if (activeForm === 3) {
            handleRegister();
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Паролі не збігаються!");
            return;
        }

        try {
            const response = await axios.post(
                // Пізніше можна винести як змінну та використовувати .env
                process.env.REACT_APP_API_URL + "/api/Auth/register",
                { fullName, email, dateOfBirth, gender, weight, height, password, confirmPassword }
            );

            if (response.status === 200) {
                setErrorMessage("");
                navigate("/success");
            }
        } catch (err) {
            if (err.response) {
                setErrorMessage(err.response.data?.Errors?.[0] || "Невідома помилка");
            } else {
                setErrorMessage("Помилка мережі: " + err.message);
            }
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (tokenResponse) => {
            console.log("Google tokenResponse:", tokenResponse);
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_URL + "/api/Auth/login/google",
                    { providerToken: tokenResponse.code }
                );
                if (response.data.Token) {
                    localStorage.setItem("helth-token", response.data.Token);
                    navigate("/userpage");
                }
            } catch (err) {
                console.log("Помилка авторизації через Google: ", err);
            }
        },
        onError: (error) => {
            console.error("Google login failed:", error);
        }
    })

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
            <div className='glass'>
                <h2 style={{ fontFamily: '"Kodchasan", sans-serif', fontWeight: 400, fontSize: '40px', marginTop: '30px', marginBottom: '10px' }}>
                    РЕЄСТРАЦІЯ
                </h2>

                <div className="form-wrapper">
                    <div className={`forms-container ${activeForm === 1 ? '' : 'slide-left'}`}>
                        <Form1 emailCorrect={emailCorrect} password={password} setPassword={setPassword} email={email} setEmail={setEmail} passwordCorrect={passwordCorrect} show={show} setShow={setShow} setConfirmPassword={setConfirmPassword}/>
                        <EmailConfirmation email={email} ref={emailConf} />
                    </div>
                    <button className='continue' onClick={toggleForm} disabled={!passwordCorrect | !emailCorrect}>Продовжити</button>
                </div>

                {activeForm === 1 && (
                    <div>
                        <div className="with-lines">
                            <span>або</span>
                        </div>

                        <div className='social-btns'>
                            <button className='btn-log-another-way'>
                                <FontAwesomeIcon icon={faFacebookF} style={{ color: '#0066C3', fontSize: '20px' }} />
                            </button>

                            <button className='btn-log-another-way' onClick={handleGoogleLogin}>
                                <FontAwesomeIcon icon={faGoogle} style={{ color: '#0066C3', fontSize: '20px' }} />
                            </button>

                            <button className='btn-log-another-way'>
                                <img src={telegramIcon} alt="Telegram" style={{ width: '16x', height: '16px', marginLeft: '-2px'}} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;