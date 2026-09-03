export interface Course {
  slug: string;
  title: string;
  level: string;
  rating: number;
  reviews: string;
  price: string;
  discount: string | null;
  originalPrice: string | null;
  image: string;
}

export const courses: Course[] = [
  {
    slug: '3d-objek-menjual-freepik',
    title: '3D Design : Bagaimana Cara Membuat 3D Objek yang Menjual di Freepik',
    level: 'Basic Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 0',
    discount: '100% off',
    originalPrice: 'Rp. 159.000',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: '3d-animasi-produk-blender',
    title: '3D Design : Membuat Animation 3D Produk di Blender',
    level: 'Advanced Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 99.000',
    discount: '80% off',
    originalPrice: 'Rp. 449.000',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'ui-ux-menjual-produk-ui-kit',
    title: 'UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit',
    level: 'Advanced Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 449.000',
    discount: '50% off',
    originalPrice: 'Rp. 899.000',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: '3d-bangun-ruang',
    title: '3D Design : Mengembangkan 3D Objek Menjadi 3D Bangun Ruang',
    level: 'Intermediate Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 59.000',
    discount: '76% off',
    originalPrice: 'Rp. 249.000',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'vector-ilustrasi-figma',
    title: 'Vector Design : Membuat Vector Ilustrasi Menggunakan Figma',
    level: 'Advanced Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 99.000',
    discount: '80% off',
    originalPrice: 'Rp. 449.000',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'web-portfolio-simpel',
    title: 'Front-End : Membuat Web Portfolio Simpel dan Berkelas',
    level: 'Basic Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 0',
    discount: '100% off',
    originalPrice: 'Rp. 159.000',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  },
];
