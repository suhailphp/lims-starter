import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import CommonSelect from "../../components/common-select/commonSelect"
import { Audio_Mood, Environment, Quality, Sound_Elements, usecase } from "../../utils/json/selectData"
import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { Slider } from "primereact/slider"
import { Images } from "../../utils/imagePath"
import { useDropdown } from "../../hooks/useDropdown"

const AudioGeneratorHistory = () => {
  const { toggle: toggleOptions, isOpen: isOptionsOpen, containerRef: optionsRef } = useDropdown()
   const [sliderValue, setSliderValue] = useState(100)
  const [prompt, setPrompt] = useState("")
  const [generatedPrompt, setGeneratedPrompt] = useState(
    "Generate an original instrumental music track in a modern futuristic style."
  )
  const [generatedAudioSrc, setGeneratedAudioSrc] = useState(Images.audio_1)
  const [isGeneratedTrackPlaying, setIsGeneratedTrackPlaying] = useState(false)
  const generatedTrackRef = useRef<HTMLAudioElement | null>(null)
  const hasInitialized = useRef(false)

  const handleGenerateAudio = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setGeneratedPrompt(prompt.trim() || "Generated track")
    setGeneratedAudioSrc(Images.audio_1)
  }

  const toggleGeneratedTrackPlayback = () => {
    if (!generatedTrackRef.current) return

    if (generatedTrackRef.current.paused) {
      void generatedTrackRef.current.play()
      return
    }

    generatedTrackRef.current.pause()
  }

  useEffect(() => {
    if (!generatedTrackRef.current || !hasInitialized.current) {
      hasInitialized.current = true
      return
    }
    generatedTrackRef.current.currentTime = 0
    // Disabled auto-play to prevent unwanted audio playback
    // void generatedTrackRef.current.play()
  }, [generatedAudioSrc])
  return (
    <>
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
            Audio Generator
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
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
    {/* Grid Left */}
    <div className="xxl:col-span-4 xl:col-span-5 lg:col-span-12">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-border-color">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            Audio Options
          </h2>
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary hover:border-primary transition hover:text-white dark:hover:text-dark! hover:border-primary flex items-center justify-center cursor-pointer">
            <i className="icon-refresh-ccw" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleGenerateAudio}>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Duration
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 flex items-center">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Set the time length (e.g., 5 min, 2 min, 1 min).
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="style-choice"
                  defaultValue="realistic"
                  className="peer hidden"
                  defaultChecked
                />
                <span className="btn border border-gray-200 text-dark rounded-lg inline-block transition-colors peer-checked:bg-primary peer-checked:text-white! dark:peer-checked:text-dark! peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  30 Sec
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="style-choice"
                  defaultValue="realistic"
                  className="peer hidden"
                />
                <span className="btn border border-gray-200 text-dark rounded-lg inline-block transition-colors peer-checked:bg-primary peer-checked:text-white! dark:peer-checked:text-dark! peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  1 Min
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="style-choice"
                  defaultValue="realistic"
                  className="peer hidden"
                />
                <span className="btn border border-gray-200 text-dark rounded-lg inline-block transition-colors peer-checked:bg-primary peer-checked:text-white! dark:peer-checked:text-dark! peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  2 Min
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="style-choice"
                  defaultValue="realistic"
                  className="peer hidden"
                />
                <span className="btn border border-gray-200 text-dark rounded-lg inline-block transition-colors peer-checked:bg-primary peer-checked:text-white! dark:peer-checked:text-dark! peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  3 Min
                </span>
              </label>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Audio Mood
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Tone of the audio, as calm, energetic, or dramatic.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
           <CommonSelect
              options={Audio_Mood} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Tempo
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Adjusts the result. Low = slow , High = fast.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
            <p className="mb-3 text-center text-dark">100–120 BPM</p>
            <Slider
                         value={sliderValue}
                         onChange={(e) => setSliderValue(e.value as number)}
                         min={100}
                         max={120}
                         step={1}
                         className="w-full"
                       />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs">Low</span>
              <span className="text-xs">Medium</span>
              <span className="text-xs">High</span>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Sound Elements
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Background sound or effects to enhance the experience.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
             <CommonSelect
              options={Sound_Elements} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Environment
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Environment where this configuration will be applied.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
             <CommonSelect
              options={Environment} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Quality
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Higher values create cleare. Lower values save credits.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
            <CommonSelect
              options={Quality} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
          </div>
          <div className="mb-0">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Use Case
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Credits are deducted only after successful generation
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
             <CommonSelect
              options={usecase} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
          </div>
        </form>
      </div>
    </div>{" "}
    {/* end col */}
    {/* Grid right */}
    <div className="xxl:col-span-8 xl:col-span-7 lg:col-span-12">
      {/* Start Audio */}
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
        <div className="flex itenms-center justify-between mb-5 pb-5 border-b border-border-color">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
            Turn any idea into sound
          </h2>
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary hover:border-primary transition hover:text-white dark:hover:text-dark! hover:border-primary flex items-center justify-center cursor-pointer">
            <i className="icon-refresh-ccw" />
          </button>
        </div>
        {/* Translator */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <button className="btn border border-gray-200 text-dark rounded-lg tag-btn flex items-center font-semibold gap-2 hover:bg-primary transition hover:text-white hover:border-primary">
              <i className="icon-audio-lines" />
              Create Song
            </button>
            <button className="btn border border-gray-200 text-dark rounded-lg tag-btn flex items-center font-semibold gap-2 hover:bg-primary transition hover:text-white hover:border-primary">
              <i className="icon-audio-waveform" />
              Create Sound
            </button>
            <button className="btn border border-gray-200 text-dark rounded-lg tag-btn flex items-center font-semibold gap-2 hover:bg-primary transition hover:text-white hover:border-primary">
              <i className="icon-music-4" />
              Lyrics
            </button>
            <button className="btn border border-gray-200 text-dark rounded-lg tag-btn flex items-center font-semibold gap-2 hover:bg-primary transition hover:text-white hover:border-primary">
              <i className="icon-audio-lines" />
              Speak Text
            </button>
          </div>
          <div ref={optionsRef} className="relative inline-flex">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleOptions("audioLanguage")
              }}
              className="cursor-pointer py-1.5 px-2 inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 dark:hover:text-dark! hover:bg-primary transition hover:border-primary hover:text-white focus:outline-hidden focus:white"
              aria-haspopup="menu"
              aria-expanded={isOptionsOpen("audioLanguage")}
              aria-label="Dropdown"
            >
              English <i className="icon-chevron-down" />
            </button>
            {isOptionsOpen("audioLanguage") && (
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
                    Spanish
                  </Link>
                  <Link
                    className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                    to="#"
                  >
                    French
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
        <form>
          <div className="mb-1 block text-sm font-semibold text-dark">
            Prompt
          </div>
          <div className="relative mb-5 bg-light border border-border-color rounded-lg overflow-hidden">
            <textarea
              className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-none rounded-lg text-xs sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none resize-none"
              rows={5}
              placeholder="Ask me anything"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
            <div className="flex flex-wrap gap-2 items-center justify-between py-2 px-2 w-full dark:bg-white">
              <div className="flex items-center space-x-2 grow">
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-image" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-mic" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-sliders-horizontal" />
                </button>
              </div>
              <button
                type="submit"
                className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#generated-track-modal"
              >
                {" "}
                <i className="icon-sparkles font-normal" /> Generate Audio
              </button>
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
      {/* End Audio */}
      {/* Start Generated Audios */}
      <div className="mt-5 pt-5 border-t border-border-color relative">
        <Link
          to="#"
          className="text-sm text-danger font-normal hover:text-danger-800 absolute end-0 top-5"
        >
          Clear All
        </Link>
        <div className="hs-accordion active">
          <button
            className="hs-accordion-toggle hs-accordion-active:bg-light hs-accordion-active:border-0 cursor-pointer inline-flex items-center justify-between gap-x-3 gap-2 font-bold text-dark w-fit text-lg text-start text-foreground disabled:pointer-events-none"
            aria-expanded="true"
            aria-controls="acc-4"
          >
            Recent generated Audios
            <span className="hs-accordion-active:hidden flex items-center size-4 ms-auto font-medium">
              <i className="icon icon-chevron-down" />
            </span>
            <span className="hs-accordion-active:flex hidden items-center size-4 ms-auto font-medium">
              <i className="icon icon-chevron-up" />
            </span>
          </button>
          <div
            id="acc-4"
            className="hs-accordion-content w-full overflow-hidden duration-300 mt-5"
            role="region"
          >
            {/* Item 1  */}
            <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-3 text-center flex flex-col justify-center items-center hover:shadow-lg transition mb-4">
              {/* Start Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full items-center">
                <div className="xxl:col-span-4 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12">
                  <div className="flex items-center gap-2">
                    <div className="bg-light w-14 h-14 rounded-lg border border-border-color flex items-center justify-center text-lg shrink-0">
                      <i className="icon-file-music text-primary" />
                    </div>
                    <div className="text-start">
                      <h3 className="mb-1.5 text-sm font-semibold truncate">
                        {" "}
                        Enhance productivity{" "}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
                          Primary
                        </span>
                        <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                          02:00s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End col */}
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6">
                  <div className="flex items-center justify-start xxl:justify-center gap-2">
                    <div className="w-full">
                      <audio controls className="w-full h-8 no-time" preload="none" muted>
                        <source
                          src={Images.audio_1}
                          type="audio/mpeg"
                        />
                      </audio>
                    </div>
                  </div>
                </div>
                {/* End col */}
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6">
                  <div className="flex items-center justify-start sm:justify-end">
                    <span className="badge rounded-lg text-xs font-medium bg-white text-dark border border-border-color">
                      Track
                    </span>
                    <div className="flex items-center justify-center gap-3 pl-4 ml-4 border-l border-border-color">
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-speaker-simple-high" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-arrows-counter-clockwise" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-download" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-trash" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End col */}
              </div>
              {/* End Grid */}
            </div>
            {/* Item 2  */}
            <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-3 text-center flex flex-col justify-center items-center hover:shadow-lg transition mb-4">
              {/* Start Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full items-center">
                <div className="xxl:col-span-4 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12">
                  <div className="flex items-center gap-2">
                    <div className="bg-light w-14 h-14 rounded-lg border border-border-color flex items-center justify-center text-lg shrink-0">
                      <i className="icon-file-music text-primary" />
                    </div>
                    <div className="text-start">
                      <h4 className="mb-1.5 text-sm font-semibold truncate">
                        Optimize workflow{" "}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
                          Lena Smith
                        </span>
                        <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                          03:00s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End col */}
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6">
                  <div className="flex items-center justify-start xxl:justify-center gap-2">
                    <div className="w-full">
                      <audio controls className="w-full h-8 no-time" preload="none" muted>
                        <source
                          src={Images.audio_1}
                          type="audio/mpeg"
                        />
                      </audio>
                    </div>
                  </div>
                </div>
                {/* End col */}
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6">
                  <div className="flex items-center justify-start sm:justify-end">
                    <span className="badge rounded-lg text-xs font-medium bg-white text-dark border border-border-color">
                      Track
                    </span>
                    <div className="flex items-center justify-center gap-3 pl-4 ml-4 border-l border-border-color">
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-speaker-simple-high" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-arrows-counter-clockwise" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-download" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-trash" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End col */}
              </div>
              {/* End Grid */}
            </div>
            {/* Item 3  */}
            <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-3 text-center flex flex-col justify-center items-center hover:shadow-lg transition">
              {/* Start Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full items-center">
                <div className="xxl:col-span-4 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12">
                  <div className="flex items-center gap-2">
                    <div className="bg-light w-14 h-14 rounded-lg border border-border-color flex items-center justify-center text-lg shrink-0">
                      <i className="icon-file-music text-primary" />
                    </div>
                    <div className="text-start">
                      <h4 className="mb-1.5 text-sm font-semibold truncate">
                        Streamline communication{" "}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                          Merkel John
                        </span>
                        <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                          01:00s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End col */}
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6">
                  <div className="flex items-center justify-start xxl:justify-center gap-2">
                    <div className="w-full">
                      <audio controls className="w-full h-8 no-time" preload="none" muted>
                        <source
                          src={Images.audio_1}
                          type="audio/mpeg"
                        />
                      </audio>
                    </div>
                  </div>
                </div>
                {/* End col */}
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6">
                  <div className="flex items-center justify-start sm:justify-end">
                    <span className="badge rounded-lg text-xs font-medium bg-white text-dark border border-border-color">
                      Track
                    </span>
                    <div className="flex items-center justify-center gap-3 pl-4 ml-4 border-l border-border-color">
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-speaker-simple-high" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-arrows-counter-clockwise" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-download" />
                      </button>
                      <button className="text-xl flex cursor-pointer hover:primary transition">
                        <i className="ph-duotone ph-trash" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End col */}
              </div>
              {/* End Grid */}
            </div>
          </div>
        </div>
      </div>
      {/* End Generated Audios */}
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>
<>
  {/* Generated Modal Start */}
  <div
    id="generated-track-modal"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="sm:max-w-lg sm:w-full sm:mx-auto my-10!">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center pb-5 border-b border-border-color dark:border-neutral-700">
            <h4>Generated Track</h4>
            <button
              type="button"
              aria-label="Close"
              data-hs-overlay="#generated-track-modal"
            >
              <i className="icon-x" />
            </button>
          </div>
          <div className="my-5">
            <h5 className="mb-2">Prompt</h5>
            <p className="mb-0">
              {generatedPrompt}
            </p>
          </div>
          <div className="bg-light rounded-lg p-5 border border-border-color">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={toggleGeneratedTrackPlayback}
                className="btn border border-gray-200 text-dark rounded-lg tag-btn flex items-center font-semibold gap-2 hover:bg-primary transition hover:text-white hover:border-primary"
              >
                <i className={isGeneratedTrackPlaying ? "icon-pause" : "icon-play"} />
                {isGeneratedTrackPlaying ? "Pause" : "Play"}
              </button>
            </div>
            <audio
              ref={generatedTrackRef}
              controls
              className="w-full h-8 no-time"
              preload="none"
              muted
              onPlay={() => setIsGeneratedTrackPlaying(true)}
              onPause={() => setIsGeneratedTrackPlaying(false)}
              onEnded={() => setIsGeneratedTrackPlaying(false)}
            >
              <source src={generatedAudioSrc} type="audio/mpeg" />
            </audio>
          </div>
          <div className="text-center mt-5">
            <Link
              to="#"
              className="btn bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              {" "}
              <i className="icon-download font-normal me-2" /> Download
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Generated Modal End */}
</>

</>
  )
}

export default AudioGeneratorHistory