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
        <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
                fbq('track', 'PageView');
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
