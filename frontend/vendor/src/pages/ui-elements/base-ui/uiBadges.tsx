import { useEffect } from "react";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiBadges = () => {
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
            Badges
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
        <h5>Default Badge</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="badge rounded-md text-xs font-medium bg-primary text-white">
          Primary
        </span>
        <span className="badge rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
          Dark
        </span>
        <span className="badge rounded-md text-xs font-medium bg-success text-white">
          Success
        </span>
        <span className="badge rounded-md text-xs font-medium bg-warning text-white">
          Warning
        </span>
        <span className="badge rounded-md text-xs font-medium bg-info text-white">
          Info
        </span>
        <span className="badge rounded-md text-xs font-medium bg-danger text-white">
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-primary
          text-white"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-dark
          text-white"&gt;Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-success
          text-white"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-warning
          text-white"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-info
          text-white"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-danger
          text-white"&gt;Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Badge</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="badge rounded-full text-xs font-medium bg-primary text-white">
          Primary
        </span>
        <span className="badge rounded-full text-xs font-medium bg-dark text-white dark:text-white!">
          Dark
        </span>
        <span className="badge rounded-full text-xs font-medium bg-success text-white">
          Success
        </span>
        <span className="badge rounded-full text-xs font-medium bg-warning text-white">
          Warning
        </span>
        <span className="badge rounded-full text-xs font-medium bg-info text-white">
          Info
        </span>
        <span className="badge rounded-full text-xs font-medium bg-danger text-white">
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-primary text-white"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium bg-dark
          text-white"&gt;Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-success text-white"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-warning text-white"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium bg-info
          text-white"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium bg-danger
          text-white"&gt;Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Flat</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
          Primary
        </span>
        <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
          Dark
        </span>
        <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          Success
        </span>
        <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
          Warning
        </span>
        <span className="badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
          Info
        </span>
        <span className="badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-primary-50 text-primary border
          border-primary"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium bg-light
          text-dark border border-border-color"&gt;Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-success-50 text-success border
          border-success"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-warning-50 text-warning border
          border-warning"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium bg-info-50
          text-info border border-info"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-danger-50 text-danger border border-danger"&gt;Error&lt;/span&gt;
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Rounded</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="badge rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary">
          Primary
        </span>
        <span className="badge rounded-full text-xs font-medium bg-light text-dark border border-border-color">
          Dark
        </span>
        <span className="badge rounded-full text-xs font-medium bg-success-50 text-success border border-success">
          Success
        </span>
        <span className="badge rounded-full text-xs font-medium bg-warning-50 text-warning border border-warning">
          Warning
        </span>
        <span className="badge rounded-full text-xs font-medium bg-info-50 text-info border border-info">
          Info
        </span>
        <span className="badge rounded-full text-xs font-medium bg-danger-50 text-danger border border-danger">
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-primary-50 text-primary border
          border-primary"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium bg-light
          text-dark border border-border-color"&gt;Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-success-50 text-success border
          border-success"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-warning-50 text-warning border
          border-warning"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-info-50 text-info border border-info"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-full text-xs font-medium
          bg-danger-50 text-danger border border-danger"&gt;Error&lt;/span&gt;
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Badge Sizes</h5>
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
        <div className="flex items-start flex-wrap justify-between mb-5">
          <span className="badge-small rounded-md text-xs font-medium bg-primary text-white">
            Primary
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
            Dark
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-success text-white">
            Success
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-warning text-white">
            Warning
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-info text-white">
            Info
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-danger text-white border">
            Error
          </span>
        </div>
        <div className="flex items-start flex-wrap gap-4">
          <span className="badge rounded-md text-xs font-medium bg-primary text-white">
            Primary
          </span>
          <span className="badge rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
            Dark
          </span>
          <span className="badge rounded-md text-xs font-medium bg-success text-white">
            Success
          </span>
          <span className="badge rounded-md text-xs font-medium bg-warning text-white">
            Warning
          </span>
          <span className="badge rounded-md text-xs font-medium bg-info text-white">
            Info
          </span>
          <span className="badge rounded-md text-xs font-medium bg-danger text-white">
            Error
          </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap justify-between
          mb-5"&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-primary text-white"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-dark text-white"&gt;Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-success text-white"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-warning text-white"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-info text-white"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-danger text-white border"&gt;Error&lt;/span&gt;{"\n"}&lt;/div&gt;
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-primary
          text-white"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-dark
          text-white"&gt;Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-success
          text-white"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-warning
          text-white"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-info
          text-white"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-md text-xs font-medium bg-danger
          text-white"&gt;Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Sizes</h5>
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
        <div className="flex items-start flex-wrap justify-between mb-5">
          <span className="badge-small rounded-md text-xs font-medium bg-primary-50 text-primary border border-primary">
            Primary
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color">
            Dark
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-success-50 text-success border border-success">
            Success
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-warning-50 text-warning border border-warning">
            Warning
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-info-50 text-info border border-info">
            Info
          </span>
          <span className="badge-small rounded-md text-xs font-medium bg-danger-50 text-danger border border-danger">
            Error
          </span>
        </div>
        <div className="flex items-start flex-wrap gap-4">
          <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
            Primary
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
            Dark
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
            Success
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
            Warning
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
            Info
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
            Error
          </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap justify-between
          mb-5"&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-primary-50 text-primary border
          border-primary"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-light text-dark border border-border-color"&gt;Dark&lt;/span&gt;{" "}
          {"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-success-50 text-success border
          border-success"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-warning-50 text-warning border
          border-warning"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-info-50 text-info border border-info"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge-small rounded-md text-xs font-medium
          bg-danger-50 text-danger border border-danger"&gt;Error&lt;/span&gt;
          {"\n"}&lt;/div&gt;{"\n"}&lt;div class="flex items-start flex-wrap
          gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-primary-50 text-primary border
          border-primary"&gt;Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium bg-light
          text-dark border border-border-color"&gt;Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-success-50 text-success border
          border-success"&gt;Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-warning-50 text-warning border
          border-warning"&gt;Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium bg-info-50
          text-info border border-info"&gt;Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="badge rounded-lg text-xs font-medium
          bg-danger-50 text-danger border border-danger"&gt;Error&lt;/span&gt;
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Badge with Left Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-primary text-white">
          <i className="icon icon-check me-1" /> Primary
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
          <i className="icon icon-check me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-success text-white">
          <i className="icon icon-check me-1" /> Success
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-warning text-white">
          <i className="icon icon-check me-1" /> Warning
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-info text-white">
          <i className="icon icon-check me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-danger text-white">
          <i className="icon icon-check me-1" /> Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-primary text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-dark text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-success text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-warning text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-info text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-danger text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Error&lt;/span&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Badge with Left Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary text-white">
          <i className="icon icon-check me-1" /> Primary
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-dark text-white dark:text-white!">
          <i className="icon icon-check me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success text-white">
          <i className="icon icon-check me-1" /> Success
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning text-white">
          <i className="icon icon-check me-1" /> Warning
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info text-white">
          <i className="icon icon-check me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger text-white">
          <i className="icon icon-check me-1" /> Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-dark text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger text-white"&gt;&lt;i class="icon
          icon-check me-1"&gt;&lt;/i&gt; Error&lt;/span&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Flat with Left Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
          <i className="icon icon-check me-1" /> Primary
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
          <i className="icon icon-check me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          <i className="icon icon-check me-1" /> Success
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
          <i className="icon icon-check me-1" /> Warning
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
          <i className="icon icon-check me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
          <i className="icon icon-check me-1" /> Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;i class="icon icon-check
          me-1"&gt;&lt;/i&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-info-50 text-info border border-info"&gt;&lt;i
          class="icon icon-check me-1"&gt;&lt;/i&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Rounded with Left Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary">
          <i className="icon icon-check me-1" /> Primary
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-light text-dark border border-border-color">
          <i className="icon icon-check me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success-50 text-success border border-success">
          <i className="icon icon-check me-1" /> Success
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning-50 text-warning border border-warning">
          <i className="icon icon-check me-1" /> Warning
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info-50 text-info border border-info">
          <i className="icon icon-check me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger-50 text-danger border border-danger">
          <i className="icon icon-check me-1" /> Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;i class="icon icon-check
          me-1"&gt;&lt;/i&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info-50 text-info border border-info"&gt;&lt;i
          class="icon icon-check me-1"&gt;&lt;/i&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;i class="icon icon-check me-1"&gt;&lt;/i&gt;
          Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Badge with Right Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-primary text-white">
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-success text-white">
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-warning text-white">
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-info text-white">
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-danger text-white">
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-primary text-white"&gt;Primary &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-dark text-white"&gt;Dark &lt;i class="icon
          icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-success text-white"&gt;Success &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-warning text-white"&gt;Warning &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-info text-white"&gt;Info &lt;i class="icon
          icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-danger text-white"&gt;Error &lt;i class="icon
          icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Badge with Right Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary text-white">
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-dark text-white dark:text-white!">
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success text-white">
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning text-white">
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info text-white">
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger text-white">
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary text-white"&gt;Primary &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-dark text-white"&gt;Dark &lt;i class="icon
          icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success text-white"&gt;Success &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning text-white"&gt;Warning &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info text-white"&gt;Info &lt;i class="icon
          icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger text-white"&gt;Error &lt;i class="icon
          icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Flat with Right Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;Primary &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;Dark &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;Success &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;Warning &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-info-50 text-info border border-info"&gt;Info
          &lt;i class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;Error &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Rounded with Right Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary">
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-light text-dark border border-border-color">
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success-50 text-success border border-success">
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning-50 text-warning border border-warning">
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info-50 text-info border border-info">
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger-50 text-danger border border-danger">
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;Primary &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;Dark &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;Success &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;Warning &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info-50 text-info border border-info"&gt;Info
          &lt;i class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;Error &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Badge with Dot</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-primary text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-success text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-warning text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-info text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-danger text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-primary text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-dark text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-success text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-warning text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-info text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-danger text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Badge with Dot</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-dark text-white dark:text-white!">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger text-white">
          <span className="bg-white w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-dark text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger text-white"&gt;&lt;span class="bg-white
          w-1.5 h-1.5 block rounded-full me-1"&gt;&lt;/span&gt;
          Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Flat with Dot</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
          <span className="bg-primary w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
          <span className="bg-dark w-1.5 h-1.5 block rounded-full me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          <span className="bg-success w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
          <span className="bg-warning w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
          <span className="bg-info w-1.5 h-1.5 block rounded-full me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
          <span className="bg-danger w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;span class="bg-primary w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;span class="bg-dark w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;span class="bg-success w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;span class="bg-warning w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-info-50 text-info border
          border-info"&gt;&lt;span class="bg-info w-1.5 h-1.5 block rounded-full
          me-1"&gt;&lt;/span&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;span class="bg-danger w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Error&lt;/span&gt;{"\n"}
          &lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Rounded with Dot</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary">
          <span className="bg-primary w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-light text-dark border border-border-color">
          <span className="bg-dark w-1.5 h-1.5 block rounded-full me-1" /> Dark
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success-50 text-success border border-success">
          <span className="bg-success w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning-50 text-warning border border-warning">
          <span className="bg-warning w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info-50 text-info border border-info">
          <span className="bg-info w-1.5 h-1.5 block rounded-full me-1" /> Info
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger-50 text-danger border border-danger">
          <span className="bg-danger w-1.5 h-1.5 block rounded-full me-1" />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;span class="bg-primary w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;span class="bg-dark w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;span class="bg-success w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;span class="bg-warning w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info-50 text-info border
          border-info"&gt;&lt;span class="bg-info w-1.5 h-1.5 block rounded-full
          me-1"&gt;&lt;/span&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;span class="bg-danger w-1.5 h-1.5 block
          rounded-full me-1"&gt;&lt;/span&gt; Error&lt;/span&gt;{"\n"}
          &lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Badge with Image</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-primary text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Dark
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-success text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-warning text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-info text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Info
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-danger text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-primary text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-dark text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-success text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-warning text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-info text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-danger text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Error&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Badge with Image</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-dark text-white dark:text-white!">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Dark
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Info
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-dark text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Dark&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Info&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Error&lt;/span&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Flat with Image</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Dark
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Info
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Primary&lt;/span&gt;
          {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Dark&lt;/span&gt;{" "}
          {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Success&lt;/span&gt;
          {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Warning&lt;/span&gt;
          {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-info-50 text-info border
          border-info"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Info&lt;/span&gt;
          {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Error&lt;/span&gt;
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Rounded with Image</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Primary
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-light text-dark border border-border-color">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Dark
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success-50 text-success border border-success">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Success
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning-50 text-warning border border-warning">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Warning
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info-50 text-info border border-info">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Info
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger-50 text-danger border border-danger">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Error
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt;
          Primary&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Dark&lt;/span&gt;{" "}
          {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt;
          Success&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt;
          Warning&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info-50 text-info border
          border-info"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Info&lt;/span&gt;
          {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Error&lt;/span&gt;
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Badge with Image &amp; Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-primary text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-dark text-white dark:text-white!">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-success text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-warning text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-info text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-md text-xs font-medium bg-danger text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-primary text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Primary &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-dark text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Dark &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-success text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Success &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-warning text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Warning &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-info text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Info &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-md
          text-xs font-medium bg-danger text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1 rounded-xs"
          alt="avatar"&gt; Error &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Badge with Image &amp; Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-dark text-white dark:text-white!">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger text-white">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Primary &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-dark text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Dark &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt; {"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Success &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Warning &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Info &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger text-white"&gt;&lt;img
          src={Images.avatar_01} class="w-3 h-3 me-1
          rounded-full" alt="avatar"&gt; Error &lt;i class="icon icon-x
          ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Flat with Image &amp; Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-xs"
            alt="avatar"
          />{" "}
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Primary &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Dark &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Success &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Warning &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-info-50 text-info border
          border-info"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Info &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-lg
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-xs" alt="avatar"&gt; Error &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-xl border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Badge Rounded with Image &amp; Icon</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-start flex-wrap gap-4">
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Primary <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-light text-dark border border-border-color">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Dark <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-success-50 text-success border border-success">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Success <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-warning-50 text-warning border border-warning">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Warning <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-info-50 text-info border border-info">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Info <i className="icon icon-x ms-1" />
        </span>
        <span className="inline-flex items-center badge rounded-full text-xs font-medium bg-danger-50 text-danger border border-danger">
          <ImageWithBasePath
            src={Images.avatar_01}
            className="w-3 h-3 me-1 rounded-full"
            alt="avatar"
          />{" "}
          Error <i className="icon icon-x ms-1" />
        </span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-start flex-wrap gap-4"&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-primary-50 text-primary border
          border-primary"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Primary &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-light text-dark border
          border-border-color"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Dark &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-success-50 text-success border
          border-success"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Success &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-warning-50 text-warning border
          border-warning"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Warning &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-info-50 text-info border
          border-info"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Info &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;span class="inline-flex items-center badge rounded-full
          text-xs font-medium bg-danger-50 text-danger border
          border-danger"&gt;&lt;img src={Images.avatar_01}
          class="w-3 h-3 me-1 rounded-full" alt="avatar"&gt; Error &lt;i
          class="icon icon-x ms-1"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}&lt;/div&gt;
          {"\n"}
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

export default UiBadges