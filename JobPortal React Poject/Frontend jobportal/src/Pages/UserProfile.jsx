import React, { useState } from 'react';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    company: '',
    bio: '',
    birthday: '',
    country: '',
    phone: '',
    website: '',
    twitter: '',
    facebook: '',
    googlePlus: '',
    linkedIn: '',
    instagram: '',
    profileImage: null,
    profileImagePreview: '',
  });

  const [currentSection, setCurrentSection] = useState('general');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profileImage: file,
      profileImagePreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, such as sending data to the server
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic, such as sending data to the server
  };

  return (
    <div className="container mx-auto p-6 min-h-screen mt-20">
      <h2 className="text-3xl font-semibold text-gray-500 mb-6">Account Settings</h2>
      <div className="bg-white rounded-lg shadow-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-gray-200 p-4">
            <div className="flex flex-col space-y-2">
              <a
                href="#general"
                className={`block p-2 text-gray-700 font-bold hover:bg-gray-300 rounded-md ${currentSection === 'general' ? 'bg-gray-300' : ''}`}
                onClick={() => setCurrentSection('general')}
              >
                General
              </a>
              <a
                href="#change-password"
                className={`block p-2 text-gray-700 hover:bg-gray-300 rounded-md ${currentSection === 'change-password' ? 'bg-gray-300' : ''}`}
                onClick={() => setCurrentSection('change-password')}
              >
                Change Password
              </a>
              <a
                href="#info"
                className={`block p-2 text-gray-700 hover:bg-gray-300 rounded-md ${currentSection === 'info' ? 'bg-gray-300' : ''}`}
                onClick={() => setCurrentSection('info')}
              >
                Info
              </a>
              <a
                href="#social-links"
                className={`block p-2 text-gray-700 hover:bg-gray-300 rounded-md ${currentSection === 'social-links' ? 'bg-gray-300' : ''}`}
                onClick={() => setCurrentSection('social-links')}
              >
                Social Links
              </a>
            </div>
          </div>
          <div className="w-full md:w-3/4 p-6">
            {currentSection === 'general' && (
              <div id="general">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={formData.profileImagePreview || "./images/9131529.png"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border"
                    />
                    <div className="ml-4">
                      <label className="block text-blue-500 cursor-pointer">
                        <span className="text-sm bg-white px-3 py-2 rounded-2xl text-blue font-bold hover:bg-white hover:text-blue hover:border-blue">
                          Upload new photo
                        </span>
                        <input type="file" onChange={handleImageChange} className="hidden" />
                      </label>
                    {/*}  <p className="text-xs text-gray-500 mt-1">Allowed JPG, GIF or PNG. Max size of 800K</p>*/}
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-md text-blue">
                    View Profile
                  </button>
                  
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                  <div>
                    <label className="block text-gray-700">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue text-white rounded-md">Save changes</button>
                  </div>
                </form>
              </div>
            )}
            {currentSection === 'change-password' && (
              <div id="change-password" className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue text-white rounded-md">Change Password</button>
                  </div>
                </form>
              </div>
            )}
            {currentSection === 'info' && (
              <div id="info" className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Info</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Birthday</label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue text-white rounded-md">Save changes</button>
                  </div>
                </form>
              </div>
            )}
            {currentSection === 'social-links' && (
              <div id="social-links" className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Social Links</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">Twitter</label>
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Facebook</label>
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Google Plus</label>
                    <input
                      type="url"
                      name="googlePlus"
                      value={formData.googlePlus}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">LinkedIn</label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Instagram</label>
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue text-white rounded-md">Save changes</button>
                  </div>
                </form>
              </div>
            )}
            {/* Additional sections for "Connections" and "Notifications" would follow a similar structure */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
