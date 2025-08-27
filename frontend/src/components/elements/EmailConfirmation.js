import axios from 'axios';
import React, {useEffect, useRef, useState, useImperativeHandle, forwardRef, use } from 'react';
import '../styles/emailConfirm.css';

const EmailConfirmation = forwardRef(({ email, toggleForm, t }, ref) => {
    const [sendCodeAgain, setSendCodeAgain] = useState(0);
    const [error, setError] = useState("");
    const codeNums = 5;
    const [code, setCode] = useState(Array(codeNums).fill(""));
    const inputsRef = useRef([]);
    const [send, setSend] = useState(false);

    const handleChange = (e, idx) => {
        const val = e.target.value;

        if (val.length > 1) return;
        if (!/^\d?$/.test(val)) return;

        const newCode = [...code];
        newCode[idx] = val;
        setCode(newCode);

        if (val && idx < codeNums - 1) {
            inputsRef.current[idx + 1].focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            inputsRef.current[idx - 1].focus();
        }
    };

    const handleCreateCode = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/api/Auth/confirmation/" + email
            );

            if (response.status === 200) {
                setError("");
                setSendCodeAgain(59);
            }
        } catch (err) {
            console.error("Помилка при створенні коду підтвердження: ", err);
            setError(t("code_create_error"));
        }
    }

    const  handleConfirmEmail = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/api/Auth/confirmation/" + email + "/" + code.join('')
            );

            if (response.status === 200) {
                setError("");
                return true;
            }
        } catch (err) {
            setError(t("code_error"));
            return false;
        }
    }

    useImperativeHandle(ref, () => ({
        handleCreateCode,
        handleConfirmEmail
    }))

    useEffect(() => {
        if (sendCodeAgain === 0) return;

        const timer = setInterval(() => {
            setSendCodeAgain((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [sendCodeAgain]);

    useEffect(() => {
        if (code.every(num => num !== "")) {
            setSend(true);
        }
        else {
            setSend(false);
        }
    }, [code]);

    return (
        <div className="form-content">
            <div className='info right' style={{ marginTop: '10px' }}>
                <span>{t("check_email")}</span>
                <br />
                <span>{t("code_send")} <span className='info-value'>{email}</span></span>
            </div>
            <div className='code-inputs'>
                {code.map((digit, idx) => (
                    <input  
                        key={idx}
                        ref={(el) => (inputsRef.current[idx] = el)}
                        value={digit}
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        maxLength={1}
                        className='code-input'
                    />
                ))}
            </div>
            <div className='info'>
                {sendCodeAgain === 0 ? (
                    <button className='info' onClick={handleCreateCode}>{t("send_code")}</button>
                ) : (
                    <span>{t("send_code_again")}{" "}
                        <span className='info-value'>
                            00:{sendCodeAgain < 10 ? "0" + sendCodeAgain : sendCodeAgain}
                        </span>
                    </span>
                )}
            </div>
            {error && <div className='error-message'>{error}</div>}
            <button className='continue' onClick={toggleForm} disabled={!send}>{t("confirm")}</button>
        </div>
    );
})

export default EmailConfirmation;