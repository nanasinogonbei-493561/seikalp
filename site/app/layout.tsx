import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'SEIKA — 成果物コレクション',
  description: 'CRM-kadai、ECsite-Java、Todoapp3、TodoApp、react-todolistの5件の成果物とGitHubリポジトリを紹介するコレクション。',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
