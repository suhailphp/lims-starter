import ImageWithBasePath from "../../components/image-with-base-path"
import { Images } from "../../utils/imagePath"


const AgentModals = () => {
  return (
    <>
  {/* Agent Modal Start */}
  <div
    id="agent-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="sm:max-w-lg sm:w-full sm:mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
            <h2 className="text-[20px]">Agent Preview</h2>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#agent-modal"
            >
              <i className="icon-x" />
            </button>
          </div>
          <div className="p-5 bg-light border border-border-color rounded-lg text-center my-5">
            <div className="mb-3">
              <i className="icon-bot text-gray-900 text-[40px]!" />
            </div>
            <h3 className="mb-1 text-[18px]!">Technical Support Specialist</h3>
            <p className="mb-0">
              Assists users with hardware and software issues, <br />{" "}
              troubleshooting &amp; technical advice.
            </p>
          </div>
          <div className="mb-5">
            <p className="flex items-center justify-between text-dark mb-2">
              {" "}
              Category: <span> Technical Support</span>{" "}
            </p>
            <p className="flex items-center justify-between text-dark mb-2">
              {" "}
              Model: <span> GPT-4.1</span>{" "}
            </p>
            <p className="flex items-center justify-between text-dark mb-2">
              {" "}
              Type: <span> Support Assistance</span>{" "}
            </p>
            <p className="flex items-center justify-between text-dark mb-2">
              {" "}
              Environment: <span> Production</span>{" "}
            </p>
            <p className="flex items-center justify-between text-dark mb-0">
              {" "}
              Deploy Method: <span> Standalone App</span>{" "}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[16px]"> Capabilities </h4>
            <p className="flex items-center gap-2 mb-2">
              {" "}
               <ImageWithBasePath
                                              src={Images.tick_icon}
                                              alt="tick"
                                            /> Natural
              Language Understanding (NLU)
            </p>
            <p className="flex items-center gap-2 mb-2">
              {" "}
              <ImageWithBasePath
                                              src={Images.tick_icon}
                                              alt="tick"
                                            />{" "}
              Integrations &amp; Extensibility
            </p>
            <p className="flex items-center gap-2 mb-0">
              {" "}
              <ImageWithBasePath
                                              src={Images.tick_icon}
                                              alt="tick"
                                            /> Knowledge
              Retrieval
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Agent Modal End */}
</>

  )
}

export default AgentModals