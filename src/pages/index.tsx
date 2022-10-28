import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { JoggingSvg } from '../assets/illustrations/jogging'
import { ActionButton } from '../components/Button/ActionButton'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Exercite-se!
        </h1>

        <h2 className={styles.subtitle}>
          Mantenha-se saudável e compartilhe 
          seus&nbsp;<span className='highlight-text'>resultados.</span>
        </h2>

        <div className={styles.illustration_box}>
          <JoggingSvg />
        </div>

        <p className={styles.description}>
          É só se conectar com sua conta do Googe para começar a acompanhar 
          seu treino com seus colegas.
        </p>
      </main>

      <ActionButton>
        <span>INICIAR</span>
      </ActionButton>
    </div>
  )
}

export default Home
