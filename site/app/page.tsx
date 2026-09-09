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
      <header className="header"><a className="logo" href="#top" aria-label="SEIKA トップ">seika<span>®</span></a><nav aria-label="メインナビゲーション"><a href="#works">成果物を見る <span>↗</span></a><a href="#about">制作の原点</a></nav><span className="header-note">WORKS COLLECTION</span></header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title"><div className="eyebrow"><span className="dot"/> IMAGINATION × THINKING</div><h1 id="hero-title">想像を広げ、<br/>思考を深め、<br/><span className="accent">かたち</span>にする。</h1><div className="hero-bottom"><p>使う人の場面を想像し、仕組みをじっくり考える。<br/>想像力と思考力を軸に、学びを成果物へつなげていきます。</p><a className="round-link" href="#works"><span>成果物を見てみる</span><span className="circle">↓</span></a></div><div className="hero-principles" aria-label="制作で大切にすること"><span>01 想像する</span><span>02 本質を考える</span><span>03 学びをかたちに</span></div><div className="hero-type" aria-hidden="true">Selected works<span>↘</span></div></section>
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
        <section id="about" className="about" aria-labelledby="about-title"><p className="eyebrow">BEHIND THE WORKS</p><div><h2 id="about-title">表現を学んだ経験が、<br/>つくるときの視点になった。</h2><p>アクション俳優養成所に通った経験を振り返り、<br/>自分の強みは「想像力」と「思考力」だと気づきました。</p><p>場面を思い描くこと。なぜそうなるのかを考えること。<br/>その二つを、いまは成果物づくりで大切にしています。</p><div className="strengths"><div><span>IMAGINATION</span><h3>使う場面を、思い描く。</h3><p>誰が、どんなときに使うのか。つくり始める前に、その先にいる人と体験を想像する。</p></div><div><span>THINKING</span><h3>問いを重ね、筋道をつくる。</h3><p>情報を集め、背景を掘り下げる。目的に立ち返り、納得できるかたちを考える。</p></div><div><span>LEARNING</span><h3>学び続け、よりよくする。</h3><p>知らないことを学び、試し、振り返る。一つひとつの制作を、次の工夫につなげる。</p></div></div><details className="profile-source"><summary>強みを見つめるための自己理解<span aria-hidden="true">＋</span></summary><p>クリフトンストレングスでは、学習欲・公平性・内省・原点思考・最上志向が上位の資質でした。16Personalitiesの結果はINTJ-A（建築家）。こうした結果も、自分の学び方や考え方を振り返る手がかりにしています。</p></details><a className="about-cta" href="#works">想像と思考をかたちにした成果物を見る <span aria-hidden="true">↗</span></a></div><a className="back-top" href="#top" aria-label="ページの先頭へ">↑</a></section>
      </main>
      <footer><a className="logo" href="#top">seika<span>®</span></a><span>成果物コレクション</span><small>© {new Date().getFullYear()} SEIKA</small></footer>
    </>
  );
}
