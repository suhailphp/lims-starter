

import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../../components/image-with-base-path'
import { Images } from '../../../utils/imagePath'
import { Path } from '../../../routes/path'

const ComingSoon = () => {
  return (
    <div className="relative w-full min-h-dvh p-[30px] bg-primary-50 overflow-hidden flex flex-col gap-6 justify-center items-center">
  <Link to={Path.dashboard}>
    <ImageWithBasePath className="w-[242px]" src={Images.logo} alt="logo" />
  </Link>
  <h2 className="text-center">Your AI Agents Are Almost Ready</h2>
  <div className="relative ">
    <img
      className="w-[323px]"
      src={Images.coming_soon}
      alt="maintenance"
    />
  </div>
  <div className="flex flex-col items-center justify-center text-center">
    <p className="mb-5">
      We’re almost ready to help you automate, analyze, and optimize.{" "}
    </p>
    <div className="mb-4 flex items-center max-sm:flex-col gap-2">
      <div className="relative">
        <input
          id="hs-toggle-password"
          type="password"
          className="form-input form-input-icon leading-0 bg-light pe-10 ps-8.5 block w-full border-border-color rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Enter your email"
          defaultValue=""
        />
        <span className="absolute start-0 top-1.5 ms-3">
          <i className="icon icon-mail" />
        </span>
      </div>
      <Link
        to="#"
        className="btn inline-flex items-center justify-center gap-x-2 bg-dark text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none max-sm:w-full"
      >
        Notify Me
      </Link>
    </div>
    <p className="text-dark mb-4">Notify me when it’s ready</p>
    <div className="p-0 flex items-center gap-3 mt-6">
      <Link
        to="#"
        className="list-none w-[40px] h-[40px] m-0 rounded-full border border-border-color bg-gray-50 text-dark hover:bg-primary-gradient flex justify-center items-center shrink-0 hover:text-white text-[20px] p-2"
      >
        <i className="icon-facebook" />
      </Link>
      <Link
        to="#"
        className="list-none w-[40px] h-[40px] m-0 rounded-full border border-border-color bg-gray-50 text-dark hover:bg-primary-gradient flex justify-center items-center shrink-0 hover:text-white text-[20px] p-2"
      >
        <i className="icon-youtube" />
      </Link>
      <Link
        to="#"
        className="list-none w-[40px] h-[40px] m-0 rounded-full border border-border-color bg-gray-50 text-dark hover:bg-primary-gradient flex justify-center items-center shrink-0 hover:text-white text-[20px] p-2"
      >
        <i className="icon-dribbble" />
      </Link>
      <Link
        to="#"
        className="list-none w-[40px] h-[40px] m-0 rounded-full border border-border-color bg-gray-50 text-dark hover:bg-primary-gradient flex justify-center items-center shrink-0 hover:text-white text-[20px] p-2"
      >
        <i className="icon-instagram" />
      </Link>
    </div>
  </div>
</div>

  )
}

export default ComingSoon