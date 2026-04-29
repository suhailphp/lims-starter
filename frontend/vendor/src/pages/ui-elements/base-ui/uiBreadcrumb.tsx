
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiBreadcrumb = () => {

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
            Breadcrumbs
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-baseline">
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Breadcrumb</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">/</li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Library
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">/</li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Library
            </Link>
          </li>
          <li className="inline-flex items-center">/</li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Data
          </li>
        </ol>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          {"\n"}
          {"\t"}
          <i className="icon icon-copy" />
          {"\n"}
          {"\t"}
          <span>Copy</span>
          {"\n"}
        </button>
        {"\n"}
        {"\n"}
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 mb-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 mb-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-dark"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Library{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Library{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-dark"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Data{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Arrow Style</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-chevrons-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Library
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-chevrons-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Library
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-chevrons-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Data
          </li>
        </ol>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          {"\n"}
          {"\t"}
          <i className="icon icon-copy" />
          {"\n"}
          {"\t"}
          <span>Copy</span>
          {"\n"}
        </button>
        {"\n"}
        {"\n"}
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 mb-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 mb-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevrons-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-dark"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Library{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevrons-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Library{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevrons-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-dark"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Data{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Pipe Style</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Library
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Library
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Data
          </li>
        </ol>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          {"\n"}
          {"\t"}
          <i className="icon icon-copy" />
          {"\n"}
          {"\t"}
          <span>Copy</span>
          {"\n"}
        </button>
        {"\n"}
        {"\n"}
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 mb-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 mb-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-dark"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Library{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-gray-600 hover:text-primary"
          to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Library{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-dark"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Data{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Breadcrumb with Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 mb-3">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Library
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              Library
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Data
          </li>
        </ol>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100   overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2"&gt; {"\n"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Library{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;li class="inline-flex items-center{"  "}font-medium
          text-dark" aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}Data{"\n"}
          {"\t"}&lt;/li&gt;{"\n"}&lt;/ol&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Colored Breadcrumb</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 bg-primary p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li
            className="inline-flex items-center  font-medium text-white"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 bg-info p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li
            className="inline-flex items-center  font-medium text-white"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 bg-dark p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-white dark:text-white!"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center text-white dark:text-white!">
            /
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-white dark:text-white!"
              to="#"
            >
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center text-white dark:text-white!">
            /
          </li>
          <li
            className="inline-flex items-center  font-medium text-white dark:text-white!"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 bg-warning p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li
            className="inline-flex items-center  font-medium text-white"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 bg-success p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li
            className="inline-flex items-center  font-medium text-white"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 bg-danger p-3 rounded-lg">
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li className="inline-flex items-center">
            <Link className="flex items-center  text-white" to="#">
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center text-white">/</li>
          <li
            className="inline-flex items-center  font-medium text-white"
            aria-current="page"
          >
            Application
          </li>
        </ol>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 overflow-hidden">
        {"  "}
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          {"\n"}
          {"    "}
          <i className="icon icon-copy" />
          {"\n"}
          {"    "}
          <span>Copy</span>
          {"\n"}
          {"  "}
        </button>
        {"\n"}
        {"\n"}
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 bg-primary p-3 rounded-lg mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-white"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 bg-info p-3 rounded-lg mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-white"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 bg-dark p-3 rounded-lg mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-white"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 bg-warning p-3 rounded-lg mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-white"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 bg-success p-3 rounded-lg mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-white"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\n"}
          {"\t"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 bg-danger p-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center text-white" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center
          text-white"&gt;/&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center font-medium text-white"
          aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Breadcrumb</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 border border-primary bg-primary-50 p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 border border-info bg-info-50 p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 border border-dark bg-gray-50 p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 border border-warning bg-warning-50 p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 border border-success bg-success-50 p-3 rounded-lg mb-4">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Application
          </li>
        </ol>
        <ol className="flex flex-wrap items-center whitespace-nowrap gap-2 border border-danger bg-danger-50 p-3 rounded-lg">
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              <i className="icon icon-house me-2" /> Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center  text-gray-600 hover:text-primary"
              to="#"
            >
              App Center
            </Link>
          </li>
          <li className="inline-flex items-center">
            <i className="icon icon-arrow-right" />
          </li>
          <li
            className="inline-flex items-center  font-medium text-dark"
            aria-current="page"
          >
            Application
          </li>
        </ol>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100   overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div&gt; {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 border border-primary bg-primary-50 p-3 rounded-lg mb-4"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center{"  "}font-medium
          text-dark" aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"  "}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 border border-info bg-info-50 p-3 rounded-lg mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center{"  "}font-medium
          text-dark" aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"  "}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 border border-dark bg-gray-50 p-3 rounded-lg mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center{"  "}font-medium
          text-dark" aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 border border-warning bg-warning-50 p-3 rounded-lg mb-4"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center{"  "}font-medium
          text-dark" aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"  "}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 border border-success bg-success-50 p-3 rounded-lg mb-4"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center{"  "}font-medium
          text-dark" aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt;{"   "}
          {"\n"}
          {"\t"}&lt;ol class="flex flex-wrap items-center whitespace-nowrap
          gap-2 border border-danger bg-danger-50 p-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-house me-2"&gt;&lt;/i&gt; Home{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="flex items-center{"  "}text-gray-600
          hover:text-primary" to="#"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}App Center {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-arrow-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;li class="inline-flex items-center{"  "}font-medium
          text-dark" aria-current="page"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Application{"\n"}
          {"\t"}
          {"\t"}&lt;/li&gt;{"\n"}
          {"\t"}&lt;/ol&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
  </div>
  {/* End grid */}
</div>

  )
}

export default UiBreadcrumb