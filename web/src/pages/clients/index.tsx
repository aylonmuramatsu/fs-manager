import { useState, useEffect } from "react";
import { Table } from "@components/Table";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllClientsUseCase } from "@application/clients/get-all-clients.use-case";
import moment from "moment";
import { mask } from "remask";
import { deleteClientUseCase } from "@application/clients/delete-client.use-case";

export const ClientPage = () => {
  //#region Variables & Configurations
  const navigate = useNavigate();
  const [clients, setClients] = useState<any>([]);
  const columns = {
    id: { header: "#", width: "150px" },
    name: { header: "Nome" },
    birthdate: {
      header: "Data Nascimento",
      content: (row: any) =>
        row.getValue("birthdate") &&
        moment(row.getValue("birthdate"), "YYYY-MM-DD").format("DD/MM/YYYY"),
    },
    cpf: {
      header: "CPF",
      content: (row: any) => mask(row.getValue("cpf"), "999.999.999-99"),
    },
    rg: {
      header: "RG",
      content: (row: any) => mask(row.getValue("rg"), "99.999.999-9"),
    },
    phone: {
      header: "Telefone",
      content: (row: any) =>
        mask(
          row.getValue("phone"),
          row.getValue("phone").length > 10
            ? "(99) 9 9999-9999"
            : "(99) 9999-9999"
        ),
    },
    actions: {
      header: "Ação",
      width: "120px",
      content: (context: any) => (
        <>
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={() => {
              handleEdit(context.table.getRow(context.row.id).original.id);
            }}
          >
            <FaEdit />
          </button>{" "}
          &nbsp;
          <button
            className="btn btn-sm bg-red-500 hover:bg-red-800 text-white"
            onClick={() =>
              handleDelete(context.table.getRow(context.row.id).original.id)
            }
          >
            <FaTrash />
          </button>
        </>
      ),
    },
  };
  //#endregion

  //#region Methods
  const handleRefresh = () => loadClients();
  const handleAddClient = () => navigate("create");
  const handleEdit = (clientId: number) => navigate(`${clientId}`);
  const handleDelete = async (clientId: number) => {
    await deleteClientUseCase({ clientId });
    await loadClients();
  };
  const loadClients = async () => {
    const data = await getAllClientsUseCase();
    setClients(data);
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    loadClients();
  }, []);
  //#endregion
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-md breadcrumbs">
          <ul>
            <li className=" text-zinc-400">
              <a href="javascript:;">Home</a>
            </li>
            <li className=" text-zinc-400 font-semibold">
              <a href="javascript:;">Clientes</a>
            </li>
          </ul>
        </div>
        <div className="inline-flex flex-shrink-0 space-x-3">
          <button
            className="btn btn-sm btn-secondary"
            onClick={handleRefresh}
            type="button"
          >
            Atualizar
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleAddClient}
            type="button"
          >
            <div className="inline-flex items-center">
              Adicionar Cliente &nbsp;
              <FaPlus />
            </div>
          </button>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-2 mt-4">
        <Table data={clients} columns={columns} />
      </div>
    </div>
  );
};
