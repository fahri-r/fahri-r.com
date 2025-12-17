import { Button } from '~/components/shared/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
	const [isDark, setIsDark] = useState(false);

	// Initialize from DOM
	useEffect(() => {
		setIsDark(document.documentElement.classList.contains('dark'));
	}, []);

	// Apply theme to <html>
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	function toggleMode() {
		setIsDark((prev) => !prev);
	}

	return (
		<Button onClick={toggleMode} variant="ghost" size="icon" className="rounded-full">
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
