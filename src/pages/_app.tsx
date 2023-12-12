import '../locales/i18n'
import 'simplebar-react/dist/simplebar.min.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import createEmotionCache from '../utils/createEmotionCache'
import ThemeProvider from '../theme'
import ThemeLocalization from '../locales'
import ProgressBar from '../components/progress-bar'
import SnackbarProvider from '../components/snackbar'
import { MotionLazyContainer } from '../components/animate'
import { ThemeSettings, SettingsProvider } from '../components/settings'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { persistor, store } from '../redux/store'
import { AuthProvider } from '../auth/SocialMediaContext'
import ApolloClientConfig from '../Apollo/ApolloClientConfig'

const clientSideEmotionCache = createEmotionCache()

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
    Component: NextPageWithLayout
}

export default function MyApp(props: MyAppProps) {
    const {
        Component,
        pageProps,
        emotionCache = clientSideEmotionCache,
    } = props

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <SessionProvider session={pageProps.session}>
                <AuthProvider>
                    <ReduxProvider store={store}>
                        <PersistGate persistor={persistor}>
                            <SettingsProvider>
                                <ApolloClientConfig>
                                    <MotionLazyContainer>
                                        <ThemeProvider>
                                            <ThemeSettings>
                                                <ThemeLocalization>
                                                    <SnackbarProvider>
                                                        <ProgressBar />
                                                        {getLayout(
                                                            <Component
                                                                {...pageProps}
                                                            />
                                                        )}
                                                    </SnackbarProvider>
                                                </ThemeLocalization>
                                            </ThemeSettings>
                                        </ThemeProvider>
                                    </MotionLazyContainer>
                                </ApolloClientConfig>
                            </SettingsProvider>
                        </PersistGate>
                    </ReduxProvider>
                </AuthProvider>
            </SessionProvider>
        </CacheProvider>
    )
}
