import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { AuthProvider } from "./context/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/const/i18next";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <SidebarProvider>
            {/* <div className="flex"> */}
              <AppSidebar />
              <SidebarInset>
              <SidebarTrigger />
                <App />
              </SidebarInset>
            {/* </div> */}
          </SidebarProvider>
        </I18nextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
