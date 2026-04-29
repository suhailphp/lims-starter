import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiProgress = () => {
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
            Progress
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* start grid */}
  <div className="grid grid-cols-12 gap-6">
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Basic Progress</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-primary" style={{ width: "0%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-primary" style={{ width: "25%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-primary" style={{ width: "50%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-primary" style={{ width: "75%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-primary"
            style={{ width: "100%" }}
          />
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary" style="width:
          0%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary" style="width:
          25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary" style="width:
          50%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary" style="width:
          75%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary" style="width:
          100%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Colored Progress</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-primary" style={{ width: "10%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-success" style={{ width: "25%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-info" style={{ width: "50%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-dark" style={{ width: "75%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-danger" style={{ width: "100%" }} />
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary" style="width:
          10%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-success" style="width:
          25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-info" style="width:
          50%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-dark" style="width:
          75%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-danger" style="width:
          100%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Striped Progress</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-success bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
            style={{ width: "10%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-dark bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
            style={{ width: "25%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-danger bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
            style={{ width: "50%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-primary bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
            style={{ width: "75%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-info bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
            style={{ width: "100%" }}
          />
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-success
          bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]
          bg-[length:1rem_1rem]" style="width: 10%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-dark
          bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]
          bg-[length:1rem_1rem]" style="width: 25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-danger
          bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]
          bg-[length:1rem_1rem]" style="width: 50%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary
          bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]
          bg-[length:1rem_1rem]" style="width: 75%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-info
          bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]
          bg-[length:1rem_1rem]" style="width: 100%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Progress Height</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="bg-border-color w-full h-1 rounded-lg">
          <div className="rounded-lg h-1 bg-primary" style={{ width: "10%" }} />
        </div>
        <div className="bg-border-color w-full h-2 rounded-lg">
          <div className="rounded-lg h-2 bg-primary" style={{ width: "25%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-primary" style={{ width: "50%" }} />
        </div>
        <div className="bg-border-color w-full h-4 rounded-lg">
          <div className="rounded-lg h-4 bg-primary" style={{ width: "75%" }} />
        </div>
        <div className="bg-border-color w-full h-5 rounded-lg">
          <div
            className="rounded-lg h-5 bg-primary"
            style={{ width: "100%" }}
          />
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-1 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-1 bg-primary" style="width:
          10%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-2 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-2 bg-primary" style="width:
          25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary" style="width:
          50%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-4 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-4 bg-primary" style="width:
          75%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-5 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-5 bg-primary" style="width:
          100%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Progress With Labels</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-primary text-white text-center p-0.5 text-xs leading-none flex flex-col justify-center overflow-hidden"
            style={{ width: "10%" }}
          >
            10%
          </div>
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-success text-white text-center p-0.5 text-xs leading-none flex flex-col justify-center overflow-hidden"
            style={{ width: "25%" }}
          >
            25%
          </div>
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-info text-white text-center p-0.5 text-xs leading-none flex flex-col justify-center overflow-hidden"
            style={{ width: "50%" }}
          >
            50%
          </div>
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-dark text-white text-center p-0.5 text-xs leading-none flex flex-col justify-center overflow-hidden"
            style={{ width: "75%" }}
          >
            75%
          </div>
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-danger text-white text-center p-0.5 text-xs leading-none flex flex-col justify-center overflow-hidden"
            style={{ width: "100%" }}
          >
            100%
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary text-white text-center
          p-0.5 text-xs leading-none flex flex-col justify-center
          overflow-hidden" style="width: 10%"&gt;10%&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-success text-white text-center
          p-0.5 text-xs leading-none flex flex-col justify-center
          overflow-hidden" style="width: 25%"&gt;25%&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-info text-white text-center
          p-0.5 text-xs leading-none flex flex-col justify-center
          overflow-hidden" style="width: 50%"&gt;50%&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-dark text-white text-center
          p-0.5 text-xs leading-none flex flex-col justify-center
          overflow-hidden" style="width: 75%"&gt;75%&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-danger text-white text-center
          p-0.5 text-xs leading-none flex flex-col justify-center
          overflow-hidden" style="width: 100%"&gt;100%&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Multiple bars With Sizes</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="flex bg-border-color w-full h-1 rounded-lg">
          <div className="rounded-lg h-1 bg-primary" style={{ width: "5%" }} />
          <div className="rounded-lg h-1 bg-success" style={{ width: "10%" }} />
          <div className="rounded-lg h-1 bg-dark" style={{ width: "15%" }} />
        </div>
        <div className="flex bg-border-color w-full h-2 rounded-lg">
          <div className="rounded-lg h-2 bg-info" style={{ width: "10%" }} />
          <div className="rounded-lg h-2 bg-danger" style={{ width: "15%" }} />
          <div className="rounded-lg h-2 bg-primary" style={{ width: "20%" }} />
        </div>
        <div className="flex bg-border-color w-full h-3 rounded-lg">
          <div className="rounded-lg h-3 bg-dark" style={{ width: "15%" }} />
          <div className="rounded-lg h-3 bg-warning" style={{ width: "20%" }} />
          <div className="rounded-lg h-3 bg-info" style={{ width: "25%" }} />
        </div>
        <div className="flex bg-border-color w-full h-4 rounded-lg">
          <div className="rounded-lg h-4 bg-success" style={{ width: "20%" }} />
          <div className="rounded-lg h-4 bg-warning" style={{ width: "25%" }} />
          <div className="rounded-lg h-4 bg-dark" style={{ width: "30%" }} />
        </div>
        <div className="flex bg-border-color w-full h-5 rounded-lg">
          <div className="rounded-lg h-5 bg-danger" style={{ width: "25%" }} />
          <div className="rounded-lg h-5 bg-info" style={{ width: "30%" }} />
          <div className="rounded-lg h-5 bg-primary" style={{ width: "35%" }} />
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="flex bg-border-color w-full h-1 rounded-lg"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-1 bg-primary" style="width:
          5%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-1 bg-success" style="width:
          10%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-1 bg-dark" style="width:
          15%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex bg-border-color w-full h-2 rounded-lg"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-2 bg-info" style="width:
          10%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-2 bg-danger" style="width:
          15%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-2 bg-primary" style="width:
          20%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex bg-border-color w-full h-3 rounded-lg"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-dark" style="width:
          15%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-warning" style="width:
          20%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-info" style="width:
          25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex bg-border-color w-full h-4 rounded-lg"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-4 bg-success" style="width:
          20%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-4 bg-warning" style="width:
          25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-4 bg-dark" style="width:
          30%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex bg-border-color w-full h-5 rounded-lg"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-5 bg-danger" style="width:
          25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-5 bg-info" style="width:
          30%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-5 bg-primary" style="width:
          35%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Animated Stripped Progress</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="bg-border-color w-full h-3 rounded-lg overflow-hidden">
          <div
            className="striped-progress bg-success"
            style={{ width: "10%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg overflow-hidden">
          <div className="striped-progress bg-dark" style={{ width: "25%" }} />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg overflow-hidden">
          <div
            className="striped-progress bg-danger"
            style={{ width: "50%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg overflow-hidden">
          <div
            className="striped-progress bg-primary"
            style={{ width: "75%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg overflow-hidden">
          <div className="striped-progress bg-info" style={{ width: "100%" }} />
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="striped-progress bg-success"
          style="width:10%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="striped-progress bg-dark"
          style="width:25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="striped-progress bg-danger"
          style="width:50%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="striped-progress bg-primary"
          style="width:75%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="striped-progress bg-info"
          style="width:100%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Gradient Progress</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-4">
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-primary-gradient"
            style={{ width: "10%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-success-gradient-200"
            style={{ width: "25%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-info-gradient-200"
            style={{ width: "50%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-dark-gradient"
            style={{ width: "75%" }}
          />
        </div>
        <div className="bg-border-color w-full h-3 rounded-lg">
          <div
            className="rounded-lg h-3 bg-danger-gradient"
            style={{ width: "100%" }}
          />
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
          {"\n"}&lt;div class="preview-content flex flex-col gap-4"&gt; {"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-primary-gradient" style="width:
          10%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg--200" style="width:
          25%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-info-gradient=200"
          style="width: 50%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-dark-gradient" style="width:
          75%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="bg-border-color w-full h-3 rounded-lg"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="rounded-lg h-3 bg-danger-gradient" style="width:
          100%"&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
  </div>
  {/* end grid */}
</div>

  )
}

export default UiProgress