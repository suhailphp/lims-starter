import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import CommonSelect from "../../components/common-select/commonSelect"
import { language, tone } from "../../utils/json/selectData"
import { Images } from "../../utils/imagePath"
import ImageWithBasePath from "../../components/image-with-base-path"


const ProposalGenerator = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    description: '',
    language: '',
    tone: '',
    enableDocusign: false,
    draftEmail: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value?.value || value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/proposal-generator-result');
  };

  const proposalImages = [
    Images.proposal_img_1,
    Images.proposal_img_2,
    Images.proposal_img_3,
    Images.proposal_img_4,
    Images.proposal_img_5
  ];

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightbox(true);
  };

  const closeLightbox = () => {
    setLightbox(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % proposalImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + proposalImages.length) % proposalImages.length);
  };

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
                <span className="bg-[image:var(--background-image-linear-gradient-500)] bg-clip-text text-transparent">
                  <i className="icon-wand-sparkles font-medium me-2" />
                </span>{" "}
                Generate{" "}
                <span className="ms-1 bg-[image:var(--background-image-linear-gradient-500)] bg-clip-text text-transparent">
                  {" "}
                  New Proposal
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
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
                    <h3 className="text-lg mb-0">
                      Describe What you’d like to make?
                    </h3>
                    <p className="mb-0 text-dark">{formData.description.length}/7000&nbsp;Chars</p>
                  </div>
                  {/* Start Textarea */}
                  <div className="relative bg-white border border-border-color rounded-lg">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-none rounded-lg sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={6}
                      placeholder="Briefly summarize the purpose, goals, and value of this proposal"
                      maxLength={7000}
                    />
                    <div className="grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3 w-full px-2.5 py-2.5">
                      <div className="grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3">
                        {/* Select Language */}
                        <div className="select-add-icon relative bg-light  rounded-lg">
                          <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                            <i className="icon-languages" />
                          </span>
                           <CommonSelect
                          options={language}
                          value={language.find(opt => opt.value === formData.language)}
                          onChange={(value) => handleSelectChange('language', value)}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                        </div>
                        {/* Select Type */}
                        <div className="select-add-icon relative bg-light  rounded-lg">
                          <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                            <i className="icon-smile" />
                          </span>
                           <CommonSelect
                          options={tone}
                          value={tone.find(opt => opt.value === formData.tone)}
                          onChange={(value) => handleSelectChange('tone', value)}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn inline-flex md:w-fit w-full ms-auto items-center justify-center gap-x-2 bg-[image:var(--background-image-linear-gradient-500)] text-white font-semibold rounded-lg hover:opacity-80 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {" "}
                        <i className="icon-sparkles font-normal" /> Generate
                        Proposal
                      </button>
                    </div>
                  </div>
                  {/* End Textarea */}
                </div>
                {/* Profile */}
                <div className="bg-white p-5 pt-0 rounded-lg flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="custom-switch-six"
                        className="relative inline-block w-8 h-5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="custom-switch-six"
                          className="peer sr-only"
                          checked={formData.enableDocusign}
                          onChange={(e) => handleCheckboxChange('enableDocusign', e.target.checked)}
                        />
                        <span className="absolute inset-0 bg-gray-400 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                        <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                      </label>
                      <label className="block text-sm font-medium text-dark">
                        Enable Docusign e-sign blocks
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="custom-switch-seven"
                        className="relative inline-block w-8 h-5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="custom-switch-seven"
                          className="peer sr-only"
                          checked={formData.draftEmail}
                          onChange={(e) => handleCheckboxChange('draftEmail', e.target.checked)}
                        />
                        <span className="absolute inset-0 bg-gray-400 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                        <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                      </label>
                      <label className="block text-sm font-medium text-dark">
                        Draft auto email to client
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 grow">
                    <div className="w-8 h-8 rounded-full bg-white text-dark border border-border-color dark:text-white flex items-center justify-center cursor-pointer relative hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark!">
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
                        onClick={() => openLightbox(0)}
                        className="image-popup w-full h-full border-0 bg-transparent p-0"
                      >
                        <ImageWithBasePath
                          src={Images.proposal_img_1}
                          alt="proposal image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 2 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => openLightbox(1)}
                        className="image-popup w-full h-full border-0 bg-transparent p-0"
                      >
                        <ImageWithBasePath
                          src={Images.proposal_img_2}
                          alt="proposal image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 3 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => openLightbox(2)}
                        className="image-popup w-full h-full border-0 bg-transparent p-0"
                      >
                        <ImageWithBasePath
                          src={Images.proposal_img_3}
                          alt="proposal image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 4 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => openLightbox(3)}
                        className="image-popup w-full h-full border-0 bg-transparent p-0"
                      >
                        <ImageWithBasePath
                          src={Images.proposal_img_4}
                          alt="proposal image"
                          className="rounded-lg w-full"
                        />
                      </button>
                    </div>
                    {/* Item 5 */}
                    <div className="bg-light border border-border-color rounded-lg p-2.5">
                      <button
                        onClick={() => openLightbox(4)}
                        className="image-popup w-full h-full border-0 bg-transparent p-0"
                      >
                        <ImageWithBasePath
                          src={Images.proposal_img_5}
                          alt="proposal image"
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
        src={Images.proposal_bg}
        alt=""
        className="absolute top-0 left-0 w-full -z-1"
      />
    </div>
  </div>
  {/* End Page Wrapper */}

  {/* Lightbox Modal */}
  {lightbox && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
      >
        <i className="icon-x" />
      </button>
      
      <button
        onClick={prevImage}
        className="absolute left-4 text-white text-2xl hover:text-gray-300 z-10"
      >
        <i className="icon-chevron-left" />
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 text-white text-2xl hover:text-gray-300 z-10"
      >
        <i className="icon-chevron-right" />
      </button>
      
      <div className="max-w-4xl max-h-full p-4">
        <ImageWithBasePath
          src={proposalImages[currentImage]}
          alt={`Proposal image ${currentImage + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {currentImage + 1} / {proposalImages.length}
      </div>
    </div>
  )}
</>

  )
}

export default ProposalGenerator