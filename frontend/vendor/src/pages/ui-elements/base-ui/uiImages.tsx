import { useEffect } from 'react'
import ImageWithBasePath from '../../../components/image-with-base-path';
import { Images } from '../../../utils/imagePath';
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiImages = () => {
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
            Images
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-12 gap-6 items-baseline">
    <div className="preview-card md:col-span-6 sm:col-span-6  col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Image</h5>
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
        <ImageWithBasePath
          className="rounded-lg"
          src={Images.card_02}
          alt="img"
        />
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
          {"\n"}&lt;img class="rounded-lg" src={Images.card_02}
          alt="image"&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card md:col-span-6 sm:col-span-6  col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Image Thumbnail</h5>
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
        <ImageWithBasePath
          className="border-4 border-border-color rounded-lg"
          src={Images.card_02}
          alt="img"
        />
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
          {"\n"}&lt;img class="border-2 border-border-color rounded-lg"
          src={Images.card_02} alt="image"&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card md:col-span-6 sm:col-span-6  col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Circle</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-center justify-center">
        <ImageWithBasePath
          className="rounded-full w-50"
          src={Images.avatar_01}
          alt="img"
        />
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
          {"\n"}&lt;div class="flex items-center justify-center"&gt;{"\n"}
          {"\t"}&lt;img class="rounded-full w-50"
          src={Images.avatar_01} alt="image"&gt;{"\n"}
          &lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card md:col-span-6 sm:col-span-6  col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Rounded Bordered</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-center justify-center">
        <ImageWithBasePath
          className="rounded-full border-4 border-border-color w-50"
          src={Images.avatar_03}
          alt="img"
        />
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
          {"\n"}&lt;div class="flex items-center justify-center"&gt;{"\n"}
          {"\t"}&lt;img class="rounded-full border-2 border-border-color w-50"
          src={Images.avatar_01} alt="image"&gt;{"\n"}
          &lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Image Left Align</h5>
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
        <ImageWithBasePath
          className="rounded-lg w-46"
          src={Images.card_02}
          alt="img"
        />
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
          {"\n"}&lt;img class="rounded-lg w-46"
          src={Images.card_02} alt="image"&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card sm:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Image Center Align</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-center justify-center">
        <ImageWithBasePath
          className="rounded-lg w-46"
          src={Images.card_02}
          alt="img"
        />
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
          {"\n"}&lt;div class="flex items-center justify-center"&gt;{"\n"}
          {"\t"}&lt;img class="rounded-lg w-46"
          src={Images.card_02} alt="image"&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card xl:col-span-6 sm:col-span-12 col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Image Right Align</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex items-end justify-end">
        <ImageWithBasePath
          className="rounded-lg w-46"
          src={Images.card_02}
          alt="img"
        />
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
          {"\n"}&lt;div class="flex items-end justify-end"&gt;{"\n"}
          {"\t"}&lt;img class="rounded-lg w-46"
          src={Images.card_02} alt="image"&gt;{"\n"}&lt;/div&gt;
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Figures</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <ImageWithBasePath
            className="rounded-lg w-auto mb-2"
            src={Images.card_02}
            alt="img"
          />
          <p className="text-start">A caption for the above image.</p>
        </div>
        <div>
          <ImageWithBasePath
            className="rounded-lg w-auto mb-2"
            src={Images.card_02}
            alt="img"
          />
          <p className="text-center">A caption for the above image.</p>
        </div>
        <div>
          <ImageWithBasePath
            className="rounded-lg w-auto mb-2"
            src={Images.card_02}
            alt="img"
          />
          <p className="text-end">A caption for the above image.</p>
        </div>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          {"\n"}
          {"\t"}
          <i className="icon icon-copy" />
          <span>Copy</span>
          {"\n"}
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex gap-6"&gt;{"\n"}
          {"\t"}&lt;div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg w-auto mb-2"
          src={Images.card_02} alt="image"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="text-start"&gt;A caption for the above
          image.&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"  "}
          {"\n"}
          {"\n"}
          {"\t"}&lt;div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg w-auto mb-2"
          src={Images.card_02} alt="image"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="text-center"&gt;A caption for the above
          image.&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\n"}
          {"\t"}&lt;div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="rounded-lg w-auto mb-2"
          src={Images.card_02} alt="image"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="text-end"&gt;A caption for the above
          image.&lt;/p&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default UiImages