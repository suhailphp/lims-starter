import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Path } from '../../../routes/path';

const UiTypography = () => {
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
            Typography
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  <div className="grid grid-cols-12 gap-6">
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5 flex flex-col h-full">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <div className="text-[17px] text-dark font-bold">Display Headings</div>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-2 flex-1">
        <h1 className="text-[64px] max-md:text-6xl">Display 1</h1>
        <h1 className="text-[56px] max-md:text-5xl">Display 2</h1>
        <h1 className="text-[48px] max-md:text-4xl">Display 3</h1>
        <h1 className="text-[36px] max-md:text-3xl">Display 4</h1>
        <h1 className="text-[24px] max-md:text-xl">Display 5</h1>
        <h1 className="text-[18px] max-md:text-base">Display 6</h1>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden">
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
          {"\n"}&lt;div class="flex flex-col gap-2"&gt;{"\n"}
          {"\t"}&lt;h1 class="text-[64px]"&gt;Display 1&lt;/h1&gt;{"\n"}
          {"\t"}&lt;h1 class="text-[56px]"&gt;Display 2&lt;/h1&gt;{"\n"}
          {"\t"}&lt;h1 class="text-[48px]"&gt;Display 3&lt;/h1&gt;{"\n"}
          {"\t"}&lt;h1 class="text-[36px]"&gt;Display 4&lt;/h1&gt;{"\n"}
          {"\t"}&lt;h1 class="text-[24px]"&gt;Display 5&lt;/h1&gt;{"\n"}
          {"\t"}&lt;h1 class="text-[18px]"&gt;Display 6&lt;/h1&gt; {"\n"}
          &lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card lg:col-span-6 col-span-12 bg-white rounded-md border border-border-color p-5 flex flex-col h-full">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <div className="text-[17px] text-dark font-bold">Headings</div>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content flex flex-col gap-2 flex-1">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden">
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
          {"\n"}&lt;div class="flex flex-col gap-2"&gt;{"\n"}
          {"\t"}&lt;h1&gt;Heading 1&lt;/h1&gt;{"\n"}
          {"\t"}&lt;h2&gt;Heading 2&lt;/h2&gt;{"\n"}
          {"\t"}&lt;h3&gt;Heading 3&lt;/h3&gt;{"\n"}
          {"\t"}&lt;h4&gt;Heading 4&lt;/h4&gt;{"\n"}
          {"\t"}&lt;h5&gt;Heading 5&lt;/h5&gt;{"\n"}
          {"\t"}&lt;h6&gt;Heading 6&lt;/h6&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>
</div>

  )
}

export default UiTypography