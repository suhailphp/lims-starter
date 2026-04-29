import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const ForgotPassword = () => {
  return (
    <>
  <div className="w-full relative h-screen bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 p-3 h-full">
      <div className="xl:col-span-5 h-full hidden xl:block">
        <div className="bg-[image:var(--background-image-linear-gradient-600)] hidden md:flex relative h-full rounded-2xl overflow-hidden bg-no-repeat bg-contain bg-left items-center justify-center">
          <div className="curve-shape-one w-[76px] h-[76px] z-10 rounded-full bg-white absolute top-[-30px] right-[-35px]" />
          <div className="curve-shape-two w-[76px] h-[76px] rounded-full bg-white absolute bottom-[-30px] left-[-35px]" />
          {/* Glowing Shape */}
          <ImageWithBasePath
            src={Images.glowing_shape}
            className="absolute z-5 w-[340px] max-xl:top-[195px] top-[205px] left-1/2 -translate-x-1/2 -translate-y-1/2"
            alt="login"
          />
          {/* AI Hand */}
          <ImageWithBasePath
            src={Images.ai_hand}
            className="absolute z-4 bottom-[96px] right-0 w-[70%] w-auto"
            alt=""
          />
          {/* AI Hand */}
          <ImageWithBasePath
            src={Images.fade_shape}
            className="absolute z-0 bottom-[96px] right-0 w-full w-auto"
            alt=""
          />
          {/* Text */}
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
              <h4 className="mb-2 text-center">Forgot Password?</h4>
              <p className="mb-5 text-center">
                Enter your email to receive a secure reset link.
              </p>
              <div className="relative mb-5">
                <input
                  type="email"
                  id="hs-floating-input-email"
                  placeholder=" "
                  className="peer block form-input bg-white pe-10 block w-full border-border-color rounded-lg sm:text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none text-foreground"
                  data-float-label=""
                />
                <label
                  htmlFor="hs-floating-input-email"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white px-1 text-xs transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-focus peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-[.has-value]:top-0 peer-[.has-value]:text-xs"
                >
                  Email
                </label>
                <span className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                  <i className="icon icon-mail" />
                </span>
              </div>
              <Link
                to={Path.twoStepVerification}
                className="py-2.5 px-3.5 text-[16px] mb-5 font-semibold w-full inline-flex items-center justify-center gap-x-2 bg-primary-gradient text-white hover:opacity-90 rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Send Reset Link
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>{" "}
  {/* end card */}
</>

  );
};

export default ForgotPassword;
