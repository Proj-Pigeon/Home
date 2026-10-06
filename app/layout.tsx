import { RootProvider } from 'fumadocs-ui/provider/next';
import Script from 'next/script';
import './global.css';
import { Inter } from 'next/font/google';
import { MainlandNotice } from '@/components/mainland-notice';

export const metadata = {
  metadataBase: new URL('https://www.project-pigeon.com'),
  title: {
    default: '鸽群计划 · 咕咕地球',
    template: '%s · 鸽群计划',
  },
  description: '鸽群计划制作安静而清晰的探索工具，咕咕地球是第一个：桌面优先的地理探索空间。',
  icons: {
    icon: '/project-pigeon.png',
    apple: '/project-pigeon.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <MainlandNotice />
        <Script
          src="https://analytics.nexaorion.tech/script.js"
          data-website-id="1c8cfc40-adaa-4ca6-aa5c-ec54bba30870"
        />
        <Script
          src="https://analytics.nexaorion.tech/recorder.js"
          data-website-id="1c8cfc40-adaa-4ca6-aa5c-ec54bba30870"
          data-sample-rate="0.15"
          data-mask-level="moderate"
          data-max-duration="300000"
        />
      </body>
    </html>
  );
}
