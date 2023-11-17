import { getUser } from "@/app/api/user/user";
import UserList from "@/components/dashboard/UserList"

const page = async () => {
  
  const data = await getUser();
  const users = await data.users;

  return (
    <div className="container pt-5">
      <UserList data={users} />
    </div>
  )
}

export default page