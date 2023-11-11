
import { List } from "@phosphor-icons/react/dist/ssr";
import Logo from "../ui/logo";
import { SearchNav } from "../client/ui/TopSearch";
import Button from 'react-bootstrap/Button';
import UserNav from "./UserNav";

const Navbar = ({showSidebar}) => {
    return (
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row bg-white shadow-lg">
            <div className="navbar-menu-wrapper flex items-stretch justify-between w-full">
                <ul className="navbar-nav mr-lg-2 hidden lg:flex lg:flex-row basis-3/12 justify-between items-center color-Purple">
                    <li className="nav-item px-3 flex justify-center items-stretch self-stretch border-r">
                        <button className="navbar-toggler align-self-center" type="button"  onClick={showSidebar}>
                            <List size={30} weight="thin" />
                        </button>
                    </li>
                    <li className="nav-item nav-search d-none d-lg-flex">
                        <div className="input-group">
                        <SearchNav/>
                        </div>
                    </li>
                </ul>
                <div className="text-center navbar-brand-wrapper flex items-center justify-start lg:justify-center basis-6/12 px-3">
                    <Logo href="/" />
                </div>
                <ul className="navbar-nav flex flex-row justify-end gap-2 items-center basis-3/12">
                    <UserNav/>
                    {/* <li className="nav-item nav-settings d-none d-lg-flex">
                        <a className="nav-link" href="#">
                            <i className="mdi mdi-dots-horizontal"></i>
                        </a>
                    </li> */}
                    {/* <li className="nav-item nav-toggler-item-right d-lg-none">
                        <button className="navbar-toggler align-self-center" type="button" data-toggle="offcanvas">
                            <List size={24} weight="thin" />
                        </button>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;

{/* // <div className='bg-white py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 shadow'>
        //   <div className='container flex justify-between'>
        //     <Link href='/'>
        //       <House size={32} weight="thin" color="" />
        //     </Link>
        //     {session?.user ? ( */}
{/* //       <UserAccountNav />
        //     ) : (
        //       <Link className={btnVars()} href='/sign-in'>
        //         Sign in
        //       </Link>
        //     )}
        //   </div>
        // </div> */}