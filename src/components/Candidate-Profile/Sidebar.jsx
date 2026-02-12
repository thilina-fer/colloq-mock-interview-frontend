import React from "react";
import { Mail, MapPin, Calendar, Edit2 } from "lucide-react";

const Sidebar = ({ userProfile, onEditClick }) => (
  <aside className="w-full">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <div className="relative w-28 h-28 mx-auto mb-6">
        <img
          src={userProfile.img}
          alt="Profile"
          className="rounded-full object-cover w-full h-full border-4 border-white shadow-md"
        />
        <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={onEditClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors mb-3"
        >
          <Edit2 className="w-3 h-3" /> Edit Profile
        </button>
        <h2 className="text-xl font-bold text-gray-800">{userProfile.name}</h2>
      </div>

      <div className="space-y-4 text-sm text-gray-600 mb-6 border-t pt-6">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-gray-400" />
          <span>{userProfile.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{userProfile.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Joined {userProfile.joinedDate}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
        <p className="text-xs leading-relaxed text-gray-600 italic">
          "{userProfile.bio}"
        </p>
      </div>

      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
          Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {userProfile.interests.map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-md text-[10px] font-bold border border-yellow-200 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </aside>
);

export default Sidebar;
