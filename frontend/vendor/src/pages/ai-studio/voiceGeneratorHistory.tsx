import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import { Images } from "../../utils/imagePath"
import { useEffect, useRef, useState } from "react"
import ImageWithBasePath from "../../components/image-with-base-path"
import { useDropdown } from "../../hooks/useDropdown"

const VoiceGeneratorHistory = () => {
  const { toggle, isOpen, containerRef } = useDropdown()
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({})

  const toggleAudioPlayback = async (audioId: number) => {
    const currentAudio = audioRefs.current[audioId]
    if (!currentAudio) return

    if (activeAudioId === audioId && isPlaying) {
      currentAudio.pause()
      return
    }

    if (activeAudioId !== null && activeAudioId !== audioId) {
      const previousAudio = audioRefs.current[activeAudioId]
      previousAudio?.pause()
      if (previousAudio) previousAudio.currentTime = 0
    }

    try {
      await currentAudio.play()
      setActiveAudioId(audioId)
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const handleAudioPlay = (audioId: number) => {
    setActiveAudioId(audioId)
    setIsPlaying(true)
  }

  const handleAudioPause = (audioId: number) => {
    if (activeAudioId !== audioId) return
    setIsPlaying(false)
  }

  const handleAudioEnded = (audioId: number) => {
    if (activeAudioId !== audioId) return
    setIsPlaying(false)
    setActiveAudioId(null)
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(audioRefs.current).forEach((audio) => audio?.pause())
    }
  }, [])

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
          className="py-1 px-2 rounded-lg font-medium flex items-center text-dark border-transparent whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
          aria-current="page"
        >
          Create New Voice
        </Link>
        <Link
          to={Path.voiceGeneratorHistory}
          className="py-1 px-2 rounded-lg font-medium flex items-center bg-primary text-white border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          History
        </Link>
      </nav>
    </div>
    <div>
      <div ref={containerRef} className="relative inline-flex">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggle("voiceHistorySort")
          }}
          className="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          aria-haspopup="menu"
          aria-expanded={isOpen("voiceHistorySort")}
          aria-label="Dropdown"
        >
          <i className="icon-arrow-up-narrow-wide" /> Newest{" "}
          <i className="icon icon-chevron-down" />
        </button>
        {isOpen("voiceHistorySort") && (
          <div
            className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              <Link
                className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                Newest
              </Link>
              <Link
                className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                Oldest
              </Link>
              <Link
                className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                Recently Created
              </Link>
              <Link
                className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
              to="#"
              >
                Recently Created
              </Link>
              <Link
                className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                Last Modified
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  {/* Start grid */}
  <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 mb-5">
    {/* Item 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5">
      <div className="bg-light rounded-lg flex items-center justify-center p-5 h-30 mb-5 relative">
        <ImageWithBasePath
          src={Images.audio_icon_1}
          alt="progress"
          className="img-fluid mb-6"
        />
        <div className="w-full p-2 absolute bottom-0 start-0 transition-opacity duration-300 bg-transparent backdrop-blur-sm">
          <audio
            controls
            className="w-full h-8"
            ref={(element) => {
              audioRefs.current[1] = element
            }}
            onPlay={() => handleAudioPlay(1)}
            onPause={() => handleAudioPause(1)}
            onEnded={() => handleAudioEnded(1)}
          >
            <source src={Images.audio_1} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <h3 className="mb-5 text-sm font-semibold">
        {" "}
        Explore the features of DreamsAI for enhanced productivity.{" "}
      </h3>
      <div className="flex items-center justify-between flex-wrap mb-5 gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
            Maria Chen
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
            01:15
          </span>
        </div>
        <p className="flex items-center gap-2 text-dark">
          {" "}
          <i className="icon-clock-2 text-gray-500" /> 15m Ago{" "}
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
            <i className="icon-download" />
          </button>
          <button
            type="button"
            onClick={() => {
              void toggleAudioPlayback(1)
            }}
            className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center show-voice-play cursor-pointer"
          >
            <i
              className={
                activeAudioId === 1 && isPlaying ? "icon-pause" : "icon-play"
              }
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-file-pen-line font-normal" /> Edit{" "}
          </Link>
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-trash-2 font-normal" /> Delete{" "}
          </Link>
        </div>
      </div>
    </div>
    {/* Item 2 */}
    <div className="bg-white border border-border-color rounded-lg p-5">
      <div className="bg-light rounded-lg flex items-center justify-center p-5 h-30 mb-5 relative">
        <ImageWithBasePath
          src={Images.audio_icon_2}
          alt="progress"
          className="img-fluid mb-6"
        />
        <div className="w-full p-2 absolute bottom-0 start-0 transition-opacity duration-300 bg-transparent backdrop-blur-sm">
          <audio
            controls
            className="w-full h-8"
            ref={(element) => {
              audioRefs.current[2] = element
            }}
            onPlay={() => handleAudioPlay(2)}
            onPause={() => handleAudioPause(2)}
            onEnded={() => handleAudioEnded(2)}
          >
            <source src={Images.audio_1} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <h3 className="mb-5 text-sm font-semibold">
        {" "}
        Unlock your creative potential with DreamsAI's tools.{" "}
      </h3>
      <div className="flex items-center justify-between flex-wrap mb-5 gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
            David Kim
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
            02:30
          </span>
        </div>
        <p className="flex items-center gap-2 text-dark">
          {" "}
          <i className="icon-clock-2 text-gray-500" /> 5m Ago{" "}
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
            <i className="icon-download" />
          </button>
          <button
            type="button"
            onClick={() => {
              void toggleAudioPlayback(2)
            }}
            className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center show-voice-play cursor-pointer"
          >
            <i
              className={
                activeAudioId === 2 && isPlaying ? "icon-pause" : "icon-play"
              }
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-file-pen-line font-normal" /> Edit{" "}
          </Link>
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-trash-2 font-normal" /> Delete{" "}
          </Link>
        </div>
      </div>
    </div>
    {/* Item 3 */}
    <div className="bg-white border border-border-color rounded-lg p-5">
      <div className="bg-light rounded-lg flex items-center justify-center p-5 h-30 mb-5 relative">
        <ImageWithBasePath
          src={Images.audio_icon_2}
          alt="progress"
          className="img-fluid mb-6"
        />
        <div className="w-full p-2 absolute bottom-0 start-0 transition-opacity duration-300 bg-transparent backdrop-blur-sm">
          <audio
            controls
            className="w-full h-8"
            ref={(element) => {
              audioRefs.current[3] = element
            }}
            onPlay={() => handleAudioPlay(3)}
            onPause={() => handleAudioPause(3)}
            onEnded={() => handleAudioEnded(3)}
          >
            <source src={Images.audio_1} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <h3 className="mb-5 text-sm font-semibold">
        {" "}
        Discover how DreamsAI can transform your workflow.{" "}
      </h3>
      <div className="flex items-center justify-between flex-wrap mb-5 gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
            Sophia Patel
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
            03:40
          </span>
        </div>
        <p className="flex items-center gap-2 text-dark">
          {" "}
          <i className="icon-clock-2 text-gray-500" /> 10 Ago{" "}
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
            <i className="icon-download" />
          </button>
          <button
            type="button"
            onClick={() => {
              void toggleAudioPlayback(3)
            }}
            className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer"
          >
            <i
              className={
                activeAudioId === 3 && isPlaying ? "icon-pause" : "icon-play"
              }
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-file-pen-line font-normal" /> Edit{" "}
          </Link>
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-trash-2 font-normal" /> Delete{" "}
          </Link>
        </div>
      </div>
    </div>
    {/* Item 4 */}
    <div className="bg-white border border-border-color rounded-lg p-5">
      <div className="bg-light rounded-lg flex items-center justify-center p-5 h-30 mb-5 relative">
        <ImageWithBasePath
          src={Images.audio_icon_2}
          alt="progress"
          className="img-fluid mb-6"
        />
        <div className="w-full p-2 absolute bottom-0 start-0 transition-opacity duration-300 bg-transparent backdrop-blur-sm">
          <audio
            controls
            className="w-full h-8"
            ref={(element) => {
              audioRefs.current[4] = element
            }}
            onPlay={() => handleAudioPlay(4)}
            onPause={() => handleAudioPause(4)}
            onEnded={() => handleAudioEnded(4)}
          >
            <source src={Images.audio_1} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <h3 className="mb-5 text-sm font-semibold">
        {" "}
        Explore collaboration options in DreamsAI for team projects.{" "}
      </h3>
      <div className="flex items-center justify-between flex-wrap mb-5 gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="badge rounded-lg text-xs font-medium bg-cyan-50 text-cyan border border-cyan">
            Emma Rodriguez
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
            05:15
          </span>
        </div>
        <p className="flex items-center gap-2 text-dark">
          {" "}
          <i className="icon-clock-2 text-gray-500" /> 1m Ago{" "}
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
            <i className="icon-download" />
          </button>
          <button
            type="button"
            onClick={() => {
              void toggleAudioPlayback(4)
            }}
            className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center show-voice-play cursor-pointer"
          >
            <i
              className={
                activeAudioId === 4 && isPlaying ? "icon-pause" : "icon-play"
              }
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-file-pen-line font-normal" /> Edit{" "}
          </Link>
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-trash-2 font-normal" /> Delete{" "}
          </Link>
        </div>
      </div>
    </div>
    {/* Item 5 */}
    <div className="bg-white border border-border-color rounded-lg p-5">
      <div className="bg-light rounded-lg flex items-center justify-center p-5 h-30 mb-5 relative">
        <ImageWithBasePath
          src={Images.audio_icon_2}
          alt="progress"
          className="img-fluid mb-6"
        />
        <div className="w-full p-2 absolute bottom-0 start-0 transition-opacity duration-300 bg-transparent backdrop-blur-sm">
          <audio
            controls
            className="w-full h-8"
            ref={(element) => {
              audioRefs.current[5] = element
            }}
            onPlay={() => handleAudioPlay(5)}
            onPause={() => handleAudioPause(5)}
            onEnded={() => handleAudioEnded(5)}
          >
            <source src={Images.audio_1} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <h3 className="mb-5 text-sm font-semibold">
        {" "}
        Unleash your imagination with innovative features of DreamsAI.{" "}
      </h3>
      <div className="flex items-center justify-between flex-wrap mb-5 gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
            Liam Johnson
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
            04:15
          </span>
        </div>
        <p className="flex items-center gap-2 text-dark">
          {" "}
          <i className="icon-clock-2 text-gray-500" /> 3m Ago{" "}
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
            <i className="icon-download" />
          </button>
          <button
            type="button"
            onClick={() => {
              void toggleAudioPlayback(5)
            }}
            className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center show-voice-play cursor-pointer"
          >
            <i
              className={
                activeAudioId === 5 && isPlaying ? "icon-pause" : "icon-play"
              }
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-file-pen-line font-normal" /> Edit{" "}
          </Link>
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-trash-2 font-normal" /> Delete{" "}
          </Link>
        </div>
      </div>
    </div>
    {/* Item 6 */}
    <div className="bg-white border border-border-color rounded-lg p-5">
      <div className="bg-light rounded-lg flex items-center justify-center p-5 h-30 mb-5 relative">
        <ImageWithBasePath
          src={Images.audio_icon_2}
          alt="progress"
          className="img-fluid mb-6"
        />
        <div className="w-full p-2 absolute bottom-0 start-0 transition-opacity duration-300 bg-transparent backdrop-blur-sm">
          <audio
            controls
            className="w-full h-8"
            ref={(element) => {
              audioRefs.current[6] = element
            }}
            onPlay={() => handleAudioPlay(6)}
            onPause={() => handleAudioPause(6)}
            onEnded={() => handleAudioEnded(6)}
          >
            <source src={Images.audio_1} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <h3 className="mb-5 text-sm font-semibold">
        {" "}
        Learn tips and tricks to maximize your use of DreamsAI.{" "}
      </h3>
      <div className="flex items-center justify-between flex-wrap mb-5 gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
            Noah White
          </span>
          <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
            06:45
          </span>
        </div>
        <p className="flex items-center gap-2 text-dark">
          {" "}
          <i className="icon-clock-2 text-gray-500" /> 2m Ago{" "}
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center cursor-pointer">
            <i className="icon-download" />
          </button>
          <button
            type="button"
            onClick={() => {
              void toggleAudioPlayback(6)
            }}
            className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark dark:hover:text-dark flex items-center justify-center show-voice-play cursor-pointer"
          >
            <i
              className={
                activeAudioId === 6 && isPlaying ? "icon-pause" : "icon-play"
              }
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-file-pen-line font-normal" /> Edit{" "}
          </Link>
          <Link
            to="#"
            className="btn inline-flex items-center justify-center gap-x-2 bg-white text-dark border border-border-color font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {" "}
            <i className="icon-trash-2 font-normal" /> Delete{" "}
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
  <div className="text-center">
    <Link
      to="#"
      className="btn bg-white text-gray-900 border border-border-color inline-flex items-center font-semibold rounded-lg hover:bg-primary hover:border-primary hover:text-white"
    >
      {" "}
      <i className="icon-loader me-2" /> Load More{" "}
    </Link>
  </div>
  {/* Alert */}
  <div className="play-voice bg-white shadow-lg rounded-lg border border-border-color p-5 flex items-center gap-4 fixed bottom-6 inset-x-0 mx-auto w-full md:max-w-[50%] max-w-[90%] z-50">
    <div className="flex items-center grow gap-4 md:gap-6 flex-wrap md:flex-nowrap">
      <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm">
        <audio controls className="w-full h-8">
          <source src={Images.audio_1} type="audio/mpeg" />
        </audio>
      </div>
    </div>
    <button
      className="close-play-btn text-lg pl-6 ml-4 border-l border-gray-200 hover:text-red-500 transition shrink-0"
      aria-label="Close"
    >
      <i className="icon-x text-dark" />
    </button>
  </div>
</div>

  )
}

export default VoiceGeneratorHistory