import './style.css';
import { instagramHandle } from './config.js';

const episodeModules = import.meta.glob('../episodes/*/episode.json', { eager: true, import: 'default' });
const episodes = Object.values(episodeModules).sort((a, b) => String(a.sortKey).localeCompare(String(b.sortKey)));
const base = import.meta.env.BASE_URL;
const app = document.querySelector('#app');

function siteUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.replace(/^\/+/, '')}`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function artwork(episode) {
  if (episode.artwork === 'notes') {
    return `<div class="art art-notes" aria-hidden="true"><span class="tape"></span><div class="paper"><span class="paper-kicker">A NOTE TO FUTURE ME</span><strong>one<br>next<br>step</strong><span class="scribble"></span></div><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span><span class="art-index">02 / 02</span></div>`;
  }
  return `<div class="art art-timer" aria-hidden="true"><span class="timer-label">THE NAP SPRINT</span><span class="timer-number">15<span>:</span>00</span><span class="timer-ring"></span><span class="timer-caption">a little focus goes a long way</span><span class="art-index">01 / 02</span></div>`;
}

function episodeCard(episode) {
  const isSample = Boolean(episode.sample);
  const reel = episode.reelUrl ? `<a class="text-link reel-link" href="${escapeHtml(siteUrl(episode.reelUrl))}" target="_blank" rel="noreferrer">Watch the reel <span aria-hidden="true">↗</span></a>` : `<span class="text-link text-link-muted" aria-label="Reel link coming soon">Reel link soon <span aria-hidden="true">↗</span></span>`;
  const appLink = episode.appUrl ? `<a class="try-link" href="${escapeHtml(siteUrl(episode.appUrl))}" ${/^https?:\/\//i.test(episode.appUrl) ? 'target="_blank" rel="noreferrer"' : ''}>${isSample ? 'Try this sample' : 'Try the app'} <span aria-hidden="true">↗</span></a>` : `<span class="try-link try-link-disabled">App link soon</span>`;
  return `<article class="episode-card ${isSample ? 'is-sample' : ''}">
    ${artwork(episode)}
    <div class="episode-content">
      <div class="episode-meta"><span class="day-label">${escapeHtml(episode.dayLabel || 'EPISODE')}</span>${isSample ? '<span class="sample-label">SAMPLE · NOT A REAL EPISODE</span>' : ''}</div>
      <h3>${escapeHtml(episode.title)}</h3>
      <p class="episode-description">${escapeHtml(episode.description)}</p>
      <div class="episode-actions">${reel}${appLink}</div>
    </div>
  </article>`;
}

const handle = instagramHandle.trim().replace(/^@/, '');
const followLabel = handle ? `@${escapeHtml(handle)}` : '@yourhandle';
const followLink = handle ? `<a class="follow-button" href="https://www.instagram.com/${encodeURIComponent(handle)}/" target="_blank" rel="noreferrer">Follow the series <span aria-hidden="true">↗</span></a>` : `<span class="follow-button follow-placeholder" aria-label="Instagram link placeholder">Follow the series <span aria-hidden="true">↗</span></span>`;

app.innerHTML = `
  <header class="site-header shell">
    <a class="wordmark" href="#top" aria-label="Nap Time Builds home"><span class="brand-mark" aria-hidden="true"><i></i></span><span>NAP TIME <b>BUILDS</b></span></a>
    <nav aria-label="Main navigation"><a href="#episodes">THE BUILDS</a><a href="#follow">FOLLOW ALONG <span aria-hidden="true">↗</span></a></nav>
  </header>
  <main id="top">
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="live-dot"></span> FIELD NOTES FROM THE NAP WINDOW</p>
        <h1 id="hero-title">Little apps.<br><em>Little windows.</em></h1>
        <p class="hero-story">Dad of three + ServiceNow architect, building small apps in the 15-minute nap window.</p>
        <a class="hero-cta" href="#episodes">SEE WHAT’S ON THE BUILD LIST <span aria-hidden="true">↓</span></a>
      </div>
      <div class="hero-art" aria-label="A tiny daily build timer showing fifteen minutes">
        <div class="sunburst" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
        <div class="hero-note"><span class="note-top"><span>NAP WINDOW</span><span class="note-dot"></span></span><div class="big-time">15<span>:</span>00</div><div class="note-bottom"><span>one idea</span><span class="note-arrow">↗</span><span>one small build</span></div></div>
        <span class="hero-stamp">BUILT<br>BETWEEN<br>NAPS</span>
        <span class="hero-squiggle" aria-hidden="true">✳</span>
      </div>
    </section>
    <section id="episodes" class="episode-section shell" aria-labelledby="episodes-title">
      <div class="section-heading"><div><p class="eyebrow section-eyebrow">THE RUNNING LIST</p><h2 id="episodes-title">Made in the margins.</h2></div><span class="episode-count">${String(episodes.length).padStart(2, '0')} BUILDS ON THE TABLE</span></div>
      <div class="episode-grid">${episodes.map(episodeCard).join('')}</div>
    </section>
  </main>
  <footer id="follow" class="follow-section">
    <div class="follow-inner shell"><div class="follow-copy"><p class="eyebrow">WHEN THE NAP STARTS, WE BUILD</p><h2>Follow the little builds.</h2><p>Reels, tiny wins, and the occasional “baby woke up” ending.</p></div><div class="follow-action"><span class="instagram-handle">${followLabel}</span>${followLink}<span class="handle-hint">${handle ? 'SEE YOU ON INSTAGRAM' : 'YOUR INSTAGRAM HANDLE GOES HERE'}</span></div></div>
    <div class="footer-bottom shell"><span>MADE IN THE QUIET, WITH COFFEE NEARBY</span><span>NAP TIME BUILDS <b>·</b> 2026</span></div>
  </footer>
`;
