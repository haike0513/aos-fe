import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "./layout.css";
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  // { params, searchParams }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: 'Aos Playground', 
    // icons: '',
  }
}

// const inter = Inter({ subsets: ["latin"] });
const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={popins.className}>{children}</body>
    </html>
  );
}
