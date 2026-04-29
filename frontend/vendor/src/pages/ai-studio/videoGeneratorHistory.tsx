import { useMemo, useRef, useState } from "react"
import type { Slide } from "yet-another-react-lightbox"
import { Link } from "react-router-dom"
import Lightbox from "../../components/lightbox/lightbox"
import { Path } from "../../routes/path"
import { Images } from "../../utils/imagePath"
import { useDropdown } from "../../hooks/useDropdown"

type VideoHistoryItem = {
  title: string
  timeAgo: string
  tags: string[]
  videoSrc: string
}

const historyItems: VideoHistoryItem[] = [
  {
    title: "Generate a cinematic short video of a futuristic Face powered by AI",
    timeAgo: "20s Ago",
    tags: ["Realistic", "Horizontal 2:1", "1080p"],
    videoSrc: Images.ai_video_7,
  },
  {
    title: "Create a whimsical animated story featuring for our success",
    timeAgo: "15s Ago",
    tags: ["Fantasy", "Vertical 9:16", "4K"],
    videoSrc: Images.ai_video_2,
  },
  {
    title: "Produce a documentary-style video showcasing",
    timeAgo: "10s Ago",
    tags: ["Informative", "Square 1:1", "720p"],
    videoSrc: Images.ai_video_3,
  },
  {
    title: "Generate a cinematic short video of a futuristic city powered",
    timeAgo: "20s Ago",
    tags: ["Realistic", "Horizontal 2:1", "1080p"],
    videoSrc: Images.ai_video_4,
  },
  {
    title: "Create a whimsical animated videos & stories to more views",
    timeAgo: "15s Ago",
    tags: ["Fantasy", "Vertical 9:16", "4K"],
    videoSrc: Images.ai_video_5,
  },
  {
    title: "Produce a documentary-style video showcasing",
    timeAgo: "10s Ago",
    tags: ["Informative", "Square 1:1", "720p"],
    videoSrc: Images.ai_video_6,
  },
]

const VideoGeneratorHistory = () => {
  const { toggle, isOpen, containerRef } = useDropdown()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  const videoSlides = useMemo(
    () =>
      historyItems.map((item) => ({
        type: "video",
        autoPlay: true,
        controls: true,
        sources: [{ src: item.videoSrc, type: "video/mp4" }],
      })) as Slide[],
    [],
  )

  const handleHoverPlay = (index: number) => {
    const videoElement = videoRefs.current[index]
    if (!videoElement) return
    videoElement.currentTime = 0
    void videoElement.play()
  }

  const handleHoverPause = (index: number) => {
    const videoElement = videoRefs.current[index]
    if (!videoElement) return
    videoElement.pause()
    videoElement.currentTime = 0
  }

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="p-6">
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
                Video Generator
              </li>
            </ol>
          </nav>
        </div>
        <div className="bg-white font-medium border border-border-color rounded-full px-4 py-2.5 text-gray-900 flex items-center">
          <span className="flex border-r-2 border-gray-200 pe-3 me-3 text-warning font-bold leading-none">
            <i className="ph-duotone ph-sparkle text-lg" />
          </span>
          Available Credits : 100
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="bg-white border border-border-color rounded-lg p-1 flex items-center gap-1">
          <nav className="flex gap-2 flex-wrap" aria-label="Tabs">
            <Link
              to={Path.videoGenerator}
              className="py-1 px-2 rounded-lg font-medium flex items-center text-dark border-transparent whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              aria-current="page"
            >
              Create New Video
            </Link>
            <Link
              to={Path.videoGeneratorHistory}
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
                toggle("videoSort")
              }}
              className="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
              aria-haspopup="menu"
              aria-expanded={isOpen("videoSort")}
              aria-label="Dropdown"
            >
              <i className="icon-arrow-up-narrow-wide" /> Newest{" "}
              <i className="icon icon-chevron-down" />
            </button>
            {isOpen("videoSort") && (
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
                    Last Modified
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
        {historyItems.map((item, index) => (
          <div
            key={`${item.videoSrc}-${index}`}
            className="rounded-lg overflow-hidden group relative bg-white dark:bg-white border border-gray-200 p-5 transition-all hover:shadow-lg"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <button
                type="button"
                className="image-popup block w-full text-start"
                onClick={() => handleOpenLightbox(index)}
                onMouseEnter={() => handleHoverPlay(index)}
                onMouseLeave={() => handleHoverPause(index)}
              >
                <video
                  ref={(element) => {
                    videoRefs.current[index] = element
                  }}
                  src={item.videoSrc}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  data-hover-play=""
                  className="w-full h-[200px] object-cover"
                />
              </button>
              <div className="flex flex-col gap-2 absolute bottom-3 end-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  type="button"
                  title="Share"
                  className="w-9 h-9 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:text-dark! flex items-center justify-center shadow-md transition-colors"
                >
                  <i className="icon-share-2" />
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenLightbox(index)}
                  className="image-popup w-9 h-9 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:text-dark! flex items-center justify-center shadow-md transition-colors"
                >
                  <i className="icon-maximize" />
                </button>
                <button
                  type="button"
                  title="Download"
                  className="w-9 h-9 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:text-dark! flex items-center justify-center shadow-md transition-colors"
                >
                  <i className="icon-download" />
                </button>
                <button
                  type="button"
                  title="Delete"
                  className="w-9 h-9 rounded-full bg-white text-gray-900 cursor-pointer hover:bg-primary hover:text-white dark:text-dark! flex items-center justify-center shadow-md transition-colors"
                >
                  <i className="icon-trash-2" />
                </button>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-dark line-clamp-2 leading-snug">
                  <span className="copy-text">{item.title}</span>
                </h4>
                <button
                  type="button"
                  className="copy-title-btn text-gray-400 hover:text-primary transition-colors flex-shrink-0"
                  title="Copy Prompt"
                  data-copy-text=""
                >
                  <i className="icon-copy" />
                </button>
              </div>
              <p className="mb-4 flex items-center text-gray-900 dark:text-gray-400">
                <i className="icon-clock-2 me-2 text-gray-600" /> {item.timeAgo}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          to="#"
          className="btn bg-white text-gray-900 inline-flex items-center border border-border-color hover:bg-primary hover:border-primary hover:text-white"
        >
          <i className="icon-loader me-2" />
          Load More
        </Link>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={videoSlides}
        index={lightboxIndex}
      />
    </div>
  )
}

export default VideoGeneratorHistory