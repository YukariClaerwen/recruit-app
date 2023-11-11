import Logo from '@/components/ui/logo';

const AuthLayout = ({ children }) => {
    let mainClass = "min-h-screen flex flex-col justify-center items-center text-white gap-5 bgCover";
    return (
        <main className={mainClass} style={{ paddingTop: '70px' }}>
            <div className='p-10 min-w-min max-w-full w-screen md:w-2/3 lg:w-1/3'>
                <div className="mb-4 text-center">
                    <Logo href="/" variant="yellow" />
                </div>
                {children}
            </div>

        </main>
    )
};

export default AuthLayout;