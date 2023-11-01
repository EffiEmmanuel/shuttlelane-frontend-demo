import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import Select from "react-select";

function AdminBulkEmailForm() {
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const [targetAudience, setTargetAudience] = useState(null);
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  const targetAudienceOptions = [
    {
      value: "everyone",
      label: "Everyone",
    },
    {
      value: "users",
      label: "Users",
    },
    {
      value: "drivers",
      label: "Drivers",
    },
    {
      value: "vendors",
      label: "Vendors",
    },
  ];

  return (
    <div className="">
      <h2 className="font-semibold text-xl text-shuttlelaneBlack">
        Bulk Email
      </h2>
      <p className="text-sm">
        Send bulk email to Shuttlelane users and drivers
      </p>

      {/*  */}
      <div className="lg:w-1/4 w-full">
        <form className="text-shuttlelaneBlack mt-7 flex flex-col gap-y-5">
          {/* Target Audience */}
          <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="targetAudience" className="text-sm">
                Target Audience
              </label>
              <Select
                value={targetAudience}
                onChange={setTargetAudience}
                options={targetAudienceOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "transparent"
                      : "transparent",
                    borderWidth: state.isFocused ? "0" : "0",
                    backgroundColor: "transparent",
                    position: "relative",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                  }),

                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: ".875rem",
                    position: "relative",
                    zIndex: 0,
                  }),

                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: ".875rem",
                    position: "relative",
                    zIndex: 0,
                  }),

                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: ".875rem",
                    position: "relative",
                    zIndex: 0,
                  }),
                }}
                placeholder="Select Target Audience"
                className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
              />
            </div>
          </div>

          {/* subject */}
          <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="subject" className="text-sm">
                Subject
              </label>
              <input
                type="text"
                placeholder="A catchy subject..."
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <textarea
                placeholder="An awesome message..."
                name="message"
                value={message}
                maxLength={70}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-44 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
              ></textarea>
            </div>
          </div>

          <button className="lg:w-44 text-sm w-full h-13 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg">
            {isLoading ? (
              <ImSpinner2 size={21} className="text-white animate-spin" />
            ) : (
              "Send Notification"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminBulkEmailForm;
