"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { news } from '../utilfunctions/interfaces';
import { formatDate } from '../utilfunctions/dateFormatter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoRotate } from '../hooks/useAutoRotate';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function SmallNewsCarousel() {
  const [news, setNews] = useState<news[]>([]);
  const { currentIndex } = useAutoRotate(news, 5000);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `/api/searcharticles?num=3&randomize=false&sortBy=created_datetime&order=DESC`
        );
        const data = await response.json();
        if (response.ok) {
          setNews(data);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="section-pattern-circuit">
      <motion.div 
        className="container mx-auto px-4 py-4 bg-white/90 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="flex gap-6 overflow-x-auto no-scrollbar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {news.map((item, index) => (
              <motion.div
                key={item.articleId}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                style={{
                  flex: "0 0 auto",
                  width: "400px",
                  opacity: index === currentIndex ? 1 : 0.7,
                  transform: `scale(${index === currentIndex ? 1 : 0.98})`,
                  transition: 'all 0.3s ease'
                }}
              >
                <Link href={`/view/${item.articleId}`} className="block group">
                  <motion.div 
                    className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 pr-8 hover:bg-gray-100/80 transition-colors"
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  >
                    <motion.div 
                      className="w-20 h-20 flex-shrink-0 overflow-hidden rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={item.sphoto}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <motion.span 
                          className="text-[11px] text-blue-500 font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.type}
                        </motion.span>
                        <span className="text-[11px] text-gray-500">
                          {formatDate(new Date(item.created_datetime || Date.now()))}
                        </span>
                      </div>
                      <motion.h3 
                        className="text-sm font-medium line-clamp-2 text-gray-900 group-hover:text-blue-500 transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        {item.title}
                      </motion.h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 