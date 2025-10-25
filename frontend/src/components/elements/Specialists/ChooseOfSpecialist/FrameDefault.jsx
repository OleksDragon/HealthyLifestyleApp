import React from "react";
import "../ChooseOfSpecialist/FrameDefault.css";

export const FrameDefault = ({ className }) => {
  return (
    <div className={`frame-default ${className}`}>
      <p className="text-wrapper">Приєднуйся до нас в команду!</p>
    </div>
  );
};
