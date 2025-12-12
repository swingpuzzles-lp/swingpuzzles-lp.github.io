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

        static getCurrentLang() {
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

            const FBIdentifiers = {
                getFbp() {
                    return this.getCookie("_fbp") || null;
                },
            
                getFbclid() {
                    const params = new URLSearchParams(window.location.search);
                    return params.get("fbclid") || null;
                },
            
                getFbc() {
                    // Try read cookie first
                    const existing = this.getCookie("_fbc");
                    if (existing) return existing;
            
                    // If no cookie, try reconstruct from fbclid
                    const fbclid = this.getFbclid();
                    if (!fbclid) return null;
            
                    const timestamp = Date.now();
                    return `fb.1.${timestamp}.${fbclid}`;
                },
            
                getCookie(name) {
                    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
                    return match ? match[2] : null;
                },
            };
            
            // Obtain reCAPTCHA token (dev/prod keys)
            let recaptchaToken = "";
            try {
                const host = window.location.hostname;
                const isLocal =
                    host === "localhost" ||
                    host === "127.0.0.1" ||
                    host === "" ||
                    host === "0.0.0.0";

                const recaptchaSiteKey = isLocal
                    ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Dev/test key
                    : "6LfZaPArAAAAAMtiOUSt4q2DfYIADMEXxVP-maLm"; // Production key

                messageEl.textContent = "Please complete reCAPTCHA...";
                messageEl.style.color = "#555555";

                await RecaptchaManager.loadRecaptcha(recaptchaSiteKey);
                recaptchaToken = await RecaptchaManager.showCheckbox(() => {});
            } catch (recaptchaError) {
                console.error("reCAPTCHA error:", recaptchaError);
                messageEl.textContent =
                    "reCAPTCHA verification failed. Please try again.";
                messageEl.style.color = "#b00020";
                return;
            }

            const payload = {
                email,
                name: name || undefined,
                lang: EmailCaptureService.getCurrentLang(),
                hotPot: EmailCaptureService.generateHotPotValue(),
                recaptchaToken,
                timezone: EmailCaptureService.getCurrentTimezone(),
                fbc: FBIdentifiers.getFbc(),
                fbp: FBIdentifiers.getFbp(),
            };

            messageEl.textContent = "Sending...";
            messageEl.style.color = "#555555";

            const result = await EmailCaptureService.submitEmailCapture(payload);

            if (result.success) {
                // Track Facebook Pixel Lead event
                if (typeof fbq !== 'undefined') {
                    fbq('trackCustom', 'EmailEntered');
                }
                
                // Redirect to success page with language and email provider parameters
                const currentLang = EmailCaptureService.getCurrentLang();
                // Extract email provider (part after @, before first dot)
                const emailParts = email.split('@');
                const domain = emailParts[1];
                const emailProvider = domain ? domain.split('.')?.[0] || '' : '';
                
                // Store parameters in sessionStorage as backup (in case Vite redirect loses them)
                sessionStorage.setItem('successParams', JSON.stringify({
                    lang: currentLang,
                    provider: emailProvider
                }));
                
                // Build URL with URLSearchParams for proper encoding
                const params = new URLSearchParams();
                params.set('lang', currentLang);
                if (emailProvider) {
                    params.set('provider', emailProvider);
                }

                const url = `success.html?${params.toString()}`;

                window.location.href = url;
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


