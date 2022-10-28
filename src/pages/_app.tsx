import '../styles/globals.css'
import '../styles/colors.scss'
import '../styles/dimensions.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className='app_container'><Component {...pageProps} /></div>
}

export default MyApp
