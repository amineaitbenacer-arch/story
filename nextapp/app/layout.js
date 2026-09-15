import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '700', '900'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'بيبيات الأطلس | متجر الطيور المغربي',
  description: 'أحسن متجر طيور بالمغرب. كناري، لافبيرد، كوكاتيل، بادجي وأكثر. أسعار مناسبة وجودة مضمونة.',
  keywords: 'طيور، كناري، لافبيرد، كوكاتيل، بادجي، المغرب، بيع طيور',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Facebook Pixel Code */}
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
              fbq('init', '2217447118746918');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2217447118746918&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
