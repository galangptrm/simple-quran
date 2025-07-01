import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
    <html>
		<head>
			<meta charSet="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		</head>
		<body className="flex flex-col min-h-screen font-sans">
			{/* Header */}
			<header className="bg-green-700 text-white p-4 text-center text-2xl font-bold">
				Makna Quran
			</header>
        	<App />
			{/* Footer */}
			<footer className="bg-green-700 text-white p-4 text-center text-sm">
				&copy; {new Date().getFullYear()} Makna Quran
			</footer>
		</body>
	</html>
  </StrictMode>,
)