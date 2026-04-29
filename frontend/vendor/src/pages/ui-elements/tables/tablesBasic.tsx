import { useEffect } from 'react'
import ImageWithBasePath from '../../../components/image-with-base-path';
import { Images } from '../../../utils/imagePath';
import { Link } from 'react-router-dom';
import { Path } from '../../../routes/path';

const TablesBasic = () => {
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
            Basic Tables
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-12 gap-6">
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Basic Example</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto">
        <table className="table-auto mb-0 w-full">
          <thead className="border border-border-color">
            <tr>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Firstname
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start">Email</th>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="border border-border-color">
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_18}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Mary</span>
              </td>
              <td className="px-4 py-3 text-start">john@example.com</td>
              <td className="px-4 py-3 text-start">
                <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  Active
                </span>
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_10}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Moe</span>
              </td>
              <td className="px-4 py-3 text-start">mary@example.com</td>
              <td className="px-4 py-3 text-start">
                <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  Active
                </span>
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_03}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Dooley</span>
              </td>
              <td className="px-4 py-3 text-start">july@example.com</td>
              <td className="px-4 py-3 text-start">
                <span className="badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
                  Inactive
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="overflow-auto"&gt;{"\n"}
          {"\t"}&lt;table class="table-auto mb-0 w-full"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;thead class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Firstname&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Email&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Status&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/thead&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;tbody class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_18} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Mary&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;john@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-success-50 text-success border
          border-success"&gt;Active&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_10} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Moe&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;mary@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-success-50 text-success border
          border-success"&gt;Active&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_03} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Dooley&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;july@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-danger-50 text-danger border
          border-danger"&gt;Inactive&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/tbody&gt;{"\n"}
          {"\t"}&lt;/table&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dark Table</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto">
        <table className="table-auto mb-0 w-full">
          <thead className="border border-border-color">
            <tr className="bg-dark text-white dark:text-white!">
              <th className="px-4 py-2 text-start">Firstname</th>
              <th className="px-4 py-2 text-start">Email</th>
              <th className="px-4 py-2 text-start">Action</th>
            </tr>
          </thead>
          <tbody className="border border-border-color">
            <tr className="border-b border-border-color bg-dark text-white dark:text-white!">
              <td className="inline-flex  w-full items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_18}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-white dark:text-white!">Mary</span>
              </td>
              <td className="px-4 py-3 text-start">john@example.com</td>
              <td className="px-4 py-3 text-start">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-border-color bg-dark text-white">
              <td className="inline-flex items-center w-full gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_10}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-white dark:text-white!">Moe</span>
              </td>
              <td className="px-4 py-3 text-white dark:text-white!">
                mary@example.com
              </td>
              <td className="px-4 py-3 text-white">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-border-color bg-dark text-white">
              <td className="inline-flex items-center w-full gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_03}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-white dark:text-white!">Dooley</span>
              </td>
              <td className="px-4 py-3 text-white dark:text-white!">
                july@example.com
              </td>
              <td className="px-4 py-3 text-white">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="overflow-auto"&gt;{"\n"}
          {"\t"}&lt;table class="table-auto mb-0 w-full"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;thead class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="bg-dark text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 text-start"&gt;Firstname&lt;/th&gt;{" "}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 text-start"&gt;Email&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 text-start"&gt;Action&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/thead&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;tbody class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color bg-dark
          text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex{"  "}w-full items-center gap-2 px-4
          py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_18} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-white"&gt;Mary&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;john@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer size-8 rounded-full inline-flex items-center
          justify-center text-sm font-normal border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-ellipsis-vertical"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color rounded-lg mt-2 z-1" role="menu"
          aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-eye text-gray-900 me-2"&gt;&lt;/i&gt;View
          Details{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-pencil-line me-2"&gt;&lt;/i&gt;Edit{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-trash-2 text-gray-900
          me-2"&gt;&lt;/i&gt;Delete{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color bg-dark
          text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center w-full gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_10} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-white"&gt;Moe&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-white"&gt;mary@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer size-8 rounded-full inline-flex items-center
          justify-center text-sm font-normal border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-ellipsis-vertical"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color rounded-lg mt-2 z-1" role="menu"
          aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-eye text-gray-900 me-2"&gt;&lt;/i&gt;View
          Details{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-pencil-line me-2"&gt;&lt;/i&gt;Edit{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-trash-2 text-gray-900
          me-2"&gt;&lt;/i&gt;Delete{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color bg-dark
          text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center w-full gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_03} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-white"&gt;Dooley&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-white"&gt;july@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer size-8 rounded-full inline-flex items-center
          justify-center text-sm font-normal border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-ellipsis-vertical"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color rounded-lg mt-2 z-1" role="menu"
          aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-eye text-gray-900 me-2"&gt;&lt;/i&gt;View
          Details{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-pencil-line me-2"&gt;&lt;/i&gt;Edit{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          focus:bg-white hover:bg-primary-50" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-trash-2 text-gray-900
          me-2"&gt;&lt;/i&gt;Delete{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/tbody&gt;{"\n"}
          {"\t"}&lt;/table&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Bordered Table</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto">
        <table className="table-auto mb-0 w-full">
          <thead className="border border-border-color">
            <tr>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Firstname
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start">Email</th>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border border-border-color">
            <tr className="border border-border-color">
              <td className="border border-border-color px-4 py-3 text-start">
                John
              </td>
              <td className="border border-border-color px-4 py-3 text-start">
                john@example.com
              </td>
              <td className="border border-border-color px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:text-dark"
                >
                  View
                </button>
              </td>
            </tr>
            <tr className="border border-border-color">
              <td className="border border-border-color px-4 py-3 text-start">
                Mary
              </td>
              <td className="border border-border-color px-4 py-3 text-start">
                mary@example.com
              </td>
              <td className="border border-border-color px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:text-dark"
                >
                  View
                </button>
              </td>
            </tr>
            <tr className="border border-border-color">
              <td className="border border-border-color px-4 py-3 text-start">
                July
              </td>
              <td className="border border-border-color px-4 py-3 text-start">
                july@example.com
              </td>
              <td className="border border-border-color px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:text-dark"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="overflow-auto"&gt;{"\n"}
          {"\t"}&lt;table class="table-auto mb-0 w-full"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;thead class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Firstname&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Email&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Action&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/thead&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;tbody class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;John&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;john@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small bg-light border
          border-border-color text-dark text-center hover:bg-light-800
          hover:text-dark"&gt;View&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;Mary&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;mary@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small bg-light border
          border-border-color text-dark text-center hover:bg-light-800
          hover:text-dark"&gt;View&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;July&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;july@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="border border-border-color px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small bg-light border
          border-border-color text-dark text-center hover:bg-light-800
          hover:text-dark"&gt;View&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/tbody&gt;{"\n"}
          {"\t"}&lt;/table&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Striped Rows</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto">
        <table className="table-auto mb-0 w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Firstname
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Lastname
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-light">
              <td className="px-4 py-3 text-start">John</td>
              <td className="px-4 py-3 text-start">john@example.com</td>
              <td className="px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center gap-1.5 cursor-pointer bg-success border border-success text-white text-center hover:bg-success-800 hover:text-white"
                >
                  <i className="icon icon-download" />
                  Success
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-start">Mary</td>
              <td className="px-4 py-3 text-start">mary@example.com</td>
              <td className="px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center gap-1.5 cursor-pointer bg-success border border-success text-white text-center hover:bg-success-800 hover:text-white"
                >
                  <i className="icon icon-download" />
                  Success
                </button>
              </td>
            </tr>
            <tr className="bg-light">
              <td className="px-4 py-3 text-start">July</td>
              <td className="px-4 py-3 text-start">july@example.com</td>
              <td className="px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center gap-1.5 cursor-pointer bg-success border border-success text-white text-center hover:bg-success-800 hover:text-white"
                >
                  <i className="icon icon-download" />
                  Success
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="overflow-auto"&gt;{"\n"}
          {"\t"}&lt;table class="table-auto mb-0 w-full"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;thead&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Firstname&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Lastname&lt;/th&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Action&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/thead&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;tbody&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="bg-light"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;John&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;john@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center gap-1.5 cursor-pointer bg-success border border-success
          text-white text-center hover:bg-success-800 hover:text-white"&gt;&lt;i
          class="icon icon-download"&gt;&lt;/i&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr&gt;{"    "}
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;Mary&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;mary@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center gap-1.5 cursor-pointer bg-success border border-success
          text-white text-center hover:bg-success-800 hover:text-white"&gt;&lt;i
          class="icon icon-download"&gt;&lt;/i&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr{"  "}class="bg-light"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;July&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;july@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center gap-1.5 cursor-pointer bg-success border border-success
          text-white text-center hover:bg-success-800 hover:text-white"&gt;&lt;i
          class="icon icon-download"&gt;&lt;/i&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/tbody&gt;{"\n"}
          {"\t"}&lt;/table&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Actions Tables</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto">
        <table className="table-auto mb-0 w-full">
          <thead className="border border-border-color">
            <tr>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Firstname
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start">Email</th>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border border-border-color">
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_18}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Mary</span>
              </td>
              <td className="px-4 py-3 text-start">john@example.com</td>
              <td className="px-4 py-3 text-start flex gap-2">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-primary-100 border border-primary text-primary text-center hover:bg-primary-200 rounded-full"
                >
                  <i className="icon icon-square-pen" />
                </button>
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-success-100 border border-success text-success text-center hover:bg-success-200 rounded-full"
                >
                  <i className="icon icon-download" />
                </button>
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-danger-100 border border-danger text-danger text-center hover:bg-danger-200 rounded-full"
                >
                  <i className="icon icon-trash-2" />
                </button>
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_10}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Moe</span>
              </td>
              <td className="px-4 py-3 text-start">mary@example.com</td>
              <td className="px-4 py-3 text-start flex gap-2">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-primary-100 border border-primary text-primary text-center hover:bg-primary-200 rounded-full"
                >
                  <i className="icon icon-square-pen" />
                </button>
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-success-100 border border-success text-success text-center hover:bg-success-200 rounded-full"
                >
                  <i className="icon icon-download" />
                </button>
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-danger-100 border border-danger text-danger text-center hover:bg-danger-200 rounded-full"
                >
                  <i className="icon icon-trash-2" />
                </button>
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_03}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Dooley</span>
              </td>
              <td className="px-4 py-3 text-start">july@example.com</td>
              <td className="px-4 py-3 text-start flex gap-2">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-primary-100 border border-primary text-primary text-center hover:bg-primary-200 rounded-full"
                >
                  <i className="icon icon-square-pen" />
                </button>
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-success-100 border border-success text-success text-center hover:bg-success-200 rounded-full"
                >
                  <i className="icon icon-download" />
                </button>
                <button
                  type="button"
                  className="btn-small flex items-center justify-center bg-danger-100 border border-danger text-danger text-center hover:bg-danger-200 rounded-full"
                >
                  <i className="icon icon-trash-2" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="overflow-auto"&gt;{"\n"}
          {"\t"}&lt;table class="table-auto mb-0 w-full"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;thead class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Firstname&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Email&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Action&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/thead&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;tbody class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_18} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Mary&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;john@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start flex gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-primary-100 border border-primary text-primary
          text-center hover:bg-primary-200 rounded-full"&gt;&lt;i class="icon
          icon-square-pen"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-success-100 border border-success text-success
          text-center hover:bg-success-200 rounded-full"&gt;&lt;i class="icon
          icon-download"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-danger-100 border border-danger text-danger
          text-center hover:bg-danger-200 rounded-full"&gt;&lt;i class="icon
          icon-trash-2"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_10} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Moe&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;mary@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start flex gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-primary-100 border border-primary text-primary
          text-center hover:bg-primary-200 rounded-full"&gt;&lt;i class="icon
          icon-square-pen"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-success-100 border border-success text-success
          text-center hover:bg-success-200 rounded-full"&gt;&lt;i class="icon
          icon-download"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-danger-100 border border-danger text-danger
          text-center hover:bg-danger-200 rounded-full"&gt;&lt;i class="icon
          icon-trash-2"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_03} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Dooley&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;july@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start flex gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-primary-100 border border-primary text-primary
          text-center hover:bg-primary-200 rounded-full"&gt;&lt;i class="icon
          icon-square-pen"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-success-100 border border-success text-success
          text-center hover:bg-success-200 rounded-full"&gt;&lt;i class="icon
          icon-download"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center bg-danger-100 border border-danger text-danger
          text-center hover:bg-danger-200 rounded-full"&gt;&lt;i class="icon
          icon-trash-2"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/tbody&gt;{"\n"}
          {"\t"}&lt;/table&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Button Tables</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto">
        <table className="table-auto mb-0 w-full">
          <thead className="border border-border-color">
            <tr>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Firstname
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start">Email</th>
              <th className="px-4 py-2 bg-light text-dark text-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border border-border-color">
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_18}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Mary</span>
              </td>
              <td className="px-4 py-3 text-start">john@example.com</td>
              <td className="px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center gap-1.5 cursor-pointer bg-danger border border-danger text-white text-center hover:bg-danger-800 hover:text-white"
                >
                  <i className="icon icon-trash-2" />
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_10}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Moe</span>
              </td>
              <td className="px-4 py-3 text-start">mary@example.com</td>
              <td className="px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center gap-1.5 cursor-pointer bg-danger border border-danger text-white text-center hover:bg-danger-800 hover:text-white"
                >
                  <i className="icon icon-trash-2" />
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="inline-flex items-center gap-2 px-4 py-3 text-start">
                <span className="relative flex shrink-0">
                  <ImageWithBasePath
                    className="w-8 h-8 border border-border-color rounded-full"
                    src={Images.avatar_03}
                    alt="avatar"
                  />
                  <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
                </span>
                <span className="text-dark">Dooley</span>
              </td>
              <td className="px-4 py-3 text-start">july@example.com</td>
              <td className="px-4 py-3 text-start">
                <button
                  type="button"
                  className="btn-small flex items-center justify-center gap-1.5 cursor-pointer bg-danger border border-danger text-white text-center hover:bg-danger-800 hover:text-white"
                >
                  <i className="icon icon-trash-2" />
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="overflow-auto"&gt;{"\n"}
          {"\t"}&lt;table class="table-auto mb-0 w-full"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;thead class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Firstname&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Email&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;th class="px-4 py-2 bg-light text-dark
          text-start"&gt;Action&lt;/th&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/thead&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;tbody class="border border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_18} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Mary&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;john@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center gap-1.5 cursor-pointer bg-danger border border-danger
          text-white text-center hover:bg-danger-800 hover:text-white"&gt;&lt;i
          class="icon icon-trash-2"&gt;&lt;/i&gt;Delete&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_10} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Moe&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;mary@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center gap-1.5 cursor-pointer bg-danger border border-danger
          text-white text-center hover:bg-danger-800 hover:text-white"&gt;&lt;i
          class="icon icon-trash-2"&gt;&lt;/i&gt;Delete&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;tr class="border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="inline-flex items-center gap-2 px-4 py-3
          text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="relative flex shrink-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_03} alt="avatar"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success
          border border-white rounded-full"&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="text-dark"&gt;Dooley&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3
          text-start"&gt;july@example.com&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;td class="px-4 py-3 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-small flex items-center
          justify-center gap-1.5 cursor-pointer bg-danger border border-danger
          text-white text-center hover:bg-danger-800 hover:text-white"&gt;&lt;i
          class="icon icon-trash-2"&gt;&lt;/i&gt;Delete&lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/td&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/tr&gt; {"\n"}
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

export default TablesBasic