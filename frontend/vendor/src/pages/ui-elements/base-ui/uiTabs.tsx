import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiTabs = () => {
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
            UI Nav Tabs
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Top line tabs</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-t-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-t-prim focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-1"
              aria-selected="true"
              data-hs-tab="#tab-01"
              aria-controls="tab-01"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-t-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-t-prim focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none"
              id="tab-2"
              aria-selected="false"
              data-hs-tab="#tab-02"
              aria-controls="tab-02"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-t-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-t-prim focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              id="tab-3"
              aria-selected="false"
              data-hs-tab="#tab-03"
              aria-controls="tab-03"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-01" role="tabpanel" aria-labelledby="tab-1">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-02"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-2"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-03"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-3"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt; {"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex flex-wrap gap-2" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-t-prim
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none active" id="tab-1" aria-selected="true"
          data-hs-tab="#tab-01" aria-controls="tab-01" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-t-prim
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none" id="tab-2" aria-selected="false"
          data-hs-tab="#tab-02" aria-controls="tab-02" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-t-prim
          focus:outline-hidden focus:text-blue-600 disabled:opacity-50
          disabled:pointer-events-none" id="tab-3" aria-selected="false"
          data-hs-tab="#tab-03" aria-controls="tab-03" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-01" role="tabpanel"
          aria-labelledby="tab-1"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-02" class="hidden" role="tabpanel"
          aria-labelledby="tab-2"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-03" class="hidden" role="tabpanel"
          aria-labelledby="tab-3"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"  "}
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Bottom line tabs</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-b-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-b-primary focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-4"
              aria-selected="true"
              data-hs-tab="#tab-04"
              aria-controls="tab-04"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-b-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-b-primary focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none"
              id="tab-5"
              aria-selected="false"
              data-hs-tab="#tab-05"
              aria-controls="tab-05"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-b-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-b-primary focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              id="tab-6"
              aria-selected="false"
              data-hs-tab="#tab-06"
              aria-controls="tab-06"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-04" role="tabpanel" aria-labelledby="tab-4">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-05"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-5"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-06"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-6"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex flex-wrap gap-2" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-b-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-b-primary
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none active" id="tab-4" aria-selected="true"
          data-hs-tab="#tab-04" aria-controls="tab-04" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-b-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-b-primary
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none" id="tab-5" aria-selected="false"
          data-hs-tab="#tab-05" aria-controls="tab-05" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-b-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-b-primary
          focus:outline-hidden focus:text-blue-600 disabled:opacity-50
          disabled:pointer-events-none" id="tab-6" aria-selected="false"
          data-hs-tab="#tab-06" aria-controls="tab-06" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-04" role="tabpanel"
          aria-labelledby="tab-4"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-05" class="hidden" role="tabpanel"
          aria-labelledby="tab-5"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-06" class="hidden" role="tabpanel"
          aria-labelledby="tab-6"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Top line justified</h5>
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
        <div className="mb-4">
          <nav
            className="flex justify-between gap-x-1"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-t-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-t-prim focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-7"
              aria-selected="true"
              data-hs-tab="#tab-07"
              aria-controls="tab-07"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-t-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-t-prim focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none"
              id="tab-8"
              aria-selected="false"
              data-hs-tab="#tab-08"
              aria-controls="tab-08"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-t-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-t-prim focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              id="tab-9"
              aria-selected="false"
              data-hs-tab="#tab-09"
              aria-controls="tab-09"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-07" role="tabpanel" aria-labelledby="tab-7">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-08"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-8"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-09"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-9"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex justify-between gap-x-1"
          aria-label="Tabs" role="tablist" aria-orientation="horizontal"&gt;
          {"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-t-prim
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none active" id="tab-7" aria-selected="true"
          data-hs-tab="#tab-07" aria-controls="tab-07" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-t-prim
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none" id="tab-8" aria-selected="false"
          data-hs-tab="#tab-08" aria-controls="tab-08" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-t-prim
          focus:outline-hidden focus:text-blue-600 disabled:opacity-50
          disabled:pointer-events-none" id="tab-9" aria-selected="false"
          data-hs-tab="#tab-09" aria-controls="tab-09" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-07" role="tabpanel"
          aria-labelledby="tab-7"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-08" class="hidden" role="tabpanel"
          aria-labelledby="tab-8"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-09" class="hidden" role="tabpanel"
          aria-labelledby="tab-9"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Bottom line justified</h5>
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
        <div className="mb-4">
          <nav
            className="flex justify-between gap-x-1"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-b-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-b-primary focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-10"
              aria-selected="true"
              data-hs-tab="#tab-010"
              aria-controls="tab-010"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-b-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-b-primary focus:outline-hidden focus:text-primary disabled:opacity-50 disabled:pointer-events-none"
              id="tab-11"
              aria-selected="false"
              data-hs-tab="#tab-011"
              aria-controls="tab-011"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary border-b-2 border-transparent  whitespace-nowrap hover:text-primary hover:border-b-primary focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              id="tab-12"
              aria-selected="false"
              data-hs-tab="#tab-012"
              aria-controls="tab-012"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-010" role="tabpanel" aria-labelledby="tab-10">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-011"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-11"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-012"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-12"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex justify-between gap-x-1"
          aria-label="Tabs" role="tablist" aria-orientation="horizontal"&gt;
          {"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-b-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-b-primary
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none active" id="tab-10" aria-selected="true"
          data-hs-tab="#tab-010" aria-controls="tab-010" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-b-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-b-primary
          focus:outline-hidden focus:text-primary disabled:opacity-50
          disabled:pointer-events-none" id="tab-11" aria-selected="false"
          data-hs-tab="#tab-011" aria-controls="tab-011" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:border-primary
          hs-tab-active:text-primary border-b-2 border-transparent{"  "}
          whitespace-nowrap hover:text-primary hover:border-b-primary
          focus:outline-hidden focus:text-blue-600 disabled:opacity-50
          disabled:pointer-events-none" id="tab-12" aria-selected="false"
          data-hs-tab="#tab-012" aria-controls="tab-012" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-010" role="tabpanel"
          aria-labelledby="tab-10"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-011" class="hidden" role="tabpanel"
          aria-labelledby="tab-11"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-012" class="hidden" role="tabpanel"
          aria-labelledby="tab-12"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Solid tabs</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-13"
              aria-selected="true"
              data-hs-tab="#tab-013"
              aria-controls="tab-013"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-14"
              aria-selected="false"
              data-hs-tab="#tab-014"
              aria-controls="tab-014"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-15"
              aria-selected="false"
              data-hs-tab="#tab-015"
              aria-controls="tab-015"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-013" role="tabpanel" aria-labelledby="tab-13">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-014"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-14"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-015"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-15"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex flex-wrap gap-2" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:bg-primary
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-primary hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none active" id="tab-13" aria-selected="true"
          data-hs-tab="#tab-013" aria-controls="tab-013" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:bg-primary
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-primary hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-14" aria-selected="false"
          data-hs-tab="#tab-014" aria-controls="tab-014" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:bg-primary
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-primary hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-15" aria-selected="false"
          data-hs-tab="#tab-015" aria-controls="tab-015" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-013" role="tabpanel"
          aria-labelledby="tab-13"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-014" class="hidden" role="tabpanel"
          aria-labelledby="tab-14"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-015" class="hidden" role="tabpanel"
          aria-labelledby="tab-15"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Solid justified</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap justify-between gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:bg-primary hs-tab-active:text-white hs-tab-active:border-primary dark:hs-tab-active:text-dark dark:hover:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-16"
              aria-selected="true"
              data-hs-tab="#tab-016"
              aria-controls="tab-016"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:bg-primary hs-tab-active:text-white border-t-2 border-transparent hs-tab-active:border-primary dark:hs-tab-active:text-dark dark:hover:text-dark  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-17"
              aria-selected="false"
              data-hs-tab="#tab-017"
              aria-controls="tab-017"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold hs-tab-active:bg-primary hs-tab-active:text-white border-t-2 border-transparent hs-tab-active:border-primary dark:hs-tab-active:text-dark dark:hover:text-dark  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-18"
              aria-selected="false"
              data-hs-tab="#tab-018"
              aria-controls="tab-018"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-016" role="tabpanel" aria-labelledby="tab-16">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-017"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-17"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-018"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-18"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex justify-between gap-x-2"
          aria-label="Tabs" role="tablist" aria-orientation="horizontal"&gt;
          {"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:bg-primary
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-primary hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none active" id="tab-16" aria-selected="true"
          data-hs-tab="#tab-016" aria-controls="tab-016" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:bg-primary
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-primary hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-17" aria-selected="false"
          data-hs-tab="#tab-017" aria-controls="tab-017" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold hs-tab-active:bg-primary
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-primary hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-18" aria-selected="false"
          data-hs-tab="#tab-018" aria-controls="tab-018" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-016" role="tabpanel"
          aria-labelledby="tab-16"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-017" class="hidden" role="tabpanel"
          aria-labelledby="tab-17"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-018" class="hidden" role="tabpanel"
          aria-labelledby="tab-18"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Solid Rounded</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success hs-tab-active:text-white dark:hs-tab-active:text-dark dark:hover:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-success hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-19"
              aria-selected="true"
              data-hs-tab="#tab-019"
              aria-controls="tab-019"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success hs-tab-active:text-white dark:hs-tab-active:text-dark dark:hover:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-success hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-20"
              aria-selected="false"
              data-hs-tab="#tab-020"
              aria-controls="tab-020"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success hs-tab-active:text-white dark:hs-tab-active:text-dark dark:hover:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-success hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-21"
              aria-selected="false"
              data-hs-tab="#tab-021"
              aria-controls="tab-021"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-019" role="tabpanel" aria-labelledby="tab-19">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-020"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-20"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-021"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-21"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex flex-wrap gap-2" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-success hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none active" id="tab-19" aria-selected="true"
          data-hs-tab="#tab-019" aria-controls="tab-019" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-success hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-20" aria-selected="false"
          data-hs-tab="#tab-020" aria-controls="tab-020" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-success hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-21" aria-selected="false"
          data-hs-tab="#tab-021" aria-controls="tab-021" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-019" role="tabpanel"
          aria-labelledby="tab-19"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-020" class="hidden" role="tabpanel"
          aria-labelledby="tab-20"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-021" class="hidden" role="tabpanel"
          aria-labelledby="tab-21"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded justified</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap justify-between gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success hs-tab-active:text-white dark:hs-tab-active:text-dark dark:hover:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-success hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-22"
              aria-selected="true"
              data-hs-tab="#tab-022"
              aria-controls="tab-022"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success hs-tab-active:text-white dark:hs-tab-active:text-dark dark:hover:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-success hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-23"
              aria-selected="false"
              data-hs-tab="#tab-023"
              aria-controls="tab-023"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success hs-tab-active:text-white dark:hs-tab-active:text-dark dark:hover:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-success hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-24"
              aria-selected="false"
              data-hs-tab="#tab-024"
              aria-controls="tab-024"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-022" role="tabpanel" aria-labelledby="tab-22">
            <p> This is the item's tab 1 body. </p>
          </div>
          <div
            id="tab-023"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-23"
          >
            <p> This is the item's tab 2 body. </p>
          </div>
          <div
            id="tab-024"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-24"
          >
            <p> This is the item's tab 3 body. </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex justify-between gap-x-2"
          aria-label="Tabs" role="tablist" aria-orientation="horizontal"&gt;
          {"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-success hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none active" id="tab-22" aria-selected="true"
          data-hs-tab="#tab-022" aria-controls="tab-022" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-success hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-23" aria-selected="false"
          data-hs-tab="#tab-023" aria-controls="tab-023" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-full hs-tab-active:bg-success
          hs-tab-active:text-white border-t-2 border-transparent{"  "}
          whitespace-nowrap hover:bg-success hover:text-white
          focus:outline-hidden focus:text-white disabled:opacity-50
          disabled:pointer-events-none" id="tab-24" aria-selected="false"
          data-hs-tab="#tab-024" aria-controls="tab-024" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-022" role="tabpanel"
          aria-labelledby="tab-22"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 1 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-023" class="hidden" role="tabpanel"
          aria-labelledby="tab-23"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 2 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-024" class="hidden" role="tabpanel"
          aria-labelledby="tab-24"&gt;{"\n"}
          {"            "}&lt;p&gt; This is the item's tab 3 body. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Static Tabs</h5>
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
        <nav
          className="flex flex-wrap gap-2"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          <button
            type="button"
            className="py-2 px-4 rounded-lg border border-border-color  whitespace-nowrap"
            aria-selected="false"
            role="tab"
          >
            Active
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-full border-t-2 border-transparent  whitespace-nowrap"
            aria-selected="false"
            role="tab"
          >
            Link
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-full border-t-2 border-transparent  whitespace-nowrap"
            aria-selected="false"
            role="tab"
          >
            Link
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-full border-t-2 border-transparent  whitespace-nowrap pointer-none"
            aria-selected="false"
            role="tab"
           disabled
          >
            Disabled
          </button>
        </nav>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;nav class="flex flex-wrap gap-2" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-lg
          border border-border-color{"  "}whitespace-nowrap"
          aria-selected="false" role="tab"&gt;{"\n"}
          {"            "}Active{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-full
          border-t-2 border-transparent{"  "}whitespace-nowrap"
          aria-selected="false" role="tab"&gt;{"\n"}
          {"            "}Link{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-full
          border-t-2 border-transparent{"  "}whitespace-nowrap"
          aria-selected="false" role="tab"&gt;{"\n"}
          {"            "}Link{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-full
          border-t-2 border-transparent{"  "}whitespace-nowrap pointer-none"
          aria-selected="false" role="tab" disabled&gt;{"\n"}
          {"            "}Disabled{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"    "}&lt;/nav&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Static Pills</h5>
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
        <nav
          className="flex flex-wrap gap-2"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          <button
            type="button"
            className="py-2 px-4 rounded-lg border bg-primary text-white whitespace-nowrap"
            aria-selected="false"
            role="tab"
          >
            Active
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-full border-t-2 border-transparent whitespace-nowrap"
            aria-selected="false"
            role="tab"
          >
            Link
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-full border-t-2 border-transparent whitespace-nowrap"
            aria-selected="false"
            role="tab"
          >
            Link
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-full border-t-2 border-transparent whitespace-nowrap pointer-none"
            aria-selected="false"
            role="tab"
           disabled
          >
            Disabled
          </button>
        </nav>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;nav class="flex flex-wrap gap-2" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-lg
          border bg-primary text-white whitespace-nowrap" aria-selected="false"
          role="tab"&gt;{"\n"}
          {"            "}Active{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-full
          border-t-2 border-transparent whitespace-nowrap" aria-selected="false"
          role="tab"&gt;{"\n"}
          {"            "}Link{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-full
          border-t-2 border-transparent whitespace-nowrap" aria-selected="false"
          role="tab"&gt;{"\n"}
          {"            "}Link{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;button type="button" class="py-2 px-4 rounded-full
          border-t-2 border-transparent whitespace-nowrap pointer-none"
          aria-selected="false" role="tab" disabled&gt;{"\n"}
          {"            "}Disabled{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"    "}&lt;/nav&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Nav Tabs</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap hover:border-primary hover:text-primary active"
              id="tab-25"
              aria-selected="true"
              data-hs-tab="#tab-025"
              aria-controls="tab-025"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap hover:border-primary hover:text-primary"
              id="tab-26"
              aria-selected="false"
              data-hs-tab="#tab-026"
              aria-controls="tab-026"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap hover:border-primary hover:text-primary"
              id="tab-27"
              aria-selected="false"
              data-hs-tab="#tab-027"
              aria-controls="tab-027"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-025" role="tabpanel" aria-labelledby="tab-25">
            <p>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.{" "}
            </p>
          </div>
          <div
            id="tab-026"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-26"
          >
            <p>
              {" "}
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              Making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur.{" "}
            </p>
          </div>
          <div
            id="tab-027"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-27"
          >
            <p>
              {" "}
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything.{" "}
            </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex flex-wrap gap-2" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary
          hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap
          hover:border-primary hover:text-primary active" id="tab-25"
          aria-selected="true" data-hs-tab="#tab-025" aria-controls="tab-025"
          role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary
          hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap
          hover:border-primary hover:text-primary" id="tab-26"
          aria-selected="false" data-hs-tab="#tab-026" aria-controls="tab-026"
          role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary
          hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap
          hover:border-primary hover:text-primary" id="tab-27"
          aria-selected="false" data-hs-tab="#tab-027" aria-controls="tab-027"
          role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-025" role="tabpanel"
          aria-labelledby="tab-25"&gt;{"\n"}
          {"            "}&lt;p&gt; Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries. &lt;/p&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-026" class="hidden" role="tabpanel"
          aria-labelledby="tab-26"&gt;{"\n"}
          {"            "}&lt;p&gt; Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, Making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-027" class="hidden" role="tabpanel"
          aria-labelledby="tab-27"&gt;{"\n"}
          {"            "}&lt;p&gt; There are many variations of passages of
          Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything. &lt;/p&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Justified Nav Tabs</h5>
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
        <div className="mb-4">
          <nav
            className="flex flex-wrap justify-between gap-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white hs-tab-active:bg-primary whitespace-nowrap dark:hs-tab-active:text-dark dark:hover:text-dark hover:bg-primary hover:text-white active"
              id="tab-28"
              aria-selected="true"
              data-hs-tab="#tab-028"
              aria-controls="tab-028"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white hs-tab-active:bg-primary whitespace-nowrap dark:hs-tab-active:text-dark dark:hover:text-dark hover:bg-primary hover:text-white"
              id="tab-29"
              aria-selected="false"
              data-hs-tab="#tab-029"
              aria-controls="tab-029"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white hs-tab-active:bg-primary whitespace-nowrap dark:hs-tab-active:text-dark dark:hover:text-dark hover:bg-primary hover:text-white"
              id="tab-30"
              aria-selected="false"
              data-hs-tab="#tab-030"
              aria-controls="tab-030"
              role="tab"
            >
              Messages
            </button>
          </nav>
        </div>
        <div>
          <div id="tab-028" role="tabpanel" aria-labelledby="tab-28">
            <p>
              {" "}
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              Making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur.{" "}
            </p>
          </div>
          <div
            id="tab-029"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-29"
          >
            <p>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries{" "}
            </p>
          </div>
          <div
            id="tab-030"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-30"
          >
            <p>
              {" "}
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything.{" "}
            </p>
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
          {"\n"}&lt;div class="preview-content"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;nav class="flex justify-between gap-x-2"
          aria-label="Tabs" role="tablist" aria-orientation="horizontal"&gt;
          {"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white
          hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary
          hover:text-white active" id="tab-28" aria-selected="true"
          data-hs-tab="#tab-028" aria-controls="tab-028" role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white
          hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary
          hover:text-white" id="tab-29" aria-selected="false"
          data-hs-tab="#tab-029" aria-controls="tab-029" role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white
          hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary
          hover:text-white" id="tab-30" aria-selected="false"
          data-hs-tab="#tab-030" aria-controls="tab-030" role="tab"&gt;{"\n"}
          {"                "}Messages{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div&gt;{"\n"}
          {"        "}&lt;div id="tab-028" role="tabpanel"
          aria-labelledby="tab-28"&gt;{"\n"}
          {"            "}&lt;p&gt; Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, Making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-029" class="hidden" role="tabpanel"
          aria-labelledby="tab-29"&gt;{"\n"}
          {"            "}&lt;p&gt; Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries &lt;/p&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-030" class="hidden" role="tabpanel"
          aria-labelledby="tab-30"&gt;{"\n"}
          {"            "}&lt;p&gt; There are many variations of passages of
          Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything. &lt;/p&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Vertical alignment with lists</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-12 gap-4">
        <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-12">
          <nav
            className="flex flex-col"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary hs-tab-active:border hs-tab-active:border-primary dark:hs-tab-active:text-dark dark:hover:text-dark whitespace-nowrap hover:border-primary hover:text-primary active"
              id="tab-31"
              aria-selected="true"
              data-hs-tab="#tab-031"
              aria-controls="tab-031"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary hs-tab-active:border hs-tab-active:border-primary dark:hs-tab-active:text-dark dark:hover:text-dark whitespace-nowrap hover:border-primary hover:text-primary"
              id="tab-32"
              aria-selected="false"
              data-hs-tab="#tab-032"
              aria-controls="tab-032"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary hs-tab-active:border hs-tab-active:border-primary  whitespace-nowrap hover:border-primary hover:text-primary"
              id="tab-33"
              aria-selected="false"
              data-hs-tab="#tab-033"
              aria-controls="tab-033"
              role="tab"
            >
              About
            </button>
          </nav>
        </div>
        <div className="xl:col-span-9 lg:col-span-8 md:col-span-9 col-span-12">
          <div id="tab-031" role="tabpanel" aria-labelledby="tab-31">
            <p>
              {" "}
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything.{" "}
            </p>
          </div>
          <div
            id="tab-032"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-32"
          >
            <p>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.{" "}
            </p>
          </div>
          <div
            id="tab-033"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-33"
          >
            <p>
              {" "}
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              Making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur.{" "}
            </p>
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
          {"\n"}&lt;div class="preview-content grid grid-cols-1 md:grid-cols-12
          gap-4"&gt; {"\n"}
          {"    "}&lt;div class="col-span-3"&gt;{"\n"}
          {"        "}&lt;nav class="flex flex-col" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary
          hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap
          hover:border-primary hover:text-primary active" id="tab-31"
          aria-selected="true" data-hs-tab="#tab-031" aria-controls="tab-031"
          role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary
          hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap
          hover:border-primary hover:text-primary" id="tab-32"
          aria-selected="false" data-hs-tab="#tab-032" aria-controls="tab-032"
          role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-primary
          hs-tab-active:border hs-tab-active:border-primary whitespace-nowrap
          hover:border-primary hover:text-primary" id="tab-33"
          aria-selected="false" data-hs-tab="#tab-033" aria-controls="tab-033"
          role="tab"&gt;{"\n"}
          {"                "}About{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="col-span-9"&gt;{"\n"}
          {"        "}&lt;div id="tab-031" role="tabpanel"
          aria-labelledby="tab-31"&gt;{"\n"}
          {"            "}&lt;p&gt; There are many variations of passages of
          Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything. &lt;/p&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-032" class="hidden" role="tabpanel"
          aria-labelledby="tab-32"&gt;{"\n"}
          {"            "}&lt;p&gt; Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries. &lt;/p&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-033" class="hidden" role="tabpanel"
          aria-labelledby="tab-33"&gt;{"\n"}
          {"            "}&lt;p&gt; Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, Making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Vertical alignment with links</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-12 gap-4">
        <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-12">
          <nav
            className="flex flex-col"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white hs-tab-active:border hs-tab-active:bg-primary whitespace-nowrap dark:hs-tab-active:text-dark dark:hover:text-dark hover:border-primary hover:text-primary active"
              id="tab-34"
              aria-selected="true"
              data-hs-tab="#tab-034"
              aria-controls="tab-034"
              role="tab"
            >
              Home
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white hs-tab-active:border hs-tab-active:bg-primary dark:hs-tab-active:text-dark dark:hover:text-dark whitespace-nowrap hover:border-primary hover:text-primary"
              id="tab-35"
              aria-selected="false"
              data-hs-tab="#tab-035"
              aria-controls="tab-035"
              role="tab"
            >
              Profile
            </button>
            <button
              type="button"
              className="py-2 px-4 hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white hs-tab-active:border hs-tab-active:bg-primary dark:hs-tab-active:text-dark dark:hover:text-dark whitespace-nowrap hover:border-primary hover:text-primary"
              id="tab-36"
              aria-selected="false"
              data-hs-tab="#tab-036"
              aria-controls="tab-036"
              role="tab"
            >
              About
            </button>
          </nav>
        </div>
        <div className="xl:col-span-9 lg:col-span-8 md:col-span-9 col-span-12">
          <div id="tab-034" role="tabpanel" aria-labelledby="tab-34">
            <p>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.{" "}
            </p>
          </div>
          <div
            id="tab-035"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-35"
          >
            <p>
              {" "}
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              Making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur.{" "}
            </p>
          </div>
          <div
            id="tab-036"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-36"
          >
            <p>
              {" "}
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              Making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur.{" "}
            </p>
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
          {"\n"}&lt;div class="preview-content grid grid-cols-1 md:grid-cols-12
          gap-4"&gt;{"\n"}
          {"    "}&lt;div class="col-span-3"&gt;{"\n"}
          {"        "}&lt;nav class="flex flex-col" aria-label="Tabs"
          role="tablist" aria-orientation="horizontal"&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white
          hs-tab-active:border hs-tab-active:bg-primary whitespace-nowrap
          hover:border-primary hover:text-primary active" id="tab-34"
          aria-selected="true" data-hs-tab="#tab-034" aria-controls="tab-034"
          role="tab"&gt;{"\n"}
          {"                "}Home{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white
          hs-tab-active:border hs-tab-active:bg-primary whitespace-nowrap
          hover:border-primary hover:text-primary" id="tab-35"
          aria-selected="false" data-hs-tab="#tab-035" aria-controls="tab-035"
          role="tab"&gt;{"\n"}
          {"                "}Profile{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="py-2 px-4
          hs-tab-active:font-semibold rounded-lg hs-tab-active:text-white
          hs-tab-active:border hs-tab-active:bg-primary whitespace-nowrap
          hover:border-primary hover:text-primary" id="tab-36"
          aria-selected="false" data-hs-tab="#tab-036" aria-controls="tab-036"
          role="tab"&gt;{"\n"}
          {"                "}About{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"        "}&lt;/nav&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="col-span-9"&gt;{"\n"}
          {"        "}&lt;div id="tab-034" role="tabpanel"
          aria-labelledby="tab-34"&gt;{"\n"}
          {"            "}&lt;p&gt; Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries. &lt;/p&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-035" class="hidden" role="tabpanel"
          aria-labelledby="tab-35"&gt;{"\n"}
          {"            "}&lt;p&gt; Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, Making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"        "}&lt;div id="tab-036" class="hidden" role="tabpanel"
          aria-labelledby="tab-36"&gt;{"\n"}
          {"            "}&lt;p&gt; Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, Making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur. &lt;/p&gt;
          {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
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

export default UiTabs