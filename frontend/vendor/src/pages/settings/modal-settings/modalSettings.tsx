
import { Link } from "react-router-dom"
import CommonSelect from "../../../components/common-select/commonSelect"
import {
  baseModels,
  embeddingModels,
  imageGenerationModels,
  tokenLimits,
} from "../../../utils/json/selectData"
import { Path } from "../../../routes/path"

const ModalSettings = () => {
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
          <li aria-current="page" className=" text-gray-900">
            Model Settings
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="hs-tab-content">
    <div className="grid grid-cols-12">
      <div className="col-span-12 xl:col-span-8 xl:col-start-3 lg:col-span-10 lg:col-start-2">
        <div className="bg-white shadow rounded-md p-5 border border-border-color">
          <h5 className="mb-5">Model</h5>
          <form>
            <div className="mb-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-box" />
                Default Models
              </h6>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="text-generation"
                    className="mb-1 block text-sm font-semibold text-dark"
                  >
                    Text Generation <span className="text-danger">*</span>
                  </label>
                  <CommonSelect
                    id="text-generation"
                    options={baseModels}
                    placeholder="GPT-4o"
                    ariaLabel="Text Generation"
                  className='custom-select'

                  />
                </div>
                <div>
                  <label
                    htmlFor="image-generation"
                    className="mb-1 block text-sm font-semibold text-dark"
                  >
                    Image Generation <span className="text-danger">*</span>
                  </label>
                  <CommonSelect
                    id="image-generation"
                    options={imageGenerationModels}
                    placeholder="DALL.E 3"
                    ariaLabel="Image Generation"
                  className='custom-select'

                  />
                </div>
                <div>
                  <label
                    htmlFor="embeddings"
                    className="mb-1 block text-sm font-semibold text-dark"
                  >
                    Embeddings <span className="text-danger">*</span>
                  </label>
                  <CommonSelect
                    id="embeddings"
                    options={embeddingModels}
                    placeholder="Text Embedding 3"
                    ariaLabel="Embeddings"
                  className='custom-select'

                  />
                </div>
              </div>
            </div>
            <div className="mb-5 mt-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-pencil-ruler" />
                Model Parameters
              </h6>
              <div className="grid grid-cols-1 gap-6">
                <div className="mb-5">
                  <label className="mb-4 block text-sm font-semibold text-dark">
                    Creativity Level
                  </label>
                  <div
                    className="primary-gradient-range mb-4"
                    id="rangeslider_basic"
                  />
                  <p>
                    Controls randomness: Lower values are more deterministic,
                    higher values are more creative.
                  </p>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="max-tokens"
                    className="mb-1 block text-sm font-semibold text-dark"
                  >
                    Maximum number of Tokens{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <CommonSelect
                    id="max-tokens"
                    options={tokenLimits}
                    placeholder="Select Token Limit"
                    ariaLabel="Maximum Tokens"
                  className='custom-select'

                  />
                  <p className="text-xs mt-1">
                    Maximum number of tokens to generate in the response.
                  </p>
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-dark">
                    Default system Prompt
                  </label>
                  <textarea
                    className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                    rows={3}
                    placeholder=""
                    defaultValue={
                      "You are an AI assistant designed to deliver clear, accurate, and relevant responses efficiently."
                    }
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Defines how the AI behaves, responds, and follows
                    instructions.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Link
                to="#"
                className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg hover:bg-primary-800 hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Cancel
              </Link>
              <Link
                to="#"
                className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default ModalSettings