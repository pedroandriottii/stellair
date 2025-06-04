import Footer from "@/components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className="flex flex-col min-h-screen">
      <main className="flex-1 h-screen">{children}</main>
      <Footer />
    </body>
  );
}
