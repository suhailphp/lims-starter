import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiOffcanvas = () => {
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
   useEffect(() => {
      window.HSStaticMethods?.autoInit();
    }, []);
  return (
    <>
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
            Offcanvas
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 gap-6">
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Default Offcanvas</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-center gap-6">
        <Link
          to="#"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="offcanvas-link"
          data-hs-overlay="#offcanvas-link"
        >
          Link with href
        </Link>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="offcanvas-button"
          data-hs-overlay="#offcanvas-button"
        >
          Button with Offcanvas
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="offcanvas-dark"
          data-hs-overlay="#offcanvas-dark"
        >
          Dark Offcanvas
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-center gap-6"&gt;{"\n"}
          {"\t"}&lt;a to="#" class="btn-sm text-white bg-primary inline-flex
          items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="offcanvas-link" data-hs-overlay="#offcanvas-link"&gt;
          {"\n"}
          {"\t"}
          {"\t"}Link with href{"\n"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="offcanvas-button"
          data-hs-overlay="#offcanvas-button"&gt;{"\n"}
          {"\t"}
          {"\t"}Button with Offcanvas{"\n"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="offcanvas-dark" data-hs-overlay="#offcanvas-dark"&gt;
          {"\n"}
          {"\t"}
          {"\t"}Dark Offcanvas{"\n"}
          {"\t"}&lt;/button&gt; {"\n"}&lt;/div&gt; {"\n"}
          {"\n"}&lt;!-- Link with Offcanvas start --&gt;{"\n"}&lt;div
          id="offcanvas-link" class="hs-overlay hs-overlay-open:translate-x-0
          hidden translate-x-full fixed top-0 end-0 transition-all duration-300
          transform h-full max-w-xs w-full z-80 bg-white" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"\t"}&lt;div class="flex justify-between items-center py-3 px-4
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h3 class="font-semibold text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Link With Offcanvas{"\n"}
          {"\t"}
          {"\t"}&lt;/h3&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="size-8 inline-flex
          justify-center items-center gap-x-2 rounded-full border
          border-border-color bg-white hover:bg-danger text-danger
          hover:text-white focus:outline-hidden focus:bg-gray-200"
          aria-label="Close" data-hs-overlay="#offcanvas-link"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="sr-only"&gt;Close&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="p-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;!-- Link with Offcanvas
          start --&gt;{"\n"}
          {"\n"}&lt;!-- Button Offcanvas start --&gt; {"\n"}&lt;div
          id="offcanvas-button" class="hs-overlay hs-overlay-open:translate-x-0
          hidden -translate-x-full fixed top-0 start-0 transition-all
          duration-300 transform h-full max-w-xs w-full z-80 bg-white border-s
          border-border-color" role="dialog" tabindex="-1"&gt;{"\n"}
          {"\t"}&lt;div class="flex justify-between items-center py-3 px-4
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h3 class="font-bold text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Button Offcanvas{"\n"}
          {"\t"}
          {"\t"}&lt;/h3&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="size-8 inline-flex
          justify-center items-center gap-x-2 rounded-full border
          border-border-color bg-white hover:bg-danger text-danger
          hover:text-white focus:outline-hidden focus:bg-gray-200"
          aria-label="Close" data-hs-overlay="#offcanvas-button"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="sr-only"&gt;Close&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="p-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;!-- Button Offcanvas end
          --&gt;{"\n"}
          {"\n"}&lt;!-- Dark Offcanvas start --&gt;{"\n"}&lt;div
          id="offcanvas-dark" class="hs-overlay bg-dark
          hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0
          start-0 transition-all duration-300 transform h-full max-w-xs w-full
          z-80 border-s border-border-color" role="dialog" tabindex="-1"
          aria-labelledby="hs-offcanvas-dark-label"&gt;{"\n"}
          {"\t"}&lt;div class="flex justify-between items-center py-3 px-4
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h3 id="hs-offcanvas-dark-label" class="font-semibold
          text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Dark Offcanvas{"\n"}
          {"\t"}
          {"\t"}&lt;/h3&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="size-8 inline-flex
          justify-center items-center gap-x-2 rounded-full border
          border-border-color bg-white hover:bg-danger text-danger
          hover:text-white focus:outline-hidden focus:bg-gray-200"
          aria-label="Close" data-hs-overlay="#offcanvas-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="sr-only"&gt;Close&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="p-4 text-white"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;!-- Dark Offcanvas end
          --&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Positions Offcanvas</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-wrap items-center gap-6">
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="offcanvas-right"
          data-hs-overlay="#offcanvas-right"
        >
          Toggle right offcanvas
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="offcanvas-left"
          data-hs-overlay="#offcanvas-left"
        >
          Toggle left offcanvas
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="offcanvas-top"
          data-hs-overlay="#offcanvas-top"
        >
          Toggle top offcanvas
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="offcanvas-bottom"
          data-hs-overlay="#offcanvas-bottom"
        >
          Toggle bottom offcanvas
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {" "}
          {"\n"}&lt;div class="pb-5 mb-5 flex items-center xxl:gap-0 gap-3
          justify-between flex-wrap border-b border-border-color"&gt;{"\n"}
          {"\t"}&lt;h5&gt;Positions Offcanvas&lt;/h5&gt;{"\n"}
          {"\t"}&lt;button type="button" data-toggle="code" class="flex
          items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color
          font-semibold rounded-md bg-light-200 dark:bg-gray-100
          focus:bg-primary focus:border-primary focus:text-white text-gray-900
          dark:text-dark dark:focus:text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-eye"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="code-btn"&gt;Show Code&lt;/span&gt;{"\n"}
          {"\t"}&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;div class="flex
          items-center gap-6"&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="offcanvas-right" data-hs-overlay="#offcanvas-right"&gt;
          {"\n"}
          {"\t"}
          {"\t"}Toggle right offcanvas{"\n"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="offcanvas-left" data-hs-overlay="#offcanvas-left"&gt;
          {"\n"}
          {"\t"}
          {"\t"}Toggle left offcanvas{"\n"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="offcanvas-top" data-hs-overlay="#offcanvas-top"&gt;
          {"\n"}
          {"\t"}
          {"\t"}Toggle top offcanvas{"\n"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="offcanvas-bottom"
          data-hs-overlay="#offcanvas-bottom"&gt;{"\n"}
          {"\t"}
          {"\t"}Toggle bottom offcanvas{"\n"}
          {"\t"}&lt;/button&gt;{"\n"}&lt;/div&gt;{"   "}
          {"\n"}
          {"\n"}
          {"\n"}&lt;!-- Top Offcanvas start --&gt;{"\n"}&lt;div
          id="offcanvas-top" class="hs-overlay hs-overlay-open:translate-y-0
          -translate-y-full fixed top-0 inset-x-0 transition-all duration-300
          transform max-h-40 size-full z-80 bg-white border-b
          border-border-color hidden" role="dialog" tabindex="-1"
          aria-labelledby="hs-offcanvas-top-label"&gt;{"\n"}
          {"\t"}&lt;div class="flex justify-between items-center py-3 px-4
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h3 id="hs-offcanvas-top-label" class="font-semibold
          text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Top Offcanvas{"\n"}
          {"\t"}
          {"\t"}&lt;/h3&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="size-8 inline-flex
          justify-center items-center gap-x-2 rounded-full border
          border-border-color bg-white hover:bg-danger text-danger
          hover:text-white focus:outline-hidden focus:bg-gray-200"
          aria-label="Close" data-hs-overlay="#offcanvas-top"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="sr-only"&gt;Close&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="p-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;!-- Top Offcanvas end
          --&gt;{"\n"}
          {"\n"}&lt;!-- Left Offcanvas start --&gt; {"\n"}&lt;div
          id="offcanvas-left" class="hs-overlay hs-overlay-open:translate-x-0
          hidden -translate-x-full fixed top-0 start-0 transition-all
          duration-300 transform h-full max-w-xs w-full z-80 bg-white border-s
          border-border-color" role="dialog" tabindex="-1"&gt;{"\n"}
          {"\t"}&lt;div class="flex justify-between items-center py-3 px-4
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h3 class="font-bold text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Left Offcanvas{"\n"}
          {"\t"}
          {"\t"}&lt;/h3&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="size-8 inline-flex
          justify-center items-center gap-x-2 rounded-full border
          border-border-color bg-white hover:bg-danger text-danger
          hover:text-white focus:outline-hidden focus:bg-gray-200"
          aria-label="Close" data-hs-overlay="#offcanvas-left"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="sr-only"&gt;Close&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="p-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;!-- Left Offcanvas end
          --&gt;{"\n"}
          {"\n"}&lt;!-- Bottom Offcanvas start --&gt;{"  "}
          {"\n"}&lt;div id="offcanvas-bottom" class="hs-overlay
          hs-overlay-open:translate-y-0 translate-y-full fixed bottom-0
          inset-x-0 transition-all duration-300 transform max-h-40 size-full
          z-80 bg-white hidden" role="dialog" tabindex="-1"
          aria-labelledby="hs-offcanvas-bottom-label"&gt;{"\n"}
          {"\t"}&lt;div class="flex justify-between items-center py-3 px-4
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h3 id="hs-offcanvas-bottom-label" class="font-semibold
          text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Bottom Offcanvas{"\n"}
          {"\t"}
          {"\t"}&lt;/h3&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="size-8 inline-flex
          justify-center items-center gap-x-2 rounded-full border
          border-border-color bg-white hover:bg-danger text-danger
          hover:text-white focus:outline-hidden focus:bg-gray-200"
          aria-label="Close" data-hs-overlay="#offcanvas-bottom"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="sr-only"&gt;Close&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="p-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;!-- Bottom Offcanvas
          start --&gt;{"  "}
          {"\n"}
          {"\n"}&lt;!-- Right Offcanvas start --&gt;{"\n"}&lt;div
          id="offcanvas-right" class="hs-overlay hs-overlay-open:translate-x-0
          hidden translate-x-full fixed top-0 end-0 transition-all duration-300
          transform h-full max-w-xs w-full z-80 bg-white" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"\t"}&lt;div class="flex justify-between items-center py-3 px-4
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h3 class="font-semibold text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Right Offcanvas{"\n"}
          {"\t"}
          {"\t"}&lt;/h3&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="size-8 inline-flex
          justify-center items-center gap-x-2 rounded-full border
          border-border-color bg-white hover:bg-danger text-danger
          hover:text-white focus:outline-hidden focus:bg-gray-200"
          aria-label="Close" data-hs-overlay="#offcanvas-right"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;span class="sr-only"&gt;Close&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="p-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Some text as placeholder. In real life you can have the elements
          you have chosen. Like, text, images, lists, etc.{"\n"}
          {"\t"}
          {"\t"}&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}&lt;!-- Right Offcanvas
          start --&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
  </div>
  {/* End grid */}
</div>

  {/* Link with Offcanvas start */}
  <div
    id="offcanvas-link"
    className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-80 bg-white"
    role="dialog"
    tabIndex={-1}
  >
    <div className="flex justify-between items-center py-3 px-4 border-b border-border-color">
      <h4 className="font-bold text-dark">Link With Offcanvas</h4>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger text-danger hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#offcanvas-link"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-4">
      <h5 className="text-lg max-lg:text-[16px] mb-1">Title</h5>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
    </div>
  </div>
  {/* Link with Offcanvas start */}
  {/* Button Offcanvas start */}
  <div
    id="offcanvas-button"
    className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-80 bg-white border-s border-border-color"
    role="dialog"
    tabIndex={-1}
  >
    <div className="flex justify-between items-center py-3 px-4 border-b border-border-color">
      <h4 className="font-bold text-dark">Button Offcanvas</h4>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border  border-border-color bg-white hover:bg-danger text-danger hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#offcanvas-button"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-4">
      <h5 className="text-lg max-lg:text-[16px] mb-1">Title</h5>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
    </div>
  </div>
  {/* Button Offcanvas end */}
  {/* Dark Offcanvas start */}
  <div
    id="offcanvas-dark"
    className="hs-overlay bg-dark hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-80  border-s border-border-color"
    role="dialog"
    tabIndex={-1}
    aria-labelledby="hs-offcanvas-dark-label"
  >
    <div className="flex justify-between items-center py-3 px-4 border-b border-border-color">
      <h4
        id="hs-offcanvas-dark-label"
        className="font-bold text-white dark:text-white!"
      >
        Dark Offcanvas
      </h4>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger text-danger hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#offcanvas-dark"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-4 text-white dark:text-white!">
      <h4 className="text-lg max-lg:text-[16px] mb-1">Title</h4>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
    </div>
  </div>
  {/* Dark Offcanvas end */}
  {/* Top Offcanvas start */}
  <div
    id="offcanvas-top"
    className="hs-overlay hs-overlay-open:translate-y-0 -translate-y-full fixed top-0 inset-x-0 transition-all duration-300 transform z-80 bg-white border-b border-border-color hidden"
    role="dialog"
    tabIndex={-1}
    aria-labelledby="hs-offcanvas-top-label"
  >
    <div className="flex justify-between items-center py-3 px-4 border-b border-border-color">
      <h4 id="hs-offcanvas-top-label" className="font-bold text-dark">
        Top Offcanvas
      </h4>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger text-danger hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#offcanvas-top"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-4">
      <h5 className="text-lg max-lg:text-[16px] mb-1">Title</h5>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
    </div>
  </div>
  {/* Top Offcanvas end */}
  {/* Left Offcanvas start */}
  <div
    id="offcanvas-left"
    className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-80 bg-white border-s border-border-color"
    role="dialog"
    tabIndex={-1}
  >
    <div className="flex justify-between items-center py-3 px-4 border-b border-border-color">
      <h4 className="font-bold text-dark">Left Offcanvas</h4>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border  border-border-color bg-white hover:bg-danger text-danger hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#offcanvas-left"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-4">
      <h4 className="text-lg max-lg:text-[16px] mb-1">Title</h4>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
    </div>
  </div>
  {/* Left Offcanvas end */}
  {/* Bottom Offcanvas start */}
  <div
    id="offcanvas-bottom"
    className="hs-overlay hs-overlay-open:translate-y-0 translate-y-full fixed bottom-0 inset-x-0 transition-all duration-300 transform  z-80 bg-white hidden"
    role="dialog"
    tabIndex={-1}
    aria-labelledby="hs-offcanvas-bottom-label"
  >
    <div className="flex justify-between items-center py-3 px-4 border-b border-border-color">
      <h4 id="hs-offcanvas-bottom-label" className="font-bold text-dark">
        Bottom Offcanvas
      </h4>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border  border-border-color bg-white hover:bg-danger text-danger hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#offcanvas-bottom"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-4">
      <h5 className="text-lg max-lg:text-[16px] mb-1">Title</h5>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
    </div>
  </div>
  {/* Bottom Offcanvas start */}
  {/* Right Offcanvas start */}
  <div
    id="offcanvas-right"
    className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-80 bg-white"
    role="dialog"
    tabIndex={-1}
  >
    <div className="flex justify-between items-center py-3 px-4 border-b border-border-color">
      <h4 className="font-bold text-dark">Right Offcanvas</h4>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger text-danger hover:text-white focus:outline-hidden focus:bg-gray-200"
        aria-label="Close"
        data-hs-overlay="#offcanvas-right"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-4">
      <h5 className="text-lg max-lg:text-[16px] mb-1">Title</h5>
      <p>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </p>
    </div>
  </div>
  {/* Right Offcanvas start */}
</>

  )
}

export default UiOffcanvas