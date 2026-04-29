import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import { useCodeToggle } from "../../../hooks/useCodeToggle"
import { Slider } from "primereact/slider"
import { useState } from "react"

const UiRangeslider = () => {
  const { showCode, copied, handleShowCode, handleCopy } = useCodeToggle()
  const [basicValue, setBasicValue] = useState(50)
  const [multiValue, setMultiValue] = useState<[number, number]>([20, 80])
  const [valueRange, setValueRange] = useState<[number, number]>([20, 80])
  const [primaryValue, setPrimaryValue] = useState(50)
  const [successValue, setSuccessValue] = useState(50)
  const [infoValue, setInfoValue] = useState(50)
  const [warningValue, setWarningValue] = useState(50)
  const [dangerValue, setDangerValue] = useState(50)
  const [slider1Value, setSlider1Value] = useState(50)
  const [slider2Value, setSlider2Value] = useState(50)
  const [isLocked, setIsLocked] = useState(false)
  const [tooltipValue, setTooltipValue] = useState(50)
  const [softValue, setSoftValue] = useState(50)
  const [redValue, setRedValue] = useState(127)
  const [greenValue, setGreenValue] = useState(127)
  const [blueValue, setBlueValue] = useState(127)
  const [verticalValue, setVerticalValue] = useState(50)
  const [verticalTooltipValue, setVerticalTooltipValue] = useState(50)

  const handleLockToggle = () => {
    setIsLocked(!isLocked)
    if (!isLocked) {
      setSlider2Value(slider1Value)
    }
  }

  const handleSlider1Change = (value: number) => {
    setSlider1Value(value)
    if (isLocked) {
      setSlider2Value(value)
    }
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
              <li className="inline-flex items-center">
                <span className="text-gray-600">UI Elements</span>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li aria-current="page" className="text-gray-900">
                Range Slider
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Basic Range Slider */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Basic Range Slider</h5>
            <button
              type="button"
              onClick={() => handleShowCode(1)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[1] ? 'hidden' : ''}`}>
            <Slider value={basicValue} onChange={(e) => setBasicValue(e.value as number)} />
            <p className="mt-3">Value: {basicValue}</p>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[1] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(1, '<Slider value={value} onChange={(e) => setValue(e.value)} />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[1] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} />\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Multi Elements Range */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Multi Elements Range</h5>
            <button
              type="button"
              onClick={() => handleShowCode(2)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[2] ? 'hidden' : ''}`}>
            <Slider value={multiValue} onChange={(e) => setMultiValue(e.value as [number, number])} range />
            <p className="mt-3">Values: {multiValue[0]} - {multiValue[1]}</p>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[2] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(2, '<Slider value={value} onChange={(e) => setValue(e.value)} range />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[2] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} range />\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Value Range Slider */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Value Range Slider</h5>
            <button
              type="button"
              onClick={() => handleShowCode(3)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[3] ? 'hidden' : ''}`}>
            <Slider value={valueRange} onChange={(e) => setValueRange(e.value as [number, number])} range min={0} max={100} />
            <div className="flex justify-between mt-3">
              <div>Lower: {valueRange[0]}</div>
              <div>Upper: {valueRange[1]}</div>
            </div>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[3] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(3, '<Slider value={value} onChange={(e) => setValue(e.value)} range min={0} max={100} />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[3] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} range min={0} max={100} />\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Color Scheme */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Color Scheme</h5>
            <button
              type="button"
              onClick={() => handleShowCode(4)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[4] ? 'hidden' : ''}`}>
            <div className="mb-4">
              <h6 className="mb-2 text-sm">Primary</h6>
              <Slider value={primaryValue} onChange={(e) => setPrimaryValue(e.value as number)} className="p-slider-primary" />
            </div>
            <div className="mb-4">
              <h6 className="mb-2 text-sm">Success</h6>
              <Slider value={successValue} onChange={(e) => setSuccessValue(e.value as number)} className="p-slider-success" />
            </div>
            <div className="mb-4">
              <h6 className="mb-2 text-sm">Info</h6>
              <Slider value={infoValue} onChange={(e) => setInfoValue(e.value as number)} className="p-slider-info" />
            </div>
            <div className="mb-4">
              <h6 className="mb-2 text-sm">Warning</h6>
              <Slider value={warningValue} onChange={(e) => setWarningValue(e.value as number)} className="p-slider-warning" />
            </div>
            <div>
              <h6 className="mb-2 text-sm">Danger</h6>
              <Slider value={dangerValue} onChange={(e) => setDangerValue(e.value as number)} className="p-slider-danger" />
            </div>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[4] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(4, '<Slider value={value} onChange={(e) => setValue(e.value)} className="p-slider-primary" />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[4] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} className=\"p-slider-primary\" />\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Locking Sliders Together */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Locking Sliders Together</h5>
            <button
              type="button"
              onClick={() => handleShowCode(5)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[5] ? 'hidden' : ''}`}>
            <Slider value={slider1Value} onChange={(e) => handleSlider1Change(e.value as number)} />
            <p className="mt-1">Slider 1: {slider1Value}</p>
            <Slider value={slider2Value} onChange={(e) => setSlider2Value(e.value as number)} disabled={isLocked} />
            <p className="mt-1">Slider 2: {slider2Value}</p>
            <button
              type="button"
              onClick={handleLockToggle}
              className="btn bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:text-white mt-4"
            >
              {isLocked ? 'Unlock' : 'Lock'}
            </button>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[5] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(5, '// Locking sliders example\nconst [isLocked, setIsLocked] = useState(false)\nconst [slider1Value, setSlider1Value] = useState(50)\nconst [slider2Value, setSlider2Value] = useState(50)')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[5] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}// Locking sliders example{"\n"}const [isLocked, setIsLocked] = useState(false){"\n"}const [slider1Value, setSlider1Value] = useState(50){"\n"}const [slider2Value, setSlider2Value] = useState(50){"\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Tooltip */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Tooltip</h5>
            <button
              type="button"
              onClick={() => handleShowCode(6)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[6] ? 'hidden' : ''}`}>
            <Slider value={tooltipValue} onChange={(e) => setTooltipValue(e.value as number)} />
            <p className="mt-3">Value: {tooltipValue}</p>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[6] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(6, '<Slider value={value} onChange={(e) => setValue(e.value)} tooltip />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[6] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} />\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Soft Limits */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Soft Limits</h5>
            <button
              type="button"
              onClick={() => handleShowCode(7)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[7] ? 'hidden' : ''}`}>
            <Slider value={softValue} onChange={(e) => setSoftValue(e.value as number)} min={0} max={100} step={5} />
            <p className="mt-3">Value: {softValue}</p>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[7] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(7, '<Slider value={value} onChange={(e) => setValue(e.value)} min={0} max={100} step={5} />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[7] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} min={0} max={100} step={5} />\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Color Picker */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Color Picker</h5>
            <button
              type="button"
              onClick={() => handleShowCode(8)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content flex items-center justify-center gap-8 ${showCode[8] ? 'hidden' : ''}`}>
            <div>
              <Slider value={redValue} onChange={(e) => setRedValue(e.value as number)} className="p-slider-red" />
              <Slider value={greenValue} onChange={(e) => setGreenValue(e.value as number)} className="p-slider-green" />
              <Slider value={blueValue} onChange={(e) => setBlueValue(e.value as number)} className="p-slider-blue" />
            </div>
            <div 
              className="w-20 h-20 rounded-md border-2 border-border-color"
              style={{ backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})` }}
            />
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[8] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(8, '// Color picker example\nconst [redValue, setRedValue] = useState(127)\nconst [greenValue, setGreenValue] = useState(127)\nconst [blueValue, setBlueValue] = useState(127)')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[8] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}// Color picker example{"\n"}const [redValue, setRedValue] = useState(127){"\n"}const [greenValue, setGreenValue] = useState(127){"\n"}const [blueValue, setBlueValue] = useState(127){"\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Vertical Range */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Vertical Range</h5>
            <button
              type="button"
              onClick={() => handleShowCode(9)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[9] ? 'hidden' : ''}`}>
            <div className="mx-auto" style={{ width: '20px', height: '200px' }}>
              <Slider value={verticalValue} onChange={(e) => setVerticalValue(e.value as number)} orientation="vertical" />
            </div>
            <p className="mt-3 text-center">Value: {verticalValue}</p>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[9] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(9, '<Slider value={value} onChange={(e) => setValue(e.value)} orientation="vertical" />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[9] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} orientation=\"vertical\" />\n"}
            </code>
            {"\n"}
          </pre>
        </div>

        {/* Vertical Tooltip */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Vertical Tooltip</h5>
            <button
              type="button"
              onClick={() => handleShowCode(10)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div className={`preview-content ${showCode[10] ? 'hidden' : ''}`}>
            <div className="mx-auto" style={{ width: '20px', height: '200px' }}>
              <Slider value={verticalTooltipValue} onChange={(e) => setVerticalTooltipValue(e.value as number)} orientation="vertical" />
            </div>
            <p className="mt-3 text-center">Value: {verticalTooltipValue}</p>
          </div>
          <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[10] ? '' : 'hidden'}`}>
            <button
              type="button"
              onClick={() => handleCopy(10, '<Slider value={value} onChange={(e) => setValue(e.value)} orientation="vertical" tooltip />')}
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[10] ? 'Copied!' : 'Copy'}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n<Slider value={value} onChange={(e) => setValue(e.value)} orientation=\"vertical\" />\n"}
            </code>
            {"\n"}
          </pre>
        </div>
      </div>
      {/* End grid */}
    </div>
  )
}

export default UiRangeslider
