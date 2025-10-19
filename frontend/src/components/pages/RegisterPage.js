import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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
import arrow from "../icons/ArrowLeft.png";
import '../styles/register.css';
import EmailConfirmation from '../elements/EmailConfirmation';
import successIcon from "../icons/success.png";
import eyeOpen from "../icons/EyeOpen.png";
import eyeClose from "../icons/EyeClose.png";

function Form1({emailCorrect, email, setEmail, password, setPassword, passwordCorrect, show, setShow, setConfirmPassword, toggleForm, t}) {
  return (
    <div className='form-content'>
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
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setConfirmPassword(e.target.value);
                    }}
                    required
                />

                <img 
                    src={show ? eyeOpen : eyeClose} 
                    alt={show ? "Hide" : "Show"} 
                    onClick={() => setShow(!show)} 
                    className='eye'
                />
                <br />
            </div>
        <button className='continue' onClick={toggleForm} disabled={!passwordCorrect | !emailCorrect | email.length === 0 | password.length === 0}>{t("continue")}</button>
    </div>
  );
}

function Form3({t}) {
    const navigate = useNavigate();
    return (
        <div className='form-content'>
            <img src={successIcon} alt="Success" style={{ width: '50px', height: '50px', marginBottom: '20px', marginTop: "10px" }} />
            <br />
            <span className='info'>{t("reg_success")}</span>
            <br />
            <button className='continue' onClick={() => navigate("/login")}>{t("start")}</button>
        </div>
    );
}

function RegisterPage() {
    const { t } = useTranslation();
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
    const navigateTo = useNavigate();
    const [error, setError] = useState('');

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    
    useEffect(() => {
        setEmailCorrect(emailRegex.test(email) || email.length === 0);
    }, [email]);
    
    useEffect(() => {
        setPasswordCorrect(passwordRegex.test(password) || password.length === 0);
    }, [password]);

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
            if (response.status === 200) {
                setError(t("user_exist"));
                return;
            }
            await emailConf.current.handleCreateCode();
        }
        if (activeForm === 2) {
            const isConfirmed = await emailConf.current.handleConfirmEmail();
            if (!isConfirmed) return;
            const isSuccess = await handleRegister();
            if (!(isSuccess)) return;
        }
        setActiveForm(activeForm % 3 + 1);
    };

    const backForm = () => {
        if (activeForm > 1) {
            setActiveForm(activeForm - 1);
        }
        else {
            navigateTo(-1);
        }
    } 

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
                return true;
            }
        } catch (err) {
            if (err.response) {
                setErrorMessage(err.response.data?.Errors?.[0] || "Невідома помилка");
            } else {
                setErrorMessage("Помилка мережі: " + err.message);
            }
        }

        return false;
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

    const handleFacebookLogin = async (data) => {
        console.log("Facebook data:", data);
        const response = await axios.post(
            process.env.REACT_APP_API_URL + "/api/Auth/login/facebook",
            { providerToken: data.accessToken }
        );
        if (response.data.Token) {
            localStorage.setItem("helth-token", response.data.Token);
            localStorage.setItem("user-name", response.data.FullName);
            localStorage.setItem("user-id", response.data.UserId);
            navigate("/userpage");
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
            <div className='glass' style={{height: activeForm !== 3 ? "480px" : "300px", transition: "height 0.8s ease"}}>
                {activeForm !== 3 ? (
                    <div>
                        <div style={{ textAlign: "left", marginTop: "20px" }}>
                            <img src={arrow} alt='arrow back' onClick={() => backForm()} style={{height: "25px", width: "25px", marginLeft: "20px", cursor: "pointer"}} />
                        </div>
                        <h2 style={{ fontFamily: '"Kodchasan", sans-serif', fontWeight: 400, fontSize: '40px', marginTop: '0px', marginBottom: '10px' }}>
                            {t("reg_top")}
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
                        activeForm === 1 ? '' : activeForm === 2 ? 'slide-left' : 'slide-left-2'
                    }`}>
                        <Form1 emailCorrect={emailCorrect} password={password} setPassword={setPassword} email={email} setEmail={setEmail} passwordCorrect={passwordCorrect} show={show} setShow={setShow} setConfirmPassword={setConfirmPassword} toggleForm={toggleForm} t={t}/>
                        <EmailConfirmation email={email} toggleForm={toggleForm} ref={emailConf} t={t}/>
                        <Form3 t={t}/>
                    </div>
                </div>

                {activeForm === 1 && (
                    <div>
                        <div className="with-lines">
                            <span>{t("or")}</span>
                        </div>

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
                )}
            </div>
        </div>
    );
}

export default RegisterPage;