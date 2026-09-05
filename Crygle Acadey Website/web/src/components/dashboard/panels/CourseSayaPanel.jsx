import React from 'react';
import Link from 'next/link';

export function CourseSayaPanel() {
  const enrolledCourses = [
    {
      slug: 'ui-ux-menjual-produk-ui-kit',
      title: 'UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit',
      level: 'Advanced Level Class',
      category: 'design',
      progress: 60,
      modulesLabel: '5/8 Modul',
      progressColor: '#31BC53',
      image: '/dashboard-assets/lesson-video-poster.jpg',
    },
    {
      slug: '3d-blender-animation',
      title: '3D Design : Membuat Animation 3D Produk di Blender',
      level: 'Intermediate Level Class',
      category: '3d',
      progress: 30,
      modulesLabel: '3/8 Modul',
      progressColor: '#FCC112',
      image: '/dashboard-assets/blender-course-thumb.jpg',
    },
    {
      slug: '3d-object-bangunan-digital',
      title: '3D Design : Mengembangkan 3D Objek Menjadi 3D Bangunan Digital',
      level: 'Intermediate Level Class',
      category: '3d',
      progress: 25,
      modulesLabel: '2/8 Modul',
      progressColor: '#FCC112',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="panel-courses" className="dashboard-panel active" style={{ display: 'block' }}>
      <div
        className="dashboard-courses-body"
        id="enrolled-courses-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}
      >
        {enrolledCourses.map((course) => (
          <Link
            key={course.slug}
            href={`/classroom/${course.slug}`}
            className="dashboard-course-card"
            data-category={course.category}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              className="course-card-thumb-wrap"
              style={{
                width: '100%',
                height: 180,
                position: 'relative',
                background: '#F1F6FC',
                overflow: 'hidden',
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="course-card-thumb-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div
              className="dashboard-card-info"
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                flex: 1,
              }}
            >
              <h2
                className="dashboard-card-title"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#202020',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {course.title}
              </h2>
              <span className="dashboard-card-level" style={{ fontSize: 12, color: '#797979' }}>
                {course.level}
              </span>
              <div
                className="dashboard-progress-track"
                style={{
                  width: '100%',
                  height: 6,
                  background: '#EAEAEA',
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginTop: 4,
                }}
              >
                <div
                  className="dashboard-progress-fill"
                  style={{
                    width: `${course.progress}%`,
                    height: '100%',
                    background: course.progressColor,
                    borderRadius: 20,
                  }}
                />
              </div>
              <div
                className="dashboard-card-meta-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#797979',
                }}
              >
                <span>{course.modulesLabel}</span>
                <span style={{ color: course.progressColor }}>{course.progress}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
