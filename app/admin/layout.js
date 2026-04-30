export const metadata = {
  title: 'Sanity Studio - Sarkari CMS',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="sanity-admin-layout">
      {children}
    </div>
  );
}
