import RootLayoutPage from '@home/RootLayoutPage';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      const userIsAuthenticated: string | undefined = await functionIsAuthenticated();

      return (
        <html lang="pt-BR" className="html">
          <body id="body">
            <RootLayoutPage children={children} userIsAuthenticated={userIsAuthenticated}/>
          </body>
        </html>
      );
}
