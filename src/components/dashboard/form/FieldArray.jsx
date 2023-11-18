
import React, { } from 'react'
import { useFieldArray } from 'react-hook-form';
import { FrmInput, FrmSelect, InputError } from './ui';
import { FormCheck, FormLabel } from 'react-bootstrap';
import { ButtonSub } from '@/components/bs/button';
import { Minus, Plus } from '@phosphor-icons/react/dist/ssr';
import { components } from 'react-select';

const { Option, SingleValue } = components;
const IconOption = props => (
    <Option {...props}>
        <div className="flex gap-3 items-center">
            <i className={"text-lg ph " + props.data.icon}></i> {props.data.label}
        </div>
    </Option>
);

const IconValue = (props) => (
    <SingleValue {...props}>
        <div className="flex gap-3 items-center">
            <i className={"text-lg ph " + props.data.icon}></i> {props.data.label}
        </div>
    </SingleValue>
);

export const FieldArrayBenefits = props => {
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control: props.form.control,
        name: props.name
    });

    return (
        <>
            <ul className="space-y-2">
                <FormLabel>{props.label}<span className="text-danger">&nbsp;*</span></FormLabel>
                {fields.map((item, index) => {
                    return (
                        <li key={item.id} className="flex justify-between items-center gap-4">
                            <div className="w-1/4">
                                <FrmSelect name={`benefits.${index}.benefit`}
                                    control={props.form.control}
                                    selectedValue={props.selectedValue}
                                    options={props.options}
                                    components={{ Option: IconOption, SingleValue: IconValue }} />
                            </div>
                            <div className="grow">
                                <FrmInput name={`benefits.${index}.description`}
                                    type="text"
                                    placeholder="Chi tiết" />
                            </div>
                            <ButtonSub type="button" onClick={() => remove(index)}>
                                <Minus size={20} weight="regular" />
                            </ButtonSub>
                        </li>
                    );
                })}
            </ul>
            <div className="flex justify-end">

                <InputError name={props.name} />
                <ButtonSub
                    type="button"
                    onClick={() => {
                        append({ benefit: undefined, description: "" });
                    }}
                >
                    <Plus size={20} weight="regular" />
                </ButtonSub>
            </div>
        </>
    )
}

export const FieldArrayLocations = props => {
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control: props.form.control,
        name: props.name
    });

    return (
        <>
            <ul className="space-y-2">
                <FormLabel>{props.label}<span className="text-danger">&nbsp;*</span></FormLabel>
                {fields.map((item, index) => {
                    return (
                        <li key={item.id} className="flex justify-between items-center">
                            <div className="w-1/4">
                                <FrmSelect name={`locations.${index}.province`}
                                    control={props.form.control}
                                    selectedValue={props.selectedValue}
                                    options={props.options} />
                            </div>
                            <div className="w-1/4">
                                <FrmInput name={`locations.${index}.name`}
                                    type="text"
                                    placeholder="Tên" />
                            </div>
                            <div className="w-1/4">
                                <FrmInput name={`locations.${index}.adress`}
                                    type="text"
                                    placeholder="Địa chỉ" className="col-span-2" />
                            </div>
                            <FormCheck type="switch" label="Trụ sở" className="min-w-[120px]" {...props.form.register(`locations.${index}.is_branch`)} />
                            <ButtonSub type="button" onClick={() => remove(index)}>
                                <Minus size={20} weight="regular" />
                            </ButtonSub>
                        </li>
                    );
                })}
            </ul>
            <div className="flex justify-end">

                <InputError name={props.name} />
                <ButtonSub
                    type="button"
                    onClick={() => {
                        append({ province: undefined, name: "", address: "", is_branch: false });
                    }}
                >
                    <Plus size={20} weight="regular" />
                </ButtonSub>
            </div>
        </>
    )
}