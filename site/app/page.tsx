const works = [
  { n: '01', category: 'APPLICATION', name: 'CRM-kadai', className: 'web', word: 'CRM', url: 'https://github.com/nanasinogonbei-493561/CRM-kadai' },
  { n: '02', category: 'APPLICATION', name: 'ECsite-Java', className: 'document', word: 'ECsite', url: 'https://github.com/nanasinogonbei-493561/ECsite-Java' },
  { n: '03', category: 'APPLICATION', name: 'Todoapp3', className: 'application', word: 'Todoapp3', url: 'https://github.com/nanasinogonbei-493561/Todoapp3' },
  { n: '04', category: 'APPLICATION', name: 'TodoApp', className: 'web', word: 'TodoApp', url: 'https://github.com/nanasinogonbei-493561/TodoApp' },
  { n: '05', category: 'APPLICATION', name: 'react-todolist', className: 'document', word: 'React Todo', url: 'https://github.com/nanasinogonbei-493561/react-todolist' },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#works">成果物一覧へスキップ</a>
      <header className="header"><a className="logo" href="#top" aria-label="SEIKA トップ">seika<span>®</span></a><nav aria-label="メインナビゲーション"><a href="#works">成果物を見る <span>↗</span></a><a href="#about">このコレクションについて</a></nav><span className="header-note">WORKS COLLECTION</span></header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title"><div className="eyebrow"><span className="dot"/> IDEAS, MADE REAL.</div><h1 id="hero-title">考えたことを、<br/>目に見える<span className="accent">成果</span>へ。</h1><div className="hero-bottom"><p>アイデアをかたちに。課題にひとつの答えを。<br/>つくったものと、そこに込めた考えを集めました。</p><a className="round-link" href="#works"><span>成果物を見てみる</span><span className="circle">↓</span></a></div><div className="hero-type" aria-hidden="true">Selected works<span>↘</span></div></section>
        <section id="works" className="works" aria-labelledby="works-title"><div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2 id="works-title">成果物一覧<span> / {String(works.length).padStart(2, '0')}</span></h2></div><p className="sample-note">各成果物のGitHubリポジトリをご覧いただけます。</p></div>
          {works.map(work => (
            <article className="work" key={work.n}>
              <a className={`work-cover ${work.className}`} href={work.url} target="_blank" rel="noopener noreferrer" aria-label={`${work.name} をGitHubで見る（新しいタブで開きます）`}>
                <div className="cover-meta"><span>{work.category}</span><span>PROJECT {work.n}</span></div>
                <div className="cover-type"><strong>{work.word}</strong><span>{work.name}</span></div>
                <div className="cover-footer"><span>SEIKA / GITHUB PROJECT</span><span aria-hidden="true">↗</span></div>
              </a>
              <div className="work-content">
                <div className="work-kicker"><span>{work.n} / {work.category}</span><span className="sample-tag">GITHUB</span></div>
                <h3>{work.name}</h3>
                <p className="description">ソースコードは、GitHubリポジトリでご覧いただけます。</p>
                <a className="repository-link" href={work.url} target="_blank" rel="noopener noreferrer" aria-label={`${work.name} をGitHubで見る（新しいタブで開きます）`}>
                  <span>GitHubで見る <span aria-hidden="true">↗</span></span>
                  <span className="repository-url">{work.url}</span>
                </a>
              </div>
            </article>
          ))}
        </section>
        <section id="about" className="about"><p className="eyebrow">ABOUT THIS COLLECTION</p><div><h2>完成したものの、その先まで。</h2><p>見た目だけでなく、何を考え、どうかたちにしたのか。<br/>ひとつひとつの成果物を、その背景とともに紹介する場所です。</p><p className="about-note">掲載している5件の成果物は、それぞれのGitHubリポジトリからご覧いただけます。</p></div><a className="back-top" href="#top" aria-label="ページの先頭へ">↑</a></section>
      </main>
      <footer><a className="logo" href="#top">seika<span>®</span></a><span>成果物コレクション</span><small>© {new Date().getFullYear()} SEIKA</small></footer>
    </>
  );
}
