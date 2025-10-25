
import '../../../pages/SpecialistPages/ExpertDetailsPage/ExpertDetailsPage.css';
const SpecialistSkills = ({ specialist }) => {
  // Helper function to get the relevant skills/specializations array
  const getSkills = (specialist) => {
    if (specialist.TrainerDetails?.TrainingStyle) {
      return specialist.TrainerDetails.TrainingStyle;
    }
    if (specialist.DoctorDetails?.Specializations) {
      return specialist.DoctorDetails.Specializations;
    }
    if (specialist.PsychologistDetails?.Specializations) {
      return specialist.PsychologistDetails.Specializations;
    }
    if (specialist.DietitianDetails?.Specializations) {
      return specialist.DietitianDetails.Specializations;
    }
    return [];
  };

  const skills = getSkills(specialist);

  return (
    <div className="skills-list">
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <div key={skill || index} className="skill-item">
            {skill}
          </div>
        ))
      ) : (
        <div className="skill-item no-skills">No skills listed</div>
      )}
    </div>
  );
};

export default SpecialistSkills;