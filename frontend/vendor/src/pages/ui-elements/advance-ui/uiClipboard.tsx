import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import { useCodeToggle } from "../../../hooks/useCodeToggle"

const UiClipboard = () => {
  const { showCode, copied, handleShowCode, handleCopy } = useCodeToggle()

  const handleClipboardCopy = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      const text = element.textContent || element.getAttribute('value') || ''
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!')
      })
    }
  }

  const handleClipboardCut = (targetId: string) => {
    const element = document.getElementById(targetId) as HTMLInputElement | HTMLTextAreaElement | HTMLElement | null
    if (element) {
      const text = 'value' in element ? (element as HTMLInputElement | HTMLTextAreaElement).value : element.textContent || ''
      navigator.clipboard.writeText(text).then(() => {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          element.value = ''
        } else {
          element.textContent = ''
        }
        alert('Cut to clipboard!')
      })
    }
  }

  const handleCopyHidden = (text: string) => {
    navigator.clipboard.writeText(String(text)).then(() => {
      alert('Copied to clipboard!')
    })
  }

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
              <li className="inline-flex items-center">
                <span className="text-gray-600">UI Elements</span>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li aria-current="page" className="text-gray-900">
                Clipboard
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
        <h5>Copy from input</h5>
        <button
          type="button"
          onClick={() => handleShowCode(1)}
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content clipboard ${showCode[1] ? 'hidden' : ''}`}>
        <form className="form-horizontal">
          <input
            type="text"
            id="input-copy"
            className="mb-4 w-full form-input block bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none form-input  block w-full bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            defaultValue="http://www.admin-dashboard.com"
          />
          <div className="flex flex-wrap align-items-center gap-2">
            <button
              type="button"
              onClick={() => handleClipboardCopy('input-copy')}
              className="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"
            >
              <i className="icon icon-clipboard me-1" /> Copy from Input
            </button>
            <button
              type="button"
              onClick={() => handleClipboardCut('input-copy')}
              className="btn inline-flex items-center bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white dark:bg-gray-100 dark:border-gray-100"
            >
              <i className="icon icon-scissors me-1" /> Cut from Input
            </button>
          </div>
        </form>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[1] ? '' : 'hidden'}`}>
        <button
          type="button"
          onClick={() => handleCopy(1, `<div class="clipboard">
\t<form class="form-horizontal">
\t\t<input type="text" id="input-copy" class="mb-4 w-full form-input block bg-light border-border-color rounded-lg focus:border-primary disabled:opacity-50 disabled:pointer-events-none" value="http://www.admin-dashboard.com">
\t\t<div class="flex flex-wrap align-items-center gap-2">
\t\t\t<button class="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"><i class="icon icon-clipboard me-1"></i> Copy from Input</button>
\t\t\t<button class="btn inline-flex items-center bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white dark:bg-gray-100 dark:border-gray-100"><i class="icon icon-scissors me-1"></i> Cut from Input</button>
\t\t</div>
\t</form>
</div>`)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[1] ? 'Copied!' : 'Copy'}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="clipboard"&gt;{"\n"}
          {"\t"}&lt;form class="form-horizontal"&gt;{"\n"}
          {"\t"}
          {"    "}&lt;input type="text" id="input-copy" class="mb-4 w-full
          form-input block bg-light border-border-color rounded-lg
          focus:border-primary disabled:opacity-50 disabled:pointer-events-none"
          value="http://www.admin-dashboard.com"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="flex flex-wrap align-items-center gap-2"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-primary border
          border-primary text-white text-center hover:bg-primary-900
          hover:border-primary-900 hover:text-white" to="#"
          data-clipboard-action="copy"
          data-clipboard-target="#input-copy"&gt;&lt;i class="icon
          icon-clipboard me-1"&gt;&lt;/i&gt; Copy from Input&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-dark border
          border-dark text-white text-center hover:bg-black hover:border-black
          hover:text-white dark:bg-gray-100 dark:border-gray-100"
          to="#" data-clipboard-action="cut"
          data-clipboard-target="#input-copy"&gt;&lt;i class="icon icon-scissors
          me-1"&gt;&lt;/i&gt; Cut from Input&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/form&gt;{"\n"}&lt;/div&gt;{"  "}
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Copy from input</h5>
        <button
          type="button"
          onClick={() => handleShowCode(2)}
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:ring-0 focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark focus:outline-none focus:border-border-color"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content clipboard ${showCode[2] ? 'hidden' : ''}`}>
        <form className="form-horizontal">
          <input
            type="text"
            id="input-copy2"
            className="mb-4 w-full form-input block bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none form-input  block w-full bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            defaultValue="http://www.admin-dashboard.com"
          />
          <div className="flex flex-wrap align-items-center gap-2">
            <button
              type="button"
              onClick={() => handleClipboardCopy('input-copy2')}
              className="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"
            >
              <i className="icon icon-clipboard me-1" /> Copy from Input
            </button>
            <button
              type="button"
              onClick={() => handleClipboardCut('input-copy2')}
              className="btn inline-flex items-center bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white dark:bg-gray-100 dark:border-gray-100"
            >
              <i className="icon icon-scissors me-1" /> Cut from Input
            </button>
          </div>
        </form>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[2] ? '' : 'hidden'}`}>
        <button
          type="button"
          onClick={() => handleCopy(2, `<div class="clipboard">
\t<form class="form-horizontal">
\t\t<input type="text" id="input-copy" class="mb-4 w-full form-input block bg-light border-border-color rounded-lg focus:border-primary disabled:opacity-50 disabled:pointer-events-none" value="http://www.admin-dashboard.com">
\t\t<div class="flex flex-wrap align-items-center gap-2">
\t\t\t<button class="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"><i class="icon icon-clipboard me-1"></i> Copy from Input</button>
\t\t\t<button class="btn inline-flex items-center bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white dark:bg-gray-100 dark:border-gray-100"><i class="icon icon-scissors me-1"></i> Cut from Input</button>
\t\t</div>
\t</form>
</div>`)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[2] ? 'Copied!' : 'Copy'}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="clipboard"&gt;{"\n"}
          {"\t"}&lt;form class="form-horizontal"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;input type="text" id="input-copy" class="mb-4 w-full
          form-input block bg-light border-border-color rounded-lg
          focus:border-primary disabled:opacity-50 disabled:pointer-events-none"
          value="http://www.admin-dashboard.com"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;div class="flex flex-wrap align-items-center gap-2"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-primary border
          border-primary text-white text-center hover:bg-primary-900
          hover:border-primary-900 hover:text-white" to="#"
          data-clipboard-action="copy"
          data-clipboard-target="#input-copy"&gt;&lt;i class="icon
          icon-clipboard me-1"&gt;&lt;/i&gt; Copy from Input&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-dark border
          border-dark text-white text-center hover:bg-black hover:border-black
          hover:text-white" to="#"
          data-clipboard-action="cut"
          data-clipboard-target="#input-copy"&gt;&lt;i class="icon icon-scissors
          me-1"&gt;&lt;/i&gt; Cut from Input&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/form&gt;{"\n"}&lt;/div&gt;{"  "}
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Copy from Text Area</h5>
        <button
          type="button"
          onClick={() => handleShowCode(3)}
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:ring-0 focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark focus:outline-none focus:border-border-color"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content clipboard ${showCode[3] ? 'hidden' : ''}`}>
        <form className="form-horizontal">
          <textarea
            id="textarea-copy"
            className="mb-4 py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block w-full bg-light border-border-color rounded-lg sm:text-sm text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            rows={3}
            defaultValue={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            }
          />
          <div className="flex flex-wrap align-items-center gap-2">
            <button
              type="button"
              onClick={() => handleClipboardCopy('textarea-copy')}
              className="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"
            >
              <i className="icon icon-clipboard me-1" /> Copy from Input
            </button>
            <button
              type="button"
              onClick={() => handleClipboardCut('textarea-copy')}
              className="btn inline-flex items-center bg-dark border border-dark text-white text-center hover:bg-black hover:border-black dark:bg-gray-100 dark:border-gray-100 hover:text-white"
            >
              <i className="icon icon-scissors me-1" /> Cut from Input
            </button>
          </div>
        </form>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[3] ? '' : 'hidden'}`}>
        <button
          type="button"
          onClick={() => handleCopy(3, `<div class="clipboard">
\t<form class="form-horizontal">
\t\t<textarea id="textarea-copy" class="mb-4 py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block w-full bg-light border-border-color rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" rows="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</textarea>
\t\t<div class="flex flex-wrap align-items-center gap-2">
\t\t\t<button class="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"><i class="icon icon-clipboard me-1"></i> Copy from Input</button>
\t\t\t<button class="btn inline-flex items-center bg-dark border border-dark text-white text-center hover:bg-black hover:border-black hover:text-white"><i class="icon icon-scissors me-1"></i> Cut from Input</button>
\t\t</div>
\t</form>
</div>`)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[3] ? 'Copied!' : 'Copy'}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="clipboard"&gt;{"\n"}
          {"\t"}&lt;form class="form-horizontal"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;textarea id="textarea-copy" class="mb-4 py-2.5 px-2.5
          sm:py-2.5 sm:px-2.5 block w-full bg-light border-border-color
          rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500
          disabled:opacity-50 disabled:pointer-events-none" rows="3"&gt;Lorem
          ipsum dolor sit amet, consectetur adipiscing elit...&lt;/textarea&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="flex flex-wrap align-items-center gap-2"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-primary border
          border-primary text-white text-center hover:bg-primary-900
          hover:border-primary-900 hover:text-white" to="#"
          data-clipboard-action="copy"
          data-clipboard-target="#textarea-copy"&gt;&lt;i class="icon
          icon-clipboard me-1"&gt;&lt;/i&gt; Copy from Input&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-dark border
          border-dark text-white text-center hover:bg-black hover:border-black
          hover:text-white" to="#"
          data-clipboard-action="cut"
          data-clipboard-target="#textarea-copy"&gt;&lt;i class="icon
          icon-scissors me-1"&gt;&lt;/i&gt; Cut from Input&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/form&gt;{"\n"}&lt;/div&gt;{"  "}
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Copy Text from Paragraph</h5>
        <button
          type="button"
          onClick={() => handleShowCode(4)}
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content clipboard ${showCode[4] ? 'hidden' : ''}`}>
        <form className="form-horizontal">
          <p className="mb-1">
            Here is your OTP <span id="paragraph-copy1">22991</span>.
          </p>
          <p className="mb-4">Please do not share it to anyone</p>
          <div className="flex flex-wrap align-items-center gap-2">
            <button
              type="button"
              onClick={() => handleClipboardCopy('paragraph-copy1')}
              className="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"
            >
              <i className="icon icon-clipboard me-1" /> Copy from Input
            </button>
          </div>
        </form>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[4] ? '' : 'hidden'}`}>
        <button
          type="button"
          onClick={() => handleCopy(4, `<div class="clipboard">
\t<form class="form-horizontal">
\t\t<p class="mb-1">Here is your OTP <span id="paragraph-copy1">22991</span>.</p>
\t\t<p class="mb-4">Please do not share it to anyone</p>
\t\t<div class="flex flex-wrap align-items-center gap-2">
\t\t\t<button class="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"><i class="icon icon-clipboard me-1"></i> Copy from Input</button>
\t\t</div>
\t</form>
</div>`)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[4] ? 'Copied!' : 'Copy'}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="clipboard"&gt;{"\n"}
          {"\t"}&lt;form class="form-horizontal"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-1"&gt;Here is your OTP &lt;span
          id="paragraph-copy1"&gt;22991&lt;/span&gt;.&lt;/p&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Please do not share it to anyone&lt;/p&gt;{" "}
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="flex flex-wrap align-items-center gap-2"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-primary border
          border-primary text-white text-center hover:bg-primary-900
          hover:border-primary-900 hover:text-white" to="#"
          data-clipboard-action="copy"
          data-clipboard-target="#paragraph-copy1"&gt;&lt;i class="icon
          icon-clipboard me-1"&gt;&lt;/i&gt; Copy from Input&lt;/a&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/form&gt;{"\n"}&lt;/div&gt;{"  "}
          {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Copy Hidden Text (Advanced)</h5>
        <button
          type="button"
          onClick={() => handleShowCode(5)}
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content clipboard ${showCode[5] ? 'hidden' : ''}`}>
        <form className="form-horizontal">
          <p className="mb-4">
            Link -&gt;{" "}
            <span id="advanced-paragraph">http://www.example.com/example</span>
          </p>
          <div className="flex flex-wrap align-items-center gap-2">
            <button
              type="button"
              onClick={() => handleClipboardCopy('advanced-paragraph')}
              className="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"
            >
              <i className="icon icon-clipboard me-1" /> Copy from Input
            </button>
            <button
              type="button"
              onClick={() => handleCopyHidden(`2291`)}
              className="btn inline-flex items-center bg-warning border border-warning text-white text-center hover:bg-warning-900 hover:border-warning-900 hover:text-white"
            >
              <i className="icon icon-clipboard me-1" /> Copy Hidden Code
            </button>
          </div>
        </form>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[5] ? '' : 'hidden'}`}>
        <button
          type="button"
          onClick={() => handleCopy(5, `<div class="clipboard">
\t<form class="form-horizontal">
\t\t<p class="mb-4">Link -&gt; <span id="advanced-paragraph">http://www.example.com/example</span></p>
\t\t<div class="flex flex-wrap align-items-center gap-2">
\t\t\t<button class="btn inline-flex items-center bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:border-primary-900 hover:text-white"><i class="icon icon-clipboard me-1"></i> Copy from Input</button>
\t\t\t<button class="btn inline-flex items-center bg-warning border border-warning text-white text-center hover:bg-warning-900 hover:border-warning-900 hover:text-white"><i class="icon icon-clipboard me-1"></i> Copy Hidden Code</button>
\t\t</div>
\t</form>
</div>`)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[5] ? 'Copied!' : 'Copy'}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="clipboard"&gt;{"\n"}
          {"\t"}&lt;form class="form-horizontal"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;p class="mb-4"&gt;Link -&gt; &lt;span
          id="advanced-paragraph"&gt;http://www.example.com/example&lt;/span&gt;&lt;/p&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;div class="flex flex-wrap align-items-center gap-2"&gt;
          {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-primary border
          border-primary text-white text-center hover:bg-primary-900
          hover:border-primary-900 hover:text-white" to="#"
          data-clipboard-action="copy"
          data-clipboard-target="#advanced-paragraph"&gt;&lt;i class="icon
          icon-clipboard me-1"&gt;&lt;/i&gt; Copy from Input&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="btn inline-flex items-center bg-warning border
          border-warning text-white text-center hover:bg-warning-900
          hover:border-warning-900 hover:text-white" to="#"
          data-clipboard-action="copy" data-clipboard-text="2291"&gt;&lt;i
          class="icon icon-clipboard me-1"&gt;&lt;/i&gt; Copy Hidden
          Code&lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;/form&gt;{"\n"}&lt;/div&gt; {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>{" "}
  {/* end grid */}
</div>

  )
}

export default UiClipboard


