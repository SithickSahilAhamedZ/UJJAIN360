
import React from 'react';
// FIX: Import Variants type from framer-motion to resolve typing issues.
import { motion, Variants } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string;
  // FIX: Specify that the icon element accepts a className prop to resolve React.cloneElement typing error.
  icon: React.ReactElement<{ className?: string }>;
  color: string;
}

// FIX: Explicitly type `cardVariants` with the `Variants` type from framer-motion
// to ensure properties like `ease` are correctly typed as literals, not strings.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
};


const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, color }) => {
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-600`;

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4"
      variants={cardVariants}
    >
      <div className={`p-3 rounded-lg ${bgColor}`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${textColor}` })}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
};

export default KpiCard;
