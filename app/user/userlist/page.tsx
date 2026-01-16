import { userService } from "@/services";
import UserListClient from "./UserListClient";

export default async function UserList() {
    const users = await userService.getAll();

    return <UserListClient initialUsers={users} />;
}
