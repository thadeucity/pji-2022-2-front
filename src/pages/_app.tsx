import '../styles/globals.css'
import '../styles/colors.scss'
import '../styles/dimensions.scss'
import type { AppProps } from 'next/app'
import PortalsContainer from '../components/Portal/PortalsContainer';
import { AppProvider } from '../hooks';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <PortalsContainer>
        <div className='app_container'>
          <Component {...pageProps} />
        </div>
      </PortalsContainer>
    </AppProvider>
  )
}

export default MyApp
