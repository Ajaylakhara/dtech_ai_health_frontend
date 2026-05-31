import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../redux/slices/departmentSlice";
import { FaBone, FaBrain, FaChild, FaDumbbell, FaHeartbeat, FaRibbon, FaUserMd, FaHospital, FaArrowRight } from "react-icons/fa";
import { FaEarListen } from "react-icons/fa6";
import { motion } from "framer-motion";

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

const Departments = () => {
    const dispatch = useDispatch();
    const { departments, status } = useSelector((state) => state.departments);

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', paddingTop: 80 }}>
                <div style={{ width: 48, height: 48, borderBottom: '2px solid #173C63', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: '#3D4D5C', fontWeight: 600, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>Loading clinical areas...</p>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', background: '#F4F7FB', minHeight: '100vh', fontFamily: "'Inter', sans-serif", padding: '120px 24px 80px', position: 'relative' }}>
            {/* Background Blob */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '500px', background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F7FB 100%)', zIndex: 0 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <span style={{ 
                        display: 'inline-block', padding: '6px 14px', background: 'rgba(74,144,226,0.1)', color: '#4A90E2', 
                        borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 
                    }}>
                        FACILITIES
                    </span>
                    <h1 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#0D1B2A', marginBottom: 16, letterSpacing: '-0.02em' }}>
                        Specialized Medical <br/><span style={{ fontStyle: 'italic', color: '#173C63' }}>Departments</span>
                    </h1>
                    <p style={{ fontSize: 16, color: '#6B7A8D', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                        Explore our world-class medical departments equipped with advanced infrastructure and led by globally acclaimed physicians.
                    </p>
                </div>

                {/* Grid Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 30 }}>
                    {departments?.map((dept, index) => {
                        const colors = [
                            { bg: 'rgba(235,87,87,0.1)', text: '#EB5757' },
                            { bg: 'rgba(45,156,219,0.1)', text: '#2D9CDB' },
                            { bg: 'rgba(39,174,96,0.1)', text: '#27AE60' },
                            { bg: 'rgba(242,153,74,0.1)', text: '#F2994A' },
                            { bg: 'rgba(155,81,224,0.1)', text: '#9B51E0' },
                            { bg: 'rgba(23,60,99,0.1)', text: '#173C63' }
                        ];
                        const theme = colors[index % colors.length];

                        return (
                            <div key={dept._id} className="dept-card" style={{ 
                                background: '#FFFFFF', borderRadius: 20, padding: 32,
                                border: '1px solid #E8EDF4', display: 'flex', flexDirection: 'column',
                                transition: 'all 0.3s ease', cursor: 'pointer'
                            }}>
                                <div style={{ 
                                    width: 54, height: 54, borderRadius: 16, background: theme.bg, color: theme.text,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 24
                                }}>
                                    {getIcon(dept.name)}
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0D1B2A', marginBottom: 12 }}>{dept.name}</h3>
                                <p style={{ fontSize: 14, color: '#6B7A8D', lineHeight: 1.6, marginBottom: 24, flexGrow: 1 }}>{dept.description}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: theme.text }}>
                                    Read More <FaArrowRight size={12} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Trust Banner */}
                <div style={{ marginTop: 60, textAlign: 'center' }}>
                    <a href="/appointments" style={{
                        display: 'inline-block', padding: '14px 32px', background: '#173C63', color: '#FFF',
                        borderRadius: 50, fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s'
                    }}>
                        Book an Appointment
                    </a>
                </div>
            </div>

            <style>{`
                .dept-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(23,60,99,0.08);
                    border-color: rgba(23,60,99,0.15);
                }
            `}</style>
        </div>
    );
};

export default Departments;
