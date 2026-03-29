import './news.css';
import { useState } from 'react';
import { CalendarDays, ArrowRight, X, Search, Tag } from 'lucide-react';
import news1 from '../assets/news1.jpeg';
import news2 from '../assets/news2.jpg';
import news3 from '../assets/news3.jpg';
import d1 from '../assets/d1.jpg';
import d2 from '../assets/d2.jpg';
import d3 from '../assets/d3.jpg';

const allNews = [
  { id: 1, title: 'ከደም ልገሳ እስከ የዓይን ብሌን ቃል፤ በ11 ክፍለ ከተሞች የሕይወት ማዳን ንቅናቄ', date: 'Jan 1, 2025', category: 'Campaign', img: news1, desc: 'የኢትዮጵያ ደም እና ሕብረ ህዋስ ባንክ አገልግሎት በመጪው የበዓል ወቅት የደም እጥረት እንዳይከሰት በአዲስ አበባ ከተማ በሚገኙ 11 ክፍለ ከተሞች የደም ማሰባሰቢያ ዘመቻ ጀምሯል።', full: 'የኢትዮጵያ ደም እና ሕብረ ህዋስ ባንክ አገልግሎት በመጪው የበዓል ወቅት የደም እጥረት እንዳይከሰት በአዲስ አበባ ከተማ በሚገኙ 11 ክፍለ ከተሞች የደም ማሰባሰቢያ ዘመቻ ጀምሯል። ዘመቻው ለሁለት ሳምንታት የሚቆይ ሲሆን ከ5,000 በላይ ለጋሾችን ለማሰባሰብ ታቅዷል። ሁሉም ዜጎች ተሳትፎ እንዲያደርጉ ጥሪ ቀርቧል።' },
  { id: 2, title: 'አዲስ የደም ማሰባሰቢያ ማዕከል በቦሌ ክፍለ ከተማ ተከፈተ', date: 'Feb 10, 2025', category: 'Announcement', img: news2, desc: 'ቦሌ ክፍለ ከተማ ውስጥ አዲስ ዘመናዊ የደም ማሰባሰቢያ ማዕከል ተከፍቷል። ማዕከሉ ዘመናዊ ቴክኖሎጂ የታጠቀ ሲሆን ሳምንቱን ሙሉ ክፍት ይሆናል።', full: 'ቦሌ ክፍለ ከተማ ውስጥ አዲስ ዘመናዊ የደም ማሰባሰቢያ ማዕከል ተከፍቷል። ማዕከሉ ዘመናዊ ቴክኖሎጂ የታጠቀ ሲሆን ሳምንቱን ሙሉ ክፍት ይሆናል። ማዕከሉ በቀን እስከ 200 ለጋሾችን ማስተናገድ ይችላል።' },
  { id: 3, title: '500 ዩኒት ደም በአንድ ቀን ተሰበሰበ — ታሪካዊ ስኬት', date: 'Mar 5, 2025', category: 'Achievement', img: news3, desc: 'አዲስ አበባ ዩኒቨርሲቲ ውስጥ የተካሄደው የደም ማሰባሰቢያ ዘመቻ 500 ዩኒት ደም ሰብስቦ ታሪካዊ ስኬት አስመዘገበ።', full: 'አዲስ አበባ ዩኒቨርሲቲ ውስጥ የተካሄደው የደም ማሰባሰቢያ ዘመቻ 500 ዩኒት ደም ሰብስቦ ታሪካዊ ስኬት አስመዘገበ። ዘመቻው ከ600 በላይ ፈቃደኛ ለጋሾች ተሳትፈዋል።' },
  { id: 4, title: 'የደም ልገሳ ስልጠና ለጤና ባለሙያዎች ተሰጠ', date: 'Mar 18, 2025', category: 'Training', img: d1, desc: 'ከ200 በላይ የጤና ባለሙያዎች የደም ልገሳ አስተዳደር ላይ ስልጠና ወሰዱ። ስልጠናው ዘመናዊ ዘዴዎችን ያካተተ ነበር።', full: 'ከ200 በላይ የጤና ባለሙያዎች የደም ልገሳ አስተዳደር ላይ ስልጠና ወሰዱ። ስልጠናው ዘመናዊ ዘዴዎችን ያካተተ ሲሆን ለሁለት ቀናት ቆይቷል።' },
  { id: 5, title: 'ወጣቶች ለደም ልገሳ ዘመቻ ተሰባሰቡ', date: 'Apr 2, 2025', category: 'Campaign', img: d2, desc: 'ከተለያዩ ዩኒቨርሲቲዎች የተውጣጡ ወጣቶች ለደም ልገሳ ዘመቻ ተሰባሰቡ። ዘመቻው ከ1,000 ወጣቶችን ያሳተፈ ነበር።', full: 'ከተለያዩ ዩኒቨርሲቲዎች የተውጣጡ ወጣቶች ለደም ልገሳ ዘመቻ ተሰባሰቡ። ዘመቻው ከ1,000 ወጣቶችን ያሳተፈ ሲሆን ለሁለት ቀናት ቆይቷል።' },
  { id: 6, title: 'አዲስ ቴክኖሎጂ ለደም ምርመራ ተጀመረ', date: 'Apr 20, 2025', category: 'Announcement', img: d3, desc: 'ኢትዮጵያ ደም እና ሕብረ ህዋስ ባንክ አዲስ ዘመናዊ ቴክኖሎጂ ለደም ምርመራ ተጠቀመ። ቴክኖሎጂው ትክክለኛነትን ያሻሽላል።', full: 'ኢትዮጵያ ደም እና ሕብረ ህዋስ ባንክ አዲስ ዘመናዊ ቴክኖሎጂ ለደም ምርመራ ተጠቀመ። ቴክኖሎጂው ትክክለኛነትን ያሻሽላል እና ፈጣን ውጤት ይሰጣል።' },
];

const categories = ['All', 'Campaign', 'Announcement', 'Achievement', 'Training'];

const catColors = {
  Campaign: '#c0392b',
  Announcement: '#2980b9',
  Achievement: '#27ae60',
  Training: '#e67e22',
};

export default function News() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [modal, setModal] = useState(null);

  const filtered = allNews.filter((n) => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = allNews[0];
  const rest = filtered.filter((n) => n.id !== featured.id);

  return (
    <>
      {/* Hero */}
      <section className="news-hero">
        <div className="news-hero-content">
          <h1>Latest News</h1>
          <p>Stay informed with the latest updates from the Ethiopian Blood and Tissue Bank Service</p>
        </div>
      </section>

      {/* Controls */}

      {/* Featured */}
      {activeCategory === 'All' && !search && (
        <section className="news-featured">
          <div className="nf-image">
            <img src={featured.img} alt={featured.title} />
            <span className="nf-badge" style={{ background: catColors[featured.category] }}>
              {featured.category}
            </span>
          </div>
          <div className="nf-body">
            <span className="nf-date"><CalendarDays size={14} /> {featured.date}</span>
            <h2>{featured.title}</h2>
            <p>{featured.desc}</p>
            <button className="nf-read-btn" onClick={() => setModal(featured)}>
              Read Full Story <ArrowRight size={15} />
            </button>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="news-grid-section">
        {rest.length === 0 && (
          <p className="no-news">No news found. Try a different search or category.</p>
        )}
        <div className="news-grid">
          {rest.map((item) => (
            <article
              className="news-card"
              key={item.id}
              onClick={() => setModal(item)}
            >
              <div className="nc-image">
                <img src={item.img} alt={item.title} />
                <span className="nc-cat" style={{ background: catColors[item.category] }}>
                  {item.category}
                </span>
              </div>
              <div className="nc-body">
                <span className="nc-date"><CalendarDays size={12} /> {item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="nc-link">Read more <ArrowRight size={13} /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className="news-modal-overlay" onClick={() => setModal(null)}>
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>
              <X size={22} />
            </button>
            <div className="modal-image">
              <img src={modal.img} alt={modal.title} />
              <span className="nc-cat" style={{ background: catColors[modal.category] }}>
                {modal.category}
              </span>
            </div>
            <div className="modal-body">
              <span className="nc-date"><CalendarDays size={13} /> {modal.date}</span>
              <h2>{modal.title}</h2>
              <p>{modal.full}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
