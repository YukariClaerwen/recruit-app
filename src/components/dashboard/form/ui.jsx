// const { FormGroup, FormLabel, FormControl } = require("react-bootstrap")
import { useFormContext, useController, Controller } from 'react-hook-form';
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { filterProps, motion } from "framer-motion";
import { FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import Select from 'react-select'
import { KeyboardEventHandler } from 'react';

import CreatableSelect from 'react-select/creatable';
import { NumericFormat } from 'react-number-format';

export const FrmInput = ({ children, name, label, placeholder, frmText, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmText={frmText}>
            <InputControl name={name} placeholder={placeholder} {...props} />
            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}

export const FrmFormatNumber = ({ children, name, label, placeholder, frmText, control, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmText={frmText}>
            <FormatNumber name={name} control={control} numberType={numberType.currency} {...props} />
            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}
export const FrmSelect = ({ children, name, label, control, selectedValue, options, frmText, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmText={frmText}>
            <SelectControl name={name} control={control} selectedValue={selectedValue} options={options}  {...props} />
            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}
export const FrmCreate = ({ children, name, label, control, selectedValue, frmText, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmText={frmText}>
            <SelectTable name={name} control={control} defaultValue={selectedValue} {...props} />
            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}

const FormGroupInput = ({ children, name, label, frmText, ...props }) => {
    return (
        <FormGroup className="mb-3 w-full" controlId={name} {...props}>
            {label ?
                <FormLabel>{label}<span className="text-danger">&nbsp;*</span></FormLabel> : <></>
            }
            {children}
            <FormText className="text-right w-full block">{frmText}</FormText>
        </FormGroup>
    )
}

const SelectTable = ({ control, name, defaultValue, ...props }) => {
    return (
        <Controller control={control}
            name={name}
            defaultValue={defaultValue}
            render={({
                field: { onChange, value, name, ref },
            }) => (
                <CreatableSelect inputRef={ref}
                    components={{ DropdownIndicator: null }}
                    isClearable
                    isMulti
                    onChange={(newValue) => onChange(newValue)}
                    placeholder="Type something and press enter..."
                    value={value}
                    {...props}
                />
            )}>

        </Controller>
    )
}

const SelectControl = ({ name, control, selectedValue, options, ...props }) => {
    return (
        <Controller control={control}
            name={name}
            defaultValue={selectedValue}
            render={({
                field: { onChange, value, name, ref },
            }) => (
                <Select inputRef={ref}
                    classNamePrefix="addl-class"
                    options={options}
                    value={value}
                    onChange={val => onChange(val)}
                    placeholder={"Chọn..."}
                    {...props}
                />
            )}>
        </Controller>
    )
}

const InputControl = ({ name, placeholder, ...props }) => {
    const { field } = useController({ name: name })

    return (
        <FormControl
            autoComplete="off"
            placeholder={placeholder}
            {...field}
            {...props}
        ></FormControl>
    )
}
const InputError = ({ name }) => {
    const { formState: { errors } } = useFormContext();
    return (
        <>
            {errors[name] &&
                <motion.div className="error mt-2 flex justify-end" {...framer_error}>
                    <p className="text-danger bg-white/75 rounded-md py-1.5 px-2.5 font-bold text-sm inline-block">
                        <span><WarningCircle className="inline-block align-top" size="20" />
                        </span> {errors[name].message}
                    </p>
                </motion.div>}
        </>
    )
}

export const FormatNumber = ({ name, control, numberType, ...props }) => {
    return (
        <Controller control={control}
            name={name}
            render={({
                field: { onChange, value, name, ref },
            }) => (
                <NumericFormat
                    type="input"
                    name={name}
                    onChange={onChange}
                    customInput={FormControl}
                    defaultValue={value}
                    {...numberType}
                    {...props} />
                // <Select inputRef={ref}
                //     classNamePrefix="addl-class"
                //     options={options}
                //     value={value}
                //     onChange={val => onChange(val)}
                //     placeholder={"Chọn..."}
                //     {...props}
                // />
            )}>
        </Controller>
    )
}

const numberType = {
    currency: {
        thousandsGroupStyle: "thousand",
        thousandSeparator: ".",
        decimalSeparator: ","
    }
}

const framer_error = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.5 }
}