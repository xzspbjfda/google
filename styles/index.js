import Head from "next/head";
import styles from "/styles/index.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Website Proxy</title>
        <meta name="description" content="Vercel-based website proxy service" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Vercel Proxy Service
        </h1>

        <p className={styles.description}>
          A simple and efficient web proxy solution
        </p>

        <div className={styles.grid}>
          <Link href="/api/proxy" className={styles.card}>
            <h2>Access Proxy &rarr;</h2>
            <p>Navigate to the proxy service</p>
          </Link>

          <Link href="https://github.com" target="_blank" className={styles.card}>
            <h2>GitHub Repo &rarr;</h2>
            <p>View the source code</p>
          </Link>

          <Link href="https://vercel.com" target="_blank" className={styles.card}>
            <h2>Deploy on Vercel &rarr;</h2>
            <p>Deploy your own instance</p>
          </Link>

          <Link href="#" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Learn how to use the service</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by Vercel
        </a>
      </footer>
    </div>
  );
}
