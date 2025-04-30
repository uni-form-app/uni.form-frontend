import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import "./globals.css"
import ReactQueryProvider from "@/lib/react-query"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "uni.form | Uniformes escolares sustentáveis",
  description: "Marketplace de uniformes escolares usados",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 container mx-auto">{children}</main>
              <footer className="py-6 border-t">
                <div className="container mx-auto text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} uni.form - Todos os direitos reservados
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
