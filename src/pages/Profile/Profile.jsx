import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/thunks/authThunks';
import {
  FaUser, FaEnvelope, FaPhone, FaTint, FaMapMarkerAlt,
  FaVenusMars, FaBirthdayCake, FaCamera, FaEdit,
  FaCheck, FaTimes, FaShieldAlt, FaStar, FaHospital,
} from 'react-icons/fa';
import { FiUser, FiMail, FiPhone, FiMapPin, FiActivity } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '', email: '', phoneNumber: '',
    bloodGroup: '', address: '', age: '',
    gender: '', profileImage: '',
  });
  const [isEditing, setIsEditing] = useState(false);

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(result)) {
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } else {
      toast.error(error || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '', email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '', bloodGroup: userInfo.bloodGroup || '',
        address: userInfo.address || '', age: userInfo.age || '',
        gender: userInfo.gender || '', profileImage: userInfo.profileImage || '',
      });
    }
    setIsEditing(false);
  };

  const avatarUrl = formData.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'U')}&background=173C63&color=fff&bold=true&size=200`;

  const infoCards = [
    { icon: <FiMail size={16} />, label: 'Email', value: formData.email, color: '#4A90E2', bg: 'rgba(74,144,226,0.1)' },
    { icon: <FiPhone size={16} />, label: 'Phone', value: formData.phoneNumber || 'Not set', color: '#27AE60', bg: 'rgba(39,174,96,0.1)' },
    { icon: <FaTint size={14} />, label: 'Blood Group', value: formData.bloodGroup || 'Not set', color: '#EB5757', bg: 'rgba(235,87,87,0.1)' },
    { icon: <FaBirthdayCake size={14} />, label: 'Age', value: formData.age ? `${formData.age} yrs` : 'Not set', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
    { icon: <FaVenusMars size={14} />, label: 'Gender', value: formData.gender || 'Not set', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
    { icon: <FiMapPin size={14} />, label: 'Location', value: formData.address || 'Not set', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)' },
  ];

  const inputCls = `w-full py-3 px-4 bg-[#F8FAFC] border border-[#E8EDF4] rounded-xl text-[#0D1B2A] text-sm font-medium
    focus:outline-none focus:border-[#4A90E2] transition-colors placeholder-[#9DAAB8]
    disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div style={{ minHeight: '100vh', background: '#F4F7FB', paddingTop: 100, paddingBottom: 60, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Background Hero Strip ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 280,
        background: 'linear-gradient(135deg, #0D1B2A 0%, #173C63 60%, #1a5c9a 100%)',
        zIndex: 0,
      }}>
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 60, background: '#F4F7FB', borderRadius: '50% 50% 0 0 / 30px 30px 0 0' }} />
        {/* Decorative dots */}
        <div style={{ position: 'absolute', top: 30, right: '10%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        <div style={{ position: 'absolute', top: 60, right: '20%', width: 60, height: 60, borderRadius: '50%', background: 'rgba(74,144,226,0.08)' }} />
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>

        {/* ── Profile Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: '#FFFFFF', border: '1px solid #E8EDF4',
            borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(23,60,99,0.10)',
            marginBottom: 24,
          }}
        >
          {/* ── Hero Header ── */}
          <div style={{
            background: 'linear-gradient(135deg, #0D1B2A 0%, #173C63 100%)',
            padding: '36px 40px 80px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
            <div style={{ position: 'absolute', bottom: 20, right: 60, width: 100, height: 100, borderRadius: '50%', background: 'rgba(74,144,226,0.06)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 6px' }}>
                  Account Profile
                </p>
                <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>
                  {formData.name || 'My Profile'}
                </h1>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                >
                  <FaEdit size={12} /> Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    form="profile-form"
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '10px 20px',
                      background: '#27AE60', color: '#fff',
                      border: 'none', borderRadius: 50,
                      fontSize: 13, fontWeight: 700, cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(39,174,96,0.3)',
                    }}
                  >
                    <FaCheck size={11} /> {status === 'loading' ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '10px 18px',
                      background: 'rgba(235,87,87,0.15)', color: '#ff8a8a',
                      border: '1px solid rgba(235,87,87,0.25)', borderRadius: 50,
                      fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    <FaTimes size={11} /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Avatar + Meta Row ── */}
          <div style={{ padding: '0 40px 32px', marginTop: -52 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={avatarUrl}
                  alt={formData.name}
                  style={{
                    width: 104, height: 104, borderRadius: 20,
                    objectFit: 'cover',
                    border: '4px solid #FFFFFF',
                    boxShadow: '0 8px 24px rgba(23,60,99,0.18)',
                  }}
                />
                {isEditing && (
                  <div style={{
                    position: 'absolute', bottom: -6, right: -6,
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#173C63', border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(23,60,99,0.25)',
                  }}>
                    <FaCamera size={10} />
                  </div>
                )}
              </div>

              {/* Name + Badges */}
              <div style={{ flex: 1, paddingBottom: 8 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0D1B2A', margin: '0 0 10px' }}>
                  {formData.name || 'User Name'}
                </h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 14px', borderRadius: 50,
                    background: 'rgba(23,60,99,0.08)', color: '#173C63',
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                    border: '1px solid rgba(23,60,99,0.12)',
                  }}>
                    <FaShieldAlt style={{ marginRight: 5, verticalAlign: 'middle', fontSize: 9 }} />
                    {userInfo?.role || 'User'}
                  </span>
                  {formData.bloodGroup && (
                    <span style={{
                      padding: '4px 14px', borderRadius: 50,
                      background: 'rgba(235,87,87,0.08)', color: '#EB5757',
                      fontSize: 11, fontWeight: 700,
                      border: '1px solid rgba(235,87,87,0.15)',
                    }}>
                      <FaTint style={{ marginRight: 5, verticalAlign: 'middle', fontSize: 9 }} />
                      {formData.bloodGroup}
                    </span>
                  )}
                  <span style={{
                    padding: '4px 14px', borderRadius: 50,
                    background: 'rgba(39,174,96,0.08)', color: '#27AE60',
                    fontSize: 11, fontWeight: 700,
                    border: '1px solid rgba(39,174,96,0.15)',
                  }}>
                    <FaStar style={{ marginRight: 5, verticalAlign: 'middle', fontSize: 9 }} />
                    Active Account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Info Summary Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}
          className="profile-info-grid"
        >
          {infoCards.map((card, i) => (
            <div key={i} style={{
              background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 14,
              padding: '16px 18px', boxShadow: '0 2px 10px rgba(23,60,99,0.04)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                background: card.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: card.color,
              }}>
                {card.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#9DAAB8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
                  {card.label}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Edit Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{
            background: '#FFFFFF', border: '1px solid #E8EDF4',
            borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(23,60,99,0.06)',
          }}
        >
          {/* Card Header */}
          <div style={{
            padding: '20px 32px', borderBottom: '1px solid #E8EDF4',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(74,144,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
              <FiUser size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: 0 }}>
                Personal Information
              </h3>
              <p style={{ fontSize: 12, color: '#9DAAB8', margin: 0, marginTop: 2 }}>
                {isEditing ? 'Make your changes and click Save Changes' : 'Click Edit Profile to update your details'}
              </p>
            </div>
            {isEditing && (
              <span style={{
                marginLeft: 'auto', padding: '4px 12px', borderRadius: 50,
                background: 'rgba(245,158,11,0.1)', color: '#F59E0B',
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                Editing Mode
              </span>
            )}
          </div>

          {/* Form Body */}
          <form id="profile-form" onSubmit={handleSubmit} style={{ padding: '28px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="profile-form-grid">

              {/* Full Name */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <FaUser style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8', fontSize: 12, pointerEvents: 'none' }} />
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} disabled={!isEditing}
                    placeholder="Your full name"
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: isEditing ? '#FFFFFF' : '#F8FAFC',
                      border: `1px solid ${isEditing ? '#E8EDF4' : '#E8EDF4'}`,
                      borderRadius: 12, color: '#0D1B2A', fontSize: 13, fontWeight: 600,
                      outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                      opacity: isEditing ? 1 : 0.75,
                    }}
                    onFocus={e => { if (isEditing) e.target.style.borderColor = '#4A90E2'; }}
                    onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  Email Address <span style={{ color: '#9DAAB8', fontWeight: 500, textTransform: 'none', fontSize: 10 }}>(cannot change)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <FaEnvelope style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8', fontSize: 12, pointerEvents: 'none' }} />
                  <input
                    type="email" value={formData.email} disabled
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: '#F8FAFC', border: '1px solid #E8EDF4',
                      borderRadius: 12, color: '#6B7A8D', fontSize: 13, fontWeight: 600,
                      outline: 'none', boxSizing: 'border-box', opacity: 0.65, cursor: 'not-allowed',
                    }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <FaPhone style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8', fontSize: 12, pointerEvents: 'none' }} />
                  <input
                    type="text" name="phoneNumber" value={formData.phoneNumber}
                    onChange={handleChange} disabled={!isEditing}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: isEditing ? '#FFFFFF' : '#F8FAFC',
                      border: '1px solid #E8EDF4', borderRadius: 12,
                      color: '#0D1B2A', fontSize: 13, fontWeight: 600,
                      outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                      opacity: isEditing ? 1 : 0.75,
                    }}
                    onFocus={e => { if (isEditing) e.target.style.borderColor = '#4A90E2'; }}
                    onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  Profile Image URL
                </label>
                <div style={{ position: 'relative' }}>
                  <FaCamera style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8', fontSize: 12, pointerEvents: 'none' }} />
                  <input
                    type="text" name="profileImage" value={formData.profileImage}
                    onChange={handleChange} disabled={!isEditing}
                    placeholder="https://example.com/photo.jpg"
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: isEditing ? '#FFFFFF' : '#F8FAFC',
                      border: '1px solid #E8EDF4', borderRadius: 12,
                      color: '#0D1B2A', fontSize: 13, fontWeight: 600,
                      outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                      opacity: isEditing ? 1 : 0.75,
                    }}
                    onFocus={e => { if (isEditing) e.target.style.borderColor = '#4A90E2'; }}
                    onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Age</label>
                <div style={{ position: 'relative' }}>
                  <FaBirthdayCake style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8', fontSize: 12, pointerEvents: 'none' }} />
                  <input
                    type="number" name="age" value={formData.age}
                    onChange={handleChange} disabled={!isEditing}
                    placeholder="25"
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: isEditing ? '#FFFFFF' : '#F8FAFC',
                      border: '1px solid #E8EDF4', borderRadius: 12,
                      color: '#0D1B2A', fontSize: 13, fontWeight: 600,
                      outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                      opacity: isEditing ? 1 : 0.75,
                    }}
                    onFocus={e => { if (isEditing) e.target.style.borderColor = '#4A90E2'; }}
                    onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Blood Group</label>
                <div style={{ position: 'relative' }}>
                  <FaTint style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8', fontSize: 12, pointerEvents: 'none', zIndex: 1 }} />
                  <select
                    name="bloodGroup" value={formData.bloodGroup}
                    onChange={handleChange} disabled={!isEditing}
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: isEditing ? '#FFFFFF' : '#F8FAFC',
                      border: '1px solid #E8EDF4', borderRadius: 12,
                      color: formData.bloodGroup ? '#0D1B2A' : '#9DAAB8',
                      fontSize: 13, fontWeight: 600, outline: 'none',
                      appearance: 'none', cursor: isEditing ? 'pointer' : 'not-allowed',
                      boxSizing: 'border-box', opacity: isEditing ? 1 : 0.75,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => { if (isEditing) e.target.style.borderColor = '#4A90E2'; }}
                    onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                  >
                    <option value="">Select blood group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Gender</label>
                <div style={{ position: 'relative' }}>
                  <FaVenusMars style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8', fontSize: 12, pointerEvents: 'none', zIndex: 1 }} />
                  <select
                    name="gender" value={formData.gender}
                    onChange={handleChange} disabled={!isEditing}
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: isEditing ? '#FFFFFF' : '#F8FAFC',
                      border: '1px solid #E8EDF4', borderRadius: 12,
                      color: formData.gender ? '#0D1B2A' : '#9DAAB8',
                      fontSize: 13, fontWeight: 600, outline: 'none',
                      appearance: 'none', cursor: isEditing ? 'pointer' : 'not-allowed',
                      boxSizing: 'border-box', opacity: isEditing ? 1 : 0.75,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => { if (isEditing) e.target.style.borderColor = '#4A90E2'; }}
                    onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Address - full width */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Address</label>
                <div style={{ position: 'relative' }}>
                  <FaMapMarkerAlt style={{ position: 'absolute', left: 14, top: 14, color: '#9DAAB8', fontSize: 12, pointerEvents: 'none' }} />
                  <textarea
                    name="address" value={formData.address}
                    onChange={handleChange} disabled={!isEditing}
                    rows={3} placeholder="Your permanent address"
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                      background: isEditing ? '#FFFFFF' : '#F8FAFC',
                      border: '1px solid #E8EDF4', borderRadius: 12,
                      color: '#0D1B2A', fontSize: 13, fontWeight: 600,
                      outline: 'none', transition: 'border-color 0.2s',
                      resize: 'none', lineHeight: 1.6, boxSizing: 'border-box',
                      opacity: isEditing ? 1 : 0.75, fontFamily: 'inherit',
                    }}
                    onFocus={e => { if (isEditing) e.target.style.borderColor = '#4A90E2'; }}
                    onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                  />
                </div>
              </div>
            </div>

            {/* Save / Cancel Buttons (inline at bottom) */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', gap: 12, marginTop: 28 }}
                >
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '13px 24px', background: '#173C63', color: '#fff',
                      border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 700,
                      cursor: 'pointer', boxShadow: '0 6px 20px rgba(23,60,99,0.2)',
                      transition: 'all 0.2s', opacity: status === 'loading' ? 0.6 : 1,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                  >
                    <FaCheck size={13} />
                    {status === 'loading' ? 'Saving Changes...' : 'Save Profile'}
                  </button>
                  <button
                    type="button" onClick={handleCancel}
                    style={{
                      padding: '13px 28px', background: '#F8FAFC',
                      border: '1px solid #E8EDF4', color: '#6B7A8D',
                      borderRadius: 14, fontSize: 14, fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#EAEDF0'; e.currentTarget.style.color = '#0D1B2A'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#6B7A8D'; }}
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-info-grid { grid-template-columns: 1fr 1fr !important; }
          .profile-form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .profile-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
