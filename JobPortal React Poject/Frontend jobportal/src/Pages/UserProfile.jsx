import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Component/context/AuthContext";

const UserProfileForm = () => {
  const { user } = useContext(AuthContext);

  const initialFormData = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: null,
    profileImagePreview: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentSection, setCurrentSection] = useState("general");
  const [showProfilePopup, setShowProfilePopup] = useState(false); // State for managing popup visibility

  useEffect(() => {
    if (user) {
      setFormData({
        ...initialFormData,
        ...user,
        profileImagePreview: user.profileImage
          ? URL.createObjectURL(user.profileImage)
          : "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!user || !user._id) {
      // Handle case where user or user.id is not available
      console.error("User or user ID not available");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);

    const response = await fetch(`/update/${_id}`, { // Changed 'seeker.id' to 'user.id'
      method: "PUT",
      body: formDataToSend,
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setFormData({
        ...formData,
        ...updatedUser,
        profileImagePreview: updatedUser.profileImage
          ? URL.createObjectURL(updatedUser.profileImage)
          : "",
      });
      alert("Profile updated successfully");
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Error updating profile");
  }
};

  const handleCancel = () => {
    if (user) {
      setFormData({
        ...initialFormData,
        ...user,
        profileImagePreview: user.profileImage
          ? URL.createObjectURL(user.profileImage)
          : "",
      });
    } else {
      setFormData(initialFormData);
    }
  };

  // Function to toggle the visibility of the profile popup
  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen mt-20">
      <h2 className="text-3xl font-semibold text-gray-500 mb-6">
        Account Settings
      </h2>
      <div className="bg-white rounded-lg shadow-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-gray-200 p-4">
            <div className="flex flex-col space-y-2">
              <a
                href="#general"
                className={`block p-2 text-gray-700 font-bold hover:bg-gray-300 rounded-md ${
                  currentSection === "general" ? "bg-gray-300" : ""
                }`}
                onClick={() => setCurrentSection("general")}
              >
                General
              </a>
            </div>
          </div>
          <div className="w-full md:w-3/4 p-6">
            {currentSection === "general" && (
              <div id="general">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={
                        formData.profileImagePreview || "./images/9131529.png"
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full border"
                    />
                    <div className="ml-4">
                      <label className="block text-blue-500 cursor-pointer">
                        <span className="text-sm bg-white px-3 py-2 rounded-2xl text-blue font-bold hover:bg-white hover:text-blue hover:border-blue">
                          Upload new photo
                        </span>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded-md text-blue"
                    onClick={toggleProfilePopup} // Add onClick event to open the popup
                  >
                    View Profile
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue text-white rounded-md"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Render the profile popup conditionally */}
      {showProfilePopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Profile Details</h3>
            <div className="flex items-center mb-4">
              <img
                src={formData.profileImagePreview || "./images/9131529.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border ml-20"
              />
            </div>
            
            <p className="mb-2">First Name: <span className="ml-2"> {formData.firstName}</span></p>
            <p className="mb-2">Last Name:<span className="ml-2"> {formData.lastName}</span></p>
            <p>Email: <span className="ml-2">{formData.email}</span></p>
            {/* Add more profile details here */}
            <button
              className="mt-4 px-4 py-2 bg-blue text-white rounded-md ml-48"
              onClick={toggleProfilePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileForm;
