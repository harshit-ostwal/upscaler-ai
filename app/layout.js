import './globals.css'

export const metadata = {
  title: 'Upscaler Ai - Image Enchancer | Harshit Ostwal',
  description: 'Experience stunning visual enhancements with our Upscaler AI – the ultimate image enhancer. Boost image resolution, reduce pixelation, and unveil hidden details in your photos. Transform ordinary visuals into extraordinary masterpieces effortlessly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
