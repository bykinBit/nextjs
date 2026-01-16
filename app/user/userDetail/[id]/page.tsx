import dynamic from 'next/dynamic';
import Link from "next/link";
import { userService } from "@/services";
import Loading from './loading';

// 懒加载用户详情内容组件
const UserDetailContent = dynamic(() => import('./UserDetailContent'), {
    loading: () => <Loading />,
    ssr: true,
});

export default async function UserDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await userService.getById(parseInt(id));

    if (!user) {
        return (
            <div className="py-16 text-center">
                <h1 className="text-2xl font-bold text-red-500">用户不存在</h1>
                <Link href="/user/userlist" className="mt-4 inline-block text-blue-500 hover:underline">
                    返回用户列表
                </Link>
            </div>
        );
    }

    return <UserDetailContent user={user} />;
}
