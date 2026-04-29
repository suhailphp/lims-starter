import { useState, useCallback, useMemo, useRef } from 'react'
import { Images } from '../../../utils/imagePath'
import ImageWithBasePath from '../../../components/image-with-base-path'
import Lightbox from '../../../components/lightbox/lightbox'
import type { Slide } from 'yet-another-react-lightbox'
import { Link } from 'react-router-dom'
import { Path } from '../../../routes/path'
import { DropdownMenu } from '../../../components/dropdown-menu/dropdownMenu'

const SearchResult = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxSlides, setLightboxSlides] = useState<Slide[]>([])
  const [videoStates, setVideoStates] = useState<Record<string, boolean>>({})
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({})

  const imageSlides = useMemo(() => [
    { type: 'image' as const, src: Images.gallery_01 },
    { type: 'image' as const, src: Images.gallery_02 },
    { type: 'image' as const, src: Images.gallery_03 },
    { type: 'image' as const, src: Images.gallery_04 },
  ], [])

  const handleImageClick = useCallback((index: number) => {
    setLightboxSlides(imageSlides)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [imageSlides])

  const toggleVideoPlay = useCallback((videoId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
    
    const video = videoRefs.current[videoId]
    if (video) {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }
  }, [])

  const handleVideoRef = useCallback((videoId: string, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current[videoId] = element
    }
  }, [])

  const handleVideoEnded = useCallback((videoId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [videoId]: false
    }))
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
            Search Results
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 bg-white p-5 rounded-lg border border-border-color">
      <div className="flex items-center gap-2 mb-5">
        <input
          type="text"
          className="form-input-small text-dark bg-light block w-full border border-border-color rounded-lg focus:ring-0"
          defaultValue="Dreams AI"
        />
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="w-[32px] h-[32px] flex items-center justify-center bg-dark text-white hover:bg-primary rounded-full dark:bg-gray-100 dark:text-dark"
          >
            <i className="icon-mic" />
          </Link>
          <Link
            to="#"
            className="w-[32px] h-[32px] flex items-center justify-center bg-dark text-white hover:bg-primary rounded-full dark:bg-gray-100 dark:text-dark"
          >
            <i className="icon-images" />
          </Link>
          <Link
            to="#"
            className="w-[32px] h-[32px] flex items-center justify-center bg-dark text-white hover:bg-primary rounded-full dark:bg-gray-100 dark:text-dark"
          >
            <i className="icon-search" />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white inline-flex border border-border-color rounded-lg p-1 flex items-center gap-1 sm:w-auto w-full">
          <nav
            className="sm:flex gap-2 flex-wrap sm:w-auto w-full"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="btn py-1 flex justify-center items-center sm:w-auto w-full gap-1 rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-13"
              aria-selected="true"
              data-hs-tab="#tab-01"
              aria-controls="tab-01"
              role="tab"
            >
              <i className="icon-boxes" />
              All
            </button>
            <button
              type="button"
              className="btn py-1 flex justify-center items-center sm:w-auto w-full gap-1 rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-14"
              aria-selected="false"
              data-hs-tab="#tab-02"
              aria-controls="tab-02"
              role="tab"
            >
              <i className="icon-image" />
              Images
            </button>
            <button
              type="button"
              className="btn py-1 flex justify-center items-center sm:w-auto w-full gap-1 rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-15"
              aria-selected="false"
              data-hs-tab="#tab-03"
              aria-controls="tab-03"
              role="tab"
            >
              <i className="icon-file-play" />
              Videos
            </button>
            <button
              type="button"
              className="btn py-1 flex justify-center items-center sm:w-auto w-full gap-1 rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-16"
              aria-selected="false"
              data-hs-tab="#tab-04"
              aria-controls="tab-04"
              role="tab"
            >
              <i className="icon-headphones" />
              Audios
            </button>
          </nav>
        </div>
      </div>
    </div>{" "}
    {/* end col */}
    <div className="hs-tab-content col-span-12 bg-white p-5 pb-0 rounded-lg border border-border-color">
      <div id="tab-01" role="tabpanel" aria-labelledby="tab-01">
        <div className="border-b border-border-color pb-5 mb-5">
          <h6 className="mb-5">Search result for "DreamsAI"</h6>
          <div className="grid md:grid-cols-12 grid-cols-12 gap-5">
            {/* Card 1 */}
            <div className="lg:col-span-6 col-span-12 bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs">Dreams AI</p>
                    <Link
                      to="#"
                      className="text-info text-xs truncate xl:w-[250px] sm:w-[150px] w-[100px] block"
                    >
                      https://themeforest.net/search/dreamsai/generator/image
                    </Link>
                  </div>
                </div>
                <DropdownMenu
                  trigger={<i className="icon-ellipsis-vertical" />}
                  triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                  menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                </DropdownMenu>
              </div>
              <p className="text-dark font-semibold">
                Dreams AI - Image Generator
              </p>
              <p className="mb-4">
                Dreams AI transforms simple ideas into visually rich, high
                quality images powered by intelligent creativity.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="pe-2 border-e border-border-color">
                    1.2K Sales
                  </span>
                  <span>$30</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <p>(45)</p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="lg:col-span-6 col-span-12 bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs">Dreams AI</p>
                    <Link
                      to="#"
                      className="text-info text-xs truncate xl:w-[250px] sm:w-[150px] w-[100px] block"
                    >
                      https://themeforest.net/search/dreamsai/generator/image
                    </Link>
                  </div>
                </div>
                <DropdownMenu
                  trigger={<i className="icon-ellipsis-vertical" />}
                  triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                  menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                </DropdownMenu>
              </div>
              <p className="text-dark font-semibold">
                Dreams AI - Video Generator
              </p>
              <p className="mb-4">
                Create high quality AI generated videos from simple prompts
                using Dreams AI, designed for speed and creativity.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="pe-2 border-e border-border-color">
                    1.1K Sales
                  </span>
                  <span>$28</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <p>(36)</p>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="lg:col-span-6 col-span-12 bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs">Dreams AI</p>
                    <Link
                      to="#"
                      className="text-info text-xs truncate xl:w-[250px] sm:w-[150px] w-[100px] block"
                    >
                      https://themeforest.net/search/dreamsai/generator/image
                    </Link>
                  </div>
                </div>
                <DropdownMenu
                  trigger={<i className="icon-ellipsis-vertical" />}
                  triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                  menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                </DropdownMenu>
              </div>
              <p className="text-dark font-semibold">
                Dreams AI - Audio Generator
              </p>
              <p className="mb-4">
                Turn ideas into immersive audio experiences with Dreams AI’s
                smart and accurate audio generation engine.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="pe-2 border-e border-border-color">
                    1.4K Sales
                  </span>
                  <span>$22</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <p>(400)</p>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="lg:col-span-6 col-span-12 bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs">Dreams AI</p>
                    <Link
                      to="#"
                      className="text-info text-xs truncate xl:w-[250px] sm:w-[150px] w-[100px] block"
                    >
                      https://themeforest.net/search/dreamsai/generator/image
                    </Link>
                  </div>
                </div>
                <DropdownMenu
                  trigger={<i className="icon-ellipsis-vertical" />}
                  triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                  menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                >
                    <div className="p-2 space-y-1">
                      <button
                        type="button"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </button>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                </DropdownMenu>
              </div>
              <p className="text-dark font-semibold">
                Dreams AI - Flyer Generator
              </p>
              <p className="mb-4">
                Create eye catching flyers from simple prompts using Dreams AI’s
                intelligent design tools for professional results.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="pe-2 border-e border-border-color">
                    1.6K Sales
                  </span>
                  <span>$15</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <i className="fa-solid fa-star text-warning" />
                  <p>(52)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-border-color pb-5 mb-5">
          <h6 className="mb-5">Related Images</h6>
          <div className="grid grid-cols-12 gap-x-[17px] gap-y-4">
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_01}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(0)
                }}
              >
                <ImageWithBasePath
                  src={Images.gallery_01}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Unleash Your Creativity</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_02}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(1)
                }}
              >
                <ImageWithBasePath
                  src={Images.gallery_02}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Bring Your Ideas to Life</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_03}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(2)
                }}
              >
                <img
                  src={Images.gallery_03}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>From Ideas to Visuals</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_04}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(3)
                }}
              >
                <img
                  src={Images.gallery_04}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Visuals Made Simple</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end grid  */}
        </div>
        <div className="border-b border-border-color pb-5 mb-5">
          <h6 className="mb-5">Related Videos</h6>
          <div className="grid grid-cols-12 gap-x-[17px] gap-y-4">
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  ref={(el) => handleVideoRef('video-1', el)}
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_3}
                  onEnded={() => handleVideoEnded('video-1')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-1'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-1')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-1'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-1'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Create Visual Stories </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_2}
                  ref={(el) => handleVideoRef('video-2', el)}
                  onEnded={() => handleVideoEnded('video-2')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-2'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-2')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-2'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-2'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Bring Your Ideas to Life</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_1}
                  ref={(el) => handleVideoRef('video-3', el)}
                  onEnded={() => handleVideoEnded('video-3')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-3'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-3')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-3'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-3'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>From Ideas to Visuals</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_4}
                  ref={(el) => handleVideoRef('video-4', el)}
                  onEnded={() => handleVideoEnded('video-4')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-4'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-4')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-4'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-4'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Visuals Made Simple</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end grid  */}
        </div>
        <div className="pb-5">
          <h6 className="mb-5">Related Audio</h6>
          <div className="grid grid-cols-12 gap-x-[17px] gap-y-4">
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full p-5 mb-2 h-30 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Create Audio Instantly </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full p-5 mb-2 h-30 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Instant Audio Creation </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full p-5 mb-2 h-30 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Sound Made Simple </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full p-5 mb-2 h-30 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Bring Sound to Life </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
          </div>{" "}
          {/* end grid  */}
        </div>
      </div>
      <div
        id="tab-02"
        role="tabpanel"
        className="hidden"
        aria-labelledby="tab-02"
      >
        <div className="pb-5">
          <h6 className="mb-5">Related Images</h6>
          <div className="grid grid-cols-12 gap-x-[17px] gap-y-4">
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_01}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(0)
                }}
              >
                <ImageWithBasePath
                  src={Images.gallery_01}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Unleash Your Creativity</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_02}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(1)
                }}
              >
                <ImageWithBasePath
                  src={Images.gallery_02}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Bring Your Ideas to Life</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_03}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(2)
                }}
              >
                <img
                  src={Images.gallery_03}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 mb-2 flex-wrap flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>From Ideas to Visuals</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <a
                href={Images.gallery_04}
                className="group mb-2 relative block overflow-hidden rounded-lg image-popup"
                onClick={(e) => {
                  e.preventDefault()
                  handleImageClick(3)
                }}
              >
                <img
                  src={Images.gallery_04}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                    <i className="icon-eye" />
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 mb-2 flex-wrap flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Visuals Made Simple</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[24px] bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end grid  */}
        </div>
      </div>
      <div
        id="tab-03"
        role="tabpanel"
        className="hidden"
        aria-labelledby="tab-03"
      >
        <div className="pb-5">
          <h6 className="mb-5">Related Videos</h6>
          <div className="grid grid-cols-12 gap-x-[17px] gap-y-4">
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_3}
                  ref={(el) => handleVideoRef('video-5', el)}
                  onEnded={() => handleVideoEnded('video-5')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-5'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-5')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-5'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-5'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Create Visual Stories </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_2}
                  ref={(el) => handleVideoRef('video-6', el)}
                  onEnded={() => handleVideoEnded('video-6')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-6'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-6')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-6'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-6'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Bring Your Ideas to Life</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_1}
                  ref={(el) => handleVideoRef('video-7', el)}
                  onEnded={() => handleVideoEnded('video-7')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-7'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-7')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-7'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-7'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>From Ideas to Visuals</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative group video-card w-full mb-2 max-w-xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="video w-full h-full min-h-[210px] object-cover"
                  src={Images.ai_video_4}
                  ref={(el) => handleVideoRef('video-8', el)}
                  onEnded={() => handleVideoEnded('video-8')}
                  preload="metadata"
                >
                  {" "}
                </video>
                <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-8'] ? 'opacity-0' : ''}`}>
                  <button 
                    className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-8')
                    }}
                  >
                    <span className={`flex text-[24px] ${videoStates['video-8'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] ${videoStates['video-8'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
                  </button>
                </div>
              </div>{" "}
              {/* end video */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Visuals Made Simple</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end grid  */}
        </div>
      </div>
      <div
        id="tab-04"
        role="tabpanel"
        className="hidden"
        aria-labelledby="tab-04"
      >
        <div className="pb-5">
          <h6 className="mb-5">Related Audio</h6>
          <div className="grid grid-cols-12 gap-x-[17px] gap-y-4">
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full h-[118px] mb-2 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Create Audio Instantly </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full h-[118px] mb-2 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Instant Audio Creation </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full h-[118px] mb-2 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Sound Made Simple </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
            <div className="xl:col-span-3 sm:col-span-6 col-span-12">
              <div className="relative flex flex-col justify-center items-center bg-light border border-border-color w-full h-[118px] mb-2 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={Images.audio_icon_2}
                  alt="progress"
                  className="img-fluid transition-transform duration-300 group-hover:scale-90 mb-6"
                />
                <div className="w-full p-2 transition-opacity duration-300 bg-transparent backdrop-blur-sm absolute bottom-0 start-0">
                  <audio controls className="w-full h-8">
                    <source
                      src={Images.audio_1}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pe-2 border-e border-border-color">
                  Dreams AI
                </span>
                <span>Bring Sound to Life </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-[24px] h-[24px] p-1 rounded-full border border-border-color">
                    <ImageWithBasePath src={Images.logosmall} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-xs text-dark">Dreams AI</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-6 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-hs-overlay="#view-note"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End col */}
          </div>{" "}
          {/* end grid  */}
        </div>
      </div>
    </div>{" "}
    {/* end col */}
  </div>
  
  <Lightbox 
    open={lightboxOpen} 
    close={() => setLightboxOpen(false)} 
    slides={lightboxSlides} 
    index={lightboxIndex} 
  />
</div>
)
}

export default SearchResult