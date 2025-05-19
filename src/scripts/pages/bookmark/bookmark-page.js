import * as CityCareAPI from '../../data/api';

export default class BookmarkPage {
  async render() {
    return `
      <section class="container">
        <h1>Laporan Tersimpan</h1>
        <div id="bookmarks-list"></div>
      </section>
    `;
  }

  async afterRender() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const container = document.getElementById('bookmarks-list');
    if (bookmarks.length === 0) {
      container.innerHTML = '<p>Tidak ada laporan tersimpan.</p>';
      return;
    }

    // Ambil detail laporan satu per satu
    const reports = await Promise.all(
      bookmarks.map(async (id) => {
        const res = await CityCareAPI.getReportById(id);
        return res.ok ? res.data : null;
      }),
    );

    container.innerHTML = reports
      .filter(Boolean)
      .map(
        (report) => `
        <div>
          <h2>${report.title}</h2>
          <p>${report.description}</p>
          <a href="#/reports/${report.id}">Lihat Detail</a>
        </div>
      `,
      )
      .join('');
  }
}
