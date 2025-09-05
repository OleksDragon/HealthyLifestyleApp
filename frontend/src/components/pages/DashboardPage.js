import { useTranslation } from 'react-i18next';
import '../styles/dashboard.css';
import StepsWidget from './../elements/Dashboard/StepsWidget';
import KkalWidget from './../elements/Dashboard/KkalWidget';
import SleepWidget from './../elements/Dashboard/SleepWidget';
import WaterWidget from '../elements/Dashboard/WaterWidget';
import testDoctor from '../img/TestDoctor.png';
import { useState } from 'react';

function DashboardPage() {
    const { t } = useTranslation();
    const username = localStorage.getItem("user-name");
    const [topic, setTopic] = useState("Секрети якісного сну");
    const [doctorName, setDoctorName] = useState("Марія Кондратюк");
    const [profession, setProfession] = useState("Кандидат медичних наук");
    const [lecture, setLecture] = useState("Сон — це не просто відпочинок, а ключовий фактор для здоров’я та гарного самопочуття. Недосипання впливає на настрій, концентрацію та імунітет, а регулярний якісний сон допомагає відновити енергію і підтримувати організм у формі. Дотримуйтеся режиму сну: лягайте спати і прокидайтеся приблизно в один і той самий час щодня, це допомагає налаштувати внутрішній біологічний годинник і покращує якість сну. \nСтворіть комфортне середовище: темна, тиха і прохолодна кімната сприяє глибокому сну, уникайте яскравого світла та шуму перед сном, а електронні пристрої краще вимикати за 30–60 хвилин до відпочинку. Уникайте кофеїну та важкої їжі ввечері, бо напої з кофеїном і важка їжа перед сном можуть ускладнити засинання та знизити якість сну; легка вечеря та трав’яний чай допоможуть організму розслабитися\.\nРегулярні фізичні вправи сприяють швидшому засинанню та глибшому сну, але уникайте інтенсивних тренувань безпосередньо перед нічним відпочинком. Медитація, дихальні вправи або легке читання допомагають знизити стрес і налаштувати організм на відпочинок\.\nНавіть дотримання кількох із цих порад щодня може значно покращити якість вашого сну, підвищити енергію та загальний тонус організму. Пам’ятайте, що здоровий сон — це інвестиція у ваше фізичне та психічне благополуччя.");

    return (
        <div className="dashboard">
            <div className="welcome-message">
                <h2>{t("welcome")}
                {username && `, ${username}`}
                !
                </h2>
                <h6 style={{marginTop: "10px"}}>{t("health_one_place")}</h6>
            </div>
            <div className='widgets'>
                <StepsWidget className="steps-widget"/>
                <KkalWidget className="kkal-widget"/>
                <SleepWidget className="sleep-widget"/>
                <WaterWidget className="water-widget"/>
                <div className='remind-widget glass-card'>
                    <h3>Reminders</h3>
                </div>
                <div className='video-widget glass-card'>
                    <h3>Exercise Videos</h3>
                </div>
                {/* Translate all tips automatically (use AI) */}
                <div className='tips-widget glass-card'>
                    <div className='tip-author'>
                        <h3>{topic}</h3>
                        <div className='tip-author-info'>
                            <img src={testDoctor} alt='foto'></img>
                            <div>
                                <h5 className='tip-author-name'>{doctorName}</h5>
                                <h5 className='tip-author-prof'>{profession}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='lecture'>
                        {lecture}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;