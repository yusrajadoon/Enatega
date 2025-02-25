import type { Metadata } from "next";
import "tailwindcss/tailwind.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "@/components/Navbar";
import LiveMap from "@/components/LiveMap";
import LocationBar from "@/components/LocationBar";
export const metadata: Metadata = {
  title: "Find Restaurants Near You",
  description: "Search for nearby restaurants based on your location",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="min-h-screen flex flex-col">
          {/* Navbar at the top */}
          <Navbar />

          {/* Live Map below the Navbar with a defined height */}
          <div className="h-[400px]">
            <div className="left-1/2 transform -translate-x-1/2 z-20 w-full max-w-3xl px-4">
              <LocationBar />
              <LiveMap />
            </div>
          </div>

          {/* Main Content
          <main className="flex-grow container mx-auto p-6">{children}</main> */}

          {/* Footer */}
          <footer className="bg-white text-center py-4 mt-8 shadow-md">
            <p className="text-sm text-gray-500">
            Enatega – © {new Date().getFullYear()} All Rights Reserved
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
