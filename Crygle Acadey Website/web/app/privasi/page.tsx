import type { Metadata } from 'next';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — Crygle Academy',
  description:
    'Kebijakan privasi Crygle Academy — bagaimana kami mengumpulkan, menggunakan, dan melindungi data santri, siswa, dan wali santri.',
};

export default function PrivasiPage() {
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
          Legalitas Platform
        </span>
        <SectionHeading
          title="Kebijakan Privasi"
          supporting="Komitmen kami menjaga keamanan data santri, siswa, dan wali santri Crygle Academy."
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
          Crygle Academy (&quot;kami&quot;) berkomitmen menjaga privasi santri, siswa, wali santri, dan sekolah mitra (&quot;kamu&quot;) yang menggunakan platform pembelajaran kami. Kebijakan ini menjelaskan data apa yang kami kumpulkan, bagaimana kami menggunakannya, dan hak kamu atas data tersebut.
        </p>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            1. Data yang Kami Kumpulkan
          </h2>
          <p>Saat kamu mendaftar dan menggunakan Crygle Academy, kami mengumpulkan:</p>
          <ul style={{ paddingLeft: 24, marginTop: 8 }}>
            <li><strong>Data akun:</strong> nama lengkap, alamat email, nomor WhatsApp, dan asal sekolah/asrama.</li>
            <li><strong>Data pembelajaran:</strong> progres modul, nilai tugas, riwayat konsultasi mentor, dan aktivitas belajar harian.</li>
            <li><strong>Data transaksi:</strong> riwayat pembelian kelas/bootcamp dan metode pembayaran yang dipilih (nomor kartu/VA tidak kami simpan — diproses oleh penyedia pembayaran pihak ketiga berizin).</li>
            <li><strong>Data teknis:</strong> alamat IP, jenis perangkat, dan log aktivitas untuk keperluan keamanan sistem.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            2. Bagaimana Kami Menggunakan Data
          </h2>
          <ul style={{ paddingLeft: 24, marginTop: 8 }}>
            <li>Menyediakan &amp; mempersonalisasi pengalaman belajar (progress tracking, rekomendasi kelas).</li>
            <li>Memfasilitasi komunikasi antara santri dan mentor.</li>
            <li>Memproses pembayaran dan mengirimkan bukti transaksi.</li>
            <li>Melaporkan progres belajar ke sekolah/asrama mitra pada program kemitraan institusi.</li>
            <li>Mengirim notifikasi penting terkait jadwal, tugas, dan pengumuman cohort.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            3. Perlindungan Data Anak &amp; Remaja
          </h2>
          <p>
            Sebagian besar pengguna Crygle Academy adalah siswa tingkat SD hingga SMK. Untuk pengguna di bawah 17 tahun, kami menganjurkan pendaftaran diketahui oleh orang tua/wali atau pihak sekolah/asrama mitra. Kami tidak membagikan data pribadi santri kepada pihak ketiga untuk tujuan pemasaran komersial.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            4. Berbagi Data dengan Pihak Ketiga
          </h2>
          <p>
            Kami tidak menjual data pribadi kamu. Data hanya dibagikan dengan: (a) penyedia layanan pembayaran resmi untuk memproses transaksi, (b) sekolah/asrama mitra resmi untuk pelaporan progres akademik sesuai perjanjian kemitraan, dan (c) otoritas hukum jika diwajibkan oleh peraturan perundang-undangan yang berlaku.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            5. Keamanan Data
          </h2>
          <p>
            Kami menerapkan enkripsi standar industri (Secured by Encrypted Gateway · Sanctuary Protocol) untuk seluruh transaksi pembayaran, dan pembatasan akses internal terhadap data pribadi santri.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            6. Hak Kamu
          </h2>
          <ul style={{ paddingLeft: 24, marginTop: 8 }}>
            <li>Meminta salinan data pribadi yang kami simpan.</li>
            <li>Meminta koreksi data yang tidak akurat melalui halaman Pengaturan Profil di Dashboard.</li>
            <li>Meminta penonaktifan akun &amp; data terkait, kecuali data yang wajib disimpan untuk kepatuhan hukum/keuangan.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-500)', marginBottom: 12 }}>
            7. Hubungi Kami
          </h2>
          <p>
            Pertanyaan seputar kebijakan privasi ini dapat dikirimkan melalui email ke{' '}
            <a href="mailto:tanya@crygleacademy.com" style={{ color: 'var(--blue-500)', fontWeight: 600 }}>
              tanya@crygleacademy.com
            </a>.
          </p>
        </section>
      </article>
    </div>
  );
}
