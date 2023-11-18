// const { FormGroup, FormLabel, FormControl } = require("react-bootstrap")
import { useFormContext, useController, Controller } from 'react-hook-form';
import { Check, SealWarning, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { filterProps, motion } from "framer-motion";
import { Button, FormControl, FormGroup, FormLabel, FormText, InputGroup, Spinner } from 'react-bootstrap';
import Select from 'react-select'
import { KeyboardEventHandler } from 'react';

import CreatableSelect from 'react-select/creatable';
import { NumericFormat } from 'react-number-format';

export const FrmInput = ({ children, name, label, placeholder, frmtext, inputGroup = false, btnText, onClick, variant, loading = false, err = undefined, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmtext={frmtext} className={props.className}>
            {inputGroup ? (
                <InputGroup className="mb-3">
                    <InputControl name={name} placeholder={placeholder}  {...props} />
                    <Button variant={variant} onClick={onClick} type='button' disabled={(loading) ? true : false}>
                        <div className='flex gap-2 justify-end items-center'>
                            {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : <></>}
                            {err ? <SealWarning size={20} weight="regular" />
                                : err == false ? <Check size={20} weight="regular" /> : <></>}
                            {btnText}
                        </div>
                    </Button>
                </InputGroup>
            ) : <InputControl name={name} placeholder={placeholder} {...props} />}

            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}

export const FrmFormatNumber = ({ children, name, label, placeholder, frmtext, control, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmtext={frmtext}>
            <FormatNumber name={name} control={control} numberType={numberType.currency} {...props} />
            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}
export const FrmSelect = ({ children, name, label, control, selectedValue, options, frmtext, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmtext={frmtext} className={props.className}>
            <SelectControl name={name} control={control} selectedValue={selectedValue} options={options}  {...props} />
            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}
export const FrmCreate = ({ children, name, label, control, selectedValue, frmtext, ...props }) => {
    return (
        <FormGroupInput name={name} label={label} frmtext={frmtext}>
            <SelectTable name={name} control={control} defaultValue={selectedValue} {...props} />
            <InputError name={name} />
            {children}
        </FormGroupInput>
    )
}

const FormGroupInput = (props) => {
    return (
        <FormGroup className={`${props.className}`} {...props}>
            {props.label ?
                <FormLabel>{props.label}<span className="text-danger">&nbsp;*</span></FormLabel> : <></>
            }
            {props.children}
            <FormText className="text-right block">{props.frmtext}</FormText>
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

const SelectControl = (props) => {
    return (
        <Controller control={props.control}
            name={props.name}
            defaultValue={props.selectedValue}
            render={({
                field: { onChange, value, name, ref },
            }) => (
                <Select inputRef={ref}
                    classNamePrefix="addl-class"
                    options={props.options}
                    value={value}
                    onChange={val => onChange(val)}
                    placeholder={"Chọn..."}
                    instanceId={name}
                    components={props.components}
                    {...props}
                />
            )}>
        </Controller>
    )
}

const InputControl = (props) => {
    const { field } = useController({ name: props.name })

    return (
        <FormControl
            autoComplete="off"
            placeholder={props.placeholder}
            {...field}
            {...props}
        ></FormControl>
    )
}
export const InputError = (props) => {
    const { formState: { errors } } = useFormContext();
    return (
        <>
            {errors[props.name] &&
                <motion.div className="error mt-2 flex justify-end" {...framer_error}>
                    <p className="text-danger bg-white/75 rounded-md py-1.5 px-2.5 font-bold text-sm inline-block">
                        <span><WarningCircle className="inline-block align-top" size="20" />
                        </span> {errors[props.name].message ? errors[props.name].message : "Vui lòng nhập đủ thông tin"}
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