import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'SEIKA — 成果物コレクション',
  description: 'アイデアをかたちに。Webサイト・資料・アプリなど、成果物と制作の背景を紹介するコレクション。現在はサンプルを掲載しています。',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
