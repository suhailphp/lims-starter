import { useCallback, useRef, useState } from "react";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [videoStates, setVideoStates] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});

  const galleryImages = [
    { src: Images.gallery_01 },
    { src: Images.gallery_02 },
    { src: Images.gallery_03 },
    { src: Images.gallery_04 },
    { src: Images.gallery_05 },
    { src: Images.gallery_06 },
    { src: Images.gallery_07 },
    { src: Images.gallery_08 },
    { src: Images.gallery_09 },
    { src: Images.gallery_010 },
    { src: Images.gallery_011 },
  ];
  const toggleVideoPlay = useCallback((videoId: string) => {
    setVideoStates((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));

    const video = videoRefs.current[videoId];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, []);

  const handleVideoRef = useCallback(
    (videoId: string, element: HTMLVideoElement | null) => {
      if (element) {
        videoRefs.current[videoId] = element;
      }
    },
    [],
  );

  const handleVideoEnded = useCallback((videoId: string) => {
    setVideoStates((prev) => ({
      ...prev,
      [videoId]: false,
    }));
  }, []);
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
              <li aria-current="page" className=" text-gray-900">
                Gallery
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start grid */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={galleryImages}
        index={index}
      />
      <div className="mb-6">
        <h5 className="mb-4">Images Gallery 4 Column</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[17px] gap-y-4">
          <div
            onClick={() => {
              setIndex(0);
              setOpen(true);
            }}
            className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
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
          </div>
          <div
            onClick={() => {
              setIndex(1);
              setOpen(true);
            }}
            className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
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
          </div>
          <div
            onClick={() => {
              setIndex(2);
              setOpen(true);
            }}
            className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
          >
            <ImageWithBasePath
              src={Images.gallery_03}
              alt="image"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                <i className="icon-eye" />
              </span>
            </div>
          </div>
          <div
            onClick={() => {
              setIndex(3);
              setOpen(true);
            }}
            className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
          >
            <ImageWithBasePath
              src={Images.gallery_04}
              alt="image"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                <i className="icon-eye" />
              </span>
            </div>
          </div>
        </div>{" "}
        {/* end grid  */}
      </div>
      {/* End grid */}
      <div className="mb-6">
        <h5 className="mb-4">Images Gallery 3 Column</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[17px] gap-y-4">
          <div
            onClick={() => {
              setIndex(4);
              setOpen(true);
            }}
            className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
          >
            <ImageWithBasePath
              src={Images.gallery_05}
              alt="image"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                <i className="icon-eye" />
              </span>
            </div>
          </div>
          <div
            onClick={() => {
              setIndex(5);
              setOpen(true);
            }}
            className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
          >
            <ImageWithBasePath
              src={Images.gallery_06}
              alt="image"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                <i className="icon-eye" />
              </span>
            </div>
          </div>
          <div
            onClick={() => {
              setIndex(6);
              setOpen(true);
            }}
            className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
          >
            <ImageWithBasePath
              src={Images.gallery_07}
              alt="image"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                <i className="icon-eye" />
              </span>
            </div>
          </div>
        </div>{" "}
        {/* end grid  */}
      </div>{" "}
      {/* end card */}
      <div className="mb-6">
        <h5 className="mb-4">Images with Description</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[17px] gap-y-4">
          <div className="flex flex-col gap-4">
            <div
              onClick={() => {
                setIndex(8);
                setOpen(true);
              }}
              className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
            >
              <ImageWithBasePath
                src={Images.gallery_09}
                alt="image"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                  <i className="icon-eye" />
                </span>
              </div>
            </div>
            <p>Human and AI connecting to shape the future of intelligence.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div
              onClick={() => {
                setIndex(9);
                setOpen(true);
              }}
              className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
            >
              <ImageWithBasePath
                src={Images.gallery_010}
                alt="image"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                  <i className="icon-eye" />
                </span>
              </div>
            </div>
            <p>Nature and AI growing together to shape intelligent futures.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div
              onClick={() => {
                setIndex(7);
                setOpen(true);
              }}
              className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
            >
              <ImageWithBasePath
                src={Images.gallery_08}
                alt="image"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                  <i className="icon-eye" />
                </span>
              </div>
            </div>
            <p>Designing smarter systems through nature driven AI.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div
              onClick={() => {
                setIndex(10);
                setOpen(true);
              }}
              className="group relative block overflow-hidden rounded-lg image-popup h-full custom-lightbox"
            >
              <ImageWithBasePath
                src={Images.gallery_011}
                alt="image"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-[56px] h-[56px] text-[24px] text-dark flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                  <i className="icon-eye" />
                </span>
              </div>
            </div>
            <p>Building adaptive ecosystems through intelligent design.</p>
          </div>
        </div>{" "}
        {/* end grid  */}
      </div>{" "}
      {/* end card */}
      <div>
        <h5 className="mb-4">Videos</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[17px] gap-y-4">
          <div className="relative group video-card w-full max-w-xl mx-auto rounded-2xl overflow-hidden">
            <video
              className="video w-full h-full max-h-[195px] min-h-[210px] object-cover"
               src={Images.ai_video_7}
                                ref={(el) => handleVideoRef('video-7', el)}
                                onEnded={() => handleVideoEnded('video-7')}
                                preload="metadata"
            >
              {" "}
            </video>
            <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-7'] ? 'opacity-0' : ''}`}>
              <button onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-7')
                    }} className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">

                <span className={`flex text-[24px] playIcon ${videoStates['video-7'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] pauseIcon ${videoStates['video-7'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
              </button>
            </div>
          </div>{" "}
          {/* end video */}
          <div className="relative group video-card w-full max-w-xl mx-auto rounded-2xl overflow-hidden">
            <video
              className="video w-full h-full min-h-[210px] object-cover"
              src={Images.ai_video_2}
              ref={(el) => handleVideoRef("video-2", el)}
              onEnded={() => handleVideoEnded("video-2")}
              preload="metadata"
            >
              {" "}
            </video>
            <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-2'] ? 'opacity-0' : ''}`}>
              <button
                className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVideoPlay("video-2");
                }}
              >
                <span className={`flex text-[24px] playIcon ${videoStates['video-2'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] pauseIcon ${videoStates['video-2'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
              </button>
            </div>
          </div>{" "}
          {/* end video */}
          <div className="relative group video-card w-full max-w-xl mx-auto rounded-2xl overflow-hidden">
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
              <button  onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay('video-3')
                    }} className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto">
                <span className={`flex text-[24px] playIcon ${videoStates['video-3'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] pauseIcon ${videoStates['video-3'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
              </button>
            </div>
          </div>{" "}
          {/* end video */}
          <div className="relative group video-card w-full max-w-xl mx-auto rounded-2xl overflow-hidden">
            <video
              className="video w-full h-full min-h-[210px] object-cover"
              src={Images.ai_video_3}
              ref={(el) => handleVideoRef("video-5", el)}
              onEnded={() => handleVideoEnded("video-5")}
              preload="metadata"
            >
              {" "}
            </video>
            <div className={`videoOverlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${videoStates['video-5'] ? 'opacity-0' : ''}`}>
              <button
                className="playPauseBtn w-[56px] h-[56px] cursor-pointer flex items-center justify-center rounded-full bg-white backdrop-blur shadow-lg pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVideoPlay("video-5");
                }}
              >
                 <span className={`flex text-[24px] playIcon ${videoStates['video-5'] ? 'hidden' : ''}`}>
                      <i className="icon-play text-dark" />
                    </span>
                    <span className={`flex text-[24px] pauseIcon ${videoStates['video-5'] ? '' : 'hidden'}`}>
                      <i className="icon-pause text-dark" />
                    </span>
              </button>
            </div>
          </div>{" "}
          {/* end video */}
        </div>{" "}
        {/* end grid  */}
      </div>{" "}
      {/* end card */}
    </div>
  );
};

export default Gallery;
