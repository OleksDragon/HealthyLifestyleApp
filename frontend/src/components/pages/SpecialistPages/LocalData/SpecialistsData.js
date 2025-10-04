export const specialistsData = [
  {
    Id: "aa75c926-4f79-4f8b-95ab-a82a0f9394ce",
    UserId: "4f961890-80a0-4dd2-f6f8-08ddfa8fdadb",
    User: {
      Id: "4f961890-80a0-4dd2-f6f8-08ddfa8fdadb",
      FullName: "Антоніна Смила",
      Email: "psychologist@example.com",
      DateOfBirth: "0001-01-01T00:00:00",
      Gender: "Male",
      Weight: 0,
      Height: 0,
      ProfilePictureUrl: null,
      Bio: "Досвідчений психолог із 10-річним стажем.",
      CreatedAt: "2025-09-23T10:56:31.9548203",
      UpdatedAt: "2025-09-23T10:56:31.9548143",
      Phone: "+380501112233",
      Country: "Україна",
      City: "Київ",
      Street: "вул. Психологічна 15"
    },
    ProfessionalRoleType: {
      Id: "1908ed4b-761e-43b5-99f4-cc429a6bb25d",
      Name: "Psychologist",
      DefaultHourlyRate: 80
    },
    PsychologistDetails: {
      QualificationId: "aa75c926-4f79-4f8b-95ab-a82a0f9394ce",
      Biography: "Досвідчений психолог із 10-річним стажем.",
      Specializations: [
        "Когнітивно-поведінкова терапія",
        "Психоаналіз",
        "Сімейна терапія"
      ],
      TherapyApproaches: [
        "Когнітивно-поведінкова терапія",
        "Гештальт-терапія"
      ],
      ProfessionalLicenseNumber: "PSY-12345",
      ContactEmail: "psychologist@example.com",
      ContactPhone: "+380501112233",
      Website: "https://dronova-psychology.com",
      YearsOfExperience: 5,
      Certifications: [
        "Сертифікат CBT",
        "Сертифікат Гештальт-терапії"
      ],
      Availability: "Пн-Пт, 9:00-17:00",
      ClientTestimonials: "Відмінний спеціаліст, дуже допоміг у розв'язанні складних життєвих ситуацій!",
      
    },
    DietitianDetails: null,
    TrainerDetails: null,
    DoctorDetails: null,
    workFormat: [
      "Онлайн консультації через Zoom",
      "Очні сесії в кабінеті (за домовленістю)",
      "Щотижневі терапевтичні плани"
    ],
    HourlyRate: 80,
    Description: "Сертифікований психолог із досвідом у когнітивно-поведінковій терапії.",
    CertificatesUrl: "https://example.com/psychologist-certs.pdf",
    QualificationStatus: "Approved",
    ApplicationDate: "2025-09-23T10:56:32.0975128",
    ApprovalDate: "2025-09-23T10:56:32.0975867"
  },
  {
    Id: "4e31236d-19cd-484d-ac72-bb9c50caa72c",
    UserId: "64ef8efe-6a8a-4842-f6fd-08ddfa8fdadb",
    User: {
      Id: "64ef8efe-6a8a-4842-f6fd-08ddfa8fdadb",
      FullName: "Андрій Кач",
      Email: "trainer2@example.com",
      DateOfBirth: "0001-01-01T00:00:00",
      Gender: "Male",
      Weight: 0,
      Height: 0,
      ProfilePictureUrl: null,
      Bio: "Експерт з кардіотренувань та витривалості.",
      CreatedAt: "2025-09-23T10:56:32.862048",
      UpdatedAt: "2025-09-23T10:56:32.862042",
      Phone: "+380505556677",
      Country: "Україна",
      City: "Одеса",
      Street: "вул. Морська 12"
    },
    ProfessionalRoleType: {
      Id: "76dfd6a5-c06b-4b7a-abfb-3db39a782a95",
      Name: "Trainer",
      DefaultHourlyRate: 60
    },
    PsychologistDetails: null,
    DietitianDetails: null,
    TrainerDetails: {
      QualificationId: "4e31236d-19cd-484d-ac72-bb9c50caa72c",
      Biography: "Експерт з кардіотренувань та витривалості.",
      ContactEmail: "trainer2@example.com",
      ContactPhone: "+380505556677",
      Website: "https://kach-running.com",
      TrainingStyle: [
        "Кардіотренування",
        "Біг",
        "Функціональний тренінг"
      ],
      YearsOfExperience: 9,
      Certifications: [
        "NASM Certified Personal Trainer",
        "USA Track & Field Level 1"
      ],
      Availability: "Пн, Ср, Пт, 17:00-21:00",
      ClientTestimonials: "Андрій допоміг мені покращити витривалість та підготуватися до марафону!",
      PreferredWorkoutStyles: [
        "Марафонська підготовка",
        "Кругові тренування"
      ],
      ProfessionalLicenseNumber: null,
      HourlyRate: 50
    },
    DoctorDetails: null,
    workFormat: [
      "Онлайн супровід у Telegram",
      "Офлайн тренування в залі (за домовленістю)",
      "Щотижневі корекції плану"
    ],
    HourlyRate: 60,
    Description: "Сертифікований тренер з функціонального тренінгу та бігу.",
    CertificatesUrl: "https://example.com/trainer2-certs.pdf",
    QualificationStatus: "Approved",
    ApplicationDate: "2025-09-23T10:56:33.0046849",
    ApprovalDate: "2025-09-23T10:56:33.004685"
  },
  {
    Id: "1f9e6849-330e-4f2d-942a-e0927e442574",
    UserId: "ebc31f2f-0add-420d-f6fc-08ddfa8fdadb",
    User: {
      Id: "ebc31f2f-0add-420d-f6fc-08ddfa8fdadb",
      FullName: "Маргарита Дронова",
      Email: "trainer1@example.com",
      DateOfBirth: "0001-01-01T00:00:00",
      Gender: "Male",
      Weight: 0,
      Height: 0,
      ProfilePictureUrl: null,
      Bio: "Спеціалістка з йоги та пілатесу, допомагає з гнучкістю.",
      CreatedAt: "2025-09-23T10:56:32.7078742",
      UpdatedAt: "2025-09-23T10:56:32.7078619",
      Phone: "+380504445566",
      Country: "Україна",
      City: "Львів",
      Street: "вул. Гнучка 8"
    },
    ProfessionalRoleType: {
      Id: "76dfd6a5-c06b-4b7a-abfb-3db39a782a95",
      Name: "Trainer",
      DefaultHourlyRate: 60
    },
    PsychologistDetails: null,
    DietitianDetails: null,
    TrainerDetails: {
      QualificationId: "1f9e6849-330e-4f2d-942a-e0927e442574",
      Biography: "Спеціалістка з йоги та пілатесу, допомагає з гнучкістю.",
      ContactEmail: "trainer1@example.com",
      ContactPhone: "+380504445566",
      Website: "https://smila-yoga.com",
      TrainingStyle: [
        "Йога",
        "Пілатес",
        "Розтяжка"
      ],
      YearsOfExperience: 7,
      Certifications: [
        "RYT 200 Yoga Alliance",
        "Stott Pilates Certified"
      ],
      Availability: "Вт, Чт, Сб, 8:00-12:00",
      ClientTestimonials: "Антоніна допомогла мені знайти внутрішню гармонію та покращити гнучкість!",
      PreferredWorkoutStyles: [
        "Хатха-йога",
        "Він'яса-йога",
        "Класичний пілатес"
      ],
      ProfessionalLicenseNumber: null,
      HourlyRate: 0
    },
    DoctorDetails: null,
    workFormat: [
      "Онлайн супровід у Telegram",
      "Офлайн тренування в залі (за домовленістю)",
      "Щотижневі корекції плану"
    ],
    HourlyRate: 60,
    Description: "Сертифікований інструктор з йоги та пілатесу.",
    CertificatesUrl: "https://example.com/trainer1-certs.pdf",
    QualificationStatus: "Approved",
    ApplicationDate: "2025-09-23T10:56:32.8473142",
    ApprovalDate: "2025-09-23T10:56:32.8473143"
  },
  {
    Id: "9e23b0db-70d2-40f9-bef5-e4560320b44d",
    UserId: "c13be3ec-e3d9-47c3-f6fa-08ddfa8fdadb",
    User: {
      Id: "c13be3ec-e3d9-47c3-f6fa-08ddfa8fdadb",
      FullName: "Олексій Соколенко",
      Email: "trainer@example.com",
      DateOfBirth: "0001-01-01T00:00:00",
      Gender: "Male",
      Weight: 0,
      Height: 0,
      ProfilePictureUrl: null,
      Bio: "Професійний фітнес-тренер із 12-річним стажем.",
      CreatedAt: "2025-09-23T10:56:32.3698608",
      UpdatedAt: "2025-09-23T10:56:32.3698545",
      Phone: "+380503334455",
      Country: "Україна",
      City: "Париж",
      Street: "пр. Спортивний 10"
    },
    ProfessionalRoleType: {
      Id: "76dfd6a5-c06b-4b7a-abfb-3db39a782a95",
      Name: "Trainer",
      DefaultHourlyRate: 60
    },
    PsychologistDetails: null,
    DietitianDetails: null,
    TrainerDetails: {
      QualificationId: "9e23b0db-70d2-40f9-bef5-e4560320b44d",
      Biography: "Професійний фітнес-тренер із 12-річним стажем.",
      ContactEmail: "trainer@example.com",
      ContactPhone: "+380503334455",
      Website: "https://sokolenko-fitness.com",
      TrainingStyle: [
        "Силові тренування",
        "Функціональний тренінг"
      ],
      YearsOfExperience: 12,
      Certifications: [
        "Сертифікат CrossFit Level 1, ACE Certified"
      ],
      Availability: "Пн, Ср, Пт, 7:00-11:00 і 16:00-20:00",
      ClientTestimonials: "Олексій допоміг мені набрати м'язову масу та покращити витривалість!",
      PreferredWorkoutStyles: [
        "HIIT",
        "Кросфіт",
        "Бодібілдинг"
      ],
      ProfessionalLicenseNumber: null,
      HourlyRate: 0
    },
    DoctorDetails: null,
    workFormat: [
      "Онлайн супровід у Telegram",
      "Офлайн тренування в залі (за домовленістю)",
      "Щотижневі корекції плану"
    ],
    HourlyRate: 100,
    Description: "Сертифікований тренер із силових тренувань.",
    CertificatesUrl: "https://example.com/trainer-certs.pdf",
    QualificationStatus: "Approved",
    ApplicationDate: "2025-09-23T10:56:32.5129009",
    ApprovalDate: "2025-09-23T10:56:32.512901"
  },
  {
    Id: "f2af3d74-ab49-420e-ba9b-f68186d6f182",
    UserId: "df80659f-9026-4b60-f6fb-08ddfa8fdadb",
    User: {
      Id: "df80659f-9026-4b60-f6fb-08ddfa8fdadb",
      FullName: "Олександр Медичний",
      Email: "doctor@example.com",
      DateOfBirth: "0001-01-01T00:00:00",
      Gender: "Male",
      Weight: 0,
      Height: 0,
      ProfilePictureUrl: null,
      Bio: "Лікар загальної практики із 15-річним стажем.",
      CreatedAt: "2025-09-23T10:56:32.5456284",
      UpdatedAt: "2025-09-23T10:56:32.5456231",
      Phone: "+380507778899",
      Country: "Україна",
      City: "Київ",
      Street: "пр. Медичний 1"
    },
    ProfessionalRoleType: {
      Id: "c79d4e3f-7198-4411-b969-93bcb5eaf236",
      Name: "Doctor",
      DefaultHourlyRate: 100
    },
    PsychologistDetails: null,
    DietitianDetails: null,
    TrainerDetails: null,
    DoctorDetails: {
      QualificationId: "f2af3d74-ab49-420e-ba9b-f68186d6f182",
      Biography: "Лікар загальної практики із 15-річним стажем.",
      ContactEmail: "doctor@example.com",
      ContactPhone: "+380507778899",
      Website: "https://dralex.com",
      Specializations: [
        "Загальна практика",
        "Профілактична медицина",
        "Внутрішні хвороби"
      ],
      YearsOfExperience: 15,
      Certifications: [
        "Ліцензія лікаря, Сертифікат із сімейної медицини"
      ],
      Availability: "Пн, Ср, Пт, 10:00-14:00 (онлайн)",
      ClientTestimonials: "Дуже уважний і кваліфікований доктор!",
      ClinicAffiliation: "Міська лікарня №1",
      ProfessionalLicenseNumber: "MED-0001",
      
    },
    workFormat: [
      "Онлайн консультації через Zoom",
      "Очні прийоми в клініці (за домовленістю)",
      "Плани профілактики та лікування"
    ],
    HourlyRate: 100,
    Description: "Ліцензований лікар, спеціаліст із профілактичної медицини.",
    CertificatesUrl: "https://example.com/doctor-certs.pdf",
    QualificationStatus: "Approved",
    ApplicationDate: "2025-09-23T10:56:32.6771992",
    ApprovalDate: "2025-09-23T10:56:32.6771993"
  },
  {
    Id: "723b1cb4-bd28-437d-b1f5-f9a4309836b3",
    UserId: "63557132-9a49-4cd8-f6f9-08ddfa8fdadb",
    User: {
      Id: "63557132-9a49-4cd8-f6f9-08ddfa8fdadb",
      FullName: "Олеся Мамкіна",
      Email: "dietitian@example.com",
      DateOfBirth: "0001-01-01T00:00:00",
      Gender: "Male",
      Weight: 0,
      Height: 0,
      ProfilePictureUrl: null,
      Bio: "Досвідчений дієтолог із 8-річним стажем.",
      CreatedAt: "2025-09-23T10:56:32.1735873",
      UpdatedAt: "2025-09-23T10:56:32.1735807",
      Phone: "+380502223344",
      Country: "Україна",
      City: "Львів",
      Street: "вул. Здорова 25"
    },
    ProfessionalRoleType: {
      Id: "d1479646-378d-47a4-9341-f5c7672fccec",
      Name: "Dietitian",
      DefaultHourlyRate: 75
    },
    PsychologistDetails: null,
    DietitianDetails: {
      QualificationId: "723b1cb4-bd28-437d-b1f5-f9a4309836b3",
      Biography: "Досвідчений дієтолог із 8-річним стажем.",
      ContactEmail: "dietitian@example.com",
      ContactPhone: "+380502223344",
      Website: "https://mamkina-nutrition.com",
      Specializations: [
        "Спортивне харчування",
        "Планування раціону",
        "Дієтологія для схуднення"
      ],
      YearsOfExperience: 8,
      Certifications: [
        "Сертифікат із спортивного харчування",
        "Диплом дієтолога"
      ],
      Availability: "Пн-Пт, 10:00-16:00",
      ClientTestimonials: "Олеся склала ідеальний план харчування, який допоміг мені досягти цілей!",
      ProfessionalLicenseNumber: null
    },
    TrainerDetails: null,
    DoctorDetails: null,
    workFormat: [
      "Онлайн супровід у Telegram",
      "Очні консультації (за домовленістю)",
      "Щотижневі корекції плану харчування"
    ],
    HourlyRate: 50,
    Description: "Сертифікований дієтолог, спеціаліст із спортивного харчування.",
    CertificatesUrl: "https://example.com/dietitian-certs.pdf",
    QualificationStatus: "Approved",
    ApplicationDate: "2025-09-23T10:56:32.3394733",
    ApprovalDate: "2025-09-23T10:56:32.3394735"
  }
];