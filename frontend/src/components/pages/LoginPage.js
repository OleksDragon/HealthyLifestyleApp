import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../styles/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import telegramIcon from "../icons/Telegram.png";
import bgb from "../img/bgb.png";
import mgb from "../img/mgb.png";
import sgb from "../img/sgb.png";
import bb from "../img/bb.png";
import nomyfyLogo from "../img/nomyfy.png";
import eyeOpen from "../icons/EyeOpen.png";
import eyeClose from "../icons/EyeClose.png";

function LoginPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');
    const [emailCorrect, setEmailCorrect] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [error, setError] = useState('');

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    useEffect(() => {
        setEmailCorrect(emailRegex.test(email) || email.length === 0);
    }, [email]);

    useEffect(() => {
        setPasswordCorrect(passwordRegex.test(password) || password.length === 0);
    }, [password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/api/Auth/login",
                { email, password }
            );
            if (response.data.Token) {
                console.log("Login successful, token:", response.data);
                localStorage.setItem("helth-token", response.data.Token);
                localStorage.setItem("user-name", response.data.FullName);
                localStorage.setItem("user-id", response.data.UserId);
                // Також можна отримати та зберігти інші дані, що прийшли з сервера

                try {
                    const subscriptionResponse = await axios.get(
                        process.env.REACT_APP_API_URL + `/api/Subscription/check/${response.data.UserId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${response.data.Token}`
                            }
                        }
                    );
                    
                    if (subscriptionResponse.data && typeof subscriptionResponse.data === 'object') {
                        const subscriptionData = {
                            SId: subscriptionResponse.data.Id,
                            OwnerId: subscriptionResponse.data.UserId,
                            Type: subscriptionResponse.data.Type,
                            EndDate: subscriptionResponse.data.EndDate,
                            IsFamilyMember: subscriptionResponse.data.IsFamilyMember
                        };
                        
                        localStorage.setItem("Subscription", JSON.stringify(subscriptionData));
                        console.log("Subscription data saved:", subscriptionData);
                    } else {
                        localStorage.removeItem("Subscription");
                        console.log("No active subscription found");
                    }
                } catch (subscriptionError) {
                    console.log("Помилка при перевірці підписки: ", subscriptionError);
                }

                setError('');
                navigate("/dashboard");
            }
        } catch (err) {
            console.log("Помилка авторизації: ", err);
            setError(t("auth_fail"));
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
                    localStorage.setItem("user-name", response.data.FullName);
                    localStorage.setItem("user-id", response.data.UserId);
                    navigate("/dashboard");
                }
            } catch (err) {
                console.log("Помилка авторизації через Google: ", err);
            }
        },
        onError: (error) => {
            console.error("Google login failed:", error);
        }
    })

    const handleFacebookLogin = async (data) => {
        const response = await axios.post(
            process.env.REACT_APP_API_URL + "/api/Auth/login/facebook",
            { providerToken: data.accessToken }
        );
        if (response.data.Token) {
            localStorage.setItem("helth-token", response.data.Token);
            localStorage.setItem("user-name", response.data.FullName);
            localStorage.setItem("user-id", response.data.UserId);
            navigate("/dashboard");
        }
    }

    useEffect(() => {
        localStorage.removeItem("helth-token");
        localStorage.removeItem("user-name");
        localStorage.removeItem("user-id");
    }, [])

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
            <div className='glass'>
                <h2 style={{ fontFamily: '"Kodchasan", sans-serif', fontWeight: 400, fontSize: '40px', marginTop: '30px', marginBottom: '10px' }}>
                    {t("login1")}
                </h2>
                {error && (
                    <span className='incorrect-data'>{error}</span>
                )}
                <form onSubmit={handleLogin}>
                    <input
                        className='input'
                        style={{color: emailCorrect ? 'white' : 'red', border: emailCorrect ? '' : '2px solid red'}}
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
                            placeholder={t("password")}
                            style={{color: passwordCorrect ? 'white' : 'red', border: passwordCorrect ? '' : '2px solid red'}}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <img
                            src={show ? eyeOpen : eyeClose} 
                            alt={show ? "Hide" : "Show"} 
                            onClick={() => setShow(!show)} 
                            className='eye'
                        />
                        <br />
                            
                        <span className='forgot-password' onClick={() => navigate("/restore")}>{t("forgot_password")}</span>
                    </div>

                    <button className='login' type="submit" disabled={!passwordCorrect | !emailCorrect | password.length === 0 | email.length === 0}>{t("login2")}</button>
                    <div className='no-login'>{t("no_profile")} <span className='register' onClick={() => navigate("/register")}>{t("register2")}</span></div>

                </form>

                <div className='social-btns'>
                    <FacebookLogin
                        // test id (and use env vars later)
                        appId="789141780360116"
                        autoLoad={false}
                        fields="id,name,email"
                        callback={handleFacebookLogin}
                        render={(renderProps) => (
                        <button
                            className="btn-log-another-way"
                            onClick={renderProps.onClick}
                        >
                            <FontAwesomeIcon
                            icon={faFacebookF}
                            style={{ color: "#0066C3", fontSize: "20px" }}
                            />
                        </button>
                        )}
                    />

                    <button className='btn-log-another-way' onClick={handleGoogleLogin}>
                        <FontAwesomeIcon icon={faGoogle} style={{ color: '#0066C3', fontSize: '20px' }} />
                    </button>

                    {/* <button className='btn-log-another-way'>
                        <img src={telegramIcon} alt="Telegram" style={{ width: '16x', height: '16px', marginLeft: '-2px'}} />
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;