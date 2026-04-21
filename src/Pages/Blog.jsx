import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const STORAGE_KEYS = {
  user: "gbb_blog_user",
  posts: "gbb_blog_posts",
  likes: "gbb_blog_likes",
};

const CATEGORIES = ["All", "Donor Stories", "Health & Wellness", "Awareness", "Volunteer", "News"];

const SEED_POSTS = [
  {
    id: "seed-1",
    title: "Why I donate every three months",
    body:
      "I started donating blood after a relative needed an emergency transfusion. What surprised me most was how simple the process was — registration, a brief health screening, and a short donation that took less than fifteen minutes.\n\nKnowing that a single donation can support up to three patients keeps me coming back. If you have ever hesitated, please consider booking your first appointment. The staff are professional, the environment is sterile, and you leave knowing you have helped a stranger you may never meet.",
    author: { name: "Dr. Selamawit T.", initials: "ST" },
    category: "Donor Stories",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    likes: 24,
  },
  {
    id: "seed-2",
    title: "Iron-rich foods every regular donor should know",
    body:
      "Maintaining healthy iron levels is essential for frequent donors. Lean red meat, lentils, spinach, fortified cereals, and pumpkin seeds are excellent sources. Pairing plant-based iron with vitamin C — citrus fruits, tomatoes, peppers — significantly improves absorption.\n\nAvoid drinking tea or coffee within an hour of an iron-rich meal, as the tannins can inhibit uptake. A balanced diet, paired with periodic ferritin testing, helps ensure you remain eligible to give safely.",
    author: { name: "Nurse Daniel B.", initials: "DB" },
    category: "Health & Wellness",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    likes: 42,
  },
  {
    id: "seed-3",
    title: "Mobile units arriving in regional hospitals this quarter",
    body:
      "We are pleased to announce expanded mobile collection routes covering five regional hospitals. The schedule will be published on our website and updated weekly. Volunteers and corporate drives are welcome to coordinate group appointments with our outreach team.",
    author: { name: "GBB Communications", initials: "GB" },
    category: "News",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    likes: 11,
  },
];

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const initialsFromName = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const GoogleIcon = () => (
  <svg className="blog-google-icon" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 43.5c5.4 0 10.3-2.1 14-5.5l-6.5-5.5C29.6 34.2 27 35 24 35c-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.5 39.1 16.2 43.5 24 43.5z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.4l6.5 5.5c-.5.4 7-5.1 7-14.4 0-1.2-.1-2.3-.4-3.5z" />
  </svg>
);

export default function Blog() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState({});

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // signin | signup
  const [authEmail, setAuthEmail] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [composeOpen, setComposeOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [draftCategory, setDraftCategory] = useState("Donor Stories");
  const [draftError, setDraftError] = useState("");

  /* ---------- Boot from localStorage ---------- */
  useEffect(() => {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.user);
      if (u) setUser(JSON.parse(u));

      const p = localStorage.getItem(STORAGE_KEYS.posts);
      setPosts(p ? JSON.parse(p) : SEED_POSTS);

      const l = localStorage.getItem(STORAGE_KEYS.likes);
      if (l) setLikes(JSON.parse(l));
    } catch {
      setPosts(SEED_POSTS);
    }
  }, []);

  useEffect(() => {
    if (posts.length) localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.likes, JSON.stringify(likes));
  }, [likes]);

  /* ---------- Auth (frontend only, mock) ---------- */
  const persistUser = (u) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(u));
  };

  const handleGoogleSignIn = () => {
    // Mock Google sign-in (frontend-only). For real auth, connect Lovable Cloud.
    const mock = {
      id: "google-" + Date.now(),
      name: "Helen G. Mariam",
      email: "helen.gmariam@example.com",
      provider: "google",
      initials: "HG",
    };
    persistUser(mock);
    setAuthOpen(false);
    setAuthError("");
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setAuthError("");
    const email = authEmail.trim();
    const name = authName.trim();
    const password = authPassword;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    if (authMode === "signup" && name.length < 2) {
      setAuthError("Please enter your full name.");
      return;
    }

    const displayName = authMode === "signup" ? name : email.split("@")[0];
    persistUser({
      id: "email-" + Date.now(),
      name: displayName,
      email,
      provider: "email",
      initials: initialsFromName(displayName),
    });
    setAuthOpen(false);
    setAuthEmail("");
    setAuthName("");
    setAuthPassword("");
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.user);
  };

  /* ---------- Posts ---------- */
  const openCompose = () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setComposeOpen(true);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    setDraftError("");
    const title = draftTitle.trim();
    const body = draftBody.trim();
    if (title.length < 4) {
      setDraftError("Title must be at least 4 characters.");
      return;
    }
    if (body.length < 20) {
      setDraftError("Please write at least 20 characters in the body.");
      return;
    }
    if (title.length > 140) {
      setDraftError("Title must be under 140 characters.");
      return;
    }
    if (body.length > 5000) {
      setDraftError("Body must be under 5000 characters.");
      return;
    }

    const post = {
      id: "p-" + Date.now(),
      title,
      body,
      category: draftCategory,
      author: { name: user.name, initials: user.initials },
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setPosts((prev) => [post, ...prev]);
    setDraftTitle("");
    setDraftBody("");
    setDraftCategory("Donor Stories");
    setComposeOpen(false);
  };

  const toggleLike = (postId) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    const userLiked = likes[postId];
    setLikes((prev) => ({ ...prev, [postId]: !userLiked }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: Math.max(0, p.likes + (userLiked ? -1 : 1)) } : p,
      ),
    );
  };

  const toggleExpand = (postId) => {
    setExpanded((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const totalAuthors = useMemo(() => {
    return new Set(posts.map((p) => p.author.name)).size;
  }, [posts]);

  return (
    <div className="blog-root">
     
      {/* ---------- Hero ---------- */}
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <div className="badge fade-in">
            <span className="dot"></span>
            <span className="badge-text">Community Journal</span>
          </div>
          <h1>
            Stories, science, and <em>lives saved</em> — written by our donors.
          </h1>
          <p>
            A formal forum where donors, volunteers, and medical professionals share experiences and
            evidence-based knowledge about blood donation. Read freely, contribute when you are ready.
          </p>
          <div className="blog-hero-actions">
            <button className="blog-btn blog-btn-primary" onClick={openCompose}>
              Share your story
            </button>
            <a className="blog-btn blog-btn-outline" href="#latest">
              Read latest posts
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Main grid ---------- */}
      <main className="blog-main" id="latest">
        <div>
          <div className="blog-section-head">
            <h2>Latest Articles</h2>
            <span className="blog-count">{filteredPosts.length} {filteredPosts.length === 1 ? "Entry" : "Entries"}</span>
          </div>

          <div className="blog-filters" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={activeCategory === c}
                className={`blog-chip ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="blog-empty">
              <h3>No articles yet in this category</h3>
              <p>Be the first to publish a post — your perspective matters.</p>
            </div>
          ) : (
            <div className="blog-posts">
              {filteredPosts.map((post) => {
                const isOpen = !!expanded[post.id];
                const isLiked = !!likes[post.id];
                const isLong = post.body.length > 320;
                return (
                  <article key={post.id} className="blog-post">
                    <div className="blog-post-meta">
                      <div className="blog-post-author">
                        <div className="blog-avatar">{post.author.initials}</div>
                        <span><strong>{post.author.name}</strong></span>
                      </div>
                      <span className="blog-post-dot">•</span>
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="blog-post-tag">{post.category}</span>
                    </div>

                    <h3 className="blog-post-title" onClick={() => toggleExpand(post.id)}>
                      {post.title}
                    </h3>

                    <p className={`blog-post-body ${!isOpen && isLong ? "collapsed" : ""}`}>
                      {post.body}
                    </p>

                    <div className="blog-post-actions">
                      <button
                        className={`blog-action-btn ${isLiked ? "liked" : ""}`}
                        onClick={() => toggleLike(post.id)}
                        aria-label={isLiked ? "Unlike post" : "Like post"}
                      >
                        <span aria-hidden>{isLiked ? "♥" : "♡"}</span>
                        {post.likes} {post.likes === 1 ? "like" : "likes"}
                      </button>
                      <span style={{ color: "var(--line)" }}>|</span>
                      <span className="blog-action-btn" style={{ cursor: "default" }}>
                        ⏱ {Math.max(1, Math.round(post.body.split(" ").length / 200))} min read
                      </span>
                      {isLong && (
                        <button className="blog-action-btn blog-read-toggle" onClick={() => toggleExpand(post.id)}>
                          {isOpen ? "Show less" : "Read more →"}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className="blog-sidebar">
          <div className="blog-card">
            <h4>Journal at a glance</h4>
            <div className="blog-stat-row">
              <span className="blog-stat-label">Published articles</span>
              <span className="blog-stat-value">{posts.length}</span>
            </div>
            <div className="blog-stat-row">
              <span className="blog-stat-label">Contributing authors</span>
              <span className="blog-stat-value">{totalAuthors}</span>
            </div>
            <div className="blog-stat-row">
              <span className="blog-stat-label">Categories</span>
              <span className="blog-stat-value">{CATEGORIES.length - 1}</span>
            </div>
          </div>

          <div className="blog-card">
            <h4>Editorial Note</h4>
            <blockquote className="blog-quote">
              Every article published here is a step toward a more informed and generous community.
              We invite donors and clinicians alike to contribute responsibly.
              <span className="blog-quote-author">— Editorial Board</span>
            </blockquote>
          </div>

          <div className="blog-card">
            <h4>Submission Guidelines</h4>
            <ul style={{ margin: 0, paddingLeft: 18, fontFamily: "Georgia, serif", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.8 }}>
              <li>Be respectful and factual.</li>
              <li>Cite sources for medical claims.</li>
              <li>Avoid sharing personal patient data.</li>
              <li>Use formal, inclusive language.</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <span>© {new Date().getFullYear()} Gondar Blood Bank — Community Journal. All rights reserved.</span>
          <nav>
            <a href="#latest">Articles</a>
            <Link to="/service">Service</Link>
            <Link to="/process">Process</Link>
          </nav>
        </div>
      </footer>

      {/* ---------- Auth modal ---------- */}
      {authOpen && (
        <div className="blog-modal-backdrop" onClick={() => setAuthOpen(false)}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Authentication">
            <div className="blog-modal-head">
              <h3>{authMode === "signin" ? "Welcome back" : "Create your account"}</h3>
              <button className="blog-modal-close" onClick={() => setAuthOpen(false)} aria-label="Close">×</button>
            </div>
            <div className="blog-modal-body">
              <div className="blog-auth-tabs">
                <button
                  className={`blog-auth-tab ${authMode === "signin" ? "active" : ""}`}
                  onClick={() => { setAuthMode("signin"); setAuthError(""); }}
                >
                  Sign in
                </button>
                <button
                  className={`blog-auth-tab ${authMode === "signup" ? "active" : ""}`}
                  onClick={() => { setAuthMode("signup"); setAuthError(""); }}
                >
                  Create account
                </button>
              </div>

              <button type="button" className="blog-btn blog-btn-google" onClick={handleGoogleSignIn}>
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="blog-divider">or with email</div>

              <form onSubmit={handleEmailAuth} noValidate>
                {authMode === "signup" && (
                  <div className="blog-field">
                    <label htmlFor="auth-name">Full name</label>
                    <input
                      id="auth-name"
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Jane Doe"
                      maxLength={80}
                    />
                  </div>
                )}
                <div className="blog-field">
                  <label htmlFor="auth-email">Email address</label>
                  <input
                    id="auth-email"
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="you@example.com"
                    maxLength={120}
                    autoComplete="email"
                  />
                </div>
                <div className="blog-field">
                  <label htmlFor="auth-password">Password</label>
                  <input
                    id="auth-password"
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    maxLength={120}
                    autoComplete={authMode === "signin" ? "current-password" : "new-password"}
                  />
                </div>

                {authError && <div className="blog-field-error" role="alert">{authError}</div>}

                <button type="submit" className="blog-btn blog-btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                  {authMode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              <p className="blog-auth-note">
                Frontend demo only — sessions are stored locally in your browser.
                Connect a backend for production-grade authentication.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Compose modal ---------- */}
      {composeOpen && user && (
        <div className="blog-modal-backdrop" onClick={() => setComposeOpen(false)}>
          <div className="blog-modal wide" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Write a post">
            <div className="blog-modal-head">
              <h3>Publish a new article</h3>
              <button className="blog-modal-close" onClick={() => setComposeOpen(false)} aria-label="Close">×</button>
            </div>
            <form onSubmit={handlePublish}>
              <div className="blog-modal-body">
                <div className="blog-field">
                  <label htmlFor="post-title">Title</label>
                  <input
                    id="post-title"
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="A clear, formal headline"
                    maxLength={140}
                  />
                </div>
                <div className="blog-field">
                  <label htmlFor="post-category">Category</label>
                  <select
                    id="post-category"
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value)}
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="blog-field">
                  <label htmlFor="post-body">Article body</label>
                  <textarea
                    id="post-body"
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    placeholder="Share your experience, knowledge, or message. Keep it factual and respectful."
                    maxLength={5000}
                  />
                  <div style={{ marginTop: 6, textAlign: "right", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 12, color: "var(--muted)" }}>
                    {draftBody.length} / 5000
                  </div>
                </div>

                {draftError && <div className="blog-field-error" role="alert">{draftError}</div>}
              </div>
              <div className="blog-modal-foot">
                <button type="button" className="blog-btn blog-btn-ghost" onClick={() => setComposeOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="blog-btn blog-btn-primary">
                  Publish article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
