import React from 'react';
import activityImg from '../../../../assets/your-health-img/activity.png';
import sleepImg from '../../../../assets/your-health-img/sleep.png';
import nutritionImg from '../../../../assets/your-health-img/nutrition.png';
import nomic from '../../../../assets/health-icons/nomic_with_bandage.svg';
import '../../../styles/yourHealth.css';

const YourHealthPage = () => {
    return (
        <div className='yh-overflow-container'>
            <div className="yh-your-health-page">
            {/* Жовтий заголовний блок з номіком */}
            <div className="yh-health-header-block">
                <div className="yh-health-header-content">
                    <div className="yh-health-header-text">
                        <p className="yh-health-main-title">Твоє здоров'я —</p>
                        <p className="yh-health-main-subtitle"> Твоя суперсила. Вона стоїть на 3х китах</p>
                    </div>
                    <div className="yh-health-header-icon">
                        <img src={nomic} alt="Nomic mascot" className="yh-nomic-mascot" />
                    </div>
                </div>
            </div>

            {/* Блоки у колонці */}
            <div className="yh-health-column-container">
                {/* Блок Активність */}
                <div className="yh-health-info-block a-health-info-block">
                    <div className="yh-health-block-content a-health-block-content">
                        <div className="yh-glass-background"></div>
                        <div className="yh-health-block-image-container a-health-block-image-container">
                            <div className="yh-health-block-image a-health-block-image">
                                <img src={activityImg} alt="Активність" className="a-health-img" />
                            </div>
                        </div>
                        <div className="yh-health-block-text a-health-block-text">
                            <h2 className="yh-health-block-title a-health-block-title">Активність</h2>
                            <p className="yh-health-block-description a-health-block-description">
                                Навіть 15 хвилин на день, вже роблять різницю.
                            </p>
                            <p className="yh-health-block-description a-health-block-description">
                                Прогулянка, скакалка, пілатес – оберіть те, що подобається, і тіло скаже 'дякую'.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Блок Сон */}
                <div className="yh-health-info-block s-health-info-block">
                    <div className="yh-health-block-content s-health-block-content">
                        <div className="yh-glass-background"></div>
                        <div className="yh-health-block-image-container s-health-block-image-container">
                            <div className="yh-health-block-image s-health-block-image">
                                <img src={sleepImg} alt="Сон" className="s-health-img" />
                            </div>
                        </div>
                        <div className="yh-health-block-text s-health-block-text">
                            <h2 className="yh-health-block-title s-health-block-title">Сон</h2>
                            <p className="yh-health-block-description s-health-block-description">
                                Це найважливіше за все!
                            </p>
                            <p className="yh-health-block-description s-health-block-description">
                                Сон – це не лінь, а твій внутрішній зарядний кабель. 7-8 годин якісного відпочинку допомагають тілу відновитися, а мозку – працювати швидко та креативно.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Блок Харчування */}
                <div className="yh-health-info-block n-health-info-block">
                    <div className="yh-health-block-content n-health-block-content">
                        <div className="yh-glass-background"></div>
                        <div className="yh-health-block-image-container n-health-block-image-container">
                            <div className="yh-health-block-image n-health-block-image">
                                <img src={nutritionImg} alt="Харчування" className="n-health-img" />
                            </div>
                        </div>
                        <div className="yh-health-block-text n-health-block-text">
                            <h2 className="yh-health-block-title n-health-block-title">Харчування</h2>
                            <p className="yh-health-block-description n-health-block-description">
                                Їжа - це пальне. Чим вона якісніше, тим краще працює твій 'двигун'.
                            </p>
                            <p className="yh-health-block-description n-health-block-description">
                                Не про дієти, а про баланс: більше овочів, менше стресу з перекусами.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default YourHealthPage;