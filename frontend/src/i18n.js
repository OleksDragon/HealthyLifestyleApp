import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          about_platform: "About the platform",
          functions: "Functions",
          prices: "Prices",
          marketplace: "Marketplace",
          questions: "Questions",
          language_selector: "Language",
          balance_action: "Balance in action",
          less_chaos: "LESS CHAOS –",
          more_energy: "MORE ENERGY.",
          healthy_lifestyle: "YOUR HEALTHY LIFESTYLE IN ONE PLACE.",
          register: "Register",
          description_part1:
            "— a platform that helps you take care of yourself easily and with a smile.",
          description_part2:
            "Track your nutrition and workouts, monitor your health, and get support from specialists.",
          description_part3:
            "Find useful products and share motivation with the community.",
          description_part4:
            "Together with Nomyfy, you form healthy habits and feel better every day.",
          specialist_title_line1: "YOUR TALENT IS NEEDED HERE!",
          specialist_title_line2: "WE ARE LOOKING FOR PROS LIKE YOU!",
          specialist_text_line1:
            "If you are a specialist in psychology, nutrition, or you are a trainer,",
          specialist_text_line2:
            "let's make this world a better place. Work with professionals.",
          specialist_text_line3: "You belong with us!",
          become_specialist: "Become a specialist",
          marketplace_title: "MARKETPLACE OF HEALTHY SOLUTIONS.",
          marketplace_subtitle:
            "Everything that helps you live a healthy life collected in one place.",
          marketplace_button: "Marketplace",
          faq_title: "Frequently Asked Questions",
          faq_q1_title: "What is NOMYFY?",
          faq_q1_answer:
            "NOMYFY is an individual therapy for emotional burnout.",
          faq_q2_title: "Who is NOMYFY for?",
          faq_q2_answer:
            "For those who are looking for ways to improve their mental health.",
          faq_q3_title: "How is NOMYFY useful?",
          faq_q3_answer:
            "NOMYFY helps you organize your life, starting with yourself.",
          faq_q4_title: "Can I use the services for free?",
          faq_q4_answer:
            "Yes, we have free options, but most services are paid.",
          faq_q5_title: "How to start using it?",
          faq_q5_answer:
            "You need to register on our platform and choose a service.",
          faq_q6_title: "How to become a NOMYFY partner?",
          faq_q6_answer:
            "Leave a request on our website, and we will contact you.",

          // --- Переклади для Footer ---
          specialists: "Specialists",
          privacy_policy: "Privacy Policy",
          support_service: "Support Service",
          copyright: "© Nomyfy {{year}}.",

          // --- Переклади для входу ---
          login1: "LOGIN",
          password: "password",
          forgot_password: "forgot password?",
          login2: "Login",
          no_profile: "No profile? ",
          register2: "Register",

          // --- Переклади для реєстрації ---
          continue: "Continue",
          reg_success: "registration successful",
          start: "Start",
          reg_top: "REGISTRATION",
          success: "SUCCESS",
          or: "or",
          code_create_error: "Error creating confirmation code",
          code_error: "Incorrect confirmation code",
          check_email: "please check your e-mail",
          code_send: "the code has been sent to ",
          send_code: "send code ",
          send_code_again: "the code will be sent again in ",
          confirm: "Confirm",
          password_new: "new password",

          // --- Переклади для відновлення паролю ---
          enter_email_to_restore: "enter e-main to send the code",
          send_code2: "Send code",
          reset_password: "password reset",
          password_confirm: "password confirmation",
          update_password: "Update password",
          password_update_success: "password successfully updated",
          to_login: "Return to login",
          user_not_exeist: "User with the specified email does not exist",
          reset_password_error: "Error updating password. Please try again.",
          user_exist: "User with the specified email already exists",
          auth_fail: "Authentication error. Check your data",

          // Переклади для Menu
          dashboard: "Home",
          profile: "Profile",
          health: "Health",
          eating: "Eating",
          workout: "Workout",
          social: "Social",
          marketplace_menu: "Marketplace",
          premium: "Premium",
          exit: "Exit",
          search_placeholder: "Search",
          welcome: "Hi",
          health_one_place: "Your health in one place!",
          mental: "Mental health",

           // Переклади для віджетів дашборду
          kkal: "Calories",
          current_week: "Current week",
          water: "Water",
          L: "L",
          sleep: "Sleep",
          H: "H",
          bmi: "BMI",
          bmi_requires: "Fill in the information about height and weight",

          // --- Переклади для профілю користувача ---
          p_error_upadate: "Failed to update profile. Please fill in all fields.",
          p_male: "Male",
          p_female: "Female",
          p_other: "Other",
          p_success_title: "Thank you for the information!",
          p_success_subtitle: "Now our tips will be even better!",
          p_btn_home: "Home",
          p_about_placeholder: "About me...",
          p_first_name_placeholder: "First name",
          p_last_name_placeholder: "Last name",
          p_gender_placeholder: "Gender",
          p_your_achievements: "Your achievements",
          p_your_purchases: "Your purchases",
          p_birth_date_placeholder: "Date of birth",
          p_height_placeholder: "Height, cm",
          p_height_suffix: "cm",
          p_weight_placeholder: "Weight, kg",
          p_weight_suffix: "kg",
          p_country_placeholder: "Country",
          p_city_placeholder: "City",
          p_street_placeholder: "Street",
          p_loading_cities: "Loading cities...",
          p_loading_streets: "Loading streets...",
          p_btn_save: "Save",
          p_btn_saving: "Saving...",

          // --- Переклади для кастомного календаря (день народження користувача) ---
          p_january: "january",
          p_february: "february",
          p_march: "march",
          p_april: "april",
          p_may: "may",
          p_june: "june",
          p_july: "july",
          p_august: "august",
          p_september: "september",
          p_october: "october",
          p_november: "november",
          p_december: "december",
          p_monday: "mo",
          p_tuesday: "tu",
          p_wednesday: "we",
          p_thursday: "th",
          p_friday: "fr",
          p_saturday: "sa",
          p_sunday: "su",

          // --- Переклади для країн ---
          p_ukrain_country: "Ukraine",
          p_great_britain_country: "United Kingdom",
          p_germany_country: "Germany",
          p_france_country: "France",
          p_spain_country: "Spain",
          p_usa_country: "USA",

          // --- Переклади для календара місячних
          last_cycle_first_day: "1st day of last cycle"
        },
      },
      uk: {
        translation: {
          about_platform: "Про платформу",
          functions: "Функції",
          prices: "Ціни",
          marketplace: "Маркетплейс",
          questions: "Питання",
          language_selector: "Мова",
          balance_action: "Баланс у дії",
          less_chaos: "МЕНШЕ ХАОСУ –",
          more_energy: "БІЛЬШЕ ЕНЕРГІЇ.",
          healthy_lifestyle: "ТВІЙ ЗДОРОВИЙ ЛАЙФСТАЙЛ В ОДНОМУ МІСЦІ.",
          register: "Зареєструватись",
          description_part1:
            "— це платформа, що допомагає дбати про себе легко та з усмішкою.",
          description_part2:
            "Відстежуй харчування й тренування, слідкуй за здоров’ям і отримуй підтримку спеціалістів.",
          description_part3:
            "Знаходь корисні товари та ділися мотивацією зі спільнотою.",
          description_part4:
            "Разом із Nomyfy ти крок за кроком формуєш здорові звички та почуваєшся краще щодня.",
          specialist_title_line1: "ТВІЙ ТАЛАНТ ТУТ ПОТРІБЕН!",
          specialist_title_line2: "МИ ШУКАЄМО ПРОФІ ЯК ТИ!",
          specialist_text_line1:
            "Якщо ти спеціаліст в психології, нутриціології або ти тренер,",
          specialist_text_line2:
            "давай робити цей світ краще. Працювати з професіоналами.",
          specialist_text_line3: "Тобі до нас!",
          become_specialist: "Стати фахівцем",
          marketplace_title: "МАРКЕТПЛЕЙС ЗДОРОВИХ РІШЕНЬ.",
          marketplace_subtitle:
            "Все, що допомагає здорово жити зібрали в одному місці.",
          marketplace_button: "Маркетплейс",
          faq_title: "Часті запитання",
          faq_q1_title: "Що таке NOMYFY?",
          faq_q1_answer:
            "NOMYFY - це індивідуальна терапія від емоційного вигорання.",
          faq_q2_title: "Для кого NOMYFY?",
          faq_q2_answer:
            "Для тих, хто шукає способи покращити своє ментальне здоровʼя.",
          faq_q3_title: "Чим корисний NOMYFY?",
          faq_q3_answer:
            "NOMYFY допомагає впорядкувати життя, починаючи із себе.",
          faq_q4_title: "Чи можна скористатися послугами безкоштовно?",
          faq_q4_answer:
            "Так, у нас є безкоштовні можливості, але більшість послуг платні.",
          faq_q5_title: "Як почати користуватись?",
          faq_q5_answer:
            "Необхідно зареєструватись на нашій платформі та обрати послугу.",
          faq_q6_title: "Як стати партнером NOMYFY?",
          faq_q6_answer:
            "Залиште заявку на нашому сайті, і ми звʼяжемося з вами.",

          // --- Переклади для Footer ---
          specialists: "Фахівці",
          privacy_policy: "Політика конфіденційності",
          support_service: "Служба підтримки",
          copyright: "© Nomyfy {{year}}.",

          // --- Переклади для входу ---
          login1: "ВХІД",
          password: "пароль",
          forgot_password: "забули пароль?",
          login2: "Увійти",
          no_profile: "Немає профілю? ",
          register2: "Реєстрація",

          // --- Переклади для реєстрації ---
          continue: "Продовжити",
          reg_success: "реєстрація успішна",
          start: "Розпочати",
          reg_top: "РЕЄСТРАЦІЯ",
          success: "УСПІШНО",
          or: "або",
          code_create_error: "Помилка створення коду підтвердження",
          code_error: "Невірний код підтвердження",
          check_email: "будь ласка, перевірте вашу електронну пошту",
          code_send: "код було надіслано на ",
          send_code: "надіслати код ",
          send_code_again: "код буде надіслано знову через ",
          confirm: "Підтвердити",
          password_new: "новий пароль",

          // --- Переклади для відновлення паролю ---
          enter_email_to_restore: "введіть e-mail, щоб надіслати код",
          send_code2: "Надіслати код",
          reset_password: "оновлення паролю",
          password_confirm: "підтвердження пароля",
          update_password: "Оновити пароль",
          password_update_success: "пароль успішно оновлено",
          to_login: "Повернутися до входу",
          user_not_exist: "Користувач з вказаною поштою не існує",
          reset_password_error: "Помилка оновлення паролю. Спробуйте ще раз.",
          user_exist: "Користувач з вказаною поштою вже існує",
          auth_fail: "Помилка авторизації. Перевірте дані",

          // Переклади для Menu
          dashboard: "Головна",
          profile: "Профіль",
          health: "Здоров'я",
          eating: "Харчування",
          workout: "Тренування",
          social: "Спілка",
          marketplace_menu: "Маркетплейс",
          premium: "Преміум",
          exit: "Вийти",
          search_placeholder: "Пошук",
          welcome: "Привіт",
          health_one_place: "Твоє здоров'я в одному місці!",
          mental: "Ментальне здоров'я",
        // Переклади для віджетів дашборду
          kkal: "Калорії",
          current_week: "Поточний тиждень",
          water: "Вода",
          L: "Л",
          sleep: "Сон",
          H: "Г",
          bmi: "ІМТ",
          bmi_requires: "Заповніть інформацію щодо зросту та ваги",

          // --- Переклади для профілю користувача ---
          p_error_upadate: "Не вдалося оновити профіль. Будь ласка, заповніть усі поля.",
          p_male: "Чоловік",
          p_female: "Жінка",
          p_other: "Інше",
          p_success_title: "Дякую, за інформацію!",
          p_success_subtitle: "Тепер наші поради будуть ще кращими!",
          p_btn_home: "На головну",
          p_about_placeholder: "Про себе...",
          p_first_name_placeholder: "Ім'я",
          p_last_name_placeholder: "Прізвище",
          p_gender_placeholder: "Стать",
          p_your_achievements: "Твої успіхи",
          p_your_purchases: "Твої покупки",
          p_birth_date_placeholder: "Дата народження",
          p_height_placeholder: "Зріст, см",
          p_height_suffix: "см",
          p_weight_placeholder: "Вага, кг",
          p_weight_suffix: "кг",
          p_country_placeholder: "Країна",
          p_city_placeholder: "Місто",
          p_street_placeholder: "Вулиця",
          p_loading_cities: "Завантаження міст..",
          p_loading_streets: "Завантаження вулиць..",
          p_btn_save: "Зберегти",
          p_btn_saving: "Збереження...",

          // --- Переклади для кастомного календаря (день народження користувача) ---
          p_january: "січень",
          p_february: "лютий",
          p_march: "березень",
          p_april: "квітень",
          p_may: "травень",
          p_june: "червень",
          p_july: "липень",
          p_august: "серпень",
          p_september: "вересень",
          p_october: "жовтень",
          p_november: "листопад",
          p_december: "грудень",
          p_monday: "пн",
          p_tuesday: "вт",
          p_wednesday: "ср",
          p_thursday: "чт",
          p_friday: "пт",
          p_saturday: "сб",
          p_sunday: "нд",

          // --- Переклади для країн ---
          p_ukrain_country: "Україна",
          p_great_britain_country: "Велика Британія",
          p_germany_country: "Німеччина",
          p_france_country: "Франція",
          p_spain_country: "Іспанія",
          p_usa_country: "США",

          // --- Переклади для посилань в мапінгу ---
          mental: "Ментальне здоров'я", // що буде відображатись, в мапінгу!
          diary: "Щоденник емоцій",
          articles: "Корисні статті",
          article_1: "10 простих технік зняття стресу",
          article_2: "Ефективні методи боротьби з тривогою",
          article_3: "Дихальні техніки для релаксації",
          article_4: "Взаємозв'язок сну та психічного здоров'я",
          article_5: "Основи медитації для новачків",
          article_6: "Стратегії покращення самооцінки",
          article_7: "Профілактика та подолання вигорання",

          gender: "Здоров'я за статтю",
          // --- Переклади для календара місячних
          last_cycle_first_day: "1-й день останнього циклу",
        },
      },
      de: {
        translation: {
          about_platform: "Über die Plattform",
          functions: "Funktionen",
          prices: "Preise",
          marketplace: "Marktplatz",
          questions: "Fragen",
          language_selector: "Sprache",
          balance_action: "Balance in Aktion",
          less_chaos: "WENIGER CHAOS –",
          more_energy: "MEHR ENERGIE.",
          healthy_lifestyle: "DEIN GESUNDER LIFESTYLE AN EINEM ORT.",
          register: "Registrieren",
          description_part1:
            "— ist eine Plattform, die dir hilft, einfach und mit einem Lächeln auf dich selbst zu achten.",
          description_part2:
            "Verfolge deine Ernährung und dein Training, überwache deine Gesundheit und erhalte Unterstützung von Spezialisten.",
          description_part3:
            "Finde nützliche Produkte und teile Motivation mit der Community.",
          description_part4:
            "Zusammen mit Nomyfy bildest du Schritt für Schritt gesunde Gewohnheiten und fühlst dich jeden Tag besser.",
          specialist_title_line1: "DEIN TALENT WIRD HIER GEBRAUCHT!",
          specialist_title_line2: "WIR SUCHEN PROFIS WIE DICH!",
          specialist_text_line1:
            "Wenn du ein Spezialist für Psychologie, Ernährung oder ein Trainer bist,",
          specialist_text_line2:
            "lass uns diese Welt besser machen. Arbeite mit Profis.",
          specialist_text_line3: "Du gehörst zu uns!",
          become_specialist: "Spezialist werden",
          marketplace_title: "MARKPLATZ FÜR GESUNDE LÖSUNGEN.",
          marketplace_subtitle:
            "Alles, was dir hilft, gesund zu leben, an einem Ort gesammelt.",
          marketplace_button: "Marktplatz",
          faq_title: "Häufig gestellte Fragen",
          faq_q1_title: "Was ist NOMYFY?",
          faq_q1_answer:
            "NOMYFY ist eine individuelle Therapie gegen emotionales Burnout.",
          faq_q2_title: "Für wen ist NOMYFY?",
          faq_q2_answer:
            "Für diejenigen, die nach Wegen suchen, ihre geistige Gesundheit zu verbessern.",
          faq_q3_title: "Welchen Nutzen hat NOMYFY?",
          faq_q3_answer:
            "NOMYFY hilft, das Leben zu ordnen, angefangen bei sich selbst.",
          faq_q4_title: "Kann ich die Dienste kostenlos nutzen?",
          faq_q4_answer:
            "Ja, wir haben kostenlose Möglichkeiten, aber die meisten Dienste sind kostenpflichtig.",
          faq_q5_title: "Wie fange ich an?",
          faq_q5_answer:
            "Du musst dich auf unserer Plattform registrieren und einen Dienst auswählen.",
          faq_q6_title: "Wie werde ich ein NOMYFY-Partner?",
          faq_q6_answer:
            "Hinterlasse eine Anfrage auf unserer Website, und wir werden uns mit dir in Verbindung setzen.",

          // --- Переводы для Footer ---
          specialists: "Spezialisten",
          privacy_policy: "Datenschutzerklärung",
          support_service: "Kundendienst",
          copyright: "© Nomyfy {{year}}.",

          // --- Переклади для входу ---
          login1: "ANMELDUNG",
          password: "passwort",
          forgot_password: "passwort vergessen?",
          login2: "Einloggen",
          no_profile: "Noch kein Profil? ",
          register2: "Registrieren",

          // --- Переклади для реєстрації ---
          continue: "Fortsetzen",
          reg_success: "Registrierung erfolgreich",
          start: "Starten",
          reg_top: "REGISTRIERUNG",
          success: "ERFOLGREICH",
          or: "oder",
          code_create_error: "Fehler beim Erstellen des Bestätigungscodes",
          code_error: "Falscher Bestätigungscode",
          check_email: "bitte überprüfe deine E-Mails",
          code_send: "der Code wurde gesendet an ",
          send_code: "Code senden ",
          send_code_again: "der Code wird erneut gesendet in ",
          confirm: "Bestätigen",
          password_new: "neues Passwort",

          // --- Переклади для відновлення паролю ---
          enter_email_to_restore: "E-Mail eingeben, um den Code zu senden",
          send_code2: "Code senden",
          reset_password: "Passwort zurücksetzen",
          password_confirm: "Passwortbestätigung",
          update_password: "Passwort aktualisieren",
          password_update_success: "Passwort erfolgreich aktualisiert",
          to_login: "Zurück zur Anmeldung",
          user_not_exeist: "Benutzer mit der angegebenen E-Mail existiert nicht",
          reset_password_error: "Fehler beim Aktualisieren des Passworts. Bitte versuche es erneut.",
          user_exist: "Benutzer mit der angegebenen E-Mail existiert bereits",
          auth_fail: "Authentifizierungsfehler. Überprüfe deine Daten",

          // Переклади для Menu
          dashboard: "Startseite",
          profile: "Profil",
          health: "Gesundheit",
          eating: "Ernährung",
          workout: "Training",
          social: "Soziales",
          marketplace_menu: "Marktplatz",
          premium: "Premium",
          exit: "Beenden",
          search_placeholder: "Suche",
          welcome: "Hi",
          health_one_place: "Deine Gesundheit an einem Ort!",
          mental: "Psychische Gesundheit",
          
          // Переклади для віджетів дашборду
          kkal: "Kalorien",
          current_week: "Aktuelle Woche",
          water: "Wasser",
          L: "L",
          sleep: "Schlaf",
          H: "S",
          bmi: "BMI",
          bmi_requires: "Füllen Sie die Angaben zu Größe und Gewicht aus",

          // --- Переклади для профілю користувача ---
          p_error_upadate: "Profil konnte nicht aktualisiert werden. Bitte füllen Sie alle Felder aus.",
          p_male: "Männlich",
          p_female: "Weiblich",
          p_other: "Andere",
          p_success_title: "Danke für die Information!",
          p_success_subtitle: "Jetzt werden unsere Tipps noch besser!",
          p_btn_home: "Startseite",
          p_about_placeholder: "Über mich...",
          p_first_name_placeholder: "Vorname",
          p_last_name_placeholder: "Nachname",
          p_gender_placeholder: "Geschlecht",
          p_your_achievements: "Deine Erfolge",
          p_your_purchases: "Deine Einkäufe",
          p_birth_date_placeholder: "Geburtsdatum",
          p_height_placeholder: "Größe, cm",
          p_height_suffix: "cm",
          p_weight_placeholder: "Gewicht, kg",
          p_weight_suffix: "kg",
          p_country_placeholder: "Land",
          p_city_placeholder: "Stadt",
          p_street_placeholder: "Straße",
          p_loading_cities: "Städte werden geladen...",
          p_loading_streets: "Straßen werden geladen...",
          p_btn_save: "Speichern",
          p_btn_saving: "Speichern...",
          
          // --- Переклади для кастомного календаря (день народження користувача) ---
          p_january: "januar",
          p_february: "februar",
          p_march: "märz",
          p_april: "april",
          p_may: "mai",
          p_june: "juni",
          p_july: "juli",
          p_august: "august",
          p_september: "september",
          p_october: "oktober",
          p_november: "november",
          p_december: "dezember",
          p_monday: "mo",
          p_tuesday: "di",
          p_wednesday: "mi",
          p_thursday: "do",
          p_friday: "fr",
          p_saturday: "sa",
          p_sunday: "so",

          // --- Переклади для країн ---
          p_ukrain_country: "Ukraine",
          p_great_britain_country: "Großbritannien",
          p_germany_country: "Deutschland",
          p_france_country: "Frankreich",
          p_spain_country: "Spanien",
          p_usa_country: "USA",

          // --- Переклади для календара місячних
          last_cycle_first_day: "1. Tag des letzten Zyklus"
        },
      },
      fr: {
        translation: {
          about_platform: "À propos de la plateforme",
          functions: "Fonctions",
          prices: "Prix",
          marketplace: "Marché",
          questions: "Questions",
          language_selector: "Langue",
          balance_action: "L'équilibre en action",
          less_chaos: "MOINS DE CHAOS –",
          more_energy: "PLUS D'ÉNERGIE.",
          healthy_lifestyle: "VOTRE STYLE DE VIE SAIN EN UN SEUL ENDROIT.",
          register: "S'inscrire",
          description_part1:
            "— est une plateforme qui vous aide à prendre soin de vous facilement et avec le sourire.",
          description_part2:
            "Suivez votre alimentation et vos entraînements, surveillez votre santé et obtenez le soutien de spécialistes.",
          description_part3:
            "Trouvez des produits utiles et partagez votre motivation avec la communauté.",
          description_part4:
            "Avec Nomyfy, vous formez pas à pas des habitudes saines et vous vous sentez mieux chaque jour.",
          specialist_title_line1: "VOTRE TALENT EST RECHERCHÉ ICI!",
          specialist_title_line2: "NOUS CHERCHONS DES PROS COMME VOUS!",
          specialist_text_line1:
            "Si vous êtes spécialiste en psychologie, en nutrition, ou si vous êtes un entraîneur,",
          specialist_text_line2:
            "aidons à rendre ce monde meilleur. Travaillez avec des professionnels.",
          specialist_text_line3: "Vous êtes fait pour nous!",
          become_specialist: "Devenir un spécialiste",
          marketplace_title: "MARCHÉ DES SOLUTIONS SAINES.",
          marketplace_subtitle:
            "Tout ce qui vous aide à vivre sainement est réuni en un seul endroit.",
          marketplace_button: "Marché",
          faq_title: "Questions fréquemment posées",
          faq_q1_title: "Qu'est-ce que NOMYFY ?",
          faq_q1_answer:
            "NOMYFY est une thérapie individuelle pour le burnout émotionnel.",
          faq_q2_title: "À qui s'adresse NOMYFY ?",
          faq_q2_answer:
            "À ceux qui cherchent des moyens d'améliorer leur santé mentale.",
          faq_q3_title: "En quoi NOMYFY est-il utile ?",
          faq_q3_answer:
            "NOMYFY aide à organiser sa vie, en commençant par soi-même.",
          faq_q4_title: "Puis-je utiliser les services gratuitement ?",
          faq_q4_answer:
            "Oui, nous avons des options gratuites, mais la plupart des services sont payants.",
          faq_q5_title: "Comment commencer ?",
          faq_q5_answer:
            "Vous devez vous inscrire sur notre plateforme et choisir un service.",
          faq_q6_title: "Comment devenir partenaire de NOMYFY ?",
          faq_q6_answer:
            "Laissez une demande sur notre site Web, et nous vous contacterons.",

          // --- Переводы для Footer ---
          specialists: "Spécialistes",
          privacy_policy: "Politique de confidentialité",
          support_service: "Service de soutien",
          copyright: "© Nomyfy {{year}}.",

          // --- Переклади для входу ---
          login1: "CONNEXION",
          password: "mot de passe",
          forgot_password: "mot de passe oublié ?",
          login2: "Se connecter",
          no_profile: "Pas de compte ? ",
          register2: "S'inscrire",

          // --- Переклади для реєстрації ---
          continue: "Continuer",
          reg_success: "inscription réussie",
          start: "Commencer",
          reg_top: "INSCRIPTION",
          success: "RÉUSSI",
          or: "ou",
          code_create_error: "Erreur lors de la création du code de confirmation",
          code_error: "Code de confirmation incorrect",
          check_email: "veuillez vérifier votre e-mail",
          code_send: "le code a été envoyé à ",
          send_code: "envoyer le code ",
          send_code_again: "le code sera renvoyé dans ",
          confirm: "Confirmer",
          password_new: "nouveau mot de passe",

          // --- Переклади для відновлення паролю ---
          enter_email_to_restore: "entrez l'e-mail pour envoyer le code",
          send_code2: "Envoyer le code",
          reset_password: "réinitialisation du mot de passe",
          password_confirm: "confirmation du mot de passe",
          update_password: "Mettre à jour le mot de passe",
          password_update_success: "mot de passe mis à jour avec succès",
          to_login: "Retour à la connexion",
          user_not_exeist: "l'utilisateur avec l'e-mail spécifié n'existe pas",
          reset_password_error: "Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.",
          user_exist: "L'utilisateur avec l'e-mail spécifié existe déjà",
          auth_fail: "Erreur d'authentification. Vérifiez vos données",

          // Переклади для Menu
          dashboard: "Accueil",
          profile: "Profil",
          health: "Santé",
          eating: "Alimentation",
          workout: "Entraînement",
          social: "Social",
          marketplace_menu: "Marché",
          premium: "Premium",
          exit: "Sortir",
          search_placeholder: "Recherche",
          welcome: "Salut",
          health_one_place: "Votre santé en un seul endroit!",
          mental: "Santé Mentale",
          // Переклади для віджетів дашборду
          kkal: "Calories",
          current_week: "Semaine en cours",
          water: "Eau",
          L: "L",
          sleep: "Sommeil",
          H: "H",
          bmi: "IMC",
          bmi_requires: "Remplissez les informations concernant la taille et le poids",

          // --- Переклади для профілю користувача ---
          p_error_upadate: "Échec de la mise à jour du profil. Veuillez remplir tous les champs.",
          p_male: "Homme",
          p_female: "Femme",
          p_other: "Autre",
          p_success_title: "Merci pour l'information!",
          p_success_subtitle: "Nos conseils seront encore meilleurs maintenant!",
          p_btn_home: "Accueil",
          p_about_placeholder: "À propos de moi...",
          p_first_name_placeholder: "Prénom",
          p_last_name_placeholder: "Nom de famille",
          p_gender_placeholder: "Sexe",
          p_your_achievements: "Vos réussites",
          p_your_purchases: "Vos achats",
          p_birth_date_placeholder: "Date de naissance",
          p_height_placeholder: "Taille, cm",
          p_height_suffix: "cm",
          p_weight_placeholder: "Poids, kg",
          p_weight_suffix: "kg",
          p_country_placeholder: "Pays",
          p_city_placeholder: "Ville",
          p_street_placeholder: "Rue",
          p_loading_cities: "Chargement des villes...",
          p_loading_streets: "Chargement des rues...",
          p_btn_save: "Enregistrer",
          p_btn_saving: "Enregistrement...",
          
          // --- Переклади для кастомного календаря (день народження користувача) ---
          p_january: "janvier",
          p_february: "février",
          p_march: "mars",
          p_april: "avril",
          p_may: "mai",
          p_june: "juin",
          p_july: "juillet",
          p_august: "août",
          p_september: "septembre",
          p_october: "octobre",
          p_november: "novembre",
          p_december: "décembre",
          p_monday: "lu",
          p_tuesday: "ma",
          p_wednesday: "me",
          p_thursday: "je",
          p_friday: "ve",
          p_saturday: "sa",
          p_sunday: "di",

          // --- Переклади для країн ---
          p_ukrain_country: "Ukraine",
          p_great_britain_country: "Royaume-Uni",
          p_germany_country: "Allemagne",
          p_france_country: "France",
          p_spain_country: "Espagne",
          p_usa_country: "États-Unis",

          // --- Переклади для календара місячних
         last_cycle_first_day: "1er jour du dernier cycle",
        },
      },
      es: {
        translation: {
          about_platform: "Acerca de la plataforma",
          functions: "Funciones",
          prices: "Precios",
          marketplace: "Mercado",
          questions: "Preguntas",
          language_selector: "Idioma",
          balance_action: "Equilibrio en acción",
          less_chaos: "MENOS CAOS –",
          more_energy: "MÁS ENERGÍA.",
          healthy_lifestyle: "TU ESTILO DE VIDA SALUDABLE EN UN SOLO LUGAR.",
          register: "Registrarse",
          description_part1:
            "— es una plataforma que te ayuda a cuidarte de forma fácil y con una sonrisa.",
          description_part2:
            "Lleva un registro de tu nutrición y entrenamientos, cuida tu salud y recibe el apoyo de especialistas.",
          description_part3:
            "Encuentra productos útiles y comparte motivación con la comunidad.",
          description_part4:
            "Junto con Nomyfy, paso a paso, creas hábitos saludables y te sientes mejor cada día.",
          specialist_title_line1: "¡TU TALENTO ES NECESARIO AQUÍ!",
          specialist_title_line2: "¡ESTAMOS BUSCANDO PROFESIONALES COMO TÚ!",
          specialist_text_line1:
            "Si eres especialista en psicología, nutrición o eres entrenador,",
          specialist_text_line2:
            "ayudemos a hacer de este mundo un lugar mejor. Trabaja con profesionales.",
          specialist_text_line3: "¡Este es tu lugar!",
          become_specialist: "Convertirse en especialista",
          marketplace_title: "MERCADO DE SOLUCIONES SALUDABLES.",
          marketplace_subtitle:
            "Todo lo que te ayuda a vivir de forma saludable, reunido en un solo lugar.",
          marketplace_button: "Mercado",
          faq_title: "Preguntas frecuentes",
          faq_q1_title: "¿Qué es NOMYFY?",
          faq_q1_answer:
            "NOMYFY es una terapia individual para el agotamiento emocional.",
          faq_q2_title: "¿Para quién es NOMYFY?",
          faq_q2_answer:
            "Para aquellos que buscan formas de mejorar su salud mental.",
          faq_q3_title: "¿Cómo es útil NOMYFY?",
          faq_q3_answer:
            "NOMYFY te ayuda a organizar tu vida, comenzando por ti mismo.",
          faq_q4_title: "¿Puedo usar los servicios de forma gratuita?",
          faq_q4_answer:
            "Sí, tenemos opciones gratuitas, pero la mayoría de los servicios son de pago.",
          faq_q5_title: "¿Cómo empezar a usarlo?",
          faq_q5_answer:
            "Debes registrarte en nuestra plataforma y elegir un servicio.",
          faq_q6_title: "¿Cómo convertirse en socio de NOMYFY?",
          faq_q6_answer:
            "Deja una solicitud en nuestro sitio web y nos pondremos en contacto contigo.",

          // --- Переводы для Footer ---
          specialists: "Especialistas",
          privacy_policy: "Política de privacidad",
          support_service: "Servicio de soporte",
          copyright: "© Nomyfy {{year}}.",

          // --- Переклади для входу ---
          login1: "INICIO DE SESIÓN",
          password: "contraseña",
          forgot_password: "¿Olvidaste tu contraseña?",
          login2: "Entrar",
          no_profile: "¿No tienes cuenta? ",
          register2: "Registrarse",

          // --- Переклади для реєстрації ---
          continue: "Continuar",
          reg_success: "registro exitoso",
          start: "Comenzar",
          reg_top: "REGISTRO",
          success: "EXITOSO",
          or: "o",
          code_create_error: "Error al crear el código de confirmación",
          code_error: "Código de confirmación incorrecto",
          check_email: "por favor, revisa tu correo electrónico",
          code_send: "el código ha sido enviado a ",
          send_code: "enviar código ",
          send_code_again: "el código será reenviado en ",
          confirm: "Confirmar",
          password_new: "nueva contraseña",

          // --- Переклади для відновлення паролю ---
          enter_email_to_restore: "ingresa el correo electrónico para enviar el código",
          send_code2: "Enviar código",
          reset_password: "restablecimiento de contraseña",
          password_confirm: "confirmación de contraseña",
          update_password: "Actualizar contraseña",
          password_update_success: "contraseña actualizada con éxito",
          to_login: "Volver al inicio de sesión",
          user_not_exeist: "el usuario con el correo electrónico especificado no existe",
          reset_password_error: "Error al actualizar la contraseña. Por favor, inténtalo de nuevo.",
          user_exist: "El usuario con el correo electrónico especificado ya existe",
          auth_fail: "Error de autenticación. Verifica tus datos",
          
          // Переклади для Menu
          dashboard: "Inicio",
          profile: "Perfil",
          health: "Salud",
          eating: "Alimentación",
          workout: "Entrenamiento",
          social: "Social",
          marketplace_menu: "Mercado",
          premium: "Premium",
          exit: "Salir",
          search_placeholder: "Búsqueda",
          welcome: "Hola",
          health_one_place: "Tu salud en un solo lugar!",
          mental: "Salud Mental",
          // Переклади для віджетів дашборду
          kkal: "Calorías",
          current_week: "Semana en curso",
          water: "Agua",
          L: "L",
          sleep: "Sueño",
          H: "H",
          bmi: "IMC",
          bmi_requires: "Complete la información sobre la altura y el peso",

          // --- Переклади для профілю користувача ---
          p_error_upadate: "No se pudo actualizar el perfil. Por favor, complete todos los campos.",
          p_male: "Hombre",
          p_female: "Mujer",
          p_other: "Otro",
          p_success_title: "¡Gracias por la información!",
          p_success_subtitle: "¡Ahora nuestros consejos serán aún mejores!",
          p_btn_home: "Inicio",
          p_about_placeholder: "Sobre mí...",
          p_first_name_placeholder: "Nombre",
          p_last_name_placeholder: "Apellido",
          p_gender_placeholder: "Género",
          p_your_achievements: "Tus logros",
          p_your_purchases: "Tus compras",
          p_birth_date_placeholder: "Fecha de nacimiento",
          p_height_placeholder: "Altura, cm",
          p_height_suffix: "cm",
          p_weight_placeholder: "Peso, kg",
          p_weight_suffix: "kg",
          p_country_placeholder: "País",
          p_city_placeholder: "Ciudad",
          p_street_placeholder: "Calle",
          p_loading_cities: "Cargando ciudades...",
          p_loading_streets: "Cargando calles...",
          p_btn_save: "Guardar",
          p_btn_saving: "Guardando...",
          
          // --- Переклади для кастомного календаря (день народження користувача) ---
          p_january: "enero",
          p_february: "febrero",
          p_march: "marzo",
          p_april: "abril",
          p_may: "mayo",
          p_june: "junio",
          p_july: "julio",
          p_august: "agosto",
          p_september: "septiembre",
          p_october: "octubre",
          p_november: "noviembre",
          p_december: "diciembre",
          p_monday: "lu",
          p_tuesday: "ma",
          p_wednesday: "mi",
          p_thursday: "ju",
          p_friday: "vi",
          p_saturday: "sa",
          p_sunday: "do",

          // --- Переклади для країн ---
          p_ukrain_country: "Ucrania",
          p_great_britain_country: "Reino Unido",
          p_germany_country: "Alemania",
          p_france_country: "Francia",
          p_spain_country: "España",
          p_usa_country: "EE.UU.",

          // --- Переклади для календара місячних
          last_cycle_first_day: "1er día del último ciclo"
        },
      },
    },
    fallbackLng: "uk",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
