import './globals.css';

export const metadata = {
  title: "Invitations",
  description: "Invite your friends!",
  icons: {
    icon: '/icon.png'
  }
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>
          <div id="modal"></div>
          <main >
            {children}
          </main> 
        </body>
      </html> 
  );
}
