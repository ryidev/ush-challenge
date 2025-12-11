"use client";
import Image from "next/image";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { MdSearch, MdBed, MdBathtub, MdClose } from "react-icons/md";
import { BiArea } from "react-icons/bi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Categories Data
  const categories = [
    { id: "all", name: "All Properties" },
    { id: "rumah", name: "Rumah" },
    { id: "apartemen", name: "Apartemen" },
    { id: "furniture", name: "Furniture" },
    { id: "kendaraan", name: "Kendaraan" }
  ];

  // Stats Data
  const stats = [
    {
      number: "750+",
      description: "Successfully built over 750 unique homes tailored to each client's vision."
    },
    {
      number: "200+",
      description: "Expertise in building functional and inspiring spaces, from offices to retail."
    },
    {
      number: "15+",
      description: "A decade of dedicated expertise ensuring timeless quality."
    },
    {
      number: "50+",
      description: "Honored with numerous industry awards for our innovative."
    }
  ];

  // Property Data with Categories
  const properties = [
    {
      id: 1,
      image: "/assets/img/furni.jpg",
      status: "For Sell",
      category: "furniture",
      location: "",
      address: "Bandaraya Georgetown, Northeast Penang, Penang",
      price: "IDR300/mo",
      bedrooms: 3,
      bathrooms: 1,
      area: "160cm",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ex sequi cumque blanditiis officia hic incidunt odio maiores, adipisci, cum rerum architecto dolore? Ea amet dolore, earum quo quos reiciendis obcaecati, culpa dolores, hic voluptatem repudiandae. Inventore unde consequuntur nam."
    },
    {
      id: 2,
      image: "/assets/img/apartmen.jpg",
      status: "For Rent",
      category: "apartemen",
      location: "Georgetown Apartment",
      address: "Bandaraya Georgetown, Northeast Penang, Penang",
      price: "IDR 4,5JT/mo",
      bedrooms: 2,
      bathrooms: 1,
      area: "400 Sqft",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ex sequi cumque blanditiis officia hic incidunt odio maiores, adipisci, cum rerum architecto dolore? Ea amet dolore, earum quo quos reiciendis obcaecati, culpa dolores, hic voluptatem repudiandae. Inventore unde consequuntur nam."
    },
    {
      id: 3,
      image: "/assets/img/urus.webp",
      status: "For Rent",
      category: "kendaraan",
      location: "Lamborghini Urus 2023",
      address: "Yogyakarta, Bantul",
      price: "IDR 1JT/day",
      bedrooms: 0,
      bathrooms: 0,
      area: "4 Seats",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ex sequi cumque blanditiis officia hic incidunt odio maiores, adipisci, cum rerum architecto dolore? Ea amet dolore, earum quo quos reiciendis obcaecati, culpa dolores, hic voluptatem repudiandae. Inventore unde consequuntur nam."
      
    },
    {
      id: 4,
      image: "/assets/img/villa.jpg",
      status: "For Rent",
      category: "rumah",
      location: "Modern Villa",
      address: "Yogyakarta, Gunung Kidul",
      price: "IDR 8JT/mo",
      bedrooms: 4,
      bathrooms: 2,
      area: "800 Sqft",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ex sequi cumque blanditiis officia hic incidunt odio maiores, adipisci, cum rerum architecto dolore? Ea amet dolore, earum quo quos reiciendis obcaecati, culpa dolores, hic voluptatem repudiandae. Inventore unde consequuntur nam."
    },
    {
      id: 5,
      image: "/assets/img/image 10.png",
      status: "For Rent",
      category: "apartemen",
      location: "Luxury Apartment",
      address: "Gurney Drive, Georgetown, Penang",
      price: "IDR 3.5JT/mo",
      bedrooms: 3,
      bathrooms: 2,
      area: "600 Sqft",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ex sequi cumque blanditiis officia hic incidunt odio maiores, adipisci, cum rerum architecto dolore? Ea amet dolore, earum quo quos reiciendis obcaecati, culpa dolores, hic voluptatem repudiandae. Inventore unde consequuntur nam."
    },
    {
      id: 6,
      image: "/assets/img/bmw.webp",
      status: "For Rent",
      category: "kendaraan",
      location: "BMW X6 2026",
      address: "Jakarta, PIK",
      price: "IDR 800K/day",
      bedrooms: 0,
      bathrooms: 0,
      area: "4 Seats",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ex sequi cumque blanditiis officia hic incidunt odio maiores, adipisci, cum rerum architecto dolore? Ea amet dolore, earum quo quos reiciendis obcaecati, culpa dolores, hic voluptatem repudiandae. Inventore unde consequuntur nam."
    }
  ];

  // Filter properties based on category and search query
  const filteredProperties = properties.filter(property => {
    const matchesCategory = selectedCategory === "all" || property.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search automatically filters as user types
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[500px] bg-black">
        <div className="absolute inset-0">
          <Image
            src="/assets/img/image 3.jpg"
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 animate-fadeInUp">
            Build Your Dream Home Live<br />the Lifestyle You Crave.
          </h1>
          <p className="text-gray-200 text-lg mb-8 max-w-2xl animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            Realize your dream home. We craft spaces that are functional, inspiring joy,<br />tranquility, and connection.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 bg-white">
        {/* Search Bar */}
        <div className="absolute -top-12 left-0 right-0 z-50 flex justify-center px-4">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-4 sm:p-6 animate-fadeInDown">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex-1 bg-[#EFF1F4] rounded-xl flex items-center px-4 sm:px-6 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#F99933]">
                <MdSearch className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-700 bg-transparent text-sm sm:text-base"
                />
                {searchQuery && (
                  <MdClose 
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors shrink-0 ml-2" 
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
              
              <button type="submit" className="bg-[#F99933] text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 whitespace-nowrap">
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <h2 className="text-center text-[#F99933] text-2xl md:text-3xl font-serif mb-12">
            Trusted by Hundreds, Recognized for Excellence.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fadeInUp hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-5xl font-bold text-[#F99933] mb-2 animate-pulse">{stat.number}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#F99933] text-3xl md:text-4xl font-serif mb-8">
            Find the property that defines your lifestyle
          </h2>
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-[#F99933] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Property Grid */}
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <motion.div 
                  key={property.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedProperty(property)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                {/* Property Image */}
                <div className="relative h-64">
                  <Image
                    src={property.image}
                    alt={property.location}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#F99933] text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      {property.status}
                    </span>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.location}</h3>
                  <p className="text-gray-600 text-sm mb-4">{property.address}</p>
                  <p className="text-[#EB5757] text-xl font-bold mb-4">{property.price}</p>
                  
                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    {property.category !== "kendaraan" ? (
                      <>
                        {/* === BEDROOMS === */}
                        <div className="flex flex-col items-center justify-center space-y-1 group"> {/* Ganti items-center horizontal jadi flex-col */}
                          
                          {/* Baris Atas: Icon + Nilai Properti (disusun Row) */}
                          <div className="flex items-center space-x-1">
                            <MdBed className="w-5 h-5 text-gray-600" />
                            <p className="text-sm font-semibold text-black">{property.bedrooms}</p>
                          </div>
                          
                          {/* Baris Bawah: Label (disusun di bawah) */}
                          <p className="text-xs text-black">Bedrooms</p>
                        </div>
                        
                        {/* === BATHROOMS === */}
                        <div className="flex flex-col items-center justify-center space-y-1 group"> {/* Ganti items-center horizontal jadi flex-col */}
                          
                          {/* Baris Atas: Icon + Nilai Properti (disusun Row) */}
                          <div className="flex items-center space-x-1">
                            <MdBathtub className="w-5 h-5 text-gray-600" />
                            <p className="text-sm font-semibold text-black">{property.bathrooms}</p>
                          </div>
                          
                          {/* Baris Bawah: Label (disusun di bawah) */}
                          <p className="text-xs text-black">Bathrooms</p>
                        </div>
                        
                        {/* === TOTAL AREA === */}
                        <div className="flex flex-col items-center justify-center space-y-1 group"> {/* Ganti items-center horizontal jadi flex-col */}
                          
                          {/* Baris Atas: Icon + Nilai Properti (disusun Row) */}
                          <div className="flex items-center space-x-1">
                            <BiArea className="w-5 h-5 text-gray-600" />
                            <p className="text-sm font-semibold text-black">{property.area}</p>
                          </div>
                          
                          {/* Baris Bawah: Label (disusun di bawah) */}
                          <p className="text-xs text-black">Total Area</p>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-3 flex flex-col items-center justify-center space-y-1 group">
                        
                        <div className="flex items-center space-x-1">
                          <BiArea className="w-6 h-6 text-gray-600" />
                          <p className="text-sm font-semibold text-black">{property.area}</p>
                        </div>
                        
                      </div>
                    )}
                </div>
                </div>
              </motion.div>
            ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">No properties found </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Modal Popup */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProperty(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="relative">
                <div className="relative h-80">
                  <Image
                    src={selectedProperty.image}
                    alt={selectedProperty.location}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <MdClose className="w-6 h-6 text-gray-800" />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#F99933] text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      {selectedProperty.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProperty.location}</h2>
                    <p className="text-gray-600 text-lg">{selectedProperty.address}</p>
                  </div>
                  <p className="text-[#EB5757] text-3xl font-bold">{selectedProperty.price}</p>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200 mb-6">
                  {selectedProperty.category !== "kendaraan" ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <MdBed className="w-6 h-6 text-[#F99933]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Bedrooms</p>
                          <p className="text-xl font-semibold text-gray-900">{selectedProperty.bedrooms}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <MdBathtub className="w-6 h-6 text-[#F99933]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Bathrooms</p>
                          <p className="text-xl font-semibold text-gray-900">{selectedProperty.bathrooms}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <BiArea className="w-6 h-6 text-[#F99933]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Area</p>
                          <p className="text-xl font-semibold text-gray-900">{selectedProperty.area}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-3 flex items-center space-x-3">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <BiArea className="w-6 h-6 text-[#F99933]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Specifications</p>
                        <p className="text-xl font-semibold text-gray-900">{selectedProperty.area}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{selectedProperty.description}</p>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#F99933] text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Contact Agent
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-800 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Schedule Tour
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}
