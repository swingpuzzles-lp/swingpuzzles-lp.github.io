(function () {
    const translations = {
        en: {
            "meta.description": "SwingPuzzles - 1-minute daily fact and puzzle. First a short surprising fact, then a tiny puzzle to solve. A quick refresh for your day.",
            "title.main": "SwingPuzzles - Daily 1-Minute Puzzle",
            "hero.mascotAlt": "SwingPuzzles mascot",
            "hero.heading": "1-minute daily fact and puzzle",
            "hero.subheading": "First a short surprising fact, then a tiny puzzle to solve. A quick refresh for your day.",
            "hero.primaryCta": "Get today's fact & puzzle",
            "hero.note": "Free. No spam. Unsubscribe anytime.",
            "form.heading": "Get your first fact & puzzle today",
            "form.name.label": "First name (optional)",
            "form.name.placeholder": "Optional, for a more personal email",
            "form.email.label": "Email address *",
            "form.email.placeholder": "your@email.com",
            "form.submitCta": "Send me today's fact & puzzle",
            "form.gdprNote": "After confirming your email, you'll start receiving daily or weekly emails with facts and puzzles from SwingPuzzles. You can unsubscribe at any time.",
            "video.heading": "See how it works in 30 seconds",
            "video.fallback": "Your browser does not support the video tag.",
            "video.caption": "This is an example: first a fun fact on screen, then a tiny puzzle to solve.",
            "video.cta": "Get today's fact & puzzle",
            "steps.heading": "How it works",
            "steps.1.title": "We email you a short surprising fact",
            "steps.1.body": "Receive a fresh fact in your inbox to spark your curiosity and start your day with something interesting.",
            "steps.2.title": "You solve a tiny puzzle related to the fact",
            "steps.2.body": "Engage with a quick puzzle that connects to the fact you just learned, making it memorable and fun.",
            "steps.3.title": "You get a quick 1-minute mental reset",
            "steps.3.body": "Switch your mind from stress to play with a satisfying brain break that leaves you refreshed.",
            "benefits.heading": "Why people like it",
            "benefits.1.title": "Takes about a minute a day",
            "benefits.1.body": "A quick daily habit that fits perfectly into your morning routine or coffee break.",
            "benefits.2.title": "Helps you switch your mind from stress to play",
            "benefits.2.body": "A gentle mental shift that helps you break away from worries and engage with something fun.",
            "benefits.3.title": "Family-friendly and screen-friendly",
            "benefits.3.body": "Safe, positive content that anyone can enjoy without worry. Perfect for all ages.",
            "finalCta.heading": "Ready for your next 1-minute break?",
            "finalCta.primaryCta": "Get today's fact & puzzle",
            "footer.brand": "SwingPuzzles",
            "footer.tagline": "Daily facts and puzzles for everyone",
            "footer.privacy": "Privacy Policy",
            "footer.contact": "Contact",
            "footer.copyright": "© SwingPuzzles"
        },
        de: {
            "meta.description": "SwingPuzzles – 1‑minütige tägliche Fakten und Rätsel. Erst eine kurze überraschende Info, dann ein kleines Rätsel dazu. Ein schneller Frischekick für deinen Tag.",
            "title.main": "SwingPuzzles – Dein tägliches 1‑Minuten‑Rätsel",
            "hero.mascotAlt": "SwingPuzzles Maskottchen",
            "hero.heading": "Dein täglicher 1‑Minuten‑Fakt mit Rätsel",
            "hero.subheading": "Zuerst ein kurzer überraschender Fakt, dann ein kleines Rätsel dazu. Ein schneller mentaler Reset für deinen Tag.",
            "hero.primaryCta": "Hol dir den Fakt & das Rätsel von heute",
            "hero.note": "Kostenlos. Kein Spam. Jederzeit abbestellbar.",
            "form.heading": "Hol dir heute dein erstes Fakt-&-Rätsel‑Paket",
            "form.name.label": "Vorname (optional)",
            "form.name.placeholder": "Optional – für eine persönlichere E‑Mail",
            "form.email.label": "E‑Mail‑Adresse *",
            "form.email.placeholder": "du@example.com",
            "form.submitCta": "Schick mir den Fakt & das Rätsel von heute",
            "form.gdprNote": "Nachdem du deine E‑Mail bestätigt hast, bekommst du täglich oder wöchentlich Fakten und Rätsel von SwingPuzzles. Du kannst dich jederzeit wieder abmelden.",
            "video.heading": "So funktioniert es – in 30 Sekunden",
            "video.fallback": "Dein Browser unterstützt das Video-Tag nicht.",
            "video.caption": "Ein Beispiel: erst ein spannender Fakt auf dem Bildschirm, dann ein kleines Rätsel dazu.",
            "video.cta": "Hol dir den Fakt & das Rätsel von heute",
            "steps.heading": "So läuft es ab",
            "steps.1.title": "Wir schicken dir einen kurzen, überraschenden Fakt",
            "steps.1.body": "Du bekommst einen frischen Fakt in dein Postfach, der deine Neugier weckt und deinen Tag interessant startet.",
            "steps.2.title": "Du löst ein kleines Rätsel passend zum Fakt",
            "steps.2.body": "Ein schnelles Rätsel, das direkt an den Fakt anknüpft – so bleibt er besser im Kopf und macht mehr Spaß.",
            "steps.3.title": "Du gönnst dir einen 1‑Minuten‑Mental-Reset",
            "steps.3.body": "Du schaltest kurz von Stress auf Spielmodus um – mit einer kurzen Gehirnpause, nach der du dich frischer fühlst.",
            "benefits.heading": "Warum Leute es mögen",
            "benefits.1.title": "Dauert ungefähr eine Minute am Tag",
            "benefits.1.body": "Eine kleine tägliche Gewohnheit, die perfekt in deine Morgenroutine oder Kaffeepause passt.",
            "benefits.2.title": "Hilft dir, vom Stress in den Spielmodus zu wechseln",
            "benefits.2.body": "Ein sanfter mentaler Wechsel, der dich kurz aus dem Grübeln holt und zu etwas Spielerischem bringt.",
            "benefits.3.title": "Familienfreundlich und bildschirmfreundlich",
            "benefits.3.body": "Positive, unbedenkliche Inhalte, die allen Spaß machen. Geeignet für alle Altersgruppen.",
            "finalCta.heading": "Bereit für deine nächste 1‑Minuten‑Pause?",
            "finalCta.primaryCta": "Hol dir den Fakt & das Rätsel von heute",
            "footer.brand": "SwingPuzzles",
            "footer.tagline": "Tägliche Fakten und Rätsel für alle",
            "footer.privacy": "Datenschutzerklärung",
            "footer.contact": "Kontakt",
            "footer.copyright": "© SwingPuzzles"
        }
    };

    const supportedLangs = ["en", "de"];
    const defaultLang = "en";

    function getLangFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get("lang");
        if (lang && supportedLangs.includes(lang.toLowerCase())) {
            return lang.toLowerCase();
        }
        return defaultLang;
    }

    function setLangInUrl(lang) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.replaceState({}, "", url.toString());
    }

    function applyTranslations(dict) {
        if (!dict) return;

        // Text nodes
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Attribute-based translations (placeholder, alt, etc.)
        document.querySelectorAll("[data-i18n-attr-placeholder]").forEach(el => {
            const key = el.getAttribute("data-i18n-attr-placeholder");
            if (dict[key]) {
                el.setAttribute("placeholder", dict[key]);
            }
        });

        document.querySelectorAll("[data-i18n-attr-alt]").forEach(el => {
            const key = el.getAttribute("data-i18n-attr-alt");
            if (dict[key]) {
                el.setAttribute("alt", dict[key]);
            }
        });

        // Meta tags (e.g., description)
        document.querySelectorAll("[data-i18n-meta]").forEach(el => {
            const key = el.getAttribute("data-i18n-meta");
            if (dict[key]) {
                el.setAttribute("content", dict[key]);
            }
        });

        // Also update the document title if key exists
        const titleEl = document.querySelector("title[data-i18n]");
        if (titleEl) {
            const key = titleEl.getAttribute("data-i18n");
            if (dict[key]) {
                titleEl.textContent = dict[key];
            }
        }
    }

    function markActiveLanguage(lang) {
        document.querySelectorAll("[data-lang-switch]").forEach(link => {
            if (link.getAttribute("data-lang-switch") === lang) {
                link.classList.add("active-lang");
            } else {
                link.classList.remove("active-lang");
            }
        });
    }

    function initLanguage() {
        const lang = getLangFromUrl();
        applyTranslations(translations[lang] || translations[defaultLang]);
        markActiveLanguage(lang);

        // Ensure URL always contains current language
        setLangInUrl(lang);

        // Wire up switcher links to change language without full reload
        document.querySelectorAll("[data-lang-switch]").forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const newLang = this.getAttribute("data-lang-switch");
                if (!supportedLangs.includes(newLang)) return;
                applyTranslations(translations[newLang] || translations[defaultLang]);
                markActiveLanguage(newLang);
                setLangInUrl(newLang);
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLanguage);
    } else {
        initLanguage();
    }
})();


