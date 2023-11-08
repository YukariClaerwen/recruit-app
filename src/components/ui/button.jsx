
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils'

import { Slot } from "@radix-ui/react-slot"

const btnVars = cva(
    "btn hover:bg-[#FFBB58] hover:text-[#222222]",
    {
        variants: {
            variant: {
                default: "",
                rounded: "rounded-full",
                link: "text-white"
            },
            size: {
                default: "px-5",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                logolg: "lg:text-3xl",
                icon: "h-10 w-10",
            },
            color: {
                default: "bgcolor-Purple color-White",
                white: "bgcolor-White color-Black",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            color: "default"
        }
    }
)

// const Button = ({ onClick, className, variant, size, asChild = false, ...props }) => {

//     return (
//         <button
//             {...props}
//             className={cn(btnVars({variant, size, className}))}
//         />
//     );
// };

const Button = (
    ({ className, variant, size, color, asChild = false, ...props }) => {
      const Comp = asChild ? Slot : "button"
      return (
        <Comp
          className={cn(btnVars({ variant, size, color, className }))}
        //   ref={ref}
          {...props}
        />
      )
    }
  )

export default Button;

export { btnVars };