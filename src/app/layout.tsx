import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TODO APP {Claudio Baeza}',
  description: 'TODO APP CREATED BY CLAUDIO BAEZA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='w-full h-full relative'>
           <div className='absolute w-full h-full z-0 bg-gray-50 dark:bg-gray-950'>
            <div className='w-full h-[350px] bg-gradient-to-r from-purple-600 to-blue-500 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-700'>
              <img className='w-full h-[350px] bg-cover bg-no-repeat bg-[url("/bglight.jpg")] dark:bg-[url("/bgdark.jpg")] mix-blend-overlay' />
            </div>
           </div>
          <div className='relative z-10 min-h-screen grid place-content-center'>
            <div className='sm:w-[400px] md:w-[600px] px-4 mt-10'>
              <Navbar />
              {children}
            </div>
          </div>
        </div>      
      </body>
    </html>
  )
}
