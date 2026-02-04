import "./globals.css";

export const metadata = {
  title: "Zmrzlina od Klárky | Domácí zmrzlina v Kunraticích",
  description: "Nejlepší domácí zmrzlina v Kunraticích. Navštivte naši zmrzlinárnu a vychutnejte si čerstvou zmrzlinu vyrobenou s láskou!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}