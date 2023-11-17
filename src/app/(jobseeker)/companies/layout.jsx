
import { Navbar2 } from "@/components/client/ui/navbar";
import TopSearch from "@/components/client/ui/TopSearch";

export default function JobsLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section className="min-h-screen">
        <Navbar2/>
        <TopSearch />
   
        {children}
      </section>
    )
  }