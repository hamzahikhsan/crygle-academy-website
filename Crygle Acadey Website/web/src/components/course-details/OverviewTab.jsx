import React from 'react';

export function OverviewTab() {
  const whatYouGet = [
    'Membangun pendapatan passive income jutaan rupiah sebagai seorang UI/UX designer',
    'Belajar membuat UI Kit dengan urutan proses yang sesuai dan terstandarisasi',
    'Mempelajari cara membuka toko, mengupload produk & melakukan promosi di UI8',
    'Mempelajari penjelasan, komponen & kegunaan UI Kit secara umum',
    'Mempelajari hal wajib & opsional agar bisa membuat UI Kit yang menarik & layak dijual',
  ];

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 24, fontWeight: 700, color: 'var(--black)', marginBottom: 20 }}>
        Course Overview
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--grey-500)', fontFamily: 'var(--font-core)', fontSize: 16, lineHeight: 1.7 }}>
        <p>
          Dalam era digital yang berkembang pesat, mencari cara untuk menghasilkan passive income adalah impian banyak orang. Salah satu cara yang menjanjikan sebagai seorang UI/UX desainer adalah dengan membuat dan menjual UI Kit di platform terkemuka seperti UI8. UI8 adalah sebuah platform online yang terkemuka dalam dunia desain. Website ini menawarkan berbagai macam resource digital yang sangat berguna bagi UI/UX desainer, pengembang, dan profesional kreatif lainnya. Banyaknya visitor website ini setiap harinya, memberikan peluang bagi kita untuk memanfaatkan market yang besar ini dan menjadi seller di website UI8.
        </p>
        <p>
          Sayangnya, masih banyak sekali designer yang bingung harus mulai darimana jika ingin membuka toko & menjual produk di UI8. Di kelas &ldquo;Create & Selling UI Kit in UI8&rdquo; kita akan mengulik lebih dalam lagi tentang apa itu UI Kit mulai dari penjelasannya, komponennya, tujuannya dan juga mempelajari tentang ciri ciri UI Kit yang bagus dan layak dijual. Di kelas ini juga kita akan belajar bersama-sama bagaimana caranya membuat UI Kit dari mulai membuat user flow, moodboarding, wireframing hingga final design prosesnya.
        </p>
        <p>
          Tidak berhenti sampai situ saja. Kita juga akan belajar cara melakukan proses finalisasi produk, membuat presentasi produk, membuka toko di UI8, mengupload produk yang sudah kita buat ke UI8 dan mempelajari juga cara melakukan payout di UI8 agar kita bisa menjadikan ini sebagai passive income kita dan mendapatkan jutaan rupiah setiap bulannya hanya dari menjual UI Kit.
        </p>
        <p>
          Kelas ini dirancang untuk semua tingkatan pengalaman, dari pemula hingga profesional desainer. Dengan pengetahuan dan keterampilan yang Anda peroleh dari kelas ini, Anda akan dapat memulai menjual UI Kit Anda sendiri dan membangun passive income yang berkelanjutan dari penjualan produk Anda di UI8. So, tunggu apalagi? Segera bergabung dengan kelas kami untuk bisa membuat produk UI Kit pertama Anda dan hasilkan passive income jutaan rupiah. Sampai jumpa di kelas dan selamat belajar!
        </p>
      </div>

      <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border-default)' }}>
        <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 22, fontWeight: 700, color: 'var(--black)', marginBottom: 20 }}>
          Apa yang Akan Kamu Dapat?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {whatYouGet.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--blue-500)" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span style={{ fontFamily: 'var(--font-core)', fontSize: 15, color: 'var(--black)', lineHeight: 1.6 }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
