import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Comfortaa } from 'next/font/google'

const comfortaa = Comfortaa({ weight: ['300', '400', '500', '600', '700'], subsets: ["latin"], variable: '--comfortaa' })
export const metadata = {
  title: 'Upscaler Ai - Image Enchancer | Harshit Ostwal',
  description: 'Experience stunning visual enhancements with our Upscaler AI – the ultimate image enhancer. Boost image resolution, reduce pixelation, and unveil hidden details in your photos. Transform ordinary visuals into extraordinary masterpieces effortlessly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable}`}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
