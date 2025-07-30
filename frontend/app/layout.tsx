import '../styles/globals.css';
import '../styles/app.css';

export const metadata = {
  title: 'AI Chat Application',
  description: 'Chat with GPT-4.1-mini using OpenAI API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
