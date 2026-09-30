import { createColumnHelper } from "@tanstack/react-table";
import Table from "../components/Table";
import type { CommandHistory } from "../utils/types";
import { useCommandHistory } from "../hooks/useCommandHistory";
import { useState } from "react";

const columnHelper = createColumnHelper<CommandHistory>();

const columns = [
  columnHelper.accessor("id", { header: "id" }),
  columnHelper.accessor("command_id", { header: "command_id" }),
  columnHelper.accessor("status", { header: "status" }),
  columnHelper.accessor("params", { header: "params" }),
  columnHelper.accessor("created_at", { header: "created_at" }),
];

/**
 * @brief CommandHistory component displaying the audit log table
 * @return tsx element of CommandHistory component
 */
function CommandHistoryPage() {
  const [value, setValue] = useState("");

  const { data, isLoading, isError } = useCommandHistory(value);

  let content;
  if (isLoading) content = <p>Loading...</p>;
  else if (isError) content = <p>Error</p>;
  else if (data) content = <Table data={data} columns={columns} />;
  else content = <p> Enter a command ID to view its audit log. </p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Audit Log</h1>
      <input
        placeholder={"Enter a command ID!"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {content}
    </div>
  );
}

export default CommandHistoryPage;
