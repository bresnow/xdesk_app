import { StaticImage } from '../routes/index';
const LandingStats = () => {
  return (
    // < !--Container for demo purpose-- >
    <div className="container my-24 px-6 mx-auto">
      <style>
       {` @media (min-width: 992px) {
        .rotate - lg - 6 {
          transform: rotate(6deg);
        }
      }
        .fancy-border-radius {
          border - radius: 53% 47% 52% 48% / 36% 41% 59% 64%;
      }`}
      </style>
      {/* <!-- Section: Design Block --> */}
      <section className="mb-32 text-gray-800 text-center lg:text-left">

        {/* <!-- Jumbotron --> */}
        <div className="container mx-auto xl:px-32 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 flex items-center">
            <div className="mb-12 lg:mb-0">
              <div
                className="relative block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)', zIndex: "1"}}
              >
                <h2 className="text-3xl font-bold mb-4 display-5">Why is it so great?</h2>
                <p className="text-gray-500 mb-12">
                  Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis
                  malesuada. Aenean gravida magna orci, non efficitur est porta id. Donec magna
                  diam.
                </p>

                <div className="grid md:grid-cols-3 gap-x-6">
                  <div className="mb-12 md:mb-0">
                    <h2 className="text-3xl font-bold text-dark mb-4">Utility</h2>
                    <h5 className="text-lg font-medium text-gray-500 mb-0">Less sugar</h5>
                  </div>

                  <div className="mb-12 md:mb-0">
                    <h2 className="text-3xl font-bold text-dark mb-4">Security</h2>
                    <h5 className="text-lg font-medium text-gray-500 mb-0"></h5>
                  </div>

                  <div className="">
                    <h2 className="text-3xl font-bold text-dark mb-4">Ownership</h2>
                    <h5 className="text-lg font-medium text-gray-500 mb-0"></h5>
                  </div>
                </div>
              </div>
            </div>

            <div className={' '}>
              <StaticImage
                style={{
                  borderRadius: '53% 47% 52% 48% / 36% 41% 59% 64%',
                  transform: 'rotate(6deg)'
                }}
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/088.jpg"
                className="w-full shadow-lg rounded-t-md  rounded-b-2xl"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* <!-- Jumbotron --> */}
      </section>
      {/* <!-- Section: Design Block --> */}

    </div>
    // <!--Container for demo purpose-- >
  )
}
export default LandingStats