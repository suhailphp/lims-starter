
import ImageWithBasePath from '../../../components/image-with-base-path'
import { Images } from '../../../utils/imagePath'
import { Link } from 'react-router-dom'
import { Path } from '../../../routes/path'

const Error500 = () => {
  return (
    <>
  <div className="relative w-full min-h-dvh xl:p-0 p-[50px] bg-primary-50 overflow-hidden flex flex-col justify-center items-center">
    <Link to={Path.dashboard}>
      <ImageWithBasePath className="w-[242px]" src={Images.logo} />
    </Link>
    <div className="relative mb-[70px] mt-[70px]">
      <ImageWithBasePath
        className="w-[400px]"
        src={Images.error_500}
        alt="maintenance"
      />
    </div>
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="mb-1">Our AI Hit a Temporary Issue</h2>
      <p className="mb-5">
        An unexpected error occurred on our side. Our systems are already <br />{" "}
        working on it.
      </p>
      <Link to={Path.dashboard} className="btn bg-dark hover:bg-gray-800 text-white">
        Back to Dashboard
      </Link>
    </div>
  </div>{" "}
  {/* end card */}
</>

  )
}

export default Error500