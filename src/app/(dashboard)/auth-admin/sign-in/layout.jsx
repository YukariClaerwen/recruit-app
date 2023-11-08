import Logo from '@/components/ui/Logo';

const AuthLayout = ({ children }) => {
    return (
        <div className='p-10 min-w-min max-w-full w-screen md:w-2/3 lg:w-1/3'>
            <div className="mb-4 text-center">
                <Logo href="/" variant="yellow" />
            </div>
            {children}
        </div>
    )
};

export default AuthLayout;