export const wedding = {
  couple: {
    bride: "Екатерина",
    groom: "Дмитрий",
    display: "Дмитрий & Екатерина",
  },
  date: {
    iso: "2026-08-07T15:00:00+04:00",
    display: "07.08.2026",
    displayLong: "7 августа 2026",
    time: "15:00",
    rsvpDeadline: "01.07.2026",
    /** День и месяц для hero: слева / справа */
    heroParts: ["07", "08"] as const,
    heroYear: "2026",
  },
  venue: {
    name: "Место проведения",
    address: "",
    mapUrl: "https://yandex.com/maps/-/CLBtySpG",
  },
  program: {
    guestArrival: { time: "14:00", label: "Сбор гостей" },
    banquet: { time: "18:00", label: "Начало банкета" },
  },
  dressCode: {
    title: "Дресс-код",
    hint: "FORMAL ATTIRE",
  },
  contacts: {
    phone: "+79991234567",
    phoneDisplay: "+7 (999) 123-45-67",
    telegram: "https://t.me/eventpoligrafia",
    telegramLabel: "@eventpoligrafia",
    whatsapp: "https://wa.me/79991234567",
  },
  rsvp: {
    privacyNote:
      "Нажимая на кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь c политикой конфиденциальности",
  },
} as const;

export const formOptions = {
  alcohol: [
    "Шампанское",
    "Вино",
    "Виски",
    "Коньяк",
    "Безалкогольное",
  ] as const,
  hotFood: ["Мясо", "Курица", "Рыба"] as const,
  attendanceYes: "Я(мы) с удовольствием приду(придём)",
  attendanceNo: "К сожалению, не смогу(не сможем) присутствовать",
} as const;
