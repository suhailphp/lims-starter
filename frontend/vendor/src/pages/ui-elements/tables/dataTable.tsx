import { useEffect, useMemo } from 'react'
import CommonDataTable from '../../../components/data-table/dataTable';
import { DataTablesData } from '../../../utils/json/dataTablesData';
import { Link } from 'react-router-dom';
import { Path } from '../../../routes/path';

const DataTable = () => {
    useEffect(() => {
          const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
        
            // Toggle Code / Preview
            const btn = target.closest('[data-toggle="code"]');
            if (btn) {
              const card = btn.closest(".preview-card");
              const preview = card?.querySelector(".preview-content");
              const code = card?.querySelector(".code");
              const text = btn.querySelector(".code-btn");
        
              if (preview && code && text) {
                preview.classList.toggle("hidden");
                code.classList.toggle("hidden");
        
                text.textContent =
                  text.textContent?.trim() === "Show Code"
                    ? "Show Preview"
                    : "Show Code";
              }
            }
        
            // Copy Code
            const copyBtn = target.closest("[data-copy]");
            if (copyBtn) {
              const code = copyBtn.closest("pre")?.querySelector("code");
        
              if (code) {
                navigator.clipboard.writeText(code.innerText).then(() => {
                  const span = copyBtn.querySelector("span");
                  if (!span) return;
        
                  const oldText = span.textContent;
                  span.textContent = "Copied!";
                  setTimeout(() => {
                    span.textContent = oldText || "Copy";
                  }, 1500);
                });
              }
            }
          };
        
          document.addEventListener("click", handleClick);
        
          return () => {
            document.removeEventListener("click", handleClick);
          };
        }, []);
    const data = DataTablesData;
    const columns = useMemo(() => ([
      {
        header: "Name",
        field: "Name",
        
      },
      {
        header: "Position",
        field: "Position",
      },
      {
        header: "Office",
        field: "Office",
      },
      {
        header: "Age",
        field: "Age",
      },
      {
        header: "Start date",
        field: "Start_date",
      },
      {
        header: "Salary",
        field: "Salary",
      },
    ]), []);


    const mappedColumns = useMemo(() => (
      columns.map((col: any, idx: number) => ({
        ...col,
        ID: idx.toString(),
        key: (col as any).dataIndex || idx.toString(),
      }))
    ), [columns]);
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
          <li aria-current="page" className="text-gray-900">
            Data Table
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1">
    <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Data Table</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto custom-data-tables">
          <CommonDataTable
            title="Data List"
            data={data}
            columns={mappedColumns}
            rows={10}
          />
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[400px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="overflow-auto"&gt;{"\n"}
          {"\t"}&lt;table class="datatable border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;thead class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Name&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Position&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Office&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Age&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark text-start"&gt;Start
          date&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Salary&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/thead&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;tbody&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Tiger Nixon&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;System
          Architect&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Edinburgh&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;61&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2011 Apr 25&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$320,800&lt;/td&gt;{"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Garrett
          Winters&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Accountant&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Tokyo&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;63&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2011 Jul 25&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$170,750&lt;/td&gt;{"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Ashton Cox&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Junior Technical
          Author&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;San Francisco&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;66&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2009 Jan 12&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$86,000&lt;/td&gt;{"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Cedric Kelly&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Senior Javascript
          Developer&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Senior Javascript
          Developer&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;22&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2012 Mar 29&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$433,060&lt;/td&gt;{"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\t"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Airi Satou&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Accountant&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Tokyo&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;33&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2008 Nov 28&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$162,700&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Brielle
          Williamson&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Integration
          Specialist&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;New York&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;61&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2012 Dec 02&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$372,000&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Herrod
          Chandler&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Sales
          Assistant&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;San Francisco&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;59&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2012 Aug 06&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$137,500&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Rhona Davidson&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Integration
          Specialist&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Tokyo&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;55&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2010 Oct 14&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$327,900&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Colleen Hurst&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Javascript
          Developer&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;San Francisco&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;39&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;2009 Sep 15&lt;/td&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;$205,500&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/tbody&gt;{"\n"}
          {"\t"}&lt;/table&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default DataTable