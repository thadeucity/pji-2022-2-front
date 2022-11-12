import '../styles/globals.css'
import '../styles/colors.scss'
import '../styles/dimensions.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className='app_container'>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  )
}

export default MyApp
