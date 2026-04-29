import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { useEffect } from "react";

const Permission = () => {
  useEffect(() => {
  // Select All
  const masterSelectAll = document.getElementById("select-all") as HTMLInputElement | null;

  const handleSelectAll = function (this: HTMLInputElement) {
    const checked = this.checked;

    document
      .querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
      .forEach((cb) => {
        cb.checked = checked;
      });
  };

  if (masterSelectAll) {
    masterSelectAll.addEventListener("change", handleSelectAll);
  }

  // Row Master
  const rowMasters = document.querySelectorAll<HTMLInputElement>(".row-master");

  const handleRowMaster = function (this: HTMLInputElement) {
    const tr = this.closest("tr");
    if (!tr) return;

    tr.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((cb) => {
      if (cb !== this) cb.checked = this.checked;
    });
  };

  rowMasters.forEach((master) => {
    master.addEventListener("change", handleRowMaster);
  });

  // ✅ Cleanup (VERY IMPORTANT in React)
  return () => {
    if (masterSelectAll) {
      masterSelectAll.removeEventListener("change", handleSelectAll);
    }

    rowMasters.forEach((master) => {
      master.removeEventListener("change", handleRowMaster);
    });
  };
}, []);
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
        <div className="my-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to={Path.dashboard}
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  <i className="icon icon-house" />
                  Home
                </Link>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li>
                <Link
                  to={Path.userRoles}
                  className="text-gray-600 hover:text-primary"
                >
                  User &amp; Roles
                </Link>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li aria-current="page" className="text-gray-900">
                Permissions
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn bg-primary border border-primary text-white text-center flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="add-user"
            data-hs-overlay="#add-user"
          >
            <i className="icon-plus" /> New User
          </button>
        </div>
      </div>
      {/*End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1">
        <div className="bg-white rounded-md border border-border-color">
          <div className="px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <h5 className="text-[17.5px]">Role : Admin</h5>
            <div className="flex flex-wrap items-center gap-3">
              <div className="input-group flex items-center gap-2 leading-none">
                <input
                  type="checkbox"
                  className="shrink-0 border-border-color rounded-sm text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 checked:border-0 disabled:opacity-50 disabled:pointer-events-none"
                  id="select-all"
                />
                <label htmlFor="select-all" className="mb-0 cursor-pointer">
                  Select All
                </label>
              </div>
              <div id="tablesearch" />
            </div>
          </div>
          <div>
            <table className="datatable w-full">
              <thead className="border-b border-t border-border-color">
                <tr>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Modules
                  </th>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Allow All
                  </th>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Read
                  </th>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Write
                  </th>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Create
                  </th>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Delete
                  </th>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Import
                  </th>
                  <th className="px-4 py-2 bg-light text-dark text-start">
                    Export
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Users</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Agents</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Generators</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Prompts</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Analytics</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Audit Trails</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">API Keys</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Tenants</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0  focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Billings</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
                <tr className="border-b border-border-color">
                  <td className="px-4 py-3 text-start">Settings</td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0 row-master"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="grid grid-cols-12 px-4 gap-2 py-3">
              <div className="sm:col-span-4 col-span-12">
                <div id="tablelength" className="flex justify-center sm:block">
                  <div className="dt-length">
                    <label htmlFor="dt-length-0">
                      Show{" "}
                      <select
                        aria-controls="DataTables_Table_0"
                        className="dt-input"
                        id="dt-length-0"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={-1}>All</option>
                      </select>{" "}
                      Entries
                    </label>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 col-span-12 flex items-center justify-center">
                <div id="tablepage" className="flex justify-center sm:block">
                  <div className="dt-paging">
                    <nav aria-label="pagination">
                      <button
                        className="dt-paging-button disabled first"
                        role="link"
                        type="button"
                        aria-controls="DataTables_Table_0"
                        aria-disabled="true"
                        aria-label="First"
                        data-dt-idx="first"
                        tabIndex={-1}
                      >
                        «
                      </button>
                      <button
                        className="dt-paging-button disabled previous"
                        role="link"
                        type="button"
                        aria-controls="DataTables_Table_0"
                        aria-disabled="true"
                        aria-label="Previous"
                        data-dt-idx="previous"
                        tabIndex={-1}
                      >
                        <i className="icon icon-chevron-left" />
                      </button>
                      <button
                        className="dt-paging-button current"
                        role="link"
                        type="button"
                        aria-controls="DataTables_Table_0"
                        aria-current="page"
                        data-dt-idx={0}
                      >
                        1
                      </button>
                      <button
                        className="dt-paging-button disabled next"
                        role="link"
                        type="button"
                        aria-controls="DataTables_Table_0"
                        aria-disabled="true"
                        aria-label="Next"
                        data-dt-idx="next"
                        tabIndex={-1}
                      >
                        <i className="icon icon-chevron-right" />
                      </button>
                      <button
                        className="dt-paging-button disabled last"
                        role="link"
                        type="button"
                        aria-controls="DataTables_Table_0"
                        aria-disabled="true"
                        aria-label="Last"
                        data-dt-idx="last"
                        tabIndex={-1}
                      >
                        »
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 col-span-12 flex items-center sm:justify-end justify-center">
                <div id="tableinfo" className="flex justify-center sm:block">
                  <div
                    className="dt-info"
                    aria-live="polite"
                    id="DataTables_Table_0_info"
                    role="status"
                  >
                    1 - 10 Entries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End grid */}
    </div>
  );
};

export default Permission;
