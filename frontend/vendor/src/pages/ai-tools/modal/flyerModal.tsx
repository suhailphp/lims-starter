import { useState } from "react";
import CommonSelect from "../../../components/common-select/commonSelect";
import { flyer_goal, target_audience } from "../../../utils/json/selectData";
import { Slider } from "primereact/slider";
import { Images } from "../../../utils/imagePath";
import ImageWithBasePath from "../../../components/image-with-base-path";

const FlyerModal = () => {
  const [whiteSpace, setWhiteSpace] = useState(50);
  const [creativityIntensity, setCreativityIntensity] = useState(50);
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
                    <label className="mb-1 block text-sm font-semibold text-dark">
                      Flyer Goal
                    </label>
                    <div className="select-add-icon relative bg-light  border border-border-color rounded-lg">
                      <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                        <i className="icon-file-box" />
                      </span>
                      <CommonSelect
                        options={flyer_goal} // optional
                        placeholder="Select" // optional // for screen readers
                        className="custom-select flyer-modal-select" // optional styling
                      />
                    </div>
                  </div>
                  <div className="border-b border-border-color pb-5 mb-5">
                    <label className="mb-1 block text-sm font-semibold text-dark">
                      Target Audience
                    </label>
                    <div className="select-add-icon relative bg-light border border-border-color rounded-lg">
                      <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                        <i className="icon-users" />
                      </span>
                      <CommonSelect
                        options={target_audience} // optional
                        placeholder="Select" // optional // for screen readers
                        className="custom-select flyer-modal-select" // optional styling
                      />
                    </div>
                  </div>
                  <div className="border-b border-border-color pb-5 mb-5">
                    <label className="mb-1 block text-sm font-semibold text-dark">
                      Image Placement
                    </label>
                    <div className="flex items-center flex-wrap gap-2">
                      <div>
                        <input
                          type="radio"
                          id="top"
                          name="placement"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                          defaultChecked
                        />
                        <label
                          htmlFor="top"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Top
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="bottom"
                          name="placement"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                        />
                        <label
                          htmlFor="bottom"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Bottom
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="center"
                          name="placement"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                        />
                        <label
                          htmlFor="center"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Center
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="background"
                          name="placement"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                        />
                        <label
                          htmlFor="background"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Background{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-border-color pb-5 mb-5">
                    <label className="mb-1 block text-sm font-semibold text-dark">
                      Border / Frame Style
                    </label>
                    <div className="flex items-center flex-wrap gap-2">
                      <div>
                        <input
                          type="radio"
                          id="none"
                          name="frame"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                          defaultChecked
                        />
                        <label
                          htmlFor="none"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          None
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="thin"
                          name="frame"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                        />
                        <label
                          htmlFor="thin"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Thin Line
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="dark"
                          name="frame"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                        />
                        <label
                          htmlFor="dark"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Dark
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="decorative"
                          name="frame"
                          className="hidden [&:checked+label]:bg-light [&:checked+label]:text-primary hover:bg-light hover:text-primary"
                        />
                        <label
                          htmlFor="decorative"
                          className="block cursor-pointer px-4 py-2 bg-white border border-border-color text-[13px] font-medium text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Decorative
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-border-color pb-5 mb-5">
                    <label className="mb-1 block text-sm font-semibold text-dark">
                      White Space
                    </label>
                    <div>
                      <Slider
                        value={whiteSpace}
                        onChange={(e) => setWhiteSpace(Array.isArray(e.value) ? e.value[0] : e.value)}
                        className="w-full"
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs">Compact</span>
                      
                      <span className="text-xs">Spacious</span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-dark">
                      Creativity Intensity
                    </label>
                    <div>
                      <Slider
                        value={creativityIntensity}
                        onChange={(e) => setCreativityIntensity(Array.isArray(e.value) ? e.value[0] : e.value)}
                        className="w-full"
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs">Minimal</span>
                     
                      <span className="text-xs">Expressive</span>
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
  );
};

export default FlyerModal;
