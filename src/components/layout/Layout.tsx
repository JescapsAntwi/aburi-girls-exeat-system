
import { Toaster } from "sonner";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-4 px-6 text-center text-sm text-gray-500 border-t">
        <p>© {new Date().getFullYear()} Aburi Girls Exeat System. All rights reserved.</p>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
