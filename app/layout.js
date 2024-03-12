
export const metadata = {
  title: "Invitations",
  description: "Invite your friends!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main >
          {children}
        </main> 
      </body>
    </html>
  );
}
