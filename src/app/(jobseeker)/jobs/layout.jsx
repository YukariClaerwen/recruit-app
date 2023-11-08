"use client";

import { Navbar2 } from "@/components/client/ui/navbar";
import TopSearch from "@/components/form/search";

export default function JobsLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        <Navbar2/>
        <TopSearch />
   
        {children}
      </section>
    )
  }