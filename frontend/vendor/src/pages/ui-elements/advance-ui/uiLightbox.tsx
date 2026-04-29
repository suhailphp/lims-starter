import { Link } from "react-router-dom"
import { useState } from "react"
import type { Slide } from "yet-another-react-lightbox"
import Lightbox from "../../../components/lightbox/lightbox"
import ImageWithBasePath from "../../../components/image-with-base-path"
import { Path } from "../../../routes/path"
import { useCodeToggle } from "../../../hooks/useCodeToggle"
import { Images } from "../../../utils/imagePath"

const UiLightbox = () => {
  const { showCode, copied, handleShowCode, handleCopy } = useCodeToggle()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxSlides, setLightboxSlides] = useState<Slide[]>([])

  const singleImageItems = [
    { id: 1, imagePath: Images.card_01, alt: "card-01" },
    { id: 2, imagePath: Images.card_02, alt: "card-02" },
    { id: 3, imagePath: Images.card_03, alt: "card-03" },
  ]

  const imageWithDescriptionItems = [
    {
      id: 1,
      imagePath: Images.card_04,
      title: "Title 01",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
      alt: "work-thumbnail-01",
    },
    {
      id: 2,
      imagePath: Images.card_05,
      title: "Title 02",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
      alt: "work-thumbnail-02",
    },
    {
      id: 3,
      imagePath: Images.card_06,
      title: "Title 03",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
      alt: "work-thumbnail-03",
    },
  ]

  const handleLightboxOpen = (items: typeof singleImageItems, index: number) => {
    setLightboxSlides(items.map((item) => ({ src: item.imagePath })))
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

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
            Lightbox
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-12 gap-6">
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Single Image Lightbox</h5>
        <button
          type="button"
          onClick={() => handleShowCode(1)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content grid grid-cols-1 sm:grid-cols-3 gap-4 ${showCode[1] ? "hidden" : ""}`}>
        {singleImageItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleLightboxOpen(singleImageItems, index)}
            className="image-popup text-start"
          >
            <ImageWithBasePath src={item.imagePath} alt={item.alt} className="h-full rounded-md" />
          </button>
        ))}
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[1] ? "" : "hidden"}`}>
        <button
          type="button"
          onClick={() =>
            handleCopy(
              1,
              `<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <a href="assets/img/card/card-01.jpg" class="image-popup">
    <img src="assets/img/card/card-01.jpg" alt="card-01" class="h-full rounded-md" />
  </a>
</div>`
            )
          }
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[1] ? "Copied!" : "Copy"}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n<div class=\"grid grid-cols-1 sm:grid-cols-3 gap-4\">\n  <a href=\"assets/img/card/card-01.jpg\" class=\"image-popup\">\n    <img src=\"assets/img/card/card-01.jpg\" alt=\"card-01\" class=\"h-full rounded-md\" />\n  </a>\n</div>\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Image with Description</h5>
        <button
          type="button"
          onClick={() => handleShowCode(2)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content grid grid-cols-1 sm:grid-cols-3 gap-4 ${showCode[2] ? "hidden" : ""}`}>
        {imageWithDescriptionItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleLightboxOpen(imageWithDescriptionItems, index)}
            className="image-popup-desc"
            data-title={item.title}
            data-description={item.description}
          >
            <ImageWithBasePath src={item.imagePath} className="img-fluid rounded-md" alt={item.alt} />
          </button>
        ))}
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[2] ? "" : "hidden"}`}>
        <button
          type="button"
          onClick={() =>
            handleCopy(
              2,
              `<a href="assets/img/card/card-04.jpg" class="image-popup-desc" data-title="Title 01" data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit">
  <img src="assets/img/card/card-04.jpg" class="img-fluid rounded-md" alt="work-thumbnail-01" />
</a>`
            )
          }
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[2] ? "Copied!" : "Copy"}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n<a href=\"assets/img/card/card-04.jpg\" class=\"image-popup-desc\" data-title=\"Title 01\" data-description=\"Lorem ipsum dolor sit amet, consectetuer adipiscing elit\">\n  <img src=\"assets/img/card/card-04.jpg\" class=\"img-fluid rounded-md\" alt=\"work-thumbnail-01\" />\n</a>\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
  </div>
  {/* End grid */}
  <Lightbox
    open={lightboxOpen}
    close={() => setLightboxOpen(false)}
    slides={lightboxSlides}
    index={lightboxIndex}
  />
</div>

  )
}

export default UiLightbox