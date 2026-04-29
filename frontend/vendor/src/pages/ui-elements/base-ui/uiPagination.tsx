import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiPagination = () => {
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
            Paginations
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  <div className="grid grid-cols-12 gap-6 items-baseline">
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          Pre
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          Next
        </Link>
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
          {"\n"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}Pre{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}Next{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default With Icons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-semibold first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          <i className="icon icon-chevron-left" />
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          <i className="icon icon-chevron-right" />
        </Link>
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
          {"\n"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-semibold first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-medium first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default with Active</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          Pre
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-primary text-white hover:bg-primary hover:text-white"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          Next
        </Link>
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
          {"\n"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}Pre{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-primary text-white hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}Next{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default with Active Ghost</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          Pre
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-primary hover:border-primary bg-primary-50 text-primary hover:bg-primary-50 hover:text-primary"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          Next
        </Link>
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
          {"\n"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}Pre{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-primary hover:border-primary bg-primary-50 text-primary
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}Next{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Left Align</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-semibold first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          <i className="icon icon-chevron-left" />
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          <i className="icon icon-chevron-right" />
        </Link>
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
          {"\n"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-semibold first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-medium first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Centre Align</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex justify-center items-center">
        <div className="inline-flex">
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-semibold first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            <i className="icon icon-chevron-left" />
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            01
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            02
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            03
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            <i className="icon icon-chevron-right" />
          </Link>
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
          {"\n"}&lt;div class="flex justify-center items-center"&gt;{"\n"}
          {"\t"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-semibold first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-medium first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Right Align</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex justify-end items-end">
        <div className="inline-flex">
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-semibold first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            <i className="icon icon-chevron-left" />
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            01
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            02
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            03
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex items-center justify-center text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
          >
            <i className="icon icon-chevron-right" />
          </Link>
        </div>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {" "}
          {"\n"}&lt;div class="flex justify-end items-end"&gt;{"\n"}
          {"\t"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-semibold first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex items-center
          justify-center text-xs font-medium first:rounded-s-lg
          last:rounded-e-lg rounded-none border border-border-color bg-light
          text-dark hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Custom Pagination</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex flex-wrap gap-1">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          <i className="icon icon-chevron-left me-1" /> Pre
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color bg-primary text-white hover:bg-primary hover:text-white"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          ...
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          10
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          Next <i className="icon icon-chevron-right ms-1" />
        </Link>
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
          {"\n"}&lt;div class="inline-flex gap-1"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left me-1"&gt;&lt;/i&gt; Pre
          {"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color bg-primary
          text-white hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}...{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}10{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}Next &lt;i class="icon icon-chevron-right ms-1"&gt;&lt;/i&gt;
          {"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Soft Pagination</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex gap-1">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          <i className="icon icon-chevron-left" />
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-primary hover:border-primary bg-primary-50 text-primary hover:bg-primary-50 hover:text-primary"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          ...
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          10
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-lg border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          <i className="icon icon-chevron-right" />
        </Link>
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
          {"\n"}&lt;div class="inline-flex gap-1"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color hover:border-primary
          bg-light text-dark hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-primary hover:border-primary
          bg-primary-50 text-primary hover:bg-primary-50 hover:text-primary"&gt;
          {"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color hover:border-primary
          bg-light text-dark hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color hover:border-primary
          bg-light text-dark hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color hover:border-primary
          bg-light text-dark hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}...{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color hover:border-primary
          bg-light text-dark hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}10{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-lg border border-border-color hover:border-primary
          bg-light text-dark hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Pagination 1</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex flex-wrap gap-1">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-full border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          <i className="icon icon-chevron-left me-1" /> Pre
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 items-center justify-center inline-flex text-xs font-medium rounded-full border border-border-color bg-primary text-white hover:bg-primary hover:text-white"
        >
          01
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 items-center justify-center inline-flex text-xs font-medium rounded-full border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          02
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 items-center justify-center inline-flex text-xs font-medium rounded-full border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          03
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 items-center justify-center inline-flex text-xs font-medium rounded-full border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          ...
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 items-center justify-center inline-flex text-xs font-medium rounded-full border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          10
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium rounded-full border border-border-color bg-light text-dark hover:bg-primary hover:text-white"
        >
          Next <i className="icon icon-chevron-right ms-1" />
        </Link>
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
          {"\n"}&lt;div class="inline-flex gap-1"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-full border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left me-1"&gt;&lt;/i&gt; Pre
          {"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 items-center justify-center
          inline-flex text-xs font-medium rounded-full border
          border-border-color bg-primary text-white hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 items-center justify-center
          inline-flex text-xs font-medium rounded-full border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 items-center justify-center
          inline-flex text-xs font-medium rounded-full border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 items-center justify-center
          inline-flex text-xs font-medium rounded-full border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}...{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 items-center justify-center
          inline-flex text-xs font-medium rounded-full border
          border-border-color bg-light text-dark hover:bg-primary
          hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}10{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-full border border-border-color bg-light text-dark
          hover:bg-primary hover:text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}Next &lt;i class="icon icon-chevron-right ms-1"&gt;&lt;/i&gt;
          {"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Pagination 2</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex gap-1">
        <Link
          to="#"
          className="w-7.5 h-7.5 inline-flex items-center justify-center text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          <i className="icon icon-chevron-left" />
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 inline-flex items-center justify-center text-xs font-medium rounded-full border border-primary hover:border-primary bg-primary-50 text-primary hover:bg-primary-50 hover:text-primary"
        >
          01
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 inline-flex items-center justify-center text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          02
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 inline-flex items-center justify-center text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          03
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 inline-flex items-center justify-center text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          ...
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 inline-flex items-center justify-center text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          10
        </Link>
        <Link
          to="#"
          className="w-7.5 h-7.5 inline-flex items-center justify-center text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          <i className="icon icon-chevron-right" />
        </Link>
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
          {"\n"}&lt;div class="inline-flex gap-1"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 inline-flex items-center
          justify-center text-xs font-medium rounded-full border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 inline-flex items-center
          justify-center text-xs font-medium rounded-full border border-primary
          hover:border-primary bg-primary-50 text-primary hover:bg-primary-50
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 inline-flex items-center
          justify-center text-xs font-medium rounded-full border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 inline-flex items-center
          justify-center text-xs font-medium rounded-full border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 inline-flex items-center
          justify-center text-xs font-medium rounded-full border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}...{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 inline-flex items-center
          justify-center text-xs font-medium rounded-full border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}10{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="w-7.5 h-7.5 inline-flex items-center
          justify-center text-xs font-medium rounded-full border
          border-border-color hover:border-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Pagination 3</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex">
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-b-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          Pre
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color border-b-primary hover:border-b-primary bg-primary-50 text-primary hover:bg-primary-50 hover:text-primary"
        >
          01
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-b-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          02
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-b-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          03
        </Link>
        <Link
          to="#"
          className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border border-border-color hover:border-b-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
        >
          Next
        </Link>
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
          {"\n"}&lt;div class="inline-flex"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-b-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}Pre{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color border-b-primary hover:border-b-primary
          bg-primary-50 text-primary hover:bg-primary-50 hover:text-primary"&gt;
          {"\n"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-b-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-b-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-lg last:rounded-e-lg rounded-none border
          border-border-color hover:border-b-primary bg-light text-dark
          hover:bg-primary-50 hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}Next{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Pagination 4</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content inline-flex flex-wrap gap-1">
        <div>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
          >
            <i className="icon icon-chevrons-left" />
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
          >
            <i className="icon icon-chevron-left" />
          </Link>
        </div>
        <div className="flex">
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-full last:rounded-e-full rounded-none border border-e-0 border-border-color bg-light text-dark  hover:text-primary"
          >
            01
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-full last:rounded-e-full rounded-none border border-e-0 border-s-0 border-border-color bg-light text-primary hover:text-primary"
          >
            02
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-full last:rounded-e-full rounded-none border border-e-0 border-s-0 border-border-color bg-light text-dark hover:text-primary"
          >
            03
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium first:rounded-s-full last:rounded-e-full rounded-none border border-s-0 border-border-color bg-light text-dark  hover:text-primary"
          >
            04
          </Link>
        </div>
        <div>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
          >
            <i className="icon icon-chevron-right" />
          </Link>
          <Link
            to="#"
            className="px-2 py-1.5 inline-flex text-xs font-medium rounded-full border border-border-color hover:border-primary bg-light text-dark hover:bg-primary-50 hover:text-primary"
          >
            <i className="icon icon-chevrons-right" />
          </Link>
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
          {"\n"}&lt;div class="inline-flex gap-1"&gt;{"\n"}
          {"\t"}&lt;div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-full border border-border-color
          hover:border-primary bg-light text-dark hover:bg-primary-50
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevrons-left"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-full border border-border-color
          hover:border-primary bg-light text-dark hover:bg-primary-50
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-left"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-full last:rounded-e-full rounded-none
          border border-e-0 border-border-color bg-light text-dark
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}01{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-full last:rounded-e-full rounded-none
          border border-e-0 border-s-0 border-border-color bg-light text-primary
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}02{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-full last:rounded-e-full rounded-none
          border border-e-0 border-s-0 border-border-color bg-light text-dark
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}03{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium first:rounded-s-full last:rounded-e-full rounded-none
          border border-s-0 border-border-color bg-light text-dark
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}04{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"   "}
          {"\n"}
          {"\t"}&lt;div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-full border border-border-color
          hover:border-primary bg-light text-dark hover:bg-primary-50
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevron-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="px-2 py-1.5 inline-flex text-xs
          font-medium rounded-full border border-border-color
          hover:border-primary bg-light text-dark hover:bg-primary-50
          hover:text-primary"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-chevrons-right"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
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

export default UiPagination