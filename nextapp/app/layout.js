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
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
