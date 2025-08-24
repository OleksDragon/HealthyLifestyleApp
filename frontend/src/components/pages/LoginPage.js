import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
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

function HomePage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    // Можливо, варто хешувати пароль на стороні фронтенду, а не бекенду
    const [password, setPassword] = useState('');
    const [emailCorrect, setEmailCorrect] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [error, setError] = useState('');

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    useEffect(() => {
        setEmailCorrect(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setPasswordCorrect(passwordRegex.test(password));
    }, [password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/api/Auth/login",
                { email, password }
            );
            if (response.data.Token) {
                localStorage.setItem("helth-token", response.data.Token); // Зберігання токену
                // Також можна отримати та зберігти інші дані, що прийшли з сервера
                setError('');
                navigate("/userpage");
            }
        } catch (err) {
            console.log("Помилка авторизації: ", err);
            setError(err.response?.data?.message || "Помилка авторизації. Перевірте дані.");
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

    // const handleFacebookLogin = async (data) => {
    //     const response = await axios.post(
    //         process.env.REACT_APP_API_URL + "/api/Auth/login/facebook",
    //         { providerToken: data.access_token }
    //     );
    //     if (response.data.Token) {
    //         localStorage.setItem("helth-token", response.data.Token);
    //         navigate("/userpage");
    //     }
    // }

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
                    ВХІД
                </h2>
                {error && (
                    <span className='incorrect-data'>{error}</span>
                )}
                <form onSubmit={handleLogin}>
                    <input
                        className='input'
                        style={{color: emailCorrect ? 'black' : 'red'}}
                        type="email"
                        placeholder='email'
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
                            onChange={(e) => setPassword(e.target.value)}
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
                            
                        <span className='forgot-password'>забули пароль?</span>
                    </div>

                    <button className='login' type="submit" disabled={!passwordCorrect | !emailCorrect}>Увійти</button>
                    <div className='no-login'>Немає профілю? <span className='register' onClick={() => navigate("/register")}>Реєстрація</span></div>

                </form>

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
                        
                {/* <FacebookLogin
                    appId="YOUR_APP_ID"
                    fields="id,name,email"
                    callback={handleFacebookLogin}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} className='btn-log-another-way'>
                            <FontAwesomeIcon icon={faFacebook} style={{ color: '#C0E307', fontSize: '20px' }} />
                            Продовжити з Facebook
                        </button>
                )}/> */}
            </div>
        </div>
    );
}

export default HomePage;