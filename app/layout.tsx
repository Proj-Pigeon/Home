import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: {
    default: '鸽群计划 · 咕咕地球',
    template: '%s · 鸽群计划',
  },
  description: '鸽群计划制作安静而清晰的探索工具，咕咕地球是第一个：桌面优先的地理探索空间。',
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
