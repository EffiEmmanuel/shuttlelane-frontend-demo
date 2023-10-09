import { BiLogoGmail, BiLogoWhatsapp, BiSolidPhone } from "react-icons/bi";

function HowToReachUs(props) {
  return (
    <div className="px-8 lg:px-24 py-20 ">
      <div className="flex justify-center w-full text-center items-center">
        <div className="flex flex-col gap-y-5 w-full">
          <div className="flex text-shuttlelaneBlack flex-col justify-center text-center">
            <h2 className="text-3xl text-center font-semibold mt-3 leading-[39px]">
              {props?.differentHeading
                ? props?.differentHeading
                : "How To Reach Us"}
            </h2>
            <h4 className="text-sm text-center font-normal">
              Want to get in touch? You can use any of the below channels.
            </h4>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-7 w-full my-14">
            <div className="w-full lg:w-[250px] h-44 bg-white rounded-lg shadow-lg p-5 justify-center items-center flex flex-col gap-y-3">
              <BiLogoWhatsapp size={26} className="text-green-500" />
              <p>Whatsapp</p>
              <a
                href="tel:+2349030009108"
                className="text-green-500 hover:text-green-500 visited:text-green-500 hover:no-underline visited:no-underline"
              >
                +234 903 000 9108
              </a>
            </div>
            <div className="w-full lg:w-[250px] h-44 bg-white rounded-lg shadow-lg p-5 justify-center items-center flex flex-col gap-y-3">
              <BiSolidPhone size={26} className="text-blue-400" />
              <p>Call Us On</p>

              <div className="flex flex-col gap-y-1">
                <a
                  href="tel:+2349030009452"
                  className="text-blue-400 hover:text-blue-400 visited:text-blue-400 hover:no-underline visited:no-underline"
                >
                  +234 903 000 9452
                </a>
                <a
                  href="tel:+2349030009486"
                  className="text-blue-400 hover:text-blue-400 visited:text-blue-400 hover:no-underline visited:no-underline"
                >
                  +234 903 000 9486
                </a>
              </div>
            </div>
            <div className="w-full lg:w-[250px] h-44 bg-white rounded-lg shadow-lg p-5 justify-center items-center flex flex-col gap-y-3">
              <BiLogoGmail size={26} className="text-red-400" />
              <p>Send us an Email</p>
              <a
                href="mailto:info@shuttlelane.com"
                className="text-red-400 hover:text-red-400 visited:text-red-400 hover:no-underline visited:no-underline"
              >
                info@shuttlelane.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HowToReachUs;
