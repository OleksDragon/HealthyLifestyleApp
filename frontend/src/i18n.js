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

          // --- Footer translations ---
          specialists: "Specialists",
          privacy_policy: "Privacy Policy",
          support_service: "Support Service",
          copyright: "© Nomyfy {{year}}.",

          // --- Login translations ---
          login1: "LOGIN",
          password: "password",
          forgot_password: "forgot password?",
          login2: "Login",
          no_profile: "No profile? ",
          register2: "Register",

          // --- Registration translations ---
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

          // --- Password recovery translations ---
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

          // Menu translations
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
          health_one_place: "Your health in one place!",
          mental: "Mental health",

          // Dashboard widgets translations
          kkal: "Calories",
          current_week: "Current week",
          water: "Water",
          L: "L",
          sleep: "Sleep",
          H: "H",
          bmi: "BMI",
          bmi_requires: "Fill in the information about height and weight",

          // --- User profile translations ---
          p_error_upadate:
            "Failed to update profile. Please fill in all fields.",
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
          p_specialist_profile: "Specialist Profile",
          specialist_profile: "Specialist Profile",
          specialist_type: "Specialist Type",
          user_name: "User Name",
          back_to_profile: "Back to Profile",
          specialist_profile_description: "This is your specialist profile page where you can manage your professional information.",
          
          // Specialist Profile Page
          sp_hourly_rate: "Hourly Rate",
          sp_experience: "Experience (years)",
          sp_biography: "Biography",
          sp_website: "Specialist Website",
          sp_instagram: "Instagram",
          sp_license_number: "License Number",
          sp_work_format: "Work Format",
          sp_work_format_add: "Add Format",
          sp_work_format_placeholder: "Enter work format",
          sp_work_format_empty: "No work formats added",
          sp_skills: "Skills",
          sp_add_skill: "Add Skill",
          sp_certificates: "Certificates",
          sp_add_certificate: "Add Certificate",
          sp_save: "Save",
          sp_saving: "Saving...",
          sp_profile_toggle: "Specialist Profile",
          sp_save_success: "Data saved successfully!",
          sp_save_error: "Error saving data:",
          sp_hourly_rate_placeholder: "Enter hourly rate",
          sp_experience_placeholder: "Enter years of experience",
          sp_biography_placeholder: "Tell us about yourself...",
          sp_website_placeholder: "Enter website URL",
          sp_instagram_placeholder: "Enter Instagram username",
          sp_license_number_placeholder: "Enter license number",
          sp_certificate_placeholder: "Enter certificate name",
          sp_add_skill_placeholder: "Add skill...",
          sp_add_button: "Add",
          sp_cancel_button: "Cancel",
          
          // Validation error messages
          validation_hourly_rate_invalid_number: "Please enter a valid number",
          validation_hourly_rate_negative: "Hourly rate cannot be negative",
          validation_hourly_rate_too_high: "Hourly rate is too high",
          validation_experience_invalid_number: "Please enter a valid number",
          validation_experience_negative: "Experience cannot be negative",
          validation_experience_too_high: "Experience cannot exceed 100 years",
          validation_biography_too_long: "Biography cannot exceed 1000 characters",
          validation_email_invalid_format: "Please enter a valid email address",
          validation_email_too_long: "Email address is too long",
          validation_phone_invalid_format: "Please enter a valid phone number",
          validation_phone_too_long: "Phone number is too long",
          validation_phone_too_short: "Phone number is too short",
          validation_website_invalid_format: "Please enter a valid website URL",
          validation_website_too_long: "Website URL is too long",
          validation_license_number_invalid_format: "Please enter a valid license number",
          validation_license_number_too_long: "License number is too long",
          
          // Skills translations
          skill_powerlifting: "Powerlifting",
          skill_strength_training: "Strength Training",
          skill_nutrition_correction: "Nutrition Correction",
          skill_stretching: "Stretching",
          skill_cardio_training: "Cardio Training",
          skill_children_fitness: "Children's Fitness",
          skill_rehabilitation_exercises: "Rehabilitation Exercises",
          skill_client_motivation: "Client Motivation",
          skill_individual_programs: "Individual Programs",
          skill_group_classes: "Group Classes",
          
          // Work Format Templates
          work_format_online_telegram: "Online support in Telegram",
          work_format_offline_gym: "Offline training in gym (by appointment)",
          work_format_weekly_plan: "Weekly plan corrections",
          work_format_online_zoom: "Online consultations via Zoom",
          work_format_office_sessions: "In-person sessions in office (by appointment)",
          work_format_therapy_plans: "Weekly therapy plans",
          work_format_clinic_visits: "In-person visits at clinic (by appointment)",
          work_format_prevention_plans: "Prevention and treatment plans",
          work_format_nutrition_plan: "Weekly nutrition plan corrections",
          
          upload_photo: "Upload Photo",
          uploading: "Uploading...",
          download: "Download",
          remove: "Remove",
          p_profile_incomplete_alert: "Please complete your user profile",


          // --- Custom calendar translations (user birthday) ---
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

          // --- Countries translations ---
          p_ukrain_country: "Ukraine",
          p_great_britain_country: "United Kingdom",
          p_germany_country: "Germany",
          p_france_country: "France",
          p_spain_country: "Spain",
          p_usa_country: "USA",

          // --- Переклади для календара місячних
          last_cycle_first_day: "1st day of last cycle",

          // --- Translations for Specialists
          filter_speciality: "Specialization",
          filter_mode: "Online/Offline",
          filter_experience: "Experience",
          filter_price: "Price",

          spec_psychologist: "Psychologist",
          spec_doctor: "Doctor",
          spec_trainer: "Trainer",
          spec_dietitian: "Dietitian",

          mode_online: "Online only",
          mode_offline: "Offline only",
          mode_hybrid: "Online / Offline",
          select_city: "Locations",

          experience_1: "Up to 1 year",
          experience_3: "From 3 years",
          experience_5: "From 5 years",
          experience_10: "From 10 years",

          price_50: "up to 50 $/hour",
          price_75: "from 50 to 75 $/hour",
          price_100: "from 75 to 100 $/hour",
          price_150: "from 100 to 150 $/hour",
          hourly_rate_title: "$/hour",

          clear_option: "Clear",
          clear_filter: "Clear filter",
          unknown_specialist: "Unknown specialist",
          top_5: "TOP - 5",
          subscribe: "Subscribe",
          no_specialists_found: "No specialists found",
          recomend: "Recommended!",
          join_team: "Join our team!",

          // Additional translations
          tariffs: "Tariffs",
          reviews: "Reviews",
          choose: "Choose",

          // Plan features translations
          plan_start_30_title: "Start 30",
          plan_result_30_title: "Result 30", 
          plan_vip_30_title: "VIP 30",
          plan_duration: "/ 30 days",
          plan_start_30_price: "13 USD",
          plan_result_30_price: "40 USD",
          plan_vip_30_price: "107 USD",
          plan_feature_1: "Individual training plan (2-3 days/week)",
          plan_feature_2: "Nutrition suggestions",
          plan_feature_3: "1 online consultation per week",
          plan_feature_4: "Training plan + detailed diet",
          plan_feature_5: "Weekly corrections + video analysis of technique",
          plan_feature_6: "Support in messenger 5/7",
          plan_feature_7: "Full online management",
          plan_feature_8: "12 trainings per month",
          plan_feature_9: "Nutrition analysis and individual recommendations",
          plan_feature_10: "Full support in messenger",
          // --- Links mapping translations ---
          diary: "Emotion Diary",
          article_1: "10 simple stress relief techniques",
          article_2: "Effective methods for combating anxiety",
          article_3: "Breathing techniques for relaxation",
          article_4: "The link between sleep and mental health",
          article_5: "Basics of meditation for beginners",
          article_6: "Strategies for improving self-esteem",
          article_7: "Prevention and overcoming burnout",

          // --- Nutrition translations ---
          welcome: "Welcome",
          nt_tracker_tab: "Nutrition Tracker",
          nt_recipes_tab: "Recipes",
          nt_date_label: "Date",
          nt_calories_label: "Calories",
          nt_kcal_abbr: "kcal",
          nt_protein_label: "Protein",
          nt_g_abbr: "g",
          nt_meals_title: "Meals",
          nt_add_meal_button: "Add Meal",
          nt_analytics_title: "Analytics",
          nt_ration_tab: "Ration",
          nt_loading: "Loading...",
          nt_motivation_title: "Motivation",
          nt_motivation_loading: "Loading motivation...",
          nt_daily_progress: "Daily Progress",
          nt_fat_label: "Fats",
          nt_carbs_label: "Carbohydrates",
          nt_dish_name: "Dish Name",

          nt_k_abbr: "kcal",
          nt_b_abbr: "P",
          nt_zh_abbr: "F",
          nt_v_abbr: "C",

          nt_unspecified_meal_1: "Breakfast",
          nt_unspecified_meal_2: "Lunch",
          nt_unspecified_meal_3: "Dinner",
          nt_unspecified_meal_4: "Snack",

          loadingRecipe: "Loading recipe...",
          recipeNotFound: "Recipe not found",
          confirmDeleteRecipe:
            "Are you sure you want to delete this recipe? This action cannot be undone.",
          recipeDeletedSuccess: "✅ Recipe successfully deleted!",
          deleteRecipeError: "Error deleting recipe",
          recipeInUseError:
            "Cannot delete recipe. It may be used in user diets.",
          recipeSteps: "Recipe Steps",
          videoRecipe: "Video Recipe",
          clickToWatch: "Click to watch",
          backToRecipes: "Back to Recipes",
          deleting: "Deleting...",
          loadRecipeError: "❌ Error loading recipe",
          fillRequiredFields:
            "Please fill in the required fields (marked with *)",
          addAtLeastOneIngredient: "Add at least one ingredient",
          addAtLeastOneStep: "Add at least one cooking step",
          recipeUpdatedSuccess: "✅ Recipe successfully updated!",
          updateRecipeError: "Error updating recipe",
          loadingRecipeForEdit: "Loading recipe for editing...",
          recipeImage: "Recipe Image",
          changeImage: "Change image",
          clickToUploadImage: "Click to upload image",
          imageFormats: "PNG, JPG, WEBP up to 5MB",
          cookingSteps: "Cooking Steps",
          step: "Step",
          describeStepPlaceholder: "Describe the cooking step...",
          addStep: "Add step",
          recipeName: "Recipe Name",
          description: "Description",
          cookingTime: "Cooking Time",
          cookingTimePlaceholder: "e.g., 30 min",
          videoLink: "Video Link",
          ingredientNamePlaceholder: "Ingredient name",
          ingredientAmountPlaceholder: "Amount",
          addIngredient: "Add ingredient",
          cancel: "Cancel",
          saving: "Saving...",
          updateRecipe: "Update Recipe",
          addNewRecipe: "Add New Recipe",
          saveRecipe: "Save Recipe",
          addRecipeError: "Error adding recipe",
          recipeAddedSuccess: "✅ Recipe successfully added!",
          error_token_missing: "Token missing",
          error_auth: "Authentication error",
          error_loading_data: "Error loading data",
          nt_no_meals_message: "No meals for this day yet.",
          nt_unspecified_dish_name: "Unspecified",
          auth_error: "Authentication error. Please log in again.",
          error_deleting_meal: "Error deleting meal",
          breakfast: "Breakfast",
          lunch: "Lunch",
          dinner: "Dinner",
          snack: "Snack",
          meal: "Meal",
          nt_add_meal_button_multiline: "Add your\nmeal",
          nt_ingredients_for: "Ingredients for",
          nt_ingredients_title_day: "Ingredients for day",
          loading_ingredients: "Loading ingredients...",
          no_recipe_ingredients: "This meal has no detailed ingredients.",
          no_ingredients_today:
            "No recipes with detailed ingredients in the ration.",
          nt_delete_meal_button: "Delete meal",
          add_recipe_text: "Add your recipe",
          error_loading_recipes: "Error loading recipes. Check console.",
          loading_text: "Loading recipes...",
          no_recipes_found: "No recipes found.",
          add_element: "Add element",
          error_auth_recipes: "Authentication error when loading recipes.",
          error_no_user: "Failed to determine user. Please log in.",
          error_no_recipe_selected: "Select a recipe.",
          error_invalid_quantity: "Number of portions must be greater than 0.",
          add_meal_title: "Add Meal",
          meal_type_label: "Meal Type",
          portions_label: "Quantity (portions)",
          selected_recipe_label: "Selected Recipe",
          no_recipe_selected: "Nothing selected",
          adding_meal: "Adding...",
          add_to_ration_button: "Add to Ration",
          cancel_button: "Cancel",
          search_recipes_placeholder: "Search recipes...",
          refresh_button: "Refresh",
          loading_recipes: "Loading recipes...",
          calories: "Calories",
          proteins: "Proteins",
          fats: "Fats",
          carbs: "Carbs",
          ingredients: "Ingredients",
          editRecipe: "Edit Recipe",
          deleteRecipe: "Delete Recipe",

          weight_analytics: "Weight Analytics",
          we_no_data_chart: "No data available to display the chart.",
          we_no_chart_data: "At least 2 entries are required.",
          we_mode_month: "Month",
          we_mode_7days: "7 Days",
          we_last_7_days: "Last 7 Days",

          we_title: "Log Weight",
          we_current_label: "Current Weight:",
          we_no_data: "No data",
          we_error_data: "Error",
          we_kg_abbr: "kg",
          we_placeholder: "Enter weight (kg)",
          we_submitting: "Saving...",
          we_save_button: "Save",
          we_saved: "Weight saved!",
          we_error: "Save error.",

          nt_january: "January",
          nt_february: "February",
          nt_march: "March",
          nt_april: "April",
          nt_may: "May",
          nt_june: "June",
          nt_july: "July",
          nt_august: "August",
          nt_september: "September",
          nt_october: "October",
          nt_november: "November",
          nt_december: "December",

          // --- Nutrition motivation messages ---
          nt_motivation_general_1:
            "Your health is your biggest investment. Keep going, you are on the right track! 💪",
          nt_motivation_general_2:
            "Healthy choices today mean strength tomorrow. Take action!",
          nt_motivation_general_3:
            "Remember to hydrate! Even a small glass of water makes you feel better.",
          nt_motivation_general_4:
            "Daily self-improvement yields results. Great job being here!",
          nt_motivation_general_5:
            "Small, consistent efforts always win over quick, chaotic jumps. Stay steady!",
          nt_motivation_general_6:
            "Remember: your goal is a marathon, not a sprint. The main thing is not to stop!",

          nt_motivation_no_meals:
            "Looks like you haven't logged anything today. Let's start with a nutritious breakfast!",

          nt_motivation_calories_on_target:
            "🎉 Great job! You fit perfectly within your calorie limit. A true champion!",
          nt_motivation_calories_on_target_M:
            "🎉 Great job! You fitted perfectly within your calorie limit, Champion!",
          nt_motivation_calories_on_target_F:
            "🎉 Great job! You fitted perfectly within your calorie limit, Queen!",

          nt_motivation_calories_over:
            "Careful! You've consumed {{calories}} kcal so far (which is above target). Focus on your last meal.",
          nt_motivation_calories_critical_over:
            "🔴 Critical! {{calories}} kcal is a significant overshoot. Focus on light protein and fiber today.",

          nt_motivation_almost_protein:
            "You've almost reached your protein goal! A little more and your muscles will thank you!",
          nt_motivation_almost_protein_M:
            "You've almost reached your protein goal! Keep pushing, man!",
          nt_motivation_almost_protein_F:
            "You've almost reached your protein goal! That's excellent progress!",

          nt_motivation_low_protein:
            "You're a bit low on protein today. Try adding yogurt or nuts to your next snack. Need {{protein}}g more!",
          nt_motivation_high_fat:
            "I see a lot of fat in your diet. Maybe replace one snack with fruit or vegetables? 🥑",
          nt_motivation_low_carbs:
            "Feeling tired after lunch? It might be due to low carbs. Try adding whole grains to dinner.",
          nt_motivation_evening_low:
            "You're doing great! Focus on light food for dinner to perfectly hit your remaining calories.",

          nt_motivation_morning:
            "Good morning! Start this day with the right breakfast and a positive mood 🌞",
          nt_motivation_morning_M:
            "Good morning, warrior! Start this day with the right breakfast for energy. 🌞",
          nt_motivation_morning_F:
            "Good morning, beautiful! Start this day with the right breakfast for energy. 🌞",
          nt_motivation_evening:
            "Great day! Remember that quality rest is part of your nutrition plan.",

          // --- Social challenges translations ---
          ch_all_challenges_title: "All Challenges",
          ch_details_link: "Details",
          ch_no_challenges_message: "There are no challenges yet.",
          ch_loading: "Loading...",
          ch_error_loading: "Failed to load challenges.",
          ch_details_error_loading: "Failed to load challenge details.",
          ch_not_found: "Challenge not found.",
          ch_join: "Join",
          ch_edit: "Edit",
          ch_delete: "Delete",
          ch_back: "Back",
          ch_start_date: "Start Date",
          ch_end_date: "End Date",
          ch_type: "Type",
          ch_type_individual: "Individual",
          ch_type_group: "Group",
          ch_creator: "Creator",
          ch_participants: "Participants",
          ch_add_challenge_button: "Add Challenge",
          ch_create_first_link: "Create the first challenge",
          ch_create_title: "Create a New Challenge",
          ch_name: "Name",
          ch_description: "Description",
          ch_create_submit: "Create",
          ch_creating: "Creating...",
          ch_create_success: "Challenge successfully created!",
          ch_create_error: "Failed to create challenge.",
          ch_confirmJoinTitle: "Confirm Joining Challenge",
          ch_confirmJoinText: "Are you sure you want to join this challenge?",
          yes: "Yes",
          no: "No",
          ch_confirmDeleteTitle: "Confirm Deleting Challenge",
          ch_confirmDeleteText:
            "Are you sure you want to delete this challenge? This action cannot be undone.",
          ch_joinedTitle: "Success!",
          ch_joinedText: "You have successfully joined the challenge.",
          ok: "OK",
          ch_deletedTitle: "Challenge Deleted",
          ch_deletedText: "The challenge has been successfully deleted.",
          ch_errorTitle: "Error",
          ch_errorText: "An error occurred. Please try again later.",
          ch_edit_title: "Edit Challenge",
          ch_type_competition: "Competition",
          ch_type_personal: "Personal Goal",
          ch_save: "Save",
          ch_saving: "Saving...",
          ch_edit_success: "Challenge successfully updated!",
          ch_edit_success_title: "Success!",
          ch_edit_error: "Failed to update challenge. Please try again.",
          ch_leave: "Leave",
          ch_complete: "Complete",
          ch_confirmLeaveTitle: "Confirm Leaving Challenge",
          ch_confirmLeaveText: "Are you sure you want to leave this challenge?",
          ch_leftTitle: "Challenge Left",
          ch_leftText: "You have successfully left the challenge.",
          ch_completedTitle: "Challenge Completed",
          ch_completedText:
            "Congratulations! You have completed the challenge.",
          ch_type_personalgoal: "Personal Goal",

          // --- Menstrual calendar translations ---
          m_long: "Duration of menstruation (days)",
          c_long_wh: "Cycle length",
          menstruation_calendar: "Menstrual calendar",
          male: "Male",
          female: "Female",
          gender: "Health by gender",
          female_health: "Women's health",
          female_health_fine:
            "Women's health without taboos - honestly, simply, and with care for you.",
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
          examination_important:
            "Why is it important to monitor hormone levels",
          find_doctor: "Find a doctor near you",
          your_cycle: "Your cycle",
          cycle_control:
            "Track your cycle, monitor your well-being and receive timely reminders",
          calendar_cycle: "Menstrual calendar",
          calc_cycle: "Calculate my menstrual calendar",
          warning_calc:
            "*Our menstrual calendar calculations may not be 100% accurate because every body and every cycle is different. Help us make your calendar more accurate.",
          cycle: "Cycle",
          why_should_calendar: "Why keep a menstrual calendar?",
          preview_calendar:
            "Keeping a menstrual calendar isn't just about remembering «those days». It's a little self-care ritual that helps you better understand your body and mood.",
          predict_cycle: "Predict the cycle",
          predict_cycle_desc:
            "You always know when your period and ovulation will start. This helps plan events, vacations, or important meetings.",
          listen_yourself: "Listen to yourself",
          listen_yourself_desc:
            "The calendar helps you notice how your energy, mood, and appetite change in different phases of the cycle.",
          regularity: "Detect regularity",
          regularity_desc:
            "Pain, PMS, mood swings, or skin changes become more noticeable. It's easy to track what repeats and what helps you feel better.",
          doctor_help: "Helps the doctor",
          doctor_help_desc:
            "If you need to see a gynecologist, accurate records of your cycle and symptoms make the consultation more effective.",
          planing: "Health and fitness planning",
          planing_desc:
            "You can adjust workouts, nutrition, or rest to your rhythm to get the most benefit.",
          finalize_calendar:
            "A period calendar is not an obligation, but a tool for self-awareness. It helps you feel more confident, predict mood changes, and simply care for yourself.",
          phase: "Phases of the menstrual cycle",
          proccess_in_body: "What happens in a woman's body",
          proccess_in_body_desc:
            "The menstrual cycle is not just 'those days'. It is a natural rhythm that helps the body function harmoniously. It is divided into several phases, each affecting our well-being, mood, and energy.",
          phase_1_5: "Menstrual phase\n(1 — 5)",
          phase_1_5_desc:
            "This is the start of the cycle. The body sheds the old uterine lining, which causes menstrual bleeding. Energy may be lower during this time, so it's good to allow yourself extra rest.",
          phase_6_13: "Follicular phase\n(6 — 13)",
          phase_6_13_desc:
            "Estrogen gradually rises, bringing back strength and motivation. This is a great period for new ideas, active work, and sports.",
          phase_14_16: "Ovulatory phase\n(14 — 16)",
          phase_14_16_desc:
            "A mature egg is released. Women may feel confident, attractive, and full of energy. These are the 'peak' days when the body is ready for conception.",
          phase_17_28: "Luteal phase\n(17 — 28)",
          phase_17_28_desc:
            "If pregnancy does not occur, progesterone becomes dominant. Sleepiness, mood changes, and cravings for sweets may appear. It's important to listen to yourself, rest more, and take care of emotional comfort during this time.",
          finalize_cycle:
            "The menstrual cycle is not the enemy, but a natural calendar of our body. By paying attention to its phases, you can better plan your day, understand mood changes, and be more in harmony with yourself.",
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
          one: "day",
          other: "days",
          c_long: "Your cycle lasted {{cLong}} days. Which is normal!",
          phase_1:
            "You are currently in your menstrual phase!\nThis is the beginning of your cycle.\nYou may feel low on energy!\nIt is best to take care of yourself and rest during this time!",
          phase_2:
            "You are now in the follicular phase!\nThe hormone estrogen is actively increasing.\nYour mood is improving. Your skin is improving!\nYou are ready to conquer the whole world!",
          phase_3:
            "You are now in the ovulatory phase!\nA mature egg is being released.\nYou feel confident and full of energy!\nToday is a great day to do what brings you joy!",
          phase_4:
            "You are now in the luteal phase!\nProgesterone begins to dominate!\nDuring this period, you may experience mood swings and drowsiness!\nTake care of your comfort and listen to your feelings!",
          super: "Super!",
          gynecology_sub:
            "Everything about regular check-ups, prevention, and caring for women's health — in simple language without taboos.",
          womens_tests: "Examinations and tests",
          regular_review: "Regular check-ups",
          articles_: "Articles",
          read: "Read",
          how_often: "How often should\nyou visit\na gynecologist?",
          top_5_tests: "TOP 5 tests for\nwomen's health",
          review_sub:
            "Taking care of your health starts with prevention. Once a year, you're one step ahead of the problem.",
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
          examination_desc:
            "The right tests on time are the key to health confidence. Find out which tests and examinations you should have regularly.",
          base_review: "Basic examination",
          gynecology_examination: "Gynecological examination",
          add_to_calendar: "Add to calendar",
          ultrasound_glands: "Breast ultrasound",
          need_I_test: "Do I need to do tests if I feel well?",
          examination_tip_need:
            "Regular medical check-ups are important even when you have no complaints. Many diseases develop silently in their early stages, and timely basic tests (blood, urine, blood sugar, cholesterol) help detect problems before symptoms appear.\n\nAnnual check-ups are an investment in your health. They allow you to monitor your body, adjust your diet and lifestyle, and prevent complications.\n\nFeeling well is great, but prevention is always easier and cheaper than treatment.",
          what_needed_blood: "What should I prepare before a blood test?",
          what_needed_blood_info:
            "To get accurate blood test results, prepare in advance:\n\nFast before the test, your last meal should be 8–12 hours prior\n\nDrink only plain water, it does not affect results\n\nAvoid alcohol, fatty and very sweet foods for a day or two before\n\nOn the day of the test avoid intense physical activity and stress\n\nIf you take medications, be sure to inform your doctor",
          what_diff_ultrasound_mam:
            "What is the difference between ultrasound and mammography?",
          what_diff_ultrasound_mam_info:
            "Ultrasound uses sound waves to visualize tissues and shows soft structures of the breast well, especially in young women with dense tissue\n\nMammography is an X-ray examination that can detect small calcifications and early signs of tumors before lumps appear\n\nUltrasound does not use radiation and is suitable for additional control\nMammography remains the main screening method for women over 40\n\nBoth methods are often used together for more accurate diagnosis",
          why_pap_test: "Why get a Pap smear and how often?",
          why_pap_test_info:
            "A Pap smear helps detect changes in cervical cells at early stages when there are no symptoms\n\nRegular screening prevents the development of cancer and allows timely treatment of inflammatory processes\n\nUsually a Pap test is done once a year if there are no problems or more often as recommended by a doctor\n\nThe test is quick, painless, and takes only a few minutes\n\nEven if you feel well, the test helps take care of your health",
          reproductive: "Reproductive health",
          reproductive_sub:
            "Plan with us! Take care of your body and plan for the future with confidence.",
          myth_main: "There are plenty of myths around periods.",
          myth_sub: "Here's a little selection for you)",
          cant_sport: "You can't exercise during your period",
          cant_sport_desc:
            "In fact, light physical activity such as yoga, walking, or even moderate workouts can ease cramps and improve mood.",
          c_long_: "The cycle always lasts exactly 28 days",
          c_long_desc:
            "Everyone's cycle is individual: an interval of about 21 to 35 days is considered normal.",
          cant_swim: "You can't bathe or swim during your period",
          cant_swim_desc:
            "Bathing and showering are safe. Hygiene products (tampons, menstrual cups) let you swim comfortably and stay clean.",
          cant_get_pregnant: "You can't get pregnant during your period",
          cant_get_pregnant_desc:
            "The chance is lower but not zero: sperm can survive in the body for several days, and ovulation may occur earlier or later than expected.",
          pain_is_ok: "Menstrual pain is always normal",
          pain_is_ok_desc:
            "Mild discomfort is typical, but severe or debilitating pain may indicate endometriosis or other conditions and should be checked by a doctor.",
          calendar: "Calendar",
          calendar_info: "Your best calendar",
          create_event: "Create",
          // --- Mental Health translations ---
          your: "Your Health",
          breathing: "Breathing Practices",
          diaphragmatic: "Diaphragmatic Breathing",
          square: "Box Breathing",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "State Test",
          articles: "Useful Articles",

          // --- Health menu translations ---
          hmp_your_health: "Your Health",
          hmp_mental_health: "Mental Health",

          // --- Mental health translations ---
          mp_aew_notes: "Note",
          mp_aew_describe_your_feelings:
            "Describe your feelings in more detail...",
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
          mp_aew_wizard_description_step_3:
            "Your note is private and visible only to you.",
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
          mp_bpp_description_1:
            "Simple breathing exercises help relieve tension, restore energy, and bring back mental clarity. You can start anywhere: at home, at work, or even on the go.",
          mp_bpp_description_2:
            "Try it — and feel your body relax and your mood lighten.",
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
          mp_dbp_description_1_1:
            "Sit comfortably. Relax your shoulders. Perform for at least 3 - 5 minutes.",
          mp_dbp_description_1_2: "Return to breathing when you feel tension.",
          mp_dbp_inhale: "INHALE",
          mp_dbp_hold: "HOLD",
          mp_dbp_exhale: "EXHALE",
          mp_dbp_come_on_more: "COME ON MORE",
          mp_ebp_title: "Emotion Journal",
          mp_ebp_factor_title: "Mood Factors",
          mp_ebp_factor_info_p_1: "All factors are your potential triggers.",
          mp_ebp_factor_info_p_2:
            "For example, you might not notice that sports, coffee, or drugs affect your mood and form behavioral patterns.",
          mp_ebp_factor_info_p_3:
            "You can track the influence of factors on your well-being later in the analytics section.",
          mp_ebp_factor_info_p_4: "Example",
          mp_ebp_factor_info_p_5: "Nutrition and Stimulants:",
          mp_ebp_factor_info_p_6:
            "Record your consumption of coffee, vitamins, or foods that may affect your energy levels.",
          mp_ebp_factor_info_p_7: "Activity and Physical Exercise:",
          mp_ebp_factor_info_p_8:
            "Track the amount of physical exercise or participation in other forms of physical activity.",
          mp_ebp_factor_info_p_9: "Biological Cycles:",
          mp_ebp_factor_info_p_10:
            "By tracking your periods, you can understand how they affect your emotional well-being.",
          mp_ebp_selected_factors: "Selected factors:",
          mp_ebp_available_factors: "Available factors:",
          mp_ebp_hello_how_are_you: "Hello! How are you?",
          mp_ebp_factor: "Factors",
          mp_ebp_add_factor: "Add factor",
          mp_mhp_title: "Your calm starts here.",
          mp_mhp_sub_title:
            "We've gathered tools to help you stay balanced even on the most stressful days.",
          mp_mhp_test_card_title: "State Tests",
          mp_mhp_test_card_btn_text: "Take the test",
          mp_mhp_breathing_card_title: "Breathing Practices",
          mp_mhp_breathing_card_btn_text: "Choose a practice",
          mp_mhp_articles_card_title: "Useful Articles",
          mp_mhp_articles_card_btn_text: "View articles",
          mp_mhp_choose_specialist: "Choose a specialist",
          mp_mtp_test_data_question_1: "How do you wake up in the morning?",
          mp_mtp_test_data_answers_1_1: "With enthusiasm and plans",
          mp_mtp_test_data_answers_1_2:
            "With a glass of water and a heavy sigh",
          mp_mtp_test_data_answers_1_3: '"This day again?"',
          mp_mtp_test_data_question_2:
            "When something goes wrong, your reaction is:",
          mp_mtp_test_data_answers_2_1: "Ok, I'll figure out how to fix it",
          mp_mtp_test_data_answers_2_2: "Well, that's life",
          mp_mtp_test_data_answers_2_3:
            "Everything is lost, I'm going into my blanket",
          mp_mtp_test_data_question_3: "What saves you from stress most often?",
          mp_mtp_test_data_answers_3_1: "Sports or a walk",
          mp_mtp_test_data_answers_3_2: "Food, series, or memes",
          mp_mtp_test_data_answers_3_3: "I just zone out without energy",
          mp_mtp_test_data_question_4: "Your feeling of energy lately:",
          mp_mtp_test_data_answers_4_1: "Normal, charge holds up",
          mp_mtp_test_data_answers_4_2: "Like a battery at 30%",
          mp_mtp_test_data_answers_4_3:
            "Like a phone shutting down in the cold",
          mp_mtp_test_data_question_5:
            'What do you think when you hear the word "rest"?',
          mp_mtp_test_data_answers_5_1: "Planning something nice",
          mp_mtp_test_data_answers_5_2: "Lying at home and doing nothing",
          mp_mtp_test_data_answers_5_3: "I don't have time to rest",
          mp_mtp_test_result_title_1: "Your mental state is fine.",
          mp_mtp_test_result_description_1:
            "You have a great level of energy and optimism. Keep taking care of yourself and maintaining this state!",
          mp_mtp_test_result_title_2: "Mental state mostly fine.",
          mp_mtp_test_result_description_2:
            "Most things are going well, but some areas need a little more attention and care.",
          mp_mtp_test_result_title_3: "Mental state is a bit exhausted",
          mp_mtp_test_result_description_3:
            "You feel a little tired. Find time for rest and little joys.",
          mp_mtp_test_result_title_4: "Mental state asks for care",
          mp_mtp_test_result_description_4:
            "You need more rest, joy, and support. Pay attention to your needs.",
          mp_mtp_test_result_title_5: "Mental state screams SOS",
          mp_mtp_test_result_description_5:
            "You might be experiencing burnout. Don't be shy to ask for help and find time for serious rest.",
          mp_mtp_test_result_title_6:
            "Your mental state is like a roller coaster.",
          mp_mtp_test_result_description_6:
            "Your state changes often. Some days are great, others are more difficult. Try to find balance.",
          mp_mtp_start_message:
            "Attention! The test is not diagnostic, but shows your level of stress or burnout.",
          mp_mtp_test_title: "Test on the state of your mental health",
          mp_mtp_test_description: "Tap the answers that match your state)",
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "Breathing that balances energy",
          mp_nsp_description_1:
            "Alternate nostril breathing technique to harmonize mind and body.",
          mp_nsp_description_2:
            "Perform for 3-5 minutes to achieve the effect.",
          mp_nsp_technique_title: "Technique:",
          mp_nsp_technique_step_1: "Sit comfortably, straighten your back.",
          mp_nsp_technique_step_2:
            "With your hand, close your right nostril, inhale through the left.",
          mp_nsp_technique_step_3:
            "Then close the left — exhale through the right.",
          mp_nsp_technique_step_4:
            "Inhale through the right — exhale through the left.",
          mp_nsp_technique_step_5: "Continue for a few minutes at a calm pace.",
          mp_nsp_result_title: "Result:",
          mp_nsp_result_description_1:
            "After just a few minutes, a feeling of calm appears. The level of tension decreases. The mind clears, as if after a short rest.",
          mp_nsp_result_description_2:
            "Regular practice helps you fall asleep better, concentrate, and maintain inner balance even in stressful situations.",
          mp_sbp_title: "Box Breathing",
          mp_sbp_subtitle: "Breathing that brings back calm",
          mp_sbp_description_1:
            "Sit comfortably. Relax your shoulders. Perform for at least 3 - 5 minutes.",
          mp_sbp_description_2: "Return to breathing when you feel tension.",

          // --- Your Health translations ---
          mp_yhp_main_title: "Your Health —",
          mp_yhp_main_subtitle: "Your superpower. It stands on 3 pillars:",
          mp_yhp_activity_title: "Activity",
          mp_yhp_activity_description_1:
            "Even 15 minutes a day makes a difference.",
          mp_yhp_activity_description_2:
            "Walking, jump rope, pilates – choose what you like, and your body will say 'thank you'.",
          mp_yhp_sleep_title: "Sleep",
          mp_yhp_sleep_description_1:
            "This is the most important thing of all!",
          mp_yhp_sleep_description_2:
            "Sleep is not laziness, but your internal charging cable. 7-8 hours of quality rest helps the body recover and the brain to work quickly and creatively.",
          mp_yhp_nutrition_title: "Nutrition",
          mp_yhp_nutrition_description_1:
            "Food is fuel. The higher its quality, the better your 'engine' works.",
          mp_yhp_nutrition_description_2:
            "Not about diets, but about balance: more vegetables, less stress about snacks.",

          // --- Male Health translations ---
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
          mp_reproductive_block_content_value_1:
            "sperm quality depends on lifestyle",
          mp_reproductive_block_content_label_2: "Risks",
          mp_reproductive_block_content_value_2:
            "overheating, alcohol, smoking, obesity",
          mp_reproductive_block_content_label_3: "Recommendations",
          mp_reproductive_block_content_value_3:
            "Urologist once a year, spermogram",
          mp_urinary_block_title: "Urinary system",
          mp_urinary_block_content_label_1: "Prostate check",
          mp_urinary_block_content_value_1:
            "from 40 years — PSA and ultrasound yearly",
          mp_urinary_block_content_label_2: "Warning!",
          mp_urinary_block_content_value_2:
            "pain, blood in urine, frequent urination",
          mp_urinary_block_content_label_3: "What to do?",
          mp_urinary_block_content_value_3:
            "don't ignore discomfort, go to urologist",
          mp_potency_block_title: "Potency",
          mp_potency_block_content_label_1: "Why does it decrease?",
          mp_potency_block_content_value_1:
            "stress, alcohol, smoking, heart disease",
          mp_potency_block_content_label_2: "How to maintain?",
          mp_potency_block_content_value_2:
            "sports, quality sleep, balanced diet",
          mp_potency_block_content_label_3: "When to see a doctor?",
          mp_potency_block_content_value_3:
            "if problems last more than 2 months",
          mp_subtitle_2: "Take care of yourself like your favorite car",
          mp_form_subtitle:
            "Fill in the fields if you have current data, and we will create a chart",
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
          mp_diagram_hormons_value_not_found:
            "Hormone data not found. Please enter your indicators.",
          mp_diagram_hormons_data_not_found:
            "Error loading data. Please contact support.",
          mp_diagram_low: "Low",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "High",

          before_5: "In 5 minutes",
          before_10: "In 10 minutes",
          sign_for_doctor: "Doctor appointment",
          sure_to_delete_event: "Are you sure you want to delete the event?",
          notification: "Reminder",
          task: "Task",
          meeting: "Meeting",
          choose_date: "Choose a date",
          choose_time: "Choose a time",
          choose_end_time: "Choose end time",
          my_tasks: "My tasks",
          invite_friend: "Invite a friend",
          link: "Link",
          add_title: "Add a title",
          go_to_main_page: "HOME",

          // === Premium ===
          sp_you_already_have_active_subscription: "You already have an active subscription",
          sp_please_login: "Please log in",
          sp_active: "Active",
          sp_expired: "Expired",
          sp_cancelled: "Cancelled",
          sp_basic_title: "Basic",
          sp_duration: "/ 30 days",
          sp_basic_features_1: "Trackers",
          sp_basic_features_2: "Basic analytics",
          sp_premium_title: "Premium",
          sp_premium_features_1: "Courses",
          sp_premium_features_2: "Personalized plans",
          sp_family_title: "Family",
          sp_family_features_1: "All Premium features",
          sp_family_features_2: "Access for up to 3 users",
          sp_loading: "Loading...",
          sp_subscription_title: "Invest in yourself",
          sp_subscription_sub_title: "Your best project is you. Let’s make it happen together.",
          sp_subscription_history_label: "Subscription history",
          sp_subscription_history_loading: "Loading history...",
          sp_subscription_history_price: "Free",
          sp_subscription_family_title: "Added users",
          sp_subscription_family_date: "added",
          sp_subscription_history_empty: "You don't have any subscription history yet",
          sc_processing: "Processing...",
          sc_select: "Select",

          // === Subscription Payment ===
          spp_please_input_correct_email: "Please enter valid email addresses",
          spp_uncnown_subsription_type: "Unknown subscription type. Please try again.",
          spp_family_sub: "Family subscription",
          spp_add_email_addresses_of_family_members: "Add email addresses of family members (up to 3 people)",
          spp_go_to_payment: "Go to payment",

          // === Subscription Details ===
          sdp_already_have_active_sub: "already has an active subscription",
          sdp_already_a_member_of_another_family_subscription: "is already a member of another family subscription",
          sdp_this_is_the_subscription_owner: "this is the subscription owner",
          sdp_user_not_found: "User not found",
          sdp_some_users_could_not_be_added: "Some users could not be added",
          sdp_family_member_list_successfully_updated: "Family member list successfully updated!",
          sdp_error_updating_family_users: "Error updating family users: ",
          sdp_subscription_not_found: "Subscription not found",
          sdp_return_to_tariffs: "Return to plans",
          sdp_your_current_subscription: "Your current subscription",
          sdp_subscription_type: "Subscription type",
          sdp_subscription_status: "Status",
          sdp_subscription_start_date: "Start date",
          sdp_subscription_end_date: "Valid until",
          sdp_subscription_price: "Price",
          sdp_subscription_section_content: "Family access",
          sdp_subscription_detail_label: "Access type",
          sdp_subscription_detail_value: "Family member",
          sdp_subscription_section_content_title: "Family members",
          sdp_subscription_member_added: "Added",
          sdp_subscription_renew_btn: "Renew subscription",
          sdp_subscription_manage_family_btn: "Manage family members",
          sdp_family_modal_instruction: "Add or remove family member email addresses",
          sdp_sub_saving: "Saving...",
          sdp_family_member_email: "Family member email",
          payment: "Payment",
          details: "Details",

          // === Success Payment ===
          ps_payment_success_main_title: "YAY",
          ps_payment_success_title: "PAYMENT SUCCESSFUL",
          ps_payment_success_description: "The payment receipt has been sent to your email",
          ps_payment_success_btn: "Go to home",

          // Marketplace
          sport_eating: "Sports Nutrition",
          sport_cloth: "Sportswear",
          sport_gadgets: "Gadgets",
          sport_other: "Other",
          marketplace_filter: "Filter",
          brand: "Brand",
          from: "From",
          to: "To",
          one_thing: "pcs",
          put_in_cart: "Add to Cart",
          already_in_cart: "Already in Cart",
          similar_products: "Similar Products",
          basket_marketplace: "Basket",
          sure_to_delete_product_from_cart: "Are you sure you want to remove this product from the cart?",
          product: "Product",
          amount_marketplace: "Quantity",
          my_order: "My Order",
          marketplace_total: "Total",
          order_details: "Details",
          to_payment: "To Payment",
          order_sum: "Amount",
          delivery: "Delivery",
          post_index: "Postal Code",
          shopping_cart: "Shopping cart",

        },
      },
      uk: {
        translation: {
          // === ОСНОВНІ ПЕРЕКЛАДИ ПЛАТФОРМИ ===
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
            "Відстежуй харчування й тренування, слідкуй за здоров'ям і отримуй підтримку спеціалістів.",
          description_part3:
            "Знаходь корисні товари та ділися мотивацією зі спільнотою.",
          description_part4:
            "Разом із Nomyfy ти крок за кроком формуєш здорові звички та почуваєшся краще щодня.",

          // === СЕКЦІЯ ФАХІВЦІВ ===
          specialist_title_line1: "ТВІЙ ТАЛАНТ ТУТ ПОТРІБЕН!",
          specialist_title_line2: "МИ ШУКАЄМО ПРОФІ ЯК ТИ!",
          specialist_text_line1:
            "Якщо ти спеціаліст в психології, нутриціології або ти тренер,",
          specialist_text_line2:
            "давай робити цей світ краще. Працювати з професіоналами.",
          specialist_text_line3: "Тобі до нас!",
          become_specialist: "Стати фахівцем",

          // === МАРКЕТПЛЕЙС ===
          marketplace_title: "МАРКЕТПЛЕЙС ЗДОРОВИХ РІШЕНЬ.",
          marketplace_subtitle:
            "Все, що допомагає здорово жити зібрали в одному місці.",
          marketplace_button: "Маркетплейс",

          // === FAQ ===
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

          // === ФУТЕР ===
          specialists: "Фахівці",
          privacy_policy: "Політика конфіденційності",
          support_service: "Служба підтримки",
          copyright: "© Nomyfy {{year}}.",

          // === ВХІД ===
          login1: "ВХІД",
          password: "пароль",
          forgot_password: "забули пароль?",
          login2: "Увійти",
          no_profile: "Немає профілю? ",
          register2: "Реєстрація",

          // === РЕЄСТРАЦІЯ ===
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

          // === ВІДНОВЛЕННЯ ПАРОЛЮ ===
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

          // === МЕНЮ ===
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
          // === ВІДЖЕТИ ДАШБОРДУ ===

          kkal: "Калорії",
          current_week: "Поточний тиждень",
          water: "Вода",
          L: "Л",
          sleep: "Сон",
          H: "Г",
          bmi: "ІМТ",
          bmi_requires: "Заповніть інформацію щодо зросту та ваги",

          // === ПРОФІЛЬ КОРИСТУВАЧА ===
          p_error_upadate:
            "Не вдалося оновити профіль. Будь ласка, заповніть усі поля.",
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
          p_specialist_profile: "Профіль спеціаліста",
          specialist_profile: "Профіль спеціаліста",
          specialist_type: "Тип спеціаліста",
          user_name: "Ім'я користувача",
          back_to_profile: "Повернутися до профілю",
          specialist_profile_description: "Це сторінка вашого профілю спеціаліста, де ви можете керувати своєю професійною інформацією.",
          
          // Specialist Profile Page
          sp_hourly_rate: "Погодинна ставка",
          sp_experience: "Досвід (роки)",
          sp_biography: "Біографія",
          sp_website: "Вебсайт спеціаліста",
          sp_instagram: "Instagram",
          sp_license_number: "Номер ліцензії",
          sp_work_format: "Формат роботи",
          sp_work_format_add: "Додати формат",
          sp_work_format_placeholder: "Введіть формат роботи",
          sp_work_format_empty: "Формати роботи не додано",
          sp_skills: "Навички",
          sp_add_skill: "Додати навичку",
          sp_certificates: "Сертифікати",
          sp_add_certificate: "Додати сертифікат",
          sp_save: "Зберегти",
          sp_saving: "Збереження...",
          sp_profile_toggle: "Профіль спеціаліста",
          sp_save_success: "Дані успішно збережено!",
          sp_save_error: "Помилка збереження даних:",
          sp_hourly_rate_placeholder: "Введіть погодинну ставку",
          sp_experience_placeholder: "Введіть роки досвіду",
          sp_biography_placeholder: "Розкажіть про себе...",
          sp_website_placeholder: "Введіть URL вебсайту",
          sp_instagram_placeholder: "Введіть ім'я користувача Instagram",
          sp_license_number_placeholder: "Введіть номер ліцензії",
          sp_certificate_placeholder: "Введіть назву сертифіката",
          sp_add_skill_placeholder: "Додати скіл...",
          sp_add_button: "Додати",
          sp_cancel_button: "Скасувати",
          
          // Validation error messages
          validation_hourly_rate_invalid_number: "Будь ласка, введіть валідне число",
          validation_hourly_rate_negative: "Погодинна ставка не може бути від'ємною",
          validation_hourly_rate_too_high: "Погодинна ставка занадто висока",
          validation_experience_invalid_number: "Будь ласка, введіть валідне число",
          validation_experience_negative: "Досвід не може бути від'ємним",
          validation_experience_too_high: "Досвід не може перевищувати 100 років",
          validation_biography_too_long: "Біографія не може перевищувати 1000 символів",
          validation_email_invalid_format: "Будь ласка, введіть валідну адресу електронної пошти",
          validation_email_too_long: "Адреса електронної пошти занадто довга",
          validation_phone_invalid_format: "Будь ласка, введіть валідний номер телефону",
          validation_phone_too_long: "Номер телефону занадто довгий",
          validation_phone_too_short: "Номер телефону занадто короткий",
          validation_website_invalid_format: "Будь ласка, введіть валідний URL вебсайту",
          validation_website_too_long: "URL вебсайту занадто довгий",
          validation_license_number_invalid_format: "Будь ласка, введіть валідний номер ліцензії",
          validation_license_number_too_long: "Номер ліцензії занадто довгий",
          
          // Skills translations
          skill_powerlifting: "Пауерліфтинг",
          skill_strength_training: "Силовий тренінг",
          skill_nutrition_correction: "Корекція харчування",
          skill_stretching: "Стретчинг",
          skill_cardio_training: "Кардіо-тренування",
          skill_children_fitness: "Фітнес для дітей",
          skill_rehabilitation_exercises: "Реабілітаційні вправи",
          skill_client_motivation: "Мотивація клієнтів",
          skill_individual_programs: "Індивідуальні програми",
          skill_group_classes: "Групові заняття",
          
          // Work Format Templates
          work_format_online_telegram: "Онлайн супровід у Telegram",
          work_format_offline_gym: "Офлайн тренування в залі (за домовленістю)",
          work_format_weekly_plan: "Щотижневі корекції плану",
          work_format_online_zoom: "Онлайн консультації через Zoom",
          work_format_office_sessions: "Очні сесії в кабінеті (за домовленістю)",
          work_format_therapy_plans: "Щотижневі терапевтичні плани",
          work_format_clinic_visits: "Очні прийоми в клініці (за домовленістю)",
          work_format_prevention_plans: "Плани профілактики та лікування",
          work_format_nutrition_plan: "Щотижневі корекції плану харчування",
          
          upload_photo: "Завантажити фото",
          uploading: "Завантаження...",
          download: "Завантажити",
          remove: "Видалити",

          p_profile_incomplete_alert: "Будь ласка, заповніть профіль користувача",


          // === КАЛЕНДАР (ДЕНЬ НАРОДЖЕННЯ) ===
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

          // === КРАЇНИ ===
          p_ukrain_country: "Україна",
          p_great_britain_country: "Велика Британія",
          p_germany_country: "Німеччина",
          p_france_country: "Франція",
          p_spain_country: "Іспанія",
          p_usa_country: "США",

          // === ПОСИЛАННЯ ===
          diary: "Щоденник емоцій",
          article_1: "10 простих технік зняття стресу",
          article_2: "Ефективні методи боротьби з тривогою",
          article_3: "Дихальні техніки для релаксації",
          article_4: "Взаємозв'язок сну та психічного здоров'я",
          article_5: "Основи медитації для новачків",
          article_6: "Стратегії покращення самооцінки",
          article_7: "Профілактика та подолання вигорання",

          // === Сторінка харчування ===
          nt_tracker_tab: "Трекер харчування",
          nt_recipes_tab: "Рецепти",
          nt_date_label: "Дата",
          nt_calories_label: "Калорії",
          nt_kcal_abbr: "ккал",
          nt_protein_label: "Білки",
          nt_g_abbr: "г",
          nt_meals_title: "Прийоми їжі",
          nt_add_meal_button: "Додати їжу",
          nt_analytics_title: "Аналітика",
          nt_ration_tab: "Раціон",
          nt_loading: "Завантаження...",
          nt_motivation_title: "Мотивація",
          nt_motivation_loading: "Завантаження мотивації...",
          nt_daily_progress: "Щоденний прогрес",
          nt_fat_label: "Жири",
          nt_carbs_label: "Вуглеводи",
          nt_dish_name: "Назва страви",

          nt_k_abbr: "ккал",
          nt_b_abbr: "Б",
          nt_zh_abbr: "Ж",
          nt_v_abbr: "В",

          nt_unspecified_meal_1: "Сніданок",
          nt_unspecified_meal_2: "Обід",
          nt_unspecified_meal_3: "Вечеря",
          nt_unspecified_meal_4: "Перекус",

          loadingRecipe: "Завантаження рецепта...",
          recipeNotFound: "Рецепт не знайдено",
          confirmDeleteRecipe:
            "Ви впевнені, що хочете видалити цей рецепт? Цю дію неможливо скасувати.",
          recipeDeletedSuccess: "✅ Рецепт успішно видалено!",
          deleteRecipeError: "Помилка видалення рецепта",
          recipeInUseError:
            "Неможливо видалити рецепт. Можливо, він використовується в раціоні користувачів.",
          recipeSteps: "Кроки рецепта",
          videoRecipe: "Відео-рецепт",
          clickToWatch: "Натисніть для перегляду",
          backToRecipes: "Назад до рецептів",
          deleting: "Видалення...",
          loadRecipeError: "❌ Помилка завантаження рецепта",
          fillRequiredFields:
            "Будь ласка, заповніть обов'язкові поля (позначені *)",
          addAtLeastOneIngredient: "Додайте хоча б один інгредієнт",
          addAtLeastOneStep: "Додайте хоча б один крок приготування",
          recipeUpdatedSuccess: "✅ Рецепт успішно оновлено!",
          updateRecipeError: "Помилка при оновленні рецепта",
          loadingRecipeForEdit: "Завантаження рецепта для редагування...",
          recipeImage: "Зображення рецепта",
          changeImage: "Змінити зображення",
          clickToUploadImage: "Натисніть для завантаження зображення",
          imageFormats: "PNG, JPG, WEBP до 5MB",
          cookingSteps: "Кроки приготування",
          step: "Крок",
          describeStepPlaceholder: "Опишіть крок приготування...",
          addStep: "Додати крок",
          recipeName: "Назва рецепта",
          description: "Опис",
          cookingTime: "Час приготування",
          cookingTimePlaceholder: "наприклад: 30 хв",
          videoLink: "Посилання на відео",
          ingredientNamePlaceholder: "Назва інгредієнта",
          ingredientAmountPlaceholder: "Кількість",
          addIngredient: "Додати інгредієнт",
          cancel: "Скасувати",
          saving: "Збереження...",
          updateRecipe: "Оновити Рецепт",
          addNewRecipe: "Додати новий рецепт",
          saveRecipe: "Зберегти Рецепт",
          addRecipeError: "Помилка при додаванні рецепта",
          recipeAddedSuccess: "✅ Рецепт успішно додано!",
          error_token_missing: "Токен відсутній",
          error_auth: "Помилка авторизації",
          error_loading_data: "Помилка завантаження даних",
          nt_no_meals_message: "Поки що немає прийомів їжі за цей день.",
          nt_unspecified_dish_name: "Не вказано",
          auth_error: "Помилка авторизації. Будь ласка, увійдіть знову.",
          error_deleting_meal: "Помилка при видаленні прийому їжі",
          breakfast: "Сніданок",
          lunch: "Обід",
          dinner: "Вечеря",
          snack: "Перекус",
          meal: "Прийом їжі",
          nt_add_meal_button_multiline: "Додайте свій\nприйом їжі",
          nt_ingredients_for: "Інгредієнти для",
          nt_ingredients_title_day: "Інгредієнти за день",
          loading_ingredients: "Завантаження інгредієнтів...",
          no_recipe_ingredients:
            "Цей прийом їжі не має детальних інгредієнтів.",
          no_ingredients_today:
            "В раціоні немає рецептів з детальними інгредієнтами.",
          nt_delete_meal_button: "Видалити прийом їжі",
          add_recipe_text: "Додати свій рецепт",
          error_loading_recipes:
            "Помилка завантаження рецептів. Перевірте консоль.",
          loading_text: "Завантаження рецептів...",
          no_recipes_found: "Рецепти не знайдено.",
          add_element: "Додати елемент",
          error_auth_recipes: "Помилка авторизації при завантаженні рецептів.",
          error_no_user:
            "Не вдалося визначити користувача. Будь ласка, авторизуйтесь.",
          error_no_recipe_selected: "Виберіть рецепт.",
          error_invalid_quantity: "Кількість порцій має бути більшою за 0.",
          add_meal_title: "Додати прийом їжі",
          meal_type_label: "Прийом їжі",
          portions_label: "Кількість (порцій)",
          selected_recipe_label: "Вибраний рецепт",
          no_recipe_selected: "Нічого не обрано",
          adding_meal: "Додавання...",
          add_to_ration_button: "Додати до раціону",
          cancel_button: "Скасувати",
          search_recipes_placeholder: "Пошук рецептів...",
          refresh_button: "Оновити",
          loading_recipes: "Завантаження рецептів...",
          calories: "Калорії",
          proteins: "Білки",
          fats: "Жири",
          carbs: "Вуглеводи",
          ingredients: "Інгредієнти",
          editRecipe: "Редагувати рецепт",
          deleteRecipe: "Видалити рецепт",

          weight_analytics: "Аналітика ваги",
          we_no_data_chart: "Немає даних для відображення графіка.",
          we_no_chart_data: "Потрібно щонайменше 2 записи.",
          we_mode_month: "Місяць",
          we_mode_7days: "7 днів",
          we_last_7_days: "Останні 7 днів",

          we_title: "Записати вагу",
          we_current_label: "Поточна вага:",
          we_no_data: "Немає даних",
          we_error_data: "Помилка",
          we_kg_abbr: "кг",
          we_placeholder: "Введіть вагу (кг)",
          we_submitting: "Збереження...",
          we_save_button: "Зберегти",
          we_saved: "Вага збережена!",
          we_error: "Помилка збереження.",

          nt_january: "Січень",
          nt_february: "Лютий",
          nt_march: "Березень",
          nt_april: "Квітень",
          nt_may: "Травень",
          nt_june: "Червень",
          nt_july: "Липень",
          nt_august: "Серпень",
          nt_september: "Вересень",
          nt_october: "Жовтень",
          nt_november: "Листопад",
          nt_december: "Грудень",

          nt_motivation_general_1:
            "Ваше здоров'я - найбільша інвестиція. Продовжуйте, ви на правильному шляху! 💪",
          nt_motivation_general_2:
            "Здорові вибори сьогодні - це сила завтра. Дійте!",
          nt_motivation_general_3:
            "Не забувайте пити воду! Навіть невелика склянка води покращує самопочуття.",
          nt_motivation_general_4:
            "Щоденна робота над собою дає результати. Ви велика молодець, що тут!",
          nt_motivation_general_5:
            "Малі, але регулярні зусилля завжди перемагають швидкі, хаотичні стрибки. Будьте стабільні!",
          nt_motivation_general_6:
            "Пам'ятайте: ваша мета - це марафон, а не спринт. Головне - не зупинятися!",

          nt_motivation_no_meals:
            "Схоже, ви ще нічого не записали сьогодні. Почніть з поживного сніданку!",

          nt_motivation_calories_on_target:
            "🎉 Чудова робота! Ви вклалися в ліміт калорій. Справжній чемпіон!",
          nt_motivation_calories_on_target_M:
            "🎉 Чудова робота! Ви вклалися в ліміт калорій, Чемпіоне!",
          nt_motivation_calories_on_target_F:
            "🎉 Чудова робота! Ви вклалися в ліміт калорій, Королево!",

          nt_motivation_calories_over:
            "Обережно! Ви спожили {{calories}} ккал (це вище за ціль). Зосередьтеся на останньому прийомі їжі.",
          nt_motivation_calories_critical_over:
            "🔴 Критично! {{calories}} ккал - це значний перебій. Зосередьтеся на легкому білку та клітковині сьогодні.",

          nt_motivation_almost_protein:
            "Ви майже досягли мети по білку! Трохи більше - і ваші м'язи скажуть дякую!",
          nt_motivation_almost_protein_M:
            "Ви майже досягли мети по білку! Продовжуйте, чоловіче!",
          nt_motivation_almost_protein_F:
            "Ви майже досягли мети по білку! Це чудовий прогрес!",

          nt_motivation_low_protein:
            "У вас сьогодні трохи замало білку. Спробуйте додати йогурт або горіхи до наступного перекусу. Потрібно ще {{protein}}г!",
          nt_motivation_high_fat:
            "Я бачу багато жирів у вашому раціоні. Можливо, замініть один перекус на фрукти або овочі? 🥑",
          nt_motivation_low_carbs:
            "Відчуваєте втому після обіду? Можливо, це через низькі вуглеводи. Спробуйте додати цільнозернові продукти на вечерю.",
          nt_motivation_evening_low:
            "Ви чудово справляєтеся! Зосередьтеся на легкій їжі на вечерю, щоб ідеально вкластися в залишок калорій.",

          nt_motivation_morning:
            "Доброго ранку! Почніть цей день з правильного сніданку та позитивного настрою 🌞",
          nt_motivation_morning_M:
            "Доброго ранку, воїне! Почніть цей день з правильного сніданку для енергії. 🌞",
          nt_motivation_morning_F:
            "Доброго ранку, красуне! Почніть цей день з правильного сніданку для енергії. 🌞",
          nt_motivation_evening:
            "Чудовий день! Пам'ятайте, що якісний відпочинок - це частина вашого плану харчування.",

          // === СОЦІАЛЬНІ ЧЕЛЕНДЖІ ===
          ch_all_challenges_title: "Усі челенджі",
          ch_details_link: "Детальніше",
          ch_no_challenges_message: "Поки що немає челенджів.",
          ch_loading: "Завантаження...",
          ch_error_loading: "Не вдалося завантажити челенджі.",
          ch_details_error_loading: "Помилка завантаження деталей челенджу.",
          ch_not_found: "Челлендж не знайдено.",
          ch_join: "Приєднатися",
          ch_edit: "Редагувати",
          ch_delete: "Видалити",
          ch_back: "Назад",
          ch_start_date: "Дата початку",
          ch_end_date: "Дата закінчення",
          ch_type: "Тип",
          ch_type_individual: "Індивідуальний",
          ch_type_group: "Груповий",
          ch_creator: "Творець",
          ch_participants: "Учасники",
          ch_add_challenge_button: "Додати челендж",
          ch_create_first_link: "Створити перший челендж",
          ch_create_title: "Створити новий челендж",
          ch_name: "Назва",
          ch_description: "Опис",
          ch_create_submit: "Створити",
          ch_creating: "Створення...",
          ch_create_success: "Челендж успішно створено!",
          ch_create_error: "Не вдалося створити челендж.",
          ch_confirmJoinTitle: "Підтвердіть приєднання до челленджа",
          ch_confirmJoinText:
            "Ви впевнені, що хочете приєднатися до цього челленджа?",
          yes: "Так",
          no: "Ні",
          ch_confirmDeleteTitle: "Підтвердіть видалення челленджа",
          ch_confirmDeleteText:
            "Ви впевнені, що хочете видалити цей челлендж? Цю дію не можна скасувати.",
          ch_joinedTitle: "Успіх!",
          ch_joinedText: "Ви успішно приєдналися до челленджа.",
          ok: "ОК",
          ch_deletedTitle: "Челлендж видалено",
          ch_deletedText: "Челлендж успішно видалено.",
          ch_errorTitle: "Помилка",
          ch_errorText: "Виникла помилка. Будь ласка, спробуйте ще раз.",
          ch_edit_title: "Редагувати челендж",
          ch_type_competition: "Змагання",
          ch_type_personal: "Особиста мета",
          ch_save: "Зберегти",
          ch_saving: "Збереження...",
          ch_edit_success: "Челендж успішно оновлено!",
          ch_edit_success_title: "Успіх!",
          ch_edit_error: "Не вдалося оновити челендж. Спробуйте ще раз.",
          ch_leave: "Покинути",
          ch_complete: "Завершити",
          ch_confirmLeaveTitle: "Підтвердіть вихід з челенджу",
          ch_confirmLeaveText: "Ви впевнені, що хочете покинути цей челендж?",
          ch_leftTitle: "Челендж покинуто",
          ch_leftText: "Ви успішно покинули челендж.",
          ch_completedTitle: "Челендж завершено",
          ch_completedText: "Вітаємо! Ви успішно завершили челендж.",
          ch_type_personalgoal: "Особиста ціль",

          // === КАЛЕНДАР МІСЯЧНИХ ===
          last_cycle_first_day: "1-й день останнього циклу",
          menstruation_calendar: "Календар місячних",
          male: "Чоловік",
          female: "Жінка",
          gender: "Здоров'я за статтю",

          // --- Переклади для Спеціалістів
          filter_speciality: "Спеціалізація",
          filter_mode: "Онлайн/офлайн",
          filter_experience: "Досвід",
          filter_price: "Ціна",

          spec_psychologist: "Психолог",
          spec_doctor: "Лікар",
          spec_trainer: "Тренер",
          spec_dietitian: "Дієтолог",

          mode_online: "Тільки онлайн",
          mode_offline: "Тільки офлайн",
          mode_hybrid: "Онлайн / офлайн",
          select_city: "Локації",

          experience_1: "До 1 року",
          experience_3: "Від 3 років",
          experience_5: "Від 5 років",
          experience_10: "Від 10 років",

          // price_100: "від 100 грн/год",
          // price_200: "від 200 грн/год",
          // price_500: "від 500 грн/год",
          // price_1000: "від 1000 грн/год",

          price_50: "до 50 $/год",
          price_75: "від 50 до 75 $/год",
          price_100: "від 75 до 100 $/год",
          price_150: "від 100 до 150 $/год",
          hourly_rate_title: "$/год",

          clear_option: "Очистити",
          clear_filter:"Очистити філтр",
          unknown_specialist: "Невідомий спеціаліст",
          top_5: "ТОП - 5",
          subscribe: "Підписатись",
          no_specialists_found: "Спеціалістів не знайдено",
          recomend: "Рекомендуємо!",
          join_team: "Приєднуйся до нас в команду!",

          // Additional translations
          tariffs: "Тарифи",
          reviews: "Відгуки",
          choose: "Обрати",

          // Plan features translations
          plan_start_30_title: "Start 30",
          plan_result_30_title: "Result 30", 
          plan_vip_30_title: "VIP 30",
          plan_duration: "/ 30 днів",
          plan_start_30_price: "500 грн",
          plan_result_30_price: "1500 грн",
          plan_vip_30_price: "4000 грн",
          plan_feature_1: "Індивідуальний план тренувань (2–3 дні/тиждень)",
          plan_feature_2: "Пропозиції щодо харчування",
          plan_feature_3: "1 онлайн-консультація на тиждень",
          plan_feature_4: "План тренувань + детальний раціон",
          plan_feature_5: "Щотижневі корекції + відеоаналіз техніки",
          plan_feature_6: "Підтримка в месенджері 5/7",
          plan_feature_7: "Повне онлайн ведення",
          plan_feature_8: "12 тренувань на місяць",
          plan_feature_9: "Розбір харчування та індивідуальні рекомендації",
          plan_feature_10: "Повна підтримка в месенджері",

          female_health: "Жіноче здоров'я",
          female_health_fine:
            "Жіноче здоров'я без табу - чесно, просто і з турботою про тебе.",
          cycle_info: "Все про ваш цикл",
          reproductive_health: "Репродуктивне здоров'я",
          hormonas: "Гормони",
          gynecology: "Жіночий лікар",
          pregnancy: "Вагітність і післяпологовий період",
          prevention: "Профілактика та регулярний огляд",
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
          cycle_control:
            "Відстежуйте свій цикл, контролюй самопочуття та отримуй нагадування вчасно",
          calendar_cycle: "Календар місячних",
          calc_cycle: "Розрахувати мій календар місячних",
          warning_calc:
            "*Розрахунки за наши календарем місячних можуть бути не на 100% точними, тому що кожне тіло і кожний цикл відрізняється. Допоможи нам зробити твій календар більш точним.",
          cycle: "Цикл",
          why_should_calendar: "Навіщо вести календар місячних?",
          preview_calendar:
            "Вести календар місячних — це не лише про пам'ять про «ті дні». Це маленький ритуал турботи про себе, який допомагає краще розуміти своє тіло і настрій.",
          predict_cycle: "Прогнозує цикл",
          predict_cycle_desc:
            "Ти завжди знаєш, коли почнуться менструації та овуляція. Це допомагає планувати події, відпустки чи важливі зустрічі.",
          listen_yourself: "Слухати себе",
          listen_yourself_desc:
            "Календар допомагає помітити, як змінюється енергія, настрій і апетит у різні фази циклу.",
          regularity: "Виявляти закономірність",
          regularity_desc:
            "Біль, ПМС, коливання настрою чи зміни шкіри стають помітнішими. Можна легко відстежувати, що повторюється, і що допомагає почуватися краще.",
          doctor_help: "Допомагає лікарю",
          doctor_help_desc:
            "Якщо потрібно звернутися до гінеколога, точний запис циклу та симптомів робить консультацію ефективнішою.",
          planing: "Планування здоров'я та фітнесу",
          planing_desc:
            "Ти можеш підлаштовувати тренування, харчування чи відпочинок під свій ритм, щоб отримати максимальну користь.",
          finalize_calendar:
            "Календар місячних -це не обов'язок, а інструмент самопізнання. Він допомагає відчувати себе впевненіше, передбачати зміни настрою і просто піклуватись про себе.",
          phase: "Фази менструального циклу",
          proccess_in_body: "Що відбувається в тілі жінки",
          proccess_in_body_desc:
            "Менструальний цикл — це не лише «ті дні». Це цілий природний ритм, який допомагає організму працювати злагоджено. Він ділиться на кілька фаз, і кожна з них впливає на наше самопочуття, настрій та енергію.",
          phase_1_5: "Менструальна фаза\n(1 — 5)",
          phase_1_5_desc:
            "Це початок циклу. Організм позбувається старого шару слизової оболонки матки, тому з'являються менструальні виділення. У цей час енергії може бути менше, тож варто дозволити собі більше відпочинку.",
          phase_6_13: "Фолікулярна фаза\n(6 — 13)",
          phase_6_13_desc:
            "Поступово зростає рівень естрогену, і разом з ним повертається сила та мотивація. Це гарний період для нових ідей, активної роботи та спорту",
          phase_14_16: "Овуляторна фаза\n(14 — 16)",
          phase_14_16_desc:
            "Відбувається вихід зрілої яйцеклітини. Жінка може відчувати себе впевненою, привабливою, сповненою енергії. Це «пікові» дні, коли організм готовий до зачаття.",
          phase_17_28: "Лютеїнова фаза\n(17 — 28)",
          phase_17_28_desc:
            "Якщо вагітність не настала, починає домінувати прогестерон. Може з'явитися сонливість, зміни настрою, тяга до солодкого. У цей час важливо слухати себе, більше відпочивати й піклуватися про емоційний комфорт.",
          finalize_cycle:
            "Менструальний цикл — це не ворог, а природний календар нашого тіла. Якщо прислухатися до його фаз, можна краще планувати свій день, розуміти зміни настрою та бути більш гармонійною із собою.",
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
          one: "день",
          few: "дні",
          other: "днів",
          c_long: "Твій цикл тривав {{cLong}} днів. Що є нормою!",
          phase_1:
            "Зараз ти знаходишся у менструальній фазі!\nЦе початок циклу.\nТи можеш відчувати недостачу енергії!\nУ цей час краще потурбуватися про себе та відпочити!",
          phase_2:
            "Зараз ти знаходишся у фолікулярній фазі!\nАктивно зростає гормон естроген.\nТвій настрій зростає. Покращується шкіра!\nТи готова до підкорення цілого світу!",
          phase_3:
            "Зараз ти знаходишся у овуляторній фазі!\nВідбувається вихід зрілої яйцеклітини.\nТи відчуваєш себе впевненою та сповненою енергії!\nСьогодні - чудовий день, щоб робити те, що приносить тобі радість!",
          phase_4:
            "Зараз ти знаходишся у лютеїновій фазі!\nПочинає домінувати прогестерон!\nУ цей період може відбуватися зміна настрою та відчуватися сонливість!\nПіклуйся про свій комфорт та прислухайся до відчуттів!",
          super: "Супер!",
          gynecology_sub:
            "Все про регулярні обстеження, профілактику, турботу про жіноче здоров'я — без табу простою мовою.",
          womens_tests: "Обстеження та аналізи",
          regular_review: "Регулярні огляди",
          articles_: "Статті",
          read: "Читати",
          how_often: "Як часто потрібно\nвідвідувати\nгінеколога?",
          top_5_tests: "ТОП-5 аналізів для\nжіночого здоров'я",
          review_sub:
            "Турбота про здоров'я починається з профілактики. Раз на рік — і ти вже на крок попереду проблеми.",
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
          examination_desc:
            "Правильні тести вчасно — запорукавпевненності у здоров'ї. Дізнайся, які аналізи та обстеження варто робити регулярно.",
          base_review: "Базовий огляд",
          gynecology_examination: "Гінекологічний огляд",
          add_to_calendar: "Додати в календар",
          ultrasound_glands: "УЗД молочних залоз",
          need_I_test: "Чи потрібно робити аналізи, якщо я почуваюсь добре?",
          examination_tip_need:
            "Регулярні медичні обстеження важливі навіть тоді, коли немає жодних скарг. Багато захворювань на ранніх етапах розвиваються безсимптомно, і вчасно зроблені базові аналізи (загальний аналіз крові, сечі, рівень цукру, холестерину) допомагають виявити проблеми ще до появи перших ознак.\n\nПланові перевірки раз на рік – це інвестиція у власне здоров'я. Вони дають можливість контролювати стан організму, своєчасно коригувати харчування, спосіб життя та уникати ускладнень.\n\nПочуваєтесь добре – чудово, але профілактика завжди легша та дешевша за лікування.",
          what_needed_blood: "Що підготувати перед сдачею крові?",
          what_needed_blood_info:
            "Щоб аналіз крові був точним підготуйтеся заздалегідь:\n\nЗдавайте кров натще останній прийом їжі має бути за 8–12 годин\n\nПийте тільки чисту воду без газу це не впливає на показники\n\nЗа день два не вживайте алкоголь жирні та дуже солодкі страви\n\nУ день здачі уникайте сильних фізичних навантажень і стресу\n\nЯкщо приймаєте ліки обов'язково скажіть про це лікарю",
          what_diff_ultrasound_mam: "Чим відрізняється УЗД від мамографії?",
          what_diff_ultrasound_mam_info:
            "УЗД (ультразвукове дослідження) використовує звукові хвилі для візуалізації тканин і добре показує м'які структури грудей, особливо у молодих жінок з щільною тканиною\n\nМамографія – це рентгенівське обстеження, яке дозволяє виявити дрібні кальцинати і ранні ознаки пухлин навіть до появи ущільнень\n\nУЗД не використовує випромінювання і підходить для додаткового контролю\nМамографія залишається основним скринінговим методом для жінок старше 40 років\n\nОбидва методи часто використовують разом для більш точної діагностики",
          why_pap_test:
            "Навіщо робити цитологічний мазок (ПАП-тест) і як часто",
          why_pap_test_info:
            "Цитологічний мазок або ПАП-тест допомагає виявити зміни клітин шийки матки на ранніх стадіях коли ще немає симптомів\n\nРегулярне обстеження дозволяє запобігти розвитку раку і своєчасно лікувати запальні процеси\n\nЗазвичай ПАП-тест роблять раз на рік якщо немає проблем або за рекомендацією лікаря частіше\n\nОбстеження швидке безболісне і займає кілька хвилин\n\nНавіть якщо ви почуваєтесь добре тест допомагає дбати про своє здоров'я",
          reproductive: "Репродуктивне здоров'я",
          reproductive_sub:
            "Плануй з нами! Дбай про своє тіло і плануй майбутнє з упевненністю.",
          myth_main: "Існує купа міфів навкруги місячних.",
          myth_sub: "Ось для тебе маленька підборка)",
          cant_sport: "Під час місячних не можна займатись спортом",
          cant_sport_desc:
            "Насправді легка фізична активність, як-от йога, піші прогулянки чи навіть помірні тренування, може полегшити спазми та покращити настрій.",
          c_long_: "Цикл завжди триває рівно 28 днів",
          c_long_desc:
            "Цикл у кожної людини індивідуальний: нормою вважають інтервал приблизно від 21 до 35 днів.",
          cant_swim: "Не можна купатися чи приймати ванну під час місячних",
          cant_swim_desc:
            "Купання та душ безпечні. Гігієнічні засоби (тампони, менструальні чаші) дозволяють комфортно плавати й підтримувати чистоту.",
          cant_get_pregnant: "Під час місячних не можна завагітніти",
          cant_get_pregnant_desc:
            "Ймовірність нижча, але не нульова: сперматозоїди можуть жити в тілі кілька днів, а овуляція інколи настає раніше або пізніше, ніж очікується.",
          pain_is_ok: "Менструальний біль — це завжди нормально",
          pain_is_ok_desc:
            "Легкий дискомфорт типовий, але сильний або виснажливий біль може свідчити про ендометріоз чи інші захворювання, і варто звернутися до лікаря.",

          // === МЕНТАЛЬНЕ ЗДОРОВ'Я ===
          your: "Твоє здоров'я",
          breathing: "Дихальні практики",
          diaphragmatic: "Діафрагмальне дихання",
          square: "Дихання Квадрат",
          nadishodhana: "Наді шодхана",
          mentaltest: "Тест на стан",
          articles: "Корисні статті",

          // === МЕНЮ ЗДОРОВ'Я ===
          hmp_your_health: "Твоє здоров'я",
          hmp_mental_health: "Ментальне здоров'я",

          // === МЕНТАЛЬНЕ ЗДОРОВ'Я СТАТТІ ===
          mp_articles_title: "Корисні статті",
          mp_article_1: "10 простих технік зниження стресу щодня",
          mp_article_2: "Як впоратись з тривогою",
          mp_article_3: "Дихальні вправи для розслаблення",
          mp_article_4: "Здоровий сон та ментальне здоров'я",
          mp_article_5: "Медитація для початківців",
          mp_article_6: "Як підвищити самооцінку",
          mp_article_7: "Ефективні методи боротьби з вигоранням",
          mp_article_content_1: 
            `
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
          mp_article_content_2: 
            `
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
          mp_article_content_3: 
            `
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
          mp_article_content_4: 
            `
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
          mp_article_content_5: 
            `
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
          mp_article_content_6: 
            `
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
          mp_article_content_7: 
            `
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
          m_long: "Тривалість місячних(дні)",
          c_long_wh: "Тривалість циклу",

          // === ЕМОЦІЙНИЙ ЩОДЕННИК ===
          mp_aew_notes: "Нотатка",
          mp_aew_describe_your_feelings: "Опишіть свої відчуття детальніше...",
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
          mp_aew_wizard_description_step_3:
            "Ваша замітка є приватною і її видно тільки вам.",
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

          // === ДИХАЛЬНІ ПРАКТИКИ ===
          mp_bpp_title: "Дихальні практики",
          mp_bpp_subtitle: "Видихни стрес — вдихни спокій 🌿",
          mp_bpp_description_1:
            "Прості вправи на дихання допомагають зняти напругу, відновити енергію та повернути ясність думок. Почати можна будь-де: вдома, на роботі чи навіть у транспорті.",
          mp_bpp_description_2:
            "Спробуй — і відчуй, як тіло розслабляється, а настрій стає легшим.",
          mp_bpp_card_title_1: "Діафрагмальне дихання",
          mp_bpp_card_description_1_1: "Зменшить стрес і тривогу.",
          mp_bpp_card_description_1_2: "Розслабляє, знімає напругу.",
          mp_bpp_card_title_2: "Дихання Квадрат",
          mp_bpp_card_description_2_1:
            "Знімає тривогу й допомагає зосередитись.",
          mp_bpp_card_title_3: "Наді шодхана",
          mp_bpp_card_description_3_1: "Дихання по черзі через ніздрі.",
          mp_bpp_card_description_3_2: "Допомагає зняти стрес.",
          mp_bpp_card_description_3_3: "Повертає внутрішню рівновагу.",

          // === ДІАФРАГМАЛЬНЕ ДИХАННЯ ===
          mp_dbp_title: "Діафрагмальне дихання",
          mp_dbp_subtitle: "Дихання, що повертає спокій",
          mp_dbp_description_1_1:
            "Сядь зручно. Розслаб плечі. Виконуй хочаб 3 - 5 хвилин.",
          mp_dbp_description_1_2: "Повертайся до дихання, як відчуєш напругу.",
          mp_dbp_inhale: "ВДИХ",
          mp_dbp_hold: "ТРИМАЙ",
          mp_dbp_exhale: "ВИДИХ",
          mp_dbp_come_on_more: "ДАВАЙ ЩЕ",

          // === ЩОДЕННИК ЕМОЦІЙ ===
          mp_ebp_title: "Щоденник емоцій",
          mp_ebp_factor_title: "Фактори настрою",
          mp_ebp_factor_info_p_1: "Всі фактори - твої можливі тригери.",
          mp_ebp_factor_info_p_2:
            "Наприклад, ви можете не помічати, що спорт, кава або наркотики впливають на ваш настрій і формують поведінкові патерни.",
          mp_ebp_factor_info_p_3:
            "Ви можете відстежити вплив факторів на ваше самопочуття пізніше в розділі аналітики.",
          mp_ebp_factor_info_p_4: "Приклад",
          mp_ebp_factor_info_p_5: "Харчування та стимулятори:",
          mp_ebp_factor_info_p_6:
            "Записуй споживання кави, вітамінів або продуктів, які можуть вплинути на рівень енергії.",
          mp_ebp_factor_info_p_7: "Активність та фізичні вправи:",
          mp_ebp_factor_info_p_8:
            "Відстежуй кількість фізичних вправ або участь у інших формах фізичної активності.",
          mp_ebp_factor_info_p_9: "Біологічні цикли:",
          mp_ebp_factor_info_p_10:
            "Відстежуючи свої місячні, ви зможете зрозуміти, як вони впливають на ваше емоційне самопочуття.",
          mp_ebp_selected_factors: "Обрані фактори:",
          mp_ebp_available_factors: "Доступні фактори:",
          mp_ebp_hello_how_are_you: "Привіт! Ти як?",
          mp_ebp_factor: "Фактори",
          mp_ebp_add_factor: "Додати фактор",

          // === ГОЛОВНА МЕНТАЛЬНОГО ЗДОРОВ'Я ===
          mp_mhp_title: "Твій спокій починається тут.",
          mp_mhp_sub_title:
            "Ми зібрали інструменти, які допоможуть залишитись врівноваженим навіть у найстресовіші дні.",
          mp_mhp_test_card_title: "Тести на стан",
          mp_mhp_test_card_btn_text: "Пройти тест",
          mp_mhp_breathing_card_title: "Дихальні практики",
          mp_mhp_breathing_card_btn_text: "Обрати практику",
          mp_mhp_articles_card_title: "Корисні статті",
          mp_mhp_articles_card_btn_text: "Переглянути статті",
          mp_mhp_choose_specialist: "Обрати спеціаліста",

          // === ТЕСТ НА СТАН ===
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
          mp_mtp_test_data_question_5:
            'Що ти думаєш, коли чуєш слово "відпочинок"?',
          mp_mtp_test_data_answers_5_1: "Планую, щось приємне",
          mp_mtp_test_data_answers_5_2: "Лежати вдома й нічого не робити",
          mp_mtp_test_data_answers_5_3: "У мене немає часу на відпочинок",
          mp_mtp_test_result_title_1: "Твоя менталочка в нормі.",
          mp_mtp_test_result_description_1:
            "Ти маєш чудовий рівень енергії та оптимізму. Продовжуй дбати про себе та підтримувати цей стан!",
          mp_mtp_test_result_title_2: "Менталочка переважно в нормі.",
          mp_mtp_test_result_description_2:
            "Більшість справ йдуть добре, але деякі сфери потребують трохи більше уваги та турботи.",
          mp_mtp_test_result_title_3: "Менталочка трохи виснажена",
          mp_mtp_test_result_description_3:
            "Ти відчуваєш легку втому. Знайди час для відпочинку та маленьких радощів.",
          mp_mtp_test_result_title_4: "Менталочка просить турботи",
          mp_mtp_test_result_description_4:
            "Тобі треба більше відпочинку, радощів і підтримки. Зверни увагу на свої потреби.",
          mp_mtp_test_result_title_5: "Менталочка кричить SOS",
          mp_mtp_test_result_description_5:
            "Ти можеш відчувати вигорання. Не соромся звертатися за допомогою та знайди час для серйозного відпочинку.",
          mp_mtp_test_result_title_6:
            "Твоя менталочка — як американські гірки.",
          mp_mtp_test_result_description_6:
            "Твій стан часто міняється. Деякі дні чудові, інші - складніші. Намагайся знайти баланс.",
          mp_mtp_start_message:
            "Увага! Тест не має діагностичної сили, але показує твій рівень стресу чи вигорання.",
          mp_mtp_test_title: "Тест на стан твоєї менталочки",
          mp_mtp_test_description:
            "Тицяй відповіді, які відповідають твоєму стану)",

          // === НАДІ ШОДХАНА ===
          mp_nsp_title: "Наді Шодхана",
          mp_nsp_subtitle: "Дихання, що балансує енергію",
          mp_nsp_description_1:
            "Техніка чергування ніздрей для гармонізації розуму та тіла.",
          mp_nsp_description_2: "Виконуй 3-5 хвилин для досягнення ефекту.",
          mp_nsp_technique_title: "Техніка:",
          mp_nsp_technique_step_1: "Сядь зручно, вирівняй спину.",
          mp_nsp_technique_step_2:
            "Рукою закрий праву ніздрю, вдихни через ліву.",
          mp_nsp_technique_step_3: "Потім закрий ліву — видихни через праву.",
          mp_nsp_technique_step_4: "Вдихни правою — видихни лівою.",
          mp_nsp_technique_step_5:
            "Продовжуй кілька хвилин у спокійному темпі.",
          mp_nsp_result_title: "Результат:",
          mp_nsp_result_description_1:
            "Вже через кілька хвилин з'являється відчуття спокою. Знижується рівень напруги. Розум прояснюється, наче після короткого відпочинку.",
          mp_nsp_result_description_2:
            "Регулярна практика допомагає краще засинати, концентруватися та зберігати внутрішню рівновагу навіть у стресових ситуаціях.",

          // === ДИХАННЯ КВАДРАТ ===
          mp_sbp_title: "Дихання Квадрат",
          mp_sbp_subtitle: "Дихання, що повертає спокій",
          mp_sbp_description_1:
            "Сядь зручно. Розслаб плечі. Виконуй хочаб 3 - 5 хвилин.",
          mp_sbp_description_2: "Повертайся до дихання, як відчуєш напругу.",

          // === ТВОЄ ЗДОРОВ'Я ===
          mp_yhp_main_title: "Твоє здоров'я —",
          mp_yhp_main_subtitle: "Твоя суперсила. Вона стоїть на 3х китах:",
          mp_yhp_activity_title: "Активність",
          mp_yhp_activity_description_1:
            "Навіть 15 хвилин на день, вже роблять різницю.",
          mp_yhp_activity_description_2:
            "Прогулянка, скакалка, пілатес – оберіть те, що подобається, і тіло скаже 'дякую'.",
          mp_yhp_sleep_title: "Сон",
          mp_yhp_sleep_description_1: "Це найважливіше за все!",
          mp_yhp_sleep_description_2:
            "Сон – це не лінь, а твій внутрішній зарядний кабель. 7-8 годин якісного відпочинку допомагають тілу відновитися, а мозку – працювати швидко та креативно.",
          mp_yhp_nutrition_title: "Харчування",
          mp_yhp_nutrition_description_1:
            "Їжа - це пальне. Чим вона якісніше, тим краще працює твій 'двигун'.",
          mp_yhp_nutrition_description_2:
            "Не про дієти, а про баланс: більше овочів, менше стресу з перекусами.",

          // === ЧОЛОВІЧЕ ЗДОРОВ'Я ===
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
          mp_analyses_block_content_label_4: "УЗД органів малого тазу",
          mp_analyses_block_content_value_4: "раз на 1-2 роки",
          mp_analyses_block_content_label_5: "Гармональний профіль",
          mp_analyses_block_content_value_5: "за рекомендацією лікаря",
          mp_reproductive_block_title: "Репродуктивне здоров'я",
          mp_reproductive_block_content_label_1: "Фертильність",
          mp_reproductive_block_content_value_1:
            "якість сперми залежить від способу життя",
          mp_reproductive_block_content_label_2: "Ризики",
          mp_reproductive_block_content_value_2:
            "перегрів, алкоголь, куріння, ожиріння",
          mp_reproductive_block_content_label_3: "Рекомендації",
          mp_reproductive_block_content_value_3: "Уролог 1/рік, спермограма",
          mp_urinary_block_title: "Сечова система",
          mp_urinary_block_content_label_1: "Перевірка простати",
          mp_urinary_block_content_value_1: "з 40 років — ПСА і УЗД 1/рік",
          mp_urinary_block_content_label_2: "Тривога!",
          mp_urinary_block_content_value_2:
            "біль, кров у сечі, часте сечевипускання",
          mp_urinary_block_content_label_3: "Що робити?",
          mp_urinary_block_content_value_3:
            "не терпимо дискомфорт, біжливо до уролога",
          mp_potency_block_title: "Потенція",
          mp_potency_block_content_label_1: "Чому знижується?",
          mp_potency_block_content_value_1:
            "стрес, алкоголь, куріння, хвороби серця",
          mp_potency_block_content_label_2: "Як підтримати?",
          mp_potency_block_content_value_2:
            "спорт, якісний сон, збалансоване харчування",
          mp_potency_block_content_label_3: "Коли до лікаря?",
          mp_potency_block_content_value_3:
            "якщо проблеми тривають понад 2 місяці",
          mp_subtitle_2: "Турбуйся про себе, як про улюблену автівку",
          mp_form_subtitle:
            "Заповни поля, якщо є актуальні данні, і ми складемо тобі графік",
          mp_form_testosterone: "Тестостерон",
          mp_form_free_testosterone: "Вільний тестостерон",
          mp_form_free_testosterone_2: "Вільний Т",
          mp_form_prolactin: "Пролактин",
          mp_form_estradiol: "Естрадіол",
          mp_form_lh: "ЛГ(лютейнзуючий гормон)",
          mp_form_lh_2: "ЛГ",
          mp_form_fsh: "ФСГ",
          mp_form_ng_dl: "нг/дл",
          mp_form_ng_ml: "нг/мл",
          mp_form_pg_ml: "пг/мл",
          mp_form_mO_l: "мО/л",
          mp_form_save_btn: "Зберегти показники",
          mp_diagram_hormons_value_not_found:
            "Дані про гормони не знайдено. Будь ласка, внесіть свої показники.",
          mp_diagram_hormons_data_not_found:
            "Помилка при завантаженні даних. Зверніться в тех підтримку.",
          mp_diagram_low: "Низький",
          mp_diagram_norm: "Норма",
          mp_diagram_high: "Високий",
          calendar: "Календар",
          calendar_info: "Твій найкращій календар",
          create_event: "Створити",

          before_5: "За 5 хвилин",
          before_10: "За 10 хвилин",
          sign_for_doctor: "Запис до лікаря",
          sure_to_delete_event: "Ви впевнені, що хочете видалити подію?",
          notification: "Нагадування",
          task: "Завдання",
          meeting: "Зустріч",
          choose_date: "Оберіть дату",
          choose_time: "Оберіть час",
          choose_end_time: "Оберіть час закінчення",
          my_tasks: "Мої завдання",
          invite_friend: "Запросити друга",
          link: "Посилання",
          add_title: "Додай назву",
          go_to_main_page: "НА ГОЛОВНУ",

          // === Premium ===
          sp_you_already_have_active_subscription: "У вас вже є активна підписка",
          sp_please_login: "Будь ласка, увійдіть в систему",
          sp_active: "Активна",
          sp_expired: "Закінчилась",
          sp_cancelled: "Скасована",
          sp_basic_title: "Базова",
          sp_duration: "/ 30 днів",
          sp_basic_features_1: "Трекери",
          sp_basic_features_2: "Базова аналітика",
          sp_premium_title: "Преміум",
          sp_premium_features_1: "Курси",
          sp_premium_features_2: "Індивідуальні плани",
          sp_family_title: "Сімейна",
          sp_family_features_1: "Всі можливості \"Преміум\" підписки",
          sp_family_features_2: "Можливість надання доступу 3-м користувачам",
          sp_loading: "Завантаження...",
          sp_subscription_title: "Інвестуйте в себе",
          sp_subscription_sub_title: "Ваш найкращий проект — це ви. Давайте реалізуємо його разом.",
          sp_subscription_history_label: "Історія підписок",
          sp_subscription_history_loading: "Завантаження історії...",
          sp_subscription_history_price: "Безкоштовно",
          sp_subscription_family_title: "Додані користувачі",
          sp_subscription_family_date: "додано",
          sp_subscription_history_empty: "У вас ще немає історії підписок",
          sc_processing: "Обробка...",
          sc_select: "Обрати",

          // === Subscription Payment ===
          spp_please_input_correct_email: "Будь ласка, введіть коректні email адреси",
          spp_uncnown_subsription_type: "Невідомий тип підписки. Спробуйте ще раз.",
          spp_family_sub: "Сімейна підписка",
          spp_add_email_addresses_of_family_members: "Додайте email адреси членів сім'ї (до 3 осіб)",
          spp_go_to_payment: "Перейти до оплати",

          // === Subscription Details ===
          sdp_already_have_active_sub: "вже має активну підписку",
          sdp_already_a_member_of_another_family_subscription: "вже є членом іншої сімейної підписки",
          sdp_this_is_the_subscription_owner: "це власник підписки",
          sdp_user_not_found: "користувача не знайдено",
          sdp_some_users_could_not_be_added: "Деяких користувачів не вдалося додати",
          sdp_family_member_list_successfully_updated: "Список сімейних користувачів успішно оновлено!",
          sdp_error_updating_family_users: "Помилка при оновленні сімейних користувачів: ",
          sdp_subscription_not_found: "Підписка не знайдена",
          sdp_return_to_tariffs: "Повернутись до тарифів",
          sdp_your_current_subscription: "Ваша поточна підписка",
          sdp_subscription_type: "Тип підписки",
          sdp_subscription_status: "Статус",
          sdp_subscription_start_date: "Дата початку",
          sdp_subscription_end_date: "Дійсна до",
          sdp_subscription_price: "Ціна",
          sdp_subscription_section_content: "Сімейний доступ",
          sdp_subscription_detail_label: "Тип доступу",
          sdp_subscription_detail_value: "Член сімейної підписки",
          sdp_subscription_section_content_title: "Члени сім'ї",
          sdp_subscription_member_added: "Додано",
          sdp_subscription_renew_btn: "Продовжити підписку",
          sdp_subscription_manage_family_btn: "Керувати членами сім'ї",
          sdp_family_modal_instruction: "Додайте або видаліть email адреси членів сім'ї",
          sdp_sub_saving: "Збереження...",
          sdp_family_member_email: "Електронна пошта члена сім'ї",
          payment: "Оплата",
          details: "Деталі",

          // === Success Payment ===
          ps_payment_success_main_title: "УРА",
          ps_payment_success_title: "УСПІШНА ОПЛАТА",
          ps_payment_success_description: "квитанція про оплату прийшла вам на пошту",
          ps_payment_success_btn: "На головну",

          // Marketplace
          sport_eating: "Спортивне харчування",
          sport_cloth: "Спортивний одяг",
          sport_gadgets: "Гаджети",
          sport_other: "Інше",
          marketplace_filter: "Фільтр",
          brand: "Бренд",
          from: "Від",
          to: "до",
          one_thing: "шт.",
          put_in_cart: "В кошик",
          already_in_cart: "Вже в кошику",
          similar_products: "Схожі продукти",
          basket_marketplace: "Кошик",
          sure_to_delete_product_from_cart: "Ви впевнені, що хочете видалити товар з корзини?",
          product: "Продукт",
          amount_marketplace: "Кількість",
          my_order: "Моє замовлення",
          marketplace_total: "Усього",
          order_details: "Деталі",
          to_payment: "До сплати",
          order_sum: "Сума",
          delivery: "Доставка",
          post_index: "Почтовий індекс",
          shopping_cart: "Кошик",
        },
      },
      de: {
        translation: {
          // === GRUNDLEGENDE PLATTFORM-ÜBERSETZUNGEN ===
          about_platform: "Über die Plattform",
          functions: "Funktionen",
          prices: "Preise",
          marketplace: "Marktplatz",
          questions: "Fragen",
          language_selector: "Sprache",
          balance_action: "Balance in Aktion",
          less_chaos: "WENIGER CHAOS –",
          more_energy: "MEHR ENERGIE.",
          healthy_lifestyle: "DEINEN GESUNDEN LEBENSSTIL AN EINEM ORT.",
          register: "Registrieren",
          description_part1:
            " ist eine Plattform, die dir hilft, auf einfache und lässige Weise auf dich selbst aufzupassen.",
          description_part2:
            "Verfolge deine Ernährung und Training, achte auf deine Gesundheit und erhalte Unterstützung von Experten.",
          description_part3:
            "Finde nützliche Produkte und teile deine Motivation mit der Community.",
          description_part4:
            "Gemeinsam mit Nomyfy entwickelst du Schritt für Schritt gesunde Gewohnheiten und fühlst dich jeden Tag besser.",

          // === EXPERTENSEKTION ===
          specialist_title_line1: "DEIN TALENT IST HIER GEFRAGT!",
          specialist_title_line2: "WIR SUCHEN PROFIS WIE DICH!",
          specialist_text_line1:
            "Wenn du ein Spezialist in Psychologie, Ernährung oder ein Trainer bist,",
          specialist_text_line2:
            "lass uns diese Welt besser machen. Mit Profis zusammenarbeiten.",
          specialist_text_line3: "Du passt zu uns!",
          become_specialist: "Experte werden",

          // === MARKTPLATZ ===
          marketplace_title: "MARKTPLATZ FÜR GESUNDE LÖSUNGEN.",
          marketplace_subtitle:
            "Alles, was dir hilft, gesund zu leben, an einem Ort gesammelt.",
          marketplace_button: "Marktplatz",

          // === FAQ ===
          faq_title: "Häufig gestellte Fragen",
          faq_q1_title: "Was ist NOMYFY?",
          faq_q1_answer:
            "NOMYFY ist individuelle Therapie bei emotionalem Burnout.",
          faq_q2_title: "Für wen ist NOMYFY?",
          faq_q2_answer:
            "Für diejenigen, die nach Wegen suchen, ihre psychische Gesundheit zu verbessern.",
          faq_q3_title: "Was sind die Vorteile von NOMYFY?",
          faq_q3_answer:
            "NOMYFY hilft, dein Leben in Ordnung zu bringen, beginnend bei dir selbst.",
          faq_q4_title: "Kann man die Dienstleistungen kostenlos nutzen?",
          faq_q4_answer:
            "Ja, wir haben kostenlose Möglichkeiten, aber die meisten Dienstleistungen sind kostenpflichtig.",
          faq_q5_title: "Wie fange ich an?",
          faq_q5_answer:
            "Du musst dich auf unserer Plattform registrieren und eine Dienstleistung auswählen.",
          faq_q6_title: "Wie wird man Partner von NOMYFY?",
          faq_q6_answer:
            "Hinterlasse eine Anfrage auf unserer Website und wir werden uns mit dir in Verbindung setzen.",

          // === FUßZEILE ===
          specialists: "Experten",
          privacy_policy: "Datenschutzrichtlinie",
          support_service: "Support-Service",
          copyright: "© Nomyfy {{year}}.",

          // === ANMELDUNG ===
          login1: "ANMELDUNG",
          password: "Passwort",
          forgot_password: "Passwort vergessen?",
          login2: "Anmelden",
          no_profile: "Noch kein Profil? ",
          register2: "Registrierung",

          // === REGISTRIERUNG ===
          continue: "Weiter",
          reg_success: "Registrierung erfolgreich",
          start: "Starten",
          reg_top: "REGISTRIERUNG",
          success: "ERFOLGREICH",
          or: "oder",
          code_create_error: "Fehler beim Erstellen des Bestätigungscodes",
          code_error: "Ungültiger Bestätigungscode",
          check_email: "Bitte überprüfe deine E-Mail",
          code_send: "Code wurde gesendet an ",
          send_code: "Code senden ",
          send_code_again: "Code wird erneut gesendet in ",
          confirm: "Bestätigen",
          password_new: "Neues Passwort",

          // === PASSWORT ZURÜCKSETZEN ===
          enter_email_to_restore:
            "Gib deine E-Mail ein, um einen Code zu senden",
          send_code2: "Code senden",
          reset_password: "Passwort zurücksetzen",
          password_confirm: "Passwort bestätigen",
          update_password: "Passwort aktualisieren",
          password_update_success: "Passwort erfolgreich aktualisiert",
          to_login: "Zurück zur Anmeldung",
          user_not_exist: "Benutzer mit dieser E-Mail existiert nicht",
          reset_password_error:
            "Fehler beim Zurücksetzen des Passworts. Bitte versuche es erneut.",
          user_exist: "Ein Benutzer mit dieser E-Mail existiert bereits",
          auth_fail: "Authentifizierungsfehler. Bitte überprüfe deine Daten.",

          // === MENÜ ===
          dashboard: "Startseite",
          profile: "Profil",
          health: "Gesundheit",
          eating: "Ernährung",
          workout: "Training",
          social: "Community",
          marketplace_menu: "Marktplatz",
          premium: "Premium",
          exit: "Abmelden",
          search_placeholder: "Suchen",
          welcome: "Hallo",
          health_one_place: "Deine Gesundheit an einem Ort!",
          mental: "Psychische Gesundheit",

          // === DASHBOARD-WIDGETS ===

          kkal: "Kalorien",
          current_week: "Aktuelle Woche",
          water: "Wasser",
          L: "L",
          sleep: "Schlaf",
          H: "Std",
          bmi: "BMI",
          bmi_requires: "Bitte gib Informationen zu Größe und Gewicht ein",

          // === BENUTZERPROFIL ===
          p_error_upadate:
            "Profil konnte nicht aktualisiert werden. Bitte fülle alle Felder aus.",
          p_male: "Mann",
          p_female: "Frau",
          p_other: "Andere",
          p_success_title: "Danke für die Informationen!",
          p_success_subtitle: "Jetzt werden unsere Empfehlungen noch besser!",
          p_btn_home: "Zur Startseite",
          p_about_placeholder: "Über mich...",
          p_first_name_placeholder: "Vorname",
          p_last_name_placeholder: "Nachname",
          p_gender_placeholder: "Geschlecht",
          p_your_achievements: "Deine Erfolge",
          p_your_purchases: "Deine Käufe",
          p_birth_date_placeholder: "Geburtsdatum",
          p_height_placeholder: "Größe, cm",
          p_height_suffix: "cm",
          p_weight_placeholder: "Gewicht, kg",
          p_weight_suffix: "kg",
          p_country_placeholder: "Land",
          p_city_placeholder: "Stadt",
          p_street_placeholder: "Straße",
          p_loading_cities: "Lade Städte...",
          p_loading_streets: "Lade Straßen...",
          p_btn_save: "Speichern",
          p_btn_saving: "Wird gespeichert...",
          p_specialist_profile: "Spezialistenprofil",
          specialist_profile: "Spezialistenprofil",
          specialist_type: "Spezialistentyp",
          user_name: "Benutzername",
          back_to_profile: "Zurück zum Profil",
          specialist_profile_description: "Dies ist Ihre Spezialistenprofilseite, auf der Sie Ihre beruflichen Informationen verwalten können.",
          
          // Specialist Profile Page
          sp_hourly_rate: "Stundensatz",
          sp_experience: "Erfahrung (Jahre)",
          sp_license_number: "Berufslizenznummer",
          sp_website: "Spezialist Website",
          sp_instagram: "Instagram",
          sp_skills: "Fähigkeiten",
          sp_add_skill: "Fähigkeit hinzufügen",
          sp_certificates: "Zertifikate",
          sp_add_certificate: "Zertifikat hinzufügen",
          sp_save: "Speichern",
          sp_saving: "Speichern...",
          sp_profile_toggle: "Spezialistenprofil",
          sp_save_success: "Daten erfolgreich gespeichert!",
          sp_save_error: "Fehler beim Speichern der Daten:",
          sp_hourly_rate_placeholder: "Stundensatz eingeben",
          sp_experience_placeholder: "Jahre der Erfahrung eingeben",
          sp_license_number_placeholder: "Lizenznummer eingeben",
          sp_website_placeholder: "Website-URL eingeben",
          sp_instagram_placeholder: "Instagram-Benutzername eingeben",
          sp_certificate_placeholder: "Zertifikatsname eingeben",
          sp_add_skill_placeholder: "Fähigkeit hinzufügen...",
          sp_add_button: "Hinzufügen",
          sp_cancel_button: "Abbrechen",
          // Skills translations
          skill_powerlifting: "Powerlifting",
          skill_strength_training: "Krafttraining",
          skill_nutrition_correction: "Ernährungskorrektur",
          skill_stretching: "Stretching",
          skill_cardio_training: "Cardio-Training",
          skill_children_fitness: "Kinderfitness",
          skill_rehabilitation_exercises: "Rehabilitationsübungen",
          skill_client_motivation: "Kundenmotivation",
          skill_individual_programs: "Individuelle Programme",
          skill_group_classes: "Gruppenkurse",
          upload_photo: "Foto hochladen",
          uploading: "Hochladen...",
          download: "Herunterladen",
          remove: "Entfernen",
          p_profile_incomplete_alert: "Bitte vervollständigen Sie Ihr Benutzerprofil",


          // === KALENDER (GEBURTSTAG) ===
          p_january: "Januar",
          p_february: "Februar",
          p_march: "März",
          p_april: "April",
          p_may: "Mai",
          p_june: "Juni",
          p_july: "Juli",
          p_august: "August",
          p_september: "September",
          p_october: "Oktober",
          p_november: "November",
          p_december: "Dezember",
          p_monday: "Mo",
          p_tuesday: "Di",
          p_wednesday: "Mi",
          p_thursday: "Do",
          p_friday: "Fr",
          p_saturday: "Sa",
          p_sunday: "So",

          // === LÄNDER ===
          p_ukrain_country: "Ukraine",
          p_great_britain_country: "Großbritannien",
          p_germany_country: "Deutschland",
          p_france_country: "Frankreich",
          p_spain_country: "Spanien",
          p_usa_country: "USA",

          // --- Übersetzungen für Spezialisten
          filter_speciality: "Spezialisierung",
          filter_mode: "Online/Offline",
          filter_experience: "Erfahrung",
          filter_price: "Preis",

          spec_psychologist: "Psychologe",
          spec_doctor: "Arzt",
          spec_trainer: "Trainer",
          spec_dietitian: "Ernährungsberater",

          mode_online: "Nur online",
          mode_offline: "Nur offline",
          mode_hybrid: "Online / Offline",
          select_city: "Standorte",

          experience_1: "Bis 1 Jahr",
          experience_3: "Ab 3 Jahren",
          experience_5: "Ab 5 Jahren",
          experience_10: "Ab 10 Jahren",

          price_50: "bis 50 $/Stunde",
          price_75: "von 50 bis 75 $/Stunde",
          price_100: "von 75 bis 100 $/Stunde",
          price_150: "von 100 bis 150 $/Stunde",
          hourly_rate_title: "$/Stunde",

          clear_option: "Löschen",
          clear_filter: "Filter löschen",
          unknown_specialist: "Unbekannter Spezialist",
          top_5: "TOP - 5",
          subscribe: "Abonnieren",
          no_specialists_found: "Keine Spezialisten gefunden",
          recomend: "Empfohlen!",
          join_team: "Tritt unserem Team bei!",

          // Additional translations
          tariffs: "Tarife",
          reviews: "Bewertungen",
          choose: "Wählen",

          // Plan features translations
          plan_start_30_title: "Start 30",
          plan_result_30_title: "Result 30", 
          plan_vip_30_title: "VIP 30",
          plan_duration: "/ 30 Tage",
          plan_start_30_price: "12 EUR",
          plan_result_30_price: "38 EUR",
          plan_vip_30_price: "102 EUR",
          plan_feature_1: "Individueller Trainingsplan (2-3 Tage/Woche)",
          plan_feature_2: "Ernährungsvorschläge",
          plan_feature_3: "1 Online-Beratung pro Woche",
          plan_feature_4: "Trainingsplan + detaillierte Diät",
          plan_feature_5: "Wöchentliche Korrekturen + Videoanalyse der Technik",
          plan_feature_6: "Support im Messenger 5/7",
          plan_feature_7: "Vollständige Online-Betreuung",
          plan_feature_8: "12 Trainings pro Monat",
          plan_feature_9: "Ernährungsanalyse und individuelle Empfehlungen",
          plan_feature_10: "Vollständige Unterstützung im Messenger",
          // === LINKS ===
          diary: "Emotionstagebuch",
          article_1: "10 einfache Techniken zum Stressabbau",
          article_2: "Effektive Methoden zur Bewältigung von Angst",
          article_3: "Atemtechniken zur Entspannung",
          article_4:
            "Der Zusammenhang zwischen Schlaf und psychischer Gesundheit",
          article_5: "Grundlagen der Meditation für Anfänger",
          article_6: "Strategien zur Verbesserung des Selbstwertgefühls",
          article_7: "Prävention und Überwindung von Burnout",

          nt_tracker_tab: "Ernährungs-Tracker",
          nt_recipes_tab: "Rezepte",
          nt_date_label: "Datum",
          nt_calories_label: "Kalorien",
          nt_kcal_abbr: "kcal",
          nt_protein_label: "Protein",
          nt_g_abbr: "g",
          nt_meals_title: "Mahlzeiten",
          nt_add_meal_button: "Mahlzeit hinzufügen",
          nt_analytics_title: "Analytik",
          nt_ration_tab: "Ration",
          nt_loading: "Lädt...",
          nt_motivation_title: "Motivation",
          nt_motivation_loading: "Motivation wird geladen...",
          nt_daily_progress: "Tagesfortschritt",
          nt_fat_label: "Fette",
          nt_carbs_label: "Kohlenhydrate",
          nt_dish_name: "Gerichtname",

          nt_k_abbr: "kcal",
          nt_b_abbr: "P",
          nt_zh_abbr: "F",
          nt_v_abbr: "K",

          nt_unspecified_meal_1: "Frühstück",
          nt_unspecified_meal_2: "Mittagessen",
          nt_unspecified_meal_3: "Abendessen",
          nt_unspecified_meal_4: "Snack",

          loadingRecipe: "Rezept wird geladen...",
          recipeNotFound: "Rezept nicht gefunden",
          confirmDeleteRecipe:
            "Sind Sie sicher, dass Sie dieses Rezept löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
          recipeDeletedSuccess: "✅ Rezept erfolgreich gelöscht!",
          deleteRecipeError: "Fehler beim Löschen des Rezepts",
          recipeInUseError:
            "Rezept kann nicht gelöscht werden. Es wird möglicherweise in Benutzerdiäten verwendet.",
          recipeSteps: "Rezeptschritte",
          videoRecipe: "Video-Rezept",
          clickToWatch: "Zum Anschauen klicken",
          backToRecipes: "Zurück zu Rezepten",
          deleting: "Löschen...",
          loadRecipeError: "❌ Fehler beim Laden des Rezepts",
          fillRequiredFields:
            "Bitte füllen Sie die erforderlichen Felder aus (mit * gekennzeichnet)",
          addAtLeastOneIngredient: "Fügen Sie mindestens eine Zutat hinzu",
          addAtLeastOneStep:
            "Fügen Sie mindestens einen Zubereitungsschritt hinzu",
          recipeUpdatedSuccess: "✅ Rezept erfolgreich aktualisiert!",
          updateRecipeError: "Fehler beim Aktualisieren des Rezepts",
          loadingRecipeForEdit: "Rezept wird zum Bearbeiten geladen...",
          recipeImage: "Rezeptbild",
          changeImage: "Bild ändern",
          clickToUploadImage: "Klicken Sie zum Hochladen des Bildes",
          imageFormats: "PNG, JPG, WEBP bis zu 5MB",
          cookingSteps: "Zubereitungsschritte",
          step: "Schritt",
          describeStepPlaceholder: "Beschreiben Sie den Zubereitungsschritt...",
          addStep: "Schritt hinzufügen",
          recipeName: "Rezeptname",
          description: "Beschreibung",
          cookingTime: "Zubereitungszeit",
          cookingTimePlaceholder: "z.B. 30 Min.",
          videoLink: "Video-Link",
          ingredientNamePlaceholder: "Zutatenname",
          ingredientAmountPlaceholder: "Menge",
          addIngredient: "Zutat hinzufügen",
          cancel: "Abbrechen",
          saving: "Wird gespeichert...",
          updateRecipe: "Rezept aktualisieren",
          addNewRecipe: "Neues Rezept hinzufügen",
          saveRecipe: "Rezept speichern",
          addRecipeError: "Fehler beim Hinzufügen des Rezepts",
          recipeAddedSuccess: "✅ Rezept erfolgreich hinzugefügt!",
          error_token_missing: "Token fehlt",
          error_auth: "Authentifizierungsfehler",
          error_loading_data: "Fehler beim Laden der Daten",
          nt_no_meals_message: "Noch keine Mahlzeiten für diesen Tag.",
          nt_unspecified_dish_name: "Nicht angegeben",
          auth_error:
            "Authentifizierungsfehler. Bitte melden Sie sich erneut an.",
          error_deleting_meal: "Fehler beim Löschen der Mahlzeit",
          breakfast: "Frühstück",
          lunch: "Mittagessen",
          dinner: "Abendessen",
          snack: "Snack",
          meal: "Mahlzeit",
          nt_add_meal_button_multiline: "Fügen Sie Ihre\nMahlzeit hinzu",
          nt_ingredients_for: "Zutaten für",
          nt_ingredients_title_day: "Zutaten für den Tag",
          loading_ingredients: "Zutaten werden geladen...",
          no_recipe_ingredients:
            "Diese Mahlzeit hat keine detaillierten Zutaten.",
          no_ingredients_today:
            "Keine Rezepte mit detaillierten Zutaten in der Ration.",
          nt_delete_meal_button: "Mahlzeit löschen",
          add_recipe_text: "Fügen Sie Ihr Rezept hinzu",
          error_loading_recipes:
            "Fehler beim Laden der Rezepte. Überprüfen Sie die Konsole.",
          loading_text: "Rezepte werden geladen...",
          no_recipes_found: "Keine Rezepte gefunden.",
          add_element: "Element hinzufügen",
          error_auth_recipes:
            "Authentifizierungsfehler beim Laden der Rezepte.",
          error_no_user:
            "Benutzer konnte nicht ermittelt werden. Bitte melden Sie sich an.",
          error_no_recipe_selected: "Wählen Sie ein Rezept aus.",
          error_invalid_quantity:
            "Die Anzahl der Portionen muss größer als 0 sein.",
          add_meal_title: "Mahlzeit hinzufügen",
          meal_type_label: "Mahlzeittyp",
          portions_label: "Menge (Portionen)",
          selected_recipe_label: "Ausgewähltes Rezept",
          no_recipe_selected: "Nichts ausgewählt",
          adding_meal: "Wird hinzugefügt...",
          add_to_ration_button: "Zur Ration hinzufügen",
          cancel_button: "Abbrechen",
          search_recipes_placeholder: "Rezepte suchen...",
          refresh_button: "Aktualisieren",
          loading_recipes: "Rezepte werden geladen...",
          calories: "Kalorien",
          proteins: "Proteine",
          fats: "Fette",
          carbs: "Kohlenhydrate",
          ingredients: "Zutaten",
          editRecipe: "Rezept bearbeiten",
          deleteRecipe: "Rezept löschen",

          weight_analytics: "Gewichtsanalytik",
          we_no_data_chart:
            "Keine Daten verfügbar, um das Diagramm anzuzeigen.",
          we_no_chart_data: "Mindestens 2 Einträge sind erforderlich.",
          we_mode_month: "Monat",
          we_mode_7days: "7 Tage",
          we_last_7_days: "Letzte 7 Tage",

          we_title: "Gewicht protokollieren",
          we_current_label: "Aktuelles Gewicht:",
          we_no_data: "Keine Daten",
          we_error_data: "Fehler",
          we_kg_abbr: "kg",
          we_placeholder: "Gewicht eingeben (kg)",
          we_submitting: "Wird gespeichert...",
          we_save_button: "Speichern",
          we_saved: "Gewicht gespeichert!",
          we_error: "Speicherfehler.",

          nt_january: "Januar",
          nt_february: "Februar",
          nt_march: "März",
          nt_april: "April",
          nt_may: "Mai",
          nt_june: "Juni",
          nt_july: "Juli",
          nt_august: "August",
          nt_september: "September",
          nt_october: "Oktober",
          nt_november: "November",
          nt_december: "Dezember",

          nt_motivation_general_1:
            "Ihre Gesundheit ist Ihre größte Investition. Weiter so, Sie sind auf dem richtigen Weg! 💪",
          nt_motivation_general_2:
            "Gesunde Entscheidungen heute bedeuten Stärke morgen. Handeln Sie!",
          nt_motivation_general_3:
            "Denken Sie ans Hydrieren! Selbst ein kleines Glas Wasser verbessert Ihr Wohlbefinden.",
          nt_motivation_general_4:
            "Tägliche Selbstverbesserung bringt Ergebnisse. Großartig, dass Sie hier sind!",
          nt_motivation_general_5:
            "Kleine, konsequente Anstrengungen gewinnen immer über schnelle, chaotische Sprünge. Bleiben Sie stabil!",
          nt_motivation_general_6:
            "Denken Sie daran: Ihr Ziel ist ein Marathon, kein Sprint. Hauptsache, nicht aufhören!",

          nt_motivation_no_meals:
            "Scheint, als hätten Sie heute noch nichts protokolliert. Beginnen Sie mit einem nahrhaften Frühstück!",

          nt_motivation_calories_on_target:
            "🎉 Großartige Arbeit! Sie haben perfekt in Ihr Kalorienlimit gepasst. Ein wahrer Champion!",
          nt_motivation_calories_on_target_M:
            "🎉 Großartige Arbeit! Sie haben perfekt in Ihr Kalorienlimit gepasst, Champion!",
          nt_motivation_calories_on_target_F:
            "🎉 Großartige Arbeit! Sie haben perfekt in Ihr Kalorienlimit gepasst, Königin!",

          nt_motivation_calories_over:
            "Vorsicht! Sie haben {{calories}} kcal verbraucht (das ist über dem Ziel). Konzentrieren Sie sich auf Ihre letzte Mahlzeit.",
          nt_motivation_calories_critical_over:
            "🔴 Kritisch! {{calories}} kcal ist eine erhebliche Überschreitung. Konzentrieren Sie sich heute auf leichtes Protein und Ballaststoffe.",

          nt_motivation_almost_protein:
            "Sie haben Ihr Proteinziel fast erreicht! Ein bisschen mehr - und Ihre Muskeln werden sich bedanken!",
          nt_motivation_almost_protein_M:
            "Sie haben Ihr Proteinziel fast erreicht! Weiter so, Mann!",
          nt_motivation_almost_protein_F:
            "Sie haben Ihr Proteinziel fast erreicht! Das ist ausgezeichneter Fortschritt!",

          nt_motivation_low_protein:
            "Sie haben heute etwas zu wenig Protein. Versuchen Sie, Joghurt oder Nüsse zu Ihrem nächsten Snack hinzuzufügen. Noch {{protein}}g benötigt!",
          nt_motivation_high_fat:
            "Ich sehe viel Fett in Ihrer Ernährung. Vielleicht ersetzen Sie einen Snack durch Obst oder Gemüse? 🥑",
          nt_motivation_low_carbs:
            "Fühlen Sie sich nach dem Mittagessen müde? Das könnte an niedrigen Kohlenhydraten liegen. Versuchen Sie, Vollkornprodukte zum Abendessen hinzuzufügen.",
          nt_motivation_evening_low:
            "Sie machen das großartig! Konzentrieren Sie sich auf leichte Nahrung zum Abendessen, um perfekt in Ihre verbleibenden Kalorien zu passen.",

          nt_motivation_morning:
            "Guten Morgen! Starten Sie diesen Tag mit dem richtigen Frühstück und einer positiven Stimmung 🌞",
          nt_motivation_morning_M:
            "Guten Morgen, Krieger! Starten Sie diesen Tag mit dem richtigen Frühstück für Energie. 🌞",
          nt_motivation_morning_F:
            "Guten Morgen, Schöne! Starten Sie diesen Tag mit dem richtigen Frühstück für Energie. 🌞",
          nt_motivation_evening:
            "Großartiger Tag! Denken Sie daran, dass qualitative Erholung Teil Ihres Ernährungsplans ist.",

          // === SOZIALE CHALLENGES ===
          ch_all_challenges_title: "Alle Challenges",
          ch_details_link: "Mehr Details",
          ch_no_challenges_message: "Noch keine Challenges vorhanden.",
          ch_loading: "Lädt...",
          ch_error_loading: "Challenges konnten nicht geladen werden.",
          ch_details_error_loading: "Fehler beim Laden der Challenge-Details.",
          ch_not_found: "Challenge nicht gefunden.",
          ch_join: "Beitreten",
          ch_edit: "Bearbeiten",
          ch_delete: "Löschen",
          ch_back: "Zurück",
          ch_start_date: "Startdatum",
          ch_end_date: "Enddatum",
          ch_type: "Typ",
          ch_type_individual: "Individuell",
          ch_type_group: "Gruppe",
          ch_creator: "Ersteller",
          ch_participants: "Teilnehmer",
          ch_add_challenge_button: "Challenge hinzufügen",
          ch_create_first_link: "Erste Challenge erstellen",
          ch_create_title: "Neue Challenge erstellen",
          ch_name: "Name",
          ch_description: "Beschreibung",
          ch_create_submit: "Erstellen",
          ch_creating: "Wird erstellt...",
          ch_create_success: "Challenge erfolgreich erstellt!",
          ch_create_error: "Challenge konnte nicht erstellt werden.",
          ch_confirmJoinTitle: "Beitritt zur Challenge bestätigen",
          ch_confirmJoinText:
            "Bist du sicher, dass du dieser Challenge beitreten möchtest?",
          yes: "Ja",
          no: "Nein",
          ch_confirmDeleteTitle: "Löschen der Challenge bestätigen",
          ch_confirmDeleteText:
            "Bist du sicher, dass du diese Challenge löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.",
          ch_joinedTitle: "Erfolg!",
          ch_joinedText: "Du bist der Challenge erfolgreich beigetreten.",
          ok: "OK",
          ch_deletedTitle: "Challenge gelöscht",
          ch_deletedText: "Challenge wurde erfolgreich gelöscht.",
          ch_errorTitle: "Fehler",
          ch_errorText: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
          ch_edit_title: "Challenge bearbeiten",
          ch_type_competition: "Wettbewerb",
          ch_type_personal: "Persönliches Ziel",
          ch_save: "Speichern",
          ch_saving: "Wird gespeichert...",
          ch_edit_success: "Challenge erfolgreich aktualisiert!",
          ch_edit_success_title: "Erfolg!",
          ch_edit_error:
            "Challenge konnte nicht aktualisiert werden. Bitte versuche es erneut.",
          ch_leave: "Verlassen",
          ch_complete: "Abschließen",
          ch_confirmLeaveTitle: "Verlassen der Challenge bestätigen",
          ch_confirmLeaveText:
            "Bist du sicher, dass du diese Challenge verlassen möchtest?",
          ch_leftTitle: "Challenge verlassen",
          ch_leftText: "Du hast die Challenge erfolgreich verlassen.",
          ch_completedTitle: "Challenge abgeschlossen",
          ch_completedText:
            "Herzlichen Glückwunsch! Du hast die Challenge erfolgreich abgeschlossen.",
          ch_type_personalgoal: "Persönliches Ziel",

          // === MENSTRUATIONSKALENDER ===
          last_cycle_first_day: "1. Tag der letzten Periode",
          menstruation_calendar: "Menstruationskalender",
          male: "Mann",
          female: "Frau",
          gender: "Gesundheit nach Geschlecht",
          female_health: "Weibliche Gesundheit",
          female_health_fine:
            "Weibliche Gesundheit ohne Tabus - ehrlich, einfach und mit Sorge um dich.",
          cycle_info: "Alles über deinen Zyklus",
          reproductive_health: "Reproduktive Gesundheit",
          hormonas: "Hormone",
          gynecology: "Frauenarzt",
          pregnancy: "Schwangerschaft und Wochenbett",
          prevention: "Prävention und regelmäßige Untersuchungen",
          useful_info: "Nützliche Informationen",
          day_tip: "Nützlicher\nTipp\ndes Tages",
          plan: "Planen",
          preventive_check: "Vorsorgeuntersuchung mindestens einmal im Jahr",
          hormonas_health: "Gesunde Hormone",
          hormonas_important:
            "Warum es wichtig ist, den Hormonspiegel zu kontrollieren",
          cycle_health: "Ist der Zyklus wichtig?",
          cycle_important: "Warum es wichtig ist, jeden Zyklus zu verfolgen",
          examination_health: "Allgemeine Untersuchungen",
          examination_important:
            "Warum es wichtig ist, den Hormonspiegel zu kontrollieren",
          find_doctor: "Finde einen Arzt in deiner Nähe",
          your_cycle: "Dein Zyklus",
          cycle_control:
            "Verfolge deinen Zyklus, kontrolliere dein Wohlbefinden und erhalte rechtzeitig Erinnerungen",
          calendar_cycle: "Menstruationskalender",
          calc_cycle: "Meinen Menstruationskalender berechnen",
          warning_calc:
            "*Berechnungen mit unserem Menstruationskalender sind möglicherweise nicht 100 % genau, da jeder Körper und jeder Zyklus unterschiedlich ist. Hilf uns, deinen Kalender genauer zu machen.",
          cycle: "Zyklus",
          why_should_calendar: "Warum einen Menstruationskalender führen?",
          preview_calendar:
            "Einen Menstruationskalender zu führen geht nicht nur darum, an „diese Tage“ zu denken. Es ist ein kleines Ritual der Selbstfürsorge, das hilft, den eigenen Körper und die Stimmung besser zu verstehen.",
          predict_cycle: "Prognostiziert den Zyklus",
          predict_cycle_desc:
            "Du weißt immer, wann deine Periode und der Eisprung beginnen. Das hilft, Ereignisse, Urlaub oder wichtige Meetings zu planen.",
          listen_yourself: "Auf sich selbst hören",
          listen_yourself_desc:
            "Der Kalender hilft zu bemerken, wie sich Energie, Stimmung und Appetit in den verschiedenen Zyklusphasen verändern.",
          regularity: "Regelmäßigkeiten erkennen",
          regularity_desc:
            "Schmerzen, PMS, Stimmungsschwankungen oder Hautveränderungen werden deutlicher. Du kannst leicht verfolgen, was sich wiederholt und was dir hilft, dich besser zu fühlen.",
          doctor_help: "Hilft dem Arzt",
          doctor_help_desc:
            "Wenn du einen Frauenarzt aufsuchen musst, macht eine genaue Aufzeichnung des Zyklus und der Symptome die Beratung effektiver.",
          planing: "Planung von Gesundheit und Fitness",
          planing_desc:
            "Du kannst Training, Ernährung oder Entspannung an deinen Rhythmus anpassen, um den maximalen Nutzen zu erhalten.",
          finalize_calendar:
            "Ein Menstruationskalender ist keine Pflicht, sondern ein Werkzeug der Selbsterkenntnis. Er hilft, sich sicherer zu fühlen, Stimmungsänderungen vorherzusehen und einfach auf sich selbst aufzupassen.",
          phase: "Phasen des Menstruationszyklus",
          proccess_in_body: "Was passiert im Körper einer Frau",
          proccess_in_body_desc:
            "Der Menstruationszyklus ist nicht nur „diese Tage“. Es ist ein ganzer natürlicher Rhythmus, der dem Körper hilft, reibungslos zu funktionieren. Er teilt sich in mehrere Phasen, und jede beeinflusst unser Wohlbefinden, unsere Stimmung und Energie.",
          phase_1_5: "Menstruationsphase\n(1. — 5. Tag)",
          phase_1_5_desc:
            "Das ist der Beginn des Zyklus. Der Körper stößt die alte Gebärmutterschleimhaut ab, daher kommt es zur Menstruationsblutung. In dieser Zeit kann die Energie weniger sein, also gönn dir mehr Ruhe.",
          phase_6_13: "Follikelphase\n(6. — 13. Tag)",
          phase_6_13_desc:
            "Allmählich steigt der Östrogenspiegel und mit ihm kehren Kraft und Motivation zurück. Dies ist eine gute Zeit für neue Ideen, aktive Arbeit und Sport.",
          phase_14_16: "Ovulationsphase\n(14. — 16. Tag)",
          phase_14_16_desc:
            "Eine reife Eizelle wird freigesetzt. Die Frau kann sich selbstbewusst, attraktiv und voller Energie fühlen. Dies sind die „Peak“-Tage, an denen der Körper zur Empfängnis bereit ist.",
          phase_17_28: "Lutealphase\n(17. — 28. Tag)",
          phase_17_28_desc:
            "Wenn keine Schwangerschaft eintritt, dominiert Progesteron. Müdigkeit, Stimmungsschwankungen, Heißhunger auf Süßes können auftreten. In dieser Zeit ist es wichtig, auf sich selbst zu hören, sich mehr zu entspannen und für emotionalen Komfort zu sorgen.",
          finalize_cycle:
            "Der Menstruationszyklus ist kein Feind, sondern ein natürlicher Kalender unseres Körpers. Wenn du auf seine Phasen hörst, kannst du deinen Tag besser planen, Stimmungsänderungen verstehen und harmonischer mit dir selbst sein.",
          go_back: "Zurück",
          now: "jetzt",
          menstruation: "Menstruation",
          scheduled_menstruation: "Geplante Menstruation",
          ovulation: "Eisprung",
          planned_ovulation: "Geplanter Eisprung",
          ovulation_in: "Eisprung in",
          low_chance: "Geringe Chance schwanger zu werden",
          average_chance: "Mittlere Chance schwanger zu werden",
          high_chance: "Hohe Chance schwanger zu werden",
          no_chance: "Sehr geringe Wahrscheinlichkeit schwanger zu werden",
          myth_facts: "Mythen und Fakten",
          one: "Tag",
          few: "Tage",
          other: "Tage",
          c_long: "Dein Zyklus dauerte {{cLong}} Tage. Was normal ist!",
          phase_1:
            "Du befindest dich jetzt in der Menstruationsphase!\nDas ist der Beginn des Zyklus.\nDu könntest einen Energiemangel spüren!\nIn dieser Zeit ist es besser, auf dich aufzupassen und dich auszuruhen!",
          phase_2:
            "Du befindest dich jetzt in der Follikelphase!\nDas Hormon Östrogen steigt aktiv an.\nDeine Stimmung steigt. Die Haut verbessert sich!\nDu bist bereit, die Welt zu erobern!",
          phase_3:
            "Du befindest dich jetzt in der Ovulationsphase!\nEine reife Eizelle wird freigesetzt.\nDu fühlst dich selbstbewusst und voller Energie!\nHeute ist ein wunderbarer Tag, um das zu tun, was dir Freude bringt!",
          phase_4:
            "Du befindest dich jetzt in der Lutealphase!\nProgesteron beginnt zu dominieren!\nIn dieser Zeit kann es zu Stimmungsschwankungen und Müdigkeit kommen!\nKümmere dich um deinen Komfort und höre auf deine Gefühle!",
          super: "Super!",
          gynecology_sub:
            "Alles über regelmäßige Untersuchungen, Prävention, Fürsorge für die weibliche Gesundheit — ohne Tabus in einfacher Sprache.",
          womens_tests: "Untersuchungen und Tests",
          regular_review: "Regelmäßige Untersuchungen",
          articles_: "Artikel",
          read: "Lesen",
          how_often: "Wie oft sollte man\nzum\nFrauenarzt gehen?",
          top_5_tests: "TOP-5 Tests für\ndie weibliche Gesundheit",
          review_sub:
            "Fürsorge für die Gesundheit beginnt mit Prävention. Einmal im Jahr — und du bist den Problemen einen Schritt voraus.",
          what_to_check_regulary: "Was sollte man regelmäßig machen?",
          gynecology_review: "Untersuchung beim Frauenarzt",
          one_time_per_year: "einmal im Jahr",
          pap_test: "PAP-Abstrich",
          _2_3_time_per_year: "alle 2-3 Jahre",
          blood_test: "Blut- und Urintest",
          ultrasound_test: "Ultraschall des Beckens",
          if_need: "bei Bedarf",
          mammography: "Mammographie",
          after_40_years: "nach dem 40. Lebensjahr",
          examination_head: "Untersuchungen und Tests",
          examination_desc:
            "Die richtigen Tests zur richtigen Zeit — die Garantie für Sicherheit in Bezug auf die Gesundheit. Erfahre, welche Tests und Untersuchungen du regelmäßig machen solltest.",
          base_review: "Basisuntersuchung",
          gynecology_examination: "Gynäkologische Untersuchung",
          add_to_calendar: "Zum Kalender hinzufügen",
          ultrasound_glands: "Ultraschall der Brustdrüsen",
          need_I_test: "Sollte ich Tests machen, wenn ich mich gut fühle?",
          examination_tip_need:
            "Regelmäßige medizinische Untersuchungen sind wichtig, auch wenn keine Beschwerden vorliegen. Viele Krankheiten entwickeln sich in frühen Stadien symptomlos, und rechtzeitig durchgeführte Basistests (Blutbild, Urin, Blutzucker, Cholesterin) helfen, Probleme zu erkennen, bevor die ersten Anzeichen auftreten.\n\nPlanmäßige Kontrollen einmal im Jahr – das ist eine Investition in die eigene Gesundheit. Sie ermöglichen es, den Zustand des Körpers zu kontrollieren, Ernährung und Lebensstil rechtzeitig anzupassen und Komplikationen zu vermeiden.\n\nFühlst du dich gut – wunderbar, aber Prävention ist immer einfacher und günstiger als Behandlung.",
          what_needed_blood: "Was ist vor der Blutabnahme zu beachten?",
          what_needed_blood_info:
            "Damit dein Bluttest genau ist, bereite dich bitte vorher vor:\n\nBlutabnahme nüchtern die letzte Mahlzeit sollte 8–12 Stunden zurückliegen\n\nTrinke nur stilles Wasser das hat keinen Einfluss auf die Werte\n\nVermeide 1-2 Tage vorher Alkohol, fettige und sehr süße Speisen\n\nAm Tag der Abnahme vermeide starke körperliche Anstrengung und Stress\n\nWenn du Medikamente nimmst, informiere unbedingt deinen Arzt",
          what_diff_ultrasound_mam:
            "Was ist der Unterschied zwischen Ultraschall und Mammographie?",
          what_diff_ultrasound_mam_info:
            "Ultraschall (Sonographie) verwendet Schallwellen zur Darstellung von Gewebe und zeigt Weichteilstrukturen der Brust gut, besonders bei jungen Frauen mit dichtem Brustgewebe\n\nMammographie ist eine Röntgenuntersuchung, die kleine Verkalkungen und frühe Anzeichen von Tumoren erkennen lässt, noch bevor Knoten tastbar sind\n\nUltraschall verwendet keine Strahlung und eignet sich zur zusätzlichen Kontrolle\nMammographie bleibt die primäre Screening-Methode für Frauen über 40\n\nBeide Methoden werden oft kombiniert für eine genauere Diagnose",
          why_pap_test:
            "Wozu dient der zytologische Abstrich (PAP-Test) und wie oft?",
          why_pap_test_info:
            "Der zytologische Abstrich oder PAP-Test hilft, Veränderungen der Zellen des Gebärmutterhalses in frühen Stadien zu erkennen, wenn noch keine Symptome vorliegen\n\nRegelmäßige Untersuchungen ermöglichen es, die Entwicklung von Krebs zu verhindern und entzündliche Prozesse rechtzeitig zu behandeln\n\nIn der Regel wird der PAP-Test einmal jährlich durchgeführt, wenn keine Probleme vorliegen, oder auf Empfehlung des Arztes häufiger\n\nDie Untersuchung ist schnell, schmerzlos und dauert nur wenige Minuten\n\nAuch wenn du dich wohlfühlst, hilft der Test, auf deine Gesundheit zu achten",
          reproductive: "Reproduktive Gesundheit",
          reproductive_sub:
            "Plane mit uns! Kümmere dich um deinen Körper und plane deine Zukunft mit Zuversicht.",
          myth_main: "Es gibt jede Menge Mythen rund um die Menstruation.",
          myth_sub: "Hier ist eine kleine Auswahl für dich)",
          cant_sport: "Während der Menstruation darf man keinen Sport treiben",
          cant_sport_desc:
            "Tatsächlich kann leichte körperliche Aktivität wie Yoga, Spaziergänge oder sogar moderates Training Krämpfe lindern und die Stimmung verbessern.",
          c_long_: "Der Zyklus dauert immer genau 28 Tage",
          c_long_desc:
            "Der Zyklus ist bei jeder Person individuell: Ein Intervall von etwa 21 bis 35 Tagen gilt als normal.",
          cant_swim:
            "Man kann während der Menstruation nicht baden oder duschen",
          cant_swim_desc:
            "Baden und Duschen sind sicher. Hygieneprodukte (Tampons, Menstruationstassen) ermöglichen komfortables Schwimmen und die Aufrechterhaltung der Sauberkeit.",
          cant_get_pregnant:
            "Während der Menstruation kann man nicht schwanger werden",
          cant_get_pregnant_desc:
            "Die Wahrscheinlichkeit ist niedriger, aber nicht Null: Spermien können mehrere Tage im Körper überleben, und der Eisprung kann manchmal früher oder später als erwartet auftreten.",
          pain_is_ok: "Menstruationsbeschwerden sind immer normal",
          pain_is_ok_desc:
            "Leichtes Unbehagen ist typisch, aber starke oder erschöpfende Schmerzen können auf Endometriose oder andere Erkrankungen hinweisen, und es lohnt sich, einen Arzt aufzusuchen.",
          m_long: "Dauer der Menstruation (Tage)",
          c_long_wh: "Zykluslänge",

          // === PSYCHISCHE GESUNDHEIT ===
          your: "Deine Gesundheit",
          breathing: "Atemübungen",
          diaphragmatic: "Zwerchfellatmung",
          square: "Quadratisches Atmen",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "Zustandstest",
          articles: "Nützliche Artikel",

          // === GESUNDHEITSMENÜ ===
          hmp_your_health: "Deine Gesundheit",
          hmp_mental_health: "Psychische Gesundheit",

          // === PSYCHISCHE GESUNDHEIT ARTIKEL ===
          mp_articles_title: "Nützliche Artikel",
          mp_article_1: "10 einfache Techniken zur täglichen Stressreduktion",
          mp_article_2: "Wie man mit Angst umgeht",
          mp_article_3: "Atemübungen zur Entspannung",
          mp_article_4: "Gesunder Schlaf und psychische Gesundheit",
          mp_article_5: "Meditation für Anfänger",
          mp_article_6: "Wie man das Selbstwertgefühl steigert",
          mp_article_7: "Effektive Methoden zur Bekämpfung von Burnout",
          mp_article_content_1: 
            `
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
          mp_article_content_2: 
            `
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
          mp_article_content_3: 
            `
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
          mp_article_content_4: 
            `
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
          mp_article_content_5: 
            `
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
          mp_article_content_6: 
            `
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
          mp_article_content_7: 
            `
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

          // === EMOTIONSTAGEBUCH ===
          mp_aew_notes: "Notiz",
          mp_aew_describe_your_feelings: "Beschreibe deine Gefühle genauer...",
          mp_aew_ok: "Ok",
          mp_aew_balance: "Balance",
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
          mp_aew_fatigue: "Erschöpfung",
          mp_aew_self_pity: "Selbstmitleid",
          mp_aew_anxiety: "Angst",
          mp_aew_sadness: "Traurigkeit",
          mp_aew_uncertainty: "Unsicherheit",
          mp_aew_confusion: "Verwirrung",
          mp_aew_guilt: "Schuldgefühle",
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
          mp_aew_self_directed_aggression: "Aggression gegen sich selbst",
          mp_aew_сool: "Cool",
          mp_aew_energy: "Energie",
          mp_aew_satisfaction: "Zufriedenheit",
          mp_aew_connection: "Verbundenheitsgefühl",
          mp_aew_comfort: "Komfort",
          mp_aew_love: "Liebe",
          mp_aew_motivation: "Motivation",
          mp_aew_determination: "Entschlossenheit",
          mp_aew_respect: "Respekt",
          mp_aew_friendship: "Freundschaft",
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
          mp_aew_elation: "Hochstimmung",
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
          mp_aew_rest: "Erholung",
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
          mp_aew_wizard_title_step_2: "Was war der Grund für diese Emotionen?",
          mp_aew_wizard_title_step_3: "Möchtest du etwas notieren über",
          mp_aew_wizard_description_step_3:
            "Dein Eintrag ist privat und nur für dich sichtbar.",
          mp_return_back: "Zurück",
          mp_btn_next: "Weiter",
          mp_btn_add: "Hinzufügen",
          mp_btn_back: "Zurück",
          mp_btn_cancel: "Abbrechen",
          mp_btn_lets_start: "Lass uns anfangen?",
          mp_btn_continue: "Weiter",
          mp_btn_start: "Starten",
          mp_btn_save: "Speichern",
          mp_btn_result: "Ergebnis",
          mp_btn_try_again: "Nochmal versuchen",

          // === ATEMÜBUNGEN ===
          mp_bpp_title: "Atemübungen",
          mp_bpp_subtitle: "Atme Stress aus — atme Ruhe ein 🌿",
          mp_bpp_description_1:
            "Einfache Atemübungen helfen, Anspannung abzubauen, Energie zurückzugewinnen und Klarheit im Kopf zu finden. Du kannst überall anfangen: zu Hause, bei der Arbeit oder sogar unterwegs.",
          mp_bpp_description_2:
            "Probiere es aus — und spüre, wie dein Körper sich entspannt und deine Stimmung leichter wird.",
          mp_bpp_card_title_1: "Zwerchfellatmung",
          mp_bpp_card_description_1_1: "Reduziert Stress und Angst.",
          mp_bpp_card_description_1_2: "Entspannt, löst Verspannungen.",
          mp_bpp_card_title_2: "Quadratisches Atmen",
          mp_bpp_card_description_2_1:
            "Lindert Angst und hilft, sich zu konzentrieren.",
          mp_bpp_card_title_3: "Nadi Shodhana",
          mp_bpp_card_description_3_1: "Wechselatmung durch die Nasenlöcher.",
          mp_bpp_card_description_3_2: "Hilft, Stress abzubauen.",
          mp_bpp_card_description_3_3:
            "Bringt das innere Gleichgewicht zurück.",

          // === ZWERCHFELLATMUNG ===
          mp_dbp_title: "Zwerchfellatmung",
          mp_dbp_subtitle: "Atmung, die Ruhe zurückbringt",
          mp_dbp_description_1_1:
            "Setz dich bequem hin. Entspanne deine Schultern. Führe es für mindestens 3 - 5 Minuten durch.",
          mp_dbp_description_1_2:
            "Kehre zur Atmung zurück, wenn du Anspannung spürst.",
          mp_dbp_inhale: "EINATMEN",
          mp_dbp_hold: "HALTEN",
          mp_dbp_exhale: "AUSATMEN",
          mp_dbp_come_on_more: "WEITER SO",

          // === EMOTIONSTAGEBUCH ===
          mp_ebp_title: "Emotionstagebuch",
          mp_ebp_factor_title: "Stimmungsfaktoren",
          mp_ebp_factor_info_p_1: "Alle Faktoren - deine möglichen Trigger.",
          mp_ebp_factor_info_p_2:
            "Zum Beispiel könntest du nicht bemerken, dass Sport, Kaffee oder Drogen deine Stimmung beeinflussen und Verhaltensmuster formen.",
          mp_ebp_factor_info_p_3:
            "Du kannst den Einfluss der Faktoren auf dein Wohlbefinden später im Analysebereich verfolgen.",
          mp_ebp_factor_info_p_4: "Beispiel",
          mp_ebp_factor_info_p_5: "Ernährung und Stimulanzien:",
          mp_ebp_factor_info_p_6:
            "Notiere deinen Kaffeekonsum, Vitamine oder Lebensmittel, die dein Energieniveau beeinflussen könnten.",
          mp_ebp_factor_info_p_7: "Aktivität und körperliche Übungen:",
          mp_ebp_factor_info_p_8:
            "Verfolge die Menge an körperlicher Bewegung oder die Teilnahme an anderen Formen körperlicher Aktivität.",
          mp_ebp_factor_info_p_9: "Biologische Zyklen:",
          mp_ebp_factor_info_p_10:
            "Indem du deine Periode trackst, kannst du verstehen, wie sie sich auf dein emotionales Wohlbefinden auswirkt.",
          mp_ebp_selected_factors: "Ausgewählte Faktoren:",
          mp_ebp_available_factors: "Verfügbare Faktoren:",
          mp_ebp_hello_how_are_you: "Hallo! Wie geht's dir?",
          mp_ebp_factor: "Faktoren",
          mp_ebp_add_factor: "Faktor hinzufügen",

          // === STARTSEITE PSYCHISCHE GESUNDHEIT ===
          mp_mhp_title: "Deine Ruhe beginnt hier.",
          mp_mhp_sub_title:
            "Wir haben Werkzeuge zusammengestellt, die helfen, auch an den stressigsten Tagen ausgeglichen zu bleiben.",
          mp_mhp_test_card_title: "Zustandstests",
          mp_mhp_test_card_btn_text: "Test machen",
          mp_mhp_breathing_card_title: "Atemübungen",
          mp_mhp_breathing_card_btn_text: "Übung auswählen",
          mp_mhp_articles_card_title: "Nützliche Artikel",
          mp_mhp_articles_card_btn_text: "Artikel ansehen",
          mp_mhp_choose_specialist: "Experten auswählen",

          // === ZUSTANDSTEST ===
          mp_mtp_test_data_question_1: "Wie wachst du morgens auf?",
          mp_mtp_test_data_answers_1_1: "Mit Enthusiasmus und Plänen",
          mp_mtp_test_data_answers_1_2:
            "Mit einem Glas Wasser und einem schweren Seufzer",
          mp_mtp_test_data_answers_1_3: "„Was, schon wieder dieser Tag?“",
          mp_mtp_test_data_question_2:
            "Wenn etwas schiefgeht, ist deine Reaktion:",
          mp_mtp_test_data_answers_2_1:
            "Ok, ich überlege, wie ich es repariere",
          mp_mtp_test_data_answers_2_2: "Nun, so ist das Leben",
          mp_mtp_test_data_answers_2_3:
            "Alles ist verloren, ich verkrieche mich in meine Decke",
          mp_mtp_test_data_question_3:
            "Was rettet dich am häufigsten vor Stress?",
          mp_mtp_test_data_answers_3_1: "Sport oder ein Spaziergang",
          mp_mtp_test_data_answers_3_2: "Essen, Serien oder Memes",
          mp_mtp_test_data_answers_3_3: "Ich hänge einfach kraftlos rum",
          mp_mtp_test_data_question_4: "Dein Energiegefühl in letzter Zeit:",
          mp_mtp_test_data_answers_4_1: "Normal, die Batterie hält",
          mp_mtp_test_data_answers_4_2: "Wie eine Batterie bei 30%",
          mp_mtp_test_data_answers_4_3:
            "Wie ein Handy, das sich in der Kälte ausschaltet",
          mp_mtp_test_data_question_5:
            "Was denkst du, wenn du das Wort „Erholung“ hörst?",
          mp_mtp_test_data_answers_5_1: "Ich plane etwas Schönes",
          mp_mtp_test_data_answers_5_2: "Zu Hause liegen und nichts tun",
          mp_mtp_test_data_answers_5_3: "Ich habe keine Zeit für Erholung",
          mp_mtp_test_result_title_1: "Deine Psyche ist in Ordnung.",
          mp_mtp_test_result_description_1:
            "Du hast ein großartiges Energieniveau und Optimismus. Kümmere dich weiter um dich und halte diesen Zustand aufrecht!",
          mp_mtp_test_result_title_2:
            "Deine Psyche ist größtenteils in Ordnung.",
          mp_mtp_test_result_description_2:
            "Die meisten Dinge laufen gut, aber einige Bereiche brauchen etwas mehr Aufmerksamkeit und Fürsorge.",
          mp_mtp_test_result_title_3: "Deine Psyche ist etwas erschöpft",
          mp_mtp_test_result_description_3:
            "Du spürst leichte Müdigkeit. Nimm dir Zeit für Erholung und kleine Freuden.",
          mp_mtp_test_result_title_4: "Deine Psyche bittet um Fürsorge",
          mp_mtp_test_result_description_4:
            "Du brauchst mehr Erholung, Freude und Unterstützung. Achte auf deine Bedürfnisse.",
          mp_mtp_test_result_title_5: "Deine Psyche schreit SOS",
          mp_mtp_test_result_description_5:
            "Du könntest Burnout erleben. Scheue dich nicht, Hilfe zu suchen, und nimm dir Zeit für ernsthafte Erholung.",
          mp_mtp_test_result_title_6: "Deine Psyche ist wie eine Achterbahn.",
          mp_mtp_test_result_description_6:
            "Dein Zustand wechselt oft. Einige Tage sind großartig, andere - schwieriger. Versuche, eine Balance zu finden.",
          mp_mtp_start_message:
            "Achtung! Der Test hat keine diagnostische Kraft, zeigt aber dein Stress- oder Burnout-Level.",
          mp_mtp_test_title: "Test zum Zustand deiner Psyche",
          mp_mtp_test_description:
            "Klick auf die Antworten, die deinem Zustand entsprechen)",

          // === NADI SHODHANA ===
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "Atmung, die Energie balanciert",
          mp_nsp_description_1:
            "Technik des abwechselnden Atmens durch die Nasenlöcher zur Harmonisierung von Geist und Körper.",
          mp_nsp_description_2:
            "Führe es 3-5 Minuten durch, um die Wirkung zu erzielen.",
          mp_nsp_technique_title: "Technik:",
          mp_nsp_technique_step_1:
            "Setze dich bequem hin, richte deinen Rücken auf.",
          mp_nsp_technique_step_2:
            "Schließe mit deiner Hand das rechte Nasenloch, atme durch das linke ein.",
          mp_nsp_technique_step_3:
            "Dann schließe das linke — atme durch das rechte aus.",
          mp_nsp_technique_step_4:
            "Atme durch das rechte ein — atme durch das linke aus.",
          mp_nsp_technique_step_5:
            "Fahre einige Minuten in einem ruhigen Tempo fort.",
          mp_nsp_result_title: "Ergebnis:",
          mp_nsp_result_description_1:
            "Schon nach wenigen Minuten stellt sich ein Gefühl der Ruhe ein. Das Anspannungsniveau sinkt. Der Geist klärt sich, als nach einer kurzen Pause.",
          mp_nsp_result_description_2:
            "Regelmäßige Praxis hilft, besser einzuschlafen, sich zu konzentrieren und innere Balance auch in stressigen Situationen zu bewahren.",

          // === QUADRATISCHES ATMEN ===
          mp_sbp_title: "Quadratisches Atmen",
          mp_sbp_subtitle: "Atmung, die Ruhe zurückbringt",
          mp_sbp_description_1:
            "Setz dich bequem hin. Entspanne deine Schultern. Führe es für mindestens 3 - 5 Minuten durch.",
          mp_sbp_description_2:
            "Kehre zur Atmung zurück, wenn du Anspannung spürst.",

          // === DEINE GESUNDHEIT ===
          mp_yhp_main_title: "Deine Gesundheit —",
          mp_yhp_main_subtitle: "Deine Superkraft. Sie steht auf 3 Säulen:",
          mp_yhp_activity_title: "Aktivität",
          mp_yhp_activity_description_1:
            "Selbst 15 Minuten am Tag machen einen Unterschied.",
          mp_yhp_activity_description_2:
            "Spaziergang, Seilspringen, Pilates – wähle, was dir gefällt, und dein Körper wird sich bedanken.",
          mp_yhp_sleep_title: "Schlaf",
          mp_yhp_sleep_description_1: "Das ist das Allerwichtigste!",
          mp_yhp_sleep_description_2:
            "Schlaf ist keine Faulheit, sondern dein inneres Ladekabel. 7-8 Stunden qualitativer Erholung helfen dem Körper, sich zu regenerieren, und dem Gehirn, schnell und kreativ zu arbeiten.",
          mp_yhp_nutrition_title: "Ernährung",
          mp_yhp_nutrition_description_1:
            "Essen ist Treibstoff. Je höher die Qualität, desto besser läuft dein „Motor“.",
          mp_yhp_nutrition_description_2:
            "Es geht nicht um Diäten, sondern um Balance: mehr Gemüse, weniger Stress mit Snacks.",

          // === MÄNNLICHE GESUNDHEIT ===
          hormonas_diagram: "Diagramm der männlichen Gesundheit",
          mp_male_health: "Männliche Gesundheit",
          mp_subtitle_1:
            "Ein Mann zu sein, bedeutet auch, sich um die Gesundheit zu kümmern",
          mp_hormones_block_title: "Hormone",
          mp_hormones_block_content_label_1: "Testosteronspiegel",
          mp_hormones_block_content_value_1_1: "Norm 300-1000 ng/dl",
          mp_hormones_block_content_label_2: "Anzeichen eines Mangels",
          mp_hormones_block_content_value_2_1: "Müdigkeit",
          mp_hormones_block_content_value_2_2: "niedrige Libido",
          mp_hormones_block_content_value_2_3: "Muskelabbau",
          mp_hormones_block_content_label_3: "Was tun?",
          mp_hormones_block_content_value_3_1: "regelmäßige Tests",
          mp_hormones_block_content_value_3_2: "Krafttraining",
          mp_hormones_block_content_value_3_3: "qualitativer Schlaf",
          mp_hormones_block_content_value_3_4: "weniger Stress",
          mp_add_hormones_data: "Werte eintragen",
          mp_analyses_block_title: "Tests und Prävention",
          mp_analyses_block_content_label_1: "Blutbild und Urintest",
          mp_analyses_block_content_value_1: "jährlich",
          mp_analyses_block_content_label_2: "Hormonprofil",
          mp_analyses_block_content_value_2: "bei Bedarf",
          mp_analyses_block_content_label_3: "PSA",
          mp_analyses_block_content_value_3: "nach dem 40. Lebensjahr",
          mp_analyses_block_content_label_4: "Ultraschall des Beckens",
          mp_analyses_block_content_value_4: "alle 1-2 Jahre",
          mp_analyses_block_content_label_5: "Hormonprofil",
          mp_analyses_block_content_value_5: "auf Empfehlung des Arztes",
          mp_reproductive_block_title: "Reproduktive Gesundheit",
          mp_reproductive_block_content_label_1: "Fertilität",
          mp_reproductive_block_content_value_1:
            "Spermienqualität hängt vom Lebensstil ab",
          mp_reproductive_block_content_label_2: "Risiken",
          mp_reproductive_block_content_value_2:
            "Überhitzung, Alkohol, Rauchen, Fettleibigkeit",
          mp_reproductive_block_content_label_3: "Empfehlungen",
          mp_reproductive_block_content_value_3: "Urologe 1/Jahr, Spermiogramm",
          mp_urinary_block_title: "Harnsystem",
          mp_urinary_block_content_label_1: "Prostatakontrolle",
          mp_urinary_block_content_value_1:
            "ab 40 Jahren — PSA und Ultraschall 1/Jahr",
          mp_urinary_block_content_label_2: "Alarm!",
          mp_urinary_block_content_value_2:
            "Schmerzen, Blut im Urin, häufiges Wasserlassen",
          mp_urinary_block_content_label_3: "Was tun?",
          mp_urinary_block_content_value_3:
            "Unbehagen nicht ertragen, sofort zum Urologen",
          mp_potency_block_title: "Potenz",
          mp_potency_block_content_label_1: "Warum nimmt sie ab?",
          mp_potency_block_content_value_1:
            "Stress, Alkohol, Rauchen, Herzerkrankungen",
          mp_potency_block_content_label_2: "Wie unterstützen?",
          mp_potency_block_content_value_2:
            "Sport, qualitativer Schlaf, ausgewogene Ernährung",
          mp_potency_block_content_label_3: "Wann zum Arzt?",
          mp_potency_block_content_value_3:
            "wenn Probleme länger als 2 Monate andauern",
          mp_subtitle_2: "Kümmere dich um dich wie um dein Lieblingsauto",
          mp_form_subtitle:
            "Fülle die Felder aus, wenn du aktuelle Daten hast, und wir erstellen dir ein Diagramm",
          mp_form_testosterone: "Testosteron",
          mp_form_free_testosterone: "Freies Testosteron",
          mp_form_free_testosterone_2: "Freies T",
          mp_form_prolactin: "Prolaktin",
          mp_form_estradiol: "Estradiol",
          mp_form_lh: "LH (luteinisierendes Hormon)",
          mp_form_lh_2: "LH",
          mp_form_fsh: "FSH",
          mp_form_ng_dl: "ng/dl",
          mp_form_ng_ml: "ng/ml",
          mp_form_pg_ml: "pg/ml",
          mp_form_mO_l: "mU/l",
          mp_form_save_btn: "Werte speichern",
          mp_diagram_hormons_value_not_found:
            "Keine Hormondaten gefunden. Bitte trage deine Werte ein.",
          mp_diagram_hormons_data_not_found:
            "Fehler beim Laden der Daten. Bitte wende dich an den technischen Support.",
          mp_diagram_low: "Niedrig",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "Hoch",          calendar: "Kalender",
          calendar_info: "Ihr bester Kalender",
          create_event: "Erstellen",

          before_5: "In 5 Minuten",
          before_10: "In 10 Minuten",
          sign_for_doctor: "Arzttermin",
          sure_to_delete_event: "Sind Sie sicher, dass Sie das Ereignis löschen möchten?",
          notification: "Erinnerung",
          task: "Aufgabe",
          meeting: "Besprechung",
          choose_date: "Datum auswählen",
          choose_time: "Uhrzeit auswählen",
          choose_end_time: "Endzeit auswählen",
          my_tasks: "Meine Aufgaben",
          invite_friend: "Freund einladen",
          link: "Link",
          add_title: "Titel hinzufügen",
          go_to_main_page: "HEIM",

          // === Premium ===
          sp_you_already_have_active_subscription: "Sie haben bereits ein aktives Abonnement",
          sp_please_login: "Bitte melden Sie sich an",
          sp_active: "Aktiv",
          sp_expired: "Abgelaufen",
          sp_cancelled: "Storniert",
          sp_basic_title: "Basis",
          sp_duration: "/ 30 Tage",
          sp_basic_features_1: "Tracker",
          sp_basic_features_2: "Basisanalyse",
          sp_premium_title: "Premium",
          sp_premium_features_1: "Kurse",
          sp_premium_features_2: "Personalisierte Pläne",
          sp_family_title: "Familie",
          sp_family_features_1: "Alle Premium-Funktionen",
          sp_family_features_2: "Zugang für bis zu 3 Benutzer",
          sp_loading: "Lädt...",
          sp_subscription_title: "Investiere in dich selbst",
          sp_subscription_sub_title: "Dein bestes Projekt bist du selbst. Lass es uns gemeinsam umsetzen.",
          sp_subscription_history_label: "Abonnementverlauf",
          sp_subscription_history_loading: "Verlauf wird geladen...",
          sp_subscription_history_price: "Kostenlos",
          sp_subscription_family_title: "Hinzugefügte Benutzer",
          sp_subscription_family_date: "hinzugefügt",
          sp_subscription_history_empty: "Sie haben noch keinen Abonnementverlauf",
          sc_processing: "Verarbeitung...",
          sc_select: "Auswählen",

          // === Subscription Payment ===
          spp_please_input_correct_email: "Bitte geben Sie gültige E-Mail-Adressen ein",
          spp_uncnown_subsription_type: "Unbekannter Abonnementtyp. Bitte versuchen Sie es erneut.",
          spp_family_sub: "Familienabonnement",
          spp_add_email_addresses_of_family_members: "Fügen Sie die E-Mail-Adressen von Familienmitgliedern hinzu (bis zu 3 Personen)",
          spp_go_to_payment: "Zur Zahlung gehen",

          // === Subscription Details ===
          sdp_already_have_active_sub: "hat bereits ein aktives Abonnement",
          sdp_already_a_member_of_another_family_subscription: "ist bereits Mitglied eines anderen Familienabonnements",
          sdp_this_is_the_subscription_owner: "dies ist der Abonnementinhaber",
          sdp_user_not_found: "Benutzer nicht gefunden",
          sdp_some_users_could_not_be_added: "Einige Benutzer konnten nicht hinzugefügt werden",
          sdp_family_member_list_successfully_updated: "Familienmitgliedsliste erfolgreich aktualisiert!",
          sdp_error_updating_family_users: "Fehler beim Aktualisieren der Familienbenutzer: ",
          sdp_subscription_not_found: "Abonnement nicht gefunden",
          sdp_return_to_tariffs: "Zurück zu den Tarifen",
          sdp_your_current_subscription: "Ihr aktuelles Abonnement",
          sdp_subscription_type: "Abonnementtyp",
          sdp_subscription_status: "Status",
          sdp_subscription_start_date: "Startdatum",
          sdp_subscription_end_date: "Gültig bis",
          sdp_subscription_price: "Preis",
          sdp_subscription_section_content: "Familienzugang",
          sdp_subscription_detail_label: "Zugangstyp",
          sdp_subscription_detail_value: "Familienmitglied",
          sdp_subscription_section_content_title: "Familienmitglieder",
          sdp_subscription_member_added: "Hinzugefügt",
          sdp_subscription_renew_btn: "Abonnement verlängern",
          sdp_subscription_manage_family_btn: "Familienmitglieder verwalten",
          sdp_family_modal_instruction: "E-Mail-Adressen von Familienmitgliedern hinzufügen oder entfernen",
          sdp_sub_saving: "Speichern...",
          sdp_family_member_email: "E-Mail des Familienmitglieds",
          payment: "Zahlung",
          details: "Einzelheiten",

          // === Success Payment ===
          ps_payment_success_main_title: "JUCHHU",
          ps_payment_success_title: "ZAHLUNG ERFOLGREICH",
          ps_payment_success_description: "Die Zahlungsbestätigung wurde an Ihre E-Mail gesendet",
          ps_payment_success_btn: "Zur Startseite",

          // Marketplace
          sport_eating: "Sportnahrung",
          sport_cloth: "Sportbekleidung",
          sport_gadgets: "Gadgets",
          sport_other: "Andere",
          marketplace_filter: "Filter",
          brand: "Marke",
          from: "Von",
          to: "Bis",
          one_thing: "Stk.",
          put_in_cart: "In den Warenkorb",
          already_in_cart: "Bereits im Warenkorb",
          similar_products: "Ähnliche Produkte",
          basket_marketplace: "Warenkorb",
          sure_to_delete_product_from_cart: "Sind Sie sicher, dass Sie dieses Produkt aus dem Warenkorb entfernen möchten?",
          product: "Produkt",
          amount_marketplace: "Menge",
          my_order: "Meine Bestellung",
          marketplace_total: "Gesamt",
          order_details: "Details",
          to_payment: "Zur Zahlung",
          order_sum: "Betrag",
          delivery: "Lieferung",
          post_index: "Postleitzahl",
          shopping_cart: "Warenkorb",

        },
      },
      fr: {
        translation: {
          // === TRADUCTIONS PRINCIPALES DE LA PLATEFORME ===
          about_platform: "À propos de la plateforme",
          functions: "Fonctionnalités",
          prices: "Tarifs",
          marketplace: "Marketplace",
          questions: "Questions",
          language_selector: "Langue",
          balance_action: "Équilibre en action",
          less_chaos: "MOINS DE CHAOS –",
          more_energy: "PLUS D'ÉNERGIE.",
          healthy_lifestyle: "TON MODE DE VIE SAIN AU MÊME ENDROIT.",
          register: "S'inscrire",
          description_part1:
            " est une plateforme qui t'aide à prendre soin de toi facilement et avec le sourire.",
          description_part2:
            "Suis ton alimentation et tes entraînements, surveille ta santé et bénéficie du soutien de spécialistes.",
          description_part3:
            "Trouve des produits utiles et partage ta motivation avec la communauté.",
          description_part4:
            "Avec Nomyfy, tu développes pas à pas des habitudes saines et te sens mieux chaque jour.",

          // === SECTION SPÉCIALISTES ===
          specialist_title_line1: "TON TALENT EST NÉCESSAIRE ICI !",
          specialist_title_line2: "NOUS RECHERCHONS DES PROS COMME TOI !",
          specialist_text_line1:
            "Si tu es spécialiste en psychologie, nutrition ou si tu es coach,",
          specialist_text_line2:
            "ensemble, rendons ce monde meilleur. Travailler avec des professionnels.",
          specialist_text_line3: "Tu es fait(e) pour nous !",
          become_specialist: "Devenir expert",

          // === MARKETPLACE ===
          marketplace_title: "MARKETPLACE DE SOLUTIONS SAINES.",
          marketplace_subtitle:
            "Tout ce qui aide à vivre sainement, réuni au même endroit.",
          marketplace_button: "Marketplace",

          // === FAQ ===
          faq_title: "Questions fréquentes",
          faq_q1_title: "Qu'est-ce que NOMYFY ?",
          faq_q1_answer:
            "NOMYFY est une thérapie individuelle contre l'épuisement émotionnel.",
          faq_q2_title: "Pour qui est NOMYFY ?",
          faq_q2_answer:
            "Pour ceux qui cherchent des moyens d'améliorer leur santé mentale.",
          faq_q3_title: "Quels sont les avantages de NOMYFY ?",
          faq_q3_answer:
            "NOMYFY aide à mettre de l'ordre dans ta vie, en commençant par toi-même.",
          faq_q4_title: "Peut-on utiliser les services gratuitement ?",
          faq_q4_answer:
            "Oui, nous avons des options gratuites, mais la plupart des services sont payants.",
          faq_q5_title: "Comment commencer ?",
          faq_q5_answer:
            "Tu dois t'inscrire sur notre plateforme et choisir un service.",
          faq_q6_title: "Comment devenir partenaire de NOMYFY ?",
          faq_q6_answer:
            "Laisse une demande sur notre site et nous te recontacterons.",

          // === PIED DE PAGE ===
          specialists: "Experts",
          privacy_policy: "Politique de confidentialité",
          support_service: "Service d'assistance",
          copyright: "© Nomyfy {{year}}.",

          // === CONNEXION ===
          login1: "CONNEXION",
          password: "mot de passe",
          forgot_password: "mot de passe oublié ?",
          login2: "Se connecter",
          no_profile: "Pas de profil ? ",
          register2: "Inscription",

          // === INSCRIPTION ===
          continue: "Continuer",
          reg_success: "inscription réussie",
          start: "Commencer",
          reg_top: "INSCRIPTION",
          success: "SUCCÈS",
          or: "ou",
          code_create_error:
            "Erreur lors de la création du code de confirmation",
          code_error: "Code de confirmation incorrect",
          check_email: "veuillez vérifier votre email",
          code_send: "le code a été envoyé à ",
          send_code: "envoyer le code ",
          send_code_again: "le code sera renvoyé dans ",
          confirm: "Confirmer",
          password_new: "nouveau mot de passe",

          // === RÉINITIALISATION DU MOT DE PASSE ===
          enter_email_to_restore: "saisis ton e-mail pour envoyer un code",
          send_code2: "Envoyer le code",
          reset_password: "réinitialisation du mot de passe",
          password_confirm: "confirmation du mot de passe",
          update_password: "Mettre à jour le mot de passe",
          password_update_success: "mot de passe mis à jour avec succès",
          to_login: "Retour à la connexion",
          user_not_exist: "L'utilisateur avec cet email n'existe pas",
          reset_password_error:
            "Erreur lors de la réinitialisation du mot de passe. Réessaye.",
          user_exist: "Un utilisateur avec cet email existe déjà",
          auth_fail: "Erreur d'authentification. Vérifie tes données.",

          // === MENU ===
          dashboard: "Accueil",
          profile: "Profil",
          health: "Santé",
          eating: "Alimentation",
          workout: "Entraînement",
          social: "Communauté",
          marketplace_menu: "Marketplace",
          premium: "Premium",
          exit: "Se déconnecter",
          search_placeholder: "Recherche",
          welcome: "Bonjour",
          health_one_place: "Ta santé au même endroit !",
          mental: "Santé mentale",

          // === WIDGETS DU TABLEAU DE BORD ===

          kkal: "Calories",
          current_week: "Semaine en cours",
          water: "Eau",
          L: "L",
          sleep: "Sommeil",
          H: "H",
          bmi: "IMC",
          bmi_requires: "Renseigne des informations sur ta taille et ton poids",

          // === PROFIL UTILISATEUR ===
          p_error_upadate:
            "Impossible de mettre à jour le profil. Merci de remplir tous les champs.",
          p_male: "Homme",
          p_female: "Femme",
          p_other: "Autre",
          p_success_title: "Merci pour les informations !",
          p_success_subtitle:
            "Maintenant, nos conseils seront encore meilleurs !",
          p_btn_home: "Vers l'accueil",
          p_about_placeholder: "À propos de moi...",
          p_first_name_placeholder: "Prénom",
          p_last_name_placeholder: "Nom",
          p_gender_placeholder: "Genre",
          p_your_achievements: "Tes réussites",
          p_your_purchases: "Tes achats",
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
          p_btn_save: "Sauvegarder",
          p_btn_saving: "Sauvegarde en cours...",
          p_specialist_profile: "Profil spécialiste",
          specialist_profile: "Profil spécialiste",
          specialist_type: "Type de spécialiste",
          user_name: "Nom d'utilisateur",
          back_to_profile: "Retour au profil",
          specialist_profile_description: "Ceci est votre page de profil spécialiste où vous pouvez gérer vos informations professionnelles.",
          
          // Specialist Profile Page
          sp_hourly_rate: "Taux horaire",
          sp_experience: "Expérience (années)",
          sp_license_number: "Numéro de licence professionnelle",
          sp_website: "Site web du spécialiste",
          sp_instagram: "Instagram",
          sp_skills: "Compétences",
          sp_add_skill: "Ajouter une compétence",
          sp_certificates: "Certificats",
          sp_add_certificate: "Ajouter un certificat",
          sp_save: "Sauvegarder",
          sp_saving: "Sauvegarde...",
          sp_profile_toggle: "Profil spécialiste",
          sp_save_success: "Données sauvegardées avec succès!",
          sp_save_error: "Erreur lors de la sauvegarde des données:",
          sp_hourly_rate_placeholder: "Entrez le taux horaire",
          sp_experience_placeholder: "Entrez les années d'expérience",
          sp_license_number_placeholder: "Entrez le numéro de licence",
          sp_website_placeholder: "Entrez l'URL du site web",
          sp_instagram_placeholder: "Entrez le nom d'utilisateur Instagram",
          sp_certificate_placeholder: "Entrez le nom du certificat",
          sp_add_skill_placeholder: "Ajouter une compétence...",
          sp_add_button: "Ajouter",
          sp_cancel_button: "Annuler",
          // Skills translations
          skill_powerlifting: "Powerlifting",
          skill_strength_training: "Musculation",
          skill_nutrition_correction: "Correction nutritionnelle",
          skill_stretching: "Étirement",
          skill_cardio_training: "Cardio-training",
          skill_children_fitness: "Fitness pour enfants",
          skill_rehabilitation_exercises: "Exercices de rééducation",
          skill_client_motivation: "Motivation des clients",
          skill_individual_programs: "Programmes individuels",
          skill_group_classes: "Cours collectifs",
          upload_photo: "Télécharger une photo",
          uploading: "Téléchargement...",
          download: "Télécharger",
          remove: "Supprimer",
          p_specialist_profile: "Spezialistenprofil",
          p_profile_incomplete_alert: "Veuillez compléter votre profil utilisateur",


          // === CALENDRIER (ANNIVERSAIRE) ===
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

          // === PAYS ===
          p_ukrain_country: "Ukraine",
          p_great_britain_country: "Grande-Bretagne",
          p_germany_country: "Allemagne",
          p_france_country: "France",
          p_spain_country: "Espagne",
          p_usa_country: "États-Unis",

          // --- Traductions pour Spécialistes
          filter_speciality: "Spécialisation",
          filter_mode: "En ligne/Hors ligne",
          filter_experience: "Expérience",
          filter_price: "Prix",

          spec_psychologist: "Psychologue",
          spec_doctor: "Médecin",
          spec_trainer: "Entraîneur",
          spec_dietitian: "Diététicien",

          mode_online: "En ligne uniquement",
          mode_offline: "Hors ligne uniquement",
          mode_hybrid: "En ligne / Hors ligne",
          select_city: "Lieux",

          experience_1: "Jusqu'à 1 an",
          experience_3: "À partir de 3 ans",
          experience_5: "À partir de 5 ans",
          experience_10: "À partir de 10 ans",

          price_50: "jusqu'à 50 $/h",
          price_75: "de 50 à 75 $/h",
          price_100: "de 75 à 100 $/h",
          price_150: "de 100 à 150 $/h",
          hourly_rate_title: "$/h",

          clear_option: "Effacer",
          clear_filter: "Effacer le filtre",
          unknown_specialist: "Spécialiste inconnu",
          top_5: "TOP - 5",
          subscribe: "S'abonner",
          no_specialists_found: "Aucun spécialiste trouvé",
          recomend: "Recommandé !",
          join_team: "Rejoignez notre équipe !",

          // Additional translations
          tariffs: "Tarifs",
          reviews: "Avis",
          choose: "Choisir",

          // Plan features translations
          plan_start_30_title: "Start 30",
          plan_result_30_title: "Result 30", 
          plan_vip_30_title: "VIP 30",
          plan_duration: "/ 30 jours",
          plan_start_30_price: "12 EUR",
          plan_result_30_price: "38 EUR",
          plan_vip_30_price: "102 EUR",
          plan_feature_1: "Plan d'entraînement individuel (2-3 jours/semaine)",
          plan_feature_2: "Suggestions nutritionnelles",
          plan_feature_3: "1 consultation en ligne par semaine",
          plan_feature_4: "Plan d'entraînement + régime détaillé",
          plan_feature_5: "Corrections hebdomadaires + analyse vidéo de la technique",
          plan_feature_6: "Support en messagerie 5/7",
          plan_feature_7: "Gestion complète en ligne",
          plan_feature_8: "12 entraînements par mois",
          plan_feature_9: "Analyse nutritionnelle et recommandations individuelles",
          plan_feature_10: "Support complet en messagerie",
          // === LIENS ===
          diary: "Journal des émotions",
          article_1: "10 techniques simples pour réduire le stress quotidien",
          article_2: "Méthodes efficaces pour gérer l'anxiété",
          article_3: "Techniques de respiration pour la relaxation",
          article_4: "Le lien entre le sommeil et la santé mentale",
          article_5: "Bases de la méditation pour les débutants",
          article_6: "Stratégies pour améliorer l'estime de soi",
          article_7: "Prévention et surmonter l'épuisement professionnel",

          nt_tracker_tab: "Suivi Nutritionnel",
          nt_recipes_tab: "Recettes",
          nt_date_label: "Date",
          nt_calories_label: "Calories",
          nt_kcal_abbr: "kcal",
          nt_protein_label: "Protéines",
          nt_g_abbr: "g",
          nt_meals_title: "Repas",
          nt_add_meal_button: "Ajouter un repas",
          nt_analytics_title: "Analytique",
          nt_ration_tab: "Ration",
          nt_loading: "Chargement...",
          nt_motivation_title: "Motivation",
          nt_motivation_loading: "Chargement de la motivation...",
          nt_daily_progress: "Progrès quotidien",
          nt_fat_label: "Lipides",
          nt_carbs_label: "Glucides",
          nt_dish_name: "Nom du plat",

          nt_k_abbr: "kcal",
          nt_b_abbr: "P",
          nt_zh_abbr: "L",
          nt_v_abbr: "G",

          nt_unspecified_meal_1: "Petit-déjeuner",
          nt_unspecified_meal_2: "Déjeuner",
          nt_unspecified_meal_3: "Dîner",
          nt_unspecified_meal_4: "Collation",

          loadingRecipe: "Chargement de la recette...",
          recipeNotFound: "Recette non trouvée",
          confirmDeleteRecipe:
            "Êtes-vous sûr de vouloir supprimer cette recette ? Cette action ne peut pas être annulée.",
          recipeDeletedSuccess: "✅ Recette supprimée avec succès !",
          deleteRecipeError: "Erreur lors de la suppression de la recette",
          recipeInUseError:
            "Impossible de supprimer la recette. Elle est peut-être utilisée dans les régimes des utilisateurs.",
          recipeSteps: "Étapes de la recette",
          videoRecipe: "Recette en vidéo",
          clickToWatch: "Cliquer pour regarder",
          backToRecipes: "Retour aux recettes",
          deleting: "Suppression...",
          loadRecipeError: "❌ Erreur lors du chargement de la recette",
          fillRequiredFields:
            "Veuillez remplir les champs obligatoires (marqués d'un *)",
          addAtLeastOneIngredient: "Ajoutez au moins un ingrédient",
          addAtLeastOneStep: "Ajoutez au moins une étape de cuisson",
          recipeUpdatedSuccess: "✅ Recette mise à jour avec succès !",
          updateRecipeError: "Erreur lors de la mise à jour de la recette",
          loadingRecipeForEdit: "Chargement de la recette pour modification...",
          recipeImage: "Image de la recette",
          changeImage: "Changer l'image",
          clickToUploadImage: "Cliquez pour télécharger l'image",
          imageFormats: "PNG, JPG, WEBP jusqu'à 5MB",
          cookingSteps: "Étapes de cuisson",
          step: "Étape",
          describeStepPlaceholder: "Décrivez l'étape de cuisson...",
          addStep: "Ajouter une étape",
          recipeName: "Nom de la recette",
          description: "Description",
          cookingTime: "Temps de cuisson",
          cookingTimePlaceholder: "ex: 30 min",
          videoLink: "Lien vidéo",
          ingredientNamePlaceholder: "Nom de l'ingrédient",
          ingredientAmountPlaceholder: "Quantité",
          addIngredient: "Ajouter un ingrédient",
          cancel: "Annuler",
          saving: "Enregistrement...",
          updateRecipe: "Mettre à jour la recette",
          addNewRecipe: "Ajouter une nouvelle recette",
          saveRecipe: "Enregistrer la recette",
          addRecipeError: "Erreur lors de l'ajout de la recette",
          recipeAddedSuccess: "✅ Recette ajoutée avec succès !",
          error_token_missing: "Jeton manquant",
          error_auth: "Erreur d'authentification",
          error_loading_data: "Erreur de chargement des données",
          nt_no_meals_message: "Aucun repas pour ce jour pour le moment.",
          nt_unspecified_dish_name: "Non spécifié",
          auth_error: "Erreur d'authentification. Veuillez vous reconnecter.",
          error_deleting_meal: "Erreur lors de la suppression du repas",
          breakfast: "Petit-déjeuner",
          lunch: "Déjeuner",
          dinner: "Dîner",
          snack: "Collation",
          meal: "Repas",
          nt_add_meal_button_multiline: "Ajoutez votre\nrepas",
          nt_ingredients_for: "Ingrédients pour",
          nt_ingredients_title_day: "Ingrédients pour le jour",
          loading_ingredients: "Chargement des ingrédients...",
          no_recipe_ingredients: "Ce repas n'a pas d'ingrédients détaillés.",
          no_ingredients_today:
            "Aucune recette avec des ingrédients détaillés dans la ration.",
          nt_delete_meal_button: "Supprimer le repas",
          add_recipe_text: "Ajoutez votre recette",
          error_loading_recipes:
            "Erreur lors du chargement des recettes. Vérifiez la console.",
          loading_text: "Chargement des recettes...",
          no_recipes_found: "Aucune recette trouvée.",
          add_element: "Ajouter un élément",
          error_auth_recipes:
            "Erreur d'authentification lors du chargement des recettes.",
          error_no_user:
            "Impossible de déterminer l'utilisateur. Veuillez vous connecter.",
          error_no_recipe_selected: "Sélectionnez une recette.",
          error_invalid_quantity:
            "Le nombre de portions doit être supérieur à 0.",
          add_meal_title: "Ajouter un repas",
          meal_type_label: "Type de repas",
          portions_label: "Quantité (portions)",
          selected_recipe_label: "Recette sélectionnée",
          no_recipe_selected: "Rien sélectionné",
          adding_meal: "Ajout en cours...",
          add_to_ration_button: "Ajouter à la ration",
          cancel_button: "Annuler",
          search_recipes_placeholder: "Rechercher des recettes...",
          refresh_button: "Actualiser",
          loading_recipes: "Chargement des recettes...",
          calories: "Calories",
          proteins: "Protéines",
          fats: "Lipides",
          carbs: "Glucides",
          ingredients: "Ingrédients",
          editRecipe: "Modifier la recette",
          deleteRecipe: "Supprimer la recette",

          weight_analytics: "Analytique du poids",
          we_no_data_chart:
            "Aucune donnée disponible pour afficher le graphique.",
          we_no_chart_data: "Au moins 2 entrées sont requises.",
          we_mode_month: "Mois",
          we_mode_7days: "7 jours",
          we_last_7_days: "7 derniers jours",

          we_title: "Enregistrer le poids",
          we_current_label: "Poids actuel :",
          we_no_data: "Aucune donnée",
          we_error_data: "Erreur",
          we_kg_abbr: "kg",
          we_placeholder: "Entrez le poids (kg)",
          we_submitting: "Enregistrement...",
          we_save_button: "Enregistrer",
          we_saved: "Poids enregistré !",
          we_error: "Erreur d'enregistrement.",

          nt_january: "Janvier",
          nt_february: "Février",
          nt_march: "Mars",
          nt_april: "Avril",
          nt_may: "Mai",
          nt_june: "Juin",
          nt_july: "Juillet",
          nt_august: "Août",
          nt_september: "Septembre",
          nt_october: "Octobre",
          nt_november: "Novembre",
          nt_december: "Décembre",

          nt_motivation_general_1:
            "Votre santé est votre plus grand investissement. Continuez, vous êtes sur la bonne voie ! 💪",
          nt_motivation_general_2:
            "Des choix sains aujourd'hui signifient de la force demain. Passez à l'action !",
          nt_motivation_general_3:
            "N'oubliez pas de vous hydrater ! Même un petit verre d'eau améliore votre bien-être.",
          nt_motivation_general_4:
            "L'amélioration quotidienne de soi donne des résultats. Excellent travail d'être ici !",
          nt_motivation_general_5:
            "Les petits efforts constants l'emportent toujours sur les sauts rapides et chaotiques. Restez stable !",
          nt_motivation_general_6:
            "Rappelez-vous : votre objectif est un marathon, pas un sprint. L'essentiel est de ne pas s'arrêter !",

          nt_motivation_no_meals:
            "Il semble que vous n'ayez encore rien enregistré aujourd'hui. Commençons par un petit-déjeuner nutritif !",

          nt_motivation_calories_on_target:
            "🎉 Excellent travail ! Vous vous êtes parfaitement intégré dans votre limite de calories. Un vrai champion !",
          nt_motivation_calories_on_target_M:
            "🎉 Excellent travail ! Vous vous êtes parfaitement intégré dans votre limite de calories, Champion !",
          nt_motivation_calories_on_target_F:
            "🎉 Excellent travail ! Vous vous êtes parfaitement intégré dans votre limite de calories, Reine !",

          nt_motivation_calories_over:
            "Attention ! Vous avez consommé {{calories}} kcal jusqu'à présent (ce qui est au-dessus de l'objectif). Concentrez-vous sur votre dernier repas.",
          nt_motivation_calories_critical_over:
            "🔴 Critique ! {{calories}} kcal est un dépassement significatif. Concentrez-vous sur des protéines légères et des fibres aujourd'hui.",

          nt_motivation_almost_protein:
            "Vous avez presque atteint votre objectif de protéines ! Un peu plus - et vos muscles vous remercieront !",
          nt_motivation_almost_protein_M:
            "Vous avez presque atteint votre objectif de protéines ! Continuez, mon gars !",
          nt_motivation_almost_protein_F:
            "Vous avez presque atteint votre objectif de protéines ! C'est un progrès excellent !",

          nt_motivation_low_protein:
            "Vous manquez un peu de protéines aujourd'hui. Essayez d'ajouter du yaourt ou des noix à votre prochaine collation. Encore {{protein}}g nécessaires !",
          nt_motivation_high_fat:
            "Je vois beaucoup de graisses dans votre alimentation. Peut-être remplacer une collation par des fruits ou des légumes ? 🥑",
          nt_motivation_low_carbs:
            "Vous sentez-vous fatigué après le déjeuner ? Cela pourrait être dû à un faible taux de glucides. Essayez d'ajouter des céréales complètes au dîner.",
          nt_motivation_evening_low:
            "Vous vous débrouillez très bien ! Concentrez-vous sur des aliments légers pour le dîner pour parfaitement respecter vos calories restantes.",

          nt_motivation_morning:
            "Bonjour ! Commencez cette journée avec le bon petit-déjeuner et une humeur positive 🌞",
          nt_motivation_morning_M:
            "Bonjour, guerrier ! Commencez cette journée avec le bon petit-déjeuner pour l'énergie. 🌞",
          nt_motivation_morning_F:
            "Bonjour, belle ! Commencez cette journée avec le bon petit-déjeuner pour l'énergie. 🌞",
          nt_motivation_evening:
            "Belle journée ! N'oubliez pas qu'un repos de qualité fait partie de votre plan nutritionnel.",

          // === DÉFIS SOCIAUX ===
          ch_all_challenges_title: "Tous les défis",
          ch_details_link: "Plus de détails",
          ch_no_challenges_message: "Aucun défi pour le moment.",
          ch_loading: "Chargement...",
          ch_error_loading: "Impossible de charger les défis.",
          ch_details_error_loading:
            "Erreur lors du chargement des détails du défi.",
          ch_not_found: "Défi non trouvé.",
          ch_join: "Rejoindre",
          ch_edit: "Modifier",
          ch_delete: "Supprimer",
          ch_back: "Retour",
          ch_start_date: "Date de début",
          ch_end_date: "Date de fin",
          ch_type: "Type",
          ch_type_individual: "Individuel",
          ch_type_group: "Groupe",
          ch_creator: "Créateur",
          ch_participants: "Participants",
          ch_add_challenge_button: "Ajouter un défi",
          ch_create_first_link: "Créer le premier défi",
          ch_create_title: "Créer un nouveau défi",
          ch_name: "Nom",
          ch_description: "Description",
          ch_create_submit: "Créer",
          ch_creating: "Création en cours...",
          ch_create_success: "Défi créé avec succès !",
          ch_create_error: "Impossible de créer le défi.",
          ch_confirmJoinTitle: "Confirmer la participation au défi",
          ch_confirmJoinText: "Es-tu sûr de vouloir rejoindre ce défi ?",
          yes: "Oui",
          no: "Non",
          ch_confirmDeleteTitle: "Confirmer la suppression du défi",
          ch_confirmDeleteText:
            "Es-tu sûr de vouloir supprimer ce défi ? Cette action est irréversible.",
          ch_joinedTitle: "Succès !",
          ch_joinedText: "Tu as rejoint le défi avec succès.",
          ok: "OK",
          ch_deletedTitle: "Défi supprimé",
          ch_deletedText: "Le défi a été supprimé avec succès.",
          ch_errorTitle: "Erreur",
          ch_errorText: "Une erreur est survenue. Veuillez réessayer.",
          ch_edit_title: "Modifier le défi",
          ch_type_competition: "Compétition",
          ch_type_personal: "Objectif personnel",
          ch_save: "Sauvegarder",
          ch_saving: "Sauvegarde en cours...",
          ch_edit_success: "Défi mis à jour avec succès !",
          ch_edit_success_title: "Succès !",
          ch_edit_error: "Impossible de mettre à jour le défi. Réessaye.",
          ch_leave: "Quitter",
          ch_complete: "Terminer",
          ch_confirmLeaveTitle: "Confirmer la sortie du défi",
          ch_confirmLeaveText: "Es-tu sûr de vouloir quitter ce défi ?",
          ch_leftTitle: "Défi quitté",
          ch_leftText: "Tu as quitté le défi avec succès.",
          ch_completedTitle: "Défi terminé",
          ch_completedText:
            "Félicitations ! Tu as terminé le défi avec succès.",
          ch_type_personalgoal: "Objectif personnel",

          // === CALENDRIER MENSTRUEL ===
          last_cycle_first_day: "1er jour des dernières règles",
          menstruation_calendar: "Calendrier menstruel",
          male: "Homme",
          female: "Femme",
          gender: "Santé par genre",
          female_health: "Santé féminine",
          female_health_fine:
            "Santé féminine sans tabous - honnête, simple et bienveillante.",
          cycle_info: "Tout sur ton cycle",
          reproductive_health: "Santé reproductive",
          hormonas: "Hormones",
          gynecology: "Gynécologie",
          pregnancy: "Grossesse et post-partum",
          prevention: "Prévention et examens réguliers",
          useful_info: "Informations utiles",
          day_tip: "Conseil\nutile\ndu jour",
          plan: "Planifier",
          preventive_check: "examen préventif au moins une fois par an",
          hormonas_health: "Hormones saines",
          hormonas_important:
            "Pourquoi il est important de contrôler son taux d'hormones",
          cycle_health: "Le cycle, est-ce important ?",
          cycle_important: "Pourquoi il est important de suivre chaque cycle",
          examination_health: "Examens généraux",
          examination_important:
            "Pourquoi il est important de contrôler son taux d'hormones",
          find_doctor: "Trouver un médecin à proximité",
          your_cycle: "Ton cycle",
          cycle_control:
            "Suis ton cycle, contrôle ton bien-être et reçois des rappels en temps utile",
          calendar_cycle: "Calendrier menstruel",
          calc_cycle: "Calculer mon calendrier menstruel",
          warning_calc:
            "*Les calculs de notre calendrier menstruel peuvent ne pas être précis à 100 %, car chaque corps et chaque cycle est différent. Aide-nous à rendre ton calendrier plus précis.",
          cycle: "Cycle",
          why_should_calendar: "Pourquoi tenir un calendrier menstruel ?",
          preview_calendar:
            "Tenir un calendrier menstruel, ce n'est pas seulement se souvenir de « ces jours ». C'est un petit rituel de soin personnel qui aide à mieux comprendre son corps et son humeur.",
          predict_cycle: "Prédit le cycle",
          predict_cycle_desc:
            "Tu sais toujours quand tes règles et ton ovulation vont commencer. Cela aide à planifier les événements, les vacances ou les réunions importantes.",
          listen_yourself: "S'écouter",
          listen_yourself_desc:
            "Le calendrier aide à remarquer comment l'énergie, l'humeur et l'appétit changent selon les phases du cycle.",
          regularity: "Détecter des régularités",
          regularity_desc:
            "La douleur, le SPM, les sautes d'humeur ou les changements cutanés deviennent plus perceptibles. Tu peux facilement suivre ce qui se répète et ce qui t'aide à te sentir mieux.",
          doctor_help: "Aide le médecin",
          doctor_help_desc:
            "Si tu dois consulter un gynécologue, une trace précise de ton cycle et de tes symptômes rend la consultation plus efficace.",
          planing: "Planifier sa santé et son fitness",
          planing_desc:
            "Tu peux adapter tes entraînements, ton alimentation ou ta détente à ton rythme pour en tirer un bénéfice maximal.",
          finalize_calendar:
            "Un calendrier menstruel n'est pas une obligation, mais un outil de connaissance de soi. Il aide à se sentir plus confiant(e), à anticiper les changements d'humeur et simplement à prendre soin de soi.",
          phase: "Phases du cycle menstruel",
          proccess_in_body: "Ce qui se passe dans le corps d'une femme",
          proccess_in_body_desc:
            "Le cycle menstruel, ce n'est pas seulement « ces jours ». C'est tout un rythme naturel qui aide l'organisme à fonctionner de manière harmonieuse. Il se divise en plusieurs phases, et chacune influence notre bien-être, notre humeur et notre énergie.",
          phase_1_5: "Phase menstruelle\n(jours 1 à 5)",
          phase_1_5_desc:
            "C'est le début du cycle. Le corps se débarrasse de l'ancienne muqueuse utérine, d'où les saignements. Durant cette période, l'énergie peut être moindre, alors accorde-toi plus de repos.",
          phase_6_13: "Phase folliculaire\n(jours 6 à 13)",
          phase_6_13_desc:
            "Le taux d'œstrogène augmente progressivement, et avec lui reviennent la force et la motivation. C'est une bonne période pour les nouvelles idées, le travail actif et le sport.",
          phase_14_16: "Phase d'ovulation\n(jours 14 à 16)",
          phase_14_16_desc:
            "Un ovule mature est libéré. La femme peut se sentir confiante, attractive, pleine d'énergie. Ce sont les jours « de pic », où le corps est prêt pour la conception.",
          phase_17_28: "Phase lutéale\n(jours 17 à 28)",
          phase_17_28_desc:
            "Si la grossesse ne survient pas, la progestérone domine. Une somnolence, des sautes d'humeur, des envies de sucreries peuvent apparaître. Durant cette période, il est important de s'écouter, de se reposer davantage et de veiller à son confort émotionnel.",
          finalize_cycle:
            "Le cycle menstruel n'est pas un ennemi, mais un calendrier naturel de notre corps. Si tu écoutes ses phases, tu peux mieux planifier ta journée, comprendre les changements d'humeur et être plus en harmonie avec toi-même.",
          go_back: "Retour",
          now: "maintenant",
          menstruation: "règles",
          scheduled_menstruation: "règles prévues",
          ovulation: "ovulation",
          planned_ovulation: "ovulation prévue",
          ovulation_in: "ovulation dans",
          low_chance: "Faible chance de tomber enceinte",
          average_chance: "Chance moyenne de tomber enceinte",
          high_chance: "Forte chance de tomber enceinte",
          no_chance: "Très faible probabilité de tomber enceinte",
          myth_facts: "Mythes et faits",
          one: "jour",
          few: "jours",
          other: "jours",
          c_long: "Ton cycle a duré {{cLong}} jours. Ce qui est normal !",
          phase_1:
            "Tu es actuellement en phase menstruelle !\nC'est le début du cycle.\nTu peux manquer d'énergie !\nDurant cette période, mieux vaut prendre soin de toi et te reposer !",
          phase_2:
            "Tu es actuellement en phase folliculaire !\nL'hormone œstrogène augmente activement.\nTon humeur s'améliore. La peau s'améliore !\nTu es prête à conquérir le monde !",
          phase_3:
            "Tu es actuellement en phase d'ovulation !\nUn ovule mature est libéré.\nTu te sens confiante et pleine d'énergie !\nAujourd'hui est un jour merveilleux pour faire ce qui te procure de la joie !",
          phase_4:
            "Tu es actuellement en phase lutéale !\nLa progestérone commence à dominer !\nDurant cette période, des sautes d'humeur et de la somnolence peuvent survenir !\nPrends soin de ton confort et écoute tes sensations !",
          super: "Super !",
          gynecology_sub:
            "Tout sur les examens réguliers, la prévention, les soins de santé féminine — sans tabous, dans un langage simple.",
          womens_tests: "Examens et analyses",
          regular_review: "Examens réguliers",
          articles_: "Articles",
          read: "Lire",
          how_often: "À quelle fréquence\nconsulter\nun gynécologue ?",
          top_5_tests: "TOP 5 des analyses\npour la santé féminine",
          review_sub:
            "Prendre soin de sa santé commence par la prévention. Une fois par an — et tu as une longueur d'avance sur les problèmes.",
          what_to_check_regulary: "Que faire régulièrement ?",
          gynecology_review: "Examen gynécologique",
          one_time_per_year: "une fois par an",
          pap_test: "Frottis cervico-utérin",
          _2_3_time_per_year: "tous les 2-3 ans",
          blood_test: "Analyses de sang et d'urine",
          ultrasound_test: "Échographie pelvienne",
          if_need: "si nécessaire",
          mammography: "Mammographie",
          after_40_years: "après 40 ans",
          examination_head: "Examens et analyses",
          examination_desc:
            "Les bons tests au bon moment — la clé pour être serein(e) concernant sa santé. Découvre quelles analyses et examens faire régulièrement.",
          base_review: "Examen de base",
          gynecology_examination: "Examen gynécologique",
          add_to_calendar: "Ajouter au calendrier",
          ultrasound_glands: "Échographie mammaire",
          need_I_test: "Faut-il faire des analyses si je me sens bien ?",
          examination_tip_need:
            "Les examens médicaux réguliers sont importants, même en l'absence de symptômes. De nombreuses maladies se développent de manière asymptomatique aux premiers stades, et des analyses de base faites à temps (numération sanguine, urine, glycémie, cholestérol) aident à détecter les problèmes avant l'apparition des premiers signes.\n\nDes contrôles planifiés une fois par an – c'est un investissement dans ta santé. Ils permettent de surveiller l'état de ton organisme, d'ajuster ton alimentation et ton mode de vie en temps utile, et d'éviter les complications.\n\nTu te sens bien – c'est super, mais la prévention est toujours plus simple et moins coûteuse que le traitement.",
          what_needed_blood: "Que préparer avant une prise de sang ?",
          what_needed_blood_info:
            "Pour que ton analyse de sang soit précise, prépare-toi à l'avance :\n\nPrise de sang à jeun le dernier repas doit être pris 8 à 12 heures avant\n\n Bois uniquement de l'eau plate cela n'affecte pas les résultats\n\nÉvite l'alcool, les plats gras et très sucrés 1 à 2 jours avant\n\nLe jour du prélèvement, évite les efforts physiques intenses et le stress\n\nSi tu prends des médicaments, informe obligatoirement ton médecin",
          what_diff_ultrasound_mam:
            "Quelle est la différence entre une échographie et une mammographie ?",
          what_diff_ultrasound_mam_info:
            "L'échographie utilise des ondes sonores pour visualiser les tissus et montre bien les structures molles du sein, particulièrement chez les jeunes femmes ayant un tissu mammaire dense\n\nLa mammographie est un examen radiographique qui permet de détecter de fines microcalcifications et des signes précoces de tumeurs, avant même que des nodules ne soient palpables\n\nL'échographie n'utilise pas de rayonnement et convient pour un contrôle complémentaire\nLa mammographie reste la méthode de dépistage principale pour les femmes de plus de 40 ans\n\nLes deux méthodes sont souvent combinées pour un diagnostic plus précis",
          why_pap_test:
            "À quoi sert le frottis cervico-utérin (test PAP) et à quelle fréquence ?",
          why_pap_test_info:
            "Le frottis cervico-utérin ou test PAP aide à détecter les modifications des cellules du col de l'utérus à un stade précoce, lorsqu'il n'y a encore aucun symptôme\n\nDes examens réguliers permettent de prévenir le développement d'un cancer et de traiter à temps les processus inflammatoires\n\nEn général, le test PAP est effectué une fois par an en l'absence de problèmes, ou plus souvent sur recommandation du médecin\n\nL'examen est rapide, indolore et ne prend que quelques minutes\n\nMême si tu te sens bien, le test t'aide à prendre soin de ta santé",
          reproductive: "Santé reproductive",
          reproductive_sub:
            "Planifie avec nous ! Prends soin de ton corps et planifie ton avenir en toute confiance.",
          myth_main: "Il existe une tonne de mythes autour des règles.",
          myth_sub: "Voici une petite sélection pour toi)",
          cant_sport: "On ne peut pas faire de sport pendant les règles",
          cant_sport_desc:
            "En réalité, une activité physique légère, comme le yoga, la marche ou même un entraînement modéré, peut soulager les crampes et améliorer l'humeur.",
          c_long_: "Le cycle dure toujours exactement 28 jours",
          c_long_desc:
            "Le cycle est propre à chaque personne : un intervalle d'environ 21 à 35 jours est considéré comme normal.",
          cant_swim:
            "On ne peut pas se baigner ou prendre un bain pendant les règles",
          cant_swim_desc:
            "Se baigner et se doucher est sans danger. Les produits d'hygiène (tampons, coupes menstruelles) permettent de nager confortablement et de maintenir la propreté.",
          cant_get_pregnant:
            "On ne peut pas tomber enceinte pendant les règles",
          cant_get_pregnant_desc:
            "La probabilité est plus faible, mais pas nulle : les spermatozoïdes peuvent survivre dans le corps plusieurs jours, et l'ovulation peut parfois survenir plus tôt ou plus tard que prévu.",
          pain_is_ok: "Les douleurs menstruelles sont toujours normales",
          pain_is_ok_desc:
            "Un léger inconfort est typique, mais une douleur intense ou épuisante peut indiquer une endométriose ou d'autres maladies, et il vaut mieux consulter un médecin.",

          // === SANTÉ MENTALE ===
          your: "Ta santé",
          breathing: "Exercices de respiration",
          diaphragmatic: "Respiration diaphragmatique",
          square: "Respiration carrée",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "Test d'état",
          articles: "Articles utiles",

          // === MENU SANTÉ ===
          hmp_your_health: "Ta santé",
          hmp_mental_health: "Santé mentale",

          // === ARTICLES SANTÉ MENTALE ===
          mp_articles_title: "Articles utiles",
          mp_article_1:
            "10 techniques simples pour réduire le stress quotidien",
          mp_article_2: "Comment gérer l'anxiété",
          mp_article_3: "Exercices de respiration pour la relaxation",
          mp_article_4: "Sommeil sain et santé mentale",
          mp_article_5: "Méditation pour débutants",
          mp_article_6: "Comment améliorer l'estime de soi",
          mp_article_7:
            "Méthodes efficaces pour lutter contre l'épuisement professionnel",
          mp_article_content_1: 
            `
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
          mp_article_content_2: 
            `
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
          mp_article_content_3: 
            `
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
          mp_article_content_4: 
            `
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
          mp_article_content_5: 
            `
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
          mp_article_content_6: 
            `
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
          mp_article_content_7: 
            `
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
          m_long: "Durée des menstruations (jours)",
          c_long_wh: "Durée du cycle",

          // === JOURNAL DES ÉMOTIONS ===
          mp_aew_notes: "Note",
          mp_aew_describe_your_feelings:
            "Décris tes sensations plus en détail...",
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
          mp_aew_terribly: "Terrible",
          mp_aew_isolation: "Isolement",
          mp_aew_depression: "Dépression",
          mp_aew_envy: "Envie",
          mp_aew_deep_sorrow: "Profonde tristesse",
          mp_aew_shame: "Honte",
          mp_aew_despair: "Désespoir",
          mp_aew_loneliness: "Solitude",
          mp_aew_hopelessness: "Désespoir",
          mp_aew_self_directed_aggression: "Agressivité envers soi-même",
          mp_aew_сool: "Cool",
          mp_aew_energy: "Énergie",
          mp_aew_satisfaction: "Satisfaction",
          mp_aew_connection: "Sentiment de lien",
          mp_aew_comfort: "Confort",
          mp_aew_love: "Amour",
          mp_aew_motivation: "Motivation",
          mp_aew_determination: "Détermination",
          mp_aew_respect: "Respect",
          mp_aew_friendship: "Amitié",
          mp_aew_good: "Bien",
          mp_aew_in_the_flow: "Dans le flow",
          mp_aew_pride: "Fierté",
          mp_aew_inspiration: "Inspiration",
          mp_aew_hope: "Espoir",
          mp_aew_optimism: "Optimisme",
          mp_aew_confidence: "Confiance",
          mp_aew_joy: "Joie",
          mp_aew_gratitude: "Gratitude",
          mp_aew_openness: "Ouverture",
          mp_aew_great: "Génial",
          mp_aew_bliss: "Béatitude",
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
          mp_aew_wizard_title_step_3: "Veux-tu écrire quelque chose sur",
          mp_aew_wizard_description_step_3:
            "Ta note est privée et visible uniquement par toi.",
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

          // === EXERCICES DE RESPIRATION ===
          mp_bpp_title: "Exercices de respiration",
          mp_bpp_subtitle: "Expire le stress — inspire le calme 🌿",
          mp_bpp_description_1:
            "Des exercices de respiration simples aident à relâcher les tensions, à retrouver de l'énergie et à clarifier l'esprit. Tu peux commencer n'importe où : à la maison, au travail ou même dans les transports.",
          mp_bpp_description_2:
            "Essaie — et sens ton corps se détendre et ton humeur s'alléger.",
          mp_bpp_card_title_1: "Respiration diaphragmatique",
          mp_bpp_card_description_1_1: "Réduit le stress et l'anxiété.",
          mp_bpp_card_description_1_2: "Détend, soulage les tensions.",
          mp_bpp_card_title_2: "Respiration carrée",
          mp_bpp_card_description_2_1:
            "Soulage l'anxiété et aide à se concentrer.",
          mp_bpp_card_title_3: "Nadi Shodhana",
          mp_bpp_card_description_3_1: "Respiration alternée par les narines.",
          mp_bpp_card_description_3_2: "Aide à réduire le stress.",
          mp_bpp_card_description_3_3: "Rétablit l'équilibre intérieur.",

          // === RESPIRATION DIAPHRAGMATIQUE ===
          mp_dbp_title: "Respiration diaphragmatique",
          mp_dbp_subtitle: "Une respiration qui ramène le calme",
          mp_dbp_description_1_1:
            "Assieds-toi confortablement. Détends tes épaules. Pratique pendant au moins 3 à 5 minutes.",
          mp_dbp_description_1_2:
            "Reviens à la respiration dès que tu sens une tension.",
          mp_dbp_inhale: "INSPIRE",
          mp_dbp_hold: "MAINTIENS",
          mp_dbp_exhale: "EXPIRE",
          mp_dbp_come_on_more: "ALLEZ, ENCORE",

          // === JOURNAL DES ÉMOTIONS ===
          mp_ebp_title: "Journal des émotions",
          mp_ebp_factor_title: "Facteurs d'humeur",
          mp_ebp_factor_info_p_1:
            "Tous les facteurs - tes déclencheurs potentiels.",
          mp_ebp_factor_info_p_2:
            "Par exemple, tu pourrais ne pas remarquer que le sport, le café ou les drogues influencent ton humeur et forment des schémas comportementaux.",
          mp_ebp_factor_info_p_3:
            "Tu pourras suivre l'influence des facteurs sur ton bien-être plus tard dans la section analyse.",
          mp_ebp_factor_info_p_4: "Exemple",
          mp_ebp_factor_info_p_5: "Alimentation et stimulants :",
          mp_ebp_factor_info_p_6:
            "Note ta consommation de café, de vitamines ou d'aliments qui pourraient affecter ton niveau d'énergie.",
          mp_ebp_factor_info_p_7: "Activité et exercice physique :",
          mp_ebp_factor_info_p_8:
            "Suis la quantité d'exercice physique ou la participation à d'autres formes d'activité physique.",
          mp_ebp_factor_info_p_9: "Cycles biologiques :",
          mp_ebp_factor_info_p_10:
            "En suivant tes règles, tu pourras comprendre comment elles affectent ton bien-être émotionnel.",
          mp_ebp_selected_factors: "Facteurs sélectionnés :",
          mp_ebp_available_factors: "Facteurs disponibles :",
          mp_ebp_hello_how_are_you: "Salut ! Comment vas-tu ?",
          mp_ebp_factor: "Facteurs",
          mp_ebp_add_factor: "Ajouter un facteur",

          // === ACCUEIL SANTÉ MENTALE ===
          mp_mhp_title: "Ton calme commence ici.",
          mp_mhp_sub_title:
            "Nous avons rassemblé des outils qui aident à rester équilibré même les jours les plus stressants.",
          mp_mhp_test_card_title: "Tests d'état",
          mp_mhp_test_card_btn_text: "Faire le test",
          mp_mhp_breathing_card_title: "Exercices de respiration",
          mp_mhp_breathing_card_btn_text: "Choisir un exercice",
          mp_mhp_articles_card_title: "Articles utiles",
          mp_mhp_articles_card_btn_text: "Voir les articles",
          mp_mhp_choose_specialist: "Choisir un expert",

          // === TEST D'ÉTAT ===
          mp_mtp_test_data_question_1: "Comment te réveilles-tu le matin ?",
          mp_mtp_test_data_answers_1_1: "Avec enthousiasme et des projets",
          mp_mtp_test_data_answers_1_2: "Avec un verre d'eau et un gros soupir",
          mp_mtp_test_data_answers_1_3: "« Quoi, encore cette journée ? »",
          mp_mtp_test_data_question_2:
            "Quand quelque chose ne va pas, ta réaction est :",
          mp_mtp_test_data_answers_2_1:
            "Ok, je vais trouver comment arranger ça",
          mp_mtp_test_data_answers_2_2: "Bon, c'est la vie",
          mp_mtp_test_data_answers_2_3:
            "Tout est perdu, je vais dans mon plaid",
          mp_mtp_test_data_question_3:
            "Qu'est-ce qui te sauve le plus souvent du stress ?",
          mp_mtp_test_data_answers_3_1: "Le sport ou une promenade",
          mp_mtp_test_data_answers_3_2:
            "La nourriture, les séries ou les memes",
          mp_mtp_test_data_answers_3_3: "Je reste juste prostré(e) sans force",
          mp_mtp_test_data_question_4:
            "Ta sensation d'énergie ces derniers temps :",
          mp_mtp_test_data_answers_4_1: "Normal, la batterie tient",
          mp_mtp_test_data_answers_4_2: "Comme une batterie à 30%",
          mp_mtp_test_data_answers_4_3:
            "Comme un téléphone qui s'éteint dans le froid",
          mp_mtp_test_data_question_5:
            "Que penses-tu quand tu entends le mot « repos » ?",
          mp_mtp_test_data_answers_5_1: "Je planifie quelque chose d'agréable",
          mp_mtp_test_data_answers_5_2: "Rester à la maison et ne rien faire",
          mp_mtp_test_data_answers_5_3: "Je n'ai pas le temps de me reposer",
          mp_mtp_test_result_title_1: "Ta santé mentale va bien.",
          mp_mtp_test_result_description_1:
            "Tu as un excellent niveau d'énergie et d'optimisme. Continue de prendre soin de toi et maintiens cet état !",
          mp_mtp_test_result_title_2: "Ta santé mentale est globalement bonne.",
          mp_mtp_test_result_description_2:
            "La plupart des choses vont bien, mais certains domaines nécessitent un peu plus d'attention et de soin.",
          mp_mtp_test_result_title_3: "Ta santé mentale est un peu épuisée",
          mp_mtp_test_result_description_3:
            "Tu ressens une légère fatigue. Trouve du temps pour te reposer et de petits plaisirs.",
          mp_mtp_test_result_title_4: "Ta santé mentale demande des soins",
          mp_mtp_test_result_description_4:
            "Tu as besoin de plus de repos, de joie et de soutien. Porte attention à tes besoins.",
          mp_mtp_test_result_title_5: "Ta santé mentale crie SOS",
          mp_mtp_test_result_description_5:
            "Tu pourrais être en burn-out. N'hésite pas à demander de l'aide et trouve du temps pour un repos sérieux.",
          mp_mtp_test_result_title_6:
            "Ta santé mentale est comme des montagnes russes.",
          mp_mtp_test_result_description_6:
            "Ton état change souvent. Certains jours sont géniaux, d'autres - plus difficiles. Essaie de trouver un équilibre.",
          mp_mtp_start_message:
            "Attention ! Le test n'a pas de valeur diagnostique, mais il indique ton niveau de stress ou d'épuisement.",
          mp_mtp_test_title: "Test sur l'état de ta santé mentale",
          mp_mtp_test_description:
            "Clique sur les réponses qui correspondent à ton état)",

          // === NADI SHODHANA ===
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "Une respiration qui équilibre l'énergie",
          mp_nsp_description_1:
            "Technique de respiration alternée par les narines pour harmoniser l'esprit et le corps.",
          mp_nsp_description_2:
            "Pratique pendant 3 à 5 minutes pour obtenir l'effet.",
          mp_nsp_technique_title: "Technique :",
          mp_nsp_technique_step_1: "Assieds-toi confortablement, le dos droit.",
          mp_nsp_technique_step_2:
            "De la main, bouche la narine droite, inspire par la gauche.",
          mp_nsp_technique_step_3:
            "Puis bouche la gauche — expire par la droite.",
          mp_nsp_technique_step_4:
            "Inspire par la droite — expire par la gauche.",
          mp_nsp_technique_step_5:
            "Continue pendant plusieurs minutes à un rythme calme.",
          mp_nsp_result_title: "Résultat :",
          mp_nsp_result_description_1:
            "Déjà après quelques minutes, une sensation de calme apparaît. Le niveau de tension diminue. L'esprit s'éclaircit, comme après un court repos.",
          mp_nsp_result_description_2:
            "Une pratique régulière aide à mieux s'endormir, à se concentrer et à préserver l'équilibre intérieur même dans des situations stressantes.",

          // === RESPIRATION CARRÉE ===
          mp_sbp_title: "Respiration carrée",
          mp_sbp_subtitle: "Une respiration qui ramène le calme",
          mp_sbp_description_1:
            "Assieds-toi confortablement. Détends tes épaules. Pratique pendant au moins 3 à 5 minutes.",
          mp_sbp_description_2:
            "Reviens à la respiration dès que tu sens une tension.",

          // === TA SANTÉ ===
          mp_yhp_main_title: "Ta santé —",
          mp_yhp_main_subtitle:
            "Ton super-pouvoir. Elle repose sur 3 piliers :",
          mp_yhp_activity_title: "Activité",
          mp_yhp_activity_description_1:
            "Même 15 minutes par jour font la différence.",
          mp_yhp_activity_description_2:
            "Marche, corde à sauter, Pilates – choisis ce que tu aimes, et ton corps te remerciera.",
          mp_yhp_sleep_title: "Sommeil",
          mp_yhp_sleep_description_1: "C'est le plus important !",
          mp_yhp_sleep_description_2:
            "Le sommeil n'est pas de la paresse, mais ton câble de recharge interne. 7 à 8 heures de repos de qualité aident le corps à récupérer et le cerveau à travailler vite et de manière créative.",
          mp_yhp_nutrition_title: "Alimentation",
          mp_yhp_nutrition_description_1:
            "La nourriture, c'est du carburant. Plus il est de qualité, mieux ton « moteur » fonctionne.",
          mp_yhp_nutrition_description_2:
            "Il ne s'agit pas de régimes, mais d'équilibre : plus de légumes, moins de stress avec les grignotages.",

          // === SANTÉ MASCULINE ===
          hormonas_diagram: "Graphique de santé masculine",
          mp_male_health: "Santé masculine",
          mp_subtitle_1: "Être un homme, c'est aussi prendre soin de sa santé",
          mp_hormones_block_title: "Hormones",
          mp_hormones_block_content_label_1: "Niveau de testostérone",
          mp_hormones_block_content_value_1_1: "norme 300-1000 ng/dl",
          mp_hormones_block_content_label_2: "Signes de carence",
          mp_hormones_block_content_value_2_1: "fatigue",
          mp_hormones_block_content_value_2_2: "baisse de la libido",
          mp_hormones_block_content_value_2_3:
            "diminution de la masse musculaire",
          mp_hormones_block_content_label_3: "Que faire ?",
          mp_hormones_block_content_value_3_1: "analyses régulières",
          mp_hormones_block_content_value_3_2: "entraînement musculaire",
          mp_hormones_block_content_value_3_3: "sommeil de qualité",
          mp_hormones_block_content_value_3_4: "moins de stress",
          mp_add_hormones_data: "Saisir les indicateurs",
          mp_analyses_block_title: "Analyses et prévention",
          mp_analyses_block_content_label_1:
            "Numération sanguine et analyse d'urine",
          mp_analyses_block_content_value_1: "annuellement",
          mp_analyses_block_content_label_2: "Profil hormonal",
          mp_analyses_block_content_value_2: "si nécessaire",
          mp_analyses_block_content_label_3: "PSA",
          mp_analyses_block_content_value_3: "après 40 ans",
          mp_analyses_block_content_label_4: "Échographie pelvienne",
          mp_analyses_block_content_value_4: "tous les 1-2 ans",
          mp_analyses_block_content_label_5: "Profil hormonal",
          mp_analyses_block_content_value_5: "sur recommandation du médecin",
          mp_reproductive_block_title: "Santé reproductive",
          mp_reproductive_block_content_label_1: "Fertilité",
          mp_reproductive_block_content_value_1:
            "la qualité du sperme dépend du mode de vie",
          mp_reproductive_block_content_label_2: "Risques",
          mp_reproductive_block_content_value_2:
            "surchauffe, alcool, tabagisme, obésité",
          mp_reproductive_block_content_label_3: "Recommandations",
          mp_reproductive_block_content_value_3: "Urologue 1/an, spermogramme",
          mp_urinary_block_title: "Système urinaire",
          mp_urinary_block_content_label_1: "Contrôle de la prostate",
          mp_urinary_block_content_value_1:
            "à partir de 40 ans — PSA et échographie 1/an",
          mp_urinary_block_content_label_2: "Alerte !",
          mp_urinary_block_content_value_2:
            "douleur, sang dans les urines, mictions fréquentes",
          mp_urinary_block_content_label_3: "Que faire ?",
          mp_urinary_block_content_value_3:
            "ne supporte pas l'inconfort, cours chez l'urologue",
          mp_potency_block_title: "Puissance",
          mp_potency_block_content_label_1: "Pourquoi diminue-t-elle ?",
          mp_potency_block_content_value_1:
            "stress, alcool, tabagisme, maladies cardiaques",
          mp_potency_block_content_label_2: "Comment la soutenir ?",
          mp_potency_block_content_value_2:
            "sport, sommeil de qualité, alimentation équilibrée",
          mp_potency_block_content_label_3: "Quand consulter ?",
          mp_potency_block_content_value_3:
            "si les problèmes durent plus de 2 mois",
          mp_subtitle_2: "Prends soin de toi comme de ta voiture préférée",
          mp_form_subtitle:
            "Remplis les champs si tu as des données actuelles, et nous établirons ton graphique",
          mp_form_testosterone: "Testostérone",
          mp_form_free_testosterone: "Testostérone libre",
          mp_form_free_testosterone_2: "T libre",
          mp_form_prolactin: "Prolactine",
          mp_form_estradiol: "Estradiol",
          mp_form_lh: "LH (hormone lutéinisante)",
          mp_form_lh_2: "LH",
          mp_form_fsh: "FSH",
          mp_form_ng_dl: "ng/dl",
          mp_form_ng_ml: "ng/ml",
          mp_form_pg_ml: "pg/ml",
          mp_form_mO_l: "mU/l",
          mp_form_save_btn: "Sauvegarder les indicateurs",
          mp_diagram_hormons_value_not_found:
            "Aucune donnée hormonale trouvée. Merci de saisir tes indicateurs.",
          mp_diagram_hormons_data_not_found:
            "Erreur lors du chargement des données. Contacte le support technique.",
          mp_diagram_low: "Faible",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "Élevé",          calendar: "Calendrier",
          calendar_info: "Votre meilleur calendrier",
          create_event: "Créer",

          before_5: "Dans 5 minutes",
          before_10: "Dans 10 minutes",
          sign_for_doctor: "Rendez-vous chez le médecin",
          sure_to_delete_event: "Êtes-vous sûr de vouloir supprimer l’événement ?",
          notification: "Rappel",
          task: "Tâche",
          meeting: "Réunion",
          choose_date: "Choisir une date",
          choose_time: "Choisir l’heure",
          choose_end_time: "Choisir l’heure de fin",
          my_tasks: "Mes tâches",
          invite_friend: "Inviter un ami",
          link: "Lien",
          add_title: "Ajouter un titre",
          go_to_main_page: "MAISON",

          // === Premium ===
          sp_you_already_have_active_subscription: "Vous avez déjà un abonnement actif",
          sp_please_login: "Veuillez vous connecter",
          sp_active: "Actif",
          sp_expired: "Expiré",
          sp_cancelled: "Annulé",
          sp_basic_title: "Basique",
          sp_duration: "/ 30 jours",
          sp_basic_features_1: "Suiveurs",
          sp_basic_features_2: "Analyse de base",
          sp_premium_title: "Premium",
          sp_premium_features_1: "Cours",
          sp_premium_features_2: "Plans personnalisés",
          sp_family_title: "Famille",
          sp_family_features_1: "Toutes les fonctionnalités Premium",
          sp_family_features_2: "Accès pour jusqu’à 3 utilisateurs",
          sp_loading: "Chargement...",
          sp_subscription_title: "Investissez en vous-même",
          sp_subscription_sub_title: "Votre meilleur projet, c’est vous. Réalisons-le ensemble.",
          sp_subscription_history_label: "Historique des abonnements",
          sp_subscription_history_loading: "Chargement de l’historique...",
          sp_subscription_history_price: "Gratuit",
          sp_subscription_family_title: "Utilisateurs ajoutés",
          sp_subscription_family_date: "ajouté",
          sp_subscription_history_empty: "Vous n’avez pas encore d’historique d’abonnement",
          sc_processing: "Traitement...",
          sc_select: "Sélectionner",

          // === Subscription Payment ===
          spp_please_input_correct_email: "Veuillez saisir des adresses e-mail valides",
          spp_uncnown_subsription_type: "Type d’abonnement inconnu. Veuillez réessayer.",
          spp_family_sub: "Abonnement familial",
          spp_add_email_addresses_of_family_members: "Ajoutez les adresses e-mail des membres de la famille (jusqu’à 3 personnes)",
          spp_go_to_payment: "Aller au paiement",

          // === Subscription Details ===
          sdp_already_have_active_sub: "a déjà un abonnement actif",
          sdp_already_a_member_of_another_family_subscription: "est déjà membre d’un autre abonnement familial",
          sdp_this_is_the_subscription_owner: "c’est le propriétaire de l’abonnement",
          sdp_user_not_found: "Utilisateur non trouvé",
          sdp_some_users_could_not_be_added: "Certains utilisateurs n’ont pas pu être ajoutés",
          sdp_family_member_list_successfully_updated: "Liste des membres de la famille mise à jour avec succès !",
          sdp_error_updating_family_users: "Erreur lors de la mise à jour des utilisateurs familiaux : ",
          sdp_subscription_not_found: "Abonnement introuvable",
          sdp_return_to_tariffs: "Retour aux tarifs",
          sdp_your_current_subscription: "Votre abonnement actuel",
          sdp_subscription_type: "Type d’abonnement",
          sdp_subscription_status: "Statut",
          sdp_subscription_start_date: "Date de début",
          sdp_subscription_end_date: "Valide jusqu’au",
          sdp_subscription_price: "Prix",
          sdp_subscription_section_content: "Accès familial",
          sdp_subscription_detail_label: "Type d’accès",
          sdp_subscription_detail_value: "Membre de la famille",
          sdp_subscription_section_content_title: "Membres de la famille",
          sdp_subscription_member_added: "Ajouté",
          sdp_subscription_renew_btn: "Renouveler l’abonnement",
          sdp_subscription_manage_family_btn: "Gérer les membres de la famille",
          sdp_family_modal_instruction: "Ajoutez ou supprimez des adresses e-mail de membres de la famille",
          sdp_sub_saving: "Enregistrement...",
          sdp_family_member_email: "E-mail du membre de la famille",
          payment: "Paiement",
          details: "Détails",

          // === Success Payment ===
          ps_payment_success_main_title: "SUPER",
          ps_payment_success_title: "PAIEMENT RÉUSSI",
          ps_payment_success_description: "Le reçu de paiement a été envoyé à votre e-mail",
          ps_payment_success_btn: "Accueil",

          // Marketplace
          sport_eating: "Nutrition sportive",
          sport_cloth: "Vêtements de sport",
          sport_gadgets: "Gadgets",
          sport_other: "Autre",
          marketplace_filter: "Filtre",
          brand: "Marque",
          from: "De",
          to: "À",
          one_thing: "pcs",
          put_in_cart: "Ajouter au panier",
          already_in_cart: "Déjà dans le panier",
          similar_products: "Produits similaires",
          basket_marketplace: "Panier",
          sure_to_delete_product_from_cart: "Êtes-vous sûr de vouloir supprimer ce produit du panier ?",
          product: "Produit",
          amount_marketplace: "Quantité",
          my_order: "Ma commande",
          marketplace_total: "Total",
          order_details: "Détails",
          to_payment: "Vers le paiement",
          order_sum: "Montant",
          delivery: "Livraison",
          post_index: "Code postal",
          shopping_cart: "Panier",

        },
      },
      es: {
        translation: {
          // === TRADUCCIONES PRINCIPALES DE LA PLATAFORMA ===
          about_platform: "Acerca de la plataforma",
          functions: "Funciones",
          prices: "Precios",
          marketplace: "Marketplace",
          questions: "Preguntas",
          language_selector: "Idioma",
          balance_action: "Equilibrio en acción",
          less_chaos: "MENOS CAOS –",
          more_energy: "MÁS ENERGÍA.",
          healthy_lifestyle: "TU ESTILO DE VIE SALUDABLE EN UN SOLO LUGAR.",
          register: "Registrarse",
          description_part1:
            " es una plataforma que te ayuda a cuidarte fácilmente y con una sonrisa.",
          description_part2:
            "Controla tu alimentación y entrenamientos, monitorea tu salud y recibe apoyo de especialistas.",
          description_part3:
            "Encuentra productos útiles y comparte tu motivación con la comunidad.",
          description_part4:
            "Junto con Nomyfy, desarrollas hábitos saludables paso a paso y te sientes mejor cada día.",

          // === SECCIÓN DE EXPERTOS ===
          specialist_title_line1: "¡TU TALENTO ES NECESARIO AQUÍ!",
          specialist_title_line2: "¡BUSCAMOS PROFESIONALES COMO TÚ!",
          specialist_text_line1:
            "Si eres especialista en psicología, nutrición o eres entrenador,",
          specialist_text_line2:
            "hagamos este mundo mejor. Trabajar con profesionales.",
          specialist_text_line3: "¡Eres para nosotros!",
          become_specialist: "Convertirse en especialista",

          // === MARKETPLACE ===
          marketplace_title: "MARKETPLACE DE SOLUCIONES SALUDABLES.",
          marketplace_subtitle:
            "Todo lo que ayuda a vivir saludablemente reunido en un solo lugar.",
          marketplace_button: "Marketplace",

          // === PREGUNTAS FRECUENTES ===
          faq_title: "Preguntas frecuentes",
          faq_q1_title: "¿Qué es NOMYFY?",
          faq_q1_answer:
            "NOMYFY es terapia individual para el agotamiento emocional.",
          faq_q2_title: "¿Para quién es NOMYFY?",
          faq_q2_answer:
            "Para quienes buscan formas de mejorar su salud mental.",
          faq_q3_title: "¿Qué beneficios tiene NOMYFY?",
          faq_q3_answer:
            "NOMYFY ayuda a poner orden en tu vida, empezando por ti mismo.",
          faq_q4_title: "¿Se pueden usar los servicios gratuitamente?",
          faq_q4_answer:
            "Sí, tenemos opciones gratuitas, pero la mayoría de servicios son de pago.",
          faq_q5_title: "¿Cómo empezar?",
          faq_q5_answer:
            "Debes registrarte en nuestra plataforma y elegir un servicio.",
          faq_q6_title: "¿Cómo ser partner de NOMYFY?",
          faq_q6_answer:
            "Deja una solicitud en nuestro sitio y nos contactaremos contigo.",

          // === PIE DE PÁGINA ===

          specialists: "Especialistas",
          privacy_policy: "Política de privacidad",
          support_service: "Servicio de soporte",
          copyright: "© Nomyfy {{year}}.",

          // === INICIO DE SESIÓN ===
          login1: "INICIAR SESIÓN",
          password: "contraseña",
          forgot_password: "¿olvidaste la contraseña?",
          login2: "Iniciar sesión",
          no_profile: "¿No tienes perfil? ",
          register2: "Registro",

          // === REGISTRO ===
          continue: "Continuar",
          reg_success: "registro exitoso",
          start: "Comenzar",
          reg_top: "REGISTRO",
          success: "EXITOSO",
          or: "o",
          code_create_error: "Error al crear el código de confirmación",
          code_error: "Código de confirmación incorrecto",
          check_email: "por favor verifica tu correo electrónico",
          code_send: "el código fue enviado a ",
          send_code: "enviar código ",
          send_code_again: "el código se reenviará en ",
          confirm: "Confirmar",
          password_new: "nueva contraseña",

          // === RESTABLECIMIENTO DE CONTRASEÑA ===
          enter_email_to_restore: "ingresa tu e-mail para enviar un código",
          send_code2: "Enviar código",
          reset_password: "restablecimiento de contraseña",
          password_confirm: "confirmación de contraseña",
          update_password: "Actualizar contraseña",
          password_update_success: "contraseña actualizada exitosamente",
          to_login: "Volver al inicio de sesión",
          user_not_exist: "El usuario con este email no existe",
          reset_password_error:
            "Error al restablecer la contraseña. Inténtalo de nuevo.",
          user_exist: "Ya existe un usuario con este email",
          auth_fail: "Error de autenticación. Verifica tus datos.",

          // === MENÚ ===
          dashboard: "Inicio",
          profile: "Perfil",
          health: "Salud",
          eating: "Alimentación",
          workout: "Entrenamiento",
          social: "Comunidad",
          marketplace_menu: "Marketplace",
          premium: "Premium",
          exit: "Cerrar sesión",
          search_placeholder: "Buscar",
          welcome: "Hola",

          health_one_place: "¡Tu salud en un solo lugar!",
          mental: "Salud mental",

          // === WIDGETS DEL TABLERO ===

          kkal: "Calorías",
          current_week: "Semana actual",
          water: "Agua",
          L: "L",
          sleep: "Sueño",
          H: "H",
          bmi: "IMC",
          bmi_requires: "Por favor ingresa información sobre tu altura y peso",

          // === PERFIL DE USUARIO ===
          p_error_upadate:
            "No se pudo actualizar el perfil. Por favor completa todos los campos.",
          p_male: "Hombre",
          p_female: "Mujer",
          p_other: "Otro",
          p_success_title: "¡Gracias por la información!",
          p_success_subtitle: "¡Ahora nuestros consejos serán aún mejores!",
          p_btn_home: "Al inicio",
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
          p_specialist_profile: "Perfil especialista",
          specialist_profile: "Perfil especialista",
          specialist_type: "Tipo de especialista",
          user_name: "Nombre de usuario",
          back_to_profile: "Volver al perfil",
          specialist_profile_description: "Esta es su página de perfil de especialista donde puede gestionar su información profesional.",
          
          // Specialist Profile Page
          sp_hourly_rate: "Tarifa por hora",
          sp_experience: "Experiencia (años)",
          sp_license_number: "Número de licencia profesional",
          sp_website: "Sitio web del especialista",
          sp_instagram: "Instagram",
          sp_skills: "Habilidades",
          sp_add_skill: "Agregar habilidad",
          sp_certificates: "Certificados",
          sp_add_certificate: "Agregar certificado",
          sp_save: "Guardar",
          sp_saving: "Guardando...",
          sp_profile_toggle: "Perfil especialista",
          sp_save_success: "¡Datos guardados exitosamente!",
          sp_save_error: "Error al guardar los datos:",
          sp_hourly_rate_placeholder: "Ingrese la tarifa por hora",
          sp_experience_placeholder: "Ingrese años de experiencia",
          sp_license_number_placeholder: "Ingrese el número de licencia",
          sp_website_placeholder: "Ingrese la URL del sitio web",
          sp_instagram_placeholder: "Ingrese el nombre de usuario de Instagram",
          sp_certificate_placeholder: "Ingrese el nombre del certificado",
          sp_add_skill_placeholder: "Agregar habilidad...",
          sp_add_button: "Agregar",
          sp_cancel_button: "Cancelar",
          // Skills translations
          skill_powerlifting: "Powerlifting",
          skill_strength_training: "Entrenamiento de fuerza",
          skill_nutrition_correction: "Corrección nutricional",
          skill_stretching: "Estiramiento",
          skill_cardio_training: "Entrenamiento cardiovascular",
          skill_children_fitness: "Fitness para niños",
          skill_rehabilitation_exercises: "Ejercicios de rehabilitación",
          skill_client_motivation: "Motivación de clientes",
          skill_individual_programs: "Programas individuales",
          skill_group_classes: "Clases grupales",
          upload_photo: "Subir foto",
          uploading: "Subiendo...",
          download: "Descargar",
          remove: "Eliminar",
          p_specialist_profile: "Spezialistenprofil",
          p_profile_incomplete_alert: "Por favor, completa tu perfil de usuario",

          // === CALENDARIO (CUMPLEAÑOS) ===
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
          p_saturday: "sá",
          p_sunday: "do",

          // === PAÍSES ===
          p_ukrain_country: "Ucrania",
          p_great_britain_country: "Gran Bretaña",
          p_germany_country: "Alemania",
          p_france_country: "Francia",
          p_spain_country: "España",
          p_usa_country: "EE.UU.",

          // --- Traducciones para Especialistas
          filter_speciality: "Especialización",
          filter_mode: "En línea/Presencial",
          filter_experience: "Experiencia",
          filter_price: "Precio",

          spec_psychologist: "Psicólogo",
          spec_doctor: "Médico",
          spec_trainer: "Entrenador",
          spec_dietitian: "Nutricionista",

          mode_online: "Solo en línea",
          mode_offline: "Solo presencial",
          mode_hybrid: "En línea / Presencial",
          select_city: "Ubicaciones",

          experience_1: "Hasta 1 año",
          experience_3: "Desde 3 años",
          experience_5: "Desde 5 años",
          experience_10: "Desde 10 años",

          price_50: "hasta 50 $/hora",
          price_75: "de 50 a 75 $/hora",
          price_100: "de 75 a 100 $/hora",
          price_150: "de 100 a 150 $/hora",
          hourly_rate_title: "$/hora",

          clear_option: "Borrar",
          clear_filter: "Borrar filtro",
          unknown_specialist: "Especialista desconocido",
          top_5: "TOP - 5",
          subscribe: "Suscribirse",
          no_specialists_found: "No se encontraron especialistas",
          recomend: "¡Recomendado!",
          join_team: "¡Únete a nuestro equipo!",

          // Additional translations
          tariffs: "Tarifas",
          reviews: "Reseñas",
          choose: "Elegir",

          // Plan features translations
          plan_start_30_title: "Start 30",
          plan_result_30_title: "Result 30", 
          plan_vip_30_title: "VIP 30",
          plan_duration: "/ 30 días",
          plan_start_30_price: "12 EUR",
          plan_result_30_price: "38 EUR",
          plan_vip_30_price: "102 EUR",
          plan_feature_1: "Plan de entrenamiento individual (2-3 días/semana)",
          plan_feature_2: "Sugerencias nutricionales",
          plan_feature_3: "1 consulta en línea por semana",
          plan_feature_4: "Plan de entrenamiento + dieta detallada",
          plan_feature_5: "Correcciones semanales + análisis de video de la técnica",
          plan_feature_6: "Soporte en mensajería 5/7",
          plan_feature_7: "Gestión completa en línea",
          plan_feature_8: "12 entrenamientos por mes",
          plan_feature_9: "Análisis nutricional y recomendaciones individuales",
          plan_feature_10: "Soporte completo en mensajería",
          
          // === ENLACES ===
          diary: "Diario de emociones",
          article_1: "10 técnicas simples para reducir el estrés diario",
          article_2: "Métodos efectivos para manejar la ansiedad",
          article_3: "Técnicas de respiración para relajación",
          article_4: "La conexión entre sueño y salud mental",
          article_5: "Bases de meditación para principiantes",
          article_6: "Estrategias para mejorar la autoestima",
          article_7: "Prevención y superación del agotamiento",

          nt_tracker_tab: "Seguimiento de Nutrición",
          nt_recipes_tab: "Recetas",
          nt_date_label: "Fecha",
          nt_calories_label: "Calorías",
          nt_kcal_abbr: "kcal",
          nt_protein_label: "Proteínas",
          nt_g_abbr: "g",
          nt_meals_title: "Comidas",
          nt_add_meal_button: "Agregar comida",
          nt_analytics_title: "Analítica",
          nt_ration_tab: "Ración",
          nt_loading: "Cargando...",
          nt_motivation_title: "Motivación",
          nt_motivation_loading: "Cargando motivación...",
          nt_daily_progress: "Progreso diario",
          nt_fat_label: "Grasas",
          nt_carbs_label: "Carbohidratos",
          nt_dish_name: "Nombre del plato",

          nt_k_abbr: "kcal",
          nt_b_abbr: "P",
          nt_zh_abbr: "G",
          nt_v_abbr: "C",

          nt_unspecified_meal_1: "Desayuno",
          nt_unspecified_meal_2: "Almuerzo",
          nt_unspecified_meal_3: "Cena",
          nt_unspecified_meal_4: "Merienda",

          loadingRecipe: "Cargando receta...",
          recipeNotFound: "Receta no encontrada",
          confirmDeleteRecipe:
            "¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.",
          recipeDeletedSuccess: "✅ ¡Receta eliminada con éxito!",
          deleteRecipeError: "Error al eliminar la receta",
          recipeInUseError:
            "No se puede eliminar la receta. Puede que esté siendo utilizada en dietas de usuarios.",
          recipeSteps: "Pasos de la receta",
          videoRecipe: "Receta en video",
          clickToWatch: "Haz clic para ver",
          backToRecipes: "Volver a recetas",
          deleting: "Eliminando...",
          loadRecipeError: "❌ Error al cargar la receta",
          fillRequiredFields:
            "Por favor, complete los campos obligatorios (marcados con *)",
          addAtLeastOneIngredient: "Agregue al menos un ingrediente",
          addAtLeastOneStep: "Agregue al menos un paso de cocción",
          recipeUpdatedSuccess: "✅ ¡Receta actualizada con éxito!",
          updateRecipeError: "Error al actualizar la receta",
          loadingRecipeForEdit: "Cargando receta para editar...",
          recipeImage: "Imagen de la receta",
          changeImage: "Cambiar imagen",
          clickToUploadImage: "Haga clic para subir imagen",
          imageFormats: "PNG, JPG, WEBP hasta 5MB",
          cookingSteps: "Pasos de cocción",
          step: "Paso",
          describeStepPlaceholder: "Describa el paso de cocción...",
          addStep: "Agregar paso",
          recipeName: "Nombre de la receta",
          description: "Descripción",
          cookingTime: "Tiempo de cocción",
          cookingTimePlaceholder: "ej: 30 min",
          videoLink: "Enlace de video",
          ingredientNamePlaceholder: "Nombre del ingrediente",
          ingredientAmountPlaceholder: "Cantidad",
          addIngredient: "Agregar ingrediente",
          cancel: "Cancelar",
          saving: "Guardando...",
          updateRecipe: "Actualizar receta",
          addNewRecipe: "Agregar nueva receta",
          saveRecipe: "Guardar receta",
          addRecipeError: "Error al agregar la receta",
          recipeAddedSuccess: "✅ ¡Receta agregada con éxito!",
          error_token_missing: "Token faltante",
          error_auth: "Error de autenticación",
          error_loading_data: "Error al cargar datos",
          nt_no_meals_message: "Aún no hay comidas para este día.",
          nt_unspecified_dish_name: "No especificado",
          auth_error:
            "Error de autenticación. Por favor, inicie sesión nuevamente.",
          error_deleting_meal: "Error al eliminar la comida",
          breakfast: "Desayuno",
          lunch: "Almuerzo",
          dinner: "Cena",
          snack: "Merienda",
          meal: "Comida",
          nt_add_meal_button_multiline: "Agregue su\ncomida",
          nt_ingredients_for: "Ingredientes para",
          nt_ingredients_title_day: "Ingredientes para el día",
          loading_ingredients: "Cargando ingredientes...",
          no_recipe_ingredients:
            "Esta comida no tiene ingredientes detallados.",
          no_ingredients_today:
            "No hay recetas con ingredientes detallados en la ración.",
          nt_delete_meal_button: "Eliminar comida",
          add_recipe_text: "Agregue su receta",
          error_loading_recipes:
            "Error al cargar recetas. Verifique la consola.",
          loading_text: "Cargando recetas...",
          no_recipes_found: "No se encontraron recetas.",
          add_element: "Agregar elemento",
          error_auth_recipes: "Error de autenticación al cargar recetas.",
          error_no_user:
            "No se pudo determinar el usuario. Por favor, inicie sesión.",
          error_no_recipe_selected: "Seleccione una receta.",
          error_invalid_quantity:
            "El número de porciones debe ser mayor que 0.",
          add_meal_title: "Agregar comida",
          meal_type_label: "Tipo de comida",
          portions_label: "Cantidad (porciones)",
          selected_recipe_label: "Receta seleccionada",
          no_recipe_selected: "Nada seleccionado",
          adding_meal: "Agregando...",
          add_to_ration_button: "Agregar a la ración",
          cancel_button: "Cancelar",
          search_recipes_placeholder: "Buscar recetas...",
          refresh_button: "Actualizar",
          loading_recipes: "Cargando recetas...",
          calories: "Calorías",
          proteins: "Proteínas",
          fats: "Grasas",
          carbs: "Carbohidratos",
          ingredients: "Ingredientes",
          editRecipe: "Editar receta",
          deleteRecipe: "Eliminar receta",

          weight_analytics: "Analítica de peso",
          we_no_data_chart: "No hay datos disponibles para mostrar el gráfico.",
          we_no_chart_data: "Se requieren al menos 2 entradas.",
          we_mode_month: "Mes",
          we_mode_7days: "7 días",
          we_last_7_days: "Últimos 7 días",

          we_title: "Registrar peso",
          we_current_label: "Peso actual:",
          we_no_data: "Sin datos",
          we_error_data: "Error",
          we_kg_abbr: "kg",
          we_placeholder: "Ingrese peso (kg)",
          we_submitting: "Guardando...",
          we_save_button: "Guardar",
          we_saved: "¡Peso guardado!",
          we_error: "Error de guardado.",

          nt_january: "Enero",
          nt_february: "Febrero",
          nt_march: "Marzo",
          nt_april: "Abril",
          nt_may: "Mayo",
          nt_june: "Junio",
          nt_july: "Julio",
          nt_august: "Agosto",
          nt_september: "Septiembre",
          nt_october: "Octubre",
          nt_november: "Noviembre",
          nt_december: "Diciembre",

          nt_motivation_general_1:
            "Tu salud es tu mayor inversión. ¡Sigue adelante, vas por buen camino! 💪",
          nt_motivation_general_2:
            "Las decisiones saludables hoy significan fuerza mañana. ¡Actúa!",
          nt_motivation_general_3:
            "¡Recuerda hidratarte! Incluso un pequeño vaso de agua mejora tu bienestar.",
          nt_motivation_general_4:
            "La superación personal diaria da resultados. ¡Excelente trabajo por estar aquí!",
          nt_motivation_general_5:
            "Los pequeños esfuerzos constantes siempre ganan a los saltos rápidos y caóticos. ¡Mantente estable!",
          nt_motivation_general_6:
            "Recuerda: tu objetivo es un maratón, no un sprint. ¡Lo principal es no parar!",

          nt_motivation_no_meals:
            "Parece que aún no has registrado nada hoy. ¡Empecemos con un desayuno nutritivo!",

          nt_motivation_calories_on_target:
            "🎉 ¡Excelente trabajo! Te ajustaste perfectamente a tu límite de calorías. ¡Un verdadero campeón!",
          nt_motivation_calories_on_target_M:
            "🎉 ¡Excelente trabajo! Te ajustaste perfectamente a tu límite de calorías, ¡Campeón!",
          nt_motivation_calories_on_target_F:
            "🎉 ¡Excelente trabajo! Te ajustaste perfectamente a tu límite de calorías, ¡Reina!",

          nt_motivation_calories_over:
            "¡Cuidado! Has consumido {{calories}} kcal hasta ahora (que está por encima del objetivo). Concéntrate en tu última comida.",
          nt_motivation_calories_critical_over:
            "🔴 ¡Crítico! {{calories}} kcal es un exceso significativo. Concéntrate en proteínas ligeras y fibra hoy.",

          nt_motivation_almost_protein:
            "¡Casi alcanzas tu objetivo de proteínas! Un poco más - ¡y tus músculos te lo agradecerán!",
          nt_motivation_almost_protein_M:
            "¡Casi alcanzas tu objetivo de proteínas! ¡Sigue adelante, hombre!",
          nt_motivation_almost_protein_F:
            "¡Casi alcanzas tu objetivo de proteínas! ¡Eso es un progreso excelente!",

          nt_motivation_low_protein:
            "Te falta un poco de proteína hoy. Intenta agregar yogur o nueces a tu próximo refrigerio. ¡Necesitas {{protein}}g más!",
          nt_motivation_high_fat:
            "Veo mucha grasa en tu dieta. ¿Quizás reemplazar un refrigerio con frutas o verduras? 🥑",
          nt_motivation_low_carbs:
            "¿Te sientes cansado después del almuerzo? Podría deberse a los bajos carbohidratos. Intenta agregar granos integrales a la cena.",
          nt_motivation_evening_low:
            "¡Lo estás haciendo genial! Concéntrate en alimentos ligeros para la cena para ajustarte perfectamente a tus calorías restantes.",

          nt_motivation_morning:
            "¡Buenos días! Comienza este día con el desayuno correcto y un estado de ánimo positivo 🌞",
          nt_motivation_morning_M:
            "¡Buenos días, guerrero! Comienza este día con el desayuno correcto para la energía. 🌞",
          nt_motivation_morning_F:
            "¡Buenos días, hermosa! Comienza este día con el desayuno correcto para la energía. 🌞",
          nt_motivation_evening:
            "¡Gran día! Recuerda que el descanso de calidad es parte de tu plan de nutrición.",

          // === DESAFÍOS SOCIALES ===
          ch_all_challenges_title: "Todos los desafíos",
          ch_details_link: "Más detalles",
          ch_no_challenges_message: "Aún no hay desafíos.",
          ch_loading: "Cargando...",
          ch_error_loading: "No se pudieron cargar los desafíos.",
          ch_details_error_loading: "Error al cargar los detalles del desafío.",
          ch_not_found: "Desafío no encontrado.",
          ch_join: "Unirse",
          ch_edit: "Editar",
          ch_delete: "Eliminar",
          ch_back: "Atrás",
          ch_start_date: "Fecha de inicio",
          ch_end_date: "Fecha de fin",
          ch_type: "Tipo",
          ch_type_individual: "Individual",
          ch_type_group: "Grupo",
          ch_creator: "Creador",
          ch_participants: "Participantes",
          ch_add_challenge_button: "Añadir desafío",
          ch_create_first_link: "Crear primer desafío",
          ch_create_title: "Crear nuevo desafío",
          ch_name: "Nombre",
          ch_description: "Descripción",
          ch_create_submit: "Crear",
          ch_creating: "Creando...",
          ch_create_success: "¡Desafío creado exitosamente!",
          ch_create_error: "No se pudo crear el desafío.",
          ch_confirmJoinTitle: "Confirmar unión al desafío",
          ch_confirmJoinText:
            "¿Estás seguro de que quieres unirte a este desafío?",
          yes: "Sí",
          no: "No",
          ch_confirmDeleteTitle: "Confirmar eliminación del desafío",
          ch_confirmDeleteText:
            "¿Estás seguro de que quieres eliminar este desafío? Esta acción no se puede deshacer.",
          ch_joinedTitle: "¡Éxito!",
          ch_joinedText: "Te has unido al desafío exitosamente.",
          ok: "OK",
          ch_deletedTitle: "Desafío eliminado",
          ch_deletedText: "El desafío fue eliminado exitosamente.",
          ch_errorTitle: "Error",
          ch_errorText: "Ocurrió un error. Por favor intenta de nuevo.",
          ch_edit_title: "Editar desafío",
          ch_type_competition: "Competencia",
          ch_type_personal: "Objetivo personal",
          ch_save: "Guardar",
          ch_saving: "Guardando...",
          ch_edit_success: "¡Desafío actualizado exitosamente!",
          ch_edit_success_title: "¡Éxito!",
          ch_edit_error:
            "No se pudo actualizar el desafío. Inténtalo de nuevo.",
          ch_leave: "Abandonar",
          ch_complete: "Completar",
          ch_confirmLeaveTitle: "Confirmar salida del desafío",
          ch_confirmLeaveText:
            "¿Estás seguro de que quieres abandonar este desafío?",
          ch_leftTitle: "Desafío abandonado",
          ch_leftText: "Has abandonado el desafío exitosamente.",
          ch_completedTitle: "Desafío completado",
          ch_completedText:
            "¡Felicidades! Has completado el desafío exitosamente.",
          ch_type_personalgoal: "Objetivo personal",

          // === CALENDARIO MENSTRUAL ===
          last_cycle_first_day: "Primer día del último ciclo",
          menstruation_calendar: "Calendario menstrual",
          male: "Hombre",
          female: "Mujer",
          gender: "Salud por género",
          female_health: "Salud femenina",
          female_health_fine:
            "Salud femenina sin tabúes - honesta, simple y con cuidado de ti.",
          cycle_info: "Todo sobre tu ciclo",
          reproductive_health: "Salud reproductiva",
          hormonas: "Hormonas",
          gynecology: "Ginecología",
          pregnancy: "Embarazo y postparto",
          prevention: "Prevención y exámenes regulares",
          useful_info: "Información útil",
          day_tip: "Consejo\nútil\ndel día",
          plan: "Planificar",
          preventive_check: "examen preventivo al menos una vez al año",
          hormonas_health: "Hormonas saludables",
          hormonas_important:
            "Por qué es importante controlar los niveles hormonales",
          cycle_health: "¿El ciclo es importante?",
          cycle_important: "Por qué es importante seguir cada ciclo",
          examination_health: "Exámenes generales",
          examination_important:
            "Por qué es importante controlar los niveles hormonales",
          find_doctor: "Encuentra un médico cercano",
          your_cycle: "Tu ciclo",
          cycle_control:
            "Sigue tu ciclo, controla tu bienestar y recibe recordatorios a tiempo",
          calendar_cycle: "Calendario menstrual",
          calc_cycle: "Calcular mi calendario menstrual",
          warning_calc:
            "*Los cálculos de nuestro calendario menstrual pueden no ser 100% precisos, porque cada cuerpo y cada ciclo es diferente. Ayúdanos a hacer tu calendario más preciso.",
          cycle: "Ciclo",
          why_should_calendar: "¿Por qué llevar un calendario menstrual?",
          preview_calendar:
            "Llevar un calendario menstrual no es solo recordar 'esos días'. Es un pequeño ritual de autocuidado que ayuda a entender mejor tu cuerpo y estado de ánimo.",
          predict_cycle: "Predice el ciclo",
          predict_cycle_desc:
            "Siempre sabes cuándo comenzarán tu período y ovulación. Esto ayuda a planificar eventos, vacaciones o reuniones importantes.",
          listen_yourself: "Escucharte a ti misma",
          listen_yourself_desc:
            "El calendario ayuda a notar cómo cambian la energía, el estado de ánimo y el apetito en las diferentes fases del ciclo.",
          regularity: "Detectar regularidades",
          regularity_desc:
            "El dolor, el SPM, los cambios de humor o los cambios en la piel se vuelven más notorios. Puedes seguir fácilmente lo que se repite y lo que te ayuda a sentirte mejor.",
          doctor_help: "Ayuda al médico",
          doctor_help_desc:
            "Si necesitas consultar a un ginecólogo, un registro preciso de tu ciclo y síntomas hace la consulta más efectiva.",
          planing: "Planificación de salud y fitness",
          planing_desc:
            "Puedes adaptar tus entrenamientos, alimentación o descanso a tu ritmo para obtener el máximo beneficio.",
          finalize_calendar:
            "Un calendario menstrual no es una obligación, sino una herramienta de autoconocimiento. Te ayuda a sentirte más segura, prever cambios de humor y simplemente cuidarte.",
          phase: "Fases del ciclo menstrual",
          proccess_in_body: "Qué sucede en el cuerpo de una mujer",
          proccess_in_body_desc:
            "El ciclo menstrual no son solo 'esos días'. Es todo un ritmo natural que ayuda al organismo a funcionar armoniosamente. Se divide en varias fases, y cada una influye en nuestro bienestar, estado de ánimo y energía.",
          phase_1_5: "Fase menstrual\n(días 1 a 5)",
          phase_1_5_desc:
            "Es el inicio del ciclo. El cuerpo se deshace del revestimiento uterino antiguo, de ahí el sangrado. Durante este tiempo la energía puede ser menor, así que date más descanso.",
          phase_6_13: "Fase folicular\n(días 6 a 13)",
          phase_6_13_desc:
            "El nivel de estrógeno aumenta gradualmente, y con él regresan la fuerza y la motivación. Es un buen período para nuevas ideas, trabajo activo y deporte.",
          phase_14_16: "Fase de ovulación\n(días 14 a 16)",
          phase_14_16_desc:
            "Se libera un óvulo maduro. La mujer puede sentirse segura, atractiva, llena de energía. Son los días 'pico', cuando el cuerpo está listo para la concepción.",
          phase_17_28: "Fase lútea\n(días 17 a 28)",
          phase_17_28_desc:
            "Si no ocurre el embarazo, domina la progesterona. Pueden aparecer somnolencia, cambios de humor, antojos de dulces. En este período es importante escucharse, descansar más y cuidar el confort emocional.",
          finalize_cycle:
            "El ciclo menstrual no es un enemigo, sino un calendario natural de nuestro cuerpo. Si escuchas sus fases, puedes planificar mejor tu día, entender los cambios de humor y estar más en armonía contigo misma.",
          go_back: "Volver",
          now: "ahora",
          menstruation: "menstruación",
          scheduled_menstruation: "menstruación programada",
          ovulation: "ovulación",
          planned_ovulación: "ovulación programada",
          ovulation_in: "ovulación en",
          low_chance: "Baja probabilidad de embarazo",
          average_chance: "Probabilidad media de embarazo",
          high_chance: "Alta probabilidad de embarazo",
          no_chance: "Probabilidad muy baja de embarazo",
          myth_facts: "Mitos y hechos",
          one: "día",
          few: "días",
          other: "días",
          c_long: "¡Tu ciclo duró {{cLong}} días. Lo cual es normal!",
          phase_1:
            "¡Ahora estás en la fase menstrual!\nEs el inicio del ciclo.\n¡Puedes sentir falta de energía!\n¡Durante este tiempo es mejor cuidarte y descansar!",
          phase_2:
            "¡Ahora estás en la fase folicular!\nLa hormona estrógeno aumenta activamente.\n¡Tu estado de ánimo mejora. La piel mejora!\n¡Estás lista para conquistar el mundo!",
          phase_3:
            "¡Ahora estás en la fase de ovulación!\nSe libera un óvulo maduro.\n¡Te sientes segura y llena de energía!\n¡Hoy es un día maravilloso para hacer lo que te da alegría!",
          phase_4:
            "¡Ahora estás en la fase lútea!\n¡La progesterona comienza a dominar!\n¡Durante este período pueden ocurrir cambios de humor y somnolencia!\n¡Cuida tu confort y escucha tus sensaciones!",
          super: "¡Súper!",
          gynecology_sub:
            "Todo sobre exámenes regulares, prevención, cuidado de la salud femenina — sin tabúes en lenguaje simple.",
          womens_tests: "Exámenes y análisis",
          regular_review: "Exámenes regulares",
          articles_: "Artículos",
          read: "Leer",
          how_often: "¿Con qué frecuencia\nvisitar al\nginecólogo?",
          top_5_tests: "TOP 5 análisis\npara salud femenina",
          review_sub:
            "El cuidado de la salud comienza con la prevención. Una vez al año — y vas un paso por delante de los problemas.",
          what_to_check_regulary: "¿Qué hacer regularmente?",
          gynecology_review: "Examen ginecológico",
          one_time_per_year: "una vez al año",
          pap_test: "Test de Papanicolaou",
          _2_3_time_per_year: "cada 2-3 años",
          blood_test: "Análisis de sangre y orina",
          ultrasound_test: "Ultrasonido pélvico",
          if_need: "si es necesario",
          mammography: "Mamografía",
          after_40_years: "después de los 40 años",
          examination_head: "Exámenes y análisis",
          examination_desc:
            "Los análisis correctos en el momento correcto — la clave para la tranquilidad sobre tu salud. Descubre qué análisis y exámenes hacer regularmente.",
          base_review: "Examen básico",
          gynecology_examination: "Examen ginecológico",
          add_to_calendar: "Añadir al calendario",
          ultrasound_glands: "Ultrasonido mamario",
          need_I_test: "¿Debo hacerme análisis si me siento bien?",
          examination_tip_need:
            "Los exámenes médicos regulares son importantes incluso cuando no hay quejas. Muchas enfermedades se desarrollan de forma asintomática en etapas tempranas, y los análisis básicos realizados a tiempo (hemograma, orina, nivel de azúcar, colesterol) ayudan a detectar problemas antes de que aparezcan los primeros signos.\n\nControles planificados una vez al año – es una inversión en tu salud. Te permiten controlar el estado de tu organismo, ajustar tu alimentación y estilo de vida a tiempo, y evitar complicaciones.\n\n¿Te sientes bien? – maravilloso, pero la prevención siempre es más fácil y económica que el tratamiento.",
          what_needed_blood: "¿Qué preparar antes de un análisis de sangre?",
          what_needed_blood_info:
            "Para que tu análisis de sangre sea preciso, prepárate con anticipación:\n\nAnálisis en ayunas la última comida debe ser 8-12 horas antes\n\nBebe solo agua sin gas esto no afecta los resultados\n\nEvita el alcohol, comidas grasas y muy dulces 1-2 días antes\n\nEl día del análisis evita esfuerzos físicos intensos y estrés\n\nSi tomas medicamentos, infórmale obligatoriamente a tu médico",
          what_diff_ultrasound_mam:
            "¿En qué se diferencia el ultrasonido de la mamografía?",
          what_diff_ultrasound_mam_info:
            "El ultrasonido utiliza ondas sonoras para visualizar tejidos y muestra bien las estructuras blandas de los senos, especialmente en mujeres jóvenes con tejido denso\n\nLa mamografía es un examen de rayos X que permite detectar microcalcificaciones y signos tempranos de tumores incluso antes de que aparezcan bultos\n\nEl ultrasonido no utiliza radiación y es adecuado para control adicional\nLa mamografía sigue siendo el método principal de cribado para mujeres mayores de 40 años\n\nAmbos métodos se usan a menudo combinados para un diagnóstico más preciso",
          why_pap_test:
            "¿Para qué sirve la citología (test PAP) y con qué frecuencia?",
          why_pap_test_info:
            "La citología o test PAP ayuda a detectar cambios en las células del cuello uterino en etapas tempranas cuando aún no hay síntomas\n\nLos exámenes regulares permiten prevenir el desarrollo de cáncer y tratar procesos inflamatorios a tiempo\n\nGeneralmente el test PAP se realiza una vez al año si no hay problemas, o más frecuentemente por recomendación del médico\n\nEl examen es rápido, indoloro y toma solo unos minutos\n\nIncluso si te sientes bien, el test te ayuda a cuidar tu salud",
          reproductive: "Salud reproductiva",
          reproductive_sub:
            "¡Planifica con nosotros! Cuida tu cuerpo y planifica tu futuro con confianza.",
          myth_main: "Existen muchos mitos alrededor de la menstruación.",
          myth_sub: "Aquí tienes una pequeña selección)",
          cant_sport: "No se puede hacer deporte durante la menstruación",
          cant_sport_desc:
            "En realidad, la actividad física ligera, como yoga, caminatas o incluso entrenamientos moderados, puede aliviar los calambres y mejorar el estado de ánimo.",
          c_long_: "El ciclo siempre dura exactamente 28 días",
          c_long_desc:
            "El ciclo es individual en cada persona: se considera normal un intervalo de aproximadamente 21 a 35 días.",
          cant_swim: "No se puede nadar o bañarse durante la menstruación",
          cant_swim_desc:
            "Nadar y ducharse es seguro. Los productos de higiene (tampones, copas menstruales) permiten nadar cómodamente y mantener la limpieza.",
          cant_get_pregnant:
            "No se puede quedar embarazada durante la menstruación",
          cant_get_pregnant_desc:
            "La probabilidad es menor, pero no cero: los espermatozoides pueden vivir en el cuerpo varios días, y la ovulación a veces ocurre antes o después de lo esperado.",
          pain_is_ok: "El dolor menstrual siempre es normal",
          pain_is_ok_desc:
            "Una molestia leve es típica, pero un dolor intenso o agotador puede indicar endometriosis u otras enfermedades, y vale la pena consultar a un médico.",

          // === SALUD MENTAL ===
          your: "Tu salud",
          breathing: "Ejercicios de respiración",
          diaphragmatic: "Respiración diafragmática",
          square: "Respiración cuadrada",
          nadishodhana: "Nadi Shodhana",
          mentaltest: "Test de estado",
          articles: "Artículos útiles",

          // === MENÚ DE SALUD ===
          hmp_your_health: "Tu salud",
          hmp_mental_health: "Salud mental",

          // === ARTÍCULOS DE SALUD MENTAL ===
          mp_articles_title: "Artículos útiles",
          mp_article_1: "10 técnicas simples para reducir el estrés diario",
          mp_article_2: "Cómo manejar la ansiedad",
          mp_article_3: "Ejercicios de respiración para relajación",
          mp_article_4: "Sueño saludable y salud mental",
          mp_article_5: "Meditación para principiantes",
          mp_article_6: "Cómo mejorar la autoestima",
          mp_article_7: "Métodos efectivos para combatir el agotamiento",
          mp_article_content_1: 
            `
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
          mp_article_content_2: 
            `
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
          mp_article_content_3: 
            `
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
          mp_article_content_4: 
            `
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
          mp_article_content_5: 
            `
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
          mp_article_content_6: 
            `
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
          mp_article_content_7: 
            `
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
          m_long: "Duración de la menstruación (días)",
          c_long_wh: "Duración del ciclo",

          // === DIARIO DE EMOCIONES ===
          mp_aew_notes: "Nota",
          mp_aew_describe_your_feelings:
            "Describe tus sensaciones con más detalle...",
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
          mp_aew_so_so: "Regular",
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
          mp_aew_self_pity: "Autocompasión",
          mp_aew_anxiety: "Ansiedad",
          mp_aew_sadness: "Tristeza",
          mp_aew_uncertainty: "Incertidumbre",
          mp_aew_confusion: "Confusión",
          mp_aew_guilt: "Culpa",
          mp_aew_self_rejection: "Auto-rechazo",
          mp_aew_emptiness: "Vacío",
          mp_aew_terribly: "Terrible",
          mp_aew_isolation: "Aislamiento",
          mp_aew_depression: "Depresión",
          mp_aew_envy: "Envidia",
          mp_aew_deep_sorrow: "Tristeza profunda",
          mp_aew_shame: "Vergüenza",
          mp_aew_despair: "Desesperación",
          mp_aew_loneliness: "Soledad",
          mp_aew_hopelessness: "Desesperanza",
          mp_aew_self_directed_aggression: "Agresión hacia uno mismo",
          mp_aew_сool: "Genial",
          mp_aew_energy: "Energía",
          mp_aew_satisfaction: "Satisfacción",
          mp_aew_connection: "Sensación de conexión",
          mp_aew_comfort: "Confort",
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
          mp_aew_wizard_description_step_3:
            "Tu nota es privada y solo visible para ti.",
          mp_return_back: "Volver atrás",
          mp_btn_next: "Siguiente",
          mp_btn_add: "Añadir",
          mp_btn_back: "Atrás",
          mp_btn_cancel: "Cancelar",
          mp_btn_lets_start: "¿Comenzamos?",
          mp_btn_continue: "Continuar",
          mp_btn_start: "Comenzar",
          mp_btn_save: "Guardar",
          mp_btn_result: "Resultado",
          mp_btn_try_again: "Intentar de nuevo",

          // === EJERCICIOS DE RESPIRACIÓN ===
          mp_bpp_title: "Ejercicios de respiración",
          mp_bpp_subtitle: "Exhala estrés — inhala calma 🌿",
          mp_bpp_description_1:
            "Ejercicios simples de respiración ayudan a aliviar la tensión, recuperar energía y clarificar la mente. Puedes empezar en cualquier lugar: en casa, en el trabajo o incluso en transporte.",
          mp_bpp_description_2:
            "Pruébalo — y siente cómo tu cuerpo se relaja y tu estado de ánimo se aligera.",
          mp_bpp_card_title_1: "Respiración diafragmática",
          mp_bpp_card_description_1_1: "Reduce el estrés y la ansiedad.",
          mp_bpp_card_description_1_2: "Relaja, alivia tensiones.",
          mp_bpp_card_title_2: "Respiración cuadrada",
          mp_bpp_card_description_2_1:
            "Alivia la ansiedad y ayuda a concentrarse.",
          mp_bpp_card_title_3: "Nadi Shodhana",
          mp_bpp_card_description_3_1:
            "Respiración alternada por fosas nasales.",
          mp_bpp_card_description_3_2: "Ayuda a reducir el estrés.",
          mp_bpp_card_description_3_3: "Restablece el equilibrio interior.",

          // === RESPIRACIÓN DIAFRAGMÁTICA ===
          mp_dbp_title: "Respiración diafragmática",
          mp_dbp_subtitle: "Respiración que devuelve la calma",
          mp_dbp_description_1_1:
            "Siéntate cómodamente. Relaja los hombros. Practica durante al menos 3-5 minutos.",
          mp_dbp_description_1_2:
            "Vuelve a la respiración cuando sientas tensión.",
          mp_dbp_inhale: "INHALA",
          mp_dbp_hold: "MANTÉN",
          mp_dbp_exhale: "EXHALA",
          mp_dbp_come_on_more: "VAMOS, MÁS",

          // === DIARIO DE EMOCIONES ===
          mp_ebp_title: "Diario de emociones",
          mp_ebp_factor_title: "Factores del estado de ánimo",
          mp_ebp_factor_info_p_1:
            "Todos los factores - tus posibles desencadenantes.",
          mp_ebp_factor_info_p_2:
            "Por ejemplo, podrías no notar que el deporte, el café o las drogas influyen en tu estado de ánimo y forman patrones de comportamiento.",
          mp_ebp_factor_info_p_3:
            "Puedes seguir la influencia de los factores en tu bienestar más tarde en la sección de análisis.",
          mp_ebp_factor_info_p_4: "Ejemplo",
          mp_ebp_factor_info_p_5: "Alimentación y estimulantes:",
          mp_ebp_factor_info_p_6:
            "Registra tu consumo de café, vitaminas o alimentos que puedan afectar tu nivel de energía.",
          mp_ebp_factor_info_p_7: "Actividad y ejercicio físico:",
          mp_ebp_factor_info_p_8:
            "Controla la cantidad de ejercicio físico o participación en otras formas de actividad física.",
          mp_ebp_factor_info_p_9: "Ciclos biológicos:",
          mp_ebp_factor_info_p_10:
            "Siguiendo tu menstruación, podrás entender cómo afecta tu bienestar emocional.",
          mp_ebp_selected_factors: "Factores seleccionados:",
          mp_ebp_available_factors: "Factores disponibles:",
          mp_ebp_hello_how_are_you: "¡Hola! ¿Cómo estás?",
          mp_ebp_factor: "Factores",
          mp_ebp_add_factor: "Añadir factor",

          // === INICIO DE SALUD MENTAL ===
          mp_mhp_title: "Tu calma comienza aquí.",
          mp_mhp_sub_title:
            "Hemos reunido herramientas que ayudan a mantenerse equilibrado incluso en los días más estresantes.",
          mp_mhp_test_card_title: "Tests de estado",
          mp_mhp_test_card_btn_text: "Hacer test",
          mp_mhp_breathing_card_title: "Ejercicios de respiración",
          mp_mhp_breathing_card_btn_text: "Elegir ejercicio",
          mp_mhp_articles_card_title: "Artículos útiles",
          mp_mhp_articles_card_btn_text: "Ver artículos",
          mp_mhp_choose_specialist: "Elegir especialista",

          // === TEST DE ESTADO ===
          mp_mtp_test_data_question_1: "¿Cómo te despiertas por la mañana?",
          mp_mtp_test_data_answers_1_1: "Con entusiasmo y planes",
          mp_mtp_test_data_answers_1_2:
            "Con un vaso de agua y un suspiro pesado",
          mp_mtp_test_data_answers_1_3: "«¿Qué, otra vez este día?»",
          mp_mtp_test_data_question_2: "Cuando algo sale mal, tu reacción es:",
          mp_mtp_test_data_answers_2_1: "Ok, pensaré cómo arreglarlo",
          mp_mtp_test_data_answers_2_2: "Bueno, así es la vida",
          mp_mtp_test_data_answers_2_3: "Todo está perdido, me voy a mi manta",
          mp_mtp_test_data_question_3: "¿Qué te salva más a menudo del estrés?",
          mp_mtp_test_data_answers_3_1: "Deporte o un paseo",
          mp_mtp_test_data_answers_3_2: "Comida, series o memes",
          mp_mtp_test_data_answers_3_3: "Simplemente me quedo sin fuerzas",
          mp_mtp_test_data_question_4: "Tu sensación de energía últimamente:",
          mp_mtp_test_data_answers_4_1: "Normal, la batería aguanta",
          mp_mtp_test_data_answers_4_2: "Como una batería al 30%",
          mp_mtp_test_data_answers_4_3:
            "Como un teléfono que se apaga con el frío",
          mp_mtp_test_data_question_5:
            "¿Qué piensas cuando escuchas la palabra «descanso»?",
          mp_mtp_test_data_answers_5_1: "Planeo algo agradable",
          mp_mtp_test_data_answers_5_2: "Quedarme en casa y no hacer nada",
          mp_mtp_test_data_answers_5_3: "No tengo tiempo para descansar",
          mp_mtp_test_result_title_1: "Tu salud mental está bien.",
          mp_mtp_test_result_description_1:
            "Tienes un nivel excelente de energía y optimismo. ¡Sigue cuidándote y mantén este estado!",
          mp_mtp_test_result_title_2: "Tu salud mental está mayormente bien.",
          mp_mtp_test_result_description_2:
            "La mayoría de las cosas van bien, pero algunas áreas necesitan un poco más de atención y cuidado.",
          mp_mtp_test_result_title_3: "Tu salud mental está un poco agotada",
          mp_mtp_test_result_description_3:
            "Sientes una ligera fatiga. Encuentra tiempo para descansar y pequeños placeres.",
          mp_mtp_test_result_title_4: "Tu salud mental pide cuidado",
          mp_mtp_test_result_description_4:
            "Necesitas más descanso, alegría y apoyo. Presta atención a tus necesidades.",
          mp_mtp_test_result_title_5: "Tu salud mental grita SOS",
          mp_mtp_test_result_description_5:
            "Podrías estar experimentando agotamiento. No dudes en buscar ayuda y encuentra tiempo para un descanso serio.",
          mp_mtp_test_result_title_6:
            "Tu salud mental es como una montaña rusa.",
          mp_mtp_test_result_description_6:
            "Tu estado cambia a menudo. Algunos días son geniales, otros - más difíciles. Intenta encontrar un equilibrio.",
          mp_mtp_start_message:
            "¡Atención! El test no tiene valor diagnóstico, pero muestra tu nivel de estrés o agotamiento.",
          mp_mtp_test_title: "Test sobre el estado de tu salud mental",
          mp_mtp_test_description:
            "Haz clic en las respuestas que correspondan a tu estado)",

          // === NADI SHODHANA ===
          mp_nsp_title: "Nadi Shodhana",
          mp_nsp_subtitle: "Respiración que equilibra la energía",
          mp_nsp_description_1:
            "Técnica de respiración alternada por fosas nasales para armonizar mente y cuerpo.",
          mp_nsp_description_2:
            "Practica durante 3-5 minutos para lograr el efecto.",
          mp_nsp_technique_title: "Técnica:",
          mp_nsp_technique_step_1: "Siéntate cómodamente, endereza la espalda.",
          mp_nsp_technique_step_2:
            "Con la mano, cierra la fosa nasal derecha, inhala por la izquierda.",
          mp_nsp_technique_step_3:
            "Luego cierra la izquierda — exhala por la derecha.",
          mp_nsp_technique_step_4:
            "Inhala por la derecha — exhala por la izquierda.",
          mp_nsp_technique_step_5:
            "Continúa varios minutos a un ritmo tranquilo.",
          mp_nsp_result_title: "Resultado:",
          mp_nsp_result_description_1:
            "Ya después de unos minutos aparece una sensación de calma. Disminuye el nivel de tensión. La mente se aclara, como después de un breve descanso.",
          mp_nsp_result_description_2:
            "La práctica regular ayuda a conciliar mejor el sueño, concentrarse y preservar el equilibrio interior incluso en situaciones estresantes.",

          // === RESPIRACIÓN CUADRADA ===
          mp_sbp_title: "Respiración cuadrada",
          mp_sbp_subtitle: "Respiración que devuelve la calma",
          mp_sbp_description_1:
            "Siéntate cómodamente. Relaja los hombros. Practica durante al menos 3-5 minutos.",
          mp_sbp_description_2:
            "Vuelve a la respiración cuando sientas tensión.",

          // === TU SALUD ===
          mp_yhp_main_title: "Tu salud —",
          mp_yhp_main_subtitle: "Tu superpoder. Se apoya en 3 pilares:",
          mp_yhp_activity_title: "Actividad",
          mp_yhp_activity_description_1:
            "Incluso 15 minutos al día ya marcan la diferencia.",
          mp_yhp_activity_description_2:
            "Caminata, cuerda, Pilates — elige lo que te guste, y tu cuerpo te lo agradecerá.",
          mp_yhp_sleep_title: "Sueño",
          mp_yhp_sleep_description_1: "¡Es lo más importante!",
          mp_yhp_sleep_description_2:
            "El sueño no es pereza, sino tu cable de carga interno. 7-8 horas de descanso de calidad ayudan al cuerpo a recuperarse y al cerebro a trabajar rápido y creativamente.",
          mp_yhp_nutrition_title: "Alimentación",
          mp_yhp_nutrition_description_1:
            "La comida es combustible. Cuanto más calidad tenga, mejor funcionará tu 'motor'.",
          mp_yhp_nutrition_description_2:
            "No se trata de dietas, sino de equilibrio: más verduras, menos estrés con los snacks.",

          // === SALUD MASCULINA ===
          hormonas_diagram: "Gráfico de salud masculina",
          mp_male_health: "Salud masculina",
          mp_subtitle_1: "Ser hombre también es cuidar la salud",
          mp_hormones_block_title: "Hormonas",
          mp_hormones_block_content_label_1: "Nivel de testosterona",
          mp_hormones_block_content_value_1_1: "norma 300-1000 ng/dl",
          mp_hormones_block_content_label_2: "Signos de deficiencia",
          mp_hormones_block_content_value_2_1: "fatiga",
          mp_hormones_block_content_value_2_2: "baja libido",
          mp_hormones_block_content_value_2_3: "disminución muscular",
          mp_hormones_block_content_label_3: "¿Qué hacer?",
          mp_hormones_block_content_value_3_1: "análisis regulares",
          mp_hormones_block_content_value_3_2: "entrenamiento de fuerza",
          mp_hormones_block_content_value_3_3: "sueño de calidad",
          mp_hormones_block_content_value_3_4: "menos estrés",
          mp_add_hormones_data: "Ingresar indicadores",
          mp_analyses_block_title: "Análisis y prevención",
          mp_analyses_block_content_label_1: "Hemograma y análisis de orina",
          mp_analyses_block_content_value_1: "anualmente",
          mp_analyses_block_content_label_2: "Perfil hormonal",
          mp_analyses_block_content_value_2: "si es necesario",
          mp_analyses_block_content_label_3: "PSA",
          mp_analyses_block_content_value_3: "después de los 40 años",
          mp_analyses_block_content_label_4: "Ultrasonido pélvico",
          mp_analyses_block_content_value_4: "cada 1-2 años",
          mp_analyses_block_content_label_5: "Perfil hormonal",
          mp_analyses_block_content_value_5: "por recomendación médica",
          mp_reproductive_block_title: "Salud reproductiva",
          mp_reproductive_block_content_label_1: "Fertilidad",
          mp_reproductive_block_content_value_1:
            "la calidad del semen depende del estilo de vida",
          mp_reproductive_block_content_label_2: "Riesgos",
          mp_reproductive_block_content_value_2:
            "sobrecalentamiento, alcohol, tabaquismo, obesidad",
          mp_reproductive_block_content_label_3: "Recomendaciones",
          mp_reproductive_block_content_value_3:
            "Urólogo 1/año, espermatograma",
          mp_urinary_block_title: "Sistema urinario",
          mp_urinary_block_content_label_1: "Control de próstata",
          mp_urinary_block_content_value_1:
            "desde 40 años — PSA y ultrasonido 1/año",
          mp_urinary_block_content_label_2: "¡Alerta!",
          mp_urinary_block_content_value_2:
            "dolor, sangre en orina, micción frecuente",
          mp_urinary_block_content_label_3: "¿Qué hacer?",
          mp_urinary_block_content_value_3:
            "no toleres molestias, corre al urólogo",
          mp_potency_block_title: "Potencia",
          mp_potency_block_content_label_1: "¿Por qué disminuye?",
          mp_potency_block_content_value_1:
            "estrés, alcohol, tabaquismo, enfermedades cardíacas",
          mp_potency_block_content_label_2: "¿Cómo apoyar?",
          mp_potency_block_content_value_2:
            "deporte, sueño de calidad, alimentación balanceada",
          mp_potency_block_content_label_3: "¿Cuándo al médico?",
          mp_potency_block_content_value_3:
            "si los problemas duran más de 2 meses",
          mp_subtitle_2: "Cuídate como a tu coche favorito",
          mp_form_subtitle:
            "Completa los campos si tienes datos actuales, y crearemos tu gráfico",
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
          mp_diagram_hormons_value_not_found:
            "No se encontraron datos hormonales. Por favor ingresa tus indicadores.",
          mp_diagram_hormons_data_not_found:
            "Error al cargar los datos. Contacta al soporte técnico.",
          mp_diagram_low: "Bajo",
          mp_diagram_norm: "Normal",
          mp_diagram_high: "Alto",          calendar: "Calendario",
          calendar_info: "Tu mejor calendario",
          create_event: "Crear",
          
          before_5: "En 5 minutos",
          before_10: "En 10 minutos",
          sign_for_doctor: "Cita con el médico",
          sure_to_delete_event: "¿Está seguro de que desea eliminar el evento?",
          notification: "Recordatorio",
          task: "Tarea",
          meeting: "Reunión",
          choose_date: "Elegir fecha",
          choose_time: "Elegir hora",
          choose_end_time: "Elegir hora de finalización",
          my_tasks: "Mis tareas",
          invite_friend: "Invitar a un amigo",
          link: "Enlace",
          add_title: "Agregar título",
          go_to_main_page: "HOGAR",

          // === Premium ===
          sp_you_already_have_active_subscription: "Ya tienes una suscripción activa",
          sp_please_login: "Por favor, inicia sesión",
          sp_active: "Activa",
          sp_expired: "Expirada",
          sp_cancelled: "Cancelada",
          sp_basic_title: "Básica",
          sp_duration: "/ 30 días",
          sp_basic_features_1: "Rastreadores",
          sp_basic_features_2: "Analítica básica",
          sp_premium_title: "Premium",
          sp_premium_features_1: "Cursos",
          sp_premium_features_2: "Planes personalizados",
          sp_family_title: "Familiar",
          sp_family_features_1: "Todas las funciones Premium",
          sp_family_features_2: "Acceso para hasta 3 usuarios",
          sp_loading: "Cargando...",
          sp_subscription_title: "Invierte en ti mismo",
          sp_subscription_sub_title: "Tu mejor proyecto eres tú. Hagámoslo realidad juntos.",
          sp_subscription_history_label: "Historial de suscripciones",
          sp_subscription_history_loading: "Cargando historial...",
          sp_subscription_history_price: "Gratis",
          sp_subscription_family_title: "Usuarios añadidos",
          sp_subscription_family_date: "añadido",
          sp_subscription_history_empty: "Aún no tienes historial de suscripciones",
          sc_processing: "Procesando...",
          sc_select: "Seleccionar",

          // === Subscription Payment ===
          spp_please_input_correct_email: "Por favor, introduce direcciones de correo electrónico válidas",
          spp_uncnown_subsription_type: "Tipo de suscripción desconocido. Inténtalo de nuevo.",
          spp_family_sub: "Suscripción familiar",
          spp_add_email_addresses_of_family_members: "Agrega las direcciones de correo electrónico de los miembros de la familia (hasta 3 personas)",
          spp_go_to_payment: "Ir al pago",

          // === Subscription Details ===
          sdp_already_have_active_sub: "ya tiene una suscripción activa",
          sdp_already_a_member_of_another_family_subscription: "ya es miembro de otra suscripción familiar",
          sdp_this_is_the_subscription_owner: "este es el propietario de la suscripción",
          sdp_user_not_found: "Usuario no encontrado",
          sdp_some_users_could_not_be_added: "Algunos usuarios no pudieron ser añadidos",
          sdp_family_member_list_successfully_updated: "¡Lista de miembros de la familia actualizada correctamente!",
          sdp_error_updating_family_users: "Error al actualizar los usuarios familiares: ",
          sdp_subscription_not_found: "Suscripción no encontrada",
          sdp_return_to_tariffs: "Volver a los planes",
          sdp_your_current_subscription: "Tu suscripción actual",
          sdp_subscription_type: "Tipo de suscripción",
          sdp_subscription_status: "Estado",
          sdp_subscription_start_date: "Fecha de inicio",
          sdp_subscription_end_date: "Válida hasta",
          sdp_subscription_price: "Precio",
          sdp_subscription_section_content: "Acceso familiar",
          sdp_subscription_detail_label: "Tipo de acceso",
          sdp_subscription_detail_value: "Miembro de familia",
          sdp_subscription_section_content_title: "Miembros de la familia",
          sdp_subscription_member_added: "Añadido",
          sdp_subscription_renew_btn: "Renovar suscripción",
          sdp_subscription_manage_family_btn: "Gestionar miembros de la familia",
          sdp_family_modal_instruction: "Agrega o elimina direcciones de correo electrónico de los miembros de la familia",
          sdp_sub_saving: "Guardando...",
          sdp_family_member_email: "Correo electrónico del miembro de la familia",
          payment: "Pago",
          details: "Detalles",

          // === Success Payment ===
          ps_payment_success_main_title: "¡GENIAL!",
          ps_payment_success_title: "PAGO EXITOSO",
          ps_payment_success_description: "El recibo de pago ha sido enviado a tu correo electrónico",
          ps_payment_success_btn: "Ir al inicio",

          // Marketplace
          sport_eating: "Nutrición deportiva",
          sport_cloth: "Ropa deportiva",
          sport_gadgets: "Gadgets",
          sport_other: "Otro",
          marketplace_filter: "Filtro",
          brand: "Marca",
          from: "Desde",
          to: "Hasta",
          one_thing: "uds.",
          put_in_cart: "Añadir al carrito",
          already_in_cart: "Ya en el carrito",
          similar_products: "Productos similares",
          basket_marketplace: "Carrito",
          sure_to_delete_product_from_cart: "¿Está seguro de que desea eliminar este producto del carrito?",
          product: "Producto",
          amount_marketplace: "Cantidad",
          my_order: "Mi pedido",
          marketplace_total: "Total",
          order_details: "Detalles",
          to_payment: "Ir al pago",
          order_sum: "Importe",
          delivery: "Entrega",
          post_index: "Código postal",
          shopping_cart: "Carro de la compra",
        },
      },
    },
    fallbackLng: "uk",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
