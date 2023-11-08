import Link from 'next/link';
import Button, { btnVars } from './ui/button';
import { House } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { signOut } from 'next-auth/react';
import UserAccountNav from './UserAccountNav';
// import { HandMetal } from 'lucide-react';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div className=' bg-transparent py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex justify-between'>
        <Link href='/'>
          <House size={32} weight="thin" color="" />
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link className={btnVars()} href='/sign-in'>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;