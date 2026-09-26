
import './globals.css';


import { FitLogProvider } from '../../components/fitlog-provider';
import SiteHeader from '../../components/site-header';
import SiteFooter from '../../components/site-footer';


import { Toaster } from 'sonner';


export const metadata = {
  title: 'FitLog — Workout Library',
  description: 'A dark, simple workout library and daily plan tracker.',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
     
        <FitLogProvider>
          
          <SiteHeader />

          
          {children}

          
          <SiteFooter />

         
          <Toaster position="top-right" richColors />
        </FitLogProvider>
      </body>
    </html>
  );
}
