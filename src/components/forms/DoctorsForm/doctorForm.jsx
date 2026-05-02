import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDoctorProfile, updateDoctorAction } from '../../../redux/thunks/doctorThunks';
import { fetchDepartments } from '../../../redux/thunks/departmentThunks';
import { FaUserMd, FaEnvelope, FaImage, FaStethoscope } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DoctorsForm = ({ onSubmit, initialData }) => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);
  const [formData, setFormData] = useState({
    name: initialData?.userId?.name || '',
    email: initialData?.userId?.email || '',
    password: '',
    specialization: initialData?.specialization || '',
    department: initialData?.department?._id || initialData?.department || '',
    experience: initialData?.experience || '',
    consultationFee: initialData?.consultationFee || '',
    image: initialData?.image || '',
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        await dispatch(updateDoctorAction({ id: initialData._id, data: formData })).unwrap();
        toast.success('Doctor updated successfully');
      } else {
        await dispatch(createDoctorProfile(formData)).unwrap();
        toast.success('Doctor created successfully');
      }
      if (onSubmit) onSubmit();
    } catch (err) {
      toast.error(err || 'Action failed');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 dark-form-wrapper">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Full Name</label>
          <div className="relative">
            <FaUserMd className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
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
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
              required
            />
          </div>
        </div>
      </div>

      {!initialData && (
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
            required
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Department</label>
          <div className="relative">
            <FaStethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white appearance-none"
              required
            >
              <option value="">Select Department</option>
              {departments?.map((dept) => (
                <option key={dept._id} value={dept._id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Specialization</label>
          <input
            type="text"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Experience (Years)</label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 mb-1 block">Consultation Fee</label>
          <input
            type="number"
            value={formData.consultationFee}
            onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#151618] border border-white/10 rounded-xl text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-400 mb-1 block">Profile Image</label>
        <div className="flex items-center gap-4">
          {formData.image && (
            <img src={formData.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-white/10" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-xs text-slate-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-black py-3 rounded-xl mt-4 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 transition-all duration-200"
      >
        {initialData ? 'Update Doctor Profile' : 'Create Doctor Profile'}
      </button>
    </form>
  );
};

export default DoctorsForm;


