
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CekKeaslian from "./pages/CekKeaslian";
import KirimSurat from "./pages/KirimSurat";
import CekProgress from "./pages/CekProgress";
import Bantuan from "./pages/Bantuan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cek-keaslian" element={<CekKeaslian />} />
          <Route path="/kirim-surat" element={<KirimSurat />} />
          <Route path="/cek-progress" element={<CekProgress />} />
          <Route path="/bantuan" element={<Bantuan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
