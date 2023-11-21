
import { signIn } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast"
import Button from './ui/button';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

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

const GoogleSignInButton = ({ children }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true)

    const signInData = await signIn('google', {
      callbackUrl: '/?login=success'
      // redirect: false,
    })

    if (signInData?.error) {
      setLoading(false)
      toast({
        title: "Lỗi!",
        description: "Có lỗi xảy ra, không thể đăng nhập bằng google.",
        variant: 'destructive',
      })

    } 
  }

  return (
    <Button type="button" onClick={loginWithGoogle} className='w-full' variant="rounded" color="white" disabled={(loading) ? true : false}>
      {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : <></>}
      {children}
    </Button>
  );
};

export default GoogleSignInButton;