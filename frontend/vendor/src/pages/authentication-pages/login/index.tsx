import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { useState } from "react";

const Login = () => {
  const [value, setValue] = useState("");
  return (
    <>
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
              alt="login"
            />
            <ImageWithBasePath
              src={Images.fade_shape}
              className="absolute z-0 bottom-[96px] right-0 w-full w-auto"
              alt="login"
            />
            <p className="absolute italic block text-[24px] z-10 bottom-6 left-6 right-6 text-center text-white text-sm leading-relaxed z-10">
              One intelligent dashboard to command,{" "}
              <span className="block">track, and optimize your AI agents</span>
            </p>
          </div>
        </div>
        <div className="xl:col-span-7 col-span-12 h-full xl:p-0 p-[40px] flex items-center justify-center">
          <div className="flex flex-col justify-between items-center  py-3">
            <Link to={Path.dashboard} className="mb-3">
              <ImageWithBasePath src={Images.logo} alt="logo" />
            </Link>
            <div className="xl:p-[40px] xl:w-[448px] w-full">
              <form>
                <h4 className="mb-2 text-center">Welcome Back</h4>
                <p className="mb-5 text-center">
                  Sign in to your AI Control Center
                </p>
                <div className="relative mb-5">
                  <input
                    type="email"
                    id="hs-floating-input-email"
                    placeholder=" "
                    className="peer block form-input auth-input-bg  pe-10 w-full border-border-color rounded-lg sm:text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none text-foreground"
                    data-float-label=""
                  />
                  <label
                    htmlFor="hs-floating-input-email"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white! px-1 text-xs transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-focus peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-[.has-value]:top-0 peer-[.has-value]:text-xs"
                  >
                    Email
                  </label>
                  <span className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                    <i className="icon icon-mail" />
                  </span>
                </div>
                 <div className="relative mb-6">
      <input
        id="password"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
        className={`peer form-input pe-10 w-full border-border-color rounded-lg sm:text-sm focus:border-primary focus:ring-primary ${
          value ? "has-value" : ""
        }`}
      />

      <label
        htmlFor="password"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white px-1 text-sm transition-all duration-200
        peer-focus:top-0 peer-focus:text-xs
        peer-[.has-value]:top-0 peer-[.has-value]:text-xs"
      >
        Password
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
                <div className="lg:flex items-center justify-between mb-6 flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-dark font-medium"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to={Path.forgotPassword}
                    className="text-sm text-dark hover:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Link 
                  to={Path.dashboard}
                  className="py-2.5 px-3.5 text-[16px] mb-5 font-semibold w-full inline-flex items-center justify-center gap-x-2 bg-primary-gradient text-white hover:opacity-90 rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign In
                </Link>
                <div className="flex items-center mb-5">
                  <div className="grow h-px bg-border-color" />
                  <span className="px-4 text-xs text-dark">Or login with</span>
                  <div className="grow h-px bg-border-color" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Link
                    to="#"
                    className="btn w-full flex items-center justify-center gap-1.5 cursor-pointer bg-light border border-border-color text-dark text-center hover:bg-white hover:border-light-800 hover:text-dark"
                  >
                    <ImageWithBasePath src={Images.google} alt="" /> Google
                  </Link>
                  <Link
                    to="#"
                    className="btn w-full flex items-center justify-center gap-1.5 cursor-pointer bg-light border border-border-color text-dark text-center hover:bg-white hover:border-light-800 hover:text-dark"
                  >
                    <ImageWithBasePath
                      className="w-[20px] h-[20px]"
                      src={Images.github}
                      alt=""
                    />{" "}
                    Github
                  </Link>
                </div>
              </form>
            </div>
            <div className="text-center">
              <p>
                New here?{" "}
                <Link to={Path.register} className="text-sm text-primary">
                  Create your account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
