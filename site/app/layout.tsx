import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'SEIKA — 想像と思考を、かたちに。',
  description: '想像力と思考力を軸に、学びを成果物へ。アクション俳優養成所での経験を制作の原点に、5件の成果物とGitHubリポジトリを紹介します。',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
