export const locales = ["tr", "en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  tr: "Turkce",
  en: "English",
  de: "Deutsch",
};

export const uiCopy: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    lessonsCta: string;
    openSourceNote: string;
    quizTitle: string;
    exerciseTitle: string;
    lessonsTitle: string;
    lessonIndexTitle: string;
    noLessonsTitle: string;
    noLessonsDescription: string;
    backToLessons: string;
    languageSwitcherLabel: string;
    lessonDurationSuffix: string;
    expectedOutcomeLabel: string;
    quizAnswerLabel: string;
    noActivityTitle: string;
    noActivityDescription: string;
    quizSubmit: string;
    quizNext: string;
    quizPrevious: string;
    quizQuestionLabel: string;
    quizResultLabel: string;
    quizCompletedLabel: string;
    quizChooseOptionLabel: string;
    exerciseYourSolution: string;
    exerciseCheckSolution: string;
    exerciseResetCode: string;
    exerciseHintsLabel: string;
    exercisePassedLabel: string;
    exerciseFailedLabel: string;
    exerciseMissingLabel: string;
    exerciseCompletedLabel: string;
    exerciseEditorLabel: string;
  }
> = {
  en: {
    title: "React Learning Hub",
    subtitle:
      "A portfolio-grade open-source platform for docs, interactive lessons, quizzes, and exercises.",
    lessonsCta: "Browse lessons",
    openSourceNote: "Built in public for learners and contributors.",
    quizTitle: "Quick Quiz",
    exerciseTitle: "Exercise",
    lessonsTitle: "Lessons",
    lessonIndexTitle: "Lesson Index",
    noLessonsTitle: "No lessons available yet",
    noLessonsDescription:
      "Start by adding an MDX file under content/{locale}/lessons.",
    backToLessons: "Back to lessons",
    languageSwitcherLabel: "Language switcher",
    lessonDurationSuffix: "min",
    expectedOutcomeLabel: "Expected outcome",
    quizAnswerLabel: "Answer",
    noActivityTitle: "No interactive activity available yet",
    noActivityDescription:
      "Add quiz and exercise entries for this locale under src/data.",
    quizSubmit: "Submit quiz",
    quizNext: "Next",
    quizPrevious: "Previous",
    quizQuestionLabel: "Question",
    quizResultLabel: "Score",
    quizCompletedLabel: "Last result",
    quizChooseOptionLabel: "Choose one option",
    exerciseYourSolution: "Your solution",
    exerciseCheckSolution: "Check solution",
    exerciseResetCode: "Reset code",
    exerciseHintsLabel: "Hints",
    exercisePassedLabel: "Exercise passed",
    exerciseFailedLabel: "Exercise needs improvement",
    exerciseMissingLabel: "Missing snippets",
    exerciseCompletedLabel: "Last exercise status",
    exerciseEditorLabel: "Edit your React solution",
  },
  tr: {
    title: "React Ogrenme Merkezi",
    subtitle:
      "Dokumantasyon, interaktif dersler, quiz ve exercise bolumlerini birlestiren acik kaynak egitim platformu.",
    lessonsCta: "Dersleri kesfet",
    openSourceNote: "Ogrenciler ve katki saglayanlar icin acik gelistirme.",
    quizTitle: "Hizli Quiz",
    exerciseTitle: "Exercise",
    lessonsTitle: "Dersler",
    lessonIndexTitle: "Ders Indeksi",
    noLessonsTitle: "Henuz ders yok",
    noLessonsDescription: "content/{locale}/lessons altina bir MDX dersi ekleyin.",
    backToLessons: "Derslere don",
    languageSwitcherLabel: "Dil degistirici",
    lessonDurationSuffix: "dk",
    expectedOutcomeLabel: "Beklenen cikti",
    quizAnswerLabel: "Dogru cevap",
    noActivityTitle: "Henuz interaktif icerik yok",
    noActivityDescription: "Bu locale icin src/data altina quiz ve exercise ekleyin.",
    quizSubmit: "Quizi gonder",
    quizNext: "Ileri",
    quizPrevious: "Geri",
    quizQuestionLabel: "Soru",
    quizResultLabel: "Puan",
    quizCompletedLabel: "Son sonuc",
    quizChooseOptionLabel: "Bir secenek sec",
    exerciseYourSolution: "Cozumun",
    exerciseCheckSolution: "Cozumu kontrol et",
    exerciseResetCode: "Kodu sifirla",
    exerciseHintsLabel: "Ipuclari",
    exercisePassedLabel: "Exercise basarili",
    exerciseFailedLabel: "Exercise gelistirilmeli",
    exerciseMissingLabel: "Eksik parcalar",
    exerciseCompletedLabel: "Son exercise durumu",
    exerciseEditorLabel: "React cozumunu duzenle",
  },
  de: {
    title: "React Lernzentrum",
    subtitle:
      "Eine Open-Source-Lernplattform mit Dokumentation, interaktiven Lektionen, Quiz und Uebungen.",
    lessonsCta: "Lektionen ansehen",
    openSourceNote: "Open source fuer Lernende und Mitwirkende.",
    quizTitle: "Kurzquiz",
    exerciseTitle: "Uebung",
    lessonsTitle: "Lektionen",
    lessonIndexTitle: "Lektionsindex",
    noLessonsTitle: "Noch keine Lektionen verfuegbar",
    noLessonsDescription:
      "Fuege eine MDX-Datei unter content/{locale}/lessons hinzu.",
    backToLessons: "Zurueck zu den Lektionen",
    languageSwitcherLabel: "Sprachauswahl",
    lessonDurationSuffix: "Min",
    expectedOutcomeLabel: "Erwartetes Ergebnis",
    quizAnswerLabel: "Antwort",
    noActivityTitle: "Noch keine interaktiven Inhalte verfuegbar",
    noActivityDescription:
      "Fuege Quiz- und Exercise-Eintraege fuer diese Sprache unter src/data hinzu.",
    quizSubmit: "Quiz senden",
    quizNext: "Weiter",
    quizPrevious: "Zurueck",
    quizQuestionLabel: "Frage",
    quizResultLabel: "Punktzahl",
    quizCompletedLabel: "Letztes Ergebnis",
    quizChooseOptionLabel: "Eine Option waehlen",
    exerciseYourSolution: "Deine Loesung",
    exerciseCheckSolution: "Loesung pruefen",
    exerciseResetCode: "Code zuruecksetzen",
    exerciseHintsLabel: "Hinweise",
    exercisePassedLabel: "Exercise bestanden",
    exerciseFailedLabel: "Exercise muss verbessert werden",
    exerciseMissingLabel: "Fehlende Teile",
    exerciseCompletedLabel: "Letzter Exercise-Status",
    exerciseEditorLabel: "Deine React-Loesung bearbeiten",
  },
};
