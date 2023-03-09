import '../styles/globals.css'
import '../styles/movement.css'
import '../styles/mammoth.css'
import '../styles/backgrounds.css'
import '../styles/counting.css'
import '../styles/text.css'
import '../styles/controls.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
