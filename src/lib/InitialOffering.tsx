import { motion } from "framer-motion";
import { FaLeaf, FaRobot, FaTint } from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf className="text-green-600 text-3xl mb-2" />,
    title: "Smart health sensors",
    desc: "Monitors temperature, humidity, sunlight, and soil moisture continuously.",
  },
  {
    icon: <FaRobot className="text-green-600 text-3xl mb-2" />,
    title: "AI driven insights",
    desc: "Personalized insights like 'Move plant to a location with less sunlight' via intuitive mobile app.",
  },
  {
    icon: <FaTint className="text-green-600 text-3xl mb-2" />,
    title: "Automated watering",
    desc: "Smart pump delivers the exact amount of water your plant needs.",
  },
];

export default function InitialOffering() {
  return (
    <div id="offering" className="w-full flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Initial Offering</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 dark:border-zinc-800"
          >
            {f.icon}
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 