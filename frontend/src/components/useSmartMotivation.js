import { useState, useEffect } from "react";

export function useSmartMotivation(dailyData, gender) {
  const [motivationKey, setMotivationKey] = useState("nt_motivation_loading");

  useEffect(() => {
    const genderSuffix =
      gender === "male" ? "_M" : gender === "female" ? "_F" : "";

    if (!dailyData || !dailyData.progress) {
      setMotivationKey("nt_motivation_loading");
      return;
    }

    const { progress, meals } = dailyData;
    const currentHour = new Date().getHours();
    const {
      calories,
      calorieTarget,
      protein,
      proteinTarget,
      fat,
      fatTarget,
      carbs,
      carbsTarget,
    } = progress;

    let selectedKey = "";

    const calorieDiff = calorieTarget - calories;
    const proteinRemaining = proteinTarget - protein;
    const fatPercentage = fatTarget > 0 ? (fat / fatTarget) * 100 : 0;
    const carbsPercentage = carbsTarget > 0 ? (carbs / carbsTarget) * 100 : 0;
    const generalQuotesCount = 6;

    const KEY_PREFIX = "nt_motivation_";

    if (meals.length === 0) {
      selectedKey = KEY_PREFIX + "no_meals";
    } else if (calories > calorieTarget * 1.2) {
      selectedKey = KEY_PREFIX + "calories_critical_over";
    } else if (calories > calorieTarget * 1.05) {
      selectedKey = KEY_PREFIX + "calories_over";
    } else if (
      calories >= calorieTarget * 0.95 &&
      calories <= calorieTarget * 1.05
    ) {
      selectedKey = KEY_PREFIX + "calories_on_target" + genderSuffix;
    } else if (
      proteinRemaining > 0 &&
      proteinRemaining < 10 &&
      proteinTarget > 0
    ) {
      selectedKey = KEY_PREFIX + "almost_protein" + genderSuffix;
    } else if (currentHour >= 18 && calorieDiff > 0 && calorieDiff < 500) {
      selectedKey = KEY_PREFIX + "evening_low";
    } else {
      if (proteinRemaining > proteinTarget * 0.4 && currentHour > 12) {
        selectedKey = KEY_PREFIX + "low_protein";
      } else if (fatPercentage > 120) {
        selectedKey = KEY_PREFIX + "high_fat";
      } else if (carbsPercentage < 50 && currentHour > 15) {
        selectedKey = KEY_PREFIX + "low_carbs";
      } else if (currentHour >= 5 && currentHour < 11) {
        selectedKey = KEY_PREFIX + "morning" + genderSuffix;
      } else if (currentHour >= 21 || currentHour < 5) {
        selectedKey = KEY_PREFIX + "evening";
      } else {
        const randomIndex = Math.floor(Math.random() * generalQuotesCount) + 1;
        selectedKey = KEY_PREFIX + `general_${randomIndex}`;
      }
    }

    setMotivationKey(selectedKey);

    const criticalKeys = [
      KEY_PREFIX + "calories_critical_over",
      KEY_PREFIX + "calories_over",
      KEY_PREFIX + "low_protein",
      KEY_PREFIX + "high_fat",
      KEY_PREFIX + "low_carbs",
    ];

    const intervalId = setInterval(() => {
      if (!criticalKeys.includes(selectedKey)) {
        const newRandomIndex =
          Math.floor(Math.random() * generalQuotesCount) + 1;
        setMotivationKey(KEY_PREFIX + `general_${newRandomIndex}`);
      }
    }, 120000);

    return () => clearInterval(intervalId);
  }, [dailyData, gender]);

  return motivationKey;
}
