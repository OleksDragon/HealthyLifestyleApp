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

          // --- Переводы для Footer ---
          specialists: "Specialists",
          privacy_policy: "Privacy Policy",
          support_service: "Support Service",
          copyright: "© Nomyfy {{year}}.",
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

          // --- Переводы для Footer ---
          specialists: "Фахівці",
          privacy_policy: "Політика конфіденційності",
          support_service: "Служба підтримки",
          copyright: "© Nomyfy {{year}}.",
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
        },
      },
    },
    fallbackLng: "uk",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
