import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/thunks/authThunks';
import { FaUser, FaEnvelope, FaPhone, FaTint, FaMapMarkerAlt, FaIdCard, FaVenusMars, FaBirthdayCake } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, status, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    bloodGroup: '',
    address: '',
    age: '',
    gender: '',
    profileImage: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        bloodGroup: userInfo.bloodGroup || '',
        address: userInfo.address || '',
        age: userInfo.age || '',
        gender: userInfo.gender || '',
        profileImage: userInfo.profileImage || '',
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const resultAction = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(resultAction)) {
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="bg-blue-600 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <img
                  src={formData.profileImage || "https://ui-avatars.com/api/?name=" + formData.name + "&background=random&size=200"}
                  alt="Profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-4 border-white/20 shadow-2xl transition-transform group-hover:scale-105"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Update</span>
                  </div>
                )}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{formData.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold uppercase tracking-wider border border-white/20">
                    {userInfo?.role}
                  </span>
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/20 flex items-center gap-2">
                    <FaTint className="text-red-400" /> {formData.bloodGroup || 'Not set'}
                  </span>
                </div>
              </div>
              <div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {message && (
              <div className="mb-8 p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl font-bold flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {message}
              </div>
            )}
            
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl font-bold italic">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 font-medium text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl opacity-60 font-medium text-slate-700 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+91 00000 00000"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 font-medium text-slate-700"
                    />
                  </div>
                </div>
                
                <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Profile Image URL</label>
                    <input
                      type="text"
                      name="profileImage"
                      value={formData.profileImage}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 font-medium text-slate-700"
                    />
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Age</label>
                    <div className="relative">
                      <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 font-medium text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Blood Group</label>
                    <div className="relative">
                      <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 font-medium text-slate-700 appearance-none"
                      >
                        <option value="">Select</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Gender</label>
                  <div className="relative">
                    <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 font-medium text-slate-700 appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Permanent Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-6 text-slate-300" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="md:col-span-2 flex gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Saving Changes...' : 'Save Profile'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

