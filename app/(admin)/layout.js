import { Navbar, Footer } from '@/components'
import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tech Tales',
  description: 'Tech Tales is a simple school blog for software developers students and senior developers who would like to share their solutions to various coding problems or practice blogging as a way of learning',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-7xl mx-auto overflow-hidden">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}