import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from "motion/react"
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') {
      return blogs
    }
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.description.toLowerCase().includes(input.toLowerCase())
    );


  }

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            {menu === item && (
              <motion.div layoutId='underline'
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute inset-0 h-7 bg-primary rounded-full z-0"
              ></motion.div>
            )}
            <button
              onClick={() => setMenu(item)}
              className={`relative z-10 cursor-pointer px-4 pt-0.5 ${menu === item ? 'text-white' : 'text-gray-500'
                }`}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8
      sm:mx-16 xl:mx-40'>
        {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogList;
