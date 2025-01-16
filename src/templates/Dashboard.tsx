// putt your code here

import { tokenManagerInstance } from "@/const/TokenManagment";

export default function Dashboard() {
  const user = tokenManagerInstance.getUser();
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg">User: {JSON.stringify(user)}</p>
      <p className="text-lg">Id: {user?.id}</p>
      <p className="text-lg">Username: {user?.username}</p>
      <p className="text-lg">Wilaya: {user?.wilaya}</p>
      <p className="text-lg">Commune: {user?.commune}</p>
        <p className="text-lg">Organization: {user?.name}</p>
      </div>
    </div>
  );
}

