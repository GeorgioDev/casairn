// React hooks for state management
import { useState } from "react";

// Animation library for React components
import { motion } from "framer-motion";

// Icons from react-icons (search and spinner icons)
import { FiSearch } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

// Custom hook for fetching release notes
import { useReleaseNotes } from "../api/get";

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
  category: string;
}

const FAQ: React.FC = () => {
  // Use the custom hook to fetch release notes
  const { data, isPending, isError, error } = useReleaseNotes();

  // State Variables
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Search Categories
  const categories = ["Hardware", "Software", "Features", "Integration"];

  // Handle category selection (toggle on second click)
  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect category if clicked twice
    } else {
      setSelectedCategory(category); // Select the clicked category
    }
  };

  // Utility function to format hardware requirements with line breaks
  const formatResponse = (text: string) => {
    return (
      <>
        {text.split("\r\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </>
    );
  };

  // Define the FAQ data with the fetched hardware requirements (if available)
const faqData: FAQItem[] = [
  {
    question: "What system requirements must be met?",
    answer: data
      ? formatResponse(data.hardware_requirements)
      : "Loading hardware requirements...",
    category: "Hardware",
  },
  {
    question: "What is Casablanca.ai?",
    answer:
      "Casablanca.ai is an AI-powered video software designed to enhance video quality and communication during Microsoft Teams meetings.",
    category: "Software",
  },
  {
    question: "How does Casablanca.ai improve video calls in MS Teams?",
    answer:
      "Casablanca.ai improves video calls by using AI to enhance image quality, reduce noise, and optimize performance, ensuring smoother video communication.",
    category: "Features",
  },
  {
    question:
      "Can Casablanca.ai integrate with other video conferencing tools?",
    answer:
      "Currently, Casablanca.ai is optimized for Microsoft Teams, but integrations with other video conferencing tools are planned for future releases.",
    category: "Integration",
  },
];


  // Filter FAQ based on the search term and category (case-insensitive)
  const filteredFAQs = faqData.filter(
    (faq) =>
      (!selectedCategory || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* FAQ Container */}
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full sm:w-11/12 md:w-10/12 lg:w-8/12">
        {/* Header inside FAQ container */}
        <div className="bg-[#1e2227] text-white p-6 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-normal">
              Frequently Asked Questions
            </h1>

            {/* Search input */}
            <div className="relative mt-4 sm:mt-0 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Your Question.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-80 text-black"
              />
              {/* Search icon */}
              <FiSearch
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full text-sm font-normal focus:outline-none transition ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="p-6">
          {/* Loader and Error Handling */}
          {isPending && (
            <div className="flex justify-center items-center py-4">
              <FaSpinner className="animate-spin text-blue-500" size={24} />
            </div>
          )}

          {isError && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {!isPending && !isError && (
            <>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div key={index} className="mb-4 border-b border-gray-300">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left py-4 focus:outline-none flex justify-between items-center"
                    >
                      <span className="text-lg sm:text-xl font-normal">
                        {faq.question}
                      </span>
                      <motion.span
                        className="text-gray-500"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </button>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: activeIndex === index ? "auto" : 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.6, 0.01, -0.05, 0.95],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="py-4 text-gray-700 font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No results found for "{searchTerm}" in{" "}
                  {selectedCategory ? selectedCategory : "All"} category.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
