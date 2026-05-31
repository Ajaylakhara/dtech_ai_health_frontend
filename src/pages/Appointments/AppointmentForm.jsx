import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDoctors } from '../../redux/thunks/doctorThunks';
import { fetchDepartments } from '../../redux/slices/departmentSlice';
import { bookAppointment } from '../../redux/thunks/appointmentThunks';
import { FaCalendarCheck, FaUser, FaIdCard, FaStethoscope, FaClock, FaCheckCircle, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

  const inputStyle = {
    width: '100%', padding: '14px 16px 14px 44px', background: '#F8FAFC', border: '1px solid #E8EDF4',
    borderRadius: 12, fontSize: 15, fontWeight: 600, color: '#0D1B2A', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
  };

  const selectStyle = {
    ...inputStyle, paddingRight: 40, appearance: 'none', cursor: 'pointer'
  };

  const labelStyle = {
    fontSize: 13, fontWeight: 700, color: '#3D4D5C', letterSpacing: '0.02em', display: 'block', marginBottom: 8
  };

  const iconStyle = {
    position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#6B7A8D', pointerEvents: 'none'
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Inter', sans-serif" }}>
      {apptError && (
        <div style={{ marginBottom: 24, padding: 16, background: 'rgba(235,87,87,0.05)', borderLeft: '4px solid #EB5757', color: '#EB5757', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
          {apptError}
        </div>
      )}
      
      {success ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '40px 0' }}
        >
          <div style={{ background: 'rgba(39,174,96,0.1)', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#27AE60', animation: 'pulse 2s infinite' }}>
            <FaCheckCircle size={40} />
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0D1B2A', marginBottom: 12, fontFamily: "'Lora', serif" }}>Request Submitted Successfully!</h3>
          <p style={{ color: '#6B7A8D', marginBottom: 32, fontSize: 15, maxWidth: 360, margin: '0 auto 32px', lineHeight: 1.6, fontWeight: 500 }}>
            Your appointment has been registered and is pending approval. You will receive an update in your portal shortly.
          </p>
          <button
            onClick={() => navigate('/appointments')}
            className="submit-btn"
            style={{
              background: '#173C63', color: '#FFF', padding: '14px 28px', borderRadius: 50, border: 'none',
              fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8
            }}
          >
            Go to My Bookings <FaArrowRight size={12} />
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Patient Name & Age */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Patient Name</label>
              <div style={{ position: 'relative' }}>
                <div style={iconStyle}><FaUser size={16} /></div>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  style={inputStyle} placeholder="Patient name" required
                  onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Age</label>
              <div style={{ position: 'relative' }}>
                <div style={iconStyle}><FaIdCard size={16} /></div>
                <input
                  type="number" name="age" value={formData.age} onChange={handleChange} min="0"
                  style={inputStyle} placeholder="Patient age" required
                  onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          </div>

          {/* Department */}
          <div>
            <label style={labelStyle}>Medical Department</label>
            <div style={{ position: 'relative' }}>
              <div style={iconStyle}><FaStethoscope size={16} /></div>
              <select
                value={selectedDept} onChange={handleDeptChange}
                style={selectStyle} required
                onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
              >
                <option value="" disabled>Select Department</option>
                {departments?.map((dept) => (
                  <option key={dept._id} value={dept.name}>
                    {dept.name} {dept.consultationFee ? `(Fee: ₹${dept.consultationFee})` : ''}
                  </option>
                ))}
                {!departments?.length && <option value="General">General</option>}
              </select>
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9DAAB8', fontSize: 10, fontWeight: 700 }}>▼</div>
            </div>
          </div>

          {/* Choose Doctor */}
          <div>
            <label style={labelStyle}>Assigned Doctor</label>
            <div style={{ position: 'relative' }}>
              <div style={iconStyle}><FaUser size={16} /></div>
              <select
                name="doctorId" value={formData.doctorId} onChange={handleChange} disabled={!selectedDept}
                style={{ ...selectStyle, opacity: !selectedDept ? 0.6 : 1 }} required
                onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
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
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9DAAB8', fontSize: 10, fontWeight: 700 }}>▼</div>
            </div>
            {!formData.doctorId && selectedDept && filteredDoctors.length === 0 && (
              <p style={{ color: '#EB5757', fontSize: 12, fontWeight: 600, marginTop: 8 }}>No active doctors currently found in this department.</p>
            )}
          </div>

          {/* Date & Time */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Preferred Date</label>
              <input
                type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} min={today} disabled={!formData.doctorId}
                style={{ ...inputStyle, paddingLeft: 16, opacity: !formData.doctorId ? 0.6 : 1 }} required
                onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Preferred Time Slot</label>
              <div style={{ position: 'relative' }}>
                <div style={iconStyle}><FaClock size={16} /></div>
                {availableTimeSlots ? (
                  <select
                    name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} disabled={!formData.appointmentDate || availableTimeSlots.length === 0}
                    style={{ ...selectStyle, opacity: (!formData.appointmentDate || availableTimeSlots.length === 0) ? 0.6 : 1 }} required
                    onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
                  >
                    <option value="" disabled>Select Time Slot</option>
                    {availableTimeSlots.map((time, idx) => (
                      <option key={idx} value={time}>{time}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} disabled={!formData.appointmentDate}
                    style={{ ...inputStyle, opacity: !formData.appointmentDate ? 0.6 : 1 }} required
                    onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
                  />
                )}
                {availableTimeSlots && (
                  <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9DAAB8', fontSize: 10, fontWeight: 700 }}>▼</div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label style={labelStyle}>Payment Method</label>
            <div style={{ position: 'relative' }}>
              <div style={iconStyle}><FaMoneyBillWave size={16} /></div>
              <select
                name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}
                style={selectStyle} required
                onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Cash at Clinic">Cash at Clinic / Pay Later</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI / Digital Wallet</option>
              </select>
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9DAAB8', fontSize: 10, fontWeight: 700 }}>▼</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={apptStatus === 'loading'}
            className="submit-btn"
            style={{
              width: '100%', background: '#173C63', color: '#FFFFFF', padding: 16, borderRadius: 12,
              fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s', marginTop: 8
            }}
          >
            {apptStatus === 'loading' ? 'Processing request...' : (
              formData.paymentMethod === 'Cash at Clinic' || !formData.paymentMethod ? 'Confirm Consultation Booking' : `Proceed to Payment (₹${
                filteredDoctors.find(d => d._id === formData.doctorId)?.fees || 
                departments.find(d => d.name === selectedDept)?.consultationFee || 0
              })`
            )}
          </button>
        </form>
      )}
      <style>{`
        .submit-btn:hover:not(:disabled) {
          background: #1E4D7B !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(23,60,99,0.25);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed !important;
        }
      `}</style>
    </div>
  );
};

export default AppointmentForm;
