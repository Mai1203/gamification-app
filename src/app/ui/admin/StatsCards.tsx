interface StatsCardsProps {
  stats: {
    totalUsers: number;
    totalAdmins: number;
    activeToday: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total de Usuarios</h3>
        <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
      </div>
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Administradores</h3>
        <p className="text-3xl font-bold text-purple-600">{stats.totalAdmins}</p>
      </div>
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activos hoy</h3>
        <p className="text-3xl font-bold text-green-600">{stats.activeToday}</p>
      </div>
    </div>
  );
}