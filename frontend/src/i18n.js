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
          last_cycle_first_day: "1st day of last cycle",
          menstruation_calendar: "Menstrual calendar",
          
          // Переклади для здоров'я за статтю
          male: "Male",
          female: "Female",
          gender: "Health by gender",
          female_health: "Women's health",
          female_health_fine: "Women's health without taboos - honestly, simply, and with care for you.",
          cycle_info: "All about your cycle",
          reproductive_health: "Reproductive health",
          hormonas: "Hormones",
          gynecology: "Female doctor",
          pregnancy: "Pregnancy and postpartum period",
          prevention: "Prevention and regular check-ups",
          useful_info: "Useful info",
          day_tip: "Useful\ntip of\nthe day",
          plan: "Schedule",
          preventive_check: "a preventive check-up at least once a year",
          hormonas_health: "Healthy hormones",
          hormonas_important: "Why is it important to monitor hormone levels",
          cycle_health: "Is the cycle important?",
          cycle_important: "Why it's important to track each cycle",
          examination_health: "General examinations",
          examination_important: "Why is it important to monitor hormone levels",
          find_doctor: "Find a doctor near you",
          your_cycle: "Your cycle",
          cycle_control: "Track your cycle, monitor your well-being and receive timely reminders",
          calendar_cycle: "Menstrual calendar",
          calc_cycle: "Calculate my menstrual calendar",
          warning_calc: "*Our menstrual calendar calculations may not be 100% accurate because every body and every cycle is different. Help us make your calendar more accurate.",
          cycle: "Cycle",
          why_should_calendar: "Why keep a menstrual calendar?",
          preview_calendar: "Keeping a menstrual calendar isn't just about remembering «those days». It's a little self-care ritual that helps you better understand your body and mood.",
          predict_cycle: "Predict the cycle",
          predict_cycle_desc: "You always know when your period and ovulation will start. This helps plan events, vacations, or important meetings.",
          listen_yourself: "Listen to yourself",
          listen_yourself_desc: "The calendar helps you notice how your energy, mood, and appetite change in different phases of the cycle.",
          regularity: "Detect regularity",
          regularity_desc: "Pain, PMS, mood swings, or skin changes become more noticeable. It’s easy to track what repeats and what helps you feel better.",
          doctor_help: "Helps the doctor",
          doctor_help_desc: "If you need to see a gynecologist, accurate records of your cycle and symptoms make the consultation more effective.",
          planing: "Health and fitness planning",
          planing_desc: "You can adjust workouts, nutrition, or rest to your rhythm to get the most benefit.",
          finalize_calendar: "A period calendar is not an obligation, but a tool for self-awareness. It helps you feel more confident, predict mood changes, and simply care for yourself.",
          phase: "Phases of the menstrual cycle",
          proccess_in_body: "What happens in a woman’s body",
          proccess_in_body_desc: "The menstrual cycle is not just 'those days'. It is a natural rhythm that helps the body function harmoniously. It is divided into several phases, each affecting our well-being, mood, and energy.",
          phase_1_5: "Menstrual phase\n(1 — 5)",
          phase_1_5_desc: "This is the start of the cycle. The body sheds the old uterine lining, which causes menstrual bleeding. Energy may be lower during this time, so it’s good to allow yourself extra rest.",
          phase_6_13: "Follicular phase\n(6 — 13)",
          phase_6_13_desc: "Estrogen gradually rises, bringing back strength and motivation. This is a great period for new ideas, active work, and sports.",
          phase_14_16: "Ovulatory phase\n(14 — 16)",
          phase_14_16_desc: "A mature egg is released. Women may feel confident, attractive, and full of energy. These are the 'peak' days when the body is ready for conception.",
          phase_17_28: "Luteal phase\n(17 — 28)",
          phase_17_28_desc: "If pregnancy does not occur, progesterone becomes dominant. Sleepiness, mood changes, and cravings for sweets may appear. It’s important to listen to yourself, rest more, and take care of emotional comfort during this time.",
          finalize_cycle: "The menstrual cycle is not the enemy, but a natural calendar of our body. By paying attention to its phases, you can better plan your day, understand mood changes, and be more in harmony with yourself.",
          go_back: "Go back",
          now: "now",
          menstruation: "menstruation",
          scheduled_menstruation: "scheduled menstruation",
          ovulation: "ovulation",
          planned_ovulation: "planned ovulation",
          ovulation_in: "ovulation in",
          low_chance: "Low chance of getting pregnant",
          average_chance: "Average chance of getting pregnant",
          high_chance: "High chance of getting pregnant",
          no_chance: "Very low chance of getting pregnant",
          myth_facts: "Myths and facts",
          one: 'day',
          other: 'days',
          c_long: "Your cycle lasted {{cLong}} days. Which is normal!",
          phase_1: "You are currently in your menstrual phase!\nThis is the beginning of your cycle.\nYou may feel low on energy!\nIt is best to take care of yourself and rest during this time!",
          phase_2: "You are now in the follicular phase!\nThe hormone estrogen is actively increasing.\nYour mood is improving. Your skin is improving!\nYou are ready to conquer the whole world!",
          phase_3: "You are now in the ovulatory phase!\nA mature egg is being released.\nYou feel confident and full of energy!\nToday is a great day to do what brings you joy!",
          phase_4: "You are now in the luteal phase!\nProgesterone begins to dominate!\nDuring this period, you may experience mood swings and drowsiness!\nTake care of your comfort and listen to your feelings!",
          super: "Super!",
          gynecology_sub: "Everything about regular check-ups, prevention, and caring for women's health — in simple language without taboos.",
          womens_tests: "Examinations and tests",
          regular_review: "Regular check-ups",
          articles_: "Articles",
          read: "Read",
          how_often: "How often should\nyou visit\na gynecologist?",
          top_5_tests: "TOP 5 tests for\nwomen's health",
          review_sub: "Taking care of your health starts with prevention. Once a year, you're one step ahead of the problem.",
          what_to_check_regulary: "What should be done regularly?",
          gynecology_review: "Examination by a gynecologist",
          one_time_per_year: "once a year",
          pap_test: "Pap test",
          _2_3_time_per_year: "once every 2–3 years",
          blood_test: "Blood and urine test",
          ultrasound_test: "Pelvic ultrasound",
          if_need: "as needed",
          mammography: "Mammography",
          after_40_years: "after 40 years",
          examination_head: "Examinations and tests",
          examination_desc: "The right tests on time are the key to health confidence. Find out which tests and examinations you should have regularly.",
          base_review: "Basic examination",
          gynecology_examination: "Gynecological examination",
          add_to_calendar: "Add to calendar",
          ultrasound_glands: "Breast ultrasound",
          need_I_test: "Do I need to do tests if I feel well?",
          examination_tip_need: "Regular medical check-ups are important even when you have no complaints. Many diseases develop silently in their early stages, and timely basic tests (blood, urine, blood sugar, cholesterol) help detect problems before symptoms appear.\n\nAnnual check-ups are an investment in your health. They allow you to monitor your body, adjust your diet and lifestyle, and prevent complications.\n\nFeeling well is great, but prevention is always easier and cheaper than treatment.",
          what_needed_blood: "What should I prepare before a blood test?",
          what_needed_blood_info: "To get accurate blood test results, prepare in advance:\n\nFast before the test, your last meal should be 8–12 hours prior\n\nDrink only plain water, it does not affect results\n\nAvoid alcohol, fatty and very sweet foods for a day or two before\n\nOn the day of the test avoid intense physical activity and stress\n\nIf you take medications, be sure to inform your doctor",
          what_diff_ultrasound_mam: "What is the difference between ultrasound and mammography?",
          what_diff_ultrasound_mam_info: "Ultrasound uses sound waves to visualize tissues and shows soft structures of the breast well, especially in young women with dense tissue\n\nMammography is an X-ray examination that can detect small calcifications and early signs of tumors before lumps appear\n\nUltrasound does not use radiation and is suitable for additional control\nMammography remains the main screening method for women over 40\n\nBoth methods are often used together for more accurate diagnosis",
          why_pap_test: "Why get a Pap smear and how often?",
          why_pap_test_info: "A Pap smear helps detect changes in cervical cells at early stages when there are no symptoms\n\nRegular screening prevents the development of cancer and allows timely treatment of inflammatory processes\n\nUsually a Pap test is done once a year if there are no problems or more often as recommended by a doctor\n\nThe test is quick, painless, and takes only a few minutes\n\nEven if you feel well, the test helps take care of your health",
          reproductive: "Reproductive health",
          reproductive_sub: "Plan with us! Take care of your body and plan for the future with confidence.",
          myth_main: "There are plenty of myths around periods.",
          myth_sub: "Here’s a little selection for you)",
          cant_sport: "You can’t exercise during your period",
          cant_sport_desc: "In fact, light physical activity such as yoga, walking, or even moderate workouts can ease cramps and improve mood.",
          c_long_: "The cycle always lasts exactly 28 days",
          c_long_desc: "Everyone’s cycle is individual: an interval of about 21 to 35 days is considered normal.",
          cant_swim: "You can’t bathe or swim during your period",
          cant_swim_desc: "Bathing and showering are safe. Hygiene products (tampons, menstrual cups) let you swim comfortably and stay clean.",
          cant_get_pregnant: "You can’t get pregnant during your period",
          cant_get_pregnant_desc: "The chance is lower but not zero: sperm can survive in the body for several days, and ovulation may occur earlier or later than expected.",
          pain_is_ok: "Menstrual pain is always normal",
          pain_is_ok_desc: "Mild discomfort is typical, but severe or debilitating pain may indicate endometriosis or other conditions and should be checked by a doctor.",

          // --- Переклади для посилань в мапінгу ---
          your: "Your Health",
          diary: "Emotion Journal",
          breathing: "Breathing Practices",
          diaphragmatic: "Diaphragmatic Breathing",
          square: "Box Breathing",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "State Test",
          articles: "Useful Articles",
          article_1: "10 Simple Stress Relief Techniques",
          article_2: "Effective Methods to Combat Anxiety",
          article_3: "Breathing Techniques for Relaxation",
          article_4: "The Connection Between Sleep and Mental Health",
          article_5: "Basics of Meditation for Beginners",
          article_6: "Strategies for Improving Self-Esteem",
          article_7: "Prevention and Overcoming Burnout",

          // --- Переклади для меню здоров'я ---
          hmp_your_health: "Your Health",
          hmp_mental_health: "Mental Health",

          // --- Переклади для ментального здоров'я ---
          mp_aew_notes: "Note",
          mp_aew_describe_your_feelings: "Describe your feelings in more detail...",
          mp_articles_title: "Useful Articles",
          mp_article_1: "10 Simple Daily Stress Reduction Techniques",
          mp_article_2: "How to Cope with Anxiety",
          mp_article_3: "Breathing Exercises for Relaxation",
          mp_article_4: "Healthy Sleep and Mental Health",
          mp_article_5: "Meditation for Beginners",
          mp_article_6: "How to Boost Self-Esteem",
          mp_article_7: "Effective Methods to Combat Burnout",
          mp_article_content_1: `
          # 10 Simple Stress Relief Techniques
          ## Deep Breathing
          Take a few deep breaths in and out, focusing on your breathing. The "4-4-4" technique is simple: inhale for 4 seconds, hold your breath for 4 seconds, exhale for 4 seconds. This calms the nervous system.
          ## Progressive Muscle Relaxation
          Tense and relax all muscle groups in turn, starting from your toes and ending with your face.
          ## Meditation
          Spend 5-10 minutes a day meditating. Focus on your breath or use guided meditations.
          ## Walking in the Fresh Air
          Daily 20-minute walks reduce cortisol levels and improve mood.
          ## Aromatherapy
          Use essential oils of lavender, chamomile or bergamot for relaxation.
          ## Journaling
          Write down your thoughts and feelings. This helps structure thoughts and reduce stress.
          ## Listen to Music
          Calm music or nature sounds can significantly reduce stress levels.
          ## "5-4-3-2-1" Technique
          Name: 5 things you see; 4 things you feel; 3 things you hear; 2 things you smell; 1 thing you can taste.
          ## Yoga and Stretching
          Simple yoga exercises help relieve muscle tension.
          ## Limiting News Consumption
          Limit the time you spend watching the news to reduce information overload.
                  `,
          mp_article_content_2: `
          # Effective Methods to Combat Anxiety
          ## Grounding Techniques
          Use grounding techniques to return to reality. For example, focus on physical sensations.
          ## Cognitive Behavioral Therapy
          Identify negative thoughts and replace them with more realistic ones.
          ## Regular Exercise
          Physical activity reduces anxiety and improves mood.
          ## Limiting Caffeine
          Caffeine can increase anxiety, so limit its consumption.
          ## Quality Sleep
          A regular sleep schedule helps reduce anxiety.
          ## Social Support
          Discuss your feelings with loved ones or a professional.
          ## Gratitude Practice
          Write down 3 things you are grateful for every day.
                  `,
          mp_article_content_3: `
          # Breathing Techniques for Relaxation
          ## Belly Breathing
          Lie down or sit comfortably. Place one hand on your chest, the other on your stomach. Slowly inhale through your nose, feeling your stomach rise. Exhale through your mouth.
          ## "4-7-8" Technique
          Inhale through your nose for 4 counts, hold your breath for 7 counts, exhale through your mouth for 8 counts.
          ## Equal Breathing
          Inhale and exhale for the same number of counts (e.g., 4-4 or 5-5).
          ## Extended Exhalation Breathing
          Inhale for 4 counts, exhale for 6-8 counts.
          ## Alternate Nostril Breathing
          Close your right nostril, inhale through the left. Hold your breath. Close your left nostril, exhale through the right.
                  `,
          mp_article_content_4: `
          # The Connection Between Sleep and Mental Health
          ## Regular Sleep Schedule
          Go to bed and get up at the same time every day, even on weekends.
          ## Creating Ideal Sleep Conditions
          Ensure darkness, quiet, and a comfortable temperature in the bedroom.
          ## Limiting Screen Time
          Stop using electronic devices 1-2 hours before bed.
          ## Relaxation Rituals
          Create an evening ritual: a warm bath, reading, meditation.
          ## Limiting Caffeine and Alcohol
          Avoid caffeine after lunch and alcohol before bed.
          ## Regular Physical Activity
          Exercise improves sleep quality, but avoid intense workouts before bed.
          ## Balanced Diet
          Consume foods rich in tryptophan, magnesium, and B vitamins.
                  `,
          mp_article_content_5: `
          # Basics of Meditation for Beginners
          ## Start Small
          Start with 5-10 minutes a day and gradually increase the time.
          ## Focus on Breathing
          Focus on the sensation of breathing - how the air enters and exits.
          ## Observing Thoughts
          Don't try to stop thoughts, just observe them without judgment.
          ## Using Guided Meditations
          Use apps or audio recordings for guided sessions.
          ## Creating a Comfortable Space
          Find a quiet place where no one will disturb you.
          ## Regularity
          Meditate regularly, preferably at the same time of day.
          ## Patience with Yourself
          Don't criticize yourself if you can't concentrate. This is a normal part of the process.
                  `,
          mp_article_content_6: `
          # Strategies for Improving Self-Esteem
          ## Practicing Self-Compassion
          Treat yourself as you would a friend who needs support.
          ## Acknowledging Your Strengths
          Make a list of your strengths and achievements.
          ## Setting Realistic Goals
          Set achievable goals and celebrate progress.
          ## Limiting Negative Self-Talk
          Replace critical thoughts with supportive ones.
          ## Surrounding Yourself with Positive People
          Spend time with people who support and inspire you.
          ## Self-Care
          Regularly do things that bring you joy and relaxation.
          ## Professional Help
          See a psychologist if self-esteem significantly affects your quality of life.
                  `,
          mp_article_content_7: `
          # Prevention and Overcoming Burnout
          ## Setting Boundaries
          Learn to say "no" and set healthy boundaries.
          ## Regular Breaks
          Take short breaks during the working day.
          ## Task Prioritization
          Focus on the most important tasks and delegate when possible.
          ## Finding Meaning
          Find personal meaning in what you do.
          ## Physical Activity
          Regular exercise helps combat stress.
          ## Social Support
          Discuss your feelings with colleagues, friends, or a professional.
          ## Restoring Balance
          Find time for hobbies and personal life outside of work.
          ## Professional Help
          Don't hesitate to contact a psychologist or coach.
                  `,
          mp_article_not_found: "Article not found",
          mp_article_not_found_desc_1: "Article with ID",
          mp_article_not_found_desc_2: "does not exist.",
          mp_aew_ok: "Ok",
          mp_aew_balance: "Balance",
          mp_aew_safety: "Safety",
          mp_aew_neutrality: "Neutrality",
          mp_aew_lethargy: "Lethargy",
          mp_aew_carefreeness: "Carefreeness",
          mp_aew_relaxation: "Relaxation",
          mp_aew_calmness: "Calmness",
          mp_aew_stability: "Stability",
          mp_aew_focus: "Focus",
          mp_aew_so_so: "So-so",
          mp_aew_indifference: "Indifference",
          mp_aew_nervousness: "Nervousness",
          mp_aew_slight_irritation: "Slight Irritation",
          mp_aew_doubt: "Doubt",
          mp_aew_restlessness: "Restlessness",
          mp_aew_distrust: "Distrust",
          mp_aew_tension: "Tension",
          mp_aew_dissatisfaction: "Dissatisfaction",
          mp_aew_melancholy: "Melancholy",
          mp_aew_i_feel_sick: "I feel sick",
          mp_aew_fatigue: "Fatigue",
          mp_aew_self_pity: "Self-pity",
          mp_aew_anxiety: "Anxiety",
          mp_aew_sadness: "Sadness",
          mp_aew_uncertainty: "Uncertainty",
          mp_aew_confusion: "Confusion",
          mp_aew_guilt: "Guilt",
          mp_aew_self_rejection: "Self-rejection",
          mp_aew_emptiness: "Emptiness",
          mp_aew_terribly: "Terribly",
          mp_aew_isolation: "Isolation",
          mp_aew_depression: "Depression",
          mp_aew_envy: "Envy",
          mp_aew_deep_sorrow: "Deep Sorrow",
          mp_aew_shame: "Shame",
          mp_aew_despair: "Despair",
          mp_aew_loneliness: "Loneliness",
          mp_aew_hopelessness: "Hopelessness",
          mp_aew_self_directed_aggression: "Self-directed Aggression",
          mp_aew_сool: "Cool",
          mp_aew_energy: "Energy",
          mp_aew_satisfaction: "Satisfaction",
          mp_aew_connection: "Connection",
          mp_aew_comfort: "Comfort",
          mp_aew_love: "Love",
          mp_aew_motivation: "Motivation",
          mp_aew_determination: "Determination",
          mp_aew_respect: "Respect",
          mp_aew_friendship: "Friendliness",
          mp_aew_good: "Good",
          mp_aew_in_the_flow: "In the flow",
          mp_aew_pride: "Pride",
          mp_aew_inspiration: "Inspiration",
          mp_aew_hope: "Hope",
          mp_aew_optimism: "Optimism",
          mp_aew_confidence: "Confidence",
          mp_aew_joy: "Joy",
          mp_aew_gratitude: "Gratitude",
          mp_aew_openness: "Openness",
          mp_aew_great: "Great",
          mp_aew_bliss: "Bliss",
          mp_aew_delight: "Delight",
          mp_aew_admiration: "Admiration",
          mp_aew_excitement: "Excitement",
          mp_aew_elation: "Elation",
          mp_aew_euphoria: "Euphoria",
          mp_aew_devotion: "Devotion",
          mp_aew_love_of_life: "Love of Life",
          mp_aew_triumph: "Triumph",
          mp_aew_people: "People",
          mp_aew_myself: "Myself",
          mp_aew_family: "Family",
          mp_aew_friends: "Friends",
          mp_aew_partner: "Partner",
          mp_aew_colleagues: "Colleagues",
          mp_aew_events: "Events",
          mp_aew_work: "Work",
          mp_aew_training: "Training",
          mp_aew_driving: "Driving",
          mp_aew_rest: "Rest",
          mp_aew_studying: "Studying",
          mp_aew_places: "Places",
          mp_aew_home: "Home",
          mp_aew_office: "Office",
          mp_aew_school: "School",
          mp_aew_university: "University",
          mp_aew_street: "Street",
          mp_edp_sports: "Sports",
          mp_edp_coffee: "Coffee",
          mp_edp_alcohol: "Alcohol",
          mp_edp_sex: "Sex",
          mp_edp_meditation: "Meditation",
          mp_edp_antidepressants: "Antidepressants",
          mp_edp_other: "Other",
          mp_edp_not_specified: "Not specified",
          mp_aew_wizard_title_step_1: "I feel",
          mp_aew_wizard_title_step_2: "What was the cause of these emotions?",
          mp_aew_wizard_title_step_3: "Want to write something about",
          mp_aew_wizard_description_step_3: "Your note is private and visible only to you.",
          mp_return_back: "Go back",
          mp_btn_next: "Next",
          mp_btn_add: "Add",
          mp_btn_back: "Back",
          mp_btn_cancel: "Cancel",
          mp_btn_lets_start: "Shall we start?",
          mp_btn_continue: "Continue",
          mp_btn_start: "Start",
          mp_btn_save: "Save",
          mp_btn_result: "Result",
          mp_btn_try_again: "Try again",
          mp_bpp_title: "Breathing Practices",
          mp_bpp_subtitle: "Exhale stress — inhale calm 🌿",
          mp_bpp_description_1: "Simple breathing exercises help relieve tension, restore energy, and bring back mental clarity. You can start anywhere: at home, at work, or even on the go.",
          mp_bpp_description_2: "Try it — and feel your body relax and your mood lighten.",
          mp_bpp_card_title_1: "Diaphragmatic Breathing",
          mp_bpp_card_description_1_1: "Reduces stress and anxiety.",
          mp_bpp_card_description_1_2: "Relaxes, relieves tension.",
          mp_bpp_card_title_2: "Box Breathing",
          mp_bpp_card_description_2_1: "Relieves anxiety and helps with focus.",
          mp_bpp_card_title_3: "Nadi Shodhana",
          mp_bpp_card_description_3_1: "Alternate nostril breathing.",
          mp_bpp_card_description_3_2: "Helps relieve stress.",
          mp_bpp_card_description_3_3: "Restores inner balance.",
          mp_dbp_title: "Diaphragmatic Breathing",
          mp_dbp_subtitle: "Breathing that brings back calm",
          mp_dbp_description_1_1: "Sit comfortably. Relax your shoulders. Perform for at least 3 - 5 minutes.",
          mp_dbp_description_1_2: "Return to breathing when you feel tension.",
          mp_dbp_inhale: "INHALE",
          mp_dbp_hold: "HOLD",
          mp_dbp_exhale: "EXHALE",
          mp_dbp_come_on_more: "COME ON MORE",
          mp_ebp_title: "Emotion Journal",
          mp_ebp_factor_title: "Mood Factors",
          mp_ebp_factor_info_p_1: "All factors are your potential triggers.",
          mp_ebp_factor_info_p_2: "For example, you might not notice that sports, coffee, or drugs affect your mood and form behavioral patterns.",
          mp_ebp_factor_info_p_3: "You can track the influence of factors on your well-being later in the analytics section.",
          mp_ebp_factor_info_p_4: "Example",
          mp_ebp_factor_info_p_5: "Nutrition and Stimulants:",
          mp_ebp_factor_info_p_6: "Record your consumption of coffee, vitamins, or foods that may affect your energy levels.",
          mp_ebp_factor_info_p_7: "Activity and Physical Exercise:",
          mp_ebp_factor_info_p_8: "Track the amount of physical exercise or participation in other forms of physical activity.",
          mp_ebp_factor_info_p_9: "Biological Cycles:",
          mp_ebp_factor_info_p_10: "By tracking your periods, you can understand how they affect your emotional well-being.",
          mp_ebp_selected_factors: "Selected factors:",
          mp_ebp_available_factors: "Available factors:",
          mp_ebp_hello_how_are_you: "Hello! How are you?",
          mp_ebp_factor: "Factors",
          mp_ebp_add_factor: "Add factor",
          mp_mhp_title: "Your calm starts here.",
          mp_mhp_sub_title: "We've gathered tools to help you stay balanced even on the most stressful days.",
          mp_mhp_test_card_title: "State Tests",
          mp_mhp_test_card_btn_text: "Take the test",
          mp_mhp_breathing_card_title: "Breathing Practices",
          mp_mhp_breathing_card_btn_text: "Choose a practice",
          mp_mhp_articles_card_title: "Useful Articles",
          mp_mhp_articles_card_btn_text: "View articles",
          mp_mhp_choose_specialist: "Choose a specialist",
          mp_mtp_test_data_question_1: "How do you wake up in the morning?",
          mp_mtp_test_data_answers_1_1: "With enthusiasm and plans",
          mp_mtp_test_data_answers_1_2: "With a glass of water and a heavy sigh",
          mp_mtp_test_data_answers_1_3: "\"This day again?\"",
          mp_mtp_test_data_question_2: "When something goes wrong, your reaction is:",
          mp_mtp_test_data_answers_2_1: "Ok, I'll figure out how to fix it",
          mp_mtp_test_data_answers_2_2: "Well, that's life",
          mp_mtp_test_data_answers_2_3: "Everything is lost, I'm going into my blanket",
          mp_mtp_test_data_question_3: "What saves you from stress most often?",
          mp_mtp_test_data_answers_3_1: "Sports or a walk",
          mp_mtp_test_data_answers_3_2: "Food, series, or memes",
          mp_mtp_test_data_answers_3_3: "I just zone out without energy",
          mp_mtp_test_data_question_4: "Your feeling of energy lately:",
          mp_mtp_test_data_answers_4_1: "Normal, charge holds up",
          mp_mtp_test_data_answers_4_2: "Like a battery at 30%",
          mp_mtp_test_data_answers_4_3: "Like a phone shutting down in the cold",
          mp_mtp_test_data_question_5: "What do you think when you hear the word \"rest\"?",
          mp_mtp_test_data_answers_5_1: "Planning something nice",
          mp_mtp_test_data_answers_5_2: "Lying at home and doing nothing",
          mp_mtp_test_data_answers_5_3: "I don't have time to rest",
          mp_mtp_test_result_title_1: "Your mental state is fine.",
          mp_mtp_test_result_description_1: "You have a great level of energy and optimism. Keep taking care of yourself and maintaining this state!",
          mp_mtp_test_result_title_2: "Mental state mostly fine.",
          mp_mtp_test_result_description_2: "Most things are going well, but some areas need a little more attention and care.",
          mp_mtp_test_result_title_3: "Mental state is a bit exhausted",
          mp_mtp_test_result_description_3: "You feel a little tired. Find time for rest and little joys.",
          mp_mtp_test_result_title_4: "Mental state asks for care",
          mp_mtp_test_result_description_4: "You need more rest, joy, and support. Pay attention to your needs.",
          mp_mtp_test_result_title_5: "Mental state screams SOS",
          mp_mtp_test_result_description_5: "You might be experiencing burnout. Don't be shy to ask for help and find time for serious rest.",
          mp_mtp_test_result_title_6: "Your mental state is like a roller coaster.",
          mp_mtp_test_result_description_6: "Your state changes often. Some days are great, others are more difficult. Try to find balance.",
          mp_mtp_start_message: "Attention! The test is not diagnostic, but shows your level of stress or burnout.",
          mp_mtp_test_title: "Test on the state of your mental health",
          mp_mtp_test_description: "Tap the answers that match your state)",
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "Breathing that balances energy",
          mp_nsp_description_1: "Alternate nostril breathing technique to harmonize mind and body.",
          mp_nsp_description_2: "Perform for 3-5 minutes to achieve the effect.",
          mp_nsp_technique_title: "Technique:",
          mp_nsp_technique_step_1: "Sit comfortably, straighten your back.",
          mp_nsp_technique_step_2: "With your hand, close your right nostril, inhale through the left.",
          mp_nsp_technique_step_3: "Then close the left — exhale through the right.",
          mp_nsp_technique_step_4: "Inhale through the right — exhale through the left.",
          mp_nsp_technique_step_5: "Continue for a few minutes at a calm pace.",
          mp_nsp_result_title: "Result:",
          mp_nsp_result_description_1: "After just a few minutes, a feeling of calm appears. The level of tension decreases. The mind clears, as if after a short rest.",
          mp_nsp_result_description_2: "Regular practice helps you fall asleep better, concentrate, and maintain inner balance even in stressful situations.",
          mp_sbp_title: "Box Breathing",
          mp_sbp_subtitle: "Breathing that brings back calm",
          mp_sbp_description_1: "Sit comfortably. Relax your shoulders. Perform for at least 3 - 5 minutes.",
          mp_sbp_description_2: "Return to breathing when you feel tension.",

          // --- Переклади для твого здоров'я ---
          mp_yhp_main_title: "Your Health —",
          mp_yhp_main_subtitle: "Your superpower. It stands on 3 pillars:",
          mp_yhp_activity_title: "Activity",
          mp_yhp_activity_description_1: "Even 15 minutes a day makes a difference.",
          mp_yhp_activity_description_2: "Walking, jump rope, pilates – choose what you like, and your body will say 'thank you'.",
          mp_yhp_sleep_title: "Sleep",
          mp_yhp_sleep_description_1: "This is the most important thing of all!",
          mp_yhp_sleep_description_2: "Sleep is not laziness, but your internal charging cable. 7-8 hours of quality rest helps the body recover and the brain to work quickly and creatively.",
          mp_yhp_nutrition_title: "Nutrition",
          mp_yhp_nutrition_description_1: "Food is fuel. The higher its quality, the better your 'engine' works.",
          mp_yhp_nutrition_description_2: "Not about diets, but about balance: more vegetables, less stress about snacks.",

          // --- Переклади для чоловічого здоров'я ---
          hormonas_diagram: "Male Health Chart",
          mp_male_health: "Men's Health",
          mp_subtitle_1: "Being a man is also about health",
          mp_hormones_block_title: "Hormones",
          mp_hormones_block_content_label_1: "Testosterone level",
          mp_hormones_block_content_value_1_1: "normal 300-1000 ng/dl",
          mp_hormones_block_content_label_2: "Signs of deficiency",
          mp_hormones_block_content_value_2_1: "fatigue",
          mp_hormones_block_content_value_2_2: "low libido",
          mp_hormones_block_content_value_2_3: "muscle loss",
          mp_hormones_block_content_label_3: "What to do?",
          mp_hormones_block_content_value_3_1: "regular check-ups",
          mp_hormones_block_content_value_3_2: "strength training",
          mp_hormones_block_content_value_3_3: "quality sleep",
          mp_hormones_block_content_value_3_4: "less stress",
          mp_add_hormones_data: "Add indicators",
          mp_analyses_block_title: "Tests and prevention",
          mp_analyses_block_content_label_1: "General blood and urine test",
          mp_analyses_block_content_value_1: "annually",
          mp_analyses_block_content_label_2: "Hormonal profile",
          mp_analyses_block_content_value_2: "as needed",
          mp_analyses_block_content_label_3: "PSA",
          mp_analyses_block_content_value_3: "after 40 years",
          mp_analyses_block_content_label_4: "Pelvic ultrasound",
          mp_analyses_block_content_value_4: "every 1–2 years",
          mp_analyses_block_content_label_5: "Hormonal profile",
          mp_analyses_block_content_value_5: "as recommended by doctor",
          mp_reproductive_block_title: "Reproductive health",
          mp_reproductive_block_content_label_1: "Fertility",
          mp_reproductive_block_content_value_1: "sperm quality depends on lifestyle",
          mp_reproductive_block_content_label_2: "Risks",
          mp_reproductive_block_content_value_2: "overheating, alcohol, smoking, obesity",
          mp_reproductive_block_content_label_3: "Recommendations",
          mp_reproductive_block_content_value_3: "Urologist once a year, spermogram",
          mp_urinary_block_title: "Urinary system",
          mp_urinary_block_content_label_1: "Prostate check",
          mp_urinary_block_content_value_1: "from 40 years — PSA and ultrasound yearly",
          mp_urinary_block_content_label_2: "Warning!",
          mp_urinary_block_content_value_2: "pain, blood in urine, frequent urination",
          mp_urinary_block_content_label_3: "What to do?",
          mp_urinary_block_content_value_3: "don’t ignore discomfort, go to urologist",
          mp_potency_block_title: "Potency",
          mp_potency_block_content_label_1: "Why does it decrease?",
          mp_potency_block_content_value_1: "stress, alcohol, smoking, heart disease",
          mp_potency_block_content_label_2: "How to maintain?",
          mp_potency_block_content_value_2: "sports, quality sleep, balanced diet",
          mp_potency_block_content_label_3: "When to see a doctor?",
          mp_potency_block_content_value_3: "if problems last more than 2 months",
          mp_subtitle_2: "Take care of yourself like your favorite car",
          mp_form_subtitle: "Fill in the fields if you have current data, and we will create a chart",
          mp_form_testosterone: "Testosterone",
          mp_form_free_testosterone: "Free testosterone",
          mp_form_free_testosterone_2: "Free T",
          mp_form_prolactin: "Prolactin",
          mp_form_estradiol: "Estradiol",
          mp_form_lh: "LH (luteinizing hormone)",
          mp_form_lh_2: "LH",
          mp_form_fsh: "FSH",
          mp_form_ng_dl: "ng/dl",
          mp_form_ng_ml: "ng/ml",
          mp_form_pg_ml: "pg/ml",
          mp_form_mO_l: "mU/l",
          mp_form_save_btn: "Save indicators",
          mp_diagram_hormons_value_not_found: "Hormone data not found. Please enter your indicators.",
          mp_diagram_hormons_data_not_found: "Error loading data. Please contact support.",
          mp_diagram_low: "Low",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "High",

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

          // --- Переклади для календара місячних
          last_cycle_first_day: "1-й день останнього циклу",
          menstruation_calendar: "Календар місячних",

          // Переклади для здоров'я за статтю
          male: "Чоловік",
          female: "Жінка",
          gender: "Здоров'я за статтю",
          female_health: "Жіноче здоров'я",
          female_health_fine: "Жіноче здоров’я без табу - чесно, просто і з турботою про тебе.",
          cycle_info: "Все про ваш цикл",
          reproductive_health: "Репродуктивне здоров`я",
          hormonas: "Гормони",
          gynecology: "Жіночий лікар",
          pregnancy: "Вагітність і післяпологовий період",
          prevention: "Профилактика та регулярний огляд",
          useful_info: "Корисна інформація",
          day_tip: "Корисна\nпорада\nдня",
          plan: "Плануй",
          preventive_check: "профілактичний огляд хоча б раз на рік",
          hormonas_health: "Здорові гормони",
          hormonas_important: "Чому важливо контролювати рівень гормонів",
          cycle_health: "Цикл - це важливо?",
          cycle_important: "Чому важливо відстежувати кожний цикл",
          examination_health: "Загальні обстеження",
          examination_important: "Чому важливо контролювати рівень гормонів",
          find_doctor: "Знайди лікаря поруч",
          your_cycle: "Ваш цикл",
          cycle_control: "Відстежуйте свій цикл, контролюй самопочуття та отримуй нагадування вчасно",
          calendar_cycle: "Календар місячних",
          calc_cycle: "Розрахувати мій календар місячних",
          warning_calc: "*Розрахунки за наши календарем місячних можуть бути не на 100% точними, тому що кожне тіло і кожний цикл відрізняється.   Допоможи нам зробити твій календар більш точним.",
          cycle: "Цикл",
          why_should_calendar: "Навіщо вести календар місячних?",
          preview_calendar: "Вести календар місячних — це не лише про пам’ять про «ті дні». Це маленький ритуал турботи про себе, який допомагає краще розуміти своє тіло і настрій.",
          predict_cycle: "Прогнозує цикл",
          predict_cycle_desc: "Ти завжди знаєш, коли почнуться менструації та овуляція. Це допомагає планувати події, відпустки чи важливі зустрічі.",
          listen_yourself: "Слухати себе",
          listen_yourself_desc: "Календар допомагає помітити, як змінюється енергія, настрій і апетит у різні фази циклу.",
          regularity: "Виявляти закономірність",
          regularity_desc: "Біль, ПМС, коливання настрою чи зміни шкіри стають помітнішими. Можна легко відстежувати, що повторюється, і що допомагає почуватися краще.",
          doctor_help: "Допомагає лікарю",
          doctor_help_desc: "Якщо потрібно звернутися до гінеколога, точний запис циклу та симптомів робить консультацію ефективнішою.",
          planing: "Планування здоров’я та фітнесу",
          planing_desc: "Ти можеш підлаштовувати тренування, харчування чи відпочинок під свій ритм, щоб отримати максимальну користь.",
          finalize_calendar: "Календар місячних -це не обов’язок, а інструмент самопізнання. Він допомагає відчувати себе впевненіше, передбачати зміни настрою і просто піклуватись про себе.",
          phase: "Фази менструального циклу",
          proccess_in_body: "Що відбувається в тілі жінки",
          proccess_in_body_desc: "Менструальний цикл — це не лише «ті дні». Це цілий природний ритм, який допомагає організму працювати злагоджено. Він ділиться на кілька фаз, і кожна з них впливає на наше самопочуття, настрій та енергію.",
          phase_1_5: "Менструальна фаза\n(1 — 5)",
          phase_1_5_desc: "Це початок циклу. Організм позбувається старого шару слизової оболонки матки, тому з’являються менструальні виділення. У цей час енергії може бути менше, тож варто дозволити собі більше відпочинку.",
          phase_6_13: "Фолікулярна фаза\n(6 — 13)",
          phase_6_13_desc: "Поступово зростає рівень естрогену, і разом з ним повертається сила та мотивація. Це гарний період для нових ідей, активної роботи та спорту",
          phase_14_16: "Овуляторна фаза\n(14 — 16)",
          phase_14_16_desc: "Відбувається вихід зрілої яйцеклітини. Жінка може відчувати себе впевненою, привабливою, сповненою енергії. Це «пікові» дні, коли організм готовий до зачаття.",
          phase_17_28: "Лютеїнова фаза\n(17 — 28)",
          phase_17_28_desc: "Якщо вагітність не настала, починає домінувати прогестерон. Може з’явитися сонливість, зміни настрою, тяга до солодкого. У цей час важливо слухати себе, більше відпочивати й піклуватися про емоційний комфорт.",
          finalize_cycle: "Менструальний цикл — це не ворог, а природний календар нашого тіла. Якщо прислухатися до його фаз, можна краще планувати свій день, розуміти зміни настрою та бути більш гармонійною із собою.",
          go_back: "Повернутися назад",
          now: "зараз",
          menstruation: "місячні",
          scheduled_menstruation: "заплановані місячні",
          ovulation: "овуляція",
          planned_ovulation: "запланована овуляція",
          ovulation_in: "овуляція через",
          low_chance: "Низький шанс завагітніти",
          average_chance: "Середні шанси завагітніти",
          high_chance: "Високий шанс завагітніти",
          no_chance: "Дуже низька ймовірність завагітніти",
          myth_facts: "Міфи і факти",
          one: 'день',
          few: 'дні',
          other: 'днів',
          c_long: "Твій цикл тривав {{cLong}} днів. Що є нормою!",
          phase_1: "Зараз ти знаходишся у менструальній фазі!\nЦе початок циклу.\nТи можеш відчувати недостачу енергії!\nУ цей час краще потурбуватися про себе та відпочити!",
          phase_2: "Зараз ти знаходишся у фолікулярній фазі!\nАктивно зростає гормон естроген.\nТвій настрій зростає. Покращується шкіра!\nТи готова до підкорення цілого світу!",
          phase_3: "Зараз ти знаходишся у овуляторній фазі!\nВідбувається вихід зрілої яйцеклітини.\nТи відчуваєш себе впевненою та сповненою енергії!\nСьогодні - чудовий день, щоб робити те, що приносить тобі радість!",
          phase_4: "Зараз ти знаходишся у лютеїновій фазі!\nПочинає домінувати прогестерон!\nУ цей період може відбуватися зміна настрою та відчуватися сонливість!\nПіклуйся про свій комфорт та прислухайся до відчутів!",
          super: "Супер!",
          gynecology_sub: "Все про регулярні обстеження, профілактику, турботу про жіноче здоров’я — без табу простою мовою.",
          womens_tests: "Обстеження та аналізи",
          regular_review: "Регулярні огляди",
          articles_: "Статті",
          read: "Читати",
          how_often: "Як часто потрібно\nвідвідувати\nгінеколога?",
          top_5_tests: "ТОП-5 аналізів для\nжіночого здоров’я",
          review_sub: "Турбота про здоров’я починається з профілактики. Раз на рік — і ти вже на крок попереду проблеми.",
          what_to_check_regulary: "Що проходити регулярно?",
          gynecology_review: "Огляд у гінеколога",
          one_time_per_year: "раз на рік",
          pap_test: "ПАП - тест",
          _2_3_time_per_year: "раз на 2-3 роки",
          blood_test: "Аналіз крові та сечі",
          ultrasound_test: "УЗД органів малого тазу",
          if_need: "за потреби",
          mammography: "Мамографія",
          after_40_years: "після 40 років",
          examination_head: "Обстеження та аналізи",
          examination_desc: "Правильні тести вчасно — запорукавпевненності у здоров’ї. Дізнайся, які аналізи та обстеження варто робити регулярно.",
          base_review: "Базовий огляд",
          gynecology_examination: "Гінекологічний огляд",
          add_to_calendar: "Додати в календар",
          ultrasound_glands: "УЗД молочних залоз",
          
          need_I_test: "Чи потрібно робити аналізи, якщо я почуваюсь добре?",
          examination_tip_need: "Регулярні медичні обстеження важливі навіть тоді, коли немає жодних скарг. Багато захворювань на ранніх етапах розвиваються безсимптомно, і вчасно зроблені базові аналізи (загальний аналіз крові, сечі, рівень цукру, холестерину) допомагають виявити проблеми ще до появи перших ознак.\n\nПланові перевірки раз на рік – це інвестиція у власне здоров’я. Вони дають можливість контролювати стан організму, своєчасно коригувати харчування, спосіб життя та уникати ускладнень.\n\nПочуваєтесь добре – чудово, але профілактика завжди легша та дешевша за лікування.",
          what_needed_blood: "Що підготувати перед сдачею крові?",
          what_needed_blood_info: "Щоб аналіз крові був точним підготуйтеся заздалегідь:\n\nЗдавайте кров натще останній прийом їжі має бути за 8–12 годин\n\nПийте тільки чисту воду без газу це не впливає на показники\n\nЗа день два не вживайте алкоголь жирні та дуже солодкі страви\n\nУ день здачі уникайте сильних фізичних навантажень і стресу\n\nЯкщо приймаєте ліки обовʼязково скажіть про це лікарю",
          what_diff_ultrasound_mam: "Чим відрізняється УЗД від мамографії?",
          what_diff_ultrasound_mam_info: "УЗД (ультразвукове дослідження) використовує звукові хвилі для візуалізації тканин і добре показує м’які структури грудей, особливо у молодих жінок з щільною тканиною\n\nМамографія – це рентгенівське обстеження, яке дозволяє виявити дрібні кальцинати і ранні ознаки пухлин навіть до появи ущільнень\n\nУЗД не використовує випромінювання і підходить для додаткового контролю\nМамографія залишається основним скринінговим методом для жінок старше 40 років\n\nОбидва методи часто використовують разом для більш точної діагностики",
          why_pap_test: "Навіщо робити цитологічний мазок (ПАП-тест) і як часто",
          why_pap_test_info: "Цитологічний мазок або ПАП-тест допомагає виявити зміни клітин шийки матки на ранніх стадіях коли ще немає симптомів\n\nРегулярне обстеження дозволяє запобігти розвитку раку і своєчасно лікувати запальні процеси\n\nЗазвичай ПАП-тест роблять раз на рік якщо немає проблем або за рекомендацією лікаря частіше\n\nОбстеження швидке безболісне і займає кілька хвилин\n\nНавіть якщо ви почуваєтесь добре тест допомагає дбати про своє здоров’я",
          reproductive: "Репродуктивне здоров'я",
          reproductive_sub: "Плануй з нами! Дбай про своє тіло і плануй майбутнє з упевненністю.",

          myth_main: "Існує купа міфів навкруги місячних.",
          myth_sub: "Ось для тебе маленька підборка)",
          cant_sport: "Під час місячних не можна займатись спортом",
          cant_sport_desc: "Насправді легка фізична активність, як-от йога, піші прогулянки чи навіть помірні тренування, може полегшити спазми та покращити настрій.",
          c_long_: "Цикл завжди триває рівно 28 днів",
          c_long_desc: "Цикл у кожної людини індивідуальний: нормою вважають інтервал приблизно від 21 до 35 днів.",
          cant_swim: "Не можна купатися чи приймати ванну під час місячних",
          cant_swim_desc: "Купання та душ безпечні. Гігієнічні засоби (тампони, менструальні чаші) дозволяють комфортно плавати й підтримувати чистоту.",
          cant_get_pregnant: "Під час місячних не можна завагітніти",
          cant_get_pregnant_desc: "Ймовірність нижча, але не нульова: сперматозоїди можуть жити в тілі кілька днів, а овуляція інколи настає раніше або пізніше, ніж очікується.",
          pain_is_ok: "Менструальний біль — це завжди нормально",
          pain_is_ok_desc: "Легкий дискомфорт типовий, але сильний або виснажливий біль може свідчити про ендометріоз чи інші захворювання, і варто звернутися до лікаря.",

          // --- Переклади для посилань в мапінгу ---
          your: "Твоє здоров'я",
          mental: "Ментальне здоров'я",
          diary: "Щоденник емоцій",
          breathing: "Дихальні практики",
          diaphragmatic: "Діафрагмальне дихання",
          square: "Дихання Квадрат",
          nadishodhana: "Наді шодхана",
          mentaltest: "Тест на стан",
          articles: "Корисні статті",
          article_1: "10 простих технік зняття стресу",
          article_2: "Ефективні методи боротьби з тривогою",
          article_3: "Дихальні техніки для релаксації",
          article_4: "Взаємозв'язок сну та психічного здоров'я",
          article_5: "Основи медитації для новачків",
          article_6: "Стратегії покращення самооцінки",
          article_7: "Профілактика та подолання вигорання",

          // --- Переклади для меню здоров'я ---
          hmp_your_health: "Твоє здоров'я",
          hmp_mental_health: "Ментальне здоров'я",

          // --- Переклади для ментального здоров'я ---
          mp_aew_notes: "Нотатка",
          mp_aew_describe_your_feelings: "Опишіть свої відчуття детальніше...",
          mp_articles_title: "Корисні статті",
          mp_article_1: "10 простих технік зниження стресу щодня",
          mp_article_2: "Як впоратись з тривогою",
          mp_article_3: "Дихальні вправи для розслаблення",
          mp_article_4: "Здоровий сон та ментальне здоров'я",
          mp_article_5: "Медитація для початківців",
          mp_article_6: "Як підвищити самооцінку",
          mp_article_7: "Ефективні методи боротьби з вигоранням",
          mp_article_content_1: `
          # 10 простих технік зняття стресу
          ## Глибоке дихання
          Зробіть кілька глибоких вдихів і видихів, концентруючись на диханні. Техніка «4-4-4» проста: вдих на 4 секунди, затримка дихання на 4 секунди, видих на 4 секунди. Це заспокоює нервову систему.
          ## Прогресивна м'язова релаксація
          Напружте та розслабьте всі групи м'язів по черзі, починаючи з пальців ніг і закінчуючи обличчям.
          ## Медитація
          Приділяйте 5-10 хвилин на день медитації. Сфокусуйтесь на диханні або використовуйте керовані медитації.
          ## Прогулянка на свіжому повітрі
          Щоденні 20-хвилинні прогулянки зменшують рівень кортизолу та покращують настрій.
          ## Ароматерапія
          Використовуйте ефірні олії лаванди, ромашки або бергамота для релаксації.
          ## Ведення щоденника
          Записуйте свої думки та почуття. Це допомагає структурувати думки та зменшити стрес.
          ## Слухайте музику
          Спокійна музика або звуки природи можуть значно знизити рівень стресу.
          ## Техніка "5-4-3-2-1"
          Назвіть: 5 речей, які бачите; 4 речі, які відчуваєте; 3 речі, які чуєте; 2 речі, які відчуваєте запах; 1 річ, яку можете скуштувати.
          ## Йога та розтяжка
          Прості вправи йоги допомагають зняти м'язове напруження.
          ## Обмеження споживання новин
          Обмежте час, який витрачаєте на перегляд новин, щоб зменшити інформаційне навантаження.
                  `,
          mp_article_content_2: `
          # Ефективні методи боротьби з тривогою
          ## Техніки заземлення
          Використовуйте методи заземлення, щоб повернутися до реальності. Наприклад, зосередьтесь на физичних відчуттях.
          ## Когнітивно-поведінкова терапія
          Визначте негативні думки та замініть їх на більш реалістичні.
          ## Регулярні вправи
          Фізична активність зменшує тривожність та покращує настрій.
          ## Обмеження кофеїну
          Кофеїн може посилювати тривожність, тому обмежте його споживання.
          ## Якісний сон
          Регулярний режим сну допомагає зменшити тривожність.
          ## Соціальна підтримка
          Обговорюйте свої почуття з близькими людьми або фахівцем.
          ## Практика вдячності
          Щоденно записуйте 3 речі, за які ви вдячні.
                  `,
          mp_article_content_3: `
          # Дихальні техніки для релаксації
          ## Дихання животом
          Ляжте або сядьте зручно. Одну руку покладіть на груди, іншу - на живіт. Повільно вдихайте через ніс, відчуваючи, як живіт піднімається. Видихайте через рот.
          ## Техніка "4-7-8"
          Вдихніть через ніс на 4 рахунки, затримайте дихання на 7 рахунків, видихніть через рот на 8 рахунків.
          ## Равове дихання
          Вдихайте та видихайте на однакову кількість рахунків (наприклад, 4-4 або 5-5).
          ## Дихання з підвищеним видихом
          Вдихайте на 4 рахунки, видихайте на 6-8 рахунків.
          ## Альтернативне дихання ніздрями
          Закрийте праву ніздрю, вдихніть лівою. Затримайте дихання. Закрийте ліву ніздрю, видихніть правою.
                  `,
          mp_article_content_4: `
          # Взаємозв'язок сну та психічного здоров'я
          ## Регулярний режим сну
          Лягайте та вставайте в один і той же час кожного дня, навіть у вихідні.
          ## Створення ідеальних умов для сну
          Забезпечте темряву, тишу та комфортну температуру в спальні.
          ## Обмеження екранного часу
          Припиніть використовувати електронні пристрої за 1-2 години до сну.
          ## Релаксаційні ритуали
          Створіть вечірній ритуал: тепла ванна, читання, медитація.
          ## Обмеження кофеїну та алкоголю
          Уникайте кофеїну після обіду та алкоголю перед сном.
          ## Регулярна фізична активність
          Вправи покращують якість сну, але уникайте інтенсивних тренувань перед сном.
          ## Збалансоване харчування
          Уживайте їжу, багату на триптофан, магній та вітаміни групи B.
                  `,
          mp_article_content_5: `
          # Основи медитації для новачків
          ## Початок з малого
          Почніть з 5-10 хвилин на день і поступово збільшуйте час.
          ## Зосередження на диханні
          Сфокусуйтесь на відчутті дихання - як повітря входить і виходить.
          ## Спостереження за думками
          Не намагайтеся зупинити думки, просто спостерігайте за ними без оцінки.
          ## Використання керованих медитацій
          Використовуйте додатки або аудіозаписи для керованих сесій.
          ## Створення комфортного простору
          Знайдіть тихе місце, де вас ніхто не турбуватиме.
          ## Регулярність
          Медитуйте регулярно, краще в один і той же час дня.
          ## Терпіння до себе
          Не критикуйте себе, якщо не виходить зосередитись. Це нормальна частина процесу.
                  `,
          mp_article_content_6: `
          # Стратегії покращення самооцінки
          ## Практика самоспівчуття
          Ставтесь до себе так, як до друга, який потребує підтримки.
          ## Визнання своїх сильних сторін
          Складіть список своїх сильних сторін та досягнень.
          ## Встановлення реалістичних цілей
          Ставте досяжні цілі та відзначайте прогрес.
          ## Обмеження негативного самомовлення
          Замініть критичні думки на підтримуючі.
          ## Оточення позитивними людьми
          Проводьте час з людьми, які підтримують та надихають вас.
          ## Догляд за собою
          Регулярно робіть те, що приносить вам радість та розслаблення.
          ## Професійна допомога
          Зверніться до психолога, якщо самооцінка значно впливає на якість життя.
                  `,
          mp_article_content_7: `
          # Профілактика та подолання вигорання
          ## Встановлення меж
          Навчіться говорити "ні" та встановлюйте здорові межі.
          ## Регулярні перерви
          Робіть короткі перерви протягом робочого дня.
          ## Пріоритизація завдань
          Фокусуйтесь на найважливіших завданнях та делегуйте, коли це можливо.
          ## Пошук сенсу
          Знайдіть особистий сенс у тому, що ви робите.
          ## Фізична активність
          Регулярні вправи допомагають боротися зі стресом.
          ## Соціальна підтримка
          Обговорюйте свої почуття з колегами, друзями або фахівцем.
          ## Відновлення балансу
          Знайдіть час для хобі та особистого життя поза роботою.
          ## Професійна допомога
          Не вагайтеся звернутися до психолога або коуча.
                  `,
          mp_article_not_found: "Статтю не знайдено",
          mp_article_not_found_desc_1: "Стаття з ID",
          mp_article_not_found_desc_2: "не існує.",
          mp_aew_ok: "Ок",
          mp_aew_balance: "Баланс",
          mp_aew_safety: "Безпека",
          mp_aew_neutrality: "Нейтральність",
          mp_aew_lethargy: "Млявість",
          mp_aew_carefreeness: "Безтурботність",
          mp_aew_relaxation: "Розслабленість",
          mp_aew_calmness: "Спокій",
          mp_aew_stability: "Стійкість",
          mp_aew_focus: "Зосередженість",
          mp_aew_so_so: "Таке",
          mp_aew_indifference: "Байдужість",
          mp_aew_nervousness: "Нервовість",
          mp_aew_slight_irritation: "Легке роздратування",
          mp_aew_doubt: "Сумнів",
          mp_aew_restlessness: "Неспокій",
          mp_aew_distrust: "Недовіра",
          mp_aew_tension: "Напруга",
          mp_aew_dissatisfaction: "Незадоволення",
          mp_aew_melancholy: "Туга",
          mp_aew_i_feel_sick: "Мені погано",
          mp_aew_fatigue: "Втома",
          mp_aew_self_pity: "Жалію себе",
          mp_aew_anxiety: "Тривога",
          mp_aew_sadness: "Сум",
          mp_aew_uncertainty: "Непевність",
          mp_aew_confusion: "Розгубленість",
          mp_aew_guilt: "Почуття провини",
          mp_aew_self_rejection: "Неприйняття себе",
          mp_aew_emptiness: "Спустошеність",
          mp_aew_terribly: "Жахливо",
          mp_aew_isolation: "Ізоляція",
          mp_aew_depression: "Депресія",
          mp_aew_envy: "Заздрість",
          mp_aew_deep_sorrow: "Глибокий смуток",
          mp_aew_shame: "Сором",
          mp_aew_despair: "Відчай",
          mp_aew_loneliness: "Самотність",
          mp_aew_hopelessness: "Безнадія",
          mp_aew_self_directed_aggression: "Агресія до себе",
          mp_aew_сool: "Круто",
          mp_aew_energy: "Енергія",
          mp_aew_satisfaction: "Задоволення",
          mp_aew_connection: "Відчуття зв'язку",
          mp_aew_comfort: "Комфорт",
          mp_aew_love: "Кохання",
          mp_aew_motivation: "Мотивація",
          mp_aew_determination: "Цілеспрямованість",
          mp_aew_respect: "Повага",
          mp_aew_friendship: "Дружність",
          mp_aew_good: "Добре",
          mp_aew_in_the_flow: "В потоці",
          mp_aew_pride: "Гордість",
          mp_aew_inspiration: "Натхнення",
          mp_aew_hope: "Надія",
          mp_aew_optimism: "Оптимізм",
          mp_aew_confidence: "Впевненість",
          mp_aew_joy: "Радість",
          mp_aew_gratitude: "Подяка",
          mp_aew_openness: "Відкритість",
          mp_aew_great: "Чудово",
          mp_aew_bliss: "Блаженство",
          mp_aew_delight: "Захват",
          mp_aew_admiration: "Захоплення",
          mp_aew_excitement: "Збудження",
          mp_aew_elation: "Піднесення",
          mp_aew_euphoria: "Ейфорія",
          mp_aew_devotion: "Відданість",
          mp_aew_love_of_life: "Любов до життя",
          mp_aew_triumph: "Тріумф",
          mp_aew_people: "Люди",
          mp_aew_myself: "Я сам",
          mp_aew_family: "Родина",
          mp_aew_friends: "Друзі",
          mp_aew_partner: "Партнер",
          mp_aew_colleagues: "Колеги",
          mp_aew_events: "Події",
          mp_aew_work: "Робота",
          mp_aew_training: "Тренування",
          mp_aew_driving: "Водіння",
          mp_aew_rest: "Відпочинок",
          mp_aew_studying: "Навчання",
          mp_aew_places: "Місця",
          mp_aew_home: "Дім",
          mp_aew_office: "Офіс",
          mp_aew_school: "Школа",
          mp_aew_university: "Університет",
          mp_aew_street: "Вулиця",
          mp_edp_sports: "Спорт",
          mp_edp_coffee: "Кава",
          mp_edp_alcohol: "Алкоголь",
          mp_edp_sex: "Секс",
          mp_edp_meditation: "Медитація",
          mp_edp_antidepressants: "Антидепресанти",
          mp_edp_other: "Інше",
          mp_edp_not_specified: "Не вказано",
          mp_aew_wizard_title_step_1: "Я відчуваю",
          mp_aew_wizard_title_step_2: "Що було причиною цих емоцій?",
          mp_aew_wizard_title_step_3: "Хочеш написати щось про",
          mp_aew_wizard_description_step_3: "Ваша замітка є приватною і її видно тільки вам.",
          mp_return_back: "Повернутись назад",
          mp_btn_next: "Далі",
          mp_btn_add: "Додати",
          mp_btn_back: "Назад",
          mp_btn_cancel: "Скасувати",
          mp_btn_lets_start: "Почнемо?",
          mp_btn_continue: "Продовжити",
          mp_btn_start: "Почати",
          mp_btn_save: "Зберегти",
          mp_btn_result: "Результат",
          mp_btn_try_again: "Спробувати ще раз",
          mp_bpp_title: "Дихальні практики",
          mp_bpp_subtitle: "Видихни стрес — вдихни спокій 🌿",
          mp_bpp_description_1: "Прості вправи на дихання допомагають зняти напругу, відновити енергію та повернути ясність думок. Почати можна будь-де: вдома, на роботі чи навіть у транспорті.",
          mp_bpp_description_2: "Спробуй — і відчуй, як тіло розслабляється, а настрій стає легшим.",
          mp_bpp_card_title_1: "Діафрагмальне дихання",
          mp_bpp_card_description_1_1: "Зменшить стрес і тривогу.",
          mp_bpp_card_description_1_2: "Розслабляє, знімає напругу.",
          mp_bpp_card_title_2: "Дихання Квадрат",
          mp_bpp_card_description_2_1: "Знімає тривогу й допомагає зосередитись.",
          mp_bpp_card_title_3: "Наді шодхана",
          mp_bpp_card_description_3_1: "Дихання по черзі через ніздрі.",
          mp_bpp_card_description_3_2: "Допомагає зняти стрес.",
          mp_bpp_card_description_3_3: "Повертає внутрішню рівновагу.",
          mp_dbp_title: "Діафрагмальне дихання",
          mp_dbp_subtitle: "Дихання, що повертає спокій",
          mp_dbp_description_1_1: "Сядь зручно. Розслаб плечі. Виконуй хочаб 3 - 5 хвилин.",
          mp_dbp_description_1_2: "Повертайся до дихання, як відчуєш напругу.",
          mp_dbp_inhale: "ВДИХ",
          mp_dbp_hold: "ТРИМАЙ",
          mp_dbp_exhale: "ВИДИХ",
          mp_dbp_come_on_more: "ДАВАЙ ЩЕ",
          mp_ebp_title: "Щоденник емоцій",
          mp_ebp_factor_title: "Фактори настрою",
          mp_ebp_factor_info_p_1: "Всі фактори - твої можливі тригери.",
          mp_ebp_factor_info_p_2: "Наприклад, ви можете не помічати, що спорт, кава або наркотики впливають на ваш настрій і формують поведінкові патерни.",
          mp_ebp_factor_info_p_3: "Ви можете відстежити вплив факторів на ваше самопочуття пізніше в розділі аналітики.",
          mp_ebp_factor_info_p_4: "Приклад",
          mp_ebp_factor_info_p_5: "Харчування та стимулятори:",
          mp_ebp_factor_info_p_6: "Записуй споживання кави, вітамінів або продуктів, які можуть вплинути на рівень енергії.",
          mp_ebp_factor_info_p_7: "Активність та фізичні вправи:",
          mp_ebp_factor_info_p_8: "Відстежуй кількість фізичних вправ або участь у інших формах фізичної активності.",
          mp_ebp_factor_info_p_9: "Біологічні цикли:",
          mp_ebp_factor_info_p_10: "Відстежуючи свої місячні, ви зможете зрозуміти, як вони впливають на ваше емоційне самопочуття.",
          mp_ebp_selected_factors: "Обрані фактори:",
          mp_ebp_available_factors: "Доступні фактори:",
          mp_ebp_hello_how_are_you: "Привіт! Ти як?",
          mp_ebp_factor: "Фактори",
          mp_ebp_add_factor: "Додати фактор",
          mp_mhp_title: "Твій спокій починається тут.",
          mp_mhp_sub_title: "Ми зібрали інструменти, які допоможуть залишитись врівноваженим навіть у найстресовіші дні.",
          mp_mhp_test_card_title: "Тести на стан",
          mp_mhp_test_card_btn_text: "Пройти тест",
          mp_mhp_breathing_card_title: "Дихальні практики",
          mp_mhp_breathing_card_btn_text: "Обрати практику",
          mp_mhp_articles_card_title: "Корисні статті",
          mp_mhp_articles_card_btn_text: "Переглянути статті",
          mp_mhp_choose_specialist: "Обрати спеціаліста",
          mp_mtp_test_data_question_1: "Як ти прокидаєшся вранці?",
          mp_mtp_test_data_answers_1_1: "З ентузіазмом і планами",
          mp_mtp_test_data_answers_1_2: "Зі склянкою води та тяжким зітханням",
          mp_mtp_test_data_answers_1_3: "“Що знову цей день?”",
          mp_mtp_test_data_question_2: "Коли щось іде не так, твоя реакція:",
          mp_mtp_test_data_answers_2_1: "Ок, придумаю, як виправити",
          mp_mtp_test_data_answers_2_2: "Ну, таке життя",
          mp_mtp_test_data_answers_2_3: "Все пропало, я йду в плед",
          mp_mtp_test_data_question_3: "Що тебе рятує від стресу найчастіше?",
          mp_mtp_test_data_answers_3_1: "Спорт чи прогулянка",
          mp_mtp_test_data_answers_3_2: "Їжа, серіальчик чи мемчики",
          mp_mtp_test_data_answers_3_3: "Я просто зависаю без сил",
          mp_mtp_test_data_question_4: "Твоє відчуття енергії останнім часом:",
          mp_mtp_test_data_answers_4_1: "Нормально, заряд тримається",
          mp_mtp_test_data_answers_4_2: "Як батарейка на 30%",
          mp_mtp_test_data_answers_4_3: "Як телефон, що вимикається на холоді",
          mp_mtp_test_data_question_5: "Що ти думаєш, коли чуєш слово \"відпочинок\"?",
          mp_mtp_test_data_answers_5_1: "Планую, щось приємне",
          mp_mtp_test_data_answers_5_2: "Лежати вдома й нічого не робити",
          mp_mtp_test_data_answers_5_3: "У мене немає часу на відпочинок",
          mp_mtp_test_result_title_1: "Твоя менталочка в нормі.",
          mp_mtp_test_result_description_1: "Ти маєш чудовий рівень енергії та оптимізму. Продовжуй дбати про себе та підтримувати цей стан!",
          mp_mtp_test_result_title_2: "Менталочка переважно в нормі.",
          mp_mtp_test_result_description_2: "Більшість справ йдуть добре, але деякі сфери потребують трохи більше уваги та турботи.",
          mp_mtp_test_result_title_3: "Менталочка трохи виснажена",
          mp_mtp_test_result_description_3: "Ти відчуваєш легку втому. Знайди час для відпочинку та маленьких радощів.",
          mp_mtp_test_result_title_4: "Менталочка просить турботи",
          mp_mtp_test_result_description_4: "Тобі треба більше відпочинку, радощів і підтримки. Зверни увагу на свої потреби.",
          mp_mtp_test_result_title_5: "Менталочка кричить SOS",
          mp_mtp_test_result_description_5: "Ти можеш відчувати вигорання. Не соромся звертатися за допомогою та знайди час для серйозного відпочинку.",
          mp_mtp_test_result_title_6: "Твоя менталочка — як американські гірки.",
          mp_mtp_test_result_description_6: "Твій стан часто міняється. Деякі дні чудові, інші - складніші. Намагайся знайти баланс.",
          mp_mtp_start_message: "Увага! Тест не має діагностичної сили, але показує твій рівень стресу чи вигорання.",
          mp_mtp_test_title: "Тест на стан твоєї менталочки",
          mp_mtp_test_description: "Тицяй відповіді, які відповідають твоєму стану)",
          mp_nsp_title: "Наді Шодхана",
          mp_nsp_subtitle: "Дихання, що балансує енергію",
          mp_nsp_description_1: "Техніка чергування ніздрей для гармонізації розуму та тіла.",
          mp_nsp_description_2: "Виконуй 3-5 хвилин для досягнення ефекту.",
          mp_nsp_technique_title: "Техніка:",
          mp_nsp_technique_step_1: "Сядь зручно, вирівняй спину.",
          mp_nsp_technique_step_2: "Рукою закрий праву ніздрю, вдихни через ліву.",
          mp_nsp_technique_step_3: "Потім закрий ліву — видихни через праву.",
          mp_nsp_technique_step_4: "Вдихни правою — видихни лівою.",
          mp_nsp_technique_step_5: "Продовжуй кілька хвилин у спокійному темпі.",
          mp_nsp_result_title: "Результат:",
          mp_nsp_result_description_1: "Вже через кілька хвилин з'являється відчуття спокою. Знижується рівень напруги. Розум прояснюється, наче після короткого відпочинку.",
          mp_nsp_result_description_2: "Регулярна практика допомагає краще засинати, концентруватися та зберігати внутрішню рівновагу навіть у стресових ситуаціях.",
          mp_sbp_title: "Дихання Квадрат",
          mp_sbp_subtitle: "Дихання, що повертає спокій",
          mp_sbp_description_1: "Сядь зручно. Розслаб плечі. Виконуй хочаб 3 - 5 хвилин.",
          mp_sbp_description_2: "Повертайся до дихання, як відчуєш напругу.",

          // --- Переклади для твого здоров'я ---
          mp_yhp_main_title: "Твоє здоров'я —",
          mp_yhp_main_subtitle: "Твоя суперсила. Вона стоїть на 3х китах:",
          mp_yhp_activity_title: "Активність",
          mp_yhp_activity_description_1: "Навіть 15 хвилин на день, вже роблять різницю.",
          mp_yhp_activity_description_2: "Прогулянка, скакалка, пілатес – оберіть те, що подобається, і тіло скаже 'дякую'.",
          mp_yhp_sleep_title: "Сон",
          mp_yhp_sleep_description_1: "Це найважливіше за все!",
          mp_yhp_sleep_description_2: "Сон – це не лінь, а твій внутрішній зарядний кабель. 7-8 годин якісного відпочинку допомагають тілу відновитися, а мозку – працювати швидко та креативно.",
          mp_yhp_nutrition_title: "Харчування",
          mp_yhp_nutrition_description_1: "Їжа - це пальне. Чим вона якісніше, тим краще працює твій 'двигун'.",
          mp_yhp_nutrition_description_2: "Не про дієти, а про баланс: більше овочів, менше стресу з перекусами.",

          // --- Переклади для чоловічого здоров'я ---
          hormonas_diagram: "Графік чоловічого здоров'я",
          mp_male_health: "Чоловіче здоров'я",
          mp_subtitle_1: "Бути чоловіком - це ще й про здоров'я",
          mp_hormones_block_title: "Гармони",
          mp_hormones_block_content_label_1: "Рівень тестостерону",
          mp_hormones_block_content_value_1_1: "норма 300-1000 нг/дл",
          mp_hormones_block_content_label_2: "Ознаки дефіциту",
          mp_hormones_block_content_value_2_1: "втома",
          mp_hormones_block_content_value_2_2: "низьке лібід",
          mp_hormones_block_content_value_2_3: "зниження м'язів",
          mp_hormones_block_content_label_3: "Що робити?",
          mp_hormones_block_content_value_3_1: "регулярні аналізи",
          mp_hormones_block_content_value_3_2: "силові тренування",
          mp_hormones_block_content_value_3_3: "якісний сон",
          mp_hormones_block_content_value_3_4: "менше стресу",
          mp_add_hormones_data: "Внести показники",
          mp_analyses_block_title: "Аналізи та профілактика",
          mp_analyses_block_content_label_1: "Загальний аналіз крові та сечі",
          mp_analyses_block_content_value_1: "щороку",
          mp_analyses_block_content_label_2: "Гармональний профіль",
          mp_analyses_block_content_value_2: "за потреби",
          mp_analyses_block_content_label_3: "ПСА",
          mp_analyses_block_content_value_3: "після 40років",
          mp_analyses_block_content_label_4: "УЗД органів малого таза",
          mp_analyses_block_content_value_4: "раз на 1-2 роки",
          mp_analyses_block_content_label_5: "Гармональний профіль",
          mp_analyses_block_content_value_5: "за рекомендацією лікаря",
          mp_reproductive_block_title: "Репродуктивне здоров'я",
          mp_reproductive_block_content_label_1: "Фертильність",
          mp_reproductive_block_content_value_1: "якість сперми залежить від способу життя",
          mp_reproductive_block_content_label_2: "Ризики",
          mp_reproductive_block_content_value_2: "перегрів, алкоголь, куріння, ожиріння",
          mp_reproductive_block_content_label_3: "Рекомендації",
          mp_reproductive_block_content_value_3: "Уролог 1/рік, спермограма",
          mp_urinary_block_title: "Сечова система",
          mp_urinary_block_content_label_1: "Перевірка простати",
          mp_urinary_block_content_value_1: "з 40 років — ПСА і УЗД 1/рік",
          mp_urinary_block_content_label_2: "Тривога!",
          mp_urinary_block_content_value_2: "біль, кров у сечі, часте сечевипускання",
          mp_urinary_block_content_label_3: "Що робити?",
          mp_urinary_block_content_value_3: "не терпимо дискомфорт, біжливо до уролога",
          mp_potency_block_title: "Потенція",
          mp_potency_block_content_label_1: "Чому знижується?",
          mp_potency_block_content_value_1: "стрес, алкоголь, куріння, хвороби серця",
          mp_potency_block_content_label_2: "Як підтримати?",
          mp_potency_block_content_value_2: "спорт, якісний сон, збалансоване харчування",
          mp_potency_block_content_label_3: "Коли до лікаря?",
          mp_potency_block_content_value_3: "якщо проблеми тривають понад 2 місяці",
          mp_subtitle_2: "Турбуйся про себе, як про улюблену автівку",
          mp_form_subtitle: "Заповни поля, якщо є актуальні данні, і ми складемо тобі графік",
          mp_form_testosterone: "Тестостерон",
          mp_form_free_testosterone: "Вільний тестостерон",
          mp_form_free_testosterone_2: "Вільний Т",
          mp_form_prolactin: "Пролактин",
          mp_form_estradiol: "Естрадіол",
          mp_form_lh: "ЛГ(лютейнзуючий гармон)",
          mp_form_lh_2: "ЛГ",
          mp_form_fsh: "ФСГ",
          mp_form_ng_dl: "нг/дл",
          mp_form_ng_ml: "нг/мл",
          mp_form_pg_ml: "пг/мл",
          mp_form_mO_l: "мО/л",
          mp_form_save_btn: "Зберегти показники",
          mp_diagram_hormons_value_not_found: "Дані про гормони не знайдено. Будь ласка, внесіть свої показники.",
          mp_diagram_hormons_data_not_found: "Помилка при завантаженні даних. Зверніться в тех підтримку.",
          mp_diagram_low: "Низький",
          mp_diagram_norm: "Норма",
          mp_diagram_high: "Високий",

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
          last_cycle_first_day: "1. Tag des letzten Zyklus",
          menstruation_calendar: "Menstruationskalender",

          // Переклади для здоров'я за статтю
          male: "Mann",
          female: "Frau",
          gender: "Gesundheit nach Geschlecht",
          female_health: "Frauengesundheit",
          female_health_fine: "Frauengesundheit ohne Tabus – ehrlich, einfach und mit Rücksicht auf Sie.",
          cycle_info: "Alles rund um deinen Zyklus",
          reproductive_health: "Reproduktive Gesundheit",
          hormonas: "Hormone",
          gynecology: "Ärztin",
          pregnancy: "Schwangerschaft und Wochenbett",
          prevention: "Prävention und regelmäßige Check-ups",
          useful_info: "Nützliche Informationen",
          day_tip: "Nützlicher\nTipp des\nTages",
          plan: "Planen Sie",
          preventive_check: "mindestens einmal im Jahr eine Vorsorgeuntersuchung ein",
          hormonas_health: "Gesunde Hormone",
          hormonas_important: "Warum ist es wichtig, den Hormonspiegel zu überwachen",
          cycle_health: "Ist der Zyklus wichtig?",
          cycle_important: "Warum es wichtig ist, jeden Zyklus zu verfolgen",
          examination_health: "Allgemeine Untersuchungen",
          examination_important: "Warum ist es wichtig, den Hormonspiegel zu überwachen",
          find_doctor: "Finden Sie einen Arzt in Ihrer Nähe",
          your_cycle: "Dein Zyklus",
          cycle_control: "Verfolgen Sie Ihren Zyklus, überwachen Sie Ihr Wohlbefinden und erhalten Sie rechtzeitig Erinnerungen",
          calendar_cycle: "Menstruationskalender",
          calc_cycle: "Berechnen Sie meinen Menstruationskalender",
          warning_calc: "*Unsere Menstruationskalenderberechnungen sind möglicherweise nicht 100% genau, da jeder Körper und jeder Zyklus anders ist. Helfen Sie uns, Ihren Kalender genauer zu gestalten.",
          cycle: "Zyklus",
          why_should_calendar: "Warum einen Menstruationskalender führen?",
          preview_calendar: "Beim Führen eines Menstruationskalenders geht es nicht nur darum, sich an «diese Tage» zu erinnern. Es ist ein kleines Selbstpflegeritual, das Ihnen hilft, Ihren Körper und Ihre Stimmung besser zu verstehen.",
          predict_cycle: "Zyklus vorhersagen",
          predict_cycle_desc: "Du weißt immer, wann deine Periode und der Eisprung beginnen. Das hilft, Ereignisse, Urlaube oder wichtige Termine zu planen.",
          listen_yourself: "Auf dich selbst hören",
          listen_yourself_desc: "Der Kalender hilft dir zu bemerken, wie sich Energie, Stimmung und Appetit in den verschiedenen Phasen des Zyklus verändern.",
          regularity: "Regelmäßigkeiten erkennen",
          regularity_desc: "Schmerzen, PMS, Stimmungsschwankungen oder Hautveränderungen fallen stärker auf. Es ist leicht nachzuvollziehen, was sich wiederholt und was dir guttut.",
          doctor_help: "Hilft dem Arzt",
          doctor_help_desc: "Wenn du zum Gynäkologen gehst, machen genaue Aufzeichnungen deines Zyklus und deiner Symptome die Beratung effektiver.",
          planing: "Gesundheits- und Fitnessplanung",
          planing_desc: "Du kannst Training, Ernährung oder Erholung an deinen Rhythmus anpassen, um den größten Nutzen zu erzielen.",
          finalize_calendar: "Ein Menstruationskalender ist keine Pflicht, sondern ein Werkzeug zur Selbsterkenntnis. Er hilft, sich sicherer zu fühlen, Stimmungsschwankungen vorherzusagen und gut für sich zu sorgen.",
          phase: "Phasen des Menstruationszyklus",
          proccess_in_body: "Was im Körper einer Frau passiert",
          proccess_in_body_desc: "Der Menstruationszyklus sind nicht nur 'diese Tage'. Er ist ein natürlicher Rhythmus, der dem Körper hilft, harmonisch zu funktionieren. Er ist in mehrere Phasen unterteilt, die unser Wohlbefinden, unsere Stimmung und Energie beeinflussen.",
          phase_1_5: "Menstruationsphase\n(1 — 5)",
          phase_1_5_desc: "Dies ist der Beginn des Zyklus. Der Körper stößt die alte Gebärmutterschleimhaut ab, was zu Menstruationsblutungen führt. Die Energie kann in dieser Zeit geringer sein, daher ist es gut, sich mehr Ruhe zu gönnen.",
          phase_6_13: "Follikelphase\n(6 — 13)",
          phase_6_13_desc: "Der Östrogenspiegel steigt allmählich an, wodurch Kraft und Motivation zurückkehren. Dies ist eine gute Zeit für neue Ideen, aktive Arbeit und Sport.",
          phase_14_16: "Ovulationsphase\n(14 — 16)",
          phase_14_16_desc: "Eine reife Eizelle wird freigesetzt. Frauen können sich selbstbewusst, attraktiv und voller Energie fühlen. Dies sind die 'Höhepunkt'-Tage, an denen der Körper für eine Empfängnis bereit ist.",
          phase_17_28: "Lutealphase\n(17 — 28)",
          phase_17_28_desc: "Wenn keine Schwangerschaft eintritt, dominiert Progesteron. Müdigkeit, Stimmungsschwankungen und Heißhunger auf Süßes können auftreten. Es ist wichtig, auf sich selbst zu hören, mehr zu ruhen und auf das emotionale Wohlbefinden zu achten.",
          finalize_cycle: "Der Menstruationszyklus ist kein Feind, sondern ein natürlicher Kalender unseres Körpers. Wenn man auf seine Phasen achtet, kann man den Tag besser planen, Stimmungsschwankungen verstehen und mehr Harmonie mit sich selbst finden.",
          go_back: "Geh zurück",
          now: "jetzt",
          menstruation: "menstruation",
          scheduled_menstruation: "geplante menstruation",
          ovulation: "ovulation",
          planned_ovulation: "geplanter eisprung",
          ovulation_in: "eisprung in",
          low_chance: "Geringe Wahrscheinlichkeit, schwanger zu werden",
          average_chance: "Durchschnittliche Wahrscheinlichkeit, schwanger zu werden",
          high_chance: "Hohe Wahrscheinlichkeit, schwanger zu werden",
          no_chance: "Sehr geringe Wahrscheinlichkeit, schwanger zu werden",
          myth_facts: "Mythen und Fakten",
          one: 'Tag',
          other: 'Tage',
          c_long: "Ihr Zyklus dauerte {{cLong}} Tage. Das ist normal!",
          phase_1: "Sie befinden sich derzeit in Ihrer Menstruationsphase!\nDies ist der Beginn Ihres Zyklus.\nSie fühlen sich möglicherweise energielos!\nAchten Sie in dieser Zeit am besten auf sich selbst und ruhen Sie sich aus!",
          phase_2: "Sie befinden sich jetzt in der Follikelphase!\nDas Hormon Östrogen nimmt aktiv zu.\nIhre Stimmung verbessert sich. Ihre Haut wird besser!\nSie sind bereit, die ganze Welt zu erobern!",
          phase_3: "Sie befinden sich jetzt in der Ovulationsphase!\nEine reife Eizelle wird freigesetzt.\nSie fühlen sich selbstbewusst und voller Energie!\nHeute ist ein großartiger Tag, um das zu tun, was Ihnen Freude bereitet!",
          phase_4: "Sie befinden sich jetzt in der Lutealphase!\nProgesteron beginnt zu dominieren!\nWährend dieser Zeit können Stimmungsschwankungen und Schläfrigkeit auftreten!\nAchten Sie auf Ihr Wohlbefinden und hören Sie auf Ihre Gefühle!",
          super: "Super!",
          gynecology_sub: "Alles rund um regelmäßige Vorsorgeuntersuchungen, Prävention und die Pflege der Frauengesundheit – einfach und ohne Tabus.",
          womens_tests: "Prüfungen und Tests",
          regular_review: "Regelmäßige Kontrolluntersuchungen",
          articles_: "Artikel",
          read: "Lesen",
          how_often: "Wie oft sollte\nman zum\nFrauenarzt gehen?",
          top_5_tests: "TOP 5 Tests für die\nGesundheit von Frauen",
          review_sub: "Die Sorge um Ihre Gesundheit beginnt mit der Prävention. Einmal im Jahr sind Sie dem Problem einen Schritt voraus.",
          what_to_check_regulary: "Was sollte regelmäßig getan werden?",
          gynecology_review: "Untersuchung beim Gynäkologen",
          one_time_per_year: "einmal pro Jahr",
          pap_test: "Pap-Test",
          _2_3_time_per_year: "alle 2–3 Jahre",
          blood_test: "Blut- und Urintest",
          ultrasound_test: "Beckenultraschall",
          if_need: "bei Bedarf",
          mammography: "Mammographie",
          after_40_years: "nach dem 40. Lebensjahr",
          examination_head: "Prüfungen und Tests",
          examination_desc: "Die richtigen und rechtzeitigen Tests sind der Schlüssel zur Gesundheit. Informieren Sie sich, welche Tests und Untersuchungen Sie regelmäßig durchführen lassen sollten.",
          base_review: "Grunduntersuchung",
          gynecology_examination: "Gynäkologische Untersuchung",
          add_to_calendar: "Zum Kalender hinzufügen",
          ultrasound_glands: "Brustultraschall",
          need_I_test: "Muss ich Tests machen, wenn ich mich gut fühle?",
          examination_tip_need: "Regelmäßige medizinische Untersuchungen sind wichtig, auch wenn Sie keine Beschwerden haben. Viele Krankheiten entwickeln sich in frühen Stadien still, und rechtzeitig durchgeführte Basisuntersuchungen (Blut, Urin, Blutzucker, Cholesterin) helfen, Probleme zu erkennen, bevor Symptome auftreten.\n\nJährliche Untersuchungen sind eine Investition in Ihre Gesundheit. Sie ermöglichen es, Ihren Körper zu überwachen, Ernährung und Lebensstil anzupassen und Komplikationen vorzubeugen.\n\nSich gut zu fühlen ist großartig, aber Prävention ist immer einfacher und kostengünstiger als Behandlung.",
          what_needed_blood: "Was sollte ich vor einer Blutuntersuchung vorbereiten?",
          what_needed_blood_info: "Um genaue Bluttestergebnisse zu erhalten, bereiten Sie sich im Voraus vor:\n\nVor der Untersuchung nüchtern bleiben, die letzte Mahlzeit sollte 8–12 Stunden zurückliegen\n\nNur stilles Wasser trinken, das beeinflusst die Ergebnisse nicht\n\nVermeiden Sie ein bis zwei Tage vorher Alkohol, fettige und sehr süße Speisen\n\nAm Tag der Untersuchung intensive körperliche Anstrengungen und Stress vermeiden\n\nWenn Sie Medikamente einnehmen, informieren Sie unbedingt Ihren Arzt",
          what_diff_ultrasound_mam: "Was ist der Unterschied zwischen Ultraschall und Mammographie?",
          what_diff_ultrasound_mam_info: "Ultraschall verwendet Schallwellen zur Darstellung von Gewebe und zeigt weiche Strukturen der Brust gut, besonders bei jungen Frauen mit dichtem Gewebe\n\nMammographie ist eine Röntgenuntersuchung, die kleine Verkalkungen und frühe Anzeichen von Tumoren erkennen kann, bevor Knoten auftreten\n\nUltraschall verwendet keine Strahlung und eignet sich zur zusätzlichen Kontrolle\nMammographie bleibt das wichtigste Screening-Verfahren für Frauen über 40\n\nBeide Methoden werden oft zusammen verwendet, um eine genauere Diagnose zu erhalten",
          why_pap_test: "Warum einen Pap-Abstrich machen und wie oft?",
          why_pap_test_info: "Ein Pap-Abstrich hilft, Veränderungen der Gebärmutterhalszellen frühzeitig zu erkennen, wenn noch keine Symptome vorliegen\n\nRegelmäßige Vorsorge verhindert die Entstehung von Krebs und ermöglicht eine rechtzeitige Behandlung von Entzündungsprozessen\n\nNormalerweise wird der Pap-Test einmal im Jahr durchgeführt, wenn keine Probleme bestehen, oder häufiger nach Empfehlung des Arztes\n\nDie Untersuchung ist schnell, schmerzlos und dauert nur wenige Minuten\n\nAuch wenn Sie sich wohl fühlen, hilft der Test, Ihre Gesundheit zu pflegen",
          reproductive: "Reproduktive Gesundheit",
          reproductive_sub: "Planen Sie mit uns! Achten Sie auf Ihren Körper und planen Sie mit Zuversicht für die Zukunft.",
          myth_main: "Es gibt viele Mythen rund um die Menstruation.",
          myth_sub: "Hier ist eine kleine Auswahl für dich)",
          cant_sport: "Während der Periode darf man keinen Sport treiben",
          cant_sport_desc: "Leichte körperliche Aktivität wie Yoga, Spaziergänge oder moderates Training kann Krämpfe lindern und die Stimmung verbessern.",
          c_long_: "Der Zyklus dauert immer genau 28 Tage",
          c_long_desc: "Jeder Zyklus ist individuell: Ein Intervall von etwa 21 bis 35 Tagen gilt als normal.",
          cant_swim: "Man darf während der Periode nicht baden oder schwimmen",
          cant_swim_desc: "Baden und Duschen sind sicher. Hygieneprodukte (Tampons, Menstruationstassen) ermöglichen komfortables Schwimmen und Sauberkeit.",
          cant_get_pregnant: "Man kann während der Periode nicht schwanger werden",
          cant_get_pregnant_desc: "Die Wahrscheinlichkeit ist geringer, aber nicht null: Spermien können mehrere Tage im Körper überleben, und der Eisprung kann früher oder später als erwartet auftreten.",
          pain_is_ok: "Menstruationsschmerzen sind immer normal",
          pain_is_ok_desc: "Leichte Beschwerden sind üblich, aber starke oder einschränkende Schmerzen können auf Endometriose oder andere Erkrankungen hinweisen und sollten ärztlich untersucht werden.",

          // --- Переклади для посилань в мапінгу ---
          your: "Deine Gesundheit",
          diary: "Emotionstagebuch",
          breathing: "Atemübungen",
          diaphragmatic: "Zwerchfellatmung",
          square: "Quadratisches Atmen",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "Zustandstest",
          articles: "Nützliche Artikel",
          article_1: "10 Einfache Techniken zum Stressabbau",
          article_2: "Effektive Methoden zur Bewältigung von Angstzuständen",
          article_3: "Atemtechniken zur Entspannung",
          article_4: "Der Zusammenhang zwischen Schlaf und psychischer Gesundheit",
          article_5: "Grundlagen der Meditation für Anfänger",
          article_6: "Strategien zur Verbesserung des Selbstwertgefühls",
          article_7: "Prävention und Überwindung von Burnout",

          // --- Переклади для меню здоров'я ---
          hmp_your_health: "Deine Gesundheit",
          hmp_mental_health: "Psychische Gesundheit",

          // --- Переклади для ментального здоров'я ---
          mp_aew_notes: "Notiz",
          mp_aew_describe_your_feelings: "Beschreiben Sie Ihre Gefühle genauer...",
          mp_articles_title: "Nützliche Artikel",
          mp_article_1: "10 Einfache tägliche Techniken zur Stressreduzierung",
          mp_article_2: "Wie man mit Angst umgeht",
          mp_article_3: "Atemübungen zur Entspannung",
          mp_article_4: "Gesunder Schlaf und psychische Gesundheit",
          mp_article_5: "Meditation für Anfänger",
          mp_article_6: "Wie man das Selbstwertgefühl steigert",
          mp_article_7: "Effektive Methoden zur Bekämpfung von Burnout",
          mp_article_content_1: `
          # 10 Einfache Techniken zum Stressabbau
          ## Tiefes Atmen
          Machen Sie einige tiefe Ein- und Ausatmungen und konzentrieren Sie sich auf das Atmen. Die "4-4-4"-Technik ist einfach: 4 Sekunden einatmen, den Atem 4 Sekunden anhalten, 4 Sekunden ausatmen. Dies beruhigt das Nervensystem.
          ## Progressive Muskelentspannung
          Spannen und entspannen Sie nacheinander alle Muskelgruppen, beginnend bei den Zehen bis hin zum Gesicht.
          ## Meditation
          Verbringen Sie 5-10 Minuten pro Tag mit Meditation. Konzentrieren Sie sich auf den Atem oder nutzen Sie geführte Meditationen.
          ## Spaziergang an der frischen Luft
          Tägliche 20-minütige Spaziergänge reduzieren den Cortisolspiegel und verbessern die Stimmung.
          ## Aromatherapie
          Verwenden Sie ätherische Öle von Lavendel, Kamille oder Bergamotte zur Entspannung.
          ## Tagebuch führen
          Schreiben Sie Ihre Gedanken und Gefühle auf. Dies hilft, Gedanken zu strukturieren und Stress abzubauen.
          ## Musik hören
          Ruhige Musik oder Naturgeräusche können den Stresspegel erheblich senken.
          ## "5-4-3-2-1"-Technik
          Nennen Sie: 5 Dinge, die Sie sehen; 4 Dinge, die Sie fühlen; 3 Dinge, die Sie hören; 2 Dinge, die Sie riechen; 1 Ding, das Sie schmecken können.
          ## Yoga und Dehnung
          Einfache Yoga-Übungen helfen, Muskelverspannungen zu lösen.
          ## Nachrichtenkonsum einschränken
          Begrenzen Sie die Zeit, die Sie mit dem Ansehen von Nachrichten verbringen, um die Informationsbelastung zu reduzieren.
                  `,
          mp_article_content_2: `
          # Effektive Methoden zur Bekämpfung von Angstzuständen
          ## Grounding-Techniken
          Verwenden Sie Grounding-Techniken, um in die Realität zurückzukehren. Konzentrieren Sie sich zum Beispiel auf körperliche Empfindungen.
          ## Kognitive Verhaltenstherapie
          Identifizieren Sie negative Gedanken und ersetzen Sie sie durch realistischere.
          ## Regelmäßige Bewegung
          Körperliche Aktivität reduziert Angst und verbessert die Stimmung.
          ## Koffeineinschränkung
          Koffein kann Angst verstärken, daher sollten Sie den Konsum einschränken.
          ## Qualitativer Schlaf
          Ein regelmäßiger Schlafrhythmus hilft, Angst zu reduzieren.
          ## Soziale Unterstützung
          Besprechen Sie Ihre Gefühle mit nahestehenden Personen oder einem Fachmann.
          ## Dankbarkeitspraxis
          Schreiben Sie täglich 3 Dinge auf, für die Sie dankbar sind.
                  `,
          mp_article_content_3: `
          # Atemtechniken zur Entspannung
          ## Bauchatmung
          Legen Sie sich hin oder setzen Sie sich bequem hin. Legen Sie eine Hand auf die Brust, die andere auf den Bauch. Atmen Sie langsam durch die Nase ein und spüren Sie, wie sich der Bauch hebt. Atmen Sie durch den Mund aus.
          ## "4-7-8"-Technik
          Atmen Sie durch die Nase für 4 Zählzeiten ein, halten Sie den Atem für 7 Zählzeiten an, atmen Sie durch den Mund für 8 Zählzeiten aus.
          ## Gleiches Atmen
          Atmen Sie für die gleiche Anzahl von Zählzeiten ein und aus (z.B. 4-4 oder 5-5).
          ## Atmung mit verlängerter Ausatmung
          Atmen Sie für 4 Zählzeiten ein, atmen Sie für 6-8 Zählzeiten aus.
          ## Wechselatmung durch die Nasenlöcher
          Schließen Sie das rechte Nasenloch, atmen Sie durch das linke ein. Halten Sie den Atem an. Schließen Sie das linke Nasenloch, atmen Sie durch das rechte aus.
                  `,
          mp_article_content_4: `
          # Der Zusammenhang zwischen Schlaf und psychischer Gesundheit
          ## Regelmäßiger Schlafrhythmus
          Gehen Sie jeden Tag zur gleichen Zeit ins Bett und stehen Sie auf, auch am Wochenende.
          ## Schaffen idealer Schlafbedingungen
          Sorgen Sie für Dunkelheit, Ruhe und eine angenehme Temperatur im Schlafzimmer.
          ## Bildschirmzeit einschränken
          Hören Sie 1-2 Stunden vor dem Schlafengehen auf, elektronische Geräte zu benutzen.
          ## Entspannungsrituale
          Schaffen Sie ein Abendritual: ein warmes Bad, Lesen, Meditation.
          ## Einschränkung von Koffein und Alkohol
          Vermeiden Sie Koffein nach dem Mittagessen und Alkohol vor dem Schlafengehen.
          ## Regelmäßige körperliche Aktivität
          Bewegung verbessert die Schlafqualität, aber vermeiden Sie intensive Workouts vor dem Schlafengehen.
          ## Ausgewogene Ernährung
          Verzehren Sie Lebensmittel, die reich an Tryptophan, Magnesium und B-Vitaminen sind.
                  `,
          mp_article_content_5: `
          # Grundlagen der Meditation für Anfänger
          ## Klein anfangen
          Beginnen Sie mit 5-10 Minuten pro Tag und steigern Sie die Zeit allmählich.
          ## Fokus auf den Atem
          Konzentrieren Sie sich auf die Empfindung des Atems - wie die Luft ein- und ausströmt.
          ## Beobachten von Gedanken
          Versuchen Sie nicht, Gedanken zu stoppen, beobachten Sie sie einfach, ohne sie zu bewerten.
          ## Verwendung geführter Meditationen
          Verwenden Sie Apps oder Audioaufnahmen für geführte Sitzungen.
          ## Schaffen eines komfortablen Raums
          Suchen Sie sich einen ruhigen Ort, an dem Sie niemand stört.
          ## Regelmäßigkeit
          Meditieren Sie regelmäßig, vorzugsweise zur gleichen Tageszeit.
          ## Geduld mit sich selbst
          Kritisieren Sie sich nicht, wenn Sie sich nicht konzentrieren können. Dies ist ein normaler Teil des Prozesses.
                  `,
          mp_article_content_6: `
          # Strategien zur Verbesserung des Selbstwertgefühls
          ## Selbstmitgefühl praktizieren
          Behandeln Sie sich so, wie Sie einen Freund behandeln würden, der Unterstützung braucht.
          ## Anerkennen der eigenen Stärken
          Machen Sie eine Liste Ihrer Stärken und Erfolge.
          ## Setzen realistischer Ziele
          Setzen Sie erreichbare Ziele und feiern Sie Fortschritte.
          ## Negatives Selbstgespräch einschränken
          Ersetzen Sie kritische Gedanken durch unterstützende.
          ## Umgeben mit positiven Menschen
          Verbringen Sie Zeit mit Menschen, die Sie unterstützen und inspirieren.
          ## Selbstfürsorge
          Tun Sie regelmäßig Dinge, die Ihnen Freude und Entspannung bringen.
          ## Professionelle Hilfe
          Wenden Sie sich an einen Psychologen, wenn das Selbstwertgefühl Ihre Lebensqualität erheblich beeinträchtigt.
                  `,
          mp_article_content_7: `
          # Prävention und Überwindung von Burnout
          ## Grenzen setzen
          Lernen Sie, "Nein" zu sagen und setzen Sie gesunde Grenzen.
          ## Regelmäßige Pausen
          Machen Sie kurze Pausen während des Arbeitstages.
          ## Priorisierung von Aufgaben
          Konzentrieren Sie sich auf die wichtigsten Aufgaben und delegieren Sie, wann immer möglich.
          ## Sinnfindung
          Finden Sie eine persönliche Bedeutung in dem, was Sie tun.
          ## Körperliche Aktivität
          Regelmäßige Bewegung hilft, Stress zu bekämpfen.
          ## Soziale Unterstützung
          Besprechen Sie Ihre Gefühle mit Kollegen, Freunden oder einem Fachmann.
          ## Wiederherstellung des Gleichgewichts
          Finden Sie Zeit für Hobbys und das Privatleben außerhalb der Arbeit.
          ## Professionelle Hilfe
          Zögern Sie nicht, einen Psychologen oder Coach zu kontaktieren.
                  `,
          mp_article_not_found: "Artikel nicht gefunden",
          mp_article_not_found_desc_1: "Artikel mit ID",
          mp_article_not_found_desc_2: "existiert nicht.",
          mp_aew_ok: "Ok",
          mp_aew_balance: "Gleichgewicht",
          mp_aew_safety: "Sicherheit",
          mp_aew_neutrality: "Neutralität",
          mp_aew_lethargy: "Lethargie",
          mp_aew_carefreeness: "Sorglosigkeit",
          mp_aew_relaxation: "Entspannung",
          mp_aew_calmness: "Ruhe",
          mp_aew_stability: "Stabilität",
          mp_aew_focus: "Fokus",
          mp_aew_so_so: "So lala",
          mp_aew_indifference: "Gleichgültigkeit",
          mp_aew_nervousness: "Nervosität",
          mp_aew_slight_irritation: "Leichte Reizbarkeit",
          mp_aew_doubt: "Zweifel",
          mp_aew_restlessness: "Unruhe",
          mp_aew_distrust: "Misstrauen",
          mp_aew_tension: "Anspannung",
          mp_aew_dissatisfaction: "Unzufriedenheit",
          mp_aew_melancholy: "Schwermut",
          mp_aew_i_feel_sick: "Mir ist schlecht",
          mp_aew_fatigue: "Müdigkeit",
          mp_aew_self_pity: "Selbstmitleid",
          mp_aew_anxiety: "Angst",
          mp_aew_sadness: "Traurigkeit",
          mp_aew_uncertainty: "Unsicherheit",
          mp_aew_confusion: "Verwirrung",
          mp_aew_guilt: "Schuldgefühl",
          mp_aew_self_rejection: "Selbstablehnung",
          mp_aew_emptiness: "Leere",
          mp_aew_terribly: "Furchtbar",
          mp_aew_isolation: "Isolation",
          mp_aew_depression: "Depression",
          mp_aew_envy: "Neid",
          mp_aew_deep_sorrow: "Tiefe Trauer",
          mp_aew_shame: "Scham",
          mp_aew_despair: "Verzweiflung",
          mp_aew_loneliness: "Einsamkeit",
          mp_aew_hopelessness: "Hoffnungslosigkeit",
          mp_aew_self_directed_aggression: "Selbstaggression",
          mp_aew_сool: "Cool",
          mp_aew_energy: "Energie",
          mp_aew_satisfaction: "Zufriedenheit",
          mp_aew_connection: "Verbindungsgefühl",
          mp_aew_comfort: "Komfort",
          mp_aew_love: "Liebe",
          mp_aew_motivation: "Motivation",
          mp_aew_determination: "Entschlossenheit",
          mp_aew_respect: "Respekt",
          mp_aew_friendship: "Freundlichkeit",
          mp_aew_good: "Gut",
          mp_aew_in_the_flow: "Im Flow",
          mp_aew_pride: "Stolz",
          mp_aew_inspiration: "Inspiration",
          mp_aew_hope: "Hoffnung",
          mp_aew_optimism: "Optimismus",
          mp_aew_confidence: "Selbstvertrauen",
          mp_aew_joy: "Freude",
          mp_aew_gratitude: "Dankbarkeit",
          mp_aew_openness: "Offenheit",
          mp_aew_great: "Großartig",
          mp_aew_bliss: "Glückseligkeit",
          mp_aew_delight: "Entzücken",
          mp_aew_admiration: "Bewunderung",
          mp_aew_excitement: "Aufregung",
          mp_aew_elation: "Begeisterung",
          mp_aew_euphoria: "Euphorie",
          mp_aew_devotion: "Hingabe",
          mp_aew_love_of_life: "Lebensfreude",
          mp_aew_triumph: "Triumph",
          mp_aew_people: "Menschen",
          mp_aew_myself: "Ich selbst",
          mp_aew_family: "Familie",
          mp_aew_friends: "Freunde",
          mp_aew_partner: "Partner",
          mp_aew_colleagues: "Kollegen",
          mp_aew_events: "Ereignisse",
          mp_aew_work: "Arbeit",
          mp_aew_training: "Training",
          mp_aew_driving: "Autofahren",
          mp_aew_rest: "Ruhe",
          mp_aew_studying: "Lernen",
          mp_aew_places: "Orte",
          mp_aew_home: "Zuhause",
          mp_aew_office: "Büro",
          mp_aew_school: "Schule",
          mp_aew_university: "Universität",
          mp_aew_street: "Straße",
          mp_edp_sports: "Sport",
          mp_edp_coffee: "Kaffee",
          mp_edp_alcohol: "Alkohol",
          mp_edp_sex: "Sex",
          mp_edp_meditation: "Meditation",
          mp_edp_antidepressants: "Antidepressiva",
          mp_edp_other: "Andere",
          mp_edp_not_specified: "Nicht angegeben",
          mp_aew_wizard_title_step_1: "Ich fühle",
          mp_aew_wizard_title_step_2: "Was war die Ursache dieser Emotionen?",
          mp_aew_wizard_title_step_3: "Möchtest du etwas schreiben über",
          mp_aew_wizard_description_step_3: "Ihr Notiz ist privat und nur für Sie sichtbar.",
          mp_return_back: "Zurück",
          mp_btn_next: "Weiter",
          mp_btn_add: "Hinzufügen",
          mp_btn_back: "Zurück",
          mp_btn_cancel: "Abbrechen",
          mp_btn_lets_start: "Sollen wir beginnen?",
          mp_btn_continue: "Fortsetzen",
          mp_btn_start: "Starten",
          mp_btn_save: "Speichern",
          mp_btn_result: "Ergebnis",
          mp_btn_try_again: "Nochmal versuchen",
          mp_bpp_title: "Atemübungen",
          mp_bpp_subtitle: "Atme Stress aus — atme Ruhe ein 🌿",
          mp_bpp_description_1: "Einfache Atemübungen helfen, Spannungen abzubauen, Energie wiederherzustellen und geistige Klarheit zurückzubringen. Sie können überall beginnen: zu Hause, bei der Arbeit oder sogar unterwegs.",
          mp_bpp_description_2: "Probieren Sie es aus — und spüren Sie, wie sich Ihr Körper entspannt und Ihre Stimmung leichter wird.",
          mp_bpp_card_title_1: "Zwerchfellatmung",
          mp_bpp_card_description_1_1: "Reduziert Stress und Angst.",
          mp_bpp_card_description_1_2: "Entspannt, löst Verspannungen.",
          mp_bpp_card_title_2: "Quadratisches Atmen",
          mp_bpp_card_description_2_1: "Lindert Angst und hilft bei der Konzentration.",
          mp_bpp_card_title_3: "Nadi Shodhana",
          mp_bpp_card_description_3_1: "Wechselatmung durch die Nasenlöcher.",
          mp_bpp_card_description_3_2: "Hilft, Stress abzubauen.",
          mp_bpp_card_description_3_3: "Stellt das innere Gleichgewicht wieder her.",
          mp_dbp_title: "Zwerchfellatmung",
          mp_dbp_subtitle: "Atmung, die Ruhe zurückbringt",
          mp_dbp_description_1_1: "Setzen Sie sich bequem hin. Entspannen Sie die Schultern. Führen Sie es mindestens 3-5 Minuten lang aus.",
          mp_dbp_description_1_2: "Kehren Sie zum Atmen zurück, wenn Sie Spannung spüren.",
          mp_dbp_inhale: "EINATMEN",
          mp_dbp_hold: "HALTEN",
          mp_dbp_exhale: "AUSATMEN",
          mp_dbp_come_on_more: "WEITER SO",
          mp_ebp_title: "Emotionstagebuch",
          mp_ebp_factor_title: "Stimmungsfaktoren",
          mp_ebp_factor_info_p_1: "Alle Faktoren sind Ihre potenziellen Trigger.",
          mp_ebp_factor_info_p_2: "Zum Beispiel bemerken Sie vielleicht nicht, dass Sport, Kaffee oder Drogen Ihre Stimmung beeinflussen und Verhaltensmuster formen.",
          mp_ebp_factor_info_p_3: "Sie können den Einfluss der Faktoren auf Ihr Wohlbefinden später im Analysebereich verfolgen.",
          mp_ebp_factor_info_p_4: "Beispiel",
          mp_ebp_factor_info_p_5: "Ernährung und Stimulanzien:",
          mp_ebp_factor_info_p_6: "Notieren Sie Ihren Konsum von Kaffee, Vitaminen oder Lebensmitteln, die Ihren Energiespiegel beeinflussen könnten.",
          mp_ebp_factor_info_p_7: "Aktivität und körperliche Bewegung:",
          mp_ebp_factor_info_p_8: "Verfolgen Sie die Menge an körperlicher Bewegung oder die Teilnahme an anderen Formen körperlicher Aktivität.",
          mp_ebp_factor_info_p_9: "Biologische Zyklen:",
          mp_ebp_factor_info_p_10: "Indem Sie Ihre Perioden tracken, können Sie verstehen, wie sie sich auf Ihr emotionales Wohlbefinden auswirken.",
          mp_ebp_selected_factors: "Ausgewählte Faktoren:",
          mp_ebp_available_factors: "Verfügbare Faktoren:",
          mp_ebp_hello_how_are_you: "Hallo! Wie geht's dir?",
          mp_ebp_factor: "Faktoren",
          mp_ebp_add_factor: "Faktor hinzufügen",
          mp_mhp_title: "Deine Ruhe beginnt hier.",
          mp_mhp_sub_title: "Wir haben Werkzeuge gesammelt, die dir helfen, auch an den stressigsten Tagen ausgeglichen zu bleiben.",
          mp_mhp_test_card_title: "Zustandstests",
          mp_mhp_test_card_btn_text: "Test machen",
          mp_mhp_breathing_card_title: "Atemübungen",
          mp_mhp_breathing_card_btn_text: "Übung auswählen",
          mp_mhp_articles_card_title: "Nützliche Artikel",
          mp_mhp_articles_card_btn_text: "Artikel ansehen",
          mp_mhp_choose_specialist: "Spezialist auswählen",
          mp_mtp_test_data_question_1: "Wie wachst du morgens auf?",
          mp_mtp_test_data_answers_1_1: "Mit Enthusiasmus und Plänen",
          mp_mtp_test_data_answers_1_2: "Mit einem Glas Wasser und einem schweren Seufzer",
          mp_mtp_test_data_answers_1_3: "„Schon wieder dieser Tag?“",
          mp_mtp_test_data_question_2: "Wenn etwas schief geht, ist deine Reaktion:",
          mp_mtp_test_data_answers_2_1: "Ok, ich überlege, wie ich es reparieren kann",
          mp_mtp_test_data_answers_2_2: "Nun, so ist das Leben",
          mp_mtp_test_data_answers_2_3: "Alles ist verloren, ich verkrieche mich in meine Decke",
          mp_mtp_test_data_question_3: "Was rettet dich am häufigsten vor Stress?",
          mp_mtp_test_data_answers_3_1: "Sport oder ein Spaziergang",
          mp_mtp_test_data_answers_3_2: "Essen, Serien oder Memes",
          mp_mtp_test_data_answers_3_3: "Ich schalte einfach ohne Energie ab",
          mp_mtp_test_data_question_4: "Dein Energiegefühl in letzter Zeit:",
          mp_mtp_test_data_answers_4_1: "Normal, die Ladung hält",
          mp_mtp_test_data_answers_4_2: "Wie eine Batterie bei 30%",
          mp_mtp_test_data_answers_4_3: "Wie ein Telefon, das sich in der Kälte ausschaltet",
          mp_mtp_test_data_question_5: "Was denkst du, wenn du das Wort \"Ruhe\" hörst?",
          mp_mtp_test_data_answers_5_1: "Plane etwas Schönes",
          mp_mtp_test_data_answers_5_2: "Zu Hause liegen und nichts tun",
          mp_mtp_test_data_answers_5_3: "Ich habe keine Zeit zum Ausruhen",
          mp_mtp_test_result_title_1: "Deine Psyche ist in Ordnung.",
          mp_mtp_test_result_description_1: "Du hast ein großartiges Energieniveau und Optimismus. Kümmere dich weiter um dich selbst und erhalte diesen Zustand!",
          mp_mtp_test_result_title_2: "Psyche größtenteils in Ordnung.",
          mp_mtp_test_result_description_2: "Die meisten Dinge laufen gut, aber einige Bereiche brauchen etwas mehr Aufmerksamkeit und Fürsorge.",
          mp_mtp_test_result_title_3: "Psyche etwas erschöpft",
          mp_mtp_test_result_description_3: "Du fühlst dich ein wenig müde. Nimm dir Zeit zum Ausruhen und für kleine Freuden.",
          mp_mtp_test_result_title_4: "Psyche bittet um Fürsorge",
          mp_mtp_test_result_description_4: "Du brauchst mehr Ruhe, Freude und Unterstützung. Achte auf deine Bedürfnisse.",
          mp_mtp_test_result_title_5: "Psyche schreit SOS",
          mp_mtp_test_result_description_5: "Du könntest ein Burnout erleben. Scheue dich nicht, um Hilfe zu bitten, und nimm dir Zeit für ernsthafte Erholung.",
          mp_mtp_test_result_title_6: "Deine Psyche ist wie eine Achterbahn.",
          mp_mtp_test_result_description_6: "Dein Zustand ändert sich oft. Einige Tage sind großartig, andere schwieriger. Versuche, Balance zu finden.",
          mp_mtp_start_message: "Achtung! Der Test hat keine diagnostische Kraft, zeigt aber dein Stress- oder Burnout-Level.",
          mp_mtp_test_title: "Test zum Zustand deiner Psyche",
          mp_mtp_test_description: "Tippe auf die Antworten, die deinem Zustand entsprechen)",
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "Atmung, die Energie ausbalanciert",
          mp_nsp_description_1: "Technik des abwechselnden Nasenlochatmens zur Harmonisierung von Geist und Körper.",
          mp_nsp_description_2: "Führen Sie es 3-5 Minuten lang aus, um die Wirkung zu erzielen.",
          mp_nsp_technique_title: "Technik:",
          mp_nsp_technique_step_1: "Setzen Sie sich bequem hin, richten Sie den Rücken auf.",
          mp_nsp_technique_step_2: "Schließen Sie mit der Hand das rechte Nasenloch, atmen Sie durch das linke ein.",
          mp_nsp_technique_step_3: "Dann schließen Sie das linke — atmen Sie durch das rechte aus.",
          mp_nsp_technique_step_4: "Atmen Sie durch das rechte ein — atmen Sie durch das linke aus.",
          mp_nsp_technique_step_5: "Fahren Sie einige Minuten lang in einem ruhigen Tempo fort.",
          mp_nsp_result_title: "Ergebnis:",
          mp_nsp_result_description_1: "Schon nach wenigen Minuten stellt sich ein Gefühl der Ruhe ein. Das Anspannungsniveau sinkt. Der Geist klärt sich, als nach einer kurzen Pause.",
          mp_nsp_result_description_2: "Regelmäßige Praxis hilft Ihnen, besser einzuschlafen, sich zu konzentrieren und auch in stressigen Situationen das innere Gleichgewicht zu bewahren.",
          mp_sbp_title: "Quadratisches Atmen",
          mp_sbp_subtitle: "Atmung, die Ruhe zurückbringt",
          mp_sbp_description_1: "Setzen Sie sich bequem hin. Entspannen Sie die Schultern. Führen Sie es mindestens 3-5 Minuten lang aus.",
          mp_sbp_description_2: "Kehren Sie zum Atmen zurück, wenn Sie Spannung spüren.",
          // --- Переклади для твого здоров'я ---
          mp_yhp_main_title: "Deine Gesundheit —",
          mp_yhp_main_subtitle: "Deine Superkraft. Sie steht auf 3 Säulen:",
          mp_yhp_activity_title: "Aktivität",
          mp_yhp_activity_description_1: "Schon 15 Minuten am Tag machen einen Unterschied.",
          mp_yhp_activity_description_2: "Spaziergang, Springseil, Pilates – wählen Sie, was Ihnen gefällt, und Ihr Körper wird sich bedanken.",
          mp_yhp_sleep_title: "Schlaf",
          mp_yhp_sleep_description_1: "Das ist das Allerwichtigste!",
          mp_yhp_sleep_description_2: "Schlaf ist keine Faulheit, sondern Ihr internes Ladekabel. 7-8 Stunden qualitativ hochwertige Erholung helfen dem Körper, sich zu erholen, und dem Gehirn, schnell und kreativ zu arbeiten.",
          mp_yhp_nutrition_title: "Ernährung",
          mp_yhp_nutrition_description_1: "Essen ist Treibstoff. Je höher seine Qualität, desto besser arbeitet Ihr 'Motor'.",
          mp_yhp_nutrition_description_2: "Nicht um Diäten, sondern um Balance: mehr Gemüse, weniger Stress mit Snacks.",

          // --- Переклади для чоловічого здоров'я ---
          hormonas_diagram: "Diagramm der Männergesundheit",
          mp_male_health: "Männergesundheit",
          mp_subtitle_1: "Mann sein bedeutet auch gesund sein",
          mp_hormones_block_title: "Hormone",
          mp_hormones_block_content_label_1: "Testosteronspiegel",
          mp_hormones_block_content_value_1_1: "Normal 300–1000 ng/dl",
          mp_hormones_block_content_label_2: "Anzeichen von Mangel",
          mp_hormones_block_content_value_2_1: "Müdigkeit",
          mp_hormones_block_content_value_2_2: "niedriges Libido",
          mp_hormones_block_content_value_2_3: "Muskelabbau",
          mp_hormones_block_content_label_3: "Was tun?",
          mp_hormones_block_content_value_3_1: "regelmäßige Tests",
          mp_hormones_block_content_value_3_2: "Krafttraining",
          mp_hormones_block_content_value_3_3: "qualitativer Schlaf",
          mp_hormones_block_content_value_3_4: "weniger Stress",
          mp_add_hormones_data: "Werte eingeben",
          mp_analyses_block_title: "Analysen und Prävention",
          mp_analyses_block_content_label_1: "Allgemeine Blut- und Urinuntersuchung",
          mp_analyses_block_content_value_1: "jährlich",
          mp_analyses_block_content_label_2: "Hormonprofil",
          mp_analyses_block_content_value_2: "bei Bedarf",
          mp_analyses_block_content_label_3: "PSA",
          mp_analyses_block_content_value_3: "nach 40 Jahren",
          mp_analyses_block_content_label_4: "Becken-Ultraschall",
          mp_analyses_block_content_value_4: "alle 1–2 Jahre",
          mp_analyses_block_content_label_5: "Hormonprofil",
          mp_analyses_block_content_value_5: "nach ärztlicher Empfehlung",
          mp_reproductive_block_title: "Reproduktive Gesundheit",
          mp_reproductive_block_content_label_1: "Fruchtbarkeit",
          mp_reproductive_block_content_value_1: "Spermienqualität hängt vom Lebensstil ab",
          mp_reproductive_block_content_label_2: "Risiken",
          mp_reproductive_block_content_value_2: "Überhitzung, Alkohol, Rauchen, Fettleibigkeit",
          mp_reproductive_block_content_label_3: "Empfehlungen",
          mp_reproductive_block_content_value_3: "Urologe 1×/Jahr, Spermiogramm",
          mp_urinary_block_title: "Harnsystem",
          mp_urinary_block_content_label_1: "Prostatakontrolle",
          mp_urinary_block_content_value_1: "ab 40 Jahren — PSA und Ultraschall 1×/Jahr",
          mp_urinary_block_content_label_2: "Alarm!",
          mp_urinary_block_content_value_2: "Schmerzen, Blut im Urin, häufiges Wasserlassen",
          mp_urinary_block_content_label_3: "Was tun?",
          mp_urinary_block_content_value_3: "Beschwerden nicht ignorieren, sofort zum Urologen",
          mp_potency_block_title: "Potenz",
          mp_potency_block_content_label_1: "Warum sinkt sie?",
          mp_potency_block_content_value_1: "Stress, Alkohol, Rauchen, Herzkrankheiten",
          mp_potency_block_content_label_2: "Wie unterstützen?",
          mp_potency_block_content_value_2: "Sport, qualitativer Schlaf, ausgewogene Ernährung",
          mp_potency_block_content_label_3: "Wann zum Arzt?",
          mp_potency_block_content_value_3: "wenn Probleme länger als 2 Monate bestehen",
          mp_subtitle_2: "Kümmere dich um dich wie um dein Lieblingsauto",
          mp_form_subtitle: "Fülle die Felder mit aktuellen Daten aus, wir erstellen ein Diagramm",
          mp_form_testosterone: "Testosteron",
          mp_form_free_testosterone: "Freies Testosteron",
          mp_form_free_testosterone_2: "Freies T",
          mp_form_prolactin: "Prolaktin",
          mp_form_estradiol: "Östradiol",
          mp_form_lh: "LH (luteinisierendes Hormon)",
          mp_form_lh_2: "LH",
          mp_form_fsh: "FSH",
          mp_form_ng_dl: "ng/dl",
          mp_form_ng_ml: "ng/ml",
          mp_form_pg_ml: "pg/ml",
          mp_form_mO_l: "mU/l",
          mp_form_save_btn: "Werte speichern",
          mp_diagram_hormons_value_not_found: "Keine Hormonwerte gefunden. Bitte eingeben.",
          mp_diagram_hormons_data_not_found: "Fehler beim Laden der Daten. Bitte Support kontaktieren.",
          mp_diagram_low: "Niedrig",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "Hoch",

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
          menstruation_calendar: "Calendrier menstruel",

          // Переклади для здоров'я за статтю
          male: "Homme",
          female: "Femme",
          gender: "Santé par sexe",
          female_health: "La santé des femmes",
          female_health_fine: "La santé des femmes sans tabous - honnêtement, simplement et avec soin pour vous.",
          cycle_info: "Tout sur votre cycle",
          reproductive_health: "Santé reproductive",
          hormonas: "Hormones",
          gynecology: "Femme médecin",
          pregnancy: "Grossesse et période post-partum",
          prevention: "Prévention et contrôles réguliers",
          useful_info: "Informations utiles",
          day_tip: "Conseil\nutile\ndu jour",
          plan: "Planifiez",
          preventive_check: "un contrôle préventif au moins une fois par an",
          hormonas_health: "Hormones saines",
          hormonas_important: "Pourquoi est-il important de surveiller les niveaux d’hormones",
          cycle_health: "Le cycle est-il important?",
          cycle_important: "Pourquoi il est important de suivre chaque cycle",
          examination_health: "Examens généraux",
          examination_important: "Pourquoi est-il important de surveiller les niveaux d’hormones",
          find_doctor: "Trouvez un médecin près de chez vous",
          your_cycle: "Votre cycle",
          cycle_control: "Suivez votre cycle, surveillez votre bien-être et recevez des rappels en temps opportun",
          calendar_cycle: "Calendrier menstruel",
          calc_cycle: "Calculer mon calendrier menstruel",
          warning_calc: "*Nos calculs de calendrier menstruel peuvent ne pas être précis à 100%, car chaque corps et chaque cycle sont différents. Aidez-nous à améliorer la précision de votre calendrier.",
          cycle: "Faire du vélo",
          why_should_calendar: "Pourquoi tenir un calendrier menstruel?",
          preview_calendar: "Tenir un calendrier menstruel ne se limite pas à se souvenir de ces jours. C'est un petit rituel de bien-être qui vous aide à mieux comprendre votre corps et votre humeur.",
          predict_cycle: "Prédire le cycle",
          predict_cycle_desc: "Tu sais toujours quand tes règles et ton ovulation vont commencer. Cela aide à planifier des événements, des vacances ou des rendez-vous importants.",
          listen_yourself: "S’écouter",
          listen_yourself_desc: "Le calendrier aide à remarquer comment l’énergie, l’humeur et l’appétit changent selon les phases du cycle.",
          regularity: "Détecter la régularité",
          regularity_desc: "Douleurs, SPM, sautes d’humeur ou changements de peau deviennent plus visibles. Il est facile de suivre ce qui se répète et ce qui aide à se sentir mieux.",
          doctor_help: "Aide le médecin",
          doctor_help_desc: "Si tu dois consulter un gynécologue, un enregistrement précis du cycle et des symptômes rend la consultation plus efficace.",
          planing: "Planification santé et fitness",
          planing_desc: "Tu peux adapter entraînement, alimentation ou repos à ton rythme pour en tirer le maximum de bénéfices.",
          finalize_calendar: "Un calendrier menstruel n’est pas une obligation mais un outil de connaissance de soi. Il aide à se sentir plus confiante, à prévoir les changements d’humeur et simplement à prendre soin de soi.",
          phase: "Phases du cycle menstruel",
          proccess_in_body: "Ce qui se passe dans le corps d’une femme",
          proccess_in_body_desc: "Le cycle menstruel n’est pas seulement 'ces jours'. C’est un rythme naturel qui aide le corps à fonctionner harmonieusement. Il se divise en plusieurs phases, chacune influençant notre bien-être, notre humeur et notre énergie.",
          phase_1_5: "Phase menstruelle\n(1 — 5)",
          phase_1_5_desc: "C’est le début du cycle. Le corps se débarrasse de l’ancienne muqueuse utérine, provoquant les règles. L’énergie peut être plus faible à ce moment, donc il est bon de se reposer davantage.",
          phase_6_13: "Phase folliculaire\n(6 — 13)",
          phase_6_13_desc: "Le taux d’œstrogène augmente progressivement, apportant force et motivation. C’est une période idéale pour de nouvelles idées, du travail actif et du sport.",
          phase_14_16: "Phase ovulatoire\n(14 — 16)",
          phase_14_16_desc: "Un ovule mature est libéré. Les femmes peuvent se sentir confiantes, attirantes et pleines d’énergie. Ce sont les jours 'de pic', lorsque le corps est prêt pour la conception.",
          phase_17_28: "Phase lutéale\n(17 — 28)",
          phase_17_28_desc: "Si la grossesse n’a pas lieu, le progestérone devient dominante. Somnolence, changements d’humeur et envie de sucré peuvent apparaître. Il est important de s’écouter, de se reposer davantage et de prendre soin de son confort émotionnel.",
          finalize_cycle: "Le cycle menstruel n’est pas un ennemi, mais un calendrier naturel de notre corps. En prêtant attention à ses phases, on peut mieux planifier sa journée, comprendre les changements d’humeur et être plus en harmonie avec soi-même.",
          go_back: "Retour",
          now: "maintenant",
          menstruation: "menstruation",
          scheduled_menstruation: "menstruations programmées",
          ovulation: "ovulation",
          planned_ovulation: "ovulation planifiée",
          ovulation_in: "ovulation dans",
          low_chance: "Faible risque de tomber enceinte",
          average_chance: "Chances moyennes de tomber enceinte",
          high_chance: "Fortes chances de tomber enceinte",
          no_chance: "Très faible chance de tomber enceinte",
          myth_facts: "Mythes et faits",
          one: 'jour',
          other: 'jours',
          c_long: "Votre cycle a duré {{cLong}} jours. C'est normal!",
          phase_1: "Vous êtes actuellement dans votre phase menstruelle !\nC'est le début de votre cycle.\nVous vous sentez peut-être à court d'énergie !\nIl est préférable de prendre soin de vous et de vous reposer pendant cette période !",
          phase_2: "Vous êtes maintenant en phase folliculaire !\nVotre taux d'œstrogènes augmente activement.\nVotre humeur s'améliore.\nVotre peau s'améliore !\nVous êtes prête à conquérir le monde entier !",
          phase_3: "Vous êtes maintenant en phase ovulatoire !\nUn ovule mature est en train d’être libéré.\n​​Vous vous sentez confiant et plein d’énergie !\nAujourd’hui est un jour idéal pour faire ce qui vous apporte de la joie !",
          phase_4: "Vous êtes maintenant en phase lutéale !\nLa progestérone commence à dominer ! \nPendant cette période, vous pouvez ressentir des sautes d'humeur et de la somnolence ! \nPrenez soin de votre confort et écoutez vos sentiments!",
          super: "Super!",
          gynecology_sub: "Tout sur les examens réguliers, la prévention et les soins de santé pour les femmes — dans un langage simple et sans tabous.",
          womens_tests: "Examens et tests",
          regular_review: "Contrôles réguliers",
          articles_: "Articles",
          read: "Lire",
          how_often: "À quelle fréquence\nfaut-il consulter\nun gynécologue?",
          top_5_tests: "TOP 5 des tests pour\nla santé des femmes",
          review_sub: "Prendre soin de sa santé commence par la prévention. Une fois par an, vous avez une longueur d'avance sur le problème.",
          what_to_check_regulary: "Que faut-il faire régulièrement?",
          gynecology_review: "Examen par un gynécologue",
          one_time_per_year: "une fois par an",
          pap_test: "Test Pap",
          _2_3_time_per_year: "une fois tous les 2–3 ans",
          blood_test: "Analyse de sang et d’urine",
          ultrasound_test: "Échographie pelvienne",
          if_need: "si nécessaire",
          mammography: "Mammographie",
          after_40_years: "après 40 ans",
          examination_head: "Examens et tests",
          examination_desc: "Des examens appropriés et réalisés au bon moment sont la clé d'une bonne santé. Découvrez quels examens et tests vous devriez effectuer régulièrement.",
          base_review: "Examen de base",
          gynecology_examination: "Examen gynécologique",
          add_to_calendar: "Ajouter au calendrier",
          ultrasound_glands: "Échographie des seins",
          need_I_test: "Faut-il faire des analyses si je me sens bien ?",
          examination_tip_need: "Les examens médicaux réguliers sont importants même en l'absence de symptômes. De nombreuses maladies se développent silencieusement à leurs débuts, et des analyses de base effectuées à temps (sang, urine, glycémie, cholestérol) permettent de détecter les problèmes avant l'apparition des premiers signes.\n\nLes contrôles annuels sont un investissement pour votre santé. Ils permettent de surveiller votre organisme, d'ajuster votre alimentation et votre mode de vie, et d'éviter les complications.\n\nSe sentir bien est excellent, mais la prévention est toujours plus facile et moins coûteuse que le traitement.",
          what_needed_blood: "Que faut-il préparer avant une prise de sang ?",
          what_needed_blood_info: "Pour que les résultats de votre analyse de sang soient précis, préparez-vous à l'avance :\n\nÀ jeun, le dernier repas doit avoir eu lieu 8 à 12 heures avant\n\nBuvez uniquement de l'eau plate, cela n'affecte pas les résultats\n\nÉvitez l'alcool, les aliments gras et très sucrés un à deux jours avant\n\nLe jour de l'analyse, évitez les efforts physiques intenses et le stress\n\nSi vous prenez des médicaments, informez-en obligatoirement votre médecin",
          what_diff_ultrasound_mam: "Quelle est la différence entre l'échographie et la mammographie ?",
          what_diff_ultrasound_mam_info: "L'échographie utilise des ondes sonores pour visualiser les tissus et montre bien les structures molles du sein, surtout chez les jeunes femmes ayant une poitrine dense\n\nLa mammographie est un examen radiographique qui permet de détecter de petites calcifications et les premiers signes de tumeurs avant l'apparition de nodules\n\nL'échographie n'utilise pas de radiation et convient pour un contrôle supplémentaire\nLa mammographie reste la méthode de dépistage principale pour les femmes de plus de 40 ans\n\nLes deux méthodes sont souvent utilisées ensemble pour un diagnostic plus précis",
          why_pap_test: "Pourquoi faire un frottis de dépistage (test Pap) et à quelle fréquence ?",
          why_pap_test_info: "Le frottis de dépistage ou test Pap permet de détecter les modifications des cellules du col de l'utérus à un stade précoce, avant l'apparition des symptômes\n\nUn dépistage régulier permet de prévenir le développement du cancer et de traiter à temps les processus inflammatoires\n\nEn général, le test Pap se fait une fois par an s'il n'y a pas de problème, ou plus souvent sur recommandation du médecin\n\nL'examen est rapide, indolore et ne prend que quelques minutes\n\nMême si vous vous sentez bien, ce test aide à prendre soin de votre santé",
          reproductive: "Santé reproductive",
          reproductive_sub: "Planifiez avec nous ! Prenez soin de votre corps et préparez votre avenir en toute confiance.",
          myth_main: "Il existe beaucoup de mythes autour des règles.",
          myth_sub: "Voici une petite sélection pour toi)",
          cant_sport: "On ne peut pas faire de sport pendant les règles",
          cant_sport_desc: "En réalité, une activité physique légère comme le yoga, la marche ou même un entraînement modéré peut soulager les crampes et améliorer l’humeur.",
          c_long_: "Le cycle dure toujours exactement 28 jours",
          c_long_desc: "Chaque cycle est individuel : un intervalle d’environ 21 à 35 jours est considéré comme normal.",
          cant_swim: "On ne peut pas se baigner ou prendre un bain pendant les règles",
          cant_swim_desc: "Se baigner ou prendre une douche est sans danger. Les protections (tampons, coupes menstruelles) permettent de nager confortablement et de rester propre.",
          cant_get_pregnant: "On ne peut pas tomber enceinte pendant les règles",
          cant_get_pregnant_desc: "La probabilité est plus faible mais pas nulle : les spermatozoïdes peuvent survivre plusieurs jours dans le corps et l’ovulation peut survenir plus tôt ou plus tard que prévu.",
          pain_is_ok: "La douleur menstruelle est toujours normale",
          pain_is_ok_desc: "Un léger inconfort est courant, mais une douleur intense ou invalidante peut indiquer une endométriose ou d’autres troubles et doit être examinée par un médecin.",

          // --- Переклади для посилань в мапінгу ---
          your: "Ta santé",
          diary: "Journal des émotions",
          breathing: "Pratiques respiratoires",
          diaphragmatic: "Respiration diaphragmatique",
          square: "Respiration Carrée",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "Test d'état",
          articles: "Articles utiles",
          article_1: "10 techniques simples pour soulager le stress",
          article_2: "Méthodes efficaces pour lutter contre l'anxiété",
          article_3: "Techniques de respiration pour la relaxation",
          article_4: "Le lien entre le sommeil et la santé mentale",
          article_5: "Les bases de la méditation pour les débutants",
          article_6: "Stratégies pour améliorer l'estime de soi",
          article_7: "Prévention et surmontement de l'épuisement",

          // --- Переклади для меню здоров'я ---
          hmp_your_health: "Ta santé",
          hmp_mental_health: "Santé mentale",

          // --- Переклади для ментального здоров'я ---
          mp_aew_notes: "Note",
          mp_aew_describe_your_feelings: "Décrivez vos sentiments plus en détail...",
          mp_articles_title: "Articles utiles",
          mp_article_1: "10 techniques simples pour réduire le stress quotidien",
          mp_article_2: "Comment gérer l'anxiété",
          mp_article_3: "Exercices de respiration pour la détente",
          mp_article_4: "Sommeil sain et santé mentale",
          mp_article_5: "Méditation pour débutants",
          mp_article_6: "Comment augmenter l'estime de soi",
          mp_article_7: "Méthodes efficaces pour lutter contre l'épuisement",
          mp_article_content_1: `
          # 10 techniques simples pour soulager le stress
          ## Respiration profonde
          Prenez quelques respirations profondes en vous concentrant sur votre souffle. La technique « 4-4-4 » est simple : inspirez pendant 4 secondes, retenez votre respiration pendant 4 secondes, expirez pendant 4 secondes. Cela calme le système nerveux.
          ## Relaxation musculaire progressive
          Tendez et détendez tous les groupes musculaires tour à tour, en commençant par les orteils et en remontant jusqu'au visage.
          ## Méditation
          Accordez 5 à 10 minutes par jour à la méditation. Concentrez-vous sur votre respiration ou utilisez des méditations guidées.
          ## Marche au grand air
          Une marche quotidienne de 20 minutes réduit le niveau de cortisol et améliore l'humeur.
          ## Aromathérapie
          Utilisez des huiles essentielles de lavande, de camomille ou de bergamote pour vous détendre.
          ## Tenue d'un journal
          Notez vos pensées et vos sentiments. Cela aide à structurer les pensées et à réduire le stress.
          ## Écoutez de la musique
          Une musique calme ou des sons de la nature peuvent significativement réduire le niveau de stress.
          ## Technique "5-4-3-2-1"
          Nommez : 5 choses que vous voyez ; 4 choses que vous touchez ; 3 choses que vous entendez ; 2 choses que vous sentez ; 1 chose que vous goûtez.
          ## Yoga et étirements
          Des exercices simples de yoga aident à soulager les tensions musculaires.
          ## Limiter la consommation d'actualités
          Limitez le temps passé à regarder les informations pour réduire la charge mentale.
                  `,
          mp_article_content_2: `
          # Méthodes efficaces pour lutter contre l'anxiété
          ## Techniques de mise à la terre
          Utilisez des techniques de mise à la terre pour revenir à la réalité. Par exemple, concentrez-vous sur les sensations physiques.
          ## Thérapie cognitivo-comportementale
          Identifiez les pensées négatives et remplacez-les par des pensées plus réalistes.
          ## Exercice régulier
          L'activité physique réduit l'anxiété et améliore l'humeur.
          ## Limitation de la caféine
          La caféine peut augmenter l'anxiété, il est donc conseillé d'en limiter la consommation.
          ## Sommeil de qualité
          Un rythme de sommeil régulier aide à réduire l'anxiété.
          ## Soutien social
          Parlez de vos sentiments avec vos proches ou un professionnel.
          ## Pratique de la gratitude
          Notez chaque jour 3 choses pour lesquelles vous êtes reconnaissant.
                  `,
          mp_article_content_3: `
          # Techniques de respiration pour la relaxation
          ## Respiration abdominale
          Allongez-vous ou asseyez-vous confortablement. Placez une main sur votre poitrine, l'autre sur votre ventre. Inspirez lentement par le nez en sentant votre ventre se soulever. Expirez par la bouche.
          ## Technique "4-7-8"
          Inspirez par le nez sur 4 temps, retenez votre respiration sur 7 temps, expirez par la bouche sur 8 temps.
          ## Respiration égale
          Inspirez et expirez sur le même nombre de temps (par exemple, 4-4 ou 5-5).
          ## Respiration avec expiration allongée
          Inspirez sur 4 temps, expirez sur 6-8 temps.
          ## Respiration alternée par les narines
          Bouchez votre narine droite, inspirez par la gauche. Retenez votre respiration. Bouchez votre narine gauche, expirez par la droite.
                  `,
          mp_article_content_4: `
          # Le lien entre le sommeil et la santé mentale
          ## Rythme de sommeil régulier
          Couchez-vous et levez-vous à la même heure chaque jour, même le week-end.
          ## Création de conditions idéales pour le sommeil
          Assurez l'obscurité, le silence et une température confortable dans la chambre.
          ## Limitation du temps d'écran
          Arrêtez d'utiliser les appareils électroniques 1 à 2 heures avant de dormir.
          ## Rituels de relaxation
          Créez un rituel du soir : bain chaud, lecture, méditation.
          ## Limitation de la caféine et de l'alcool
          Évitez la caféine après le déjeuner et l'alcool avant le coucher.
          ## Activité physique régulière
          L'exercice améliore la qualité du sommeil, mais évitez les entraînements intenses avant de dormir.
          ## Alimentation équilibrée
          Consommez des aliments riches en tryptophane, magnésium et vitamines B.
                  `,
          mp_article_content_5: `
          # Les bases de la méditation pour les débutants
          ## Commencez petit
          Commencez par 5 à 10 minutes par jour et augmentez progressivement la durée.
          ## Concentration sur la respiration
          Concentrez-vous sur la sensation de la respiration - comment l'air entre et sort.
          ## Observation des pensées
          N'essayez pas d'arrêter vos pensées, observez-les simplement sans jugement.
          ## Utilisation de méditations guidées
          Utilisez des applications ou des enregistre audio pour des séances guidées.
          ## Création d'un espace confortable
          Trouvez un endroit calme où vous ne serez pas dérangé.
          ## Régularité
          Méditez régulièrement, de préférence à la même heure chaque jour.
          ## Patience envers soi-même
          Ne vous critiquez pas si vous avez du mal à vous concentrer. C'est une partie normale du processus.
                  `,
          mp_article_content_6: `
          # Stratégies pour améliorer l'estime de soi
          ## Pratique de l'auto-compassion
          Traitez-vous comme vous traiteriez un ami qui a besoin de soutien.
          ## Reconnaissance de ses points forts
          Faites une liste de vos points forts et de vos réalisations.
          ## Établissement d'objectifs réalistes
          Fixez-vous des objectifs atteignables et célébrez vos progrès.
          ## Limitation du discours intérieur négatif
          Remplacez les pensées critiques par des pensées encourageantes.
          ## S'entourer de personnes positives
          Passez du temps avec des personnes qui vous soutiennent et vous inspirent.
          ## Soins personnels
          Faites régulièrement des choses qui vous apportent de la joie et de la détente.
          ## Aide professionnelle
          Consultez un psychologue si l'estime de soi affecte significativement votre qualité de vie.
                  `,
          mp_article_content_7: `
          # Prévention et surmontement de l'épuisement
          ## Établissement de limites
          Apprenez à dire "non" et à établir des limites saines.
          ## Pauses régulières
          Prenez de courtes pauses tout au long de la journée de travail.
          ## Priorisation des tâches
          Concentrez-vous sur les tâches les plus importantes et déléguez lorsque c'est possible.
          ## Recherche de sens
          Trouvez un sens personnel à ce que vous faites.
          ## Activité physique
          L'exercice régulier aide à lutter contre le stress.
          ## Soutien social
          Parlez de vos sentiments avec des collègues, des amis ou un professionnel.
          ## Rétablissement de l'équilibre
          Trouvez du temps pour les loisirs et la vie personnelle en dehors du travail.
          ## Aide professionnelle
          N'hésitez pas à consulter un psychologue ou un coach.
                  `,
          mp_article_not_found: "Article non trouvé",
          mp_article_not_found_desc_1: "L'article avec l'ID",
          mp_article_not_found_desc_2: "n'existe pas.",
          mp_aew_ok: "Ok",
          mp_aew_balance: "Équilibre",
          mp_aew_safety: "Sécurité",
          mp_aew_neutrality: "Neutralité",
          mp_aew_lethargy: "Léthargie",
          mp_aew_carefreeness: "Insouciance",
          mp_aew_relaxation: "Détente",
          mp_aew_calmness: "Calme",
          mp_aew_stability: "Stabilité",
          mp_aew_focus: "Concentration",
          mp_aew_so_so: "Comme ci, comme ça",
          mp_aew_indifference: "Indifférence",
          mp_aew_nervousness: "Nervosité",
          mp_aew_slight_irritation: "Légère irritation",
          mp_aew_doubt: "Doute",
          mp_aew_restlessness: "Agitation",
          mp_aew_distrust: "Méfiance",
          mp_aew_tension: "Tension",
          mp_aew_dissatisfaction: "Mécontentement",
          mp_aew_melancholy: "Mélancolie",
          mp_aew_i_feel_sick: "Je me sens mal",
          mp_aew_fatigue: "Fatigue",
          mp_aew_self_pity: "Apitoiement sur soi",
          mp_aew_anxiety: "Anxiété",
          mp_aew_sadness: "Tristesse",
          mp_aew_uncertainty: "Incertitude",
          mp_aew_confusion: "Confusion",
          mp_aew_guilt: "Culpabilité",
          mp_aew_self_rejection: "Rejet de soi",
          mp_aew_emptiness: "Vide",
          mp_aew_terribly: "Terriblement",
          mp_aew_isolation: "Isolement",
          mp_aew_depression: "Dépression",
          mp_aew_envy: "Envie",
          mp_aew_deep_sorrow: "Profond chagrin",
          mp_aew_shame: "Honte",
          mp_aew_despair: "Désespoir",
          mp_aew_loneliness: "Solitude",
          mp_aew_hopelessness: "Impuissance",
          mp_aew_self_directed_aggression: "Agressivité envers soi-même",
          mp_aew_сool: "Cool",
          mp_aew_energy: "Énergie",
          mp_aew_satisfaction: "Satisfaction",
          mp_aew_connection: "Sensation de lien",
          mp_aew_comfort: "Confort",
          mp_aew_love: "Amour",
          mp_aew_motivation: "Motivation",
          mp_aew_determination: "Détermination",
          mp_aew_respect: "Respect",
          mp_aew_friendship: "Amitié",
          mp_aew_good: "Bien",
          mp_aew_in_the_flow: "Dans le flux",
          mp_aew_pride: "Fierté",
          mp_aew_inspiration: "Inspiration",
          mp_aew_hope: "Espoir",
          mp_aew_optimism: "Optimisme",
          mp_aew_confidence: "Confiance",
          mp_aew_joy: "Joie",
          mp_aew_gratitude: "Gratitude",
          mp_aew_openness: "Ouverture",
          mp_aew_great: "Génial",
          mp_aew_bliss: "Félicité",
          mp_aew_delight: "Ravissement",
          mp_aew_admiration: "Admiration",
          mp_aew_excitement: "Excitation",
          mp_aew_elation: "Exaltation",
          mp_aew_euphoria: "Euphorie",
          mp_aew_devotion: "Dévotion",
          mp_aew_love_of_life: "Amour de la vie",
          mp_aew_triumph: "Triomphe",
          mp_aew_people: "Personnes",
          mp_aew_myself: "Moi-même",
          mp_aew_family: "Famille",
          mp_aew_friends: "Amis",
          mp_aew_partner: "Partenaire",
          mp_aew_colleagues: "Collègues",
          mp_aew_events: "Événements",
          mp_aew_work: "Travail",
          mp_aew_training: "Entraînement",
          mp_aew_driving: "Conduite",
          mp_aew_rest: "Repos",
          mp_aew_studying: "Études",
          mp_aew_places: "Lieux",
          mp_aew_home: "Maison",
          mp_aew_office: "Bureau",
          mp_aew_school: "École",
          mp_aew_university: "Université",
          mp_aew_street: "Rue",
          mp_edp_sports: "Sport",
          mp_edp_coffee: "Café",
          mp_edp_alcohol: "Alcool",
          mp_edp_sex: "Sexe",
          mp_edp_meditation: "Méditation",
          mp_edp_antidepressants: "Antidépresseurs",
          mp_edp_other: "Autre",
          mp_edp_not_specified: "Non spécifié",
          mp_aew_wizard_title_step_1: "Je me sens",
          mp_aew_wizard_title_step_2: "Quelle a été la cause de ces émotions ?",
          mp_aew_wizard_title_step_3: "Veux-tu écrire quelque chose à propos de",
          mp_aew_wizard_description_step_3: "Votre note est privée et visible uniquement par vous.",
          mp_return_back: "Retour",
          mp_btn_next: "Suivant",
          mp_btn_add: "Ajouter",
          mp_btn_back: "Retour",
          mp_btn_cancel: "Annuler",
          mp_btn_lets_start: "On commence ?",
          mp_btn_continue: "Continuer",
          mp_btn_start: "Commencer",
          mp_btn_save: "Sauvegarder",
          mp_btn_result: "Résultat",
          mp_btn_try_again: "Réessayer",
          mp_bpp_title: "Pratiques respiratoires",
          mp_bpp_subtitle: "Expire le stress — inspire la sérénité 🌿",
          mp_bpp_description_1: "Des exercices de respiration simples aident à soulager les tensions, à retrouver de l'énergie et à clarifier l'esprit. Vous pouvez commencer n'importe où : à la maison, au travail ou même dans les transports.",
          mp_bpp_description_2: "Essaie — et ressens ton corps se détendre et ton humeur s'alléger.",
          mp_bpp_card_title_1: "Respiration diaphragmatique",
          mp_bpp_card_description_1_1: "Réduit le stress et l'anxiété.",
          mp_bpp_card_description_1_2: "Détend, soulage les tensions.",
          mp_bpp_card_title_2: "Respiration Carrée",
          mp_bpp_card_description_2_1: "Soulage l'anxiété et aide à se concentrer.",
          mp_bpp_card_title_3: "Nadi Shodhana",
          mp_bpp_card_description_3_1: "Respiration alternée par les narines.",
          mp_bpp_card_description_3_2: "Aide à soulager le stress.",
          mp_bpp_card_description_3_3: "Rétablit l'équilibre intérieur.",
          mp_dbp_title: "Respiration diaphragmatique",
          mp_dbp_subtitle: "La respiration qui rend le calme",
          mp_dbp_description_1_1: "Assieds-toi confortablement. Détends tes épaules. Effectue au moins 3 à 5 minutes.",
          mp_dbp_description_1_2: "Reviens à la respiration dès que tu sens une tension.",
          mp_dbp_inhale: "INSPIRE",
          mp_dbp_hold: "MAINTIENS",
          mp_dbp_exhale: "EXPIRE",
          mp_dbp_come_on_more: "ALLEZ, ENCORE",
          mp_ebp_title: "Journal des émotions",
          mp_ebp_factor_title: "Facteurs d'humeur",
          mp_ebp_factor_info_p_1: "Tous les facteurs sont tes déclencheurs potentiels.",
          mp_ebp_factor_info_p_2: "Par exemple, vous pouvez ne pas remarquer que le sport, le café ou les drogues influencent votre humeur et forment des schémas comportementaux.",
          mp_ebp_factor_info_p_3: "Vous pourrez suivre l'influence des facteurs sur votre bien-être plus tard dans la section d'analyse.",
          mp_ebp_factor_info_p_4: "Exemple",
          mp_ebp_factor_info_p_5: "Alimentation et stimulants :",
          mp_ebp_factor_info_p_6: "Note ta consommation de café, de vitamines ou de produits pouvant affecter ton niveau d'énergie.",
          mp_ebp_factor_info_p_7: "Activité et exercice physique :",
          mp_ebp_factor_info_p_8: "Suis la quantité d'exercice physique ou la participation à d'autres formes d'activité physique.",
          mp_ebp_factor_info_p_9: "Cycles biologiques :",
          mp_ebp_factor_info_p_10: "En suivant tes cycles menstruels, tu pourras comprendre comment ils influencent ton bien-être émotionnel.",
          mp_ebp_selected_factors: "Facteurs sélectionnés :",
          mp_ebp_available_factors: "Facteurs disponibles :",
          mp_ebp_hello_how_are_you: "Salut ! Comment vas-tu ?",
          mp_ebp_factor: "Facteurs",
          mp_ebp_add_factor: "Ajouter un facteur",
          mp_mhp_title: "Ton calme commence ici.",
          mp_mhp_sub_title: "Nous avons rassemblé des outils qui t'aideront à rester équilibré même les jours les plus stressants.",
          mp_mhp_test_card_title: "Tests d'état",
          mp_mhp_test_card_btn_text: "Passer le test",
          mp_mhp_breathing_card_title: "Pratiques respiratoires",
          mp_mhp_breathing_card_btn_text: "Choisir une pratique",
          mp_mhp_articles_card_title: "Articles utiles",
          mp_mhp_articles_card_btn_text: "Voir les articles",
          mp_mhp_choose_specialist: "Choisir un spécialiste",
          mp_mtp_test_data_question_1: "Comment tu te réveilles le matin ?",
          mp_mtp_test_data_answers_1_1: "Avec enthousiasme et des projets",
          mp_mtp_test_data_answers_1_2: "Avec un verre d'eau et un lourd soupir",
          mp_mtp_test_data_answers_1_3: "« Quoi, encore cette journée ? »",
          mp_mtp_test_data_question_2: "Quand quelque chose ne va pas, ta réaction est :",
          mp_mtp_test_data_answers_2_1: "Ok, je vais trouver comment arranger ça",
          mp_mtp_test_data_answers_2_2: "Bon, c'est la vie",
          mp_mtp_test_data_answers_2_3: "Tout est perdu, je vais dans mon plaid",
          mp_mtp_test_data_question_3: "Qu'est-ce qui te sauve le plus souvent du stress ?",
          mp_mtp_test_data_answers_3_1: "Le sport ou une promenade",
          mp_mtp_test_data_answers_3_2: "La nourriture, une série ou des memes",
          mp_mtp_test_data_answers_3_3: "Je reste juste sans force",
          mp_mtp_test_data_question_4: "Ta sensation d'énergie ces derniers temps :",
          mp_mtp_test_data_answers_4_1: "Normal, la charge tient",
          mp_mtp_test_data_answers_4_2: "Comme une batterie à 30%",
          mp_mtp_test_data_answers_4_3: "Comme un téléphone qui s'éteint dans le froid",
          mp_mtp_test_data_question_5: "Que penses-tu quand tu entends le mot \"repos\" ?",
          mp_mtp_test_data_answers_5_1: "Je planifie quelque chose d'agréable",
          mp_mtp_test_data_answers_5_2: "Rester à la maison et ne rien faire",
          mp_mtp_test_data_answers_5_3: "Je n'ai pas le temps de me reposer",
          mp_mtp_test_result_title_1: "Ta santé mentale est normale.",
          mp_mtp_test_result_description_1: "Tu as un excellent niveau d'énergie et d'optimisme. Continue de prendre soin de toi et de maintenir cet état !",
          mp_mtp_test_result_title_2: "Ta santé mentale est principalement normale.",
          mp_mtp_test_result_description_2: "La plupart des choses vont bien, mais certains domaines nécessitent un peu plus d'attention et de soin.",
          mp_mtp_test_result_title_3: "Ta santé mentale est un peu épuisée",
          mp_mtp_test_result_description_3: "Tu ressens une légère fatigue. Trouve du temps pour te reposer et de petites joies.",
          mp_mtp_test_result_title_4: "Ta santé mentale demande des soins",
          mp_mtp_test_result_description_4: "Tu as besoin de plus de repos, de joies et de soutien. Porte attention à tes besoins.",
          mp_mtp_test_result_title_5: "Ta santé mentale crie SOS",
          mp_mtp_test_result_description_5: "Tu peux ressentir un épuisement. N'aie pas peur de demander de l'aide et trouve du temps pour un repos sérieux.",
          mp_mtp_test_result_title_6: "Ta santé mentale est comme des montagnes russes.",
          mp_mtp_test_result_description_6: "Ton état change souvent. Certains jours sont géniaux, d'autres plus difficiles. Essaie de trouver un équilibre.",
          mp_mtp_start_message: "Attention ! Le test n'a pas de valeur diagnostique, mais il montre ton niveau de stress ou d'épuisement.",
          mp_mtp_test_title: "Test de l'état de ta santé mentale",
          mp_mtp_test_description: "Appuie sur les réponses qui correspondent à ton état)",
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "La respiration qui équilibre l'énergie",
          mp_nsp_description_1: "Technique d'alternance des narines pour harmoniser l'esprit et le corps.",
          mp_nsp_description_2: "Effectue 3 à 5 minutes pour obtenir un effet.",
          mp_nsp_technique_title: "Technique :",
          mp_nsp_technique_step_1: "Assieds-toi confortablement, le dos droit.",
          mp_nsp_technique_step_2: "Avec la main, bouche ta narine droite, inspire par la gauche.",
          mp_nsp_technique_step_3: "Puis bouche la gauche — expire par la droite.",
          mp_nsp_technique_step_4: "Inspire par la droite — expire par la gauche.",
          mp_nsp_technique_step_5: "Continue quelques minutes à un rythme calme.",
          mp_nsp_result_title: "Résultat :",
          mp_nsp_result_description_1: "Déjà après quelques minutes, une sensation de calme apparaît. Le niveau de tension diminue. L'esprit s'éclaircit, comme après un court repos.",
          mp_nsp_result_description_2: "Une pratique régulière aide à mieux s'endormir, à se concentrer et à maintenir l'équilibre intérieur même dans des situations stressantes.",
          mp_sbp_title: "Respiration Carrée",
          mp_sbp_subtitle: "La respiration qui rend le calme",
          mp_sbp_description_1: "Assieds-toi confortablement. Détends tes épaules. Effectue au moins 3 à 5 minutes.",
          mp_sbp_description_2: "Reviens à la respiration dès que tu sens une tension.",

          // --- Переклади для твого здоров'я ---
          mp_yhp_main_title: "Ta santé —",
          mp_yhp_main_subtitle: "Ta superpuissance. Elle repose sur 3 piliers :",
          mp_yhp_activity_title: "Activité",
          mp_yhp_activity_description_1: "Même 15 minutes par jour font une différence.",
          mp_yhp_activity_description_2: "Marche, corde à sauter, pilates – choisis ce que tu aimes, et ton corps dira 'merci'.",
          mp_yhp_sleep_title: "Sommeil",
          mp_yhp_sleep_description_1: "C'est le plus important de tout !",
          mp_yhp_sleep_description_2: "Le sommeil n'est pas de la paresse, c'est ton câble de recharge interne. 7 à 8 heures de repos de qualité aident le corps à récupérer et le cerveau à travailler vite et de manière créative.",
          mp_yhp_nutrition_title: "Nutrition",
          mp_yhp_nutrition_description_1: "La nourriture est un carburant. Plus il est de qualité, mieux ton 'moteur' fonctionne.",
          mp_yhp_nutrition_description_2: "Pas question de régime, mais d'équilibre : plus de légumes, moins de stress avec les collations.",

          // --- Переклади для чоловічого здоров'я ---
          hormonas_diagram: "Graphique de la santé masculine",
          mp_male_health: "Santé des hommes",
          mp_subtitle_1: "Être un homme, c'est aussi être en bonne santé",
          mp_hormones_block_title: "Hormones",
          mp_hormones_block_content_label_1: "Taux de testostérone",
          mp_hormones_block_content_value_1_1: "normal 300–1000 ng/dl",
          mp_hormones_block_content_label_2: "Signes de déficit",
          mp_hormones_block_content_value_2_1: "fatigue",
          mp_hormones_block_content_value_2_2: "baisse de libido",
          mp_hormones_block_content_value_2_3: "perte musculaire",
          mp_hormones_block_content_label_3: "Que faire ?",
          mp_hormones_block_content_value_3_1: "analyses régulières",
          mp_hormones_block_content_value_3_2: "exercices de force",
          mp_hormones_block_content_value_3_3: "sommeil de qualité",
          mp_hormones_block_content_value_3_4: "moins de stress",
          mp_add_hormones_data: "Ajouter des indicateurs",
          mp_analyses_block_title: "Analyses et prévention",
          mp_analyses_block_content_label_1: "Analyse générale de sang et d'urine",
          mp_analyses_block_content_value_1: "annuel",
          mp_analyses_block_content_label_2: "Profil hormonal",
          mp_analyses_block_content_value_2: "si nécessaire",
          mp_analyses_block_content_label_3: "PSA",
          mp_analyses_block_content_value_3: "après 40 ans",
          mp_analyses_block_content_label_4: "Échographie pelvienne",
          mp_analyses_block_content_value_4: "tous les 1–2 ans",
          mp_analyses_block_content_label_5: "Profil hormonal",
          mp_analyses_block_content_value_5: "selon recommandation médicale",
          mp_reproductive_block_title: "Santé reproductive",
          mp_reproductive_block_content_label_1: "Fertilité",
          mp_reproductive_block_content_value_1: "la qualité du sperme dépend du mode de vie",
          mp_reproductive_block_content_label_2: "Risques",
          mp_reproductive_block_content_value_2: "surchauffe, alcool, tabac, obésité",
          mp_reproductive_block_content_label_3: "Recommandations",
          mp_reproductive_block_content_value_3: "Urologue 1×/an, spermogramme",
          mp_urinary_block_title: "Système urinaire",
          mp_urinary_block_content_label_1: "Contrôle de la prostate",
          mp_urinary_block_content_value_1: "à partir de 40 ans — PSA et échographie 1×/an",
          mp_urinary_block_content_label_2: "Alerte !",
          mp_urinary_block_content_value_2: "douleur, sang dans l'urine, mictions fréquentes",
          mp_urinary_block_content_label_3: "Que faire ?",
          mp_urinary_block_content_value_3: "ne pas ignorer l'inconfort, consulter un urologue",
          mp_potency_block_title: "Puissance",
          mp_potency_block_content_label_1: "Pourquoi diminue-t-elle ?",
          mp_potency_block_content_value_1: "stress, alcool, tabac, maladies cardiaques",
          mp_potency_block_content_label_2: "Comment maintenir ?",
          mp_potency_block_content_value_2: "sport, sommeil de qualité, alimentation équilibrée",
          mp_potency_block_content_label_3: "Quand consulter un médecin ?",
          mp_potency_block_content_value_3: "si les problèmes persistent plus de 2 mois",
          mp_subtitle_2: "Prends soin de toi comme de ta voiture préférée",
          mp_form_subtitle: "Remplis les champs si tu as des données actuelles, et nous ferons un graphique",
          mp_form_testosterone: "Testostérone",
          mp_form_free_testosterone: "Testostérone libre",
          mp_form_free_testosterone_2: "T libre",
          mp_form_prolactin: "Prolactine",
          mp_form_estradiol: "Œstradiol",
          mp_form_lh: "LH (hormone lutéinisante)",
          mp_form_lh_2: "LH",
          mp_form_fsh: "FSH",
          mp_form_ng_dl: "ng/dl",
          mp_form_ng_ml: "ng/ml",
          mp_form_pg_ml: "pg/ml",
          mp_form_mO_l: "mU/l",
          mp_form_save_btn: "Enregistrer les indicateurs",
          mp_diagram_hormons_value_not_found: "Aucune donnée hormonale trouvée. Veuillez entrer vos valeurs.",
          mp_diagram_hormons_data_not_found: "Erreur de chargement des données. Contactez le support.",
          mp_diagram_low: "Bas",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "Élevé",

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
          last_cycle_first_day: "1er día del último ciclo",
          menstruation_calendar: "Calendario menstrual",

          // Переклади для здоров'я за статтю
          mp_aew_notes: "Nota",
          mp_aew_describe_your_feelings: "Describe tus sentimientos con más detalle...",
          male: "Hombre",
          female: "Mujer",
          gender: "Salud por género",
          female_health: "Salud de la mujer",
          female_health_fine: "Salud femenina sin tabúes: honesta, sencilla y cuidando de ti.",
          cycle_info: "Todo sobre tu ciclo",
          reproductive_health: "Salud reproductiva",
          hormonas: "Hormonas",
          gynecology: "Doctora",
          pregnancy: "Embarazo y posparto",
          prevention: "Prevención y revisiones periódicas",
          useful_info: "Información útil",
          day_tip: "Consejo\nútil\ndel día",
          plan: "Programe",
          preventive_check: "un chequeo preventivo al menos una vez al año",
          hormonas_health: "Hormonas saludables",
          hormonas_important: "Por qué es importante monitorear los niveles hormonales",
          cycle_health: "¿Es importante el ciclo?",
          cycle_important: "Por qué es importante realizar un seguimiento de cada ciclo",
          examination_health: "Exámenes generales",
          examination_important: "Por qué es importante monitorear los niveles hormonales",
          find_doctor: "Encuentre un médico cerca de usted",
          your_cycle: "Tu ciclo",
          cycle_control: "Realiza un seguimiento de tu ciclo, controla tu bienestar y recibe recordatorios oportunos.",
          calendar_cycle: "Calendario menstrual",
          calc_cycle: "Calcular mi calendario menstrual",
          warning_calc: "*Nuestros cálculos del calendario menstrual pueden no ser 100% precisos, ya que cada cuerpo y cada ciclo son diferentes. Ayúdanos a mejorar la precisión de tu calendario.",
          cycle: "Ciclo",
          why_should_calendar: "¿Por qué llevar un calendario menstrual?",
          preview_calendar: "Llevar un calendario menstrual no se trata solo de recordar «esos días». Es un pequeño ritual de autocuidado que te ayuda a comprender mejor tu cuerpo y tu estado de ánimo.",
          predict_cycle: "Predecir el ciclo",
          predict_cycle_desc: "Siempre sabes cuándo comenzarán tu menstruación y ovulación. Esto ayuda a planificar eventos, vacaciones o reuniones importantes.",
          listen_yourself: "Escucharte a ti misma",
          listen_yourself_desc: "El calendario ayuda a notar cómo cambian la energía, el estado de ánimo y el apetito en las diferentes fases del ciclo.",
          regularity: "Detectar regularidad",
          regularity_desc: "Dolor, síndrome premenstrual, cambios de humor o de la piel se vuelven más evidentes. Es fácil seguir lo que se repite y lo que ayuda a sentirse mejor.",
          doctor_help: "Ayuda al médico",
          doctor_help_desc: "Si necesitas acudir al ginecólogo, un registro preciso del ciclo y de los síntomas hace que la consulta sea más efectiva.",
          planing: "Planificación de salud y fitness",
          planing_desc: "Puedes adaptar entrenamientos, alimentación o descanso a tu ritmo para obtener el máximo beneficio.",
          finalize_calendar: "El calendario menstrual no es una obligación, sino una herramienta de autoconocimiento. Ayuda a sentirse más segura, prever cambios de ánimo y simplemente cuidarse.",
          phase: "Fases del ciclo menstrual",
          proccess_in_body: "Qué ocurre en el cuerpo de una mujer",
          proccess_in_body_desc: "El ciclo menstrual no son solo 'esos días'. Es un ritmo natural que ayuda al cuerpo a funcionar de manera armoniosa. Se divide en varias fases, cada una afectando nuestro bienestar, estado de ánimo y energía.",
          phase_1_5: "Fase menstrual\n(1 — 5)",
          phase_1_5_desc: "Es el inicio del ciclo. El cuerpo elimina la capa antigua del revestimiento uterino, lo que provoca sangrado menstrual. La energía puede ser menor durante este tiempo, por lo que es bueno permitirse más descanso.",
          phase_6_13: "Fase folicular\n(6 — 13)",
          phase_6_13_desc: "El nivel de estrógeno aumenta gradualmente, trayendo de vuelta fuerza y motivación. Es un buen momento para nuevas ideas, trabajo activo y deporte.",
          phase_14_16: "Fase ovulatoria\n(14 — 16)",
          phase_14_16_desc: "Se libera un óvulo maduro. La mujer puede sentirse segura, atractiva y llena de energía. Estos son los días 'pico', cuando el cuerpo está listo para la concepción.",
          phase_17_28: "Fase lútea\n(17 — 28)",
          phase_17_28_desc: "Si no ocurre el embarazo, el progesterona se vuelve dominante. Puede aparecer somnolencia, cambios de ánimo y antojos de dulce. Es importante escucharse, descansar más y cuidar el bienestar emocional durante este tiempo.",
          finalize_cycle: "El ciclo menstrual no es un enemigo, sino un calendario natural de nuestro cuerpo. Prestando atención a sus fases, se puede planificar mejor el día, comprender los cambios de ánimo y estar más en armonía con uno mismo.",
          go_back: "Volver",
          now: "ahora",
          menstruation: "menstruación",
          scheduled_menstruation: "menstruación programada",
          ovulation: "ovulación",
          planned_ovulation: "ovulación planificada",
          ovulation_in: "ovulación en",
          low_chance: "Baja probabilidad de quedar embarazada",
          average_chance: "Probabilidad promedio de quedar embarazada",
          high_chance: "Alta probabilidad de quedar embarazada",
          no_chance: "Muy baja probabilidad de quedar embarazada",
          myth_facts: "Mitos y realidades",
          one: 'día',
          other: 'días',
          c_long: "Tu ciclo duró {{cLong}} días. ¡Es normal!",
          phase_1: "¡Actualmente estás en tu fase menstrual!\nEste es el comienzo de tu ciclo.\n¡Puede que te sientas baja de energía!\n¡Es mejor cuidarte y descansar durante este tiempo!",
          phase_2: "¡Estás en la fase folicular!\nLa hormona estrógeno está aumentando activamente.\nTu estado de ánimo está mejorando. ¡Tu piel está mejorando!\n¡Estás lista para conquistar el mundo!",
          phase_3: "¡Ahora estás en la fase ovulatoria!\nSe está liberando un óvulo maduro.\n¡Te sientes segura y llena de energía!\n¡Hoy es un gran día para hacer lo que te trae alegría!",
          phase_4: "¡Ahora estás en la fase lútea!\n¡La progesterona comienza a predominar!\nDurante este período, puedes experimentar cambios de humor y somnolencia.\nCuida tu comodidad y escucha tus sentimientos!",
          super: "Súper!",
          gynecology_sub: "Todo sobre los controles periódicos, la prevención y el cuidado de la salud femenina, en un lenguaje sencillo y sin tabúes.",
          womens_tests: "Exámenes y pruebas",
          regular_review: "Chequeos regulares",
          articles_: "Artículos",
          read: "Leer",
          how_often: "¿Con qué frecuencia\ndebes visitar\nal ginecólogo?",
          top_5_tests: "TOP 5 pruebas para\nla salud femenina",
          review_sub: "Cuidar tu salud empieza con la prevención. Una vez al año, estás un paso por delante del problema.",
          what_to_check_regulary: "¿Qué se debe hacer periódicamente?",
          gynecology_review: "Examen por un ginecólogo",
          one_time_per_year: "una vez al año",
          pap_test: "Prueba de Papanicolaou",
          _2_3_time_per_year: "una vez cada 2–3 años",
          blood_test: "Análisis de sangre y orina",
          ultrasound_test: "Ecografía pélvica",
          if_need: "según sea necesario",
          mammography: "Mamografía",
          after_40_years: "después de los 40 años",
          examination_head: "Exámenes y pruebas",
          examination_desc: "Realizarse las pruebas a tiempo es clave para tener confianza en la salud. Descubra qué pruebas y exámenes debe hacerse regularmente.",
          base_review: "Examen básico",
          gynecology_examination: "Examen ginecológico",
          add_to_calendar: "Agregar al calendario",
          ultrasound_glands: "Ecografía de mamas",
          need_I_test: "¿Es necesario hacerse análisis si me siento bien?",
          examination_tip_need: "Los chequeos médicos regulares son importantes incluso cuando no se presentan síntomas. Muchas enfermedades se desarrollan silenciosamente en sus primeras etapas, y las pruebas básicas realizadas a tiempo (sangre, orina, glucosa, colesterol) ayudan a detectar problemas antes de que aparezcan los síntomas.\n\nLos controles anuales son una inversión en su salud. Permiten monitorear su cuerpo, ajustar la alimentación y el estilo de vida, y prevenir complicaciones.\n\nSentirse bien es excelente, pero la prevención siempre es más fácil y económica que el tratamiento.",
          what_needed_blood: "¿Qué debo preparar antes de un análisis de sangre?",
          what_needed_blood_info: "Para obtener resultados precisos en un análisis de sangre, prepárese con antelación:\n\nAyune antes del análisis, la última comida debe ser 8–12 horas antes\n\nBeba solo agua sin gas, no afecta los resultados\n\nEvite el alcohol, alimentos grasos y muy dulces uno o dos días antes\n\nEl día del análisis evite esfuerzos físicos intensos y estrés\n\nSi toma medicamentos, asegúrese de informar a su médico",
          what_diff_ultrasound_mam: "¿Cuál es la diferencia entre ecografía y mamografía?",
          what_diff_ultrasound_mam_info: "La ecografía utiliza ondas sonoras para visualizar los tejidos y muestra bien las estructuras blandas de la mama, especialmente en mujeres jóvenes con tejido denso\n\nLa mamografía es un examen radiográfico que puede detectar pequeñas calcificaciones y signos tempranos de tumores antes de que aparezcan bultos\n\nLa ecografía no utiliza radiación y es adecuada para un control adicional\nLa mamografía sigue siendo el método de cribado principal para mujeres mayores de 40 años\n\nAmbos métodos se utilizan a menudo juntos para un diagnóstico más preciso",
          why_pap_test: "¿Por qué hacerse una prueba de Papanicolaou y con qué frecuencia?",
          why_pap_test_info: "La prueba de Papanicolaou ayuda a detectar cambios en las células del cuello uterino en etapas tempranas cuando aún no hay síntomas\n\nEl cribado regular previene el desarrollo de cáncer y permite un tratamiento oportuno de procesos inflamatorios\n\nPor lo general, la prueba se realiza una vez al año si no hay problemas, o con mayor frecuencia según lo recomiende el médico\n\nLa prueba es rápida, indolora y dura solo unos minutos\n\nIncluso si se siente bien, la prueba ayuda a cuidar su salud",
          reproductive: "Salud reproductiva",
          reproductive_sub: "¡Planifica con nosotros! Cuida tu cuerpo y planifica tu futuro con confianza.",
          myth_main: "Existen muchos mitos sobre la menstruación.",
          myth_sub: "Aquí tienes una pequeña selección)",
          cant_sport: "No se puede hacer deporte durante la menstruación",
          cant_sport_desc: "En realidad, la actividad física ligera como el yoga, caminar o incluso entrenamientos moderados puede aliviar los calambres y mejorar el estado de ánimo.",
          c_long_: "El ciclo siempre dura exactamente 28 días",
          c_long_desc: "Cada ciclo es individual: se considera normal un intervalo de aproximadamente 21 a 35 días.",
          cant_swim: "No se puede bañar ni nadar durante la menstruación",
          cant_swim_desc: "Bañarse y ducharse es seguro. Los productos de higiene (tampones, copas menstruales) permiten nadar cómodamente y mantener la limpieza.",
          cant_get_pregnant: "No se puede quedar embarazada durante la menstruación",
          cant_get_pregnant_desc: "La probabilidad es menor pero no nula: los espermatozoides pueden vivir varios días en el cuerpo y la ovulación puede ocurrir antes o después de lo esperado.",
          pain_is_ok: "El dolor menstrual siempre es normal",
          pain_is_ok_desc: "Una molestia leve es típica, pero el dolor intenso o incapacitante puede indicar endometriosis u otros problemas y debe ser evaluado por un médico.",

          // --- Переклади для посилань в мапінгу ---
          your: "Tu salud",
          diary: "Diario de emociones",
          breathing: "Prácticas de respiración",
          diaphragmatic: "Respiración diafragmática",
          square: "Respiración Cuadrada",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "Test de estado",
          articles: "Artículos útiles",
          article_1: "10 técnicas simples para aliviar el estrés",
          article_2: "Métodos efectivos para combatir la ansiedad",
          article_3: "Técnicas de respiración para relajación",
          article_4: "La relación entre sueño y salud mental",
          article_5: "Bases de meditación para principiantes",
          article_6: "Estrategias para mejorar la autoestima",
          article_7: "Prevención y superación del agotamiento",

          // --- Переклади для меню здоров'я ---
          hmp_your_health: "Tu salud",
          hmp_mental_health: "Salud mental",

          // --- Переклади для ментального здоров'я ---
          mp_articles_title: "Artículos útiles",
          mp_article_1: "10 técnicas simples para reducir el estrés diario",
          mp_article_2: "Cómo manejar la ansiedad",
          mp_article_3: "Ejercicios de respiración para relajarse",
          mp_article_4: "Sueño saludable y salud mental",
          mp_article_5: "Meditación para principiantes",
          mp_article_6: "Cómo aumentar la autoestima",
          mp_article_7: "Métodos efectivos para combatir el agotamiento",
          mp_article_content_1: `
          # 10 técnicas simples para aliviar el estrés
          ## Respiración profunda
          Toma algunas respiraciones profundas concentrándote en la respiración. La técnica «4-4-4» es simple: inhalar durante 4 segundos, retener la respiración durante 4 segundos, exhalar durante 4 segundos. Esto calma el sistema nervioso.
          ## Relajación muscular progresiva
          Tensa y relaja todos los grupos musculares uno por uno, comenzando por los dedos de los pies y terminando en el rostro.
          ## Meditación
          Dedica 5-10 minutos al día a la meditación. Concéntrate en la respiración o usa meditaciones guiadas.
          ## Caminata al aire libre
          Caminatas diarias de 20 minutos reducen el nivel de cortisol y mejoran el estado de ánimo.
          ## Aromaterapia
          Usa aceites esenciales de lavanda, manzanilla o bergamota para relajarte.
          ## Llevar un diario
          Anota tus pensamientos y sentimientos. Esto ayuda a estructurar los pensamientos y reducir el estrés.
          ## Escuchar música
          La música tranquila o los sonidos de la naturaleza pueden reducir significativamente el nivel de estrés.
          ## Técnica "5-4-3-2-1"
          Nombra: 5 cosas que ves; 4 cosas que tocas; 3 cosas que escuchas; 2 cosas que hueles; 1 cosa que saboreas.
          ## Yoga y estiramientos
          Ejercicios simples de yoga ayudan a aliviar la tensión muscular.
          ## Limitar el consumo de noticias
          Limita el tiempo que pasas viendo noticias para reducir la carga informativa.
                  `,
          mp_article_content_2: `
          # Métodos efectivos para combatir la ansiedad
          ## Técnicas de grounding
          Usa técnicas de grounding para volver a la realidad. Por ejemplo, concéntrate en sensaciones físicas.
          ## Terapia cognitivo-conductual
          Identifica pensamientos negativos y reemplázalos por otros más realistas.
          ## Ejercicio regular
          La actividad física reduce la ansiedad y mejora el estado de ánimo.
          ## Limitar la cafeína
          La cafeína puede aumentar la ansiedad, por lo que se recomienda limitar su consumo.
          ## Sueño de calidad
          Una rutina regular de sueño ayuda a reducir la ansiedad.
          ## Apoyo social
          Habla de tus sentimientos con personas cercanas o un profesional.
          ## Práctica de gratitud
          Anota diariamente 3 cosas por las que estás agradecido.
                  `,
          mp_article_content_3: `
          # Técnicas de respiración para relajación
          ## Respiración abdominal
          Acuéstate o siéntate cómodamente. Coloca una mano en el pecho, la otra en el abdomen. Inhala lentamente por la nariz, sintiendo cómo el abdomen se eleva. Exhala por la boca.
          ## Técnica "4-7-8"
          Inhala por la nariz contando 4, retén la respiración contando 7, exhala por la boca contando 8.
          ## Respiración equitativa
          Inhala y exhala en la misma cantidad de tiempos (por ejemplo, 4-4 o 5-5).
          ## Respiración con exhalación alargada
          Inhala en 4 tiempos, exhala en 6-8 tiempos.
          ## Respiración alternada por fosas nasales
          Cierra la fosa nasal derecha, inhala por la izquierda. Retén la respiración. Cierra la fosa nasal izquierda, exhala por la derecha.
                  `,
          mp_article_content_4: `
          # La relación entre sueño y salud mental
          ## Rutina regular de sueño
          Acuéstate y levántate a la misma hora todos los días, incluso los fines de semana.
          ## Crear condiciones ideales para dormir
          Asegura oscuridad, silencio y temperatura cómoda en el dormitorio.
          ## Limitar el tiempo de pantalla
          Deja de usar dispositivos electrónicos 1-2 horas antes de dormir.
          ## Rituales de relajación
          Crea un ritual nocturno: baño caliente, lectura, meditación.
          ## Limitar cafeína y alcohol
          Evita la cafeína después del almuerzo y el alcohol antes de dormir.
          ## Actividad física regular
          El ejercicio mejora la calidad del sueño, pero evita entrenamientos intensos antes de dormir.
          ## Alimentación equilibrada
          Consume alimentos ricos en triptófano, magnesio y vitaminas del grupo B.
                  `,
          mp_article_content_5: `
          # Bases de meditación para principiantes
          ## Empezar poco a poco
          Comienza con 5-10 minutos al día y aumenta gradualmente el tiempo.
          ## Concentrarse en la respiración
          Enfócate en la sensación de la respiración - cómo el aire entra y sale.
          ## Observar los pensamientos
          No intentes detener los pensamientos, simplemente obsérvalos sin juzgar.
          ## Usar meditaciones guiadas
          Usa aplicaciones o grabaciones de audio para sesiones guiadas.
          ## Crear un espacio cómodo
          Encuentra un lugar tranquilo donde no te molesten.
          ## Regularidad
          Medita regularmente, preferiblemente a la misma hora del día.
          ## Paciencia contigo mismo
          No te critiques si no puedes concentrarte. Es una parte normal del proceso.
                  `,
          mp_article_content_6: `
          # Estrategias para mejorar la autoestima
          ## Practicar la autocompasión
          Trátate como tratarías a un amigo que necesita apoyo.
          ## Reconocer tus fortalezas
          Haz una lista de tus puntos fuertes y logros.
          ## Establecer metas realistas
          Fíjate objetivos alcanzables y celebra tus progresos.
          ## Limitar el diálogo interno negativo
          Reemplaza pensamientos críticos por otros de apoyo.
          ## Rodearse de personas positivas
          Pasa tiempo con personas que te apoyen y te inspiren.
          ## Cuidado personal
          Haz regularmente cosas que te traigan alegría y relajación.
          ## Ayuda profesional
          Consulta a un psicólogo si la autoestima afecta significativamente tu calidad de vida.
                  `,
          mp_article_content_7: `
          # Prevención y superación del agotamiento
          ## Establecer límites
          Aprende a decir "no" y establece límites saludables.
          ## Pausas regulares
          Toma breves descansos durante la jornada laboral.
          ## Priorizar tareas
          Enfócate en las tareas más importantes y delega cuando sea posible.
          ## Buscar significado
          Encuentra un sentido personal en lo que haces.
          ## Actividad física
          El ejercicio regular ayuda a combatir el estrés.
          ## Apoyo social
          Habla de tus sentimientos con colegas, amigos o un profesional.
          ## Recuperar el equilibrio
          Encuentra tiempo para hobbies y vida personal fuera del trabajo.
          ## Ayuda profesional
          No dudes en consultar a un psicólogo o coach.
                  `,
          mp_article_not_found: "Artículo no encontrado",
          mp_article_not_found_desc_1: "El artículo con ID",
          mp_article_not_found_desc_2: "no existe.",
          mp_aew_ok: "Ok",
          mp_aew_balance: "Equilibrio",
          mp_aew_safety: "Seguridad",
          mp_aew_neutrality: "Neutralidad",
          mp_aew_lethargy: "Letargo",
          mp_aew_carefreeness: "Despreocupación",
          mp_aew_relaxation: "Relajación",
          mp_aew_calmness: "Calma",
          mp_aew_stability: "Estabilidad",
          mp_aew_focus: "Concentración",
          mp_aew_so_so: "Más o menos",
          mp_aew_indifference: "Indiferencia",
          mp_aew_nervousness: "Nerviosismo",
          mp_aew_slight_irritation: "Leve irritación",
          mp_aew_doubt: "Duda",
          mp_aew_restlessness: "Inquietud",
          mp_aew_distrust: "Desconfianza",
          mp_aew_tension: "Tensión",
          mp_aew_dissatisfaction: "Insatisfacción",
          mp_aew_melancholy: "Melancolía",
          mp_aew_i_feel_sick: "Me siento mal",
          mp_aew_fatigue: "Fatiga",
          mp_aew_self_pity: "Lástima de mí mismo",
          mp_aew_anxiety: "Ansiedad",
          mp_aew_sadness: "Tristeza",
          mp_aew_uncertainty: "Incertidumbre",
          mp_aew_confusion: "Confusión",
          mp_aew_guilt: "Culpa",
          mp_aew_self_rejection: "Rechazo de sí mismo",
          mp_aew_emptiness: "Vacío",
          mp_aew_terribly: "Terriblemente",
          mp_aew_isolation: "Aislamiento",
          mp_aew_depression: "Depresión",
          mp_aew_envy: "Envidia",
          mp_aew_deep_sorrow: "Profunda pena",
          mp_aew_shame: "Vergüenza",
          mp_aew_despair: "Desesperación",
          mp_aew_loneliness: "Soledad",
          mp_aew_hopelessness: "Desesperanza",
          mp_aew_self_directed_aggression: "Agresión hacia uno mismo",
          mp_aew_сool: "Genial",
          mp_aew_energy: "Energía",
          mp_aew_satisfaction: "Satisfacción",
          mp_aew_connection: "Sensación de conexión",
          mp_aew_comfort: "Comodidad",
          mp_aew_love: "Amor",
          mp_aew_motivation: "Motivación",
          mp_aew_determination: "Determinación",
          mp_aew_respect: "Respeto",
          mp_aew_friendship: "Amistad",
          mp_aew_good: "Bien",
          mp_aew_in_the_flow: "En flujo",
          mp_aew_pride: "Orgullo",
          mp_aew_inspiration: "Inspiración",
          mp_aew_hope: "Esperanza",
          mp_aew_optimism: "Optimismo",
          mp_aew_confidence: "Confianza",
          mp_aew_joy: "Alegría",
          mp_aew_gratitude: "Gratitud",
          mp_aew_openness: "Apertura",
          mp_aew_great: "Excelente",
          mp_aew_bliss: "Felicidad plena",
          mp_aew_delight: "Deleite",
          mp_aew_admiration: "Admiración",
          mp_aew_excitement: "Emoción",
          mp_aew_elation: "Euforia",
          mp_aew_euphoria: "Éxtasis",
          mp_aew_devotion: "Devoción",
          mp_aew_love_of_life: "Amor por la vida",
          mp_aew_triumph: "Triunfo",
          mp_aew_people: "Personas",
          mp_aew_myself: "Yo mismo",
          mp_aew_family: "Familia",
          mp_aew_friends: "Amigos",
          mp_aew_partner: "Pareja",
          mp_aew_colleagues: "Colegas",
          mp_aew_events: "Eventos",
          mp_aew_work: "Trabajo",
          mp_aew_training: "Entrenamiento",
          mp_aew_driving: "Conducción",
          mp_aew_rest: "Descanso",
          mp_aew_studying: "Estudio",
          mp_aew_places: "Lugares",
          mp_aew_home: "Hogar",
          mp_aew_office: "Oficina",
          mp_aew_school: "Escuela",
          mp_aew_university: "Universidad",
          mp_aew_street: "Calle",
          mp_edp_sports: "Deporte",
          mp_edp_coffee: "Café",
          mp_edp_alcohol: "Alcohol",
          mp_edp_sex: "Sexo",
          mp_edp_meditation: "Meditación",
          mp_edp_antidepressants: "Antidepresivos",
          mp_edp_other: "Otro",
          mp_edp_not_specified: "No especificado",
          mp_aew_wizard_title_step_1: "Me siento",
          mp_aew_wizard_title_step_2: "¿Cuál fue la causa de estas emociones?",
          mp_aew_wizard_title_step_3: "¿Quieres escribir algo sobre",
          mp_aew_wizard_description_step_3: "Tu nota es privada y solo tú puedes verla.",
          mp_return_back: "Volver atrás",
          mp_btn_next: "Siguiente",
          mp_btn_add: "Añadir",
          mp_btn_back: "Atrás",
          mp_btn_cancel: "Cancelar",
          mp_btn_lets_start: "¿Empezamos?",
          mp_btn_continue: "Continuar",
          mp_btn_start: "Comenzar",
          mp_btn_save: "Guardar",
          mp_btn_result: "Resultado",
          mp_btn_try_again: "Intentar de nuevo",
          mp_bpp_title: "Prácticas de respiración",
          mp_bpp_subtitle: "Exhala estrés — inhala calma 🌿",
          mp_bpp_description_1: "Ejercicios simples de respiración ayudan a aliviar la tensión, recuperar energía y clarificar la mente. Puedes empezar en cualquier lugar: en casa, en el trabajo o incluso en transporte.",
          mp_bpp_description_2: "Prueba — y siente cómo tu cuerpo se relaja y tu estado de ánimo se aligera.",
          mp_bpp_card_title_1: "Respiración diafragmática",
          mp_bpp_card_description_1_1: "Reduce el estrés y la ansiedad.",
          mp_bpp_card_description_1_2: "Relaja, alivia la tensión.",
          mp_bpp_card_title_2: "Respiración Cuadrada",
          mp_bpp_card_description_2_1: "Alivia la ansiedad y ayuda a concentrarse.",
          mp_bpp_card_title_3: "Nadi Shodhana",
          mp_bpp_card_description_3_1: "Respiración alternada por fosas nasales.",
          mp_bpp_card_description_3_2: "Ayuda a aliviar el estrés.",
          mp_bpp_card_description_3_3: "Restaura el equilibrio interior.",
          mp_dbp_title: "Respiración diafragmática",
          mp_dbp_subtitle: "La respiración que devuelve la calma",
          mp_dbp_description_1_1: "Siéntate cómodamente. Relaja los hombros. Realiza al menos 3 - 5 minutos.",
          mp_dbp_description_1_2: "Vuelve a la respiración cuando sientas tensión.",
          mp_dbp_inhale: "INHALA",
          mp_dbp_hold: "MANTÉN",
          mp_dbp_exhale: "EXHALA",
          mp_dbp_come_on_more: "VAMOS MÁS",
          mp_ebp_title: "Diario de emociones",
          mp_ebp_factor_title: "Factores del estado de ánimo",
          mp_ebp_factor_info_p_1: "Todos los factores son tus posibles desencadenantes.",
          mp_ebp_factor_info_p_2: "Por ejemplo, puedes no notar que el deporte, el café o las drogas influyen en tu estado de ánimo y forman patrones de comportamiento.",
          mp_ebp_factor_info_p_3: "Puedes rastrear la influencia de los factores en tu bienestar más adelante en la sección de análisis.",
          mp_ebp_factor_info_p_4: "Ejemplo",
          mp_ebp_factor_info_p_5: "Alimentación y estimulantes:",
          mp_ebp_factor_info_p_6: "Anota tu consumo de café, vitaminas o productos que puedan afectar tu nivel de energía.",
          mp_ebp_factor_info_p_7: "Actividad y ejercicio físico:",
          mp_ebp_factor_info_p_8: "Sigue la cantidad de ejercicio físico o participación en otras formas de actividad física.",
          mp_ebp_factor_info_p_9: "Ciclos biológicos:",
          mp_ebp_factor_info_p_10: "Siguiendo tu ciclo menstrual, podrás entender cómo influye en tu bienestar emocional.",
          mp_ebp_selected_factors: "Factores seleccionados:",
          mp_ebp_available_factors: "Factores disponibles:",
          mp_ebp_hello_how_are_you: "¡Hola! ¿Cómo estás?",
          mp_ebp_factor: "Factores",
          mp_ebp_add_factor: "Añadir factor",
          mp_mhp_title: "Tu calma comienza aquí.",
          mp_mhp_sub_title: "Hemos reunido herramientas que te ayudarán a mantener el equilibrio incluso en los días más estresantes.",
          mp_mhp_test_card_title: "Tests de estado",
          mp_mhp_test_card_btn_text: "Hacer test",
          mp_mhp_breathing_card_title: "Prácticas de respiración",
          mp_mhp_breathing_card_btn_text: "Elegir práctica",
          mp_mhp_articles_card_title: "Artículos útiles",
          mp_mhp_articles_card_btn_text: "Ver artículos",
          mp_mhp_choose_specialist: "Elegir especialista",
          mp_mtp_test_data_question_1: "¿Cómo te despiertas por la mañana?",
          mp_mtp_test_data_answers_1_1: "Con entusiasmo y planes",
          mp_mtp_test_data_answers_1_2: "Con un vaso de agua y un suspiro pesado",
          mp_mtp_test_data_answers_1_3: "“¿Otra vez este día?”",
          mp_mtp_test_data_question_2: "Cuando algo sale mal, tu reacción es:",
          mp_mtp_test_data_answers_2_1: "Ok, pensaré cómo arreglarlo",
          mp_mtp_test_data_answers_2_2: "Bueno, así es la vida",
          mp_mtp_test_data_answers_2_3: "Todo está perdido, me voy a la manta",
          mp_mtp_test_data_question_3: "¿Qué te salva del estrés más a menudo?",
          mp_mtp_test_data_answers_3_1: "Deporte o paseo",
          mp_mtp_test_data_answers_3_2: "Comida, serie o memes",
          mp_mtp_test_data_answers_3_3: "Simplemente me quedo sin fuerzas",
          mp_mtp_test_data_question_4: "Tu sensación de energía últimamente:",
          mp_mtp_test_data_answers_4_1: "Normal, la carga aguanta",
          mp_mtp_test_data_answers_4_2: "Como una batería al 30%",
          mp_mtp_test_data_answers_4_3: "Como un teléfono que se apaga en frío",
          mp_mtp_test_data_question_5: "¿Qué piensas cuando escuchas la palabra \"descanso\"?",
          mp_mtp_test_data_answers_5_1: "Planeo algo agradable",
          mp_mtp_test_data_answers_5_2: "Quedarme en casa sin hacer nada",
          mp_mtp_test_data_answers_5_3: "No tengo tiempo para descansar",
          mp_mtp_test_result_title_1: "Tu salud mental está bien.",
          mp_mtp_test_result_description_1: "Tienes un nivel excelente de energía y optimismo. ¡Sigue cuidándote y manteniendo este estado!",
          mp_mtp_test_result_title_2: "Tu salud mental está mayormente bien.",
          mp_mtp_test_result_description_2: "La mayoría de las cosas van bien, pero algunas áreas necesitan un poco más de atención y cuidado.",
          mp_mtp_test_result_title_3: "Tu salud mental está un poco agotada",
          mp_mtp_test_result_description_3: "Sientes una ligera fatiga. Encuentra tiempo para descansar y pequeñas alegrías.",
          mp_mtp_test_result_title_4: "Tu salud mental pide cuidado",
          mp_mtp_test_result_description_4: "Necesitas más descanso, alegrías y apoyo. Presta atención a tus necesidades.",
          mp_mtp_test_result_title_5: "Tu salud mental grita SOS",
          mp_mtp_test_result_description_5: "Puedes estar experimentando agotamiento. No temas pedir ayuda y encuentra tiempo para un descanso serio.",
          mp_mtp_test_result_title_6: "Tu salud mental es como una montaña rusa.",
          mp_mtp_test_result_description_6: "Tu estado cambia a menudo. Algunos días son geniales, otros más difíciles. Intenta encontrar equilibrio.",
          mp_mtp_start_message: "¡Atención! El test no tiene valor diagnóstico, pero muestra tu nivel de estrés o agotamiento.",
          mp_mtp_test_title: "Test del estado de tu salud mental",
          mp_mtp_test_description: "Toca las respuestas que correspondan a tu estado)",
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "La respiración que equilibra la energía",
          mp_nsp_description_1: "Técnica de alternancia de fosas nasales para armonizar mente y cuerpo.",
          mp_nsp_description_2: "Realiza 3-5 minutos para lograr efecto.",
          mp_nsp_technique_title: "Técnica:",
          mp_nsp_technique_step_1: "Siéntate cómodamente, endereza la espalda.",
          mp_nsp_technique_step_2: "Con la mano cierra la fosa nasal derecha, inhala por la izquierda.",
          mp_nsp_technique_step_3: "Luego cierra la izquierda — exhala por la derecha.",
          mp_nsp_technique_step_4: "Inhala por la derecha — exhala por la izquierda.",
          mp_nsp_technique_step_5: "Continúa varios minutos a ritmo tranquilo.",
          mp_nsp_result_title: "Resultado:",
          mp_nsp_result_description_1: "Ya después de unos minutos aparece una sensación de calma. Disminuye el nivel de tensión. La mente se aclara, como después de un breve descanso.",
          mp_nsp_result_description_2: "La práctica regular ayuda a conciliar mejor el sueño, concentrarse y mantener el equilibrio interior incluso en situaciones estresantes.",
          mp_sbp_title: "Respiración Cuadrada",
          mp_sbp_subtitle: "La respiración que devuelve la calma",
          mp_sbp_description_1: "Siéntate cómodamente. Relaja los hombros. Realiza al menos 3 - 5 minutos.",
          mp_sbp_description_2: "Vuelve a la respiración cuando sientas tensión.",

          // --- Переклади для твого здоров'я ---
          mp_yhp_main_title: "Tu salud —",
          mp_yhp_main_subtitle: "Tu superpoder. Se sostiene sobre 3 pilares:",
          mp_yhp_activity_title: "Actividad",
          mp_yhp_activity_description_1: "Incluso 15 minutos al día ya marcan la diferencia.",
          mp_yhp_activity_description_2: "Caminata, cuerda, pilates – elige lo que te guste, y tu cuerpo dirá 'gracias'.",
          mp_yhp_sleep_title: "Sueño",
          mp_yhp_sleep_description_1: "¡Es lo más importante!",
          mp_yhp_sleep_description_2: "El sueño no es pereza, es tu cable de carga interno. 7-8 horas de descanso de calidad ayudan al cuerpo a recuperarse y al cerebro a trabajar rápido y creativamente.",
          mp_yhp_nutrition_title: "Nutrición",
          mp_yhp_nutrition_description_1: "La comida es combustible. Cuanto más calidad tenga, mejor funciona tu 'motor'.",
          mp_yhp_nutrition_description_2: "No se trata de dietas, sino de equilibrio: más verduras, menos estrés con los snacks.",
          
          // --- Переклади для чоловічого здоров'я ---
          hormonas_diagram: "Gráfico de la salud masculina",
          mp_male_health: "Salud masculina",
          mp_subtitle_1: "Ser hombre también es cuestión de salud",
          mp_hormones_block_title: "Hormonas",
          mp_hormones_block_content_label_1: "Nivel de testosterona",
          mp_hormones_block_content_value_1_1: "normal 300–1000 ng/dl",
          mp_hormones_block_content_label_2: "Signos de deficiencia",
          mp_hormones_block_content_value_2_1: "fatiga",
          mp_hormones_block_content_value_2_2: "bajo libido",
          mp_hormones_block_content_value_2_3: "pérdida muscular",
          mp_hormones_block_content_label_3: "¿Qué hacer?",
          mp_hormones_block_content_value_3_1: "análisis regulares",
          mp_hormones_block_content_value_3_2: "entrenamiento de fuerza",
          mp_hormones_block_content_value_3_3: "sueño de calidad",
          mp_hormones_block_content_value_3_4: "menos estrés",
          mp_add_hormones_data: "Agregar indicadores",
          mp_analyses_block_title: "Análisis y prevención",
          mp_analyses_block_content_label_1: "Análisis general de sangre y orina",
          mp_analyses_block_content_value_1: "anualmente",
          mp_analyses_block_content_label_2: "Perfil hormonal",
          mp_analyses_block_content_value_2: "cuando sea necesario",
          mp_analyses_block_content_label_3: "PSA",
          mp_analyses_block_content_value_3: "después de los 40 años",
          mp_analyses_block_content_label_4: "Ecografía pélvica",
          mp_analyses_block_content_value_4: "cada 1–2 años",
          mp_analyses_block_content_label_5: "Perfil hormonal",
          mp_analyses_block_content_value_5: "según recomendación médica",
          mp_reproductive_block_title: "Salud reproductiva",
          mp_reproductive_block_content_label_1: "Fertilidad",
          mp_reproductive_block_content_value_1: "la calidad del esperma depende del estilo de vida",
          mp_reproductive_block_content_label_2: "Riesgos",
          mp_reproductive_block_content_value_2: "sobrecalentamiento, alcohol, fumar, obesidad",
          mp_reproductive_block_content_label_3: "Recomendaciones",
          mp_reproductive_block_content_value_3: "Urólogo 1×/año, espermograma",
          mp_urinary_block_title: "Sistema urinario",
          mp_urinary_block_content_label_1: "Chequeo de próstata",
          mp_urinary_block_content_value_1: "desde los 40 años — PSA y ecografía 1×/año",
          mp_urinary_block_content_label_2: "¡Alerta!",
          mp_urinary_block_content_value_2: "dolor, sangre en la orina, micción frecuente",
          mp_urinary_block_content_label_3: "¿Qué hacer?",
          mp_urinary_block_content_value_3: "no ignorar el malestar, acudir al urólogo",
          mp_potency_block_title: "Potencia",
          mp_potency_block_content_label_1: "¿Por qué disminuye?",
          mp_potency_block_content_value_1: "estrés, alcohol, fumar, enfermedades cardíacas",
          mp_potency_block_content_label_2: "¿Cómo mantenerla?",
          mp_potency_block_content_value_2: "deporte, sueño de calidad, dieta equilibrada",
          mp_potency_block_content_label_3: "¿Cuándo acudir al médico?",
          mp_potency_block_content_value_3: "si los problemas duran más de 2 meses",
          mp_subtitle_2: "Cuida de ti como de tu coche favorito",
          mp_form_subtitle: "Rellena los campos si tienes datos actuales y haremos un gráfico",
          mp_form_testosterone: "Testosterona",
          mp_form_free_testosterone: "Testosterona libre",
          mp_form_free_testosterone_2: "T libre",
          mp_form_prolactin: "Prolactina",
          mp_form_estradiol: "Estradiol",
          mp_form_lh: "LH (hormona luteinizante)",
          mp_form_lh_2: "LH",
          mp_form_fsh: "FSH",
          mp_form_ng_dl: "ng/dl",
          mp_form_ng_ml: "ng/ml",
          mp_form_pg_ml: "pg/ml",
          mp_form_mO_l: "mU/l",
          mp_form_save_btn: "Guardar indicadores",
          mp_diagram_hormons_value_not_found: "No se encontraron datos hormonales. Por favor, introduce tus valores.",
          mp_diagram_hormons_data_not_found: "Error al cargar los datos. Contacta con soporte.",
          mp_diagram_low: "Bajo",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "Alto",

        },
      },
    },
    fallbackLng: "uk",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
