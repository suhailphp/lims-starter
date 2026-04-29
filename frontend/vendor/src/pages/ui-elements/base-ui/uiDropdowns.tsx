import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiDropdowns = () => {
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
            Dropdowns
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
        <h5>Basic Dropdown</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content text-center">
        <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
          <button
            type="button"
            className="hs-dropdown-toggle cursor-pointer py-1.75 px-4 inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            Dropdown
            <i className="icon-chevron-down" />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Action
              </Link>
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Another Action
              </Link>
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Other Action
              </Link>
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Seperate Action
              </Link>
            </div>
          </div>
        </div>
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
          {" "}
          {"\n"}&lt;div class="text-center"&gt;{"\n"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer py-1.75 px-2 inline-flex items-center gap-x-2 text-sm
          font-normal rounded-lg border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Dropdown&lt;i class="icon-chevron-down"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color shadow rounded-lg mt-2 z-1"
          role="menu" aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Another Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Other Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Seperate Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dropdown with Divider</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content text-center">
        <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
          <button
            type="button"
            className="hs-dropdown-toggle cursor-pointer py-1.75 px-4 inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            Dropdown
            <i className="icon-chevron-down" />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 divide-y divide-border-color"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Action
              </Link>
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Another Action
              </Link>
            </div>
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Action
              </Link>
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Another Action
              </Link>
            </div>
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Action
              </Link>
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Another Action
              </Link>
            </div>
          </div>
        </div>
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
          {" "}
          {"\n"}&lt;div class="text-center"&gt;{"\n"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer py-1.75 px-2 inline-flex items-center gap-x-2 text-sm
          font-normal rounded-lg border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Dropdown&lt;i class="icon-chevron-down"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color shadow rounded-lg mt-2 z-1
          divide-y divide-border-color" role="menu"
          aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Another Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Another Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Another Action{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dropdown with Icons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content text-center">
        <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
          <button
            type="button"
            className="hs-dropdown-toggle cursor-pointer py-1.75 px-4 inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            Dropdown
            <i className="icon-chevron-down" />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
          </div>
        </div>
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
          {" "}
          {"\n"}&lt;div class="text-center"&gt;{"\n"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer py-1.75 px-2 inline-flex items-center gap-x-2 text-sm
          font-normal rounded-lg border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Dropdown&lt;i class="icon-chevron-down"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color shadow rounded-lg mt-2 z-1"
          role="menu" aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-eye text-gray-900 me-2"&gt;&lt;/i&gt;View
          Details{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center hover:bg-primary-50{"  "}px-4
          py-1.75 rounded-lg text-sm text-default hover:bg-light
          hover:text-primary focus:outline-hidden focus:bg-white" to="#"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-pencil-line me-2"&gt;&lt;/i&gt;Edit{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center hover:bg-primary-50{"  "}px-4
          py-1.75 rounded-lg text-sm text-default hover:bg-light
          hover:text-primary focus:outline-hidden focus:bg-white" to="#"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-trash-2 text-gray-900
          me-2"&gt;&lt;/i&gt;Delete{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dropdown with Icons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content text-center">
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
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
          </div>
        </div>
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
          {" "}
          {"\n"}&lt;div class="text-center"&gt;{"\n"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer size-8 rounded-full inline-flex items-center
          justify-center text-sm font-normal border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-ellipsis-vertical"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color shadow rounded-lg mt-2 z-1"
          role="menu" aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-eye text-gray-900 me-2"&gt;&lt;/i&gt;View
          Details{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center hover:bg-primary-50{"  "}px-4
          py-1.75 rounded-lg text-sm text-default hover:bg-light
          hover:text-primary focus:outline-hidden focus:bg-white" to="#"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-pencil-line me-2"&gt;&lt;/i&gt;Edit{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center hover:bg-primary-50{"  "}px-4
          py-1.75 rounded-lg text-sm text-default hover:bg-light
          hover:text-primary focus:outline-hidden focus:bg-white" to="#"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-trash-2 text-gray-900
          me-2"&gt;&lt;/i&gt;Delete{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dropdown with Simple Header</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content text-center">
        <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
          <button
            type="button"
            className="hs-dropdown-toggle cursor-pointer py-1.75 px-4 inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            Dropdown
            <i className="icon-chevron-down" />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 divide-y divide-border-color"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-3 px-6 text-start">
              <p className="mb-1">Signed as</p>
              <p className="font-semibold text-gray-900">admin@example.com</p>
            </div>
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Profile
              </Link>
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Settings
              </Link>
            </div>
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
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
          {" "}
          {"\n"}&lt;div class="text-center"&gt;{"\n"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer py-1.75 px-2 inline-flex items-center gap-x-2 text-sm
          font-normal rounded-lg border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Dropdown&lt;i class="icon-chevron-down"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color shadow rounded-lg mt-2 z-1
          divide-y divide-border-color" role="menu"
          aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="py-3 px-6 text-start"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;p class="mb-1"&gt;Signed as&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;p class="font-semibold
          text-gray-900"&gt;admin@example.com&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Profile{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Settings{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg text-sm
          text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Sign out{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dropdown with Icons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content text-center">
        <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
          <button
            type="button"
            className="hs-dropdown-toggle cursor-pointer py-1.75 px-4 inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            Dropdown
            <i className="icon-chevron-down" />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                to="#"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
          </div>
        </div>
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
          {" "}
          {"\n"}&lt;div class="text-center"&gt;{"\n"}
          {"\t"}&lt;div class="hs-dropdown [--placement:bottom-right]
          [--auto-close:inside] relative inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="hs-dropdown-toggle
          cursor-pointer py-1.75 px-2 inline-flex items-center gap-x-2 text-sm
          font-normal rounded-lg border border-border-color bg-white
          text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Dropdown&lt;i class="icon-chevron-down"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="hs-dropdown-menu transition-[opacity,margin]
          duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50
          bg-white border border-border-color shadow rounded-lg mt-2 z-1"
          role="menu" aria-orientation="vertical"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-2 space-y-1"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center px-4 py-1.75 rounded-lg
          text-default hover:bg-light hover:text-primary focus:outline-hidden
          hover:bg-primary-50 focus:bg-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-eye text-gray-900 me-2"&gt;&lt;/i&gt;View
          Details{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center hover:bg-primary-50{"  "}px-4
          py-1.75 rounded-lg text-sm text-default hover:bg-light
          hover:text-primary focus:outline-hidden focus:bg-white" to="#"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-pencil-line me-2"&gt;&lt;/i&gt;Edit{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center hover:bg-primary-50{"  "}px-4
          py-1.75 rounded-lg text-sm text-default hover:bg-light
          hover:text-primary focus:outline-hidden focus:bg-white" to="#"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-trash-2 text-gray-900
          me-2"&gt;&lt;/i&gt;Delete{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>{" "}
  {/* end grid */}
</div>

  )
}

export default UiDropdowns