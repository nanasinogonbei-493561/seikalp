const works = [
  { n: '01', category: 'WEB DESIGN', title: 'ブランドの想いを、ひとつのサイトに。', name: 'ブランドサイト', description: '伝えたい価値を整理し、訪れる人が迷わず情報にたどり着けるWebサイトへ。', scope: '情報設計 / デザイン / 実装', className: 'web', word: 'BEYOND', sub: 'A new perspective.', details: 'ブランドの紹介からサービスの理解までを、ひと続きの体験として設計。見出し、余白、情報の順序を整え、スマートフォンでも読みやすい構成にしています。' },
  { n: '02', category: 'DOCUMENT', title: '伝わる順番で、アイデアを届ける。', name: 'サービス紹介資料', description: '複雑な情報をほどき、要点とストーリーが自然に伝わる資料へ。', scope: '構成 / 編集 / スライドデザイン', className: 'document', word: 'THE NEXT', sub: 'Ideas into action.', details: '課題、提案、活用シーンの順に情報を整理した資料のサンプルです。一枚ごとのメッセージを絞り、説明する人にも読む人にも使いやすい構成を目指しています。' },
  { n: '03', category: 'APPLICATION', title: '日々のひと手間を、もっと軽やかに。', name: 'タスク管理アプリ', description: '必要な情報と操作をまとめ、毎日の仕事をすっきり進めるアプリへ。', scope: '要件整理 / UI設計 / 開発', className: 'application', word: 'Flow.', sub: 'Make room for focus.', details: '取り組むことを見渡し、次の行動を選びやすくするアプリのサンプルです。情報の優先順位と操作の流れを整理し、少ない手順で使える画面を想定しています。' },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#works">成果物一覧へスキップ</a>
      <header className="header"><a className="logo" href="#top" aria-label="SEIKA トップ">seika<span>®</span></a><nav aria-label="メインナビゲーション"><a href="#works">成果物を見る <span>↗</span></a><a href="#about">このコレクションについて</a></nav><span className="header-note">WORKS COLLECTION</span></header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title"><div className="eyebrow"><span className="dot"/> IDEAS, MADE REAL.</div><h1 id="hero-title">考えたことを、<br/>目に見える<span className="accent">成果</span>へ。</h1><div className="hero-bottom"><p>アイデアをかたちに。課題にひとつの答えを。<br/>つくったものと、そこに込めた考えを集めました。</p><a className="round-link" href="#works"><span>成果物を見てみる</span><span className="circle">↓</span></a></div><div className="hero-type" aria-hidden="true">Selected works<span>↘</span></div></section>
        <section id="works" className="works" aria-labelledby="works-title"><div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2 id="works-title">成果物一覧<span> / 03</span></h2></div><p className="sample-note">掲載内容はすべてサンプルです。</p></div>
          {works.map(work => <article className="work" key={work.n}><div className={`work-cover ${work.className}`}><div className="cover-meta"><span>{work.category}</span><span>CONCEPT {work.n}</span></div><div className="cover-type"><strong>{work.word}</strong><span>{work.sub}</span></div><div className="cover-footer"><span>SEIKA / SAMPLE PROJECT</span><span>↗</span></div></div><div className="work-content"><div className="work-kicker"><span>{work.n} / {work.category}</span><span className="sample-tag">SAMPLE</span></div><h3>{work.title}</h3><p className="work-name">{work.name}</p><p className="description">{work.description}</p><div className="scope"><span>制作範囲</span><p>{work.scope}</p></div><details><summary>制作のポイント <span aria-hidden="true">＋</span></summary><p>{work.details}</p></details></div></article>)}
        </section>
        <section id="about" className="about"><p className="eyebrow">ABOUT THIS COLLECTION</p><div><h2>完成したものの、その先まで。</h2><p>見た目だけでなく、何を考え、どうかたちにしたのか。<br/>ひとつひとつの成果物を、その背景とともに紹介する場所です。</p><p className="about-note">現在はサンプルを掲載しています。実際の成果物は準備が整い次第、順次掲載予定です。</p></div><a className="back-top" href="#top" aria-label="ページの先頭へ">↑</a></section>
      </main>
      <footer><a className="logo" href="#top">seika<span>®</span></a><span>成果物コレクション</span><small>© {new Date().getFullYear()} SEIKA</small></footer>
    </>
  );
}
