import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './content/content.js';

export default function Home() {

  return (
    <div>
      <Head>
        <title>POC Agilauto OpenAI</title>
        <link rel="icon" href="/agilauto.png" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
      </Head>

     <Content />

    </div>
  );
}

