import "./globals.css";


export const metadata = {
  title: "VAR Cloud",
  description: "Var Cloud is a cloud-based service designed for smart, user-friendly knowledge gathering, delivering fast and accurate results with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
