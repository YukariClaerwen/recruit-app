
import Button from './ui/button';

// const GoogleSignInButton = ({ children }) => {
//   return (
//       <div className='p-10 min-w-min max-w-full w-screen md:w-2/3 lg:w-1/3'>
//           <div className="mb-4 text-center">
//               {/* <Logo href="/" variant="yellow" /> */}
//           </div>
//           {children}
//       </div>
//   )
// };

// export default GoogleSignInButton;

const GoogleSignInButton = ({children}) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGoogle} className='w-full' variant="rounded" color="white">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;