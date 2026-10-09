import './index.css'; // Pastikan file index.css Anda ada di folder app/

export const metadata = {
  title: 'Seminar Weka',
  description: 'Seminar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}