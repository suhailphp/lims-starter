
import { Images } from '../../../utils/imagePath'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../../components/image-with-base-path'
import { Path } from '../../../routes/path'

const UnderMaintenance = () => {
  return (
    <div className="relative w-full min-h-dvh p-[30px] bg-primary-50 overflow-hidden flex flex-col justify-center items-center">
  <Link to={Path.dashboard}>
    <ImageWithBasePath className="w-[242px]" src={Images.logo} alt="logo" />
  </Link>
  <div className="relative ">
    <ImageWithBasePath
      className="w-[650px]"
      src={Images.robot_group}
      alt="maintenance"
    />
  </div>
  <div className="flex flex-col items-center justify-center text-center">
    <h2 className="mb-1">Our AI Agent Is Getting Smarter</h2>
    <p className="mb-5">
      We’re upgrading intelligence models and optimizing performance.{" "}
      <br className="lg:block hidden" /> The dashboard will be back shortly.{" "}
    </p>
    <Link
      to={Path.dashboard}
      className="btn bg-primary-gradient hover:bg-gray-800 text-white"
    >
      Back to Dashboard
    </Link>
  </div>
</div>

  )
}

export default UnderMaintenance