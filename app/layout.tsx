import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Crypto & Currency Dashboard',
  description: 'Painel de cotações de moedas e criptomoedas em tempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-900`}>
        <div className="min-h-screen bg-[url('/grid.svg')] bg-fixed bg-center">
          {children}
        </div>
      </body>
    </html>
  )
}

