import { useEffect } from 'react'
import { Images } from '../../../utils/imagePath';
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiCards = () => {
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
            Cards
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-12 gap-6">
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>With Subtitle</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color rounded-lg">
        <div className="mb-4">
          <h5 className="mb-1">Card Title</h5>
          <p>Card Sub Title</p>
        </div>
        <div className="mb-4">
          <img
            className="rounded-lg"
            src={Images.card_01}
            alt="card"
          />
        </div>
        <p>
          Lush green terraces cascade along misty hills, creating a peaceful
          place landscape
        </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg"&gt;
          {"\n"}
          {"  "}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"    "}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"    "}
          {"\t"}&lt;p&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"  "}
          {"\t"}&lt;/div&gt; {"\n"}
          {"  "}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"    "}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"  "}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty hills, creating
          a peaceful place landscape&lt;/p&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>With Button </h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color rounded-lg">
        <div className="mb-4">
          <h5>Card Title</h5>
        </div>
        <div className="mb-4">
          <img
            className="rounded-lg"
            src={Images.card_02}
            alt="card"
          />
        </div>
        <p className="mb-4">Lush green terraces cascade along misty hills </p>
        <Link
          to="#"
          className="btn-sm flex items-center justify-center gap-1.5 cursor-pointer inline-flex bg-light border border-border-color text-dark text-center hover:bg-light-900 hover:text-dark dark:hover:text-white!"
        >
          <i className="icon icon-shopping-bag" />
          Add to cart
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg"&gt;
          {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_02}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="btn-sm flex items-center justify-center
          gap-1.5 cursor-pointer inline-flex bg-light border border-border-color
          text-dark text-center hover:bg-light-900 hover:text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-shopping-bag"&gt;&lt;/i&gt;{"\n"}
          {"\t"}
          {"\t"}Add to cart{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>With Links</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color rounded-lg">
        <div className="mb-4">
          <h5>Card Title</h5>
        </div>
        <div className="mb-4">
          <img
            className="rounded-lg"
            src={Images.card_03}
            alt="card"
          />
        </div>
        <p className="mb-4">Lush green terraces cascade along misty hills </p>
        <Link
          to="#"
          className="inline-fle text-info underline text-center hover:text-primary"
        >
          View More
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg"&gt;
          {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_03}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="inline-flex text-info underline
          text-center hover:bg-light-900 hover:text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}View More{"\n"}
          {"\t"}&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center justify-between flex-wrap border-b gap-3 border-border-color">
        <h5>Horizontal Right Align Content</h5>
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
        <div className="p-5 border border-border-color rounded-lg md:flex block gap-4">
          <div className="md:max-w-[180px]">
            <img
              className="size-full rounded-lg"
              src={Images.card_01}
              alt="card"
            />
          </div>
          <div>
            <h5 className="mb-1">Card Title</h5>
            <p className="mb-4">Card Sub Title</p>
            <p className="mb-4">
              Lush green terraces cascade along misty hills
            </p>
            <p>Updated 2 days ago</p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg md:flex
          block gap-4"&gt;{"\n"}
          {"\t"}&lt;div class="md:max-w-[180px]"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="size-full rounded-lg"
          src={Images.card_01} alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Updated 2 days ago&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Horizontal Left Align Content</h5>
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
        <div className="p-5 border border-border-color rounded-lg md:flex block md:justify-between gap-4">
          <div>
            <h5 className="mb-1">Card Title</h5>
            <p className="mb-4">Card Sub Title</p>
            <p className="mb-4">
              Lush green terraces cascade along misty hills
            </p>
            <p>Updated 2 days ago</p>
          </div>
          <div className="md:max-w-[180px]">
            <img
              className="size-full rounded-lg"
              src={Images.card_01}
              alt="card"
            />
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg md:flex
          block md:justify-between gap-4"&gt;{"\n"}
          {"\t"}&lt;div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Updated 2 days ago&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="md:max-w-[180px]"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="size-full rounded-lg"
          src={Images.card_01} alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
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
      <div className="preview-content p-5 border border-border-color rounded-lg">
        <div className="mb-4">
          <h5 className="mb-1">Card Title</h5>
        </div>
        <div className="mb-4">
          <img
            className="rounded-lg"
            src={Images.card_01}
            alt="card"
          />
        </div>
        <p>Lush green terraces cascade along misty hills </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg"&gt;
          {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty hills&lt;/p&gt;
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
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
      <div className="preview-content p-5 border border-border-color rounded-lg">
        <div className="mb-4 text-center">
          <h5>Card Title</h5>
        </div>
        <div className="mb-4 flex justify-center items-center">
          <img
            className="rounded-lg"
            src={Images.card_01}
            alt="card"
          />
        </div>
        <p className="text-center">
          Lush green terraces cascade along misty hills{" "}
        </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg"&gt;
          {"\n"}
          {"\t"}&lt;div class="mb-4 text-center"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4 flex justify-center items-center"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"    "}&lt;p class="text-center"&gt;Lush green terraces cascade along
          misty hills&lt;/p&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Right Align</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color rounded-lg">
        <div className="mb-4 text-end">
          <h5>Card Title</h5>
        </div>
        <div className="mb-4 flex justify-end items-end">
          <img
            className="rounded-lg"
            src={Images.card_01}
            alt="card"
          />
        </div>
        <p className="text-end">
          Lush green terraces cascade along misty hills{" "}
        </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color rounded-lg"&gt;
          {"\n"}
          {"\t"}&lt;div class="mb-4 text-end"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4 flex justify-end items-end"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"    "}&lt;p class="text-end"&gt;Lush green terraces cascade along
          misty hills&lt;/p&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Horizontal Right Align Content</h5>
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
        <div className="border border-border-color rounded-lg md:flex block gap-4 overflow-hidden">
          <div className="md:max-w-[180px]">
            <img
              className="size-full"
              src={Images.card_01}
              alt="card"
            />
          </div>
          <div className="p-5">
            <h5 className="mb-1">Card Title</h5>
            <p className="mb-4">Card Sub Title</p>
            <p className="mb-4">
              Lush green terraces cascade along misty hills
            </p>
            <p>Updated 2 days ago</p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border border-border-color rounded-lg md:flex
          block gap-4 overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;div class="md:max-w-[180px]"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="size-full" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Updated 2 days ago&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\t"}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Horizontal Left Align Content</h5>
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
        <div className="border border-border-color rounded-lg md:flex block md:justify-between gap-4 overflow-hidden">
          <div className="p-5">
            <h5 className="mb-1">Card Title</h5>
            <p className="mb-4">Card Sub Title</p>
            <p className="mb-4">
              Lush green terraces cascade along misty hills
            </p>
            <p>Updated 2 days ago</p>
          </div>
          <div className="md:max-w-[180px]">
            <img
              className="size-full"
              src={Images.card_01}
              alt="card"
            />
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border border-border-color rounded-lg md:flex
          block md:justify-between gap-4 overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Updated 2 days ago&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="md:max-w-[180px]"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="size-full" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>With Header</h5>
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
        <div className="px-5 py-4 bg-light border-b border-border-color">
          <h5>Card Title</h5>
        </div>
        <div className="p-5">
          <p>
            Lush green terraces cascade along misty hills, forming gentle layers
            that follow the curves of the land and create a calm and quite
            place.
          </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;div class="px-5 py-4 bg-light border-b
          border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty hills, forming
          gentle layers that follow the curves of the land and create a calm and
          quite place.&lt;/p&gt;{"\n"}
          {"  "}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>With Footer</h5>
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
        <div className="p-5">
          <p>
            Lush green terraces cascade along misty hills, forming gentle layers
            that follow the curves of the land and create a calm and quite
            place.
          </p>
        </div>
        <div className="px-5 py-4 bg-light border-t border-border-color">
          <h5>Card Title</h5>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty hills, forming
          gentle layers that follow the curves of the land and create a calm and
          quite place.&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="px-5 py-4 bg-light border-t
          border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Header &amp; Footer</h5>
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
        <div className="px-5 py-4 bg-light border-b border-border-color">
          <h5>Card Title</h5>
        </div>
        <div className="p-5">
          <p>Lush green terraces cascade along misty hills. </p>
        </div>
        <div className="px-5 py-4 bg-light border-t border-border-color">
          <h5>Card Title</h5>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;div class="px-5 py-4 bg-light border-b
          border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty
          hills.&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="px-5 py-4 bg-light border-t
          border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Primary Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 bg-primary border border-border-color rounded-lg overflow-hidden">
        <p className="mb-4 text-white">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <Link className="underline text-white" to="#">
          View More
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 bg-primary border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4 text-white"&gt;Lush green terraces cascade
          along misty hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="underline text-white"&gt;View
          More&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Light Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 bg-light border border-border-color rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <Link className="underline text-dark hover:text-primary" to="#">
          View More
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 bg-light border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="underline text-dark"&gt;View
          More&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dark Color</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 bg-dark border border-border-color rounded-lg overflow-hidden">
        <p className="mb-4 text-white dark:text-white!">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <Link className="underline text-white dark:text-white!" to="#">
          View More
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 bg-dark border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4 text-white"&gt;Lush green terraces cascade
          along misty hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="underline text-white"&gt;View
          More&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 bg-light border border-border-color rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <Link className="underline text-dark hover:text-primary" to="#">
          View More
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 bg-light border border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="underline text-dark"&gt;View
          More&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Dotted Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-dashed border-border-color rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <Link className="underline text-dark hover:text-primary" to="#">
          View More
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-dashed border-border-color
          rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="underline text-dark"&gt;View
          More&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Color Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-primary rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <Link className="underline text-dark hover:text-primary" to="#">
          View More
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-primary rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;a to="#" class="underline text-dark"&gt;View
          More&lt;/a&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Left Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark dark:hover:text-dark!"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color border-s-3 border-s-primary rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <button
          type="button"
          className="btn-sm flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark  hover:bg-primary-800 hover:text-white dark:hover:text-dark!"
        >
          <i className="icon icon-shopping-bag" />
          Add to cart
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color border-s-3
          border-s-primary rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;button type="button" class="btn-sm flex items-center
          justify-center gap-1.5 cursor-pointer bg-white border
          border-border-color text-dark text-center hover:bg-light-900
          hover:text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-shopping-bag"&gt;&lt;/i&gt; Add to cart
          {"\n"}
          {"\t"}&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Right Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color border-e-3 border-e-primary rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <button
          type="button"
          className="btn-sm flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark  hover:bg-primary-800 hover:text-white dark:hover:text-dark!"
        >
          <i className="icon icon-shopping-bag" />
          Add to cart
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color border-e-3
          border-e-primary rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt;{"\n"}
          {"\t"}&lt;button type="button" class="btn-sm flex items-center
          justify-center gap-1.5 cursor-pointer bg-white border
          border-border-color text-dark text-center hover:bg-light-900
          hover:text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-shopping-bag"&gt;&lt;/i&gt; Add to cart
          {"\n"}
          {"\t"}&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Bottom Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color border-b-3 border-b-primary rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <button
          type="button"
          className="btn-sm flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark  hover:bg-primary-800 hover:text-white dark:hover:text-dark!"
        >
          <i className="icon icon-shopping-bag" />
          Add to cart
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color border-b-3
          border-b-primary rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;button type="button" class="btn-sm flex items-center
          justify-center gap-1.5 cursor-pointer bg-white border
          border-border-color text-dark text-center hover:bg-light-900
          hover:text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-shopping-bag"&gt;&lt;/i&gt; Add to cart
          {"\n"}
          {"\t"}&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-6 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Top Border</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-5 border border-border-color border-t-3 border-t-primary rounded-lg overflow-hidden">
        <p className="mb-4">
          Lush green terraces cascade along misty hills, creating a peaceful
          Place.
        </p>
        <button
          type="button"
          className="btn-sm flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark  hover:bg-primary-800 hover:text-white dark:text-dark dark:focus:text-dark dark:hover:text-dark!"
        >
          <i className="icon icon-shopping-bag" />
          Add to cart
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-5 border border-border-color border-t-3
          border-t-primary rounded-lg overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt; {"\n"}
          {"\t"}&lt;button type="button" class="btn-sm flex items-center
          justify-center gap-1.5 cursor-pointer bg-white border
          border-border-color text-dark text-center hover:bg-light-900
          hover:text-dark"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;i class="icon icon-shopping-bag"&gt;&lt;/i&gt; Add to cart
          {"\n"}
          {"\t"}&lt;/button&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Glassmorphism</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content rounded-lg relative overflow-hidden">
        <img
          className="rounded-lg"
          src={Images.card_01}
          alt="card"
        />
        <div className="absolute bottom-0 px-5 py-4 w-full backdrop-blur-[10px]">
          <p className="text-white">
            Lush green terraces cascade along misty hills, creating a peaceful
            place
          </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="rounded-lg relative overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt; {"\n"}
          {"\t"}&lt;div class="absolute bottom-0 px-5 py-4 w-full
          backdrop-blur-[10px]"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="text-white"&gt;Lush green terraces cascade along
          misty hills, creating a peaceful place&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Tabs</h5>
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
        <div className="flex items-center gap-2 px-5 py-4 bg-light border-b border-border-color">
          <Link className="text-primary font-medium" to="#">
            Active
          </Link>
          <Link className="text-dark font-medium" to="#">
            Link
          </Link>
          <Link className="font-medium" to="#">
            Disabled
          </Link>
        </div>
        <div className="p-5">
          <p className="text-dark font-semibold mb-1">Card Title</p>
          <p className="text-[13px]">
            Lush green terraces cascade along misty hills, forming gentle layers
            that follow the curves of the land and create a calm and quite
            place.
          </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}&lt;div class="flex items-center gap-2 px-5 py-4 bg-light
          border-b border-border-color"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="text-primary
          font-medium"&gt;Active&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="text-dark font-medium"&gt;Link&lt;/a&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="font-medium"&gt;Disabled&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="text-dark font-semibold mb-1"&gt;Card
          Title&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="text-[13px]"&gt;Lush green terraces cascade along
          misty hills, forming gentle layers that follow the curves of the land
          and create a calm and quite place.&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card xl:col-span-4 sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Image Overlay</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content rounded-lg relative">
        <img
          className="rounded-lg"
          src={Images.card_01}
          alt="card"
        />
        <div className="absolute bottom-0 px-5 py-4 w-full">
          <p className="text-white">
            Lush green terraces cascade along misty hills, creating a peaceful
            place
          </p>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="rounded-lg relative"&gt;{"\n"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt; {"\n"}
          {"\t"}&lt;div class="absolute bottom-0 px-5 py-4 w-full"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="text-white"&gt;Lush green terraces cascade along
          misty hills, creating a peaceful place&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Card Group with Image</h5>
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
        <div className="md:flex items-center block">
          <div className="p-5 border border-border-color first:rounded-s-lg last:rounded-e-lg rounded-none">
            <div className="mb-4">
              <h5 className="mb-1">Card Title</h5>
              <p>Card Sub Title</p>
            </div>
            <div className="mb-4">
              <img
                className="rounded-lg"
                src={Images.card_01}
                alt="card"
              />
            </div>
            <p>
              Lush green terraces cascade along misty hills, creating a peaceful
              place landscape
            </p>
          </div>
          <div className="p-5 border border-border-color first:rounded-s-lg last:rounded-e-lg rounded-none">
            <div className="mb-4">
              <h5 className="mb-1">Card Title</h5>
              <p>Card Sub Title</p>
            </div>
            <div className="mb-4">
              <img
                className="rounded-lg"
                src={Images.card_01}
                alt="card"
              />
            </div>
            <p>
              Lush green terraces cascade along misty hills, creating a peaceful
              place landscape
            </p>
          </div>
          <div className="p-5 border border-border-color first:rounded-s-lg last:rounded-e-lg rounded-none">
            <div className="mb-4">
              <h5 className="mb-1">Card Title</h5>
              <p>Card Sub Title</p>
            </div>
            <div className="mb-4">
              <img
                className="rounded-lg"
                src={Images.card_01}
                alt="card"
              />
            </div>
            <p>
              Lush green terraces cascade along misty hills, creating a peaceful
              place landscape
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="md:flex items-center block"&gt; {"\n"}
          {"\t"}&lt;div class="p-5 border border-border-color first:rounded-s-lg
          last:rounded-e-lg rounded-none"&gt;{"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty hills, creating
          a peaceful place landscape&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5 border border-border-color first:rounded-s-lg
          last:rounded-e-lg rounded-none"&gt;{"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty hills, creating
          a peaceful place landscape&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5 border border-border-color first:rounded-s-lg
          last:rounded-e-lg rounded-none"&gt;{"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Card Sub Title&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="mb-4"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg" src={Images.card_01}
          alt="card"&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;p&gt;Lush green terraces cascade along misty hills, creating
          a peaceful place landscape&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Card Group without Image</h5>
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
        <div className="md:flex items-center block">
          <div className="p-5 bg-white border border-border-color first:rounded-s-lg last:rounded-e-lg rounded-none overflow-hidden">
            <h5 className="mb-1">Card Title</h5>
            <p className="mb-4">
              Lush green terraces cascade along misty hills, creating a peaceful
              Place.
            </p>
            <Link className="underline text-info hover:text-primary" to="#">
              View More
            </Link>
          </div>
          <div className="p-5 bg-white border border-border-color first:rounded-s-lg last:rounded-e-lg rounded-none overflow-hidden">
            <h5 className="mb-1">Card Title</h5>
            <p className="mb-4">
              Lush green terraces cascade along misty hills, creating a peaceful
              Place.
            </p>
            <Link className="underline text-info hover:text-primary" to="#">
              View More
            </Link>
          </div>
          <div className="p-5 bg-white border border-border-color first:rounded-s-lg last:rounded-e-lg rounded-none overflow-hidden">
            <h5 className="mb-1">Card Title</h5>
            <p className="mb-4">
              Lush green terraces cascade along misty hills, creating a peaceful
              Place.
            </p>
            <Link className="underline text-info hover:text-primary" to="#">
              View More
            </Link>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="md:flex items-center block"&gt; {"\n"}
          {"\t"}&lt;div class="p-5 bg-white border border-border-color
          first:rounded-s-lg last:rounded-e-lg rounded-none overflow-hidden"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="underline text-info"&gt;View
          More&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5 bg-white border border-border-color
          first:rounded-s-lg last:rounded-e-lg rounded-none overflow-hidden"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="underline text-info"&gt;View
          More&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;div class="p-5 bg-white border border-border-color
          first:rounded-s-lg last:rounded-e-lg rounded-none overflow-hidden"&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful Place.&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;a to="#" class="underline text-info"&gt;View
          More&lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Streched Link</h5>
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
        <div className="md:flex block gap-6">
          <div className="preview-content border border-border-color rounded-lg overflow-hidden">
            <img src={Images.card_01} alt="card" />
            <div className="p-5">
              <h5 className="mb-1">Card Title</h5>
              <p>
                Lush green terraces cascade along misty hills, creating a
                peaceful place landscape
              </p>
            </div>
          </div>
          <div className="preview-content border border-border-color rounded-lg overflow-hidden">
            <img src={Images.card_01} alt="card" />
            <div className="p-5">
              <p className="mb-2.5">
                Lush green terraces cascade along misty hills, creating a
                peaceful place landscape
              </p>
              <button
                type="button"
                className="btn-sm flex items-center justify-center gap-1.5 cursor-pointer bg-light font-semibold border border-border-color text-dark text-center hover:bg-primary-800 hover:text-white dark:hover:text-dark!"
              >
                Go Somewhere <i className="icon icon-chevron-right" />
              </button>
            </div>
          </div>
          <div className="preview-content border border-border-color rounded-lg overflow-hidden">
            <img src={Images.card_01} alt="card" />
            <div className="p-5">
              <p className="mb-2.5">
                Lush green terraces cascade along misty hills, creating a
                peaceful place landscape
              </p>
              <Link className="underline text-info hover:text-primary" to="#">
                View More
              </Link>
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
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-30px] overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="md:flex block gap-6"&gt;{"\n"}
          {"\t"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img src={Images.card_01} alt="card"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;h5 class="mb-1"&gt;Card Title&lt;/h5&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;p&gt; Lush green terraces cascade along misty hills,
          creating a peaceful place landscape &lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\t"}
          {"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img src={Images.card_01} alt="card"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;p class="mb-2.5"&gt;Lush green terraces cascade along misty
          hills, creating a peaceful place landscape&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;button type="button" class="btn-sm flex items-center
          justify-center gap-1.5 cursor-pointer bg-light font-semibold border
          border-border-color text-dark text-center hover:bg-light-900
          hover:text-dark" &gt; Go Somewhere &lt;i class="icon
          icon-chevron-right"&gt;&lt;/i&gt; &lt;/button&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="border border-border-color rounded-lg
          overflow-hidden"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img src={Images.card_01} alt="card"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="p-5"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;p class="mb-2.5"&gt; Lush green terraces cascade along misty
          hills, creating a peaceful place landscape &lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a to="#" class="underline text-info"&gt;View
          More&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
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

export default UiCards