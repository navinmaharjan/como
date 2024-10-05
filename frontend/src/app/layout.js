import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "COMO-Online store for bags",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers>
        {children}
      </Providers>
      <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 2500,
              },
              error: {
                duration: 4000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
              },
            }}
          />
      </body>
    </html>
  );
}
