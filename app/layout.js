
'use client'
import "bootstrap/dist/css/bootstrap.css";
import { Signika_Negative } from "next/font/google";
import { Provider } from "react-redux";

const signikaNegative = Signika_Negative({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={signikaNegative.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
