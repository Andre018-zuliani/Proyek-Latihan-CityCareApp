import Map from '../utils/map';

export async function reportMapper(report) {
  return {
    ...report,
    location: {
      ...report.location,
      placeName: await Map.getPlaceNameByCoordinate(
        report.location.latitude,
        report.location.longitude,
      ),
    },
  };
}

export function renderSaveButton() {
  document.getElementById('save-actions-container').innerHTML = generateSaveReportButtonTemplate();

  document.getElementById('report-detail-save').addEventListener('click', async () => {
    // Ambil daftar bookmark dari localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    // Ambil id laporan dari URL
    const { id } = parseActivePathname();
    // Tambahkan id jika belum ada
    if (!bookmarks.includes(id)) {
      bookmarks.push(id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      alert('Laporan berhasil disimpan!');
    } else {
      alert('Laporan sudah ada di daftar tersimpan.');
    }
  });
}
