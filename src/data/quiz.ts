import type { Locale } from "@/lib/i18n";
import type { LessonQuiz } from "@/types/learning";

export const quizByLocale: Record<Locale, LessonQuiz[]> = {
  en: [
    {
      id: "react-basics-quiz",
      lessonSlug: "react-basics",
      title: "React Basics Quiz",
      questions: [
        {
          id: "state-1",
          prompt: "Which hook is used for local component state?",
          options: ["useMemo", "useState", "useEffect", "useRef"],
          correctIndex: 1,
          explanation: "useState stores and updates local state in function components.",
        },
        {
          id: "props-1",
          prompt: "What are props primarily used for in React?",
          options: [
            "Mutating parent state directly",
            "Passing data from parent to child",
            "Styling components globally",
            "Replacing component state",
          ],
          correctIndex: 1,
          explanation: "Props are read-only inputs used to pass data to child components.",
        },
        {
          id: "component-1",
          prompt: "Which statement best describes a React component?",
          options: [
            "A CSS module",
            "A function that returns UI",
            "A global event listener",
            "A build-time plugin",
          ],
          correctIndex: 1,
          explanation: "In modern React, components are usually functions that return JSX.",
        },
      ],
    },
    {
      id: "jsx-and-rendering-quiz",
      lessonSlug: "jsx-and-rendering",
      title: "JSX and Rendering Quiz",
      questions: [
        {
          id: "jsx-1",
          prompt: "What does JSX primarily describe?",
          options: ["Database schema", "UI structure", "HTTP headers", "Build cache"],
          correctIndex: 1,
          explanation: "JSX describes UI structure that React renders.",
        },
      ],
    },
    {
      id: "components-and-props-quiz",
      lessonSlug: "components-and-props",
      title: "Components and Props Quiz",
      questions: [
        {
          id: "props-2",
          prompt: "How should a component treat incoming props?",
          options: ["Mutable data", "Read-only inputs", "Global state", "Local side effects"],
          correctIndex: 1,
          explanation: "Props are read-only inputs passed from parent components.",
        },
      ],
    },
    {
      id: "state-and-events-quiz",
      lessonSlug: "state-and-events",
      title: "State and Events Quiz",
      questions: [
        {
          id: "events-1",
          prompt: "Where should button click logic usually live?",
          options: ["In CSS", "In event handlers", "In robots.txt", "In HTML comments"],
          correctIndex: 1,
          explanation: "Event handlers are the standard place for interaction logic.",
        },
      ],
    },
    {
      id: "conditional-and-list-rendering-quiz",
      lessonSlug: "conditional-and-list-rendering",
      title: "Conditional and List Rendering Quiz",
      questions: [
        {
          id: "list-1",
          prompt: "What is the main purpose of keys in list rendering?",
          options: [
            "Add CSS classes",
            "Help React track item identity",
            "Enable TypeScript",
            "Prevent network requests",
          ],
          correctIndex: 1,
          explanation: "Keys help React identify items between renders.",
        },
      ],
    },
    {
      id: "effects-and-lifecycle-quiz",
      lessonSlug: "effects-and-lifecycle",
      title: "Effects and Lifecycle Quiz",
      questions: [
        {
          id: "effect-1",
          prompt: "When is useEffect most appropriate?",
          options: [
            "For pure calculations",
            "For syncing with external systems",
            "For JSX styling",
            "For static routing",
          ],
          correctIndex: 1,
          explanation: "useEffect is for side effects and external synchronization.",
        },
      ],
    },
    {
      id: "forms-and-controlled-inputs-quiz",
      lessonSlug: "forms-and-controlled-inputs",
      title: "Forms and Controlled Inputs Quiz",
      questions: [
        {
          id: "form-1",
          prompt: "A controlled input is typically managed by:",
          options: ["DOM only", "React state", "Cookies", "Server logs"],
          correctIndex: 1,
          explanation: "Controlled inputs bind input value to React state.",
        },
      ],
    },
    {
      id: "lifting-state-and-composition-quiz",
      lessonSlug: "lifting-state-and-composition",
      title: "Lifting State and Composition Quiz",
      questions: [
        {
          id: "lift-1",
          prompt: "Why lift state up?",
          options: [
            "To share data between related components",
            "To disable rendering",
            "To replace props",
            "To avoid TypeScript",
          ],
          correctIndex: 0,
          explanation: "Lift state to a common parent when siblings need shared data.",
        },
      ],
    },
    {
      id: "routing-with-nextjs-quiz",
      lessonSlug: "routing-with-nextjs",
      title: "Routing with Next.js Quiz",
      questions: [
        {
          id: "route-1",
          prompt: "What does a folder like [slug] represent in App Router?",
          options: ["Static asset", "Dynamic route segment", "Test fixture", "Lint rule"],
          correctIndex: 1,
          explanation: "Bracket folders define dynamic route segments.",
        },
      ],
    },
    {
      id: "data-fetching-and-server-components-quiz",
      lessonSlug: "data-fetching-and-server-components",
      title: "Data Fetching and Server Components Quiz",
      questions: [
        {
          id: "server-1",
          prompt: "What is a key benefit of Server Components?",
          options: [
            "Larger client bundles",
            "Reduced client JavaScript",
            "No routing support",
            "No async support",
          ],
          correctIndex: 1,
          explanation: "Server Components keep more logic on the server and reduce client JS.",
        },
      ],
    },
  ],
  tr: [
    {
      id: "react-basics-quiz",
      lessonSlug: "react-basics",
      title: "React Temelleri Quiz",
      questions: [
        {
          id: "state-1",
          prompt: "Bilesen ici local state icin hangi hook kullanilir?",
          options: ["useMemo", "useState", "useEffect", "useRef"],
          correctIndex: 1,
          explanation: "useState, function component icinde local state tutar ve gunceller.",
        },
        {
          id: "props-1",
          prompt: "React'te props ne icin kullanilir?",
          options: [
            "Parent state'i dogrudan degistirmek",
            "Parent'tan child'a veri aktarmak",
            "Tum uygulamayi stillendirmek",
            "State yerine gecmek",
          ],
          correctIndex: 1,
          explanation: "Props, parent componentten child componente veri tasimak icin kullanilir.",
        },
        {
          id: "component-1",
          prompt: "React component tanimi icin en dogru ifade hangisidir?",
          options: [
            "Bir CSS dosyasi",
            "UI donduren bir fonksiyon",
            "Global event listener",
            "Build eklentisi",
          ],
          correctIndex: 1,
          explanation: "Modern React'te componentler genellikle JSX donduren fonksiyonlardir.",
        },
      ],
    },
    {
      id: "jsx-and-rendering-quiz",
      lessonSlug: "jsx-and-rendering",
      title: "JSX ve Render Quiz",
      questions: [
        {
          id: "jsx-1",
          prompt: "JSX temelde neyi ifade eder?",
          options: ["Veritabani semasi", "UI yapisi", "HTTP basligi", "Build cache"],
          correctIndex: 1,
          explanation: "JSX, React'in render ettigi UI yapisini tanimlar.",
        },
      ],
    },
    {
      id: "components-and-props-quiz",
      lessonSlug: "components-and-props",
      title: "Component ve Props Quiz",
      questions: [
        {
          id: "props-2",
          prompt: "Bir component props verisini nasil ele almalidir?",
          options: ["Degistirilebilir veri", "Read-only girdi", "Global state", "Yan etki"],
          correctIndex: 1,
          explanation: "Props parent tarafindan gelen read-only verilerdir.",
        },
      ],
    },
    {
      id: "state-and-events-quiz",
      lessonSlug: "state-and-events",
      title: "State ve Event Quiz",
      questions: [
        {
          id: "events-1",
          prompt: "Buton tiklama mantigi genelde nerede olur?",
          options: ["CSS", "Event handler", "robots.txt", "HTML comment"],
          correctIndex: 1,
          explanation: "Etkilesim mantigi event handler fonksiyonlarinda tutulur.",
        },
      ],
    },
    {
      id: "conditional-and-list-rendering-quiz",
      lessonSlug: "conditional-and-list-rendering",
      title: "Kosullu ve Liste Render Quiz",
      questions: [
        {
          id: "list-1",
          prompt: "Listede key kullanmanin ana amaci nedir?",
          options: [
            "CSS eklemek",
            "React'in oge kimligini takip etmesi",
            "TypeScript acmak",
            "Network azaltmak",
          ],
          correctIndex: 1,
          explanation: "Key degerleri React'e listede hangi ogenin hangisi oldugunu soyler.",
        },
      ],
    },
    {
      id: "effects-and-lifecycle-quiz",
      lessonSlug: "effects-and-lifecycle",
      title: "Effect ve Yasam Dongusu Quiz",
      questions: [
        {
          id: "effect-1",
          prompt: "useEffect en uygun olarak ne icin kullanilir?",
          options: [
            "Saf hesaplamalar",
            "Dis sistemlerle senkronizasyon",
            "Sadece stil vermek",
            "Statik route",
          ],
          correctIndex: 1,
          explanation: "useEffect yan etkiler ve dis sistem senkronizasyonu icindir.",
        },
      ],
    },
    {
      id: "forms-and-controlled-inputs-quiz",
      lessonSlug: "forms-and-controlled-inputs",
      title: "Form ve Controlled Input Quiz",
      questions: [
        {
          id: "form-1",
          prompt: "Controlled input genelde ne ile yonetilir?",
          options: ["Sadece DOM", "React state", "Cookie", "Server log"],
          correctIndex: 1,
          explanation: "Controlled input, degerini React state'ten alir.",
        },
      ],
    },
    {
      id: "lifting-state-and-composition-quiz",
      lessonSlug: "lifting-state-and-composition",
      title: "State Yukari Tasima Quiz",
      questions: [
        {
          id: "lift-1",
          prompt: "State'i yukari tasimanin nedeni nedir?",
          options: [
            "Ilgili componentler arasi veri paylasimi",
            "Renderi kapatmak",
            "Props kaldirmak",
            "TypeScript kullanmamak",
          ],
          correctIndex: 0,
          explanation: "Kardes componentler ayni veriye ihtiyac duydugunda state parent'ta tutulur.",
        },
      ],
    },
    {
      id: "routing-with-nextjs-quiz",
      lessonSlug: "routing-with-nextjs",
      title: "Next.js Router Quiz",
      questions: [
        {
          id: "route-1",
          prompt: "App Router'da [slug] klasoru neyi temsil eder?",
          options: ["Statik dosya", "Dinamik route segmenti", "Test fixture", "Lint kurali"],
          correctIndex: 1,
          explanation: "Kose parantezli klasorler dinamik route segmenti tanimlar.",
        },
      ],
    },
    {
      id: "data-fetching-and-server-components-quiz",
      lessonSlug: "data-fetching-and-server-components",
      title: "Data Fetching ve Server Component Quiz",
      questions: [
        {
          id: "server-1",
          prompt: "Server Componentlerin onemli faydasi nedir?",
          options: [
            "Daha buyuk client bundle",
            "Daha az client JavaScript",
            "Routing olmamasi",
            "Async olmamasi",
          ],
          correctIndex: 1,
          explanation: "Server componentler client'a giden JavaScript miktarini azaltir.",
        },
      ],
    },
  ],
  de: [
    {
      id: "react-basics-quiz",
      lessonSlug: "react-basics",
      title: "React Grundlagen Quiz",
      questions: [
        {
          id: "state-1",
          prompt: "Welcher Hook verwaltet lokalen Komponenten-State?",
          options: ["useMemo", "useState", "useEffect", "useRef"],
          correctIndex: 1,
          explanation: "useState speichert und aktualisiert lokalen Zustand in Funktionskomponenten.",
        },
        {
          id: "props-1",
          prompt: "Wofuer werden Props in React hauptsaechlich verwendet?",
          options: [
            "Direktes Aendern von Parent-State",
            "Daten von Parent zu Child weitergeben",
            "Globales Styling erzwingen",
            "State komplett ersetzen",
          ],
          correctIndex: 1,
          explanation: "Props sind unveraenderliche Eingaben fuer Child-Komponenten.",
        },
        {
          id: "component-1",
          prompt: "Welche Aussage beschreibt eine React-Komponente am besten?",
          options: [
            "Eine CSS-Datei",
            "Eine Funktion, die UI zurueckgibt",
            "Ein globaler Event-Listener",
            "Ein Build-Plugin",
          ],
          correctIndex: 1,
          explanation: "In modernem React sind Komponenten meist Funktionen, die JSX zurueckgeben.",
        },
      ],
    },
    {
      id: "jsx-and-rendering-quiz",
      lessonSlug: "jsx-and-rendering",
      title: "JSX und Rendering Quiz",
      questions: [
        {
          id: "jsx-1",
          prompt: "Was beschreibt JSX hauptsaechlich?",
          options: ["Datenbankschema", "UI-Struktur", "HTTP-Header", "Build-Cache"],
          correctIndex: 1,
          explanation: "JSX beschreibt die UI-Struktur, die React rendert.",
        },
      ],
    },
    {
      id: "components-and-props-quiz",
      lessonSlug: "components-and-props",
      title: "Komponenten und Props Quiz",
      questions: [
        {
          id: "props-2",
          prompt: "Wie sollten Props in einer Komponente behandelt werden?",
          options: ["Veraenderbar", "Read-only Eingaben", "Globaler State", "Seiteneffekte"],
          correctIndex: 1,
          explanation: "Props sind unveraenderliche Eingaben von Parent-Komponenten.",
        },
      ],
    },
    {
      id: "state-and-events-quiz",
      lessonSlug: "state-and-events",
      title: "State und Events Quiz",
      questions: [
        {
          id: "events-1",
          prompt: "Wo liegt Click-Logik typischerweise?",
          options: ["In CSS", "In Event-Handlern", "In robots.txt", "In Kommentaren"],
          correctIndex: 1,
          explanation: "Interaktionslogik liegt in Event-Handlern.",
        },
      ],
    },
    {
      id: "conditional-and-list-rendering-quiz",
      lessonSlug: "conditional-and-list-rendering",
      title: "Bedingtes und Listen-Rendering Quiz",
      questions: [
        {
          id: "list-1",
          prompt: "Wozu dienen Keys beim Listen-Rendering?",
          options: [
            "CSS anwenden",
            "Element-Identitaet fuer React",
            "TypeScript aktivieren",
            "Netzwerk sparen",
          ],
          correctIndex: 1,
          explanation: "Keys helfen React, Listenelemente korrekt zuzuordnen.",
        },
      ],
    },
    {
      id: "effects-and-lifecycle-quiz",
      lessonSlug: "effects-and-lifecycle",
      title: "Effects und Lifecycle Quiz",
      questions: [
        {
          id: "effect-1",
          prompt: "Wann ist useEffect am sinnvollsten?",
          options: [
            "Fuer reine Berechnungen",
            "Fuer externe Synchronisation",
            "Nur fuer Styling",
            "Fuer statisches Routing",
          ],
          correctIndex: 1,
          explanation: "useEffect dient fuer Seiteneffekte und externe Synchronisation.",
        },
      ],
    },
    {
      id: "forms-and-controlled-inputs-quiz",
      lessonSlug: "forms-and-controlled-inputs",
      title: "Formulare und Controlled Inputs Quiz",
      questions: [
        {
          id: "form-1",
          prompt: "Wodurch wird ein controlled input verwaltet?",
          options: ["Nur DOM", "React State", "Cookies", "Server-Logs"],
          correctIndex: 1,
          explanation: "Controlled Inputs binden ihren Wert an React-State.",
        },
      ],
    },
    {
      id: "lifting-state-and-composition-quiz",
      lessonSlug: "lifting-state-and-composition",
      title: "State Lifting und Composition Quiz",
      questions: [
        {
          id: "lift-1",
          prompt: "Warum hebt man State nach oben?",
          options: [
            "Um Daten zwischen verwandten Komponenten zu teilen",
            "Um Rendering zu stoppen",
            "Um Props zu ersetzen",
            "Um TypeScript zu vermeiden",
          ],
          correctIndex: 0,
          explanation: "State wird angehoben, wenn Geschwister gemeinsame Daten brauchen.",
        },
      ],
    },
    {
      id: "routing-with-nextjs-quiz",
      lessonSlug: "routing-with-nextjs",
      title: "Routing mit Next.js Quiz",
      questions: [
        {
          id: "route-1",
          prompt: "Was bedeutet ein Ordner wie [slug] im App Router?",
          options: ["Statische Datei", "Dynamisches Segment", "Testdaten", "Lint-Regel"],
          correctIndex: 1,
          explanation: "Ordner mit Klammern stehen fuer dynamische Segmente.",
        },
      ],
    },
    {
      id: "data-fetching-and-server-components-quiz",
      lessonSlug: "data-fetching-and-server-components",
      title: "Data Fetching und Server Components Quiz",
      questions: [
        {
          id: "server-1",
          prompt: "Was ist ein wichtiger Vorteil von Server Components?",
          options: [
            "Groesseres Client-Bundle",
            "Weniger Client-JavaScript",
            "Kein Routing",
            "Kein Async",
          ],
          correctIndex: 1,
          explanation: "Server Components reduzieren JavaScript, das an den Client gesendet wird.",
        },
      ],
    },
  ],
};
