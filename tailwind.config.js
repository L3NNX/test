/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f4f6fb',
  				'100': '#e4e9f6',
  				'200': '#c2c8e3',
  				'300': '#99a2cd',
  				'400': '#6f7cb5',
  				'500': '#47579a',
  				'600': '#182256',
  				'700': '#141c48',
  				'800': '#10173a',
  				'900': '#0c112c',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f5fffa',
  				'100': '#e6fff0',
  				'200': '#c6ffdd',
  				'300': '#9dffbb',
  				'400': '#74ff8a',
  				'500': '#4cff59',
  				'600': '#228B22',
  				'700': '#1a7d1a',
  				'800': '#156415',
  				'900': '#104c10',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#fff8f5',
  				'100': '#ffeee6',
  				'200': '#ffd6c6',
  				'300': '#ffb79d',
  				'400': '#ff9874',
  				'500': '#ff794c',
  				'600': '#D2691E',
  				'700': '#b34d15',
  				'800': '#8c3c11',
  				'900': '#662d0d',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			success: {
  				'500': '#10B981',
  				'600': '#059669'
  			},
  			warning: {
  				'500': '#F59E0B',
  				'600': '#D97706'
  			},
  			error: {
  				'500': '#EF4444',
  				'600': '#DC2626'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'Montserrat',
  				'sans-serif'
  			],
  			body: [
  				'Open Sans',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'128': '32rem'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-in-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};