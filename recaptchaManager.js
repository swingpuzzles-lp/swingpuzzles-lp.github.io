(function () {
    /**
     * Simple manager for reCAPTCHA v2 checkbox integration on the static site.
     * Usage:
     *   await RecaptchaManager.loadRecaptcha('<SITE_KEY>');
     *   const token = await RecaptchaManager.showCheckbox((token) => { ... });
     *   RecaptchaManager.resetWidget();
     */
    class RecaptchaManager {
        static isLoaded = false;
        static isReady = false;
        static siteKey = null;
        static widgetId = null;
        static loadPromise = null;

        static getContext() {
            // Shared context object for grecaptcha instance
            if (!window.__recaptchaCtx) {
                window.__recaptchaCtx = {};
            }
            return window.__recaptchaCtx;
        }

        /**
         * Load reCAPTCHA script and initialize
         * @param {string} siteKey reCAPTCHA site key
         * @returns {Promise<void>}
         */
        static async loadRecaptcha(siteKey) {
            this.siteKey = siteKey;

            if (this.loadPromise) return this.loadPromise;
            if (this.isLoaded && this.isReady) return Promise.resolve();

            this.loadPromise = new Promise((resolve, reject) => {
                const ctx = RecaptchaManager.getContext();

                // Already present on context
                if (ctx.grecaptcha) {
                    ctx.grecaptcha.ready(() => {
                        this.isLoaded = true;
                        this.isReady = true;
                        resolve();
                    });
                    return;
                }

                // Already available globally
                if (window.grecaptcha) {
                    ctx.grecaptcha = window.grecaptcha;
                    ctx.grecaptcha.ready(() => {
                        this.isLoaded = true;
                        this.isReady = true;
                        resolve();
                    });
                    return;
                }

                // Create script tag
                const script = document.createElement("script");
                // Respect lang param from URL for reCAPTCHA locale
                const langParam =
                    new URLSearchParams(window.location.search).get("lang") || "en";
                const hl = encodeURIComponent(langParam.toLowerCase());
                script.src = `https://www.google.com/recaptcha/api.js?onload=recaptchaOnLoad&render=explicit&hl=${hl}`;
                script.async = true;
                script.defer = true;

                const cleanup = () => {
                    if (window.recaptchaOnLoad) {
                        delete window.recaptchaOnLoad;
                    }
                };

                window.recaptchaOnLoad = () => {
                    const loaded = window.grecaptcha;
                    if (loaded) {
                        ctx.grecaptcha = loaded;
                        ctx.grecaptcha.ready(() => {
                            this.isLoaded = true;
                            this.isReady = true;
                            cleanup();
                            resolve();
                        });
                    } else {
                        cleanup();
                        reject(new Error("reCAPTCHA loaded but grecaptcha not found"));
                    }
                };

                script.onerror = () => {
                    cleanup();
                    reject(new Error("Failed to load reCAPTCHA script"));
                };

                document.head.appendChild(script);
            });

            return this.loadPromise;
        }

        /**
         * Show reCAPTCHA checkbox in a modal overlay.
         * @param {(token: string) => void} callback Invoked when solved
         * @returns {Promise<string>} Resolves with token
         */
        static async showCheckbox(callback) {
            if (!this.isLoaded || !this.isReady || !this.siteKey) {
                throw new Error("reCAPTCHA not loaded. Call loadRecaptcha first.");
            }

            const ctx = RecaptchaManager.getContext();
            const grecaptcha = ctx.grecaptcha;
            if (!grecaptcha) {
                throw new Error("grecaptcha object is not available");
            }

            return new Promise((resolve, reject) => {
                grecaptcha.ready(() => {
                    const current = ctx.grecaptcha;
                    if (!current || typeof current.render !== "function") {
                        reject(
                            new Error(
                                "grecaptcha.render is not a function. reCAPTCHA may not be fully loaded."
                            )
                        );
                        return;
                    }

                    // Modal overlay
                    const modal = document.createElement("div");
                    modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.7);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 10000;
                    `;

                    // Modal content
                    const modalContent = document.createElement("div");
                    modalContent.style.cssText = `
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                        max-width: 400px;
                        width: 90%;
                    `;

                    const title = document.createElement("h3");
                    title.textContent = "Please verify you are human";
                    title.style.marginBottom = "20px";
                    modalContent.appendChild(title);

                    const recaptchaContainer = document.createElement("div");
                    recaptchaContainer.id = "recaptcha-modal";
                    recaptchaContainer.style.marginBottom = "20px";
                    modalContent.appendChild(recaptchaContainer);

                    const closeButton = document.createElement("button");
                    closeButton.textContent = "Cancel";
                    closeButton.style.cssText = `
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-right: 10px;
                    `;
                    closeButton.onclick = () => {
                        document.body.removeChild(modal);
                        reject(new Error("User cancelled reCAPTCHA"));
                    };
                    modalContent.appendChild(closeButton);

                    modal.appendChild(modalContent);
                    document.body.appendChild(modal);

                    try {
                        this.widgetId = current.render(recaptchaContainer, {
                            sitekey: this.siteKey,
                            callback: (token) => {
                                document.body.removeChild(modal);
                                callback(token);
                                resolve(token);
                            },
                            theme: "light",
                            size: "normal",
                        });
                    } catch (error) {
                        document.body.removeChild(modal);
                        reject(
                            error instanceof Error ? error : new Error(String(error))
                        );
                    }
                });
            });
        }

        /**
         * Reset reCAPTCHA widget
         */
        static resetWidget() {
            const ctx = RecaptchaManager.getContext();
            if (this.widgetId !== null && ctx.grecaptcha) {
                ctx.grecaptcha.reset(this.widgetId);
            }
        }
    }

    // Expose globally for easy access in this static setup
    window.RecaptchaManager = RecaptchaManager;
})();

