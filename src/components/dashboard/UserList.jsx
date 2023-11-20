'use client';
import { PencilSimple, UserCircle, UserCircleGear, UserSwitch } from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";
import Table from 'react-bootstrap/Table';
import Dcard from "../client/ui/card";
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectOneFieldYup } from "@/lib/inputValidation";
import Dialog from "../dialog";
import { InputError } from "../ui/input";
import { useForm } from "react-hook-form";
import { FrmSelect } from "./form/ui";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
// import { PencilSimple } from "@phosphor-icons/react";



const schema = selectOneFieldYup.schema;

const UserList = (props) => {
    const users = props.data
    // console.log(users)
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [title, setTitle] = useState("");
    const [selectedRole, setSelectedRole] = useState(undefined)
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const dialogRef = useRef(null, searchParams);

    const { toast } = useToast();
    // console.log(props)
    // const data = await getUser();
    // const users = data.users;

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            selectField: {}
        }
    })


    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

    const roles = [
        { value: 'user', label: 'user' },
        { value: 'recruiter', label: 'recruiter' },
        { value: 'consultant', label: 'consultant' },
        { value: 'admin', label: 'admin' },
    ]

    const links = (
        <>
            <div>
                <Dropdown className=" px-3 flex justify-center items-stretch self-stretch px-3 py-2 border bgcolor-LightGray">
                    <DropdownToggle as="a" id="dropdown-profile" href="#" className="nav-link flex flex-row items-center gap-2">
                        <span className="nav-profile-name">Thêm người dùng</span>
                    </DropdownToggle>

                    <DropdownMenu className="dropdown-menu-right navbar-dropdown" align="end">
                        <DropdownItem href="/admin/users/recruiter/post" className="flex items-center flex-row gap-2 justify-start">
                            <UserCircleGear size={20} weight="thin" />
                            Thêm nhà tuyển dụng
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            {/* <Link href="/admin/users/post" className="rounded-full round-btn round-btn-border ml-5 btn btn-primary">Thêm người dùng</Link> */}
        </>
    )

    const onShow = () => {
        setTitle("Cập nhật vai trò người dùng")

        form.setValue("selectField", {
            value: searchParams.get('value'),
            label: searchParams.get('value'),
        });
    }
    const onOk = () => { }

    const onSubmit = async (value) => {
        setLoading(true)
        const res = await fetch('/api/dashboard/user/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectField: await value.selectField,
                id: searchParams.get('id'),
                _email: session?.user.email
            })
        })

        if (res.ok) {
            const resData = await res.json()
            toast({
                description: <p dangerouslySetInnerHTML={{ __html: await resData.message }} />,
                variant: 'success',
            })
            setLoading(false);
            onClose();

        } else {
            const err = await res.json();
            toast({
                description: <p dangerouslySetInnerHTML={{ __html: err.message }} />,
                variant: 'destructive',
            })
            setLoading(false);
        }
    }
    const onClose = () => {
        router.push(pathname, { scroll: false }, { shallow: true });
        form.resetField("selectField");
    }

    return (
        <Dcard title="Người dùng" des={`${users.length} tài khoản`} toplinks={links}>
            <Table striped hover className="align-middle">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày đăng ký</th>
                        <th>Tài khoản đăng nhập</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u =>
                        <tr id={`user-/${u.id}`} key={u.id}>
                            <td className="flex justify-center">
                                {u.image != null ? <Image src={u.image} alt={u.email} width={30} height={30} className="rounded-full"></Image> : <UserCircle size={32} weight="thin" />}
                            </td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{(new Date(u.created_at)).toLocaleDateString('en-GB', options)}</td>
                            <td>
                                <ProviderList user={u} />
                            </td>
                            <td>{u.role}</td>
                            <td>
                                <Link
                                    as={`${pathname}?showDialog=y&title=${u.username}&action=editRole&id=${u.id}&value=${u.role}`}
                                    href={{
                                        pathname: `${pathname}?showDialog=y`
                                    }}
                                    scroll={false}
                                    shallow={true}
                                    title="Edit role"
                                >
                                    <Badge bg="secondary" as={Button} className="border-0">
                                        <UserSwitch size={20} weight="thin" />
                                    </Badge>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Dialog title={title} onClose={onClose} onOk={onOk} onShow={onShow} onSave={onSubmit} form={form} loading={loading} >
                <FrmSelect name="selectField"
                    label="Role"
                    control={form.control}
                    selectedValue={selectedRole}
                    options={roles} />
                {/* <FormGroup className="mb-3" controlId="frmJobTitle">
                    <FormLabel>{label}<span className="text-danger">&nbsp;*</span></FormLabel>
                    <FormControl type="text" placeholder="Nhập tên" {...form.register("inputField")} ></FormControl>
                    <InputError name="inputField" />
                </FormGroup> */}
                {/* <InputNormal label={label} type="text" name="inputField" id="fieldMajor" /> */}
            </Dialog>
        </Dcard>
    )
}

export default UserList


const ProviderList = ({ user }) => {
    // console.log(user)
    return (
        <>
            {
                user.Account.map((_a, index) => <span key={index}>{_a.provider}</span>)
            }
        </>
    )
}