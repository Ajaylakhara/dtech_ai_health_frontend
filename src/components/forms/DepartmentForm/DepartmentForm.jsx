import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDepartment, updateDepartment } from '../../../redux/slices/departmentSlice';
import { FaHospital, FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DepartmentForm = ({ onSuccess, initialData }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.departments);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    consultationFee: initialData?.consultationFee || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (initialData?._id) {
       result = await dispatch(updateDepartment({ id: initialData._id, deptData: formData }));
    } else {
       result = await dispatch(createDepartment(formData));
    }

    if (createDepartment.fulfilled.match(result) || updateDepartment.fulfilled.match(result)) {
      toast.success(initialData ? 'Department updated successfully!' : 'Department created successfully!');
      if (!initialData) setFormData({ name: '', description: '', image: '', consultationFee: '' });
      if (onSuccess) onSuccess();
    } else {
      toast.error(result.payload || 'Action failed');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Department Name</label>
        <div className="relative">
          <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
            placeholder="e.g. Cardiology, Neurology"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 resize-none"
          placeholder="Brief description of the department's services..."
          required
        />
      </div>

      <div>
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Consultation Fee (₹)</label>
        <div className="relative">
          <input
            type="number"
            value={formData.consultationFee}
            onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
            placeholder="e.g. 200"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Department Image</label>
        <div className="flex items-center gap-4">
          {formData.image && (
            <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border-2 border-blue-500/20" />
          )}
          <div className="relative flex-1">
            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-500/25 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
      >
        {status === 'loading' ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Department' : 'Create Department')}
      </button>
    </form>
  );
};

export default DepartmentForm;


