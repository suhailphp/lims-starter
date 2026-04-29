import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../routes/path";
import CommonSelect from "../../components/common-select/commonSelect";
import { Content_Type, language } from "../../utils/json/selectData";
import { Slider } from "primereact/slider";
import { useState } from "react";

const TextGenerator = () => {
  const navigate = useNavigate();
   const [seedValue, setSeedValue] = useState<number>(70)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(Path.textGeneratorResults);
  };
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
              <li className="text-default">
                <Link
                  to={Path.allGenerators}
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  AI Studio
                </Link>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li aria-current="page" className="text-gray-900">
                Text Generator
              </li>
            </ol>
          </nav>
        </div>
        <div className=" bg-white font-medium border border-border-color rounded-full px-4 py-2.5 text-gray-900 flex items-center">
          <span className="flex border-r-2 border-gray-200 pe-3 me-3 text-warning font-bold leading-none">
            {" "}
            <i className="ph-duotone ph-sparkle text-lg" />{" "}
          </span>{" "}
          Available Credits : 100
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
        {/* Grid Left */}
        <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-12 flex">
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
            <div className="flex items-center flex-wrap gap-3 justify-between mb-5 pb-5 border-b border-border-color">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
                Text Options
              </h2>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-refresh-ccw" />
                </button>
                <Link
                  to="#"
                  className="btn bg-white border border-border-color text-dark flex items-center hover:bg-primary hover:text-white"
                >
                  <i className="icon-calendar-days me-2" />
                  History
                </Link>
              </div>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <div className="mb-1 block text-sm font-semibold text-dark">
                  Enter Prompt
                </div>
                <div className="relative">
                  <textarea
                    className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full resize-none bg-light border-border-color rounded-lg text-xs sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                    rows={5}
                    placeholder="Describe what Content you want to generate"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <button className="btn badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                    Explain the importance of cybersec...
                  </button>
                  <button className="btn badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                    Draft a welcome email for new ...
                  </button>
                  <button className="btn badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                    Write about the benefits of remote&nbsp;...
                  </button>
                  <button className="btn badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                    Create a product description for Eco...
                  </button>
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                  Tone
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Select a Tone for your text. fo better clarity.
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-wrap items-center gap-2"
                  role="radiogroup"
                  aria-label="Select Tone"
                >
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="tone"
                      defaultValue="professional"
                      className="peer hidden"
                      defaultChecked
                    />
                    <span
                      className="btn border border-gray-200 text-dark rounded-lg inline-block transition-all
														peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark! peer-checked:border-primary
														hover:bg-primary hover:text-white hover:border-primary"
                    >
                      Professional
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="tone"
                      defaultValue="casual"
                      className="peer hidden"
                    />
                    <span
                      className="btn border border-gray-200 text-dark rounded-lg inline-block transition-all
														peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark! peer-checked:border-primary
														hover:bg-primary hover:text-white hover:border-primary"
                    >
                      Casual
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="tone"
                      defaultValue="friendly"
                      className="peer hidden"
                    />
                    <span
                      className="btn border border-gray-200 text-dark rounded-lg inline-block transition-all
														peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark! peer-checked:border-primary
														hover:bg-primary hover:text-white hover:border-primary"
                    >
                      Friendly
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="tone"
                      defaultValue="formal"
                      className="peer hidden"
                    />
                    <span
                      className="btn border border-gray-200 text-dark rounded-lg inline-block transition-all
														peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark! peer-checked:border-primary
														hover:bg-primary hover:text-white hover:border-primary"
                    >
                      Formal
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="tone"
                      defaultValue="persuasive"
                      className="peer hidden"
                    />
                    <span
                      className="btn border border-gray-200 text-dark rounded-lg inline-block transition-all
														peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark! peer-checked:border-primary
														hover:bg-primary hover:text-white hover:border-primary"
                    >
                      Persuasive
                    </span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 mb-5 gap-5">
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-12">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                    Content Type
                    <div className="group relative flex items-center">
                      <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                        <i className="ph-duotone ph-question" />
                      </span>
                      <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                        <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                          Select the type of content you want to generate.
                        </span>
                        <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                      </div>
                    </div>
                  </div>
                  <CommonSelect
              options={Content_Type} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-12">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                    Language
                    <div className="group relative flex items-center">
                      <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                        <i className="ph-duotone ph-question" />
                      </span>
                      <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                        <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                          Select the type of language you want to generate.
                        </span>
                        <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                      </div>
                    </div>
                  </div>
                   <CommonSelect
              options={language} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                  Formatting Style
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Select the text format used to display your content.
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-wrap items-center gap-2"
                  role="radiogroup"
                >
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      defaultValue="paragraphs"
                      className="peer hidden"
                      defaultChecked
                    />
                    <span className="inline-block btn border border-gray-200 text-dark rounded-lg tag-btn hover:bg-primary hover:text-white hover:border-primary peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary">
                      Paragraphs
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      defaultValue="bullet_points"
                      className="peer hidden"
                    />
                    <span className="btn inline-block  border border-gray-200 text-dark rounded-lg tag-btn hover:bg-primary hover:text-white hover:border-primary peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary">
                      Bullet Points
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      defaultValue="with_headings"
                      className="peer hidden"
                    />
                    <span className="btn border border-gray-200 text-dark rounded-lg tag-btn hover:bg-primary hover:text-white hover:border-primary peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary">
                      With Headings
                    </span>
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
                  Length
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Set the length of the generated text.
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
                 <Slider 
                                value={seedValue}
                                onChange={(e) => setSeedValue(e.value as number)}
                                className="w-full seed-slider"
                              />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs">Short</span>
                  <span className="text-xs">Medium</span>
                  <span className="text-xs">Long</span>
                </div>
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg w-full hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  {" "}
                  <i className="icon-sparkles font-normal" /> Generate Text
                </button>
              </div>
              <div className="py-1 px-2 border border-border-color bg-light rounded-lg text-sm text-gray-600 inline-flex items-center gap-2">
                <div className="group relative flex items-center">
                  <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-lg inline-flex items-center">
                    <i className="ph-duotone ph-question" />
                  </span>
                  <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                    <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                      Using this option will consume 6 credits
                    </span>
                    <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5.5" />
                  </div>
                </div>
                This will Use : 6 Credits
              </div>
            </form>
          </div>
        </div>
        {/* Grid right */}
        <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-12 flex">
          {/* Start Audio */}
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 w-full">
            <div className="flex itenms-center justify-between mb-5 pb-5 border-b border-border-color">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
                Generated Text
              </h2>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-undo" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-redo" />
                </button>
              </div>
            </div>
            {/* No Text Found */}
            <div className="flex flex-col justify-center text-center items-center w-full lg:h-full p-5">
              <div className="bg-light rounded-full size-16 flex items-center justify-center mb-5 text-3xl border border-border-color text-center">
                <i className="ph-duotone ph-text-t" />
              </div>
              <h3 className="mb-2 text-lg">No Text Found</h3>
              <p className="mb-0">Your generated content will appear here </p>
            </div>
          </div>
          {/* End Audio */}
        </div>
      </div>
      {/* End Grid */}
    </div>
  );
};

export default TextGenerator;
