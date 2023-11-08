import SignInForm from '@/components/form/SignInForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextResponse } from "next/server"

const page = async () => {
    const session = await getServerSession(authOptions);
    const role = await session?.user.role;
    // console.log(session)

    if (session?.user && role == 'user') {
        return redirect("/denied")
    }

    if (session?.user && (role == 'admin' || role == 'consultant')) {
        return redirect("/admin")
    }

    return (
        <div className='w-full'>
            <SignInForm />
        </div>
    );
};

export default page;