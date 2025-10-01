import '../SpecialistWorkFormat/SpecialistWorkFormat.css';

const SpecialistWorkFormat = ({ specialist }) => {
  // Resolve work formats from multiple possible shapes
  const resolvedWorkFormats = Array.isArray(specialist?.WorkFormat)
    ? specialist.WorkFormat
    : Array.isArray(specialist?.workFormat)
    ? specialist.workFormat
    : Array.isArray(specialist?.TrainerDetails?.workFormat)
    ? specialist.TrainerDetails.workFormat
    : Array.isArray(specialist?.PsychologistDetails?.workFormat)
    ? specialist.PsychologistDetails.workFormat
    : Array.isArray(specialist?.DoctorDetails?.workFormat)
    ? specialist.DoctorDetails.workFormat
    : Array.isArray(specialist?.DietitianDetails?.workFormat)
    ? specialist.DietitianDetails.workFormat
    : [];

  const workFormats = resolvedWorkFormats;

  return (
   <div className="box">
      <div className="group">
        <div className="div">
          <div className="text-wrapper-exp">Формат роботи</div>
          {Array.isArray(workFormats) && workFormats.length > 0 ? (
            <ul className="work-format-list">
              {workFormats.map((format, idx) => (
                <li key={`${format}-${idx}`} className="work-format-item">
                  {format}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-work-format">Формат роботи не вказано</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialistWorkFormat;