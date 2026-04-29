import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import { useState, useEffect } from "react"

const PresentationGeneratorResult = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTheme, setActiveTheme] = useState('white')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleThemeClick = (theme: string) => {
    setActiveTheme(theme)
  }

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper relative flex flex-row flex-wrap items-center justify-center h-[calc(100vh-133px)]! overflow-y-auto w-full">
        <div className="content w-full">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-10 md:col-start-2">
              <div className="bg-white rounded-lg border border-border-color p-5 shadow w-full mb-6">
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-border-color">
                  <h5>Outline</h5>
                  <Link
                    to="#"
                    className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="icon-pencil-line" />
                    Edit Outline
                  </Link>
                </div>
                <h5 className="mb-5">
                  Title: Social Media Posts Performance and Best Practices
                </h5>
                <div className={`animate-pulse space-y-2 loading-state mb-6 ${isLoading ? '' : 'hidden'}`}>
                  <div className="h-3 bg-gray-200 rounded-full" />
                  <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-200 rounded-full" />
                  <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-200 rounded-full" />
                  <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                </div>
                <div className={`space-y-2 mb-6 content-state ${isLoading ? 'hidden' : ''}`}>
                  <div className="bg-light border border-border-color p-3 rounded-lg flex items-center gap-2 flex-wrap">
                    <span className="badge rounded-lg text-xs font-medium bg-white border border-border-color text-gray-900 inline-flex items-center">
                      <i className="icon-sliders-vertical me-1" />
                      Slide 01
                    </span>
                    <p className="text-gray-900">
                      Social Media Posts Performance and Best Practices
                    </p>
                  </div>
                  <div className="bg-light border border-border-color p-3 rounded-lg flex items-center gap-2 flex-wrap">
                    <span className="badge rounded-lg text-xs font-medium bg-white border border-border-color text-gray-900 inline-flex items-center">
                      <i className="icon-sliders-vertical me-1" />
                      Slide 02
                    </span>
                    <p className="text-gray-900">
                      Introduction – The AI Revolution in Higher Education
                    </p>
                  </div>
                  <div className="bg-light border border-border-color p-3 rounded-lg flex items-center gap-2 flex-wrap">
                    <span className="badge rounded-lg text-xs font-medium bg-white border border-border-color text-gray-900 inline-flex items-center">
                      <i className="icon-sliders-vertical me-1" />
                      Slide 03
                    </span>
                    <p className="text-gray-900">Types of Social Media Posts</p>
                  </div>
                  <div className="bg-light border border-border-color p-3 rounded-lg flex items-center gap-2 flex-wrap">
                    <span className="badge rounded-lg text-xs font-medium bg-white border border-border-color text-gray-900 inline-flex items-center">
                      <i className="icon-sliders-vertical me-1" />
                      Slide 04
                    </span>
                    <p className="text-gray-900">
                      Challenges in Implementing AI in Universities
                    </p>
                  </div>
                  <div className="bg-light border border-border-color p-3 rounded-lg flex items-center gap-2 flex-wrap">
                    <span className="badge rounded-lg text-xs font-medium bg-white border border-border-color text-gray-900 inline-flex items-center">
                      <i className="icon-sliders-vertical me-1" />
                      Slide 05
                    </span>
                    <p className="text-gray-900">
                      Successful Case Studies of AI in Education
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    to={Path.presentationGenerator}
                    className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="icon-loader" />
                    Load More
                  </Link>
                </div>
              </div>{" "}
              {/* end card */}
              <div className="bg-white rounded-lg border border-border-color p-5 shadow">
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-border-color">
                  <h5>Design</h5>
                  <Link
                    to="#"
                    className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="generate-flyer"
                    data-hs-overlay="#generate-flyer"
                  >
                    View all Themes
                    <i className="icon-chevron-right" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'white' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`} onClick={() => handleThemeClick('white')}>
                    <div className="bg-light rounded-lg p-5 text-center mb-4">
                      <div className="bg-gray-200 h-2 w-full mb-3" />
                      <p className="text-gray-900 text-xl max-lg:text-lg font-medium mb-0">
                        Title
                      </p>
                    </div>
                    <p className="text-gray-900 font-semibold mb-0">White</p>
                  </div>{" "}
                  {/* end card */}
                  <div className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'purple' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`} onClick={() => handleThemeClick('purple')}>
                    <div className="bg-primary rounded-lg p-5 text-center mb-4">
                      <div className="bg-orange h-2 w-full mb-3" />
                      <p className="text-white text-xl max-lg:text-lg font-medium mb-0">
                        Title
                      </p>
                    </div>
                    <p className="text-gray-900 font-semibold mb-0">Purple</p>
                  </div>{" "}
                  {/* end card */}
                  <div className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'cosmic' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`} onClick={() => handleThemeClick('cosmic')}>
                    <div className="bg-linear-gradient-700 rounded-lg p-5 text-center mb-4">
                      <div className="bg-white h-2 w-full mb-3" />
                      <p className="text-white text-xl max-lg:text-lg font-medium mb-0">
                        Title
                      </p>
                    </div>
                    <p className="text-gray-900 font-semibold mb-0">Cosmic Pulse</p>
                  </div>{" "}
                  {/* end card */}
                </div>
              </div>{" "}
              {/* end card */}
            </div>
          </div>
          <img
            src="assets/img/bg/presentation-bg.png"
            alt=""
            className="absolute top-0 left-0 w-full -z-1"
          />
        </div>
      </div>
      {/* End Page Wrapper */}
    </>

  )
}

export default PresentationGeneratorResult