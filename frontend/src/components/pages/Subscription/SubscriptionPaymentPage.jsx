import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/subscriptionPayment.css";

const SubscriptionPaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subscriptionType = searchParams.get('type');
    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');

    const subscriptionPlans = {
        'basic': { name: 'Базова підписка', price: '5$' },
        'premium': { name: 'Преміум підписка', price: '15$' },
        'family': { name: 'Сімейна підписка', price: '25$' }
    };

    const currentPlan = subscriptionPlans[subscriptionType] || subscriptionPlans.basic;

    const handlePayment = () => {
        // Тут буде логіка оплати
        console.log(`Оплата ${currentPlan.price} за ${currentPlan.name} методом ${selectedPaymentMethod}`);
        // Після успішної оплати перенаправляємо на сторінку успіху
        navigate('/premium/success');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="subscription-payment-page">
            {/* Заголовок сторінки */}
            <div className="payment-header">
                <button className="back-button" onClick={handleBack}>
                    ← Назад
                </button>
                <h1 className="payment-title">Оплата підписки</h1>
            </div>

            {/* Інформація про підписку */}
            <div className="subscription-info-section">
                <div className="subscription-details">
                    <h3 className="subscription-name">{currentPlan.name}</h3>
                    <p className="subscription-duration">/ 30 днів</p>
                </div>
                <div className="subscription-price">
                    {currentPlan.price}
                </div>
            </div>

            {/* Методи оплати */}
            <div className="payment-methods-section">
                <h3 className="section-title">Спосіб оплати</h3>
                
                <div className="payment-methods">
                    <label className={`payment-method ${selectedPaymentMethod === 'visa' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="visa"
                            checked={selectedPaymentMethod === 'visa'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        />
                        <span className="method-name">Visa</span>
                        <div className="method-icon">💳</div>
                    </label>

                    <label className={`payment-method ${selectedPaymentMethod === 'mastercard' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="mastercard"
                            checked={selectedPaymentMethod === 'mastercard'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        />
                        <span className="method-name">Master Card</span>
                        <div className="method-icon">💳</div>
                    </label>

                    <label className={`payment-method ${selectedPaymentMethod === 'applepay' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="applepay"
                            checked={selectedPaymentMethod === 'applepay'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        />
                        <span className="method-name">Apple Pay</span>
                        <div className="method-icon">📱</div>
                    </label>
                </div>
            </div>

            {/* Форма оплати */}
            <div className="payment-form-section">
                <div className="form-row">
                    <div className="form-group">
                        <label>Номер картки</label>
                        <input 
                            type="text" 
                            placeholder="1234 5678 9012 3456"
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-row double">
                    <div className="form-group">
                        <label>Термін дії</label>
                        <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input 
                            type="text" 
                            placeholder="123"
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Ім'я власника картки</label>
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            className="form-input"
                        />
                    </div>
                </div>
            </div>

            {/* Підсумок та кнопка оплати */}
            <div className="payment-summary-section">
                <div className="total-amount">
                    <span className="total-label">Усього до сплати:</span>
                    <span className="total-price">{currentPlan.price}</span>
                </div>
                
                <button 
                    className="pay-now-button"
                    onClick={handlePayment}
                >
                    Оплатити зараз
                </button>
                
                <p className="security-notice">
                    Ваші дані захищені шифруванням
                </p>
            </div>
        </div>
    );
};

export default SubscriptionPaymentPage;