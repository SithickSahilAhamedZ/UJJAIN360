
import React from 'react';
// FIX: Import Variants type from framer-motion to resolve typing issues.
import { motion, Variants } from 'framer-motion';

interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
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

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = '' }) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-md p-6 ${className}`}
      variants={cardVariants}
    >
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
      {children}
    </motion.div>
  );
};

export default DashboardCard;
