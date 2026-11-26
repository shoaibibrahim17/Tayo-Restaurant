"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Footer, Navbar } from "@/components/site/navbar";
import { HomeView } from "@/components/site/views/home";
import { MenuView } from "@/components/site/views/menu";
import { HallView } from "@/components/site/views/hall";
import { ContactView } from "@/components/site/views/contact";

/* Views are routed by URL hash (e.g. example.com/#/menu) so the exported
 * static site works on any host — GitHub Pages, Cloudflare Pages, S3 —
 * with zero server configuration. */

const VIEWS: Record<string, (p: { onNavigate: (p: string) => void }) => React.ReactNode> = {
  "/": ({ onNavigate }) => <HomeView onNavigate={onNavigate} />,
  "/menu": () => <MenuView />,
  "/hall": () => <HallView />,
  "/contact": () => <ContactView />,
};

function currentPath(): string {
  const hash = window.location.hash.replace(/^#/, "");
  return VIEWS[hash] ? hash : "/";
}

export default function Page() {
  const [path, setPath] = useState("/");

  useEffect(() => {
    const onHash = () => setPath(currentPath());
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((next: string) => {
    if (next === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = next;
  }, [path]);

  // scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);

  const View = VIEWS[path] ?? VIEWS["/"];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar current={path} onNavigate={navigate} />

        <main id="main" className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <View onNavigate={navigate} />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigate} />
        <Toaster position="bottom-center" richColors closeButton />
      </div>
    </MotionConfig>
  );
}
