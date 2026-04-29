import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import { Images } from "../../utils/imagePath"
import ImageWithBasePath from "../../components/image-with-base-path"


const AiTools = () => {
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
            AI Tools
          </li>
        </ol>
      </nav>
    </div>
    <div className="bg-white font-medium border border-border-color rounded-full px-4 py-2 inline-flex items-center">
      <span className="flex border-r-2 border-gray-200 pe-3 me-3 text-warning font-bold leading-none">
        {" "}
        <i className="ph-duotone ph-sparkle text-lg" />
      </span>
      Available Credits : <span className="text-gray-900 ms-1">100</span>
    </div>
  </div>
  {/* End Breadcrumb */}
  <div className="text-center mb-10">
    <h2 className="mb-2">
      Advanced <span className="text-primary">AI Generators</span>
    </h2>
    <p>
      Create a Unlimited Flyer / Brochure, PowerPoint, Proposal, Resume,
      Document, Code using Prompt
    </p>
  </div>
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 justify-center">
    <div className="xl:col-span-10 xl:col-start-2">
      <div className="flex flex-wrap justify-center gap-x-6">
        <div className="bg-white rounded-lg border-t-4 border-primary text-center p-5 mb-6 relative shadow overflow-hidden z-1 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="size-16 bg-primary-50 flex items-center justify-center rounded-full text-primary text-[32px] mx-auto mb-4">
            <i className="ph-duotone ph-file-dashed" />
          </div>
          <h3 className="text-base mb-2">Flyer / Brochure</h3>
          <p className="mb-5">Create flyers and brochures instantly.</p>
          <Link
            to={Path.flyerGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Launch Agent
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg_09}
            alt=""
            className="absolute left-0 bottom-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
        <div className="bg-white rounded-lg border-t-4 border-success text-center p-5 mb-6 relative shadow overflow-hidden z-1 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="size-16 bg-success-50 flex items-center justify-center rounded-full text-success text-[32px] mx-auto mb-4">
            <i className="ph-duotone ph-microsoft-powerpoint-logo" />
          </div>
          <h3 className="text-base mb-2">PowerPoint</h3>
          <p className="mb-5">Create polished PowerPoint slides</p>
          <Link
            to={Path.presentationGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Launch Agent
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg_10}
            alt=""
            className="absolute left-0 bottom-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
        <div className="bg-white rounded-lg border-t-4 border-info text-center p-5 mb-6 relative shadow overflow-hidden z-1 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="size-16 bg-info-50 flex items-center justify-center rounded-full text-info text-[32px] mx-auto mb-4">
            <i className="ph-duotone ph-files" />
          </div>
          <h3 className="text-base mb-2">Proposal</h3>
          <p className="mb-5">Build ready to send proposals fast.</p>
          <Link
            to={Path.proposalGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Launch Agent
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg_11}
            alt=""
            className="absolute left-0 bottom-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
        <div className="bg-white rounded-lg border-t-4 border-orange text-center p-5 mb-6 relative shadow overflow-hidden z-1 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="size-16 bg-orange-50 flex items-center justify-center rounded-full text-orange text-[32px] mx-auto mb-4">
            <i className="ph-duotone ph-user-list" />
          </div>
          <h3 className="text-base mb-2">Policy Document</h3>
          <p className="mb-5">Create professional policy documents</p>
          <Link
            to={Path.policyGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Launch Agent
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg_12}
            alt=""
            className="absolute left-0 bottom-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
        <div className="bg-white rounded-lg border-t-4 border-cyan text-center p-5 mb-6 relative shadow overflow-hidden z-1 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="size-16 bg-cyan-50 flex items-center justify-center rounded-full text-cyan text-[32px] mx-auto mb-4">
            <i className="ph-duotone ph-flag-banner-fold" />
          </div>
          <h3 className="text-base mb-2">Resume / Cover Letter</h3>
          <p className="mb-5">Build job ready Resume / Cover Letter</p>
          <Link
            to={Path.resumeGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Launch Agent
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg_13}
            alt=""
            className="absolute left-0 bottom-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end grid */}
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default AiTools