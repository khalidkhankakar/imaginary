import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";



export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning={true}>
      <body className="font-poppins bg-light-1 dark:bg-dark-1 dark:text-white text-black">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
