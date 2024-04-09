// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../../components/ui/NavBar";
import { MdOutlineSearch } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../../components/ui/Footer";
import { BiMenu } from "react-icons/bi";
import PaymentPartners from "../../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../../components/ui/HowToReachUs";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "timeago-react";
import { ImSpinner2 } from "react-icons/im";
import { fetchBlogPost } from "../../../../redux/slices/userSlice";
import { Helmet } from "react-helmet";

// Images
import emptyImage from "../../../../assets/images/empty.png";
import HTMLRenderer from "../../../../components/functionality/HTMLRenderer";
import WhatsappIcon from "../../../../components/ui/WhatsappIcon";

function PostPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);

  // Search states
  const [searchValue, setSearchValue] = useState();

  const { isLoading, blogPosts, currentBlogPost } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchBlogPost(slug));
  }, [slug]);

  return (
    <div className="relative bg-white">
      <Helmet>
        <title>{currentBlogPost?.title} | Shuttlelane Blog</title>
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
      {isMenuHidden === true && <WhatsappIcon pageHasFloatingIcon={true} />}

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* Our Blog */}
      {/* <div
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
      </div> */}

      {/* Post Content */}
      <div className="p-7 lg:px-24 py-10 flex lg:flex-row flex-col gap-y-10 gap-x-5 pt-24">
        <div className="w-full lg:w-[70%]" ref={moreAboutUsRef}>
          <div className="mt-10">
            <i className="text-sm text-slate-400">
              by {currentBlogPost?.author?.firstName}{" "}
              {currentBlogPost?.author?.lastName},{" "}
              <TimeAgo
                datetime={`${currentBlogPost?.createdAt}`}
                locale="en-US"
                className="text-sm"
              />
            </i>
            <h2 className="text-4xl font-bold">{currentBlogPost?.title}</h2>
            <img
              src={`${currentBlogPost?.image}`}
              alt={`${currentBlogPost?.title}`}
              className="h-[350px] w-full rounded-md object-cover mt-3"
            />
            <div className="mt-5 flex items-center flex-col md:flex-row flex-wrap gap-5">
              {currentBlogPost && (
                <>
                  <HTMLRenderer htmlString={currentBlogPost?.content} />
                </>
              )}
              {isLoading && (
                <ImSpinner2
                  size={24}
                  className="text-shuttlelanePurple animate-spin"
                />
              )}
              {!currentBlogPost && (
                <div className="w-full flex flex-col items-center justify-center">
                  <img
                    src={emptyImage}
                    className="max-w-lg object-contain"
                    alt="Sorry, there are no blog posts for now."
                  />
                  <p className="text-sm">
                    Sorry, this blog post has either been deleted or does not
                    exist.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* </Fade> */}
        </div>
        <div
          className="w-full lg:w-[30%] lg:px-7 lg:border-l-[.5px] lg:border-l-gray-100"
          ref={moreAboutUsRef}
        >
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Other Posts</h2>
            <div className="mt-5 flex items-center flex-col md:flex-row flex-wrap gap-5">
              {blogPosts?.map((blogPost) => {
                if (!blogPost?.slug === slug) {
                  return (
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
                  );
                } else if (blogPosts?.length === 1 && blogPost?.slug === slug) {
                  return (
                    <div className="w-full flex flex-col items-center justify-center">
                      <img
                        src={emptyImage}
                        className="w-[80px] object-contain"
                        alt="Sorry, there are no blog posts for now."
                      />
                      <p className="text-sm">
                        Sorry, there are no blog posts for now.
                      </p>
                    </div>
                  );
                }
              })}
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
      </div>

      {/* How To Reach Us */}
      <HowToReachUs />
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default PostPage;
