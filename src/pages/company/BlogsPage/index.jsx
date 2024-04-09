// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import Typewriter from "typewriter-effect";
import {
  MdArrowRightAlt,
  MdLens,
  MdOutlineLens,
  MdOutlineLuggage,
  MdOutlineModeOfTravel,
  MdOutlineSearch,
} from "react-icons/md";
import { AiFillPhone, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../components/ui/Footer";
import { Helmet } from "react-helmet";

// Images
import circleAsset from "../../../assets/images/circle-asset.svg";
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import paypal from "../../../assets/logos/paypal.svg";
import stripe from "../../../assets/logos/stripe.svg";
import flutterwave from "../../../assets/logos/flutterwave.png";
import aboutsvg from "../../../assets/images/aboutsvg.svg";
import {
  BiLogoGmail,
  BiLogoWhatsapp,
  BiMenu,
  BiSolidArrowFromTop,
  BiSolidPhone,
} from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogPosts } from "../../../redux/slices/userSlice";
import TimeAgo from "timeago-react";
import { ImSpinner2 } from "react-icons/im";

// Images
import emptyImage from "../../../assets/images/empty.png";
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function BlogsPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);

  // Search states
  const [searchValue, setSearchValue] = useState();

  const { isLoading, blogPosts } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBlogPosts());
  }, []);

  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Blogs | Shuttlelane</title>
      </Helmet>

      {/* FLOATING MENU */}
      {isMenuHidden && (
        <Fade duration={300}>
          <div
            onMouseOver={() => setIsMenuHidden(true)}
            onMouseOut={() => setIsMenuHidden(false)}
            className="fixed flex p-5 justify-center items-center z-[80] bottom-7 right-7 h-auto lg:w-[25%] md:w-[50%] w-[70%]"
          >
            <div
              onMouseOver={() => setIsMenuHidden(true)}
              onMouseOut={() => setIsMenuHidden(false)}
              className="bg-white shadow-lg rounded-lg h-full w-full py-5"
            >
              <h2 className="text-xl font-medium px-5 mb-4 text-shuttlelanePurple">
                Company
              </h2>
              <ul className="text-xs flex flex-col gap-y-1">
                <li className="py-3 px-5 text-shuttlelaneBlack">
                  <Link
                    to="/company/about-shuttlelane"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    About Shuttlelane
                  </Link>
                </li>
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/company/who-we-are"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
                  >
                    Who We Are
                  </Link>
                </li>

                <li className="py-3 px-5">
                  <Link
                    to="/company/partnership"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Become a Partner
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/contact-us"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Get In Touch
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
      )}

      {/* FLOATING MENU ICON */}
      <div
        onMouseOver={() => setIsMenuHidden(true)}
        onMouseOut={() => setIsMenuHidden(false)}
        onClick={() => setIsMenuHidden(!isMenuHidden)}
        className="fixed shadow-lg cursor-pointer hover:animate-spin-slow flex justify-center items-center z-[85] bottom-10 right-10 bg-shuttlelaneGold h-14 w-14 rounded-full"
      >
        <BiMenu
          size={28}
          className={`text-white transition-all ${
            isMenuHidden ? "hidden" : "inline-block"
          }`}
        />

        <AiOutlineClose
          size={28}
          className={`text-white transition-all ${
            !isMenuHidden ? "hidden" : "inline-block"
          }`}
        />
      </div>

      {/* Floating whatsapp icon */}
      <WhatsappIcon pageHasFloatingIcon={true} />

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* Our Blog */}
      <div
        className="px-8 relative bg-white lg:px-24 py-24 pt-44 h-[30vh] flex items-center justify-center"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <h1 className="text-3xl lg:text-6xl text-center font-bold mt-3 leading-[39px]">
                  Our Blog
                </h1>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <p className="text-lg font-normal">
                    Explore our latest articles designed to meet your various
                    needs throughout the Shuttlelane website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More About Shuttlelane */}
      <div className="p-7 lg:px-24 py-10" ref={moreAboutUsRef}>
        {/* <Fade direction="up" duration={500}> */}
        <div className="w-full flex flex-row justify-center">
          <div className="h-14 w-full lg:w-[35%] border-gray-300 border-[.5px] rounded-full p-4 flex flex-row items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[85%] bg-transparent border-none focus:border-none focus:outline-none"
            />
            <MdOutlineSearch size={21} className="text-gray-400 w-[15%]" />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <div className="mt-5 flex items-center flex-col md:flex-row flex-wrap gap-5">
            {blogPosts?.map((blogPost) => (
              <Link
                to={`/company/blog/posts/${blogPost?.slug}`}
                className="h-[270px] no-underline hover:no-underline visited:no-underline focus:no-underline text-gray-400 hover:text-gray-400 visited:text-gray-400 focus:text-gray-400 w-full lg:w-1/4 border-[.5px] border-gray-200 shadow-lg allRoundBoxShadow overflow-hidden rounded-lg"
              >
                <Fade duration={500}>
                  <div className="w-full h-[150px]">
                    <img
                      src={blogPost?.image}
                      alt={`${blogPost?.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-[120px] px-4 py-4 flex flex-col">
                    <h3 className="text-lg font-semibold text-shuttlelaneBlack">
                      {blogPost?.title}
                    </h3>
                    <span className="text-sm text-gray-400 mt-2">
                      by{" "}
                      <span className="text-sm font-semibold text-gray-400">
                        {blogPost?.author?.firstName}{" "}
                        {blogPost?.author?.lastName}
                      </span>
                    </span>

                    <i className="text-sm text-gray-400">
                      Posted{" "}
                      <TimeAgo
                        datetime={`${blogPost?.createdAt}`}
                        locale="en-US"
                        className="text-sm"
                      />
                    </i>
                  </div>
                </Fade>
              </Link>
            ))}
            {isLoading && (
              <ImSpinner2
                size={24}
                className="text-shuttlelanePurple animate-spin"
              />
            )}
            {blogPosts?.length < 1 && (
              <div className="w-full flex flex-col items-center justify-center">
                <img
                  src={emptyImage}
                  className="max-w-lg object-contain"
                  alt="Sorry, there are no blog posts for now."
                />
                <p className="text-sm">
                  Sorry, there are no blog posts for now.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* </Fade> */}
      </div>

      {/* How To Reach Us */}
      <HowToReachUs />
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default BlogsPage;
