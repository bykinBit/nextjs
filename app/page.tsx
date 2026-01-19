import { dashboardService } from "@/services";

export default async function Home() {
  const stats = await dashboardService.getStats();

  return (
    <div className="py-12 px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">系统概览</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">总用户数</p>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">{stats?.totalUsers || 0}</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">活跃用户</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats?.activeUsers || 0}</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">今日新增</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats?.newUsersToday || 0}</p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">后端迁移完成 🚀</h2>
        <p className="text-blue-700 dark:text-blue-400 text-sm leading-relaxed">
          原本托管在 5000 端口的后台服务现已完整迁移至本项目内部（Next.js API Routes）。
          所有数据已通过内存数据库实现同步，请求地址已变更为本项目本地路径。
        </p>
      </div>
    </div>
  );
}
