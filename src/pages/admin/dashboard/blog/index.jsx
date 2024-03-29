import React, { useEffect, useState } from "react";
import AdminDashboardNavbar from "../../../../components/ui/Admin/AdminDashboardNavbar";
import AdminTopBar from "../../../../components/ui/Admin/AdminTopBar";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import {
  createBlogPost,
  deleteBlogPost,
  fetchBlogPosts,
  updateBlogPost,
} from "../../../../redux/slices/adminSlice";
import Modal from "react-modal";
import { FaTrashCan, FaXmark } from "react-icons/fa6";
import { MdOutlineAddAPhoto } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Images
import empty from "../../../../assets/images/empty.png";
import { FaTrash } from "react-icons/fa";

function AdminDashboardBlogPage() {
  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const { token, admin, isLoading, currencies, ratePerMile, blogPosts } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [token]);

  // Modal states
  const [isAddNewPostModalOpen, setIsAddNewPostModalOpen] = useState(false);

  // FORM FIELDS (New Post)
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  // React Quill formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  // Handle On Image change
  const [renderImage, setRenderImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    console.log("FILE:", file);
    setImage(file);

    reader.onloadend = () => {
      setRenderImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // This function handles creating a new post
  async function handleAddNewPost(e) {
    e.preventDefault();

    if (!title || !content || !image) {
      toast.error("You must specify a city name!");
      return;
    }

    dispatch(
      createBlogPost({ token, image, title, content, author: admin?._id })
    );
  }

  // Blog post details states and handlers
  const [isPostDetailsModalOpen, setIsPostDetailsModalOpen] = useState(false);
  const [currentBlogPost, setCurrentBlogPost] = useState();
  // MODIFY VEHICLE CLASS FORM FIELDS
  const [modifiedImage, setModifiedImage] = useState();
  const [modifiedTitle, setModifiedTitle] = useState();
  const [modifiedContent, setModifiedContent] = useState();

  useEffect(() => {
    setModifiedImage(currentBlogPost?.image ?? "");
    setModifiedTitle(currentBlogPost?.title ?? "");
    setModifiedContent(currentBlogPost?.content ?? "");
  }, [currentBlogPost]);

  // This function handles updating a new post
  async function handleUpdatePost(e) {
    e.preventDefault();
    if (!modifiedImage || !modifiedTitle || !modifiedContent) {
      toast.error("Please fill in the missing fields");
      return;
    }

    dispatch(
      updateBlogPost({
        token,
        image: modifiedImage,
        title: modifiedTitle,
        content: modifiedContent,
        blogPostId: currentBlogPost?._id,
        author: currentBlogPost?.author?._id,
      })
    );
  }

  // This function handles deleting a new post
  async function handleDeletePost(e) {
    e.preventDefault();
    dispatch(
      deleteBlogPost({
        token,
        blogPostId: currentBlogPost?._id,
      })
    );
  }

  return (
    <div className="">
      {/* Add Post Modal */}
      <Modal
        isOpen={isAddNewPostModalOpen}
        onRequestClose={() => setIsAddNewPostModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7 overflow-y-scroll"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack w-full p-7 px-10 h-full overflow-y-scroll">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Create Blog Post</h4>
              <small>Make a new blog post</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsAddNewPostModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Add New Post */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <div className="w-full relative border-dashed border-[1px] border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center overflow-hidden">
                  <>
                    <MdOutlineAddAPhoto size={24} className="text-gray-300" />
                    <small className="text-gray-300 text-center">
                      Click to Insert Cover Image
                    </small>
                    <input
                      className="absolute top-0 bg-transparent w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </>

                  {renderImage && image && (
                    <div className="absolute w-full h-full top-0 flex justify-center items-center">
                      <FaXmark
                        onClick={() => {
                          setRenderImage(null);
                          setImage(null);
                        }}
                        size={16}
                        className="absolute top-3 right-3 cursor-pointer"
                      />
                      <img
                        src={renderImage}
                        alt="Uploaded"
                        className="object-cover h-full w-full z-10"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="title" className="text-sm">
                  Title
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="An Awesome Blog Post Title"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      console.log("TITLE:", e.target.value);
                      setTitle(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full flex flex-col">
                <label htmlFor="content" className="text-sm">
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  formats={formats}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  handleAddNewPost(e);
                  setIsAddNewPostModalOpen(false);
                }}
                className="mt-10 w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Publish post"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* Post Details Modal */}
      <Modal
        isOpen={isPostDetailsModalOpen}
        onRequestClose={() => setIsPostDetailsModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7 overflow-y-scroll"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack w-full p-7 px-10 h-full overflow-y-scroll">
          <div className="flex items-center justify-between gap-x-5">
            <div className="">
              <h4 className="font-semibold">{currentBlogPost?.title}</h4>
              <small>
                by {currentBlogPost?.author?.firstName}{" "}
                {currentBlogPost?.author?.firstName}, on{" "}
                {currentBlogPost?.createdAt?.split("T")[0]}
              </small>
            </div>

            <div className="flex items-center gap-x-2">
              <FaTrashCan
                size={20}
                onClick={(e) => {
                  handleDeletePost(e);
                  setIsPostDetailsModalOpen(false);
                }}
                className="cursor-pointer text-red-500"
              />

              <FaXmark
                size={20}
                onClick={() => setIsPostDetailsModalOpen(false)}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Update Post */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <div className="w-full relative border-dashed border-[1px] border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center overflow-hidden">
                  <>
                    <MdOutlineAddAPhoto size={24} className="text-gray-300" />
                    <small className="text-gray-300 text-center">
                      Click to Insert Cover Image
                    </small>
                    <input
                      className="absolute top-0 bg-transparent w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </>

                  {modifiedImage && (
                    <div className="absolute w-full h-full top-0 flex justify-center items-center">
                      <FaXmark
                        onClick={() => {
                          setModifiedImage(null);
                        }}
                        size={16}
                        className="absolute top-3 right-3 cursor-pointer"
                      />
                      <img
                        src={`${modifiedImage}`}
                        alt="Uploaded"
                        className="object-cover h-full w-full z-10"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="title" className="text-sm">
                  Title
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="An Awesome Blog Post Title"
                    name="title"
                    value={modifiedTitle}
                    onChange={(e) => {
                      console.log("TITLE:", e.target.value);
                      setModifiedTitle(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full flex flex-col">
                <label htmlFor="content" className="text-sm">
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={modifiedContent}
                  onChange={setModifiedContent}
                  formats={formats}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  handleUpdatePost(e);
                  setIsPostDetailsModalOpen(false);
                }}
                className="mt-10 w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <ToastContainer />
      {/* Navbar here */}
      <AdminDashboardNavbar
        link="blog"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <div className="">
                <div className="flex gap-x-5 flex-wrap gap-y-3 items-end pb-3 border-b-[.5px] border-b-gray-200">
                  <div className="">
                    <h2 className="font-semibold text-xl text-shuttlelaneBlack">
                      Blog Management
                    </h2>
                    <p className="text-sm">Manage blog posts on Shuttlelane</p>
                  </div>

                  {/* Add car button */}
                  <button
                    onClick={() => setIsAddNewPostModalOpen(true)}
                    className="w-auto border-dashed border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
                  >
                    <AiOutlinePlus size={16} />
                    <span className="text-xs">New Post</span>
                  </button>
                </div>
              </div>

              {isLoading && (
                <div className="flex flex-col gap-y-5 mt-5">
                  <ImSpinner2
                    size={20}
                    className="text-shuttlelanePurple animate-spin"
                  />
                </div>
              )}

              {/* BLOG POSTS TABLE */}
              {!isLoading && (
                <div className="mt-5 w-full lg:overflow-x-hidden overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                  {/* Table header */}
                  <div className="maxContent lg:max-w-full lg:min-w-full flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                    <p className="w-[200px] lg:w-[33.3%] text-xs">
                      Cover Image
                    </p>
                    <p className="w-[200px] lg:w-[33.3%] text-xs">Title</p>
                    <p className="w-[200px] lg:w-[33.3%] text-xs">Author</p>
                    <p className="w-[200px] lg:w-[33.3%] text-xs">
                      Date Posted
                    </p>
                  </div>

                  {/* Table body */}
                  {blogPosts?.map((post) => (
                    <div
                      onClick={() => {
                        setIsPostDetailsModalOpen(true);
                        setCurrentBlogPost(post);
                      }}
                      className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
                    >
                      <div
                        className={`w-[200px] lg:w-[33.3%] text-xs ${
                          isLoading && "text-gray-400"
                        }`}
                      >
                        <img
                          src={`${post?.image}`}
                          alt={`${post?.title}`}
                          className="h-[40px] max-h[40px] min-h-[40px] object-contain"
                        />
                      </div>

                      <p
                        className={`w-[200px] lg:w-[33.3%] text-xs ${
                          isLoading && "text-gray-400"
                        }`}
                      >
                        {post?.title}
                      </p>

                      <p
                        className={`w-[200px] lg:w-[33.3%] text-xs ${
                          isLoading && "text-gray-400"
                        }`}
                      >
                        {post?.author?.firstName} {post?.author?.lastName}
                      </p>

                      <p
                        className={`w-[200px] lg:w-[33.3%] text-xs ${
                          isLoading && "text-gray-400"
                        }`}
                      >
                        {post?.createdAt?.split("T")[0]}
                      </p>
                    </div>
                  ))}

                  {blogPosts?.length < 1 && (
                    <div className="flex flex-col items-center gap-y-5 text-center">
                      <img
                        src={empty}
                        className="max-w-[150px] w-[150px] object-contain"
                      />
                      <p className="text-center text-sm">
                        No passes to show for now...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardBlogPage;
