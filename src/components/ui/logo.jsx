
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const logoVars = cva(
    "font-logo text-decoration-none",
    {
        variants: {
            variant: {
                default: "big-purple-logo",
                yellow: "big-yellow-logo",
                title: "main-title"
            },
            size: {
                default: "text-3xl lg:text-4xl",
                lg: "text-2xl lg:text-3xl",
                md: "text-xl lg:text-2xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Logo = ({ className, variant, size, href, ...props }) => {
    return (
        <Link {...props} href={href} className={cn(logoVars({ variant, size, className }))}>
            Ketnoi
            <span>Vieclam</span>
        </Link>
    )
};

export default Logo;
export { logoVars };