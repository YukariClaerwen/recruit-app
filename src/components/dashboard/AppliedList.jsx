import { Table } from "react-bootstrap"
import Dcard from "../client/ui/card"
import { CloudArrowDown, Link as LinkIcon, UserCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";


const AppliedList = (props) => {
    const data = props.data;
    const job = props.job;
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    
    return (
        <Dcard title="Danh sách ứng tuyển" des={`${data.length} đơn ứng tuyển`}>
            <div className="space-y-4">
            <Link
                href={`/jobs/${job.id}?title=${job.title}`}
                className="color-Purple underline flex justify-start items-center gap-2"
            ><LinkIcon size={20} weight="thin" /> {job.title}</Link>
            <Table striped hover className="align-middle">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày ứng tuyển</th>
                        <th>Cv</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((u, index) =>
                        <tr id={`user-/${index}`} key={index}>
                            <td className="flex justify-center">
                                {u.image != null ? <Image src={u.image} alt={u.email} width={30} height={30} className="rounded-full"></Image> : <UserCircle size={32} weight="thin" />}
                            </td>
                            <td>{u.name ? u.name : u.username}</td>
                            <td>{u.email}</td>
                            <td>{(new Date(u.created_at)).toLocaleDateString('en-GB', options)}</td>
                            <td>
                                <Link href={u.cv}
                                    className="color-Purple underline flex justify-start items-center gap-2">
                                    <CloudArrowDown size={20} weight="thin" />
                                    Cv
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </Dcard>
    )
}

export default AppliedList