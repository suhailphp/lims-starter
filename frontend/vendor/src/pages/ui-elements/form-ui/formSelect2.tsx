import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import CommonSelect, {
  type Option,
} from "../../../components/common-select/commonSelect";
import CommonMultiSelect, {
  type OptionType,
} from "../../../components/common-multiselect/mutliSelect";
import { useCodeToggle } from "../../../hooks/useCodeToggle";
import { useState } from "react";
import CommonTagInput from "../../../components/common-tag-input/commonTagInput";
import { Assignees } from "../../../utils/json/selectData";

const FormSelect2 = () => {
  const { showCode, copied, handleShowCode, handleCopy } = useCodeToggle();
  const [templateVariables, setTemplateVariables] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<OptionType[]>([]);
  const cityOptions: Option[] = [
    { value: "madrid", label: "Madrid" },
    { value: "toronto", label: "Toronto" },
    { value: "vancouver", label: "Vancouver" },
    { value: "london", label: "London" },
    { value: "berlin", label: "Berlin" },
  ];

  const numberOptions: Option[] = [
    { value: "zero", label: "Zero" },
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
    { value: "four", label: "Four" },
  ];

  const stateOptions: OptionType[] = [
    { value: "CA", label: "California" },
    { value: "NV", label: "Nevada" },
    { value: "OR", label: "Oregon" },
    { value: "AZ", label: "Arizona" },
  ];

  const [singleCity, setSingleCity] = useState<Option | Option[] | undefined>(
    cityOptions[0],
  );
  const [singleNumber, setSingleNumber] = useState<
    Option | Option[] | undefined
  >();
  const [_multiStates, _setMultiStates] = useState<OptionType[]>([
    stateOptions[0],
  ]);

  const selectCode = `<CommonSelect
  options={cityOptions}
  value={singleCity}
  onChange={setSingleCity}
  placeholder="Select a city"
/>`;

  const multiSelectCode = `<CommonMultiSelect
  name="states"
  value={multiStates}
  options={stateOptions}
  onChange={setMultiStates}
  placeholder="Choose states"
/>`;

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
                Form Select
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Start Grid */}
      <div className="grid grid-cols-1 gap-6">
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Choices</h5>
            <button
              type="button"
              onClick={() => handleShowCode(1)}
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div
            className={`preview-content grid grid-cols-12 gap-5 ${showCode[1] ? "hidden" : ""}`}
          >
            <div className="col-span-12 sm:col-span-6">
              <label className="block text-sm font-medium mb-2 text-dark">
                Default
              </label>
              <CommonSelect
                options={cityOptions}
                value={singleCity}
                onChange={(value) => setSingleCity(value)}
                placeholder="Select a city"
                className="custom-select"
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label className="block text-sm font-medium mb-2 text-dark">
                Options added
              </label>
              <CommonSelect
                options={numberOptions}
                value={singleNumber}
                onChange={(value) => setSingleNumber(value)}
                placeholder="Choose a number"
                className="custom-select"
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label className="block text-sm font-medium mb-2 text-dark">
                Multiple Select
              </label>
              <CommonMultiSelect
                name="cities"
                value={selectedCities}
                options={Assignees}
                onChange={setSelectedCities}
                placeholder="Choose Cities"
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label className="block text-sm font-medium mb-2 text-dark">
                Selected Values
              </label>
              <div className=" min-h-[42px] flex items-center">
                <CommonTagInput
                  id="template-variables"
                  value={templateVariables}
                  onChange={setTemplateVariables}
                  placeholder=""
                  className="custom-tag-input"
                />
              </div>
            </div>
          </div>
          <pre
            className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[1] ? "" : "hidden"}`}
          >
            <button
              type="button"
              onClick={() =>
                handleCopy(1, `${selectCode}\n\n${multiSelectCode}`)
              }
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <i className="icon icon-copy" />
              <span>{copied[1] ? "Copied!" : "Copy"}</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {`\n${selectCode}\n\n${multiSelectCode}\n`}
            </code>
            {"\n"}
          </pre>
        </div>
      </div>
      {/* End grid */}
    </div>
  );
};

export default FormSelect2;
