import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Agrega el código de seguimiento de Google Analytics aquí */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V9BQT8PSER"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-V9BQT8PSER');
              `,
          }}
        />
      </Head>
      <link rel="shortcut icon" href="/mariette.png" />
      <meta
        name="description"
        content="Tienda de Alta Joyería. Piezas personalizadas. Oro 14K y Plata .925"
      />
      <title>Mariette</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
