import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                title: ["Ubuntu", "sans-serif"],
                mono: ["IBM Plex Mono", "mono"]
            }
        },
    },
    corePlugins: {
        preflight: true,
    },
    plugins: [
      typography,
      daisyui,
    ],
    daisyui: {
        themes: [{
            CustomLight: {
                "primary": "#00b4ff",
                "primary-content": "#000c16",
                "secondary": "#0000ff",
                "secondary-content": "#c6dbff",
                "accent": "#00ee60",
                "accent-content": "#001403",
                "neutral": "#050901",
                "neutral-content": "#c5c7c3",
                "base-100": "#ffffff",
                "base-200": "#dedede",
                "base-300": "#bebebe",
                "base-content": "#161616",
                "info": "#00baff",
                "info-content": "#000d16",
                "success": "#009800",
                "success-content": "#000800",
                "warning": "#f07a00",
                "warning-content": "#140500",
                "error": "#de0038",
                "error-content": "#ffd7d6",
            },
            CustomDark: {
                "primary": "#ff00f2",
                "primary-content": "#160014",
                "secondary": "#ff1700",
                "secondary-content": "#160000",
                "accent": "#009500",
                "accent-content": "#000800",
                "neutral": "#311f1a",
                "neutral-content": "#d2cdcc",
                "base-100": "#232136",
                "base-200": "#1d1b2e",
                "base-300": "#171625",
                "base-content": "#ceced3",
                "info": "#0093dd",
                "info-content": "#000811",
                "success": "#00a900",
                "success-content": "#000a00",
                "warning": "#e03d00",
                "warning-content": "#120100",
                "error": "#ff1944",
                "error-content": "#160002",
            }
        }],
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        logs: true,
    }
}

