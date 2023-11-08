
"use client";
import Dcard from "../client/ui/card";
import { Accordion, AccordionButton, AccordionHeader, AccordionItem, Badge, Button, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, SSRProvider, Table } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import React, { useState } from "react";
import Dialog from "../dialog";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addOneFieldYup } from "@/lib/inputValidation";
import { InputError, InputNormal } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { PencilSimple, Trash } from "@phosphor-icons/react";


const schema = addOneFieldYup.schema;

const MajorList = ({ data, ...props }) => {
    const majorGroup = data;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [label, setLabel] = useState("");
    const [readonly, setReadonly] = useState(false)

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            inputField: ""
        }
    })

    const handleShow = (e) => {
        e.stopPropagation();
    }

    const links = (
        <>
            <Link
                onClick={handleShow}
                className="rounded-full round-btn round-btn-border ml-5 btn btn-primary"
                as={`${pathname}?showDialog=y&group=new&action=addMajorGroup`}
                href={{
                    pathname: `${pathname}?showDialog=y`
                }}
                scroll={false} >
                Thêm nhóm mới
            </Link>
        </>
    )

    const onClose = () => {
        router.push(pathname, { scroll: false }, { shallow: true });
        form.resetField("inputField");
    }
    const onOk = () => { }

    const onShow = () => {
        if (searchParams.get('action') === "addMajorGroup") {
            setReadonly(false);
            setLabel("Tên nhóm");
            setTitle("Thêm nhóm mới");
        } else if (searchParams.get('action') === "editMajor") {
            setReadonly(false);
            setLabel("Tên ngành nghề");
            setTitle(searchParams.get('title'));
            form.setValue("inputField", searchParams.get('value'));
        } else if (searchParams.get('action') === "deleteMajor") {
            setReadonly(true);
            setLabel("Xóa ngành");
            setTitle(searchParams.get('title'));
            form.setValue("inputField", searchParams.get('value'));
        } else {
            setLabel("Tên ngành nghề");
            setReadonly(false);
            setTitle(searchParams.get('title'));
        }
    }
    const onSubmit = async (value) => {
        let res
        if (!searchParams.get('action').includes("edit")
            && !searchParams.get('action').includes("delete")) {
            res = await fetch('/api/dashboard/job/major', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    frmInput: await value.inputField,
                    frmGroup: searchParams.get('group')
                })
            })
        } else {
            res = await fetch('/api/dashboard/job/major', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    frmInput: await value.inputField,
                    original: searchParams.get('id'),
                    action: searchParams.get('action')
                })
            })
        }
        if (res.ok) {
            const resData = await res.json()
            toast({
                description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />
            })
        } else {
            const err = await res.json();
            toast({
                description: <p dangerouslySetInnerHTML={{ __html: err.message }} />,
                variant: 'destructive',
            })
        }
    }

    return (
        <Dcard title="Ngành nghề" des={`${majorGroup.length} nhóm ngành chính`} toplinks={links}>

            <Accordion>
                {majorGroup.map((mg, index) =>
                    <AccordionItem key={mg.id} eventKey={`group_${index}`}>
                        <AccordionButton as="div" className="gap-3">
                            <div className="flex justify-between items-center w-full">
                                {mg.ten_nhom}
                                <div className="flex justify-between items-center gap-2">
                                    <Link
                                        onClick={handleShow}
                                        as={`${pathname}?showDialog=y&title=${mg.ten_nhom}&group=${mg.id}&action=addMajor`}
                                        href={{
                                            pathname: `${pathname}?showDialog=y`
                                        }}
                                        scroll={false}
                                        shallow={true}><Badge bg="secondary">+</Badge></Link>
                                </div>
                            </div>
                        </AccordionButton>
                        <AccordionBody>
                            <ListGroup>
                                <MajorItems item={mg} pathname={pathname} />
                            </ListGroup>
                        </AccordionBody>
                    </AccordionItem>

                )}
            </Accordion>
            <Dialog title={title} onClose={onClose} onOk={onOk} onShow={onShow} onSave={onSubmit} form={form} >
                <FormGroup className="mb-3" controlId="frmJobTitle">
                    <FormLabel>{label}<span className="text-danger">&nbsp;*</span></FormLabel>
                    <FormControl type="text" placeholder="Nhập tên" {...form.register("inputField")} readOnly={readonly} ></FormControl>
                    <InputError name="inputField" />
                </FormGroup>
                {/* <InputNormal label={label} type="text" name="inputField" id="fieldMajor" /> */}
            </Dialog>
        </Dcard>
    )
}

export default MajorList

const MajorItems = ({ item, pathname, ...props }) => {

    return (
        <>
            {
                item.ds_nganh_nghe.map(m =>
                    <ListGroupItem key={m.id} id={`major_${m.id}`} {...props} className="flex justify-between items-center">
                        <span>{m.ten_nganh}</span>
                        <div className="flex gap-2">
                            <Link
                                as={`${pathname}?showDialog=y&title=${item.ten_nhom}&group=${item.id}&action=deleteMajor&id=${m.id}&value=${m.ten_nganh}`}
                                href={{
                                    pathname: `${pathname}?showDialog=y`
                                }}
                                scroll={false}
                                shallow={true}
                            >
                                <Badge bg="secondary" as={Button} className="border-0"><Trash size={14} weight="thin" /></Badge>
                            </Link>
                            <Link
                                as={`${pathname}?showDialog=y&title=${item.ten_nhom}&group=${item.id}&action=editMajor&id=${m.id}&value=${m.ten_nganh}`}
                                href={{
                                    pathname: `${pathname}?showDialog=y`
                                }}
                                scroll={false}
                                shallow={true}
                            >
                                <Badge bg="secondary" as={Button} className="border-0"><PencilSimple size={14} weight="thin" /></Badge>
                            </Link>
                            <Badge bg="secondary">{m._count.ds_viec_lam} việc làm</Badge>
                        </div>
                    </ListGroupItem>
                )
            }
        </>
    )
}

