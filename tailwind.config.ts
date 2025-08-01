import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        terminal: ['var(--font-jetbrains-mono)', 'monospace'],
        hacker: ['var(--font-fira-code)', 'monospace'],
        typewriter: ['var(--font-source-code-pro)', 'monospace'],
      },
      colors: {
        terminal: {
          green: '#8B5CF6',
          amber: '#EC4899',
          cyan: '#A855F7',
          red: '#E879F9',
        },
        matrix: {
          green: '#8B5CF6',
          dark: '#1a0a2e',
        }
      },
      animation: {
        'terminal-blink': 'terminal-blink 1s infinite',
        'typewriter': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'hacker-flicker': 'hacker-flicker 2s infinite alternate',
        'matrix-pulse': 'matrix-pulse 4s ease-in-out infinite alternate',
        'scan': 'scan 0.1s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
