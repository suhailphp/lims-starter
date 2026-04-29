import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../routes/path";
import { Images } from "../../utils/imagePath";
import ImageWithBasePath from "../../components/image-with-base-path";
import { Preset, Voice_Settings, Volume } from "../../utils/json/selectData";
import CommonSelect from "../../components/common-select/commonSelect";
import { Slider } from "primereact/slider";
import { useState } from "react";
import { useDropdown } from "../../hooks/useDropdown";

const VoiceGenerator = () => {
  const { toggle, isOpen, containerRef } = useDropdown();
  const navigate = useNavigate();
  const [voiceVolumeLevel, setVoiceVolumeLevel] = useState(2);
  const [voiceSpeedLevel, setVoiceSpeedLevel] = useState(2);
  const [voicePitchLevel, setVoicePitchLevel] = useState(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    navigate(Path.voicePromptGenerator);
  };
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between page-breadcrumb gap-3 mb-6 flex-wrap">
        <div className="my-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to={Path.dashboard}
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-primary"
                >
                  <i className="icon icon-house" /> Home
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
                Voice Generator
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
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="bg-white border border-border-color rounded-lg p-1 flex items-center gap-1">
          <nav className="flex gap-2 flex-wrap" aria-label="Tabs">
            <Link
              to={Path.voiceGenerator}
              className="py-1 px-2 rounded-lg font-medium flex items-center text-white bg-primary border-transparent whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              aria-current="page"
            >
              Create New Voice
            </Link>
            <Link
              to={Path.voiceGeneratorHistory}
              className="py-1 px-2 rounded-lg font-medium flex items-center text-dark border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
            >
              History
            </Link>
          </nav>
        </div>
      </div>
      {/* Start grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
        <div className="xxl:col-span-4 xl:col-span-5 lg:col-span-12 flex">
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 w-full">
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-border-color">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
                Advanced Settings
              </h2>
              <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
                <i className="icon-refresh-ccw" />
              </button>
            </div>
            {/* Form */}
            <form>
              <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
                <div className="grid grid-cols-1 xl:grid-cols-12 md:grid-cols-12 gap-3 items-center mb-3">
                  <div className="xxl:col-span-6 xl:col-span-6 md:col-span-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-dark whitespace-nowrap">
                      Voice Volume (db)
                      <div className="group relative flex items-center">
                        <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                          <i className="ph-duotone ph-question" />
                        </span>
                        <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                          <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                            Controls how loud the voice sounds.
                          </span>
                          <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xxl:col-span-6 xl:col-span-6 md:col-span-6 flex custom-select justify-start! md:justify-end!">
                    <CommonSelect
                      options={Volume} // optional
                      placeholder="Select" // optional // for screen readers
                      className="custom-select" // optional styling
                    />
                  </div>
                </div>
                <Slider
                  value={voiceVolumeLevel}
                  onChange={(e) => setVoiceVolumeLevel(e.value as number)}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
               
              </div>
              {/* End grid  */}
              <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
                <div className="grid grid-cols-1 xl:grid-cols-12 md:grid-cols-12 gap-3 items-center mb-3">
                  <div className="xxl:col-span-6 xl:col-span-6 md:col-span-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-dark whitespace-nowrap">
                      Voice Speed (%)
                      <div className="group relative flex items-center">
                        <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                          <i className="ph-duotone ph-question" />
                        </span>
                        <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                          <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                            Controls how fast the voice speaks.
                          </span>
                          <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xxl:col-span-6 xl:col-span-6 md:col-span-6 flex custom-select justify-start! md:justify-end!">
                    <CommonSelect
                      options={Volume} // optional
                      placeholder="Select" // optional // for screen readers
                      className="custom-select" // optional styling
                    />
                  </div>
                </div>
                <Slider
                  value={voiceSpeedLevel}
                  onChange={(e) => setVoiceSpeedLevel(e.value as number)}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
               
              </div>
              {/* End grid  */}
              <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
                <div className="grid grid-cols-1 xl:grid-cols-12 md:grid-cols-12 gap-3 items-center mb-3">
                  <div className="xxl:col-span-6 xl:col-span-6 md:col-span-6 ">
                    <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                      Voice Pitch (%)
                      <div className="group relative flex items-center">
                        <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                          <i className="ph-duotone ph-question" />
                        </span>
                        <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                          <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                            Fine-tune the voice tone deep, natural, or sharp.
                          </span>
                          <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xxl:col-span-6 xl:col-span-6 md:col-span-6 flex custom-select justify-start! md:justify-end!">
                    <CommonSelect
                      options={Volume} // optional
                      placeholder="Select" // optional // for screen readers
                      className="custom-select" // optional styling
                    />
                  </div>
                </div>
                <Slider
                  value={voicePitchLevel}
                  onChange={(e) => setVoicePitchLevel(e.value as number)}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
               
              </div>
              {/* End grid  */}
              <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
                <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
                  <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                      Voice Settings
                      <div className="group relative flex items-center">
                        <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                          <i className="ph-duotone ph-question" />
                        </span>
                        <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                          <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                            Choose the voice style used for audio generation.
                          </span>
                          <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12">
                    <CommonSelect
                      options={Voice_Settings} // optional
                      placeholder="Select" // optional // for screen readers
                      className="custom-select" // optional styling
                    />
                  </div>
                </div>
              </div>
              {/* End grid  */}
              <div className="bg-light border border-border-color rounded-lg p-3">
                <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
                  <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                      Preset
                      <div className="group relative flex items-center">
                        <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-sm inline-flex items-center">
                          <i className="ph-duotone ph-question" />
                        </span>
                        <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                          <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                            Presets help you get started quickly with optimized.
                          </span>
                          <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12">
                    <CommonSelect
                      options={Preset} // optional
                      placeholder="Select" // optional // for screen readers
                      className="custom-select" // optional styling
                    />
                  </div>
                </div>
              </div>
              {/* End grid  */}
            </form>
          </div>
        </div>
        {/* end col */}
        <div className="xxl:col-span-8 xl:col-span-7 lg:col-span-12 flex ">
          {/* Start Video */}
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 w-full">
            <div className="flex itenms-center justify-between mb-5 pb-5 border-b border-border-color">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
                Generate Voice
              </h2>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
                  <i className="icon-undo" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
                  <i className="icon-redo" />
                </button>
              </div>
            </div>
            {/* Start Prompt */}
            <div className="flex flex-col justify-between gap-6 h-[calc(100%-70px)]!">
              {/* Generate text */}
              <div className="flex items-center justify-center flex-col pb-5 w-3/5 mx-auto mt-5">
                <div className="flex items-center justify-center flex-col">
                  <div className="w-16 h-16 rounded-full bg-light text-2xl text-primary border border-border-color flex items-center justify-center mb-5">
                    <i className="ph-duotone ph-file-audio" />
                  </div>
                  <h3 className="mb-2 text-[16px]">No Voice Found</h3>
                  <p className="mb-0">
                    Your recently generated Audio will appear here.
                  </p>
                </div>
              </div>
              {/* Prompt text */}
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="btn py-1.5 flex items-center gap-2 text-dark border border-border-color rounded-lg hover:bg-primary hover:border-primary hover:text-white">
                      <ImageWithBasePath
                        className="w-6 h-6 border border-border-color rounded-full"
                        src={Images.avatar_04}
                        alt="avatar"
                      />
                      <p className="font-normal">James Oswald</p>
                    </div>
                    <div ref={containerRef} className="relative inline-flex">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggle("voiceLanguage")
                        }}
                        className="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-primary transition hover:border-primary hover:text-white focus:outline-hidden focus:white"
                        aria-haspopup="menu"
                        aria-expanded={isOpen("voiceLanguage")}
                        aria-label="Dropdown"
                      >
                        English <i className="icon-chevron-down" />
                      </button>
                      {isOpen("voiceLanguage") && (
                        <div
                          className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="p-2 space-y-1">
                            <Link
                              className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                              to="#"
                            >
                              French
                            </Link>
                            <Link
                              className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                              to="#"
                            >
                              Spanish
                            </Link>
                            <Link
                              className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                              to="#"
                            >
                              Chinese
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link
                      to="#"
                      className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg hover:bg-primary hover:border-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {" "}
                      <i className="icon-plus font-normal" /> Add Pause{" "}
                    </Link>
                    <Link
                      to="#"
                      className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg hover:bg-primary hover:border-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {" "}
                      <i className="icon-save font-normal" /> Save{" "}
                    </Link>
                    <Link
                      to="#"
                      className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg hover:bg-primary hover:border-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {" "}
                      <i className="icon-play font-normal" /> Play{" "}
                    </Link>
                  </div>
                </div>
                <div className="mb-1 block text-sm font-semibold text-dark">
                  Prompt
                </div>
                <div className="relative mb-5 bg-light border border-border-color rounded-lg overflow-hidden">
                  <textarea
                    className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-none rounded-lg text-xs sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none resize-none"
                    rows={5}
                    placeholder="Ask me anything"
                    defaultValue={""}
                  />
                  <div className="flex flex-wrap gap-2 items-center justify-between py-2.5 px-2.5 z-10 w-full dark:bg-white">
                    <div className="flex items-center space-x-2 shrink-0 ">
                      <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center">
                        <i className="icon-file-text" />
                      </button>
                      <p className="mb-0 text-dark">250/7000&nbsp;Chars Used</p>
                    </div>
                    <div className="flex items-center flex-wrap gap-2 space-x-2 md:shrink-0">
                      <Link
                        to="#"
                        className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:border-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {" "}
                        <i className="icon-refresh-ccw font-normal" /> Clear
                        text{" "}
                      </Link>
                      <button
                        type="submit"
                        className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {" "}
                        <i className="icon-sparkles font-normal" /> Generate
                        Voice
                      </button>
                    </div>
                  </div>
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
            {/* End Prompt */}
          </div>
          {/* End Audio */}
        </div>
        {/* end col */}
      </div>
      {/* End grid */}
    </div>
  );
};

export default VoiceGenerator;
