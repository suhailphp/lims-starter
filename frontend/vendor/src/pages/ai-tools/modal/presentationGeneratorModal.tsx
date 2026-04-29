import CommonSelect from "../../../components/common-select/commonSelect"
import ImageWithBasePath from "../../../components/image-with-base-path"
import { Images } from "../../../utils/imagePath"
import { content_depth, include_images } from "../../../utils/json/selectData"


const PresentationGeneratorModal = () => {
  return (
   <>
  {/* Settings Modal Start */}
  <div
    id="settings-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="sm:max-w-lg sm:w-full sm:mx-auto">
        <div className="flex flex-col bg-primary-gradient-300! border p-6 border-border-color rounded-lg relative m-5 pointer-events-auto relative z-1">
          <button
            type="button"
            className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer absolute -top-2 -end-2"
            aria-label="Close"
            data-hs-overlay="#settings-modal"
          >
            <i className="icon-x" />
          </button>
          <div className="text-center mb-6">
            <div className="size-16 flex items-center justify-center text-2xl rounded-lg bg-white border-b border-primary mx-auto mb-5">
              <i className="ph-duotone ph-gear-six" />
            </div>
            <h4 className="mb-2">Advanced Settings</h4>
            <p>Fine tune layout, content, and visual preferences.</p>
          </div>
          <form>
            <div className="p-6 bg-white border border-border-color rounded-lg mb-6">
              <div className="border-b border-border-color pb-5 mb-5">
                <label
                  htmlFor="include_images_select"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Include Images
                </label>
                <CommonSelect
              options={include_images} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
              </div>
              <div className="border-b border-border-color pb-5 mb-5">
                <label
                  htmlFor="content_depth_select"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Content Depth
                </label>
               <CommonSelect
              options={content_depth} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
              </div>
              <div className="border-b border-border-color pb-5 mb-5">
                <label className="mb-1 block text-sm font-semibold text-dark">
                  Slide Layout Density
                </label>
                <div className="flex items-center flex-wrap gap-2">
                  <div>
                    <input
                      type="radio"
                      id="compact"
                      name="dencity"
                      className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary"
                      defaultChecked
                    />
                    <label
                      htmlFor="compact"
                      className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Compact
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="balanced"
                      name="dencity"
                      className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary"
                    />
                    <label
                      htmlFor="balanced"
                      className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Balanced
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="background"
                      name="dencity"
                      className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary"
                    />
                    <label
                      htmlFor="background"
                      className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Spacious{" "}
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-dark">
                  Image Style
                </label>
                <div className="flex items-center flex-wrap gap-2">
                  <div>
                    <input
                      type="radio"
                      id="illustrations"
                      name="style"
                      className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary"
                      defaultChecked
                    />
                    <label
                      htmlFor="illustrations"
                      className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Illustrations
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="icons"
                      name="style"
                      className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary"
                    />
                    <label
                      htmlFor="icons"
                      className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Icon
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="photos"
                      name="style"
                      className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary"
                    />
                    <label
                      htmlFor="photos"
                      className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Photos
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="ai-generate"
                      name="style"
                      className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary"
                    />
                    <label
                      htmlFor="ai-generate"
                      className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      AI Generate
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="submit"
                className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
              >
                Apply Settings
              </button>
            </div>
          </form>
          <ImageWithBasePath
            src={Images.modal_bg}
            className="absolute top-0 left-0 rounded-lg -z-1"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  {/* Settings Modal End */}
</>

  )
}

export default PresentationGeneratorModal