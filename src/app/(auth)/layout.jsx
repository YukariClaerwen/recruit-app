
import Footer from '@/components/client/ui/footer';
import Header from '@/components/client/ui/header';
import Navbar from '@/components/client/ui/navbar';


export const metadata = {
  title: 'Kết nối việc làm - Tài khoản của bạn',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <>
      <main className="main-content z-10 min-h-screen">
        <Header />
        <Navbar />
        <div className="flex flex-col justify-center items-center color-black gap-5 styleLight">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
