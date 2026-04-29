import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiCollapse = () => {
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
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // ================================
    // 🔘 MULTIPLE TARGET COLLAPSE
    // ================================
    const multiBtn = target.closest(
      "[data-collapse-target]"
    ) as HTMLElement | null;

    if (multiBtn) {
      const attr = multiBtn.getAttribute("data-collapse-target");
      if (!attr) return;

      const targets = attr.split(",");

      targets.forEach((selector) => {
        const box = document.querySelector(
          selector.trim()
        ) as HTMLElement | null;

        if (!box) return;

        if (box.style.maxHeight && box.style.maxHeight !== "0px") {
          box.style.maxHeight = "0px";
        } else {
          box.style.maxHeight = box.scrollHeight + "px";
        }
      });

      return; // 🔥 stop further execution
    }

    // ================================
    // 🔘 SINGLE COLLAPSE BUTTON
    // ================================
    const btn = target.closest(
      "[data-collapse-btn]"
    ) as HTMLElement | null;

    if (!btn) return;

    // 🔽 Vertical Collapse
    const box = btn
      .closest("div")
      ?.parentElement?.querySelector(
        "[data-collapse-box]"
      ) as HTMLElement | null;

    if (box) {
      if (box.style.maxHeight) {
        box.style.maxHeight = "";
      } else {
        box.style.maxHeight = box.scrollHeight + "px";
      }
    }

    // ↔️ Horizontal Collapse
    const hBox = btn.parentElement?.querySelector(
      "[data-collapse-box]"
    ) as HTMLElement | null;

    if (hBox && hBox.firstElementChild instanceof HTMLElement) {
      const content = hBox.firstElementChild;

      if (hBox.style.width && hBox.style.width !== "0px") {
        hBox.style.width = "0px";
      } else {
        hBox.style.width = content.scrollWidth + "px";
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
            Collapse
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-12 gap-6 items-baseline">
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Collapse</h5>
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
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="#"
            className="btn bg-primary text-white rounded-lg"
            data-collapse-btn=""
          >
            Link with click
          </Link>
          <button
            type="button"
            className="btn bg-primary text-white rounded-lg"
            data-collapse-btn=""
          >
            Button with click
          </button>
        </div>
        <div
          className="overflow-hidden transition-all duration-300 max-h-0"
          data-collapse-box=""
        >
          <div className="p-4 mt-4 bg-light rounded-lg border border-border-color">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
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
          {"\n"}&lt;div&gt; {"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-center gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="btn bg-primary text-white
          rounded-lg" data-collapse-btn&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Link with click{"\n"}
          {"\t"}
          {"\t"}&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn bg-primary text-white
          rounded-lg" data-collapse-btn&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Button with click{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="overflow-hidden transition-all duration-300
          max-h-0" data-collapse-box&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="p-4 mt-4 bg-light rounded-lg border
          border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Anim pariatur cliche reprehenderit, enim eiusmod high life
          accusamus terry richardson ad squid.{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Nihil anim keffiyeh helvetica, craft beer labore wes anderson
          cred nesciunt sapiente ea proident.{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt; {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Collapse Horizontal</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content overflow-auto">
        <button
          type="button"
          className="btn bg-primary text-white rounded-lg"
          data-collapse-btn=""
        >
          Toggle with collapse
        </button>
        <div
          className="overflow-hidden transition-all duration-300 w-0"
          data-collapse-box=""
        >
          <div className="p-4 mt-4 bg-light rounded-lg border border-border-color w-[350px] overflow-auto">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
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
          {"\n"}&lt;div&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn bg-primary text-white
          rounded-lg" data-collapse-btn&gt;{"\n"}
          {"\t"}
          {"\t"}Toggle with collapse{"\n"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}&lt;div class="overflow-hidden transition-all duration-300 w-0"
          data-collapse-box&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="p-4 mt-4 bg-light rounded-lg border
          border-border-color w-[350px]"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Anim pariatur cliche reprehenderit, enim eiusmod high life
          accusamus terry richardson ad squid.{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Nihil anim keffiyeh helvetica, craft beer labore wes anderson
          cred nesciunt sapiente ea proident.{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Multiple Targets</h5>
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
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="btn bg-primary text-white rounded-lg"
            data-collapse-target="#collapseOne"
          >
            Toggle first element
          </button>
          <button
            className="btn bg-primary text-white rounded-lg"
            data-collapse-target="#collapseTwo"
          >
            Toggle second element
          </button>
          <button
            className="btn bg-primary text-white rounded-lg"
            data-collapse-target="#collapseOne,#collapseTwo"
          >
            Toggle both elements
          </button>
        </div>
        <div className="lg:flex gap-3 block">
          <div
            id="collapseOne"
            className="overflow-hidden transition-all duration-300 max-h-0"
          >
            <div className="p-4 mt-4 mb-1 bg-light rounded-lg border border-border-color">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </div>
          </div>
          <div
            id="collapseTwo"
            className="overflow-hidden transition-all duration-300 max-h-0"
          >
            <div className="p-4 mt-4 mb-1 bg-light rounded-lg border border-border-color">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
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
          {"\n"}&lt;div&gt; {"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-center gap-2"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;button class="btn bg-primary text-white rounded-lg"
          data-collapse-target="#collapseOne"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Toggle first element{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;button class="btn bg-primary text-white rounded-lg"
          data-collapse-target="#collapseTwo"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Toggle second element{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;button class="btn bg-primary text-white rounded-lg"
          data-collapse-target="#collapseOne,#collapseTwo"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}Toggle both elements{"\n"}
          {"\t"}
          {"\t"}&lt;/button&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="lg:flex gap-3 block"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div id="collapseOne" class="overflow-hidden transition-all
          duration-300 max-h-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-4 mt-4 mb-1 bg-light rounded-lg border
          border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Anim pariatur cliche reprehenderit, enim eiusmod high life
          accusamus terry richardson ad squid.{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Nihil anim keffiyeh helvetica, craft beer labore wes anderson
          cred nesciunt sapiente ea proident.{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div id="collapseTwo" class="overflow-hidden transition-all
          duration-300 max-h-0"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;div class="p-4 mt-4 mb-1 bg-light rounded-lg border
          border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Anim pariatur cliche reprehenderit, enim eiusmod high life
          accusamus terry richardson ad squid.{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}
          {"\t"}Nihil anim keffiyeh helvetica, craft beer labore wes anderson
          cred nesciunt sapiente ea proident.{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}&lt;/div&gt; {"\n"}
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

export default UiCollapse