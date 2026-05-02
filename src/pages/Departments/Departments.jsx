import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../redux/slices/departmentSlice";
import { FaBone, FaBrain, FaChild, FaDumbbell, FaHeartbeat, FaRibbon, FaUserMd, FaHospital } from "react-icons/fa";
import { FaEarListen } from "react-icons/fa6";

const Departments = () => {
    const dispatch = useDispatch();
    const { departments, status } = useSelector((state) => state.departments);

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    const getIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("heart") || lowerName.includes("cardio")) return <FaHeartbeat />;
        if (lowerName.includes("skin") || lowerName.includes("derm")) return <FaUserMd />;
        if (lowerName.includes("child") || lowerName.includes("pedia")) return <FaChild />;
        if (lowerName.includes("bone") || lowerName.includes("ortho")) return <FaBone />;
        if (lowerName.includes("brain") || lowerName.includes("neuro")) return <FaBrain />;
        if (lowerName.includes("cancer") || lowerName.includes("onco")) return <FaRibbon />;
        if (lowerName.includes("physio") || lowerName.includes("dumb")) return <FaDumbbell />;
        if (lowerName.includes("ent") || lowerName.includes("ear") || lowerName.includes("throat")) return <FaEarListen />;
        return <FaHospital />; // Default icon
    };

    if (status === 'loading') {
        return <div className="text-center py-20 text-blue-500 font-bold">Loading Departments...</div>;
    }

    return (
        <div className="px-5 py-8 my-5 text-center text-gray-900">
            <h2 className="text-3xl font-bold mb-8 text-blue-700">Our Departments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {departments?.map((dept) => (
                    <div 
                        key={dept._id} 
                        className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                    >
                        {dept.image ? (
                            <img src={dept.image} alt={dept.name} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-50" />
                        ) : (
                            <div className="text-5xl text-blue-500 mb-4">{getIcon(dept.name)}</div>
                        )}
                        <h5 className="mt-1 text-lg font-semibold">{dept.name}</h5>
                        <p className="text-gray-600 text-sm mt-2">{dept.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Departments;

