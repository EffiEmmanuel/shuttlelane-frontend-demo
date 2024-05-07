import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import Select from "react-select";

function AdminPushNotificationsForm() {
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const [targetAudience, setTargetAudience] = useState(null);
  const [targetDevice, setTargetDevice] = useState(null);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();

  const targetAudienceOptions = [
    {
      value: "users",
      label: "Users",
    },
    {
      value: "drivers",
      label: "Drivers",
    },
  ];

  const targetDeviceOptions = [
    {
      value: "everyone",
      label: "Everyone",
    },
    {
      value: "android",
      label: "Android",
    },
    {
      value: "ios",
      label: "iOS",
    },
  ];

  return (
    <div className="">
      <h2 className="font-semibold text-xl text-shuttlelaneBlack">
        Push Notifications
      </h2>
      <p className="text-sm">
        Send push notifications to Shuttlelane Mobile App users
      </p>

      {/*  */}
      <div className="lg:w-1/4 w-full">
        <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
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

                    width: "100%",
                    height: "100%",
                  }),

                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    // fontSize: ".75rem",
                    position: "relative",
                  }),

                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    // fontSize: ".75rem",
                    position: "relative",
                  }),

                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    // fontSize: ".75rem",
                    position: "relative",
                  }),
                }}
                placeholder="Select Target Audience"
                className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
              />
            </div>
          </div>

          {/* Target Devices */}
          <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="targetDevices" className="text-sm">
                Target Devices
              </label>
              <Select
                value={targetDevice}
                onChange={setTargetDevice}
                options={targetDeviceOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "transparent"
                      : "transparent",
                    borderWidth: state.isFocused ? "0" : "0",
                    backgroundColor: "transparent",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }),

                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    // fontSize: ".75rem",
                    position: "relative",
                  }),

                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    // fontSize: ".75rem",
                    position: "relative",
                  }),

                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    // fontSize: ".75rem",
                    position: "relative",
                  }),
                }}
                placeholder="Select Target Device"
                className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <input
                type="text"
                placeholder="Doe"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              <input
                type="text"
                placeholder="An awesome message..."
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
              />
            </div>
          </div>

          <button className="lg:w-44 w-full h-13 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg">
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

export default AdminPushNotificationsForm;
