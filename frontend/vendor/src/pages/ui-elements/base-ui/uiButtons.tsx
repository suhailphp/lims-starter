import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiButtons = () => {
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
              className="inline-flex items-center gap-1 text-gray-500 hover:text-primary"
            >
              <i className="icon icon-house" /> Home
            </Link>
          </li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className="text-gray-900">
            Buttons
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6">
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Primary Buttons Sizes</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-end flex-wrap gap-12">
        <button
          type="button"
          className="btn-sm bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          Button
        </button>
        <button
          type="button"
          className="btn bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          Button
        </button>
        <button
          type="button"
          className="btn-lg bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          Button
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-12"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn-sm bg-primary border
          border-primary text-white text-center hover:bg-primary-800
          hover:border-primary-800 hover:text-white"&gt;Button&lt;/button&gt;
          {"\n"}
          {"\t"}&lt;button type="button" class="btn bg-primary border
          border-primary text-white text-center hover:bg-primary-800
          hover:border-primary-800 hover:text-white"&gt;Button&lt;/button&gt;
          {"\n"}
          {"\t"}&lt;button type="button" class="btn-lg bg-primary border
          border-primary text-white text-center hover:bg-primary-800
          hover:border-primary-800 hover:text-white"&gt;Button&lt;/button&gt;{" "}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Circular Buttons Sizes</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-end gap-12">
        <button
          type="button"
          className="w-7.5 h-7.5 flex justify-center items-center bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white rounded-full cursor-pointer"
        >
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="w-8.75 h-8.75 flex justify-center items-center bg-primary border border-primary text-white text-lg text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white rounded-full cursor-pointer"
        >
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="w-11 h-11 flex justify-center items-center bg-primary border border-primary text-white  text-xl text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white rounded-full cursor-pointer"
        >
          <i className="icon icon-chevron-right" />
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-12"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="w-7.5 h-7.5 flex justify-center
          items-center bg-primary border border-primary text-white text-center
          hover:bg-primary-800 hover:border-primary-800 hover:text-white
          rounded-full cursor-pointer"&gt;&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="w-8.75 h-8.75 flex
          justify-center items-center bg-primary border border-primary
          text-white text-center text-lg hover:bg-primary-800
          hover:border-primary-800 hover:text-white rounded-full
          cursor-pointer"&gt;&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="w-11 h-11 flex justify-center
          items-center bg-primary border border-primary text-white text-center
          text-xl hover:bg-primary-800 hover:border-primary-800 hover:text-white
          rounded-full cursor-pointer"&gt;&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt; {"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
  </div>
  {/* Start grid */}
  <div className="grid grid-cols-1 gap-6">
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Buttons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          Primary
        </button>
        <button
          type="button"
          className="btn bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white dark:text-white! dark:hover:text-dark!"
        >
          Dark
        </button>
        <button
          type="button"
          className="btn bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:border-light-800 hover:text-dark"
        >
          Light
        </button>
        <button
          type="button"
          className="btn bg-info border border-info text-white text-center hover:bg-info-800 hover:border-info-800 hover:text-white"
        >
          Info
        </button>
        <button
          type="button"
          className="btn bg-warning border border-warning text-white text-center hover:bg-warning-800 hover:border-warning-800 hover:text-white"
        >
          Warning
        </button>
        <button
          type="button"
          className="btn bg-success border border-success text-white text-center hover:bg-success-800 hover:border-success-800 hover:text-white"
        >
          Success
        </button>
        <button
          type="button"
          className="btn bg-danger border border-danger text-white text-center hover:bg-danger-800 hover:border-danger-800 hover:text-white"
        >
          Error
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-primary border
          border-primary text-white text-center hover:bg-primary-800
          hover:border-primary-800 hover:text-white"&gt;Primary&lt;/button&gt;
          {"\n"}
          {"\t"}&lt;button type="button" class="btn bg-dark border border-dark
          text-white text-center hover:bg-black hover:border-black
          hover:text-white"&gt;Dark&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-light border
          border-border-color text-dark text-center hover:bg-light-800
          hover:border-light-800 hover:text-dark"&gt;Light&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-info border border-info
          text-white text-center hover:bg-info-800 hover:border-info-800
          hover:text-white"&gt;Info&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-warning border
          border-warning text-white text-center hover:bg-warning-800
          hover:border-warning-800 hover:text-white"&gt;Warning&lt;/button&gt;
          {"\n"}
          {"\t"}&lt;button type="button" class="btn bg-success border
          border-success text-white text-center hover:bg-success-800
          hover:border-success-800 hover:text-white"&gt;Success&lt;/button&gt;
          {"\n"}
          {"\t"}&lt;button type="button" class="btn bg-danger border
          border-danger text-white text-center hover:bg-danger-800
          hover:border-danger-800 hover:text-white"&gt;Error&lt;/button&gt;
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Outline Buttons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn bg-transparent border border-primary text-primary text-center hover:bg-primary-100"
        >
          Primary
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-dark text-dark text-center hover:bg-gray-100"
        >
          Dark
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-border-color text-gray-700 text-center hover:bg-light-100"
        >
          Light
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-info text-info text-center hover:bg-info-100"
        >
          Info
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-warning text-warning text-center hover:bg-warning-100"
        >
          Warning
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-success text-success text-center hover:bg-success-100"
        >
          Success
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-danger text-danger text-center hover:bg-danger-100"
        >
          Error
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-primary text-primary text-center
          hover:bg-primary-100"&gt;Primary&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-dark text-dark text-center
          hover:bg-gray-100"&gt;Dark&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-border-color text-gray-700 text-center
          hover:bg-light-100"&gt;Light&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-info text-info text-center
          hover:bg-info-100"&gt;Info&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-warning text-warning text-center
          hover:bg-warning-100"&gt;Warning&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-success text-success text-center
          hover:bg-success-100"&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-danger text-danger text-center
          hover:bg-danger-100"&gt;Error&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Buttons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn bg-primary-100 border border-primary text-primary text-center hover:bg-primary-200"
        >
          Primary
        </button>
        <button
          type="button"
          className="btn bg-gray-100 border border-dark text-dark text-center hover:bg-gray-200 "
        >
          Dark
        </button>
        <button
          type="button"
          className="btn bg-light-100 border border-border-color text-dark text-center hover:bg-gray-200 dark:text-white! dark:hover:text-dark!"
        >
          Light
        </button>
        <button
          type="button"
          className="btn bg-info-100 border border-info text-info text-center hover:bg-info-200"
        >
          Info
        </button>
        <button
          type="button"
          className="btn bg-warning-100 border border-warning text-warning text-center hover:bg-warning-200"
        >
          Warning
        </button>
        <button
          type="button"
          className="btn bg-success-100 border border-success text-success text-center hover:bg-success-200"
        >
          Success
        </button>
        <button
          type="button"
          className="btn bg-danger-100 border border-danger text-danger text-center hover:bg-danger-200"
        >
          Error
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-primary-100 border
          border-primary text-primary text-center
          hover:bg-primary-200"&gt;Primary&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-gray-100 border
          border-dark text-dark text-center
          hover:bg-gray-200"&gt;Dark&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-light-100 border
          border-border-color text-dark text-center
          hover:bg-gray-200"&gt;Light&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-info-100 border
          border-info text-info text-center
          hover:bg-info-200"&gt;Info&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-warning-100 border
          border-warning text-warning text-center
          hover:bg-warning-200"&gt;Warning&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-success-100 border
          border-success text-success text-center
          hover:bg-success-200"&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-danger-100 border
          border-danger text-danger text-center
          hover:bg-danger-200"&gt;Error&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Buttons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white rounded-full"
        >
          Primary
        </button>
        <button
          type="button"
          className="btn bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white rounded-full dark:text-white! dark:hover:text-dark!"
        >
          Dark
        </button>
        <button
          type="button"
          className="btn bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:border-light-800 hover:text-dark rounded-full"
        >
          Light
        </button>
        <button
          type="button"
          className="btn bg-info border border-info text-white text-center hover:bg-info-800 hover:border-info-800 hover:text-white rounded-full"
        >
          Info
        </button>
        <button
          type="button"
          className="btn bg-warning border border-warning text-white text-center hover:bg-warning-800 hover:border-warning-800 hover:text-white rounded-full"
        >
          Warning
        </button>
        <button
          type="button"
          className="btn bg-success border border-success text-white text-center hover:bg-success-800 hover:border-success-800 hover:text-white rounded-full"
        >
          Success
        </button>
        <button
          type="button"
          className="btn bg-danger border border-danger text-white text-center hover:bg-danger-800 hover:border-danger-800 hover:text-white rounded-full"
        >
          Error
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-primary border
          border-primary text-white text-center hover:bg-primary-800
          hover:border-primary-800 hover:text-white
          rounded-full"&gt;Primary&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-dark border border-dark
          text-white text-center hover:bg-black hover:border-black
          hover:text-white rounded-full"&gt;Dark&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-light border
          border-border-color text-dark text-center hover:bg-light-800
          hover:border-light-800 hover:text-dark
          rounded-full"&gt;Light&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-info border border-info
          text-white text-center hover:bg-info-800 hover:border-info-800
          hover:text-white rounded-full"&gt;Info&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-warning border
          border-warning text-white text-center hover:bg-warning-800
          hover:border-warning-800 hover:text-white
          rounded-full"&gt;Warning&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-success border
          border-success text-white text-center hover:bg-success-800
          hover:border-success-800 hover:text-white
          rounded-full"&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-danger border
          border-danger text-white text-center hover:bg-danger-800
          hover:border-danger-800 hover:text-white
          rounded-full"&gt;Error&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Outline Round Buttons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn bg-transparent border border-primary text-primary text-center hover:bg-primary-100 rounded-full"
        >
          Primary
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-dark text-dark text-center hover:bg-gray-100 rounded-full"
        >
          Dark
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-border-color text-gray-700 text-center hover:bg-light-100 rounded-full"
        >
          Light
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-info text-info text-center hover:bg-info-100 rounded-full"
        >
          Info
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-warning text-warning text-center hover:bg-warning-100 rounded-full"
        >
          Warning
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-success text-success text-center hover:bg-success-100 rounded-full"
        >
          Success
        </button>
        <button
          type="button"
          className="btn bg-transparent border border-danger text-danger text-center hover:bg-danger-100 rounded-full"
        >
          Error
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-primary text-primary text-center hover:bg-primary-100
          rounded-full"&gt;Primary&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-dark text-dark text-center hover:bg-gray-100
          rounded-full"&gt;Dark&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-border-color text-gray-700 text-center hover:bg-light-100
          rounded-full"&gt;Light&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-info text-info text-center hover:bg-info-100
          rounded-full"&gt;Info&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-warning text-warning text-center hover:bg-warning-100
          rounded-full"&gt;Warning&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-success text-success text-center hover:bg-success-100
          rounded-full"&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-transparent border
          border-danger text-danger text-center hover:bg-danger-100
          rounded-full"&gt;Error&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Round Buttons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn bg-primary-100 border border-primary text-primary text-center hover:bg-primary-200 rounded-full"
        >
          Primary
        </button>
        <button
          type="button"
          className="btn bg-gray-100 border border-dark text-dark text-center hover:bg-gray-200 rounded-full"
        >
          Dark
        </button>
        <button
          type="button"
          className="btn bg-light-100 border border-border-color text-dark text-center hover:bg-gray-200 rounded-full dark:text-white! dark:hover:text-dark!"
        >
          Light
        </button>
        <button
          type="button"
          className="btn bg-info-100 border border-info text-info text-center hover:bg-info-200 rounded-full"
        >
          Info
        </button>
        <button
          type="button"
          className="btn bg-warning-100 border border-warning text-warning text-center hover:bg-warning-200 rounded-full"
        >
          Warning
        </button>
        <button
          type="button"
          className="btn bg-success-100 border border-success text-success text-center hover:bg-success-200 rounded-full"
        >
          Success
        </button>
        <button
          type="button"
          className="btn bg-danger-100 border border-danger text-danger text-center hover:bg-danger-200 rounded-full"
        >
          Error
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-primary-100 border
          border-primary text-primary text-center hover:bg-primary-200
          rounded-full"&gt;Primary&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-gray-100 border
          border-dark text-dark text-center hover:bg-gray-200
          rounded-full"&gt;Dark&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-light-100 border
          border-border-color text-dark text-center hover:bg-gray-200
          rounded-full"&gt;Light&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-info-100 border
          border-info text-info text-center hover:bg-info-200
          rounded-full"&gt;Info&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-warning-100 border
          border-warning text-warning text-center hover:bg-warning-200
          rounded-full"&gt;Warning&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-success-100 border
          border-success text-success text-center hover:bg-success-200
          rounded-full"&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-danger-100 border
          border-danger text-danger text-center hover:bg-danger-200
          rounded-full"&gt;Error&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Buttons with Left Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon icon-chevron-left" />
          Primary
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white dark:text-white! dark:hover:text-dark!"
        >
          <i className="icon icon-chevron-left" />
          Dark
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:border-light-800 hover:text-dark"
        >
          <i className="icon icon-chevron-left" />
          Light
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-info border border-info text-white text-center hover:bg-info-800 hover:border-info-800 hover:text-white"
        >
          <i className="icon icon-chevron-left" />
          Info
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-warning border border-warning text-white text-center hover:bg-warning-800 hover:border-warning-800 hover:text-white"
        >
          <i className="icon icon-chevron-left" />
          Warning
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-success border border-success text-white text-center hover:bg-success-800 hover:border-success-800 hover:text-white"
        >
          <i className="icon icon-chevron-left" />
          Success
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-danger border border-danger text-white text-center hover:bg-danger-800 hover:border-danger-800 hover:text-white"
        >
          <i className="icon icon-chevron-left" />
          Error
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-primary border border-primary
          text-white text-center hover:bg-primary-800 hover:border-primary-800
          hover:text-white"&gt;&lt;i class="icon
          icon-chevron-left"&gt;&lt;/i&gt;Primary&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-dark border border-dark
          text-white text-center hover:bg-black hover:border-black
          hover:text-white"&gt;&lt;i class="icon
          icon-chevron-left"&gt;&lt;/i&gt;Dark&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-light border
          border-border-color text-dark text-center hover:bg-light-800
          hover:border-light-800 hover:text-dark"&gt;&lt;i class="icon
          icon-chevron-left"&gt;&lt;/i&gt;Light&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-info border border-info
          text-white text-center hover:bg-info-800 hover:border-info-800
          hover:text-white"&gt;&lt;i class="icon
          icon-chevron-left"&gt;&lt;/i&gt;Info&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-warning border border-warning
          text-white text-center hover:bg-warning-800 hover:border-warning-800
          hover:text-white"&gt;&lt;i class="icon
          icon-chevron-left"&gt;&lt;/i&gt;Warning&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-success border border-success
          text-white text-center hover:bg-success-800 hover:border-success-800
          hover:text-white"&gt;&lt;i class="icon
          icon-chevron-left"&gt;&lt;/i&gt;Success&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-danger border border-danger
          text-white text-center hover:bg-danger-800 hover:border-danger-800
          hover:text-white"&gt;&lt;i class="icon
          icon-chevron-left"&gt;&lt;/i&gt;Error&lt;/button&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Buttons with Right Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-end gap-9">
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          Primary
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white dark:text-white! dark:hover:text-dark!"
        >
          Dark
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:border-light-800 hover:text-dark"
        >
          Light
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-info border border-info text-white text-center hover:bg-info-800 hover:border-info-800 hover:text-white"
        >
          Info
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-warning border border-warning text-white text-center hover:bg-warning-800 hover:border-warning-800 hover:text-white"
        >
          Warning
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-success border border-success text-white text-center hover:bg-success-800 hover:border-success-800 hover:text-white"
        >
          Success
          <i className="icon icon-chevron-right" />
        </button>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-danger border border-danger text-white text-center hover:bg-danger-800 hover:border-danger-800 hover:text-white"
        >
          Error
          <i className="icon icon-chevron-right" />
        </button>
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
        <code className="language-html block w-full max-h-[300px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-end gap-9"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-primary border border-primary
          text-white text-center hover:bg-primary-800 hover:border-primary-800
          hover:text-white"&gt;Primary&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-dark border border-dark
          text-white text-center hover:bg-black hover:border-black
          hover:text-white"&gt;Dark&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-light border
          border-border-color text-dark text-center hover:bg-light-800
          hover:border-light-800 hover:text-dark"&gt;Light&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-info border border-info
          text-white text-center hover:bg-info-800 hover:border-info-800
          hover:text-white"&gt;Info&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-warning border border-warning
          text-white text-center hover:bg-warning-800 hover:border-warning-800
          hover:text-white"&gt;Warning&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-success border border-success
          text-white text-center hover:bg-success-800 hover:border-success-800
          hover:text-white"&gt;Success&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn flex items-center
          justify-center gap-1.5 cursor-pointer bg-danger border border-danger
          text-white text-center hover:bg-danger-800 hover:border-danger-800
          hover:text-white"&gt;Error&lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt;&lt;/button&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>{" "}
  {/* end card */}
  {/* end grid */}
</div>

  )
}

export default UiButtons