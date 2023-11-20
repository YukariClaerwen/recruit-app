
import { getUser } from "@/app/api/user/user";
import UserList from "@/components/dashboard/UserList";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {
    const session = await getServerSession(authOptions);

    const data = await getUser();
    const users = await data.users;

    if (session?.user) {
        return (
            <UserList data={users} />

        )
    }

    return (
        <h2>Please login to see this admin page</h2>
    )
};

export default page;