import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
