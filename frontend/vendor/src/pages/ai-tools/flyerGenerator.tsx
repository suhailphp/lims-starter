import { useState, useEffect, useRef } from "react";
import CommonSelect from "../../components/common-select/commonSelect";
import ImageWithBasePath from "../../components/image-with-base-path";
import { Images } from "../../utils/imagePath";
import { orientation, visual_style } from "../../utils/json/selectData";
import { Link, useNavigate } from "react-router-dom";
import FlyerModal from "./modal/flyerModal";
import { usePreline } from "../../hooks/usePreline";

const FlyerGenerator = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPageSize, setSelectedPageSize] = useState(
    "Letter (8.5 × 11 in)",
  );
  const [scaleContent, setScaleContent] = useState(false);
  const [customWidth, setCustomWidth] = useState("816");
  const [customHeight, setCustomHeight] = useState("1056");
  const [unit, setUnit] = useState("px");
  const [textareaValue, setTextareaValue] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageIndex: number;
  }>({ isOpen: false, imageIndex: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const flyerImages = [Images.flyer_01, Images.flyer_02, Images.flyer_03];

  // Initialize Preline for this component
  usePreline([isDropdownOpen, isAccordionOpen, lightbox.isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const openLightbox = (imageIndex: number) => {
    setLightbox({ isOpen: true, imageIndex });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, imageIndex: 0 });
  };

  const goToPrevious = () => {
    setLightbox((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex === 0 ? flyerImages.length - 1 : prev.imageIndex - 1,
    }));
  };

  const goToNext = () => {
    setLightbox((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % flyerImages.length,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the result page
    navigate('/flyer-generator-result');
  };
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper relative flex flex-row flex-wrap items-center justify-center h-[calc(100vh-56px)]! overflow-y-auto w-full">
        {/* Content */}
        <div className="content w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-10 lg:col-start-2">
              <div className="text-center mb-10">
                <h2 className="mb-2">
                  <i className="icon-wand-sparkles text-2xl! bg-clip-text text-transparent bg-primary-gradient me-2" />
                  Generate{" "}
                  <span className="bg-clip-text text-transparent bg-primary-gradient">
                    New Flyer
                  </span>
                </h2>
                <p>
                  Enter your details below and our AI will generate professional
                  designs instantly.
                </p>
              </div>
              <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-5">
                    <div className="md:col-span-4">
                      <label
                        htmlFor="orientation"
                        className="mb-1 block text-sm font-semibold text-dark"
                      >
                        Orientation
                      </label>
                      <div className="select-add-icon relative  rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-panel-left" />
                        </span>
                        <CommonSelect
                          options={orientation}
                          placeholder="Select"
                          className="custom-select aitool-select"
                        />
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="md:col-span-4">
                      <label className="mb-1 block text-sm font-semibold text-dark">
                        Page Size
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          className="cursor-pointer btn flex items-center gap-x-2 text-sm font-normal rounded-lg bg-white border border-border-color text-dark text-center focus:outline-hidden  w-full"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <i className="icon-file" />
                          {selectedPageSize}
                          <i className="icon-chevron-down ms-auto" />
                        </button>
                        {isDropdownOpen && (
                          <div
                            className="absolute top-full left-0 right-0 min-w-50 max-w-90 bg-white border border-border-color shadow rounded-lg mt-1 z-50"
                            role="menu"
                          >
                            <div className="p-6">
                              <p className="text-gray-900 font-semibold mb-1">
                                Page Size
                              </p>
                              <div className="input-group flex items-center gap-2 mb-2">
                                <input
                                  type="checkbox"
                                  className="shrink-0 border-border-color rounded-sm text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                                  id="resize"
                                  checked={scaleContent}
                                  onChange={(e) =>
                                    setScaleContent(e.target.checked)
                                  }
                                />
                                <label htmlFor="resize">
                                  Scale Content on Resize
                                </label>
                              </div>
                              <div className="mb-4">
                                <select
                                  className="w-full border border-border-color rounded-lg px-3 py-2 text-sm "
                                  value={selectedPageSize}
                                  onChange={(e) =>
                                    setSelectedPageSize(e.target.value)
                                  }
                                >
                                  <option>Letter (8.5 × 11 in)</option>
                                  <option>Auto / Default</option>
                                  <option>Legal (8.5 × 14 in)</option>
                                  <option>A4 (210 × 297 mm)</option>
                                  <option>Tabloid (11 × 17 in)</option>
                                  <option>A3 (297 x 420 mm)</option>
                                </select>
                              </div>
                              <p className="text-gray-900 font-semibold mb-1">
                                Custom Page Size
                              </p>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  className="form-input-small text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                                  value={customWidth}
                                  onChange={(e) =>
                                    setCustomWidth(e.target.value)
                                  }
                                />
                                <p>x</p>
                                <input
                                  type="text"
                                  className="form-input-small text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                                  value={customHeight}
                                  onChange={(e) =>
                                    setCustomHeight(e.target.value)
                                  }
                                />
                                <div className="w-[190px]">
                                  <select
                                    className="w-full border border-border-color rounded-lg px-3 py-2 text-sm"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                  >
                                    <option>px</option>
                                    <option>cm</option>
                                    <option>in</option>
                                    <option>mm</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="md:col-span-4">
                      <label className="mb-1 block text-sm font-semibold text-dark">
                        Visual Style
                      </label>
                      <div className="select-add-icon relative rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-file-stack" />
                        </span>
                        <CommonSelect
                          options={visual_style}
                          placeholder="Select"
                          className="custom-select aitool-select"
                        />
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="md:col-span-12">
                      <div className="relative bg-light border border-border-color rounded-lg overflow-hidden">
                        <textarea
                          className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-none rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                          rows={4}
                          id="shuffle-text"
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
                          <p className="text-dark mb-0">0/7000&nbsp;Chars</p>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-col sm:flex-row">
                    <button
                      type="button"
                      className="btn flex items-center justify-center cursor-pointer bg-light border border-border-color text-dark text-center hover:bg-light-800 hover:border-light-800 dark:hover:bg-primary dark:hover:border-primary hover:text-dark max-sm:w-full"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      data-hs-overlay="#settings-modal"
                    >
                      <i className="icon-settings me-2" />
                      Advance Settings
                    </button>
                    <button
                      type="submit"
                      className="btn inline-flex items-center justify-center border border-transparent 
									[background-image:var(--background-image-primary-gradient),var(--background-image-linear-gradient-100)] 
									[background-clip:padding-box,border-box]  bg-origin-border
									text-white transition-opacity hover:opacity-90 max-sm:w-full"
                    >
                      <i className="icon-sparkles me-2" />
                      Generate
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
                <div className="relative">
                  <button
                    className="inline-flex items-center justify-between gap-x-3 gap-2 font-bold text-dark w-fit text-lg text-start text-foreground cursor-pointer disabled:pointer-events-none"
                    onClick={toggleAccordion}
                    aria-expanded={isAccordionOpen}
                    aria-controls="history"
                  >
                    History
                    <span className="flex items-center size-4 ms-auto font-medium">
                      <i
                        className={`icon ${isAccordionOpen ? "icon-chevron-up" : "icon-chevron-down"}`}
                      />
                    </span>
                  </button>
                  <div
                    id="history"
                    className={`w-full overflow-hidden duration-300 mt-4 transition-all ${isAccordionOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}
                    role="region"
                    style={{ display: isAccordionOpen ? "block" : "none" }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="rounded-lg overflow-hidden group relative bg-white dark:bg-white border border-gray-200 dark:border-gray-100 p-5 transition-all shadow hover:shadow-lg">
                        <div className="relative overflow-hidden rounded-lg mb-5">
                          <ImageWithBasePath
                            src={Images.flyer_01}
                            alt="flyer"
                            className="w-full"
                          />
                          <div className="flex flex-col gap-2 absolute top-1/2 end-3 translate-x-4 -translate-y-1/2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              type="button"
                              title="Download"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-download" />
                            </button>
                            <button
                              type="button"
                              title="Delete"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-trash-2" />
                            </button>
                            <button
                              type="button"
                              title="Maximize"
                              className="image-popup size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                              onClick={() => openLightbox(0)}
                            >
                              <i className="icon-maximize" />
                            </button>
                            <button
                              type="button"
                              title="Share"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-share-2" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold line-clamp-2 leading-snug mb-1">
                            <Link
                              to="#"
                              className="text-gray-900 hover:text-primary"
                            >
                              Create a whimsical animated story poster featuring
                              a...
                            </Link>
                          </h3>
                          <p className="flex items-center text-gray-900 mb-0">
                            <i className="icon-clock-2 me-2 text-gray-600" />
                            20 Sec Ago
                          </p>
                        </div>
                      </div>{" "}
                      {/* end card*/}
                      <div className="rounded-lg overflow-hidden group relative bg-white dark:bg-white border border-gray-200 dark:border-gray-100 p-5 transition-all shadow hover:shadow-lg">
                        <div className="relative overflow-hidden rounded-lg mb-5">
                          <ImageWithBasePath
                            src={Images.flyer_02}
                            alt="flyer"
                            className="w-full"
                          />
                          <div className="flex flex-col gap-2 absolute top-1/2 end-3 translate-x-4 -translate-y-1/2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              type="button"
                              title="Download"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-download" />
                            </button>
                            <button
                              type="button"
                              title="Delete"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-trash-2" />
                            </button>
                            <button
                              type="button"
                              title="Maximize"
                              className="image-popup size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                              onClick={() => openLightbox(1)}
                            >
                              <i className="icon-maximize" />
                            </button>
                            <button
                              type="button"
                              title="Share"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-share-2" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold line-clamp-2 leading-snug mb-1">
                            <Link
                              to="#"
                              className="text-gray-900 hover:text-primary"
                            >
                              Generate a cinematic Poster of a futuristic Face
                              powered by AI...
                            </Link>
                          </h3>
                          <p className="flex items-center text-gray-900 mb-0">
                            <i className="icon-clock-2 me-2 text-gray-600" />
                            40 Min Ago
                          </p>
                        </div>
                      </div>{" "}
                      {/* end card*/}
                      <div className="rounded-lg overflow-hidden group relative bg-white dark:bg-white border border-gray-200 dark:border-gray-100 p-5 transition-all shadow hover:shadow-lg">
                        <div className="relative overflow-hidden rounded-lg mb-5">
                          <ImageWithBasePath
                            src={Images.flyer_03}
                            alt="flyer"
                            className="w-full"
                          />
                          <div className="flex flex-col gap-2 absolute top-1/2 end-3 translate-x-4 -translate-y-1/2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              type="button"
                              title="Download"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-download" />
                            </button>
                            <button
                              type="button"
                              title="Delete"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-trash-2" />
                            </button>
                            <button
                              type="button"
                              title="Maximize"
                              className="image-popup size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                              onClick={() => openLightbox(2)}
                            >
                              <i className="icon-maximize" />
                            </button>
                            <button
                              type="button"
                              title="Share"
                              className="size-8 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:hover:text-dark flex items-center justify-center transition-colors"
                            >
                              <i className="icon-share-2" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold line-clamp-2 leading-snug mb-1">
                            <Link
                              to="#"
                              className="text-gray-900 hover:text-primary"
                            >
                              Produce a documentary style poster showcasing...
                            </Link>
                          </h3>
                          <p className="flex items-center text-gray-900 mb-0">
                            <i className="icon-clock-2 me-2 text-gray-600" />
                            25 Days Ago
                          </p>
                        </div>
                      </div>{" "}
                      {/* end card*/}
                    </div>{" "}
                    {/* end grid */}
                  </div>
                </div>{" "}
                {/* end card */}
              </div>
            </div>{" "}
            {/* end col */}
          </div>
          <ImageWithBasePath
            src={Images.flyer_bg}
            alt=""
            className="absolute top-0 left-0 w-full -z-1"
          />
        </div>
        {/* End Content */}
      </div>
      {/* End Page Wrapper */}

      {/* Lightbox Plugin */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Previous Button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <i className="icon-chevron-left text-xl" />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <i className="icon-chevron-right text-xl" />
          </button>

          {/* Main Image Container */}
          <div className="relative max-w-5xl max-h-full">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all hover:scale-110 z-10"
              onClick={closeLightbox}
            >
              <i className="icon-x text-xl" />
            </button>

            {/* Image */}
            <img
              src={flyerImages[lightbox.imageIndex]}
              alt={`Flyer preview ${lightbox.imageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
              {lightbox.imageIndex + 1} / {flyerImages.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
            {flyerImages.map((image, index) => (
              <button
                key={index}
                className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  index === lightbox.imageIndex
                    ? "border-primary scale-110"
                    : "border-transparent hover:border-gray-400"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox({ ...lightbox, imageIndex: index });
                }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      <FlyerModal />
    </>
  );
};

export default FlyerGenerator;
