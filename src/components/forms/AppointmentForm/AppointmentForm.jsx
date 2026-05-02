import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDoctors } from '../../../redux/thunks/doctorThunks';
import { fetchDepartments } from '../../../redux/slices/departmentSlice';
import { bookAppointment } from '../../../redux/thunks/appointmentThunks';
import { FaCalendarCheck, FaUser, FaIdCard, FaStethoscope, FaClock, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const AppointmentForm = ({ onSuccess }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { doctors } = useSelector((state) => state.doctors);
  const { departments } = useSelector((state) => state.departments);
  const { status: apptStatus, error: apptError } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    age: '',
    doctorId: '',
    specialization: '',
    appointmentDate: '',
    appointmentTime: '',
    paymentMethod: '',
  });
  const [selectedDept, setSelectedDept] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchDepartments());
  }, [dispatch]);

  // Filter doctors based on selected department name OR specialization
  const filteredDoctors = useMemo(() => {
    if (!selectedDept) return [];
    return doctors.filter(doctor => {
      // Check if specialization matches, or if populated departmentId.name matches
      const deptMatch = doctor.departmentId?.name === selectedDept;
      const specMatch = doctor.specialization === selectedDept;
      return deptMatch || specMatch;
    });
  }, [doctors, selectedDept]);

  const selectedDoctorProfile = useMemo(() => {
    return doctors.find((d) => d._id === formData.doctorId);
  }, [doctors, formData.doctorId]);

  // Helper for flexible day matching
  const isAvailableOnDay = (selectedDayName, allowedDaysArray) => {
    const dayMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
    return allowedDaysArray.some(dayStr => {
      const lowerDay = dayStr.toLowerCase();
      if (lowerDay.includes(selectedDayName.toLowerCase())) return true;
      if (lowerDay.includes('mon') && lowerDay.includes('fri')) {
         const num = dayMap[selectedDayName];
         return num >= 1 && num <= 5;
      }
      if (lowerDay.includes('weekday')) {
         const num = dayMap[selectedDayName];
         return num >= 1 && num <= 5;
      }
      if (lowerDay.includes('weekend')) {
         const num = dayMap[selectedDayName];
         return num === 0 || num === 6;
      }
      return false;
    });
  };

  // Determine valid time slots based on selected date
  const availableTimeSlots = useMemo(() => {
    if (!selectedDoctorProfile || !formData.appointmentDate) return null;
    if (!selectedDoctorProfile.availability || selectedDoctorProfile.availability.length === 0) return null;

    const selectedD = new Date(formData.appointmentDate);
    selectedD.setMinutes(selectedD.getMinutes() + selectedD.getTimezoneOffset());
    const dayName = selectedD.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Find matching availability config
    const dayConfig = selectedDoctorProfile.availability.find(a => {
      const lowerDay = a.day.toLowerCase();
      if (lowerDay.includes(dayName.toLowerCase())) return true;
      if ((lowerDay.includes('mon') && lowerDay.includes('fri')) || lowerDay.includes('weekday')) {
         const num = new Date(formData.appointmentDate).getUTCDay();
         return num >= 1 && num <= 5;
      }
      return false;
    });
    
    return dayConfig ? dayConfig.timeSlots : [];
  }, [selectedDoctorProfile, formData.appointmentDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'appointmentDate' && selectedDoctorProfile) {
      if (selectedDoctorProfile.availability && selectedDoctorProfile.availability.length > 0) {
        const selectedD = new Date(value);
        selectedD.setMinutes(selectedD.getMinutes() + selectedD.getTimezoneOffset());
        const dayName = selectedD.toLocaleDateString('en-US', { weekday: 'long' });
        
        const allowedDays = selectedDoctorProfile.availability.map(a => a.day);
        if (!isAvailableOnDay(dayName, allowedDays)) {
          alert(`Dr. ${selectedDoctorProfile.userId?.name || 'The selected doctor'} is only available on: ${allowedDays.join(', ')}. Please select a valid date.`);
          return;
        }
      }
      setFormData((prev) => ({ ...prev, appointmentDate: value, appointmentTime: '' }));
      return;
    }

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      if (name === 'doctorId') {
        const selectedDoc = doctors.find((d) => d._id === value);
        updatedFormData.specialization = selectedDept || selectedDoc?.specialization || '';
        updatedFormData.appointmentDate = '';
        updatedFormData.appointmentTime = '';
      }
      return updatedFormData;
    });
  };

  const handleDeptChange = (e) => {
    setSelectedDept(e.target.value);
    setFormData((prev) => ({ ...prev, doctorId: '', specialization: e.target.value, appointmentDate: '', appointmentTime: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!formData.doctorId) {
      alert('Please select a doctor');
      return;
    }

    dispatch(bookAppointment({
      ...formData,
      age: parseInt(formData.age),
    }));
    setSuccess('Appointment booking request sent!');
    setFormData({
      name: '',
      age: '',
      doctorId: '',
      specialization: '',
      appointmentDate: '',
      appointmentTime: '',
      paymentMethod: '',
    });
    setSelectedDept('');
    if (onSuccess) {
      setTimeout(() => onSuccess(), 2000);
    }
  };

  if (!userInfo) {
    navigate('/');
    return null;
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full">
      {apptError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl font-bold text-sm">
          {apptError}
        </div>
      )}
      
      {success ? (
        <div className="text-center py-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-500 text-3xl" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">Request Sent!</h3>
          <p className="text-slate-500 mb-6 text-sm max-w-xs mx-auto">
            Your appointment request is pending. It will be reviewed shortly.
          </p>
          <button
            onClick={() => navigate('/appointments')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/25"
          >
            Go to Appointments
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Patient Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm"
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Age</label>
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm"
                  placeholder="Age"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Department</label>
            <div className="relative">
              <FaStethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <select
                value={selectedDept}
                onChange={handleDeptChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm appearance-none"
                required
              >
                <option value="" disabled>Select Department</option>
                {departments?.map((dept) => (
                  <option key={dept._id} value={dept.name}>
                    {dept.name} {dept.consultationFee ? `(Fee: ₹${dept.consultationFee})` : ''}
                  </option>
                ))}
                {!departments?.length && <option value="General">General</option>}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Choose Doctor</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                disabled={!selectedDept}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm appearance-none disabled:opacity-50"
                required
              >
                <option value="" disabled>Select Doctor</option>
                {filteredDoctors.map((doctor) => {
                  const fee = doctor.fees || departments.find(d => d.name === selectedDept)?.consultationFee || 0;
                  return (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.userId?.name || 'Doctor'} (Fee: ₹{fee})
                    </option>
                  );
                })}
              </select>
            </div>
            {!formData.doctorId && selectedDept && filteredDoctors.length === 0 && (
              <p className="text-xs text-red-500 mt-1">No doctors found in this department.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={today}
                disabled={!formData.doctorId}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Preferred Time</label>
              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                {availableTimeSlots ? (
                  <select
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    disabled={!formData.appointmentDate || availableTimeSlots.length === 0}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm appearance-none disabled:opacity-50"
                    required
                  >
                    <option value="" disabled>Select Time Slot</option>
                    {availableTimeSlots.map((time, idx) => (
                      <option key={idx} value={time}>{time}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    disabled={!formData.appointmentDate}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm disabled:opacity-50"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Payment Method</label>
            <div className="relative">
              <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm appearance-none"
                required
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Cash at Clinic">Cash at Clinic / Pay Later</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI / Digital Wallet</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={apptStatus === 'loading'}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
          >
            {apptStatus === 'loading' ? 'Booking...' : (
              formData.paymentMethod === 'Cash at Clinic' ? 'Confirm Booking' : `Proceed to Payment (₹${
                filteredDoctors.find(d => d._id === formData.doctorId)?.fees || 
                departments.find(d => d.name === selectedDept)?.consultationFee || 0
              })`
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;





