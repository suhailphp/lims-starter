import  { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiGrid = () => {
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
            Grid
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 gap-6 items-baseline">
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Grid Example</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 p-3 text-white bg-primary rounded-lg dark:text-title-dark">
          1 of 2
        </div>
        <div className="md:col-span-6 p-3 text-white bg-primary rounded-lg dark:text-title-dark">
          2 of 2
        </div>
        <div className="md:col-span-4 p-3 text-white bg-primary rounded-lg dark:text-title-dark">
          1 of 3
        </div>
        <div className="md:col-span-4 p-3 text-white bg-primary rounded-lg dark:text-title-dark">
          2 of 3
        </div>
        <div className="md:col-span-4 p-3 text-white bg-primary rounded-lg dark:text-title-dark">
          3 of 3
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
          {"\n"}&lt;div class="grid w-full grid-cols-12 gap-6"&gt;{"\n"}
          {"\t"}&lt;div class="col-span-6 p-3 text-white bg-primary rounded-lg
          dark:text-title-dark mb-4"&gt;1 of 2&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-6 p-3 text-white bg-primary rounded-lg
          dark:text-title-dark mb-4"&gt;2 of 2&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-4 p-3 text-white bg-primary rounded-lg
          dark:text-title-dark mb-4"&gt;1 of 3&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-4 p-3 text-white bg-primary rounded-lg
          dark:text-title-dark mb-4"&gt;2 of 3&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-4 p-3 text-white bg-primary rounded-lg
          dark:text-title-dark mb-4"&gt;3 of 3&lt;/div&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Grid Example 2</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-1 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-1</span>
        </div>
        <div className="md:col-span-2 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-2</span>
        </div>
        <div className="md:col-span-2 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-2</span>
        </div>
        <div className="md:col-span-3 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-3</span>
        </div>
        <div className="md:col-span-4 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-4</span>
        </div>
        <div className="md:col-span-5 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-5</span>
        </div>
        <div className="md:col-span-7 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-7</span>
        </div>
        <div className="md:col-span-6 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-6</span>
        </div>
        <div className="md:col-span-6 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-6</span>
        </div>
        <div className="md:col-span-8 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-8</span>
        </div>
        <div className="md:col-span-4 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-4</span>
        </div>
        <div className="md:col-span-9 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-9</span>
        </div>
        <div className="md:col-span-10 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-10</span>
        </div>
        <div className="md:col-span-2 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-2</span>
        </div>
        <div className="md:col-span-12 text-center bg-primary text-white p-2 rounded-lg">
          <span>col-span-12</span>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {" "}
          {"\n"}&lt;div class="grid md:grid-cols-12 gap-6"&gt;{"\n"}
          {"\t"}&lt;div class="col-span-1 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-1&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-2 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-2&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-2 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-2&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-3 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-3&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-4 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-4&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-5 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-5&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-7 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-7&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-6 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-6&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-6 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-6&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-8 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-8&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-4 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-4&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-9 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-9&lt;/span&gt;&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="col-span-10 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-10&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-2 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-2&lt;/span&gt;&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="col-span-12 text-center bg-primary text-white p-2
          rounded-lg"&gt;&lt;span&gt;col-span-12&lt;/span&gt;&lt;/div&gt;{"\n"}
          &lt;/div&gt;{"\n"}
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

export default UiGrid