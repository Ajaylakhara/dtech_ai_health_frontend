import React from "react";
import {
  FaBullseye, FaEye, FaHandHoldingHeart,
  FaMicroscope, FaShieldAlt, FaCheck, FaAward
} from "react-icons/fa";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2016",
    title: "MediCare Founded",
    description:
      "Started as a passionate community clinic with 5 doctors, dedicated to elevating neighborhood healthcare standards.",
    icon: <FaAward size={18} />,
    color: "#4A90E2",
    bg: "rgba(74,144,226,0.1)",
  },
  {
    year: "2019",
    title: "Multi-Specialty Expansion",
    description:
      "Inaugurated our state-of-the-art 150-bed campus featuring modular operating theatres and a dedicated trauma center.",
    icon: <FaHandHoldingHeart size={18} />,
    color: "#27AE60",
    bg: "rgba(39,174,96,0.1)",
  },
  {
    year: "2023",
    title: "NABH Accreditation",
    description:
      "Awarded national accreditation for clinical excellence and patient safety, placing us among the top tier institutions.",
    icon: <FaShieldAlt size={18} />,
    color: "#173C63",
    bg: "rgba(23,60,99,0.1)",
  },
  {
    year: "2026",
    title: "Digital Health Transition",
    description:
      "Launched advanced patient portals, integrated EHR system, and telehealth services to connect doctors and patients globally.",
    icon: <FaMicroscope size={18} />,
    color: "#E67E22",
    bg: "rgba(230,126,34,0.1)",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const About = () => {
  return (
    <div
      style={{
        width: "100%",
        background: "#FFFFFF",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ─── Hero ─── */}
      <section
        style={{
          position: "relative",
          padding: "130px 24px 90px",
          background:
            "radial-gradient(circle at 50% 40%, rgba(74,144,226,0.09) 0%, rgba(255,255,255,0) 65%)",
          borderBottom: "1px solid #E8EDF4",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(74,144,226,0.05)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            {...fadeUp(0)}
            style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
          >
            <span className="badge-pill">Who We Are</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "#173C63",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            About{" "}
            <span style={{ fontStyle: "italic", color: "#4A90E2" }}>
              MediCare
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontSize: 18,
              color: "#3D4D5C",
              lineHeight: 1.7,
              fontWeight: 500,
              maxWidth: 660,
              margin: "0 auto",
            }}
          >
            We are a multi-specialty institution committed to providing world-class
            healthcare by blending clinical brilliance, compassionate care, and
            state-of-the-art medical technology.
          </motion.p>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section style={{ background: "#F8F9FC", padding: "96px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {/* Mission */}
          <motion.div
            {...fadeUp(0.1)}
            className="card-vitalix"
            style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div
              className="icon-circle"
              style={{
                background: "rgba(74,144,226,0.1)",
                color: "#4A90E2",
                width: 64,
                height: 64,
                marginBottom: 24,
              }}
            >
              <FaBullseye size={26} />
            </div>
            <h2
              className="font-serif"
              style={{ fontSize: 26, fontWeight: 700, color: "#173C63", marginBottom: 16 }}
            >
              Our Mission
            </h2>
            <p style={{ color: "#3D4D5C", fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>
              To offer high-quality, comprehensive clinical care with deep empathy,
              transparency, and affordability. We strive daily to elevate clinical
              standards, prioritize patient safety, and champion proactive wellness
              within our global community.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            {...fadeUp(0.2)}
            className="card-vitalix"
            style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div
              className="icon-circle"
              style={{
                background: "rgba(39,174,96,0.1)",
                color: "#27AE60",
                width: 64,
                height: 64,
                marginBottom: 24,
              }}
            >
              <FaEye size={26} />
            </div>
            <h2
              className="font-serif"
              style={{ fontSize: 26, fontWeight: 700, color: "#173C63", marginBottom: 16 }}
            >
              Our Vision
            </h2>
            <p style={{ color: "#3D4D5C", fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>
              To be a globally recognized symbol of medical innovation, ethical
              practice, and patient satisfaction. We envision setting new standards
              in clinical accuracy through advanced digital integrations and custom
              treatment paradigms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <section style={{ background: "#FFFFFF", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* heading */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-tag">Values</span>
            <h2
              className="section-title"
              style={{ color: "#173C63" }}
            >
              Our Core Pillars
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                icon: <FaHandHoldingHeart size={28} />,
                color: "#173C63",
                bg: "rgba(23,60,99,0.07)",
                title: "Compassion",
                desc:
                  "We prioritize patient care with deep empathy, dignity, and active listening. Behind every chart is a human story.",
              },
              {
                icon: <FaMicroscope size={28} />,
                color: "#4A90E2",
                bg: "rgba(74,144,226,0.1)",
                title: "Innovation",
                desc:
                  "We embrace modular technology, AI diagnostic support, and continuous clinical trials to build safer healthcare futures.",
              },
              {
                icon: <FaShieldAlt size={28} />,
                color: "#27AE60",
                bg: "rgba(39,174,96,0.1)",
                title: "Integrity",
                desc:
                  "We practice transparent pricing, evidence-based medication, and ethical transparency in all administrative processes.",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * (i + 1))}
                className="card-vitalix"
                style={{
                  padding: 36,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  className="icon-circle"
                  style={{
                    background: val.bg,
                    color: val.color,
                    width: 68,
                    height: 68,
                    marginBottom: 24,
                  }}
                >
                  {val.icon}
                </div>
                <h3
                  className="font-serif"
                  style={{ fontSize: 22, fontWeight: 700, color: "#173C63", marginBottom: 12 }}
                >
                  {val.title}
                </h3>
                <p style={{ color: "#3D4D5C", fontSize: 15, lineHeight: 1.65, fontWeight: 500 }}>
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Milestones Timeline ─── */}
      <section
        style={{
          background: "#F8F9FC",
          padding: "96px 24px",
          borderTop: "1px solid #E8EDF4",
          borderBottom: "1px solid #E8EDF4",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* heading */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-tag">History</span>
            <h2 className="section-title" style={{ color: "#173C63" }}>
              Our Journey &amp; Milestones
            </h2>
          </div>

          {/* Vertical timeline — single centred column */}
          <div style={{ position: "relative", paddingLeft: 32 }}>
            {/* vertical line */}
            <div
              style={{
                position: "absolute",
                left: 20,
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  "linear-gradient(to bottom, #E2E8F0 0%, #173C63 50%, #E2E8F0 100%)",
              }}
            />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                style={{
                  position: "relative",
                  paddingLeft: 48,
                  paddingBottom: i < milestones.length - 1 ? 48 : 0,
                }}
              >
                {/* dot */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 4,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    border: "3px solid #173C63",
                    boxShadow: "0 4px 14px rgba(23,60,99,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#173C63",
                    zIndex: 2,
                  }}
                >
                  {m.icon}
                </div>

                {/* card */}
                <div
                  className="card-vitalix"
                  style={{ padding: "24px 28px" }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: m.color,
                      background: m.bg,
                      padding: "3px 12px",
                      borderRadius: 50,
                      display: "inline-block",
                      marginBottom: 10,
                    }}
                  >
                    {m.year}
                  </span>
                  <h4
                    className="font-serif"
                    style={{ fontSize: 20, fontWeight: 700, color: "#173C63", marginBottom: 8 }}
                  >
                    {m.title}
                  </h4>
                  <p style={{ color: "#3D4D5C", fontSize: 15, lineHeight: 1.65 }}>
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section style={{ background: "#FFFFFF", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            {...fadeUp(0)}
            style={{
              background: "#F4F7FB",
              borderRadius: 28,
              border: "1px solid #E8EDF4",
              padding: "60px 48px",
              display: "flex",
              flexWrap: "wrap",
              gap: 48,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* text side */}
            <div style={{ flex: "1 1 340px", maxWidth: 480 }}>
              <span
                className="section-tag"
                style={{ background: "#FFFFFF", border: "1px solid #E8EDF4" }}
              >
                Excellence
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                  color: "#173C63",
                  lineHeight: 1.25,
                  marginBottom: 28,
                }}
              >
                Why Patients Trust MediCare
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Board-certified, highly-skilled medical specialists",
                  "Advanced smart infrastructure & EHR technologies",
                  "24/7 comprehensive emergency & critical care units",
                  "Customized treatment paradigms & active wellness focus",
                  "Ethical, transparent billing & insurance partnerships",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "rgba(39,174,96,0.1)",
                        border: "1px solid rgba(39,174,96,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#27AE60",
                        flexShrink: 0,
                      }}
                    >
                      <FaCheck size={11} />
                    </div>
                    <span style={{ color: "#3D4D5C", fontWeight: 600, fontSize: 15 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* image side */}
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: 440,
                height: 340,
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid #E8EDF4",
                boxShadow: "0 4px 24px rgba(23,60,99,0.08)",
                position: "relative",
              }}
              className="group"
            >
              <img
                src="https://images.unsplash.com/photo-1581056771107-2475d56397a5?q=80&w=2070&auto=format&fit=crop"
                alt="Hospital Facility"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(23,60,99,0.25) 0%, transparent 60%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
