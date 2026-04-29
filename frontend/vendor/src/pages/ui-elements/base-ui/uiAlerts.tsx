import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiAlerts = () => {
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
            Alerts
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-baseline">
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Basic Alerts</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content border-dashed border-primary border px-4.5 py-5 rounded-md">
        <div
          role="alert"
          className="p-4 font-medium bg-primary rounded-lg text-white mb-3"
        >
          This is a simple alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-dark rounded-lg text-white mb-3 dark:text-white!"
        >
          This is a simple alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-warning rounded-lg text-white mb-3"
        >
          This is a simple alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-info rounded-lg text-white mb-3"
        >
          This is a simple alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-success rounded-lg text-white mb-3"
        >
          This is a simple alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-danger rounded-lg text-white"
        >
          This is a simple alert
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-primary
          rounded-lg text-white mb-3"&gt;{"\n"}
          {"        "}This is a simple alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-dark rounded-lg
          text-white mb-3"&gt;{"\n"}
          {"        "}This is a simple alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-warning
          rounded-lg text-white mb-3"&gt;{"\n"}
          {"        "}This is a simple alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-info rounded-lg
          text-white mb-3"&gt;{"\n"}
          {"        "}This is a simple alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-success
          rounded-lg text-white mb-3"&gt;{"\n"}
          {"        "}This is a simple alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-danger
          rounded-lg text-white"&gt;{"\n"}
          {"        "}This is a simple alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Ghost Alerts</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content border-dashed border-primary border px-4.5 py-5 rounded-md">
        <div
          role="alert"
          className="p-4 font-medium bg-primary-50 rounded-lg text-primary mb-3"
        >
          This is a simple primary alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-gray-50 rounded-lg text-dark mb-3"
        >
          This is a simple light alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-warning-50 rounded-lg text-warning mb-3"
        >
          This is a simple warning alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-info-50 rounded-lg text-info mb-3"
        >
          This is a simple info alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-success-50 rounded-lg text-success mb-3"
        >
          This is a simple success alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium bg-danger-50 rounded-lg text-danger"
        >
          This is a simple error alert
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-primary-50
          rounded-lg text-primary mb-3"&gt;{"\n"}
          {"        "}This is a simple primary alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-gray-50
          rounded-lg text-dark mb-3"&gt;{"\n"}
          {"        "}This is a simple light alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-warning-50
          rounded-lg text-warning mb-3"&gt;{"\n"}
          {"        "}This is a simple warning alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-info-50
          rounded-lg text-info mb-3"&gt;{"\n"}
          {"        "}This is a simple info alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-success-50
          rounded-lg text-success mb-3"&gt;{"\n"}
          {"        "}This is a simple success alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium bg-danger-50
          rounded-lg text-danger"&gt;{"\n"}
          {"        "}This is a simple error alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Outline Alerts</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content border-dashed border-primary border px-4.5 py-5 rounded-md">
        <div
          role="alert"
          className="p-4 font-medium border border-primary rounded-lg text-primary mb-3"
        >
          This is a simple primary alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium border border-border-color rounded-lg text-dark mb-3"
        >
          This is a simple dark alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium border border-warning rounded-lg text-warning mb-3"
        >
          This is a simple warning alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium border border-info rounded-lg text-info mb-3"
        >
          This is a simple info alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium border border-success rounded-lg text-success mb-3"
        >
          This is a simple success alert
        </div>
        <div
          role="alert"
          className="p-4 font-medium border border-danger rounded-lg text-danger"
        >
          This is a simple error alert
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
        {"    "}
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"} &lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium border
          border-primary rounded-lg text-primary mb-3"&gt;{"\n"}
          {"        "}This is a simple primary alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium border
          border-border-color rounded-lg text-dark mb-3"&gt;{"\n"}
          {"        "}This is a simple dark alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium border
          border-warning rounded-lg text-warning mb-3"&gt;{"\n"}
          {"        "}This is a simple warning alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium border border-info
          rounded-lg text-info mb-3"&gt;{"\n"}
          {"        "}This is a simple info alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium border
          border-success rounded-lg text-success mb-3"&gt;{"\n"}
          {"        "}This is a simple success alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="p-4 font-medium border
          border-danger rounded-lg text-danger"&gt;{"\n"}
          {"        "}This is a simple error{"  "}alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}&lt;/div&gt;{"\n"}
          {"    "}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Alerts with Icons</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content border-dashed border-primary border px-4.5 py-5 rounded-md">
        <div
          role="alert"
          className="flex items-center p-4 font-medium bg-primary-50 rounded-lg text-primary mb-3"
        >
          <i className="icon icon-info me-1" />
          This is a primary alert
        </div>
        <div
          role="alert"
          className="flex items-center p-4 font-medium bg-gray-50 rounded-lg text-dark mb-3"
        >
          <i className="icon icon-copy-check me-1" />
          This is a light alert
        </div>
        <div
          role="alert"
          className="flex items-center p-4 font-medium bg-warning-50 rounded-lg text-warning mb-3"
        >
          <i className="icon icon-triangle-alert me-1" />
          This is a warning alert
        </div>
        <div
          role="alert"
          className="flex items-center p-4 font-medium bg-info-50 rounded-lg text-info mb-3"
        >
          <i className="icon icon-badge-info me-1" />
          This is a info alert
        </div>
        <div
          role="alert"
          className="flex items-center p-4 font-medium bg-success-50 rounded-lg text-success mb-3"
        >
          <i className="icon icon-badge-check me-1" />
          This is a success alert
        </div>
        <div
          role="alert"
          className="flex items-center p-4 font-medium bg-danger-50 rounded-lg text-danger"
        >
          <i className="icon icon-octagon-alert me-1" />
          This is a error alert
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="flex items-center p-4 font-medium
          bg-primary-50 rounded-lg text-primary mb-3"&gt;{"\n"}
          {"        "}&lt;i class="icon icon-info me-1"&gt;&lt;/i&gt;This is a
          primary alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="flex items-center p-4 font-medium
          bg-gray-50 rounded-lg text-dark mb-3"&gt;{"\n"}
          {"        "}&lt;i class="icon icon-copy-check me-1"&gt;&lt;/i&gt;This
          is a light alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="flex items-center p-4 font-medium
          bg-warning-50 rounded-lg text-warning mb-3"&gt;{"\n"}
          {"        "}&lt;i class="icon icon-triangle-alert
          me-1"&gt;&lt;/i&gt;This is a{"  "}warning alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="flex items-center p-4 font-medium
          bg-info-50 rounded-lg text-info mb-3"&gt;{"\n"}
          {"        "}&lt;i class="icon icon-badge-info me-1"&gt;&lt;/i&gt;This
          is a info alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="flex items-center p-4 font-medium
          bg-success-50 rounded-lg text-success mb-3"&gt;{"\n"}
          {"        "}&lt;i class="icon icon-badge-check me-1"&gt;&lt;/i&gt;This
          is a success alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}
          {"    "}&lt;div role="alert" class="flex items-center p-4 font-medium
          bg-danger-50 rounded-lg text-danger"&gt;{"\n"}
          {"        "}&lt;i class="icon icon-octagon-alert
          me-1"&gt;&lt;/i&gt;This is a error alert{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Alert with List</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-4 bg-danger-50 rounded-lg">
        <p className="text-danger flex items-center font-medium mb-2.5">
          <i className="icon icon-octagon-alert me-1" /> There were 2 errors
          with your submission
        </p>
        <ul>
          <li className="text-danger">
            Your password must be at least 8 characters
          </li>
          <li className="text-danger">
            Your password must include at least one special Character
          </li>
        </ul>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-4 bg-danger-50 rounded-lg"&gt;{"\n"}
          {"    "}&lt;p class="text-danger flex items-center font-medium
          mb-2.5"&gt;{"\n"}
          {"        "}&lt;i class="icon icon-octagon-alert me-1"&gt;&lt;/i&gt;
          {"\n"}
          {"        "}There were 2 errors with your submission{"\n"}
          {"    "}&lt;/p&gt; {"\n"}
          {"    "}&lt;ul&gt;{"\n"}
          {"        "}&lt;li class="text-danger"&gt;Your password must be at
          least 8 characters&lt;/li&gt;{"\n"}
          {"        "}&lt;li class="text-danger"&gt;Your password must include
          at least one special Character&lt;/li&gt;{"\n"}
          {"    "}&lt;/ul&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Alert with Actions</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content p-4 bg-success-50 rounded-lg">
        <p className="text-success flex items-center font-medium mb-2.5">
          <i className="icon icon-octagon-alert me-1" /> There were 2 success
          with your submission
        </p>
        <ul>
          <li className="text-success">
            Your password must be at least 8 characters
          </li>
          <li className="text-success">
            Your password must include at least one special Character
          </li>
        </ul>
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
        <code className="language-html block w-full max-h-[450px] mb-[-21px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="p-4 bg-success-50 rounded-lg"&gt;{"\n"}
          {"    "}&lt;p class="text-success flex items-center font-medium
          mb-2.5"&gt;{"\n"}
          {"    "}&lt;i class="icon icon-octagon-alert me-1"&gt;&lt;/i&gt;{"\n"}
          {"        "}There were 2 success with your submission{"\n"}
          {"    "}&lt;/p&gt; {"\n"}
          {"    "}&lt;ul&gt;{"\n"}
          {"        "}&lt;li class="text-success"&gt;Your password must be at
          least 8 characters&lt;/li&gt;{"\n"}
          {"        "}&lt;li class="text-success"&gt;Your password must include
          at least one special Character&lt;/li&gt;{"\n"}
          {"    "}&lt;/ul&gt;{"\n"}&lt;/div&gt;{"\n"}
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

export default UiAlerts