
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiAccordion = () => {
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
            Accordions
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
        <h5>Default Accordion</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-1"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-1"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-2"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-2"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-3"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-3"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-1"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-1" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;It is hidden by
          default, until the collapse plugin adds the appropriate classes that
          we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS
          transitions.&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-2"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-2" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;It is hidden by
          default, until the collapse plugin adds the appropriate classes that
          we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS
          transitions.&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-3"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-3" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;It is hidden by
          default, until the collapse plugin adds the appropriate classes that
          we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS
          transitions.&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Flush Accordions</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-b border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-4"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-4"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-b border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-5"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-5"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-b border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-6"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-6"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden">
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
        </button>
        {"\n"}
        {"\n"}
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border-b
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-4"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-chevron-down"&gt;&lt;/i&gt;
          {"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-chevron-up"&gt;&lt;/i&gt;
          {"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"\n"}
          {"        "}&lt;div id="acc-4" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border-b
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-5"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-chevron-down"&gt;&lt;/i&gt;
          {"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-chevron-up"&gt;&lt;/i&gt;
          {"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"\n"}
          {"        "}&lt;div id="acc-5" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border-b
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-6"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-chevron-down"&gt;&lt;/i&gt;
          {"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-chevron-up"&gt;&lt;/i&gt;
          {"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"\n"}
          {"        "}&lt;div id="acc-6" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Bordered Accordions</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-border-color rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-7"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-7"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-border-color rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-8"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-8"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-border-color rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-9"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-9"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active border border-border-color
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg
          hs-accordion-active:border-b border-0 border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-7"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-7" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-border-color
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg
          hs-accordion-active:border-b border-0 border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-8"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-8" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-border-color
          rounded-lg"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg
          hs-accordion-active:border-b border-0 border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-9"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-9" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Custom Icon Accordion</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-border-color rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-10"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-plus" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-minus" />
            </span>
          </button>
          <div
            id="acc-10"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-border-color rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-11"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-circle-plus" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-circle-minus" />
            </span>
          </button>
          <div
            id="acc-11"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-border-color rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-12"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-square-plus" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-square-minus" />
            </span>
          </button>
          <div
            id="acc-12"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active border border-border-color
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg
          hs-accordion-active:border-b border-0 border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-10"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-plus"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-minus"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"   "}
          {"\n"}
          {"        "}&lt;div id="acc-10" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-border-color
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg
          hs-accordion-active:border-b border-0 border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-11"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-circle-plus"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-circle-minus"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-11" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-border-color
          rounded-lg"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:rounded-t-lg
          hs-accordion-active:border-b border-0 border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-12"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-square-plus"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-square-minus"&gt;&lt;/i&gt;&lt;/span&gt;{"  "}
          {"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-12" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Always Open Accordions</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-13"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-13"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-14"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-14"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-15"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-15"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-13" &gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;{"\n"}
          {"            "}&lt;i class="icon icon-chevron-up"&gt;&lt;/i&gt;{"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;div id="acc-13" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-14"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-14" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-15"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-15" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Accordion Without Arrow</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-16"
          >
            Accordion #1
          </button>
          <div
            id="acc-16"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-17"
          >
            Accordion #2
          </button>
          <div
            id="acc-17"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-light hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-18"
          >
            Accordion #3
          </button>
          <div
            id="acc-18"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"    "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-16"&gt;{"\n"}
          {"        "}Accordion #1{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-16" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"    "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-17"&gt;{"\n"}
          {"        "}Accordion #2{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-17" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"    "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-light hs-accordion-active:border-0 border
          border-border-color inline-flex items-center gap-x-3 w-full
          font-semibold text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-18"&gt;{"\n"}
          {"        "}Accordion #3{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-18" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Primary - Light Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-primary-100 hs-accordion-active:text-primary hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-55"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-55"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-primary-100 hs-accordion-active:text-primary hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-56"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-56"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-primary-100 hs-accordion-active:text-primary hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-57"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-57"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-primary-100 hs-accordion-active:text-primary
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-55"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;div id="acc-55" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-primary-100 hs-accordion-active:text-primary
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-56"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-56" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-primary-100 hs-accordion-active:text-primary
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-57"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-57" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dark - Light Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-gray-100 hs-accordion-active:text-dark hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-58"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-58"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-gray-100 hs-accordion-active:text-dark hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-59"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-59"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-gray-100 hs-accordion-active:text-dark hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-60"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-60"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-gray-100 hs-accordion-active:text-dark
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-58"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-58" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-gray-100 hs-accordion-active:text-dark
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-59"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-59" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-gray-100 hs-accordion-active:text-dark
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-60"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-60" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Primary - Solid Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-primary hs-accordion-active:text-white hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-19"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-19"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-primary hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-20"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-20"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-primary hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-21"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-21"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-primary hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-19"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"  "}
          {"\n"}
          {"        "}&lt;div id="acc-19" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-primary hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-20"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-20" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-primary hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-21"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-21" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Success - Solid Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-success hs-accordion-active:text-white hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-22"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-22"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-success hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-23"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-23"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-success hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-24"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-24"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-success hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-22"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon icon-chevron-up"&gt;&lt;/i&gt;
          {"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-22" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-success hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-23"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-23" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-success hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-24"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-24" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Warning - Solid Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-warning hs-accordion-active:text-white hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-25"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-25"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-warning hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-26"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-26"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-warning hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-27"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-27"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-warning hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-25"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-25" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-warning hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-26"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-26" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-warning hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-27"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-27" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Error - Solid Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-danger hs-accordion-active:text-white hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-28"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-28"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-danger hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-29"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-29"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-danger hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-30"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-30"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-danger hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-28"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-28" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-danger hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-29"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-29" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-danger hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-30"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;div id="acc-30" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dark - Solid Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-dark hs-accordion-active:text-white hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-31"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-31"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-dark hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-32"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-32"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-dark hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-33"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-33"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-dark hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-31"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-31" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-dark hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none"aria-expanded="false"aria-controls="acc-32"&gt;
          {"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;div id="acc-32" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-dark hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-33"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-33" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Info - Solid Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group border border-border-color rounded-lg overflow-hidden">
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-info hs-accordion-active:text-white hs-accordion-active:border-0 border-y-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-34"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-34"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-info hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-35"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-35"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-info hs-accordion-active:text-white hs-accordion-active:border-0 border-t border-b-0 border-x-0 border-border-color inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-36"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-36"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group border border-border-color
          rounded-lg overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-info hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="true"
          aria-controls="acc-34"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-34" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-info hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-35"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-35" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-info hs-accordion-active:text-white
          hs-accordion-active:border-0 border border-border-color inline-flex
          items-center gap-x-3 w-full font-semibold text-start text-foreground
          disabled:pointer-events-none" aria-expanded="false"
          aria-controls="acc-36"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-36" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Primary - Colored Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-primary rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-primary hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-37"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-37"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-primary rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-primary hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-38"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-38"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-primary rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-primary hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-39"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-39"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active border border-primary
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-primary
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-primary inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-37" &gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt;{"\n"}
          {"        "}&lt;div id="acc-37" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-primary rounded-lg
          mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-primary
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-primary inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-38"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-38" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-primary
          rounded-lg"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-primary
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-primary inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-39"&gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-39" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Success - Colored Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-success rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-success hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-success inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-40"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-40"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-success rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-success hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-success inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-41"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-41"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-success rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-success hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-success inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-42"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-42"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active border border-success
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-success
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-success inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-40"&gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-40" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-success rounded-lg
          mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-success
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-success inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-41"&gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-41" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-success
          rounded-lg"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-success
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-success inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-42" &gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-42" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"            "}&lt;p class="text-foreground"&gt;{"\n"}
          {"            "}It is hidden by default, until the collapse plugin
          adds the appropriate classes that we use to style each element. These
          classes control the overall appearance, as well as the showing and
          hiding via CSS transitions.{"\n"}
          {"            "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Warning - Colored Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-warning rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-warning hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-warning inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-43"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-43"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-warning rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-warning hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-warning inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-44"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-44"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-warning rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-warning hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-warning inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-45"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-45"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active border border-warning
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-warning
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-warning inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-43" &gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-43" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-warning rounded-lg
          mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-warning
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-warning inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-44" &gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-44" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-warning
          rounded-lg"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-warning
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-warning inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-45" &gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-45" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Error - Colored Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-danger rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-danger hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-danger inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-46"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-46"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-danger rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-danger hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-danger inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-47"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-47"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-danger rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-danger hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-danger inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-48"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-48"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active border border-danger
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-danger
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-danger inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-46" &gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-46" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-danger rounded-lg
          mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-danger
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-danger inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-47" &gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-47" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-danger
          rounded-lg"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-danger
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-danger inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-48" &gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-48" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dark - Colored Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-dark rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-dark hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-dark inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-49"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-49"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-dark rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-dark hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-dark inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-50"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-50"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-dark rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-dark hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-dark inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-51"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-51"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active border border-dark
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-dark
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-dark inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-49" &gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-49" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-dark rounded-lg
          mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-dark
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-dark inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-50" &gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-50" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-dark rounded-lg"&gt;
          {"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-dark
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-dark inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-51" &gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-51" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Info - Colored Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content hs-accordion-group overflow-hidden">
        <div className="hs-accordion active  border border-info rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-info hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-info inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-52"
          >
            Accordion #1
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-52"
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-info rounded-lg mb-2">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-info hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-info inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-53"
          >
            Accordion #2
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-53"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
        <div className=" hs-accordion  border border-info rounded-lg">
          <button
            className="hs-accordion-toggle py-4 px-5 hs-accordion-active:bg-white hs-accordion-active:text-info hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0 border-info inline-flex items-center gap-x-3 w-full font-semibold text-start text-foreground disabled:pointer-events-none"
            aria-expanded="false"
            aria-controls="acc-54"
          >
            Accordion #3
            <span className="hs-accordion-active:hidden block size-4 ms-auto">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:block hidden size-4 ms-auto">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-54"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
          >
            <div className="px-5 py-4">
              <p className="text-foreground">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions.
              </p>
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
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="hs-accordion-group overflow-hidden"&gt; {"\n"}
          {"    "}&lt;div class="hs-accordion active border border-info
          rounded-lg mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-info
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-info inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="true" aria-controls="acc-52" &gt;{"\n"}
          {"            "}Accordion #1{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-52" class="hs-accordion-content w-full
          overflow-hidden duration-300" role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-info rounded-lg
          mb-2"&gt;{"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-info
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-info inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-53" &gt;{"\n"}
          {"            "}Accordion #2{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-53" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div class="hs-accordion border border-info rounded-lg"&gt;
          {"\n"}
          {"        "}&lt;button class="hs-accordion-toggle py-4 px-5
          hs-accordion-active:bg-white hs-accordion-active:text-info
          hs-accordion-active:rounded-t-lg hs-accordion-active:border-b border-0
          border-info inline-flex items-center gap-x-3 w-full font-semibold
          text-start text-foreground disabled:pointer-events-none"
          aria-expanded="false" aria-controls="acc-54" &gt;{"\n"}
          {"            "}Accordion #3{"\n"}
          {"            "}&lt;span class="hs-accordion-active:hidden block
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-down"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="hs-accordion-active:block hidden
          size-4 ms-auto"&gt;&lt;i class="icon
          icon-chevron-up"&gt;&lt;/i&gt;&lt;/span&gt;{"\n"}
          {"        "}&lt;/button&gt; {"\n"}
          {"        "}&lt;div id="acc-54" class="hs-accordion-content hidden
          w-full overflow-hidden transition-[height] duration-300"
          role="region"&gt;{"\n"}
          {"            "}&lt;div class="px-5 py-4"&gt;{"\n"}
          {"                "}&lt;p class="text-foreground"&gt;{"\n"}
          {"                    "}It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing
          and hiding via CSS transitions.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
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

export default UiAccordion