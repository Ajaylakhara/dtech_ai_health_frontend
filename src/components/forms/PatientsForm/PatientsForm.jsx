import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPatient, updatePatient } from '../../../redux/thunks/patientThunks';
import { FaUser, FaPhone, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PatientsForm = ({ onSuccess, initialData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    gender: initialData?.gender || 'Male',
    dob: initialData?.dob?.split('T')[0] || '',
    address: initialData?.address || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        await dispatch(updatePatient({ id: initialData._id, patientData: formData })).unwrap();
        toast.success('Patient updated successfully');
      } else {
        await dispatch(createPatient(formData)).unwrap();
        toast.success('Patient registered successfully');
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err || 'Action failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Full Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Phone Number</label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Gender</label>
          <div className="relative">
            <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white appearance-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-400 mb-1 block">Date of Birth</label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-400 mb-1 block">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows="3"
          className="w-full px-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white resize-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#22c55e] text-white font-black py-3 rounded-xl mt-4 hover:bg-[#1eb355] transition-all shadow-lg shadow-[#22c55e]/20"
      >
        {initialData ? 'Update Patient Info' : 'Register New Patient'}
      </button>
    </form>
  );
};

export default PatientsForm;


