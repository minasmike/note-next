import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
//         mytheme: {
        
// "primary": "#001cff",
        
// "secondary": "#9f6c00",
        
// "accent": "#629200",
        
// "neutral": "#292929",
        
// "base-100": "#1f2a38",
        
// "info": "#00e3ff",
        
// "success": "#00a05e",
        
// "warning": "#d89e00",
        
// "error": "#ff1965",
//         },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config
