import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const UiToasts = () => {
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
            UI Toasts
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {/* Start Notification Toast */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
      <h2 className="text-lg max-lg:text-[17px] mb-5 pb-5 border-b border-border-color w-full">
        Stack
      </h2>
      {/* Toast */}
      <div
        className="max-w-xs w-full bg-white border border-border-color rounded-lg shadow-lg"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-stack-toggle-label"
      >
        <div className="flex gap-3 p-4">
          <i className="icon-bell text-primary shrink-0 text-[16px]!" />
          <div className="grow">
            <h3
              id="hs-toast-stack-toggle-label"
              className="text-[16px] text-dark mb-1"
            >
              App notifications
            </h3>
            <div className="text-sm text-dark">
              Notifications may include alerts, sounds and icon badges.
            </div>
            <div className="mt-4 flex gap-x-3">
              <button
                type="button"
                className="text-primary cursor-pointer hover:text-dark font-medium text-sm focus:outline-hidden focus:underline"
              >
                Don't allow
              </button>
              <button
                type="button"
                className="text-primary cursor-pointer hover:text-dark font-medium text-sm focus:outline-hidden focus:underline"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Toast */}
    </div>
    {/* End Notification Toast */}
    {/* Start Stack Toast */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
      <h2 className="text-lg max-lg:text-[17px] mb-5 pb-5 border-b border-border-color w-full">
        Call
      </h2>
      <button
        id="hs-new-toast"
        type="button"
        className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 dark:hover:text-dark! focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
      >
        Call Toast
      </button>
    </div>
    {/* End Stack Toast */}
    {/* Start Stack Toast */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
      <h2 className="text-lg max-lg:text-[17px] mb-5 pb-5 border-b border-border-color w-full">
        Stack
      </h2>
      {/* Toast */}
      <div
        className="max-w-xs w-full relative bg-white border border-border-color rounded-lg shadow-lg"
        id="dismiss-toast"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-progress-label"
      >
        <div className="flex items-center gap-x-3 p-4">
          <span className="shrink-0 inline-flex justify-center items-center w-12 h-12 rounded-full bg-light text-dark shrink-0">
            <i className="icon-cloud-upload" />
          </span>
          <button
            type="button"
            className="absolute top-3 end-3 cursor-pointer inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-dark opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100"
            data-hs-remove-element="#dismiss-toast"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <i className="icon-x" />
          </button>
          <div className="grow pe-4">
            <h3
              id="hs-toast-progress-label"
              className="text-dark font-medium text-sm"
            >
              Uploading 3 files
            </h3>
            {/* Progress */}
            <div className="mt-2 flex flex-col gap-x-3">
              <span className="block mb-1.5 text-xs text-muted-foreground-1">
                57% · 5 seconds left
              </span>
              <div
                className="flex w-full h-1 bg-light rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={57}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="flex flex-col justify-center overflow-hidden bg-primary text-xs text-primary-foreground text-center whitespace-nowrap"
                  style={{ width: "57%" }}
                />
              </div>
            </div>
            {/* End Progress */}
          </div>
        </div>
      </div>
      {/* End Toast */}
    </div>
    {/* End Stack Toast */}
    {/* Start Basic Toast */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
      <h2 className="text-lg max-lg:text-[17px] mb-5 pb-5 border-b border-border-color w-full">
        Basic
      </h2>
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-layer border border-border-color rounded-lg shadow-lg mb-3"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-info text-primary" />
          <div className="grow">
            <p id="hs-toast-normal-example-label" className="text-sm text-dark">
              This is a normal message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-layer border border-border-color rounded-lg shadow-lg mb-3"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-circle-check text-success" />
          <div className="grow">
            <p
              id="hs-toast-success-example-label"
              className="text-sm text-dark"
            >
              This is a success message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-layer border border-border-color rounded-lg shadow-lg mb-3"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-circle-x text-danger" />
          <div className="grow">
            <p id="hs-toast-danger-example-label" className="text-sm text-dark">
              This is a error message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-layer border border-border-color rounded-lg shadow-lg mb-0"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-triangle-alert text-warning" />
          <div className="grow">
            <p
              id="hs-toast-warning-example-label"
              className="text-sm text-dark"
            >
              This is a warning message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
    </div>
    {/* End Basic Toast */}
    {/* Start Solid Toast */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
      <h2 className="text-lg max-lg:text-[17px] mb-5 pb-5 border-b border-border-color w-full">
        Solid
      </h2>
      {/* Toast */}
      <div
        className="w-full bg-primary text-sm text-white rounded-lg shadow-lg mb-4"
        id="primary-solid"
        role="alert"
        tabIndex={-1}
        aria-labelledby="primary-solid"
      >
        <div
          id="hs-toast-solid-color-primary-label"
          className="flex p-4 text-white"
        >
          Hello, world! This is a toast message.
          <div className="ms-auto">
            <button
              type="button"
              data-hs-remove-element="#primary-solid"
              className="shrink-0 flex justify-center items-center size-5 cursor-pointer text-gray-200 hover:text-white focus:outline-hidden"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <i className="icon-x" />
            </button>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="w-full bg-success text-sm text-white rounded-lg shadow-lg mb-4"
        id="success-solid"
        role="alert"
        tabIndex={-1}
        aria-labelledby="success-solid"
      >
        <div
          id="hs-toast-solid-color-success-label"
          className="flex p-4 text-white"
        >
          Hello, world! This is a toast message.
          <div className="ms-auto">
            <button
              type="button"
              data-hs-remove-element="#success-solid"
              className="shrink-0 flex justify-center items-center size-5 cursor-pointer text-gray-200 hover:text-white focus:outline-hidden"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <i className="icon-x" />
            </button>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="w-full bg-danger text-sm text-white rounded-lg shadow-lg mb-4"
        id="danger-solid"
        role="alert"
        tabIndex={-1}
        aria-labelledby="danger-solid"
      >
        <div
          id="hs-toast-solid-color-danger-label"
          className="flex p-4 text-white"
        >
          Hello, world! This is a toast message.
          <div className="ms-auto">
            <button
              type="button"
              data-hs-remove-element="#danger-solid"
              className="shrink-0 flex justify-center items-center size-5 cursor-pointer text-gray-200 hover:text-white focus:outline-hidden"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <i className="icon-x" />
            </button>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="w-full bg-warning text-sm text-white rounded-lg shadow-lg mb-0"
        id="warning-solid"
        role="alert"
        tabIndex={-1}
        aria-labelledby="warning-solid"
      >
        <div
          id="hs-toast-solid-color-warning-label"
          className="flex p-4 text-white"
        >
          Hello, world! This is a toast message.
          <div className="ms-auto">
            <button
              type="button"
              data-hs-remove-element="#warning-solid"
              className="shrink-0 flex justify-center items-center size-5 cursor-pointer text-gray-200 hover:text-white focus:outline-hidden"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <i className="icon-x" />
            </button>
          </div>
        </div>
      </div>
      {/* End Toast */}
    </div>
    {/* End Solid Toast */}
    {/* Start Soft color variants Toast */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
      <h2 className="text-lg max-lg:text-[17px] mb-5 pb-5 border-b border-border-color w-full">
        Soft color variants
      </h2>
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-primary-50 border border-border-color rounded-lg shadow-lg mb-3"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-info text-primary" />
          <div className="grow">
            <p id="hs-toast-soft-color-label" className="text-sm text-dark">
              This is a normal message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-success-50 border border-border-color rounded-lg shadow-lg mb-3"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-circle-check text-success" />
          <div className="grow">
            <p
              id="hs-toast-success-soft-color-label"
              className="text-sm text-dark"
            >
              This is a success message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-danger-50 border border-border-color rounded-lg shadow-lg mb-3"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-circle-x text-danger" />
          <div className="grow">
            <p
              id="hs-toast-danger-soft-color-label"
              className="text-sm text-dark"
            >
              This is a error message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
      {/* Toast */}
      <div
        className="flex items-center w-full p-4 bg-warning-50 border border-border-color rounded-lg shadow-lg mb-0"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-normal-example-label"
      >
        <div className="flex gap-x-3">
          <i className="icon-triangle-alert text-warning" />
          <div className="grow">
            <p
              id="hs-toast-warning-soft-color-label"
              className="text-sm text-dark"
            >
              This is a warning message.
            </p>
          </div>
        </div>
      </div>
      {/* End Toast */}
    </div>
    {/* End Soft color variants Toast */}
  </div>
  {/* End grid */}
</div>

  )
}

export default UiToasts