import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import { useState } from "react"

const AddPrompt = () => {
  const [promptValue, setPromptValue] = useState("")
  const [activeTemplateIndex, setActiveTemplateIndex] = useState<number | null>(
    null
  )
  const [showAnalysisSource, setShowAnalysisSource] = useState(false)

  const templates = [
    {
      title: "SEO Blog Post Writer",
      content:
        "You are a helpful customer support agent. Respond to {{customer_name}}'s inquiry...",
    },
    {
      title: "Social Media Visual Content",
      content:
        "Summarize the following text in {{length}} sentences, focusing on aspects related....",
    },
    {
      title: "Product Demo Video Generator",
      content:
        "Write a compelling product description for {{product_name}} that highlights these....",
    },
  ]

  const handleTemplateClick = (content: string, index: number) => {
    setPromptValue(content)
    setActiveTemplateIndex(index)
  }

  return (
    <div className="p-6">
  {/* Breadcrumb */}
  <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
    <div className="my-auto">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center flex-wrap space-x-1 md:space-x-2">
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
          <li className="text-default">
            <Link
              to={Path.promptTemplates}
              className="text-default hover:text-primary"
            >
              Prompt Templates
            </Link>
          </li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className="text-gray-900">
            Add Prompt
          </li>
        </ol>
      </nav>
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      <Link
        to={Path.promptTemplates}
        className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i className="icon-chevron-left" />
        Back to Templates
      </Link>
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
    <div className="xl:col-span-5 lg:col-span-12">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
        <div className="mb-5 pb-5 border-b border-border-color">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            Recent Templates
          </h2>
        </div>
        <div className="space-y-2">
          {templates.map((template, index) => (
            <div
              key={template.title}
              className={`bg-white p-5 border border-border-color rounded-lg shadow cursor-pointer prompt-card hover:bg-light [&.active]:bg-light ${
                activeTemplateIndex === index ? "active" : ""
              }`}
              onClick={() => handleTemplateClick(template.content, index)}
            >
              <h3 className="text-base mb-1">{template.title}</h3>
              <p className="line-clamp-2">{template.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>{" "}
    {/* end col */}
    <div className="xl:col-span-7 lg:col-span-12">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 mb-6">
        <div className="mb-5 pb-5 border-b border-border-color">
          <h2 className="text-lg max-lg:text-[17px]">Prompt</h2>
        </div>
        <label htmlFor="enter-prompt" className="mb-1 block font-semibold text-gray-900">
          Enter Prompt
        </label>
        <textarea
          className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
          rows={3}
          id="enter-prompt"
          value={promptValue}
          onChange={(event) => setPromptValue(event.target.value)}
        />
        <p className="text-xs mt-1">Minimum 50 Characters Required</p>
        <div className="border-t border-border-color pt-5 mt-5 flex justify-end">
          <button
            type="button"
            className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            id="analyze-btn"
            onClick={() => setShowAnalysisSource(true)}
          >
            <i className="icon-check-check" />
            Analyze Prompt
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
        <div className="mb-5 pb-5 border-b border-border-color">
          <h2 className="text-lg max-lg:text-[17px]">Analysis</h2>
        </div>
        <div className="bg-light border border-border-color shadow rounded-lg p-5 flex flex-col justify-center items-center">
          <div className={`analysis-content text-center ${showAnalysisSource ? "hidden" : ""}`}>
            <div className="text-4xl text-gray-900 mb-4">
              <i className="icon-clipboard-pen" />
            </div>
            <h3 className="mb-2 text-lg max-lg:text-[17px]">No Analysis Yet</h3>
            <p className="mb-0">
              Enter a prompt and click "Analyze Prompt" to get AI feedback on
              its effectiveness.
            </p>
          </div>
          <div id="analysis-source" className={showAnalysisSource ? "" : "hidden"}>
            On your prompt, here's my analysis: This prompt is well-structured
            and clear in its instructions. It provides specific guidance on the
            tone (empathetic, clear, solution-oriented) and purpose (customer
            support response). Strengths: - Clear variables that can be easily
            replaced - Specific instructions on tone and approach - Focused on a
            single, well-defined task Potential improvements: - Consider adding
            a variable for specific solutions to recommend - You might want to
            include guidance on response length - Could benefit from examples of
            good/bad responses Overall effectiveness score: 8/10
          </div>
          <pre
            id="analysis-output"
            className="text-sm whitespace-pre-wrap justify-content-start"
          />
        </div>
        <div className="border-t border-border-color pt-5 mt-5 flex justify-end">
          <button
            type="button"
            className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
            id="copy-btn"
          >
            <i className="icon-copy" />
            Copy Analysis
          </button>
        </div>
      </div>
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default AddPrompt