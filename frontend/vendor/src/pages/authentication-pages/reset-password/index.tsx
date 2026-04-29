import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const ResetPassword = () => {
  return (
    <div className="w-full relative h-screen bg-white">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 p-3 h-full">
    <div className="xl:col-span-5 h-full hidden xl:block">
      <div className="bg-[image:var(--background-image-linear-gradient-600)] hidden md:flex relative h-full rounded-2xl overflow-hidden bg-no-repeat bg-contain bg-left items-center justify-center">
        <div className="curve-shape-one w-[76px] h-[76px] z-10 rounded-full bg-white absolute top-[-30px] right-[-35px]" />
        <div className="curve-shape-two w-[76px] h-[76px] rounded-full bg-white absolute bottom-[-30px] left-[-35px]" />
        <ImageWithBasePath
          src={Images.glowing_shape}
          className="absolute z-5 w-[340px] max-xl:top-[195px] top-[205px] left-1/2 -translate-x-1/2 -translate-y-1/2"
          alt="login"
        />
        <ImageWithBasePath
          src={Images.ai_hand}
          className="absolute z-4 bottom-[96px] right-0 w-[70%] w-auto"
          alt=""
        />
        <ImageWithBasePath
          src={Images.fade_shape}
          className="absolute z-0 bottom-[96px] right-0 w-full w-auto"
          alt=""
        />
        <p className="absolute italic block text-[24px] z-10 bottom-6 left-6 right-6 text-center text-white text-sm leading-relaxed z-10">
          One intelligent dashboard to command,{" "}
          <span className="block">track, and optimize your AI agents</span>
        </p>
      </div>
    </div>
    <div className="xl:col-span-7 col-span-12 h-full xl:p-0 p-[40px] flex items-center justify-center">
      <div className="flex flex-col justify-between items-center">
        <Link to={Path.dashboard} className="mb-3">
          <ImageWithBasePath src={Images.logo} alt="logo" />
        </Link>
        <div className="xl:p-[40px] p-0 xl:w-[448px] w-full">
          <form>
            <h4 className="mb-2 text-center">Reset Password</h4>
            <p className="mb-5 text-center">
              Create a new password for your account.
            </p>
            <div className="relative mb-5">
              <input
                id="password"
                type="password"
                placeholder=" "
                className="peer has-value-trigger form-input bg-white pe-10 w-full border-border-color rounded-lg sm:text-sm focus:border-primary focus:ring-primary"
                data-float-label=""
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white px-1 text-sm transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-focus peer-[.has-value]:top-0 peer-[.has-value]:text-xs"
              >
                New Password
              </label>
              <button
                type="button"
                data-hs-toggle-password='{ "target": "#password" }'
                className="absolute inset-y-0 end-0 flex items-center z-20 px-3"
              >
                <i className="icon icon-eye hidden hs-password-active:block" />
                <i className="icon icon-eye-off hs-password-active:hidden" />
              </button>
            </div>
            <div className="relative mb-6">
              <input
                id="confirm-password"
                type="password"
                placeholder=" "
                className="peer has-value-trigger form-input bg-white pe-10 w-full border-border-color rounded-lg sm:text-sm focus:border-primary focus:ring-primary"
                data-float-label=""
              />
              <label
                htmlFor="confirm-password"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white px-1 text-sm transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-focus peer-[.has-value]:top-0 peer-[.has-value]:text-xs"
              >
                Confirm Password
              </label>
              <button
                type="button"
                data-hs-toggle-password='{ "target": "#confirm-password" }'
                className="absolute inset-y-0 end-0 flex items-center z-20 px-3"
              >
                <i className="icon icon-eye hidden hs-password-active:block" />
                <i className="icon icon-eye-off hs-password-active:hidden" />
              </button>
            </div>
            <Link
              to={Path.login}
              className="py-2.5 px-3.5 text-[16px] mb-5 font-semibold w-full inline-flex items-center justify-center gap-x-2 bg-primary-gradient text-white hover:opacity-90 rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ResetPassword;
