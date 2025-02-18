import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/routes";

import { AuthProvider } from "./context";
import { Toaster } from "./components/ui/toaster";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/react-query";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <Toaster />
          </QueryClientProvider>
        </AuthProvider> 
      </BrowserRouter>
    </>
  );
}
