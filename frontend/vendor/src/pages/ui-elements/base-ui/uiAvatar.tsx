import { useState } from "react";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";


const UiAvatar = () => {
      const [showCode, setShowCode] = useState<Record<string, boolean>>({});
      const handleShowCode = (id: number) => {
      setShowCode((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };
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
            Avatar
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Circular Avatars</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(1)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content ${showCode[1] ? 'hidden' : ''}`}>
        <div className="flex flex-wrap items-end justify-start lg:justify-between! gap-3 border-dashed border-primary border px-4.5 py-5 rounded-md">
          <ImageWithBasePath
            className="w-3 h-3 border border-border-color rounded-full"
            src={Images.avatar_01}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-4 h-4 border border-border-color rounded-full"
            src={Images.avatar_02}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-5 h-5 border border-border-color rounded-full"
            src={Images.avatar_03}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-6 h-6 border border-border-color rounded-full"
            src={Images.avatar_04}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-8 h-8 border border-border-color rounded-full"
            src={Images.avatar_05}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-10 h-10 border border-border-color rounded-full"
            src={Images.avatar_06}
            alt="avatar"
          />
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[1] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="flex flex-wrap items-end justify-start
          lg:justify-between! gap-3 border-dashed border-primary border px-4.5
          py-5 rounded-md"&gt; {"\n"}
          {"\t"}&lt;img class="w-3 h-3 border border-border-color rounded-full"
          src={Images.avatar_01} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-4 h-4 border border-border-color rounded-full"
          src={Images.avatar_02} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-5 h-5 border border-border-color rounded-full"
          src={Images.avatar_03} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-6 h-6 border border-border-color rounded-full"
          src={Images.avatar_04} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-full"
          src={Images.avatar_05} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-10 h-10 border border-border-color
          rounded-full" src={Images.avatar_06} alt="avatar"&gt;{" "}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Square Avatars</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(2)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content ${showCode[2] ? 'hidden' : ''}`}>
        <div className="flex flex-wrap items-end justify-start lg:justify-between! gap-3 border-dashed border-primary border px-4.5 py-5 rounded-md">
          <ImageWithBasePath
            className="w-3 h-3 border border-border-color rounded-xs"
            src={Images.avatar_14}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-4 h-4 border border-border-color rounded-xs"
            src={Images.avatar_15}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-5 h-5 border border-border-color rounded-sm"
            src={Images.avatar_16}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-6 h-6 border border-border-color rounded-md"
            src={Images.avatar_17}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-8 h-8 border border-border-color rounded-lg"
            src={Images.avatar_18}
            alt="avatar"
          />
          <ImageWithBasePath
            className="w-10 h-10 border border-border-color rounded-lg"
            src={Images.avatar_19}
            alt="avatar"
          />
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[2] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {" "}
          {"\n"}&lt;div class="flex flex-wrap items-end justify-start
          lg:justify-between! gap-3 border-dashed border-primary border px-4.5
          py-5 rounded-md"&gt;{"\n"}
          {"\t"}&lt;img class="w-3 h-3 border border-border-color rounded-xs"
          src={Images.avatar_14} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-4 h-4 border border-border-color rounded-xs"
          src={Images.avatar_15} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-5 h-5 border border-border-color rounded-sm"
          src={Images.avatar_16} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-6 h-6 border border-border-color rounded-md"
          src={Images.avatar_17} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-8 h-8 border border-border-color rounded-lg"
          src={Images.avatar_18} alt="avatar"&gt;{"\n"}
          {"\t"}&lt;img class="w-10 h-10 border border-border-color rounded-lg"
          src={Images.avatar_19} alt="avatar"&gt; {"\n"}
          &lt;/div&gt; {"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Circular Avatars with Placeholder</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(3)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content border-dashed border-primary border px-4.5 py-5 rounded-md ${showCode[3] ? 'hidden' : ''}`}>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3 lg:mb-12 mb-5">
          <span className="w-4 h-4 bg-primary rounded-full text-xs text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-5 h-5 bg-primary rounded-full text-xs text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-6 h-6 bg-primary rounded-full text-xs text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-8 h-8 bg-primary rounded-full text-[13px] text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-11 h-11 bg-primary rounded-full text-white flex justify-center items-center font-semibold">
            AI
          </span>
        </div>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3">
          <span className="w-4 h-4 bg-light border border-border-color rounded-full text-xs text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-5 h-5 bg-light border border-border-color rounded-full text-xs text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-6 h-6 bg-light border border-border-color rounded-full text-xs text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-8 h-8 bg-light border border-border-color rounded-full text-[13px] text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-10 h-10 bg-light border border-border-color rounded-full text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-11 h-11 bg-light border border-border-color rounded-full text-dark flex justify-center items-center font-semibold">
            AI
          </span>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[3] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3 lg:mb-12 mb-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-primary rounded-full text-xs
          text-white flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-primary rounded-full text-xs
          text-white flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-primary rounded-full text-xs
          text-white flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-primary rounded-full text-[13px]
          text-white flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-primary rounded-full text-white
          flex justify-center items-center font-semibold"&gt;AI&lt;/span&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-primary rounded-full text-white
          flex justify-center items-center font-semibold"&gt;AI&lt;/span&gt;
          {"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-light border border-border-color
          rounded-full text-xs text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-light border border-border-color
          rounded-full text-xs text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-light border border-border-color
          rounded-full text-xs text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-light border border-border-color
          rounded-full text-[13px] text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Square Avatars with Placeholder</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(4)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content border-dashed border-primary border px-4.5 py-5 rounded-md ${showCode[4] ? 'hidden' : ''}`}>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3 lg:mb-12 mb-5">
          <span className="w-4 h-4 bg-primary rounded-xs text-xs text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-5 h-5 bg-primary rounded-sm text-xs text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-6 h-6 bg-primary rounded-md text-xs text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-8 h-8 bg-primary rounded-lg text-[13px] text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-10 h-10 bg-primary rounded-lg text-white flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-11 h-11 bg-primary rounded-xl text-white flex justify-center items-center font-semibold">
            AI
          </span>
        </div>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3">
          <span className="w-4 h-4 bg-light border border-border-color rounded-xs text-xs text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-5 h-5 bg-light border border-border-color rounded-sm text-xs text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-6 h-6 bg-light border border-border-color rounded-md text-xs text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-8 h-8 bg-light border border-border-color rounded-lg text-[13px] text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-10 h-10 bg-light border border-border-color rounded-lg text-dark flex justify-center items-center font-semibold">
            AI
          </span>
          <span className="w-11 h-11 bg-light border border-border-color rounded-xl text-dark flex justify-center items-center font-semibold">
            AI
          </span>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[4] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3 lg:mb-12 mb-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-primary rounded-xs text-xs text-white
          flex justify-center items-center font-semibold"&gt;AI&lt;/span&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-primary rounded-sm text-xs text-white
          flex justify-center items-center font-semibold"&gt;AI&lt;/span&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-primary rounded-md text-xs text-white
          flex justify-center items-center font-semibold"&gt;AI&lt;/span&gt;
          {"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-primary rounded-lg text-[13px]
          text-white flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-primary rounded-lg text-white flex
          justify-center items-center font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-primary rounded-xl text-white flex
          justify-center items-center font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-light border border-border-color
          rounded-xs text-xs text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-light border border-border-color
          rounded-sm text-xs text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-light border border-border-color
          rounded-md text-xs text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-light border border-border-color
          rounded-lg text-[13px] text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-light border border-border-color
          rounded-lg text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-light border border-border-color
          rounded-xl text-dark flex justify-center items-center
          font-semibold"&gt;AI&lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Circular Avatars with Placeholder Icons</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(5)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content border-dashed border-primary border px-4.5 py-5 rounded-md ${showCode[5] ? 'hidden' : ''}`}>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3 lg:mb-12 mb-5">
          <span className="w-4 h-4 bg-primary rounded-full text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-5 h-5 bg-primary rounded-full text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-6 h-6 bg-primary rounded-full text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-8 h-8 bg-primary rounded-full text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-11 h-11 bg-primary rounded-full text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
        </div>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3">
          <span className="w-4 h-4 bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-5 h-5 bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-6 h-6 bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-8 h-8 bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-10 h-10 bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-11 h-11 bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[5] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3 lg:mb-12 mb-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-primary rounded-full text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-primary rounded-full text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-primary rounded-full text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-primary rounded-full text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-primary rounded-full text-white
          flex justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-primary rounded-full text-white
          flex justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-light border border-border-color
          rounded-full text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Square Avatars with Placeholder Icons</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(6)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content border-dashed border-primary border px-4.5 py-5 rounded-md ${showCode[6] ? 'hidden' : ''}`}>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3 lg:mb-12 mb-5">
          <span className="w-4 h-4 bg-primary rounded-xs text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-5 h-5 bg-primary rounded-sm text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-6 h-6 bg-primary rounded-md text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-8 h-8 bg-primary rounded-lg text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-10 h-10 bg-primary rounded-lg text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-11 h-11 bg-primary rounded-xl text-white flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
        </div>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3">
          <span className="w-4 h-4 bg-light border border-border-color rounded-xs text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-5 h-5 bg-light border border-border-color rounded-sm text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-6 h-6 bg-light border border-border-color rounded-md text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-8 h-8 bg-light border border-border-color rounded-lg text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-10 h-10 bg-light border border-border-color rounded-lg text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
          <span className="w-11 h-11 bg-light border border-border-color rounded-xl text-dark flex justify-center items-center">
            <i className="icon icon-user" />{" "}
          </span>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[6] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3 lg:mb-12 mb-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-primary rounded-xs text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-primary rounded-sm text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-primary rounded-md text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-primary rounded-lg text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-primary rounded-lg text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-primary rounded-xl text-white flex
          justify-center items-center"&gt;&lt;i class="icon
          icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 bg-light border border-border-color
          rounded-xs text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 bg-light border border-border-color
          rounded-sm text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 bg-light border border-border-color
          rounded-md text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 bg-light border border-border-color
          rounded-lg text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 bg-light border border-border-color
          rounded-lg text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 bg-light border border-border-color
          rounded-xl text-dark flex justify-center items-center"&gt;&lt;i
          class="icon icon-user"&gt;&lt;/i&gt; &lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Circular Avatar Group</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(7)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content ${showCode[7]?'hidden':''}`}>
        <div className="flex flex-wrap lg:justify-between! justify-center gap-10 items-end border-dashed border-primary border px-4.5 py-5 rounded-md">
          <div className="avatar-list-stacked">
            <ImageWithBasePath
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_27}
              alt="img"
            />
            <ImageWithBasePath
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_28}
              alt="img"
            />
            <ImageWithBasePath
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_29}
              alt="img"
            />
            <Link
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
              to="#"
            >
              {" "}
              +8{" "}
            </Link>
          </div>
          <div className="avatar-list-stacked">
            <ImageWithBasePath
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_01}
              alt="img"
            />
            <ImageWithBasePath
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_02}
              alt="img"
            />
            <ImageWithBasePath
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_03}
              alt="img"
            />
            <Link
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[13px] bg-light text-dark"
              to="#"
            >
              {" "}
              +8{" "}
            </Link>
          </div>
          <div className="avatar-list-stacked pr-4.5">
            <ImageWithBasePath
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_04}
              alt="img"
            />
            <ImageWithBasePath
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_05}
              alt="img"
            />
            <ImageWithBasePath
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
              src={Images.avatar_06}
              alt="img"
            />
            <Link
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[14px] bg-light text-dark"
              to="#"
            >
              {" "}
              +8{" "}
            </Link>
          </div>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[7] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap lg:justify-between! justify-center
          gap-10 items-end border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="avatar-list-stacked"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_27} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_28} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_29} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;a class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color text-[12px] bg-light
          text-dark" to="#"&gt; +8 &lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="avatar-list-stacked"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_01} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_02} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_03} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;a class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color text-[13px] bg-light
          text-dark" to="#"&gt; +8 &lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="avatar-list-stacked pr-4.5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_04} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_05} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;img class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color"
          src={Images.avatar_06} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}&lt;a class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1
          transition-transform duration-150 ease-in-out -me-3.5 align-middle
          rounded-full border border-border-color text-[14px] bg-light
          text-dark" to="#"&gt; +8 &lt;/a&gt;{"\n"}
          {"\t"}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Square Avatar Group</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(8)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content ${showCode[8]?'hidden':''}`}>
        <div className="flex flex-wrap lg:justify-between! justify-center gap-10 items-end border-dashed border-primary border px-4.5 py-5 rounded-md">
          <div className="avatar-list-stacked">
            <ImageWithBasePath
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-md border border-border-color"
              src={Images.avatar_06}
              alt="img"
            />
            <ImageWithBasePath
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-md border border-border-color"
              src={Images.avatar_07}
              alt="img"
            />
            <ImageWithBasePath
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-md border border-border-color"
              src={Images.avatar_08}
              alt="img"
            />
            <Link
              className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-md border border-border-color text-[12px] bg-light text-dark"
              to="#"
            >
              {" "}
              +8{" "}
            </Link>
          </div>
          <div className="avatar-list-stacked">
            <ImageWithBasePath
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color"
              src={Images.avatar_09}
              alt="img"
            />
            <ImageWithBasePath
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color"
              src={Images.avatar_10}
              alt="img"
            />
            <ImageWithBasePath
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color"
              src={Images.avatar_11}
              alt="img"
            />
            <Link
              className="w-8 h-8 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color text-[13px] bg-light text-dark"
              to="#"
            >
              {" "}
              +8{" "}
            </Link>
          </div>
          <div className="avatar-list-stacked pr-4.5">
            <ImageWithBasePath
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color"
              src={Images.avatar_12}
              alt="img"
            />
            <ImageWithBasePath
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color"
              src={Images.avatar_13}
              alt="img"
            />
            <ImageWithBasePath
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color"
              src={Images.avatar_14}
              alt="img"
            />
            <Link
              className="w-10 h-10 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5  align-middle rounded-lg border border-border-color text-[14px] bg-light text-dark"
              to="#"
            >
              {" "}
              +8{" "}
            </Link>
          </div>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[8] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap lg:justify-between! justify-center
          gap-10 items-end border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="avatar-list-stacked"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-md border border-border-color"
          src={Images.avatar_06} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-md border border-border-color"
          src={Images.avatar_07} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-md border border-border-color"
          src={Images.avatar_08} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="w-6 h-6 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-md border border-border-color text-[12px]
          bg-light text-dark" to="#"&gt; +8 &lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="avatar-list-stacked"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color"
          src={Images.avatar_09} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color"
          src={Images.avatar_10} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color"
          src={Images.avatar_11} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="w-8 h-8 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color text-[13px]
          bg-light text-dark" to="#"&gt; +8 &lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;div class="avatar-list-stacked pr-4.5"&gt;{"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color"
          src={Images.avatar_12} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color"
          src={Images.avatar_13} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;img class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color"
          src={Images.avatar_14} alt="img"&gt; {"\n"}
          {"\t"}
          {"\t"}
          {"\t"}&lt;a class="w-10 h-10 inline-flex items-center justify-center
          font-medium hover:-translate-y-[0.188rem] hover:z-1{"  "}
          transition-transform duration-150 ease-in-out -me-3.5{"  "}
          align-middle rounded-lg border border-border-color text-[14px]
          bg-light text-dark" to="#"&gt; +8 &lt;/a&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;/div&gt; {"\n"}
          {"\t"}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Circular Avatars with Dot</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(9)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content border-dashed border-primary border px-4.5 py-5 rounded-md ${showCode[9]?'hidden':''}`}>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3 lg:mb-12 mb-5">
          <span className="w-4 h-4 relative bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="-bottom-0.5 -end-0.5 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="w-5 h-5 relative bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="w-6 h-6 relative bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="w-8 h-8 relative bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="w-10 h-10 relative bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0.5 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="w-11 h-11 relative bg-light border border-border-color rounded-full text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-1.5 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
        </div>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3">
          <span className="relative">
            <ImageWithBasePath
              className="w-4 h-4 border border-border-color rounded-full"
              src={Images.avatar_15}
              alt="avatar"
            />
            <span className="bottom-0 -end-0.5 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-5 h-5 border border-border-color rounded-full"
              src={Images.avatar_16}
              alt="avatar"
            />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-6 h-6 border border-border-color rounded-full"
              src={Images.avatar_17}
              alt="avatar"
            />
            <span className="bottom-0 end-0.5 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-8 h-8 border border-border-color rounded-full"
              src={Images.avatar_18}
              alt="avatar"
            />
            <span className="bottom-0 end-0.5 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-10 h-10 border border-border-color rounded-full"
              src={Images.avatar_19}
              alt="avatar"
            />
            <span className="bottom-0 end-1.5 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-12 h-12 border border-border-color rounded-full"
              src={Images.avatar_20}
              alt="avatar"
            />
            <span className="bottom-0 end-1.75 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[9] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3 lg:mb-12 mb-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 relative bg-light border
          border-border-color rounded-full text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="-bottom-0.5 -end-0.5 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 relative bg-light border
          border-border-color rounded-full text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 relative bg-light border
          border-border-color rounded-full text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 relative bg-light border
          border-border-color rounded-full text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 relative bg-light border
          border-border-color rounded-full text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0.5 end-0.5 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 relative bg-light border
          border-border-color rounded-full text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-1.5 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-4 h-4 border
          border-border-color rounded-full"
          src={Images.avatar_15} alt="avatar"&gt;&lt;span
          class="bottom-0 -end-0.5 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-5 h-5 border
          border-border-color rounded-full"
          src={Images.avatar_16} alt="avatar"&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-6 h-6 border
          border-border-color rounded-full"
          src={Images.avatar_17} alt="avatar"&gt;&lt;span
          class="bottom-0 end-0.5 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-8 h-8 border
          border-border-color rounded-full"
          src={Images.avatar_18} alt="avatar"&gt;&lt;span
          class="bottom-0 end-0.5 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-10 h-10 border
          border-border-color rounded-full"
          src={Images.avatar_19} alt="avatar"&gt;&lt;span
          class="bottom-0 end-1.5 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-12 h-12 border
          border-border-color rounded-full"
          src={Images.avatar_20} alt="avatar"&gt;&lt;span
          class="bottom-0 end-1.75 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Square Avatars with Dot</h5>
        <button
          type="button"
          data-toggle="code"
          onClick={() => handleShowCode(10)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content border-dashed border-primary border px-4.5 py-5 rounded-md ${showCode[10]?'hidden':''}`}>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3 lg:mb-12 mb-5">
          <span className="w-4 h-4 relative bg-light border border-border-color rounded-xs text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="w-5 h-5 relative bg-light border border-border-color rounded-sm text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="w-6 h-6 relative bg-light border border-border-color rounded-md text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="w-8 h-8 relative bg-light border border-border-color rounded-lg text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="w-10 h-10 relative bg-light border border-border-color rounded-lg text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="w-11 h-11 relative bg-light border border-border-color rounded-xl text-dark flex justify-center items-center">
            <i className="icon icon-user" />
            <span className="bottom-0 end-0 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
        </div>
        <div className="flex flex-wrap items-end lg:justify-between justify-start gap-3">
          <span className="relative">
            <ImageWithBasePath
              className="w-4 h-4 border border-border-color rounded-xs"
              src={Images.avatar_21}
              alt="avatar"
            />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-5 h-5 border border-border-color rounded-sm"
              src={Images.avatar_22}
              alt="avatar"
            />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-6 h-6 border border-border-color rounded-md"
              src={Images.avatar_23}
              alt="avatar"
            />
            <span className="bottom-0 end-0 absolute  size-1.5 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-8 h-8 border border-border-color rounded-lg"
              src={Images.avatar_24}
              alt="avatar"
            />
            <span className="bottom-0 end-0 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-10 h-10 border border-border-color rounded-lg"
              src={Images.avatar_25}
              alt="avatar"
            />
            <span className="bottom-0 end-0 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
          <span className="relative">
            <ImageWithBasePath
              className="w-12 h-12 border border-border-color rounded-xl"
              src={Images.avatar_26}
              alt="avatar"
            />
            <span className="bottom-0 end-0 absolute  size-2 bg-success border border-white rounded-full" />
          </span>
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden ${showCode[10] ? '' : 'hidden'}`}>
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[450px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="border-dashed border-primary border px-4.5 py-5
          rounded-md"&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3 lg:mb-12 mb-5"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-4 h-4 relative bg-light border
          border-border-color rounded-xs text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-5 h-5 relative bg-light border
          border-border-color rounded-sm text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-6 h-6 relative bg-light border
          border-border-color rounded-md text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-1.5 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-8 h-8 relative bg-light border
          border-border-color rounded-lg text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-10 h-10 relative bg-light border
          border-border-color rounded-lg text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="w-11 h-11 relative bg-light border
          border-border-color rounded-xl text-dark flex justify-center
          items-center"&gt;&lt;i class="icon icon-user"&gt;&lt;/i&gt;&lt;span
          class="bottom-0 end-0 absolute{"  "}size-2 bg-success border
          border-white rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"\n"}
          {"\t"}&lt;div class="flex flex-wrap items-end lg:justify-between
          justify-start gap-3"&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-4 h-4 border
          border-border-color rounded-xs" src={Images.avatar_21}
          alt="avatar"&gt;&lt;span class="bottom-0 end-0 absolute{"  "}size-1.5
          bg-success border border-white
          rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-5 h-5 border
          border-border-color rounded-sm" src={Images.avatar_22}
          alt="avatar"&gt;&lt;span class="bottom-0 end-0 absolute{"  "}size-1.5
          bg-success border border-white
          rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-6 h-6 border
          border-border-color rounded-md" src={Images.avatar_23}
          alt="avatar"&gt;&lt;span class="bottom-0 end-0 absolute{"  "}size-1.5
          bg-success border border-white
          rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-8 h-8 border
          border-border-color rounded-lg" src={Images.avatar_24}
          alt="avatar"&gt;&lt;span class="bottom-0 end-0 absolute{"  "}size-2
          bg-success border border-white
          rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-10 h-10 border
          border-border-color rounded-lg" src={Images.avatar_25}
          alt="avatar"&gt;&lt;span class="bottom-0 end-0 absolute{"  "}size-2
          bg-success border border-white
          rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}
          {"\t"}&lt;span class="relative"&gt;&lt;img class="w-12 h-12 border
          border-border-color rounded-xl" src={Images.avatar_26}
          alt="avatar"&gt;&lt;span class="bottom-0 end-0 absolute{"  "}size-2
          bg-success border border-white
          rounded-full"&gt;&lt;/span&gt;&lt;/span&gt;{"\n"}
          {"\t"}&lt;/div&gt;{"  "}
          {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end card */}
  </div>
  {/* End grid */}
</div>

  )
}

export default UiAvatar