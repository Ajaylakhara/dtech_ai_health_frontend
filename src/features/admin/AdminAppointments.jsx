import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { fetchAllAppointments, updateAppointmentStatus, deleteAppointment } from '../../redux/thunks/appointmentThunks';
import toast from 'react-hot-toast';

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointments);
  
  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await dispatch(updateAppointmentStatus({ id, status: newStatus })).unwrap();
      toast.success(`Appointment ${newStatus}`);
    } catch (err) {
      toast.error(err || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment permanently?')) {
      try {
        await dispatch(deleteAppointment(id)).unwrap();
        toast.success('Appointment removed');
      } catch (err) {
        toast.error(err || 'Failed to delete');
      }
    }
  };

  if (status === 'loading') return <div className="text-blue-400 p-8 font-black">Loading Appointments...</div>;

  return (
    <div className="flex flex-col gap-6 mt-2 select-none">
      <div className="glass border border-white/5 rounded-[2rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-black">Appointment Management</h1>
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider select-none">
            {appointments?.length || 0} Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Patient</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Doctor</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Date & Time</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Status</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appt) => (
                <tr key={appt._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <FaUser size={12} />
                      </div>
                      <div>
                        <p className="text-white font-bold">{appt.patientName || appt.patientId?.name || 'Unknown'}</p>
                        <p className="text-xs text-slate-500">{appt.patientAge ? `${appt.patientAge} years` : ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-white font-bold">Dr. {appt.doctorId?.userId?.name || 'Doctor'}</p>
                    <p className="text-xs text-slate-500">{appt.doctorId?.specialization || appt.specialization}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                        <FaCalendarAlt className="text-blue-400 text-xs" />
                        {new Date(appt.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <FaClock className="text-xs" />
                        {appt.time}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      appt.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      appt.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      appt.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      {appt.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(appt._id, 'confirmed')}
                            className="w-8 h-8 rounded-xl bg-green-500/10 text-green-400 border border-green-500/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"
                            title="Confirm"
                          >
                            <FaCheck size={12} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(appt._id, 'cancelled')}
                            className="w-8 h-8 rounded-xl bg-red-500/10 text-red-400 border border-red-500/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            title="Cancel"
                          >
                            <FaTimes size={12} />
                          </button>
                        </>
                      )}
                      {appt.status === 'confirmed' && (
                         <button 
                          onClick={() => handleStatusUpdate(appt._id, 'completed')}
                          className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                          title="Mark Completed"
                        >
                          <FaCheck size={12} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(appt._id)}
                        className="w-8 h-8 rounded-xl bg-white/5 text-slate-400 border border-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!appointments || appointments.length === 0) && (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-500">
                      <FaCalendarAlt size={40} className="opacity-20" />
                      <p className="font-bold">No appointments found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
