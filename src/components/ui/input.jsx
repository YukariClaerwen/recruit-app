
import { cn } from "@/lib/utils"
// import { findInputError, isFormInvalid } from './form';
import { useFormContext, useController } from 'react-hook-form';
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";

export function InputFloating({ label, type, name, id, placeholder }) {
    return (
        <>
            <div className="form-floating mb-4">
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className="border border-3 border-white border-opacity-10 bg-dark bg-opacity-25 rounded-pill text-white"
                />
                <label htmlFor={id}>{label}</label>
                <InputError name={name} />
            </div>
        </>
    )
}
export function InputNormal({ label, type, name, id, placeholder }) {
    return (
        <>
            <div className="mb-4">
                <label htmlFor={id}>{label}</label>
                    <Input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        className="border border-3 border-white border-opacity-10 bg-dark bg-opacity-25 rounded-pill text-white"
                    />
                    <InputError name={name} />
            </div>
        </>
    )
}
export const InputError = ({ name }) => {
    const { formState: { errors } } = useFormContext();
    return (
        <>
            {errors[name] && <motion.div className="error mt-2 flex justify-end" {...framer_error}><p className="text-danger bg-white/75 rounded-md py-1.5 px-2.5 font-bold text-sm inline-block"><span><WarningCircle className="inline-block align-top" size="20" /></span> {errors[name].message}</p></motion.div>}
        </>
    )
}

const Input = ({ className, name, ...props }) => {
    const { field } = useController({ name: name });
    return (
        <input
            autoComplete="off"
            className={cn(
                "form-control w-full ",
                className
            )}
            {...field}
            {...props} />
    )
};


const framer_error = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.5 }
}