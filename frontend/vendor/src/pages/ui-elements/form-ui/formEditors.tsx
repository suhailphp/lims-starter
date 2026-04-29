import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import TextEditor from "../../../components/commom-texteditor/textEditor"
import { useCodeToggle } from "../../../hooks/useCodeToggle"
import { useState } from "react"

const FormEditors = () => {
  const { showCode, copied, handleShowCode, handleCopy } = useCodeToggle()
  const [editorValue, setEditorValue] = useState("<p>Hello World!</p>")
  const [bubbleValue, setBubbleValue] = useState("<p>Bubble editor content</p>")

  const editorCode = `<TextEditor
  value={editorValue}
  onChange={setEditorValue}
  placeholder="Type your content..."
/>`

  return (
   <div className="p-6">
  {/* Breadcrumb */}
  <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6 ">
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
            Form Editors
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* State grid */}
  <div className="grid grid-cols-1 gap-6 form-editor">
    <div className="preview-card  bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h2 className="text-lg max-lg:text-[17px]">Quill Editor</h2>
        <button
          type="button"
          onClick={() => handleShowCode(1)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content ${showCode[1] ? "hidden" : ""}`}>
        <TextEditor
          value={editorValue}
          onChange={setEditorValue}
          placeholder="Hello World!

This is an simple editable area.

Select a text to reveal the toolbar.
Edit rich document on-the-fly, so elastic!

End of simple area"
          minHeight="220px"
        />
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[1] ? "" : "hidden"}`}>
        <button
          type="button"
          onClick={() => handleCopy(1, editorCode)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[1] ? "Copied!" : "Copy"}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {`\n${editorCode}\n`}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h2 className="text-lg max-lg:text-[17px]">Quill Bubble Editor</h2>
        <button
          type="button"
          onClick={() => handleShowCode(2)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content ${showCode[2] ? "hidden" : ""}`}>
        <TextEditor
          value={bubbleValue}
          onChange={setBubbleValue}
          placeholder="Hello World!

This is an simple editable area.

Select a text to reveal the toolbar.
Edit rich document on-the-fly, so elastic!

End of simple area"
          minHeight="220px"
        />
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[2] ? "" : "hidden"}`}>
        <button
          type="button"
          onClick={() => handleCopy(2, editorCode)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[2] ? "Copied!" : "Copy"}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {`\n${editorCode}\n`}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default FormEditors