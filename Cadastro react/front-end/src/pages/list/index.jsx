import api from "../../services/api";
import { useEffect, useState } from "react";

function ListarUsuarios() {
  const [allUsers, setAllUsers] = useState([]); // Correção: inicializar como array vazio

  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/listar-usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data); // Verifique a estrutura antes de acessar

        setAllUsers(response.data.users || []); // Certifique-se de definir um array vazio caso users não exista

      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }

    loadUser();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de Usuários</h2>
      <ul className="space-y-2">
        {allUsers?.length > 0 ? (
          allUsers.map((user) => (
            <li key={user.id} className="bg-yellow-100 p-4 rounded-md">
              <p className="font-semibold">ID: {user.id}</p>
              <p className="font-semibold">Nome: {user.name}</p>
              <p className="font-semibold">Email: {user.email}</p>
            </li>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p> // Melhor feedback caso a lista esteja vazia
        )}
      </ul>
    </div>
  );
}

export default ListarUsuarios;
