import { createContext, useContext } from 'react';

export const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext);
