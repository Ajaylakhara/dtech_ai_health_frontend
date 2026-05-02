import { useState } from 'react';
import { AppointmentContext } from './AppointmentUtils';
import axios from 'axios'; //using axios for API calls

const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const addAppointment = async (appointment) => {
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:7017/Appointments', appointment); // Replace with your API endpoint
      setAppointments([...appointments, { ...response.data, status: 'Pending' }]);
    } catch (error) {
      console.error('Failed to add appointment:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      await axios.get(`https://localhost:7017/Appointments/user/${id}`, { status: newStatus }); // Replace with your API endpoint
      setAppointments(
        appointments.map((appt) =>
          appt.id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (error) {
      console.error('Failed to update appointment status:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, updateAppointmentStatus, loading }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
