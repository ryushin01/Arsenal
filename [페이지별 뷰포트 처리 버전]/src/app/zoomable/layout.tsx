"use client";

import { ReactNode } from "react";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
};

export default function ZoomableLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <main className="test">{children}</main>
    </>
  );
}
