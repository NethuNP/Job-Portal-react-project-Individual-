import React from 'react';

const ProfileCard = ({ profileData, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-96 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={profileData.profileImagePreview || "./images/9131529.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{profileData.username} {profileData.name}</h2>
            <p className="text-gray-600">{profileData.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">General Info</h3>
          <p><span className="font-semibold">Company:</span> {profileData.company}</p>
          <p><span className="font-semibold">Bio:</span> {profileData.bio}</p>
          <p><span className="font-semibold">Birthday:</span> {profileData.birthday}</p>
          <p><span className="font-semibold">Country:</span> {profileData.country}</p>
          <p><span className="font-semibold">Phone:</span> {profileData.phone}</p>
          <p><span className="font-semibold">Website:</span> {profileData.website}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h3>
          <p><span className="font-semibold">Twitter:</span> {profileData.twitter}</p>
          <p><span className="font-semibold">Facebook:</span> {profileData.facebook}</p>
          <p><span className="font-semibold">Google Plus:</span> {profileData.googlePlus}</p>
          <p><span className="font-semibold">LinkedIn:</span> {profileData.linkedIn}</p>
          <p><span className="font-semibold">Instagram:</span> {profileData.instagram}</p>
        </div>
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Close</button>
      </div>
    </div>
  );
};

export default ProfileCard;
