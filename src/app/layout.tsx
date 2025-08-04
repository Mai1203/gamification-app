import '@/app/ui/globals.css'
import { inter } from '@/app/ui/fonts';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es" className=''>
        <body
          className={`${inter.className} antialiased`}
        >
          {children}
          <Toaster position='top-center' />
        </body>
      </html>
    </ClerkProvider>
  );
}
