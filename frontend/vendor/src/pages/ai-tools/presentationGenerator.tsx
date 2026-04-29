import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Images } from "../../utils/imagePath"
import ImageWithBasePath from "../../components/image-with-base-path"
import CommonSelect from "../../components/common-select/commonSelect"
import { audience, language, length, tone } from "../../utils/json/selectData"
import PresentationGeneratorModal from "./modal/presentationGeneratorModal"
import { Path } from "../../routes/path"


const PresentationGenerator = () => {
  const navigate = useNavigate();
  const [textareaValue, setTextareaValue] = useState("");
  const [currentShuffleIndex, setCurrentShuffleIndex] = useState(0);

  const handleShuffleClick = () => {
    const existingText = textareaValue.trim();
    const shuffleTexts = [
      "Create Flyer on Grand Opening of Special Event for Store",
      "Product Launch Event for new Medical Innovations",
      "Volleyball Playoff Game at Riverstone Center", 
      "Raise awareness about Health",
    ];
    
    const nextIndex = (currentShuffleIndex + 1) % shuffleTexts.length;
    const nextText = shuffleTexts[nextIndex];
    
    setCurrentShuffleIndex(nextIndex);
    
    if (existingText) {
      const lines = existingText.split('\n');
      if (lines.length > 0) {
        lines[lines.length - 1] = nextText;
        setTextareaValue(lines.join('\n'));
      }
    } else {
      setTextareaValue(nextText);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/presentation-generator-result');
  };

  return (
   <>
  {/* Page Wrapper */}
  <div className="page-wrapper relative flex flex-row flex-wrap items-center justify-center h-[calc(100vh-56px)]! overflow-y-auto w-full">
    <div className="content w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          <div className="text-center mb-10">
            <h2 className="mb-2">
              <i className="icon-wand-sparkles text-2xl! bg-clip-text text-transparent bg-success-gradient me-2" />
              Generate{" "}
              <span className="bg-clip-text text-transparent bg-success-gradient">
                New Presentation{" "}
              </span>
            </h2>
            <p>
              Enter your details below and our AI will generate Presentation
              designs instantly.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border-color w-full mb-10 overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-12">
                    <div className="relative bg-light border border-border-color rounded-lg overflow-hidden">
                      <textarea
                        className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-none rounded-lg sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                        rows={4}
                        id="shuffle-text"
                        placeholder="Describe your presentation topic in detail..."
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                      />
                      <div className="flex flex-wrap gap-2 items-center justify-between py-2.5 px-2.5 w-full dark:bg-white">
                        <div className="flex items-center space-x-2 grow">
                          <div className="cursor-pointer w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark flex items-center justify-center relative">
                            <i className="icon-upload" />
                            <input
                              type="file"
                              className="absolute w-full h-full top-0 left-0 opacity-0"
                              multiple
                            />
                          </div>
                          <button
                            type="button"
                            className="cursor-pointer w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark flex items-center justify-center"
                            id="shuffle-btn"
                            onClick={handleShuffleClick}
                          >
                            <i className="icon-lightbulb" />
                          </button>
                          <button
                            type="button"
                            className="cursor-pointer w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark flex items-center justify-center"
                          >
                            <i className="icon-mic" />
                          </button>
                        </div>
                        <p className="text-dark mb-0">0/7000 Chars</p>
                      </div>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="md:col-span-3">
                    <label
                      htmlFor="language_select"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Language
                    </label>
                    <div className="select-add-icon relative bg-light  rounded-lg">
                      <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                        <i className="icon-languages" />
                      </span>
                      <CommonSelect
                          options={language}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="md:col-span-3">
                    <label
                      htmlFor="length_select"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Length
                    </label>
                    <div className="select-add-icon relative bg-light  rounded-lg">
                      <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                        <i className="icon-presentation" />
                      </span>
                      <CommonSelect
                          options={length}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="md:col-span-3">
                    <label
                      htmlFor="tone_select"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Tone
                    </label>
                    <div className="select-add-icon relative bg-light  rounded-lg">
                      <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                        <i className="icon-mic" />
                      </span>
                       <CommonSelect
                          options={tone}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="md:col-span-3">
                    <label
                      htmlFor="audience_select"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Audience
                    </label>
                    <div className="select-add-icon relative bg-light rounded-lg">
                      <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                        <i className="icon-users" />
                      </span>
                      <CommonSelect
                          options={audience}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                    </div>
                  </div>{" "}
                  {/* end col */}
                </div>
              </div>
              <div className="bg-light p-5 flex items-center justify-between gap-2 flex-col sm:flex-row">
                <button
                  type="button"
                  className="btn flex items-center justify-center cursor-pointer bg-white border border-border-color text-gray-900 font-semibold text-center hover:bg-primary hover:border-primary hover:text-white max-sm:w-full"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  data-hs-overlay="#settings-modal"
                >
                  <i className="icon-settings me-2" />
                  Advance Settings
                </button>
                <button
                  type="submit"
                  className="btn font-semibold inline-flex items-center justify-center border border-transparent 
									[background-image:var(--background-image-success-gradient)] 
									[background-clip:padding-box,border-box]  bg-origin-border
									text-white transition-opacity hover:opacity-90 max-sm:w-full"
                >
                  <i className="icon-sparkles me-2" />
                  Generate Presentation
                </button>
              </div>
            </form>
          </div>{" "}
          {/* end card */}
          <div className="relative">
            <Link
              to="#"
              className="text-dark font-medium hover:text-primary absolute end-0 top-0"
            >
              View All
            </Link>
            <div className="hs-accordion active">
              <button
                className="hs-accordion-toggle hs-accordion-active:bg-light hs-accordion-active:border-0 cursor-pointer inline-flex items-center justify-between gap-x-3 gap-2 font-bold text-dark w-fit text-lg text-start text-foreground disabled:pointer-events-none"
                aria-expanded="true"
                aria-controls="history"
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
                id="history"
                className="hs-accordion-content w-full overflow-hidden duration-300 mt-4"
                role="region"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="rounded-lg overflow-hidden group relative bg-white dark:bg-white border border-gray-200 dark:border-gray-100 p-5 transition-all shadow hover:shadow-lg">
                    <div className="mb-4">
                      <h3 className="truncate text-sm font-semibold line-clamp-2 leading-snug mb-1">
                        <Link
                          to={Path.presentationSlider}
                          className="text-gray-900 hover:text-primary"
                        >
                          Marketing Presentation
                        </Link>
                      </h3>
                      <p className="flex items-center text-gray-900 mb-0">
                        <i className="icon-clock-2 me-2 text-gray-600" />
                        20 Mins Ago
                      </p>
                    </div>
                    <div className="relative overflow-hidden rounded-sm">
                      <Link to={Path.presentationSlider}>
                        <ImageWithBasePath
                          src={Images.presentation_01}
                          alt="presentation"
                          className="w-full"
                        />
                      </Link>
                    </div>
                  </div>{" "}
                  {/* end card*/}
                  <div className="rounded-lg overflow-hidden group relative bg-white dark:bg-white border border-gray-200 dark:border-gray-100 p-5 transition-all shadow hover:shadow-lg">
                    <div className="mb-4">
                      <h4 className="truncate text-sm font-semibold line-clamp-2 leading-snug mb-1">
                        <Link
                        to={Path.presentationSlider}
                          className="text-gray-900 hover:text-primary"
                        >
                          Business Presentation
                        </Link>
                      </h4>
                      <p className="flex items-center text-gray-900 mb-0">
                        <i className="icon-clock-2 me-2 text-gray-600" />2 Days
                        Ago
                      </p>
                    </div>
                    <div className="relative overflow-hidden rounded-sm">
                      <Link to={Path.presentationSlider}>
                        <ImageWithBasePath
                          src={Images.presentation_02}
                          alt="presentation"
                          className="w-full"
                        />
                      </Link>
                    </div>
                  </div>{" "}
                  {/* end card*/}
                  <div className="rounded-lg overflow-hidden group relative bg-white dark:bg-white border border-gray-200 dark:border-gray-100 p-5 transition-all shadow hover:shadow-lg">
                    <div className="mb-4">
                      <h4 className="truncate text-sm font-semibold line-clamp-2 leading-snug mb-1">
                        <Link
                         to={Path.presentationSlider}
                          className="text-gray-900 hover:text-primary"
                        >
                          Digital Marketing Presentation
                        </Link>
                      </h4>
                      <p className="flex items-center text-gray-900 mb-0">
                        <i className="icon-clock-2 me-2 text-gray-600" />
                        40 Days Ago
                      </p>
                    </div>
                    <div className="relative overflow-hidden rounded-sm">
                      <Link to={Path.presentationSlider}>
                        <ImageWithBasePath
                          src={Images.presentation_03}
                          alt="presentation"
                          className="w-full"
                        />
                      </Link>
                    </div>
                  </div>{" "}
                  {/* end card*/}
                </div>{" "}
                {/* end grid */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageWithBasePath
        src={Images.presentation_bg}
        alt=""
        className="absolute top-0 left-0 w-full -z-1"
      />
    </div>
  </div>
  {/* End Page Wrapper */}
  <PresentationGeneratorModal/>
</>

  )
}

export default PresentationGenerator