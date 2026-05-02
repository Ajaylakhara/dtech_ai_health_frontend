import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAppointments, deleteAppointment } from '../../redux/thunks/appointmentThunks';
import { Link } from 'react-router-dom';
import { FaCalendarPlus, FaTrash, FaEdit, FaClock, FaUserMd } from 'react-icons/fa';
import Modal from '../../components/ui/Modal';
import AppointmentForm from './AppointmentForm';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.appointments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(deleteAppointment(id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      case 'Rejected': return 'bg-gray-100 text-gray-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Appointments</h1>
            <p className="text-slate-500">Manage your upcoming and past medical consultations</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <FaCalendarPlus />
            Book New Appointment
          </button>
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="New Consultation"
        >
          <AppointmentForm 
            onSuccess={() => {
              setIsModalOpen(false);
              dispatch(fetchMyAppointments());
            }} 
          />
        </Modal>

        {status === 'loading' && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {status === 'succeeded' && appointments.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCalendarPlus className="text-blue-500 text-3xl" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No Appointments Found</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              You haven't booked any appointments yet. Start by choosing a doctor and a convenient time slot.
            </p>
            <Link
              to="/appointment"
              className="text-blue-600 font-bold hover:underline"
            >
              Book your first appointment now &rarr;
            </Link>
          </div>
        )}

        <div className="grid gap-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <FaClock size={12} />
                    Booked on {new Date(appt.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {appt.specialization} Consultation
                </h3>
                <div className="flex flex-wrap gap-y-2 gap-x-6 text-slate-600">
                  <div className="flex items-center gap-2">
                    <FaUserMd className="text-blue-400" />
                    <span>{appt.doctorId?.userId?.name || 'Assigned soon'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarPlus className="text-blue-400" />
                    <span>{new Date(appt.appointmentDate).toLocaleDateString()} at {appt.appointmentTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {appt.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleDelete(appt._id)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Cancel Appointment"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
                {appt.status === 'Confirmed' && (
                  <span className="text-green-600 font-medium px-4 py-2 bg-green-50 rounded-xl">
                    Ready for visit
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;

