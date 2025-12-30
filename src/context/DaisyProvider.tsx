import ToastProvider from "./toast/ToastProvider";
import ThemeProvider from "./theme/ThemeProvider";
import ModalProvider from "./modal/ModalProvider";
import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <ThemeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}