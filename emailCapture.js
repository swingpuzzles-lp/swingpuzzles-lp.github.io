(function () {
    /**
     * Simple EmailCaptureService for the static landing page
     */
    class EmailCaptureService {
        static getBackendUrl() {
            const host = window.location.hostname;
            const isLocal =
                host === "localhost" ||
                host === "127.0.0.1" ||
                host === "" ||
                host === "0.0.0.0";

            return isLocal
                ? "http://localhost:8000/www/process.php"
                : "https://mail.swingpuzzles.com/process.php";
        }

        static getCurrentLocale() {
            const params = new URLSearchParams(window.location.search);
            const lang = (params.get("lang") || "en").toLowerCase();
            return lang;
        }

        static generateHotPotValue() {
            return "email_capture_" + Date.now();
        }

        static getCurrentTimezone() {
            try {
                return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
            } catch {
                return "UTC";
            }
        }

        static validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        /**
         * Submit email capture data to backend
         * @param {Object} formData
         * @returns {Promise<{success: boolean, message?: string}>}
         */
        static async submitEmailCapture(formData) {
            const backendUrl = EmailCaptureService.getBackendUrl();

            try {
                const response = await fetch(backendUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                const result = await response.json();
                return {
                    success: !!result.success,
                    message: result.message,
                };
            } catch (err) {
                console.error("Email capture submission error:", err);
                return {
                    success: false,
                    message: "Network error occurred",
                };
            }
        }
    }

    function initEmailForm() {
        const form = document.querySelector("#signup form");
        if (!form) return;

        const emailInput = /** @type {HTMLInputElement|null} */ (
            form.querySelector("#email")
        );
        const nameInput = /** @type {HTMLInputElement|null} */ (
            form.querySelector("#name")
        );

        // Optional message container under the form
        let messageEl = document.getElementById("email-form-message");
        if (!messageEl) {
            messageEl = document.createElement("div");
            messageEl.id = "email-form-message";
            messageEl.style.marginTop = "12px";
            messageEl.style.fontSize = "0.9rem";
            form.appendChild(messageEl);
        }

        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            if (!emailInput) return;

            const email = emailInput.value.trim();
            const name = nameInput ? nameInput.value.trim() : "";

            if (!EmailCaptureService.validateEmail(email)) {
                messageEl.textContent = "Please enter a valid email address.";
                messageEl.style.color = "#b00020";
                return;
            }

            const payload = {
                email,
                name: name || undefined,
                locale: EmailCaptureService.getCurrentLocale(),
                hotPot: EmailCaptureService.generateHotPotValue(),
                recaptchaToken: "",
                timezone: EmailCaptureService.getCurrentTimezone(),
            };

            messageEl.textContent = "Sending...";
            messageEl.style.color = "#555555";

            const result = await EmailCaptureService.submitEmailCapture(payload);

            if (result.success) {
                messageEl.textContent =
                    result.message || "Check your inbox to confirm your subscription.";
                messageEl.style.color = "#0a7b28";
                form.reset();
            } else {
                messageEl.textContent =
                    result.message || "Something went wrong. Please try again.";
                messageEl.style.color = "#b00020";
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initEmailForm);
    } else {
        initEmailForm();
    }

    // Expose for debugging if needed
    window.EmailCaptureService = EmailCaptureService;
})();


