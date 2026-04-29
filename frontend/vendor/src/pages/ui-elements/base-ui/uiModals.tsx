import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiModals = () => {
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
            Modals
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  <div className="grid grid-cols-12 gap-6">
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Basic Modal</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="standard-modal"
          data-hs-overlay="#standard-modal"
        >
          Launch Demo Modal
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="standard-modal" data-hs-overlay="#standard-modal"&gt;
          {"\n"}Launch Demo Modal{"\n"}&lt;/button&gt;{"\n"}
          {"\n"}&lt;div id="standard-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#standard-modal"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#standard-modal"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Scrolling Modal</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="long-content"
          data-hs-overlay="#long-content"
        >
          Scrolling Long Content
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="long-content" data-hs-overlay="#long-content"&gt;{"\n"}
          Scrolling Long Content{"\n"}&lt;/button&gt;{"\n"}
          {"\n"}&lt;div id="long-content" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#long-content"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 h-50 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#long-content"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Toggle Between Modals</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="btw-modal"
          data-hs-overlay="#btw-modal"
        >
          Toggle Between Modals
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="btw-modal" data-hs-overlay="#btw-modal"&gt;{"\n"}Toggle
          Between Modals{"\n"}&lt;/button&gt; {"\n"}
          {"\n"}&lt;div id="btw-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#btw-modal"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla. {"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt; {"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none" aria-haspopup="dialog"
          aria-expanded="false" aria-controls="btw-second-modal"
          data-hs-overlay="#btw-second-modal"&gt;{"\n"}
          {"                    "}Open Second Modal{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="btw-second-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#btw-second-modal"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 h-50 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla. {"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none" aria-haspopup="dialog"
          aria-expanded="false" aria-controls="btw-modal"
          data-hs-overlay="#btw-modal"&gt;{"\n"}
          {"                    "}Back to first{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Large Modal</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="large-modal"
          data-hs-overlay="#large-modal"
        >
          Large Modal
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {" "}
          {"\n"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="large-modal" data-hs-overlay="#large-modal"&gt;{"\n"}
          Large Modal{"\n"}&lt;/button&gt;{"  "}
          {"\n"}
          {"\n"}&lt;div id="large-modal" class="p-3 size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="w-full m-3 sm:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#large-modal"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#large-modal"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Medium Modal</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="medium-modal"
          data-hs-overlay="#medium-modal"
        >
          Medium Modal
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="medium-modal" data-hs-overlay="#medium-modal"&gt;{"\n"}
          Medium Modal{"\n"}&lt;/button&gt;{"\n"}
          {"\n"}&lt;div id="medium-modal" class="p-3 size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="md:max-w-xl m-3 md:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#medium-modal"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla. {"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#medium-modal"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-4 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Small Modal</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content">
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="small-modal"
          data-hs-overlay="#small-modal"
        >
          Small Modal
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
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="small-modal" data-hs-overlay="#small-modal"&gt;{"\n"}
          Small Modal{"\n"}&lt;/button&gt; {"\n"}
          {"\n"}&lt;div id="small-modal" class="p-3 size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#small-modal"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                    "}Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.{"\n"}
          {"                    "}Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla. {"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#small-modal"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Modal Screen Sizes</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
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
          aria-controls="full-screen"
          data-hs-overlay="#full-screen"
        >
          Full screen
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="sm-screen"
          data-hs-overlay="#sm-screen"
        >
          Full screen below sm
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="md-screen"
          data-hs-overlay="#md-screen"
        >
          Full screen below md
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="lg-screen"
          data-hs-overlay="#lg-screen"
        >
          Full screen below lg
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="xl-screen"
          data-hs-overlay="#xl-screen"
        >
          Full screen below xl
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-center gap-6"&gt;{"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="full-screen" data-hs-overlay="#full-screen"&gt;{"\n"}
          {"        "}Full screen{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="sm-screen" data-hs-overlay="#sm-screen"&gt;{"\n"}
          {"        "}Full screen below sm{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="md-screen" data-hs-overlay="#md-screen"&gt;{"\n"}
          {"        "}Full screen below md{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="lg-screen" data-hs-overlay="#lg-screen"&gt;{"\n"}
          {"        "}Full screen below lg{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="xl-screen" data-hs-overlay="#xl-screen"&gt;{"\n"}
          {"        "}Full screen below xl{"\n"}
          {"    "}&lt;/button&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="full-screen" class="size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="max-w-full max-h-full h-full"&gt;{"\n"}
          {"        "}&lt;div class="flex justify-between h-full flex-col
          bg-white border p-6 border-border-color rounded-lg
          pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#full-screen"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}......{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#full-screen"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="sm-screen" class="size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="sm:max-w-lg sm:max-h-none sm:h-auto
          sm:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#sm-screen"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}......{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#sm-screen"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="md-screen" class="size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="max-w-full max-h-full h-full
          md:hs-overlay-open:mt-10 md:mt-0 md:max-w-lg md:max-h-none md:h-auto
          md:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#md-screen"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}......{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#md-screen"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="lg-screen" class="size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="max-w-full max-h-full h-full
          lg:hs-overlay-open:mt-10 lg:mt-0 lg:max-w-lg lg:max-h-none lg:h-auto
          lg:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#lg-screen"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}......{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#lg-screen"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="xl-screen" class="size-full hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed
          top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all
          overflow-y-auto pointer-events-none" role="dialog" tabindex="-1"&gt;
          {"\n"}
          {"    "}&lt;div class="max-w-full max-h-full h-full
          xl:hs-overlay-open:mt-10 xl:mt-0 xl:max-w-xl xl:max-h-none xl:h-auto
          xl:mx-auto"&gt;{"\n"}
          {"        "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex justify-between items-center pb-5
          border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                "}&lt;button type="button" class="size-9 inline-flex
          justify-center items-center rounded-full border border-border-color
          bg-white text-gray-900 text-xl hover:bg-danger hover:border-danger
          hover:text-white dark:hover:text-white focus:outline-hidden
          focus:bg-danger cursor-pointer" aria-label="Close"
          data-hs-overlay="#xl-screen"&gt;{"\n"}
          {"                    "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                    "}......{"\n"}
          {"                "}&lt;/p&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex justify-end items-center gap-x-2
          pt-5 border-t border-border-color"&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#xl-screen"&gt;{"\n"}
          {"                    "}Close{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"                "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                    "}Save Changes{"\n"}
          {"                "}&lt;/button&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Modal Directions</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 focus:bg-primary focus:border-primary focus:text-white text-gray-900"
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
          aria-controls="center-modal"
          data-hs-overlay="#center-modal"
        >
          Center Modal
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="top-modal"
          data-hs-overlay="#top-modal"
        >
          Top Modal
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="bottom-modal"
          data-hs-overlay="#bottom-modal"
        >
          Bottom Modal
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="left-modal"
          data-hs-overlay="#left-modal"
        >
          Left Modal
        </button>
        <button
          type="button"
          className="btn-sm text-white bg-primary inline-flex items-center"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="right-modal"
          data-hs-overlay="#right-modal"
        >
          Right Modal
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex items-center gap-6"&gt;{"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="center-modal" data-hs-overlay="#center-modal"&gt;{"\n"}
          {"        "}Center Modal{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="top-modal" data-hs-overlay="#top-modal"&gt;{"\n"}
          {"        "}Top Modal{"\n"}
          {"    "}&lt;/button&gt; {"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="bottom-modal" data-hs-overlay="#bottom-modal"&gt;{"\n"}
          {"        "}Bottom Modal{"\n"}
          {"    "}&lt;/button&gt;{"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="left-modal" data-hs-overlay="#left-modal"&gt;{"\n"}
          {"        "}Left Modal{"\n"}
          {"    "}&lt;/button&gt;{"\n"}
          {"    "}&lt;button type="button" class="btn-sm text-white bg-primary
          inline-flex items-center" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="right-modal" data-hs-overlay="#right-modal"&gt;{"\n"}
          {"        "}Right Modal{"\n"}
          {"    "}&lt;/button&gt; {"\n"}&lt;/div&gt; {"\n"}
          {"\n"}&lt;div id="center-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="min-h-screen flex items-center justify-center
          px-4"&gt; {"\n"}
          {"        "}&lt;div class="sm:max-w-lg sm:w-full sm:mx-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"                "}&lt;div class="flex justify-between items-center
          pb-5 border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                    "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                    "}&lt;button type="button" class="size-9
          inline-flex justify-center items-center rounded-full border
          border-border-color bg-white text-gray-900 text-xl hover:bg-danger
          hover:border-danger hover:text-white dark:hover:text-white
          focus:outline-hidden focus:bg-danger cursor-pointer"
          aria-label="Close" data-hs-overlay="#center-modal"&gt;{"\n"}
          {"                        "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                    "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                        "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                        "}Praesent commodo cursus magna,{"  "}
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                    "}&lt;/p&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="flex justify-end items-center
          gap-x-2 pt-5 border-t border-border-color"&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#center-modal"&gt;{"\n"}
          {"                        "}Close{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                        "}Save Changes{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="top-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="min-h-screen flex justify-center px-4"&gt;{" "}
          {"\n"}
          {"        "}&lt;div class="sm:max-w-lg sm:w-full sm:mx-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"                "}&lt;div class="flex justify-between items-center
          pb-5 border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                    "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                    "}&lt;button type="button" class="size-9
          inline-flex justify-center items-center rounded-full border
          border-border-color bg-white text-gray-900 text-xl hover:bg-danger
          hover:border-danger hover:text-white dark:hover:text-white
          focus:outline-hidden focus:bg-danger cursor-pointer"
          aria-label="Close" data-hs-overlay="#top-modal"&gt;{"\n"}
          {"                        "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                    "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                        "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                        "}Praesent commodo cursus magna,{"  "}
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                    "}&lt;/p&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="flex justify-end items-center
          gap-x-2 pt-5 border-t border-border-color"&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#top-modal"&gt;{"\n"}
          {"                        "}Close{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                        "}Save Changes{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="bottom-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="min-h-screen flex items-end px-4"&gt; {"\n"}
          {"        "}&lt;div class="sm:max-w-lg sm:w-full sm:mx-auto"&gt;{"\n"}
          {"            "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"                "}&lt;div class="flex justify-between items-center
          pb-5 border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                    "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                    "}&lt;button type="button" class="size-9
          inline-flex justify-center items-center rounded-full border
          border-border-color bg-white text-gray-900 text-xl hover:bg-danger
          hover:border-danger hover:text-white dark:hover:text-white
          focus:outline-hidden focus:bg-danger cursor-pointer"
          aria-label="Close" data-hs-overlay="#bottom-modal"&gt;{"\n"}
          {"                        "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                    "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                        "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                        "}Praesent commodo cursus magna,{"  "}
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                    "}&lt;/p&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="flex justify-end items-center
          gap-x-2 pt-5 border-t border-border-color"&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#bottom-modal"&gt;{"\n"}
          {"                        "}Close{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                        "}Save Changes{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="left-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="min-h-screen flex items-center justify-start
          px-4"&gt; {"\n"}
          {"        "}&lt;div class="sm:max-w-lg sm:w-full"&gt;{"\n"}
          {"            "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"                "}&lt;div class="flex justify-between items-center
          pb-5 border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                    "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                    "}&lt;button type="button" class="size-9
          inline-flex justify-center items-center rounded-full border
          border-border-color bg-white text-gray-900 text-xl hover:bg-danger
          hover:border-danger hover:text-white dark:hover:text-white
          focus:outline-hidden focus:bg-danger cursor-pointer"
          aria-label="Close" data-hs-overlay="#left-modal"&gt;{"\n"}
          {"                        "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                    "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                        "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                        "}Praesent commodo cursus magna,{"  "}
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                    "}&lt;/p&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="flex justify-end items-center
          gap-x-2 pt-5 border-t border-border-color"&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#left-modal"&gt;{"\n"}
          {"                        "}Close{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                        "}Save Changes{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
          {"\n"}&lt;div id="right-modal" class="hs-overlay
          hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden
          size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden
          transition-all overflow-y-auto pointer-events-none" role="dialog"
          tabindex="-1"&gt;{"\n"}
          {"    "}&lt;div class="min-h-screen flex items-center justify-end
          px-4"&gt; {"\n"}
          {"        "}&lt;div class="sm:max-w-lg sm:w-full"&gt;{"\n"}
          {"            "}&lt;div class="flex flex-col bg-white border p-6
          border-border-color rounded-lg pointer-events-auto"&gt;{"\n"}
          {"                "}&lt;div class="flex justify-between items-center
          pb-5 border-b border-border-color dark:border-neutral-700"&gt;{"\n"}
          {"                    "}&lt;h4&gt;Modal Title&lt;/h4&gt;{"\n"}
          {"                    "}&lt;button type="button" class="size-9
          inline-flex justify-center items-center rounded-full border
          border-border-color bg-white text-gray-900 text-xl hover:bg-danger
          hover:border-danger hover:text-white dark:hover:text-white
          focus:outline-hidden focus:bg-danger cursor-pointer"
          aria-label="Close" data-hs-overlay="#right-modal"&gt;{"\n"}
          {"                        "}&lt;i class="icon-x"&gt;&lt;/i&gt;{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="py-5 overflow-y-auto"&gt;{"\n"}
          {"                    "}&lt;p class="mt-1 text-gray-800
          dark:text-neutral-400"&gt;{"\n"}
          {"                        "}Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          {"\n"}
          {"                        "}Praesent commodo cursus magna,{"  "}
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla.{"\n"}
          {"                    "}&lt;/p&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"                "}&lt;div class="flex justify-end items-center
          gap-x-2 pt-5 border-t border-border-color"&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50
          focus:outline-hidden focus:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none dark:bg-neutral-800
          dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700
          dark:focus:bg-neutral-700" data-hs-overlay="#right-modal"&gt;{"\n"}
          {"                        "}Close{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                    "}&lt;button type="button" class="py-2 px-3
          inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
          border-transparent bg-primary text-white hover:bg-primary-800
          focus:outline-hidden focus:bg-primary-800 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"                        "}Save Changes{"\n"}
          {"                    "}&lt;/button&gt;{"\n"}
          {"                "}&lt;/div&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>{" "}
  {/* end grid */}
  {/* Basic Modal Start */}
  <div
    id="standard-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#standard-modal"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#standard-modal"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Basic Modal End */}
  {/* Long Content Modal Start */}
  <div
    id="long-content"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#long-content"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 h-50 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#long-content"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Long Content Modal End */}
  {/* Toggle Between Modals Start */}
  <div
    id="btw-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#btw-modal"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="btw-second-modal"
            data-hs-overlay="#btw-second-modal"
          >
            Open Second Modal
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    id="btw-second-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#btw-second-modal"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 h-50 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="btw-modal"
            data-hs-overlay="#btw-modal"
          >
            Back to first
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Toggle Between Modals End */}
  {/* Large Modal Start */}
  <div
    id="large-modal"
    className="p-3 size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="w-full m-3 sm:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#large-modal"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#large-modal"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Large Modal End */}
  {/* Large Modal Start */}
  <div
    id="medium-modal"
    className="p-3 size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="md:max-w-xl m-3 md:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#medium-modal"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#medium-modal"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Large Modal End */}
  {/* Small Modal Start */}
  <div
    id="small-modal"
    className="p-3 size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#small-modal"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#small-modal"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Small Modal End */}
  {/* Full Screen Modal Start */}
  <div
    id="full-screen"
    className="size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="max-w-full max-h-full h-full">
      <div className="flex justify-between h-full flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#full-screen"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">......</p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#full-screen"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Full Screen Modal End */}
  {/* SM Screen Modal Start */}
  <div
    id="sm-screen"
    className="size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="sm:max-w-lg sm:max-h-none sm:h-auto sm:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#sm-screen"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">......</p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#sm-screen"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* SM Screen Modal End */}
  {/* MD Screen Modal Start */}
  <div
    id="md-screen"
    className="size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="max-w-full max-h-full h-full md:hs-overlay-open:mt-10 md:mt-0 md:max-w-lg md:max-h-none md:h-auto md:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#md-screen"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">......</p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#md-screen"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* MD Screen Modal End */}
  {/* lg Screen Modal Start */}
  <div
    id="lg-screen"
    className="size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="max-w-full max-h-full h-full lg:hs-overlay-open:mt-10 lg:mt-0 lg:max-w-lg lg:max-h-none lg:h-auto lg:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#lg-screen"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">......</p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#lg-screen"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* lg Screen Modal End */}
  {/* xl Screen Modal Start */}
  <div
    id="xl-screen"
    className="size-full hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="max-w-full max-h-full h-full xl:hs-overlay-open:mt-10 xl:mt-0 xl:max-w-xl xl:max-h-none xl:h-auto xl:mx-auto">
      <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
        <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
          <h4>Modal Title</h4>
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
            aria-label="Close"
            data-hs-overlay="#xl-screen"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">......</p>
        </div>
        <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#xl-screen"
          >
            Close
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* xl Screen Modal End */}
  {/* Canter Modal Start */}
  <div
    id="center-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="sm:max-w-lg sm:w-full sm:mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
            <h4>Modal Title</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#center-modal"
            >
              <i className="icon-x" />
            </button>
          </div>
          <div className="py-5 overflow-y-auto">
            <p className="mt-1 text-gray-800 dark:text-neutral-400">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros. Praesent commodo cursus
              magna, Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
              metus auctor fringilla.
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-dark!"
              data-hs-overlay="#center-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Canter Modal End */}
  {/* Top Modal Start */}
  <div
    id="top-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex justify-center px-4">
      <div className="sm:max-w-lg sm:w-full sm:mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
            <h4>Modal Title</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#top-modal"
            >
              <i className="icon-x" />
            </button>
          </div>
          <div className="py-5 overflow-y-auto">
            <p className="mt-1 text-gray-800 dark:text-neutral-400">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros. Praesent commodo cursus
              magna, Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
              metus auctor fringilla.
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              data-hs-overlay="#top-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Top Modal End */}
  {/* Bottom Modal Start */}
  <div
    id="bottom-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-end px-4">
      <div className="sm:max-w-lg sm:w-full sm:mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
            <h4>Modal Title</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#bottom-modal"
            >
              <i className="icon-x" />
            </button>
          </div>
          <div className="py-5 overflow-y-auto">
            <p className="mt-1 text-gray-800 dark:text-neutral-400">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros. Praesent commodo cursus
              magna, Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
              metus auctor fringilla.
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              data-hs-overlay="#bottom-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Bottom Modal End */}
  {/* Left Modal Start */}
  <div
    id="left-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-start px-4">
      <div className="sm:max-w-lg sm:w-full ">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
            <h4>Modal Title</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#left-modal"
            >
              <i className="icon-x" />
            </button>
          </div>
          <div className="py-5 overflow-y-auto">
            <p className="mt-1 text-gray-800 dark:text-neutral-400">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros. Praesent commodo cursus
              magna, Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
              metus auctor fringilla.
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              data-hs-overlay="#left-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Left Modal End */}
  {/* Right Modal Start */}
  <div
    id="right-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-end px-4">
      <div className="sm:max-w-lg sm:w-full ">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
            <h4>Modal Title</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#right-modal"
            >
              <i className="icon-x" />
            </button>
          </div>
          <div className="py-5 overflow-y-auto">
            <p className="mt-1 text-gray-800 dark:text-neutral-400">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros. Praesent commodo cursus
              magna, Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
              metus auctor fringilla.
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              data-hs-overlay="#right-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Right Modal End */}
</div>

  )
}

export default UiModals