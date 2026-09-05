import type { Metadata } from 'next';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Crygle Academy',
  description:
    'Syarat dan ketentuan penggunaan platform Crygle Academy — hak akses kelas, kebijakan pembayaran, dan tata tertib santri.',
};

export default function SyaratKetentuanPage() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 16px',
            borderRadius: 20,
            background: 'var(--surface-tint)',
            color: 'var(--blue-500)',
            fontFamily: 'var(--font-core)',
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Ketentuan Layanan
        </span>
        <SectionHeading
          title="Syarat &amp; Ketentuan"
          supporting="Tata tertib penggunaan platform, hak akses kelas, dan ketentuan belajar di Crygle Academy."
        />
        <div
          style={{
            marginTop: 16,
            fontSize: 13,
            color: 'var(--grey-400)',
            fontFamily: 'var(--font-core)',
          }}
        >
          Terakhir diperbarui: 3 September 2026
        </div>
      </div>

      <article
        style={{
          background: 'var(--surface-card)',
          borderRadius: 24,
          padding: '48px 40px',
          boxShadow: 'var(--shadow-card)',
          fontFamily: 'var(--font-core)',
          color: 'var(--black)',
          lineHeight: 1.8,
          fontSize: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <p>
          Dengan mendaftar dan menggunakan platform Crygle Academy, kamu (atau wali sah kamu jika berusia di bawah 17 tahun) menyetujui syarat &amp; ketentuan berikut.
        </p>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            1. Kelayakan Pengguna
          </h2>
          <p>
            Crygle Academy terbuka untuk siswa tingkat SD, SMP, hingga SMK, termasuk santri di sekolah asrama mitra program &quot;Crygle Academy x Boarding School&quot;. Pengguna di bawah 17 tahun disarankan mendaftar dengan sepengetahuan orang tua/wali atau pihak sekolah.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            2. Akun &amp; Akses Kelas
          </h2>
          <ul style={{ paddingLeft: 24, marginTop: 8 }}>
            <li>Satu akun hanya boleh digunakan oleh satu orang santri/siswa — dilarang membagikan akses login ke pihak lain.</li>
            <li>Kelas yang sudah dibeli memberikan <strong>akses seumur hidup (lifetime access)</strong> ke modul video dan materi terkait, termasuk update materi di masa mendatang.</li>
            <li>Kami berhak menonaktifkan akun yang terbukti melanggar ketentuan ini atau menyalahgunakan platform.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            3. Pembayaran &amp; Pengembalian Dana
          </h2>
          <ul style={{ paddingLeft: 24, marginTop: 8 }}>
            <li>Pembayaran diproses melalui metode yang tersedia di halaman Checkout (Virtual Account BNI/Mandiri/BSI, QRIS, atau Kartu Debit/Kredit).</li>
            <li>Akses kelas video dan pendaftaran bootcamp otomatis aktif segera setelah pembayaran diverifikasi oleh sistem gateway.</li>
            <li>Pengembalian dana (refund) dapat diajukan dalam waktu maksimal 7 hari sejak pembelian apabila terjadi kendala teknis yang menghalangi akses belajar dan telah dikonfirmasi oleh tim support kami.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            4. Hak Kekayaan Intelektual
          </h2>
          <p>
            Seluruh materi video, silabus, aset desain, dan modul pembelajaran di Crygle Academy dilindungi hak cipta. Pengguna dilarang merekam, memperjualbelikan, atau mendistribusikan ulang konten tanpa izin tertulis dari manajemen Crygle Academy.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            5. Tata Tertib &amp; Kode Etik Belajar
          </h2>
          <ul style={{ paddingLeft: 24, marginTop: 8 }}>
            <li>Santri diharapkan menjaga kesopanan dan etika saat berinteraksi dengan mentor maupun sesama santri di ruang diskusi dan sesi konsultasi.</li>
            <li>Karya tugas akhir dan portofolio harus merupakan hasil karya mandiri santri, dengan bimbingan dan feedback mentor.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            6. Kontak Kami
          </h2>
          <p>
            Jika kamu memiliki pertanyaan terkait Syarat &amp; Ketentuan ini, silakan hubungi tim kami melalui email{' '}
            <a href="mailto:tanya@crygleacademy.com" style={{ color: 'var(--blue-500)', fontWeight: 600 }}>
              tanya@crygleacademy.com
            </a>.
          </p>
        </section>
      </article>
    </div>
  );
}
