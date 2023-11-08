
import { getUser, getCandidates, countUsers } from "@/app/api/user/user"
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";
import Table from 'react-bootstrap/Table';
import Dcard from "../client/ui/card";

const UserList = async () => {
    const data = await getUser();
    const users = data.users;

    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    
    const links = (
        <>
           <Link href="/admin/users/post" className="rounded-full round-btn round-btn-border ml-5 btn btn-primary">Thêm người dùng</Link>
        </>
    )

    return (
        <Dcard title="Người dùng" des={`${users.length} tài khoản`} toplinks={links}>
            <Table striped hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày đăng ký</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u =>
                        <tr id={`user-/${u.id}`} key={u.id}>
                            <td className="flex justify-center">
                                {u.avatar != null ? <Image src={u.avatar} width={30}></Image> : <UserCircle size={32} weight="thin" />}
                            </td>
                            <td>{u.ten_tai_khoan}</td>
                            <td>{u.email}</td>
                            <td>{(new Date(u.created_at)).toLocaleDateString('en-GB', options)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Dcard>
    )
}

export default UserList