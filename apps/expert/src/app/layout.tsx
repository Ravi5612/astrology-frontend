import { Inter } from 'next/font/google'
import "@/styles/index.css"
import { AuthInitializer } from '@/components/layout/AuthInitializer'
import { SocketConnectionManager } from '@/components/layout/SocketConnectionManager';
import { cookies } from "next/headers";

const inter = Inter({ subsets: ['latin'] })

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CLIENT_API_URL } from '@/lib/config';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let initialUser = null;

  if (accessToken) {
    try {
      const response = await fetch(`${CLIENT_API_URL}/expert`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
        cache: 'no-store'
      });

      if (response.ok) {
        const text = await response.text();
        if (text) {
          try {
            const data = JSON.parse(text);
            initialUser = { 
              ...(data.user || {}), 
              ...data, 
              profileId: data.id,
              userId: data.user_id || data.userId || data.user?.id
            };

            const isExpert = initialUser?.roles?.some(
              (r: any) => (typeof r === 'string' ? r : r.name).toUpperCase() === "EXPERT"
            );

            if (!isExpert) {
              initialUser = null;
            }
          } catch (e) {
            console.error("Failed to parse expert profile JSON:", e);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching expert profile server-side:", error);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ReactQueryProvider>
          <AuthInitializer initialUser={initialUser}>
            <SocketConnectionManager />
            {children}
            <ToastContainer position="top-right" />
          </AuthInitializer>
        </ReactQueryProvider>
      </body>
    </html>
  )
}


