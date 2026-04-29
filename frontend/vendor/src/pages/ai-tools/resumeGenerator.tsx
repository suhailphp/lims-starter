import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Column, Occupation, Style } from "../../utils/json/selectData"
import CommonSelect from "../../components/common-select/commonSelect"
import type { Option } from "../../components/common-select/commonSelect"
import { Images } from "../../utils/imagePath"
import ImageWithBasePath from "../../components/image-with-base-path"
import Lightbox from "../../components/lightbox/lightbox"

const ResumeGenerator = () => {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    style: undefined as Option | Option[] | undefined,
    occupation: undefined as Option | Option[] | undefined,
    column: undefined as Option | Option[] | undefined,
    description: '',
    withProfileImage: false
  })

  const handleLightbox = (image: string) => {
    setSelectedImage(image)
    setLightbox(true)
  }

  const handleInputChange = (field: string, value: string | boolean | Option | Option[] | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Store form data in sessionStorage to pass to results page
    sessionStorage.setItem('resumeGeneratorData', JSON.stringify(formData))
    
    // Navigate to results page
    navigate('/resume-generator-result')
  }

  return (
    <>
  {/* Page Wrapper */}
  <div className="page-wrapper relative flex flex-row flex-wrap items-center justify-center h-[85vh]! w-full">
    <div className="content w-full">
      {/* Start Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        <div className="md:col-span-10 md:col-start-2">
          {/* Start Form */}
          <div>
            {/* Start title */}
            <div className="text-center mb-5">
              <h2 className="flex items-center justify-center mb-2">
                {" "}
                <span className="bg-[image:var(--background-image-linear-gradient-300)] bg-clip-text text-transparent">
                  <i className="icon-wand-sparkles font-medium me-2" />
                </span>{" "}
                Generate{" "}
                <span className="ms-1 bg-[image:var(--background-image-linear-gradient-300)] bg-clip-text text-transparent">
                  {" "}
                  New Resume
                </span>{" "}
              </h2>
              <p className="mb-0">
                Enter your details below and our AI will generate professional
                designs instantly.
              </p>
            </div>
            {/* End title */}
            {/* Start Resume Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="border border-border-color rounded-lg shadow">
                <div className="bg-white p-5 rounded-lg">
                  {/* Start grid  */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 mb-5">
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                        Style
                      </div>
                      <div className="select-add-icon relative bg-light rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-file-box" />
                        </span>
                         <CommonSelect
                          options={Style}
                          placeholder="Select"
                          className="custom-select presentation-select"
                          value={formData.style}
                          onChange={(value) => handleInputChange('style', value)}
                        />
                      </div>
                    </div>
                    {/* End col */}
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                        Occupation
                      </div>
                      <div className="select-add-icon relative bg-light rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-briefcase-business" />
                        </span>
                       <CommonSelect
                          options={Occupation}
                          placeholder="Select"
                          className="custom-select presentation-select"
                          value={formData.occupation}
                          onChange={(value) => handleInputChange('occupation', value)}
                        />
                      </div>
                    </div>
                    {/* End col */}
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                        Column
                      </div>
                      <div className="select-add-icon relative bg-light rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-layout-panel-left" />
                        </span>
                        <CommonSelect
                          options={Column}
                          placeholder="Select"
                          className="custom-select presentation-select"
                          value={formData.column}
                          onChange={(value) => handleInputChange('column', value)}
                        />
                      </div>
                    </div>
                    {/* End col */}
                  </div>
                  {/* End grid  */}
                  {/* Start Textarea */}
                  <div className="relative bg-light border border-border-color rounded-lg overflow-hidden">
                    <textarea
                      className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-none rounded-lg sm:text-sm text-xs focus:ring-0 text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={4}
                      placeholder="Ask me anything"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 items-center justify-between py-2.5 px-2.5 w-full dark:bg-white">
                      <div className="flex items-center space-x-2 grow">
                        <div className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary hover:text-white hover:border-primary transition dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer relative">
                          <i className="icon-upload" />
                          <input
                            type="file"
                            className="absolute w-full h-full top-0 left-0 opacity-0"
                            multiple
                          />
                        </div>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark flex items-center justify-center"
                        >
                          <i className="icon-lightbulb" />
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark flex items-center justify-center"
                        >
                          <i className="icon-mic" />
                        </button>
                      </div>
                      <p className="text-dark mb-0">0/7000&nbsp;Chars</p>
                    </div>
                  </div>
                  {/* End Textarea */}
                </div>
                {/* Profile */}
                <div className="bg-light p-5 rounded-lg flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="custom-switch-six"
                      className="relative inline-block w-8 h-5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="custom-switch-six"
                        className="peer sr-only"
                        checked={formData.withProfileImage}
                        onChange={(e) => handleInputChange('withProfileImage', e.target.checked)}
                      />
                      <span className="absolute inset-0 bg-gray-400 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                      <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                    </label>
                    <div className="block text-sm font-medium text-dark">
                      With Profile Image
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn inline-flex items-center justify-center gap-x-2 bg-[image:var(--background-image-linear-gradient-300)] text-white font-semibold rounded-lg hover:opacity-90 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {" "}
                    <i className="icon-sparkles font-normal" /> Generate Resume
                  </button>
                </div>
              </div>
            </form>
            {/* End Resume Form  */}
            {/* Start History */}
            <div className="mt-5 relative">
              <Link
                to="#"
                className="text-sm text-danger font-normal hover:text-danger-800 absolute end-0 top-1.5"
              >
                Clear All
              </Link>
              <div className="hs-accordion">
                <button
                  className="hs-accordion-toggle hs-accordion-active:bg-light hs-accordion-active:border-0 cursor-pointer inline-flex items-center justify-between gap-x-3 gap-2 font-bold text-dark w-fit text-lg text-start text-foreground disabled:pointer-events-none"
                  aria-expanded="true"
                  aria-controls="acc-4"
                >
                  History
                  <span className="hs-accordion-active:hidden flex items-center size-4 ms-auto font-medium">
                    <i className="icon icon-chevron-down" />
                  </span>
                  <span className="hs-accordion-active:flex hidden items-center size-4 ms-auto font-medium">
                    <i className="icon icon-chevron-up" />
                  </span>
                </button>
                <div
                  id="acc-4"
                  className="hs-accordion-content hidden w-full overflow-hidden duration-300"
                  role="region"
                >
                  <div className="grid xxl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 grid-cols-2 gap-3 mt-5">
                    {/* Item 1 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => handleLightbox(Images.resume_img_1)}
                        className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <ImageWithBasePath
                          src={Images.resume_img_1}
                          alt="resume image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 2 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => handleLightbox(Images.resume_img_2)}
                        className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <ImageWithBasePath
                          src={Images.resume_img_2}
                          alt="resume image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 3 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => handleLightbox(Images.resume_img_3)}
                        className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <ImageWithBasePath
                          src={Images.resume_img_3}
                          alt="resume image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 4 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => handleLightbox(Images.resume_img_4)}
                        className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <ImageWithBasePath
                          src={Images.resume_img_4}
                          alt="resume image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 5 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => handleLightbox(Images.resume_img_5)}
                        className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <ImageWithBasePath
                          src={Images.resume_img_5}
                          alt="resume image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End History */}
          </div>
          {/* End Form */}
        </div>
      </div>
      {/* End Grid  */}
      <ImageWithBasePath
        src={Images.resume_bg}
        alt=""
        className="absolute top-0 left-0 w-full -z-1"
      />
    </div>
  </div>
  {/* End Page Wrapper */}
  
  {/* Lightbox */}
  <Lightbox
    slides={[
      { src: Images.resume_img_1 },
      { src: Images.resume_img_2 },
      { src: Images.resume_img_3 },
      { src: Images.resume_img_4 },
      { src: Images.resume_img_5 }
    ]}
    open={lightbox}
    index={selectedImage ? [
      Images.resume_img_1,
      Images.resume_img_2,
      Images.resume_img_3,
      Images.resume_img_4,
      Images.resume_img_5
    ].indexOf(selectedImage) : 0}
    close={() => setLightbox(false)}
  />
</>

  )
}

export default ResumeGenerator