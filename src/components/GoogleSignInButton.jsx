
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
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

const GoogleSignInButton = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const loginWithGoogle = async () => {

    const signInData = await signIn('google', {
      // callbackUrl: 'http://localhost:3000/'
      redirect: false,
    })

    if (signInData?.error) {
      toast({
        title: "Lỗi!",
        description: "Có lỗi xảy ra, không thể đăng nhập bằng google.",
        variant: 'destructive',
      })
    } else {
      router.refresh();
      router.push('/');
    }
  }

  return (
    <Button type="button" onClick={loginWithGoogle} className='w-full' variant="rounded" color="white">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;