import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, ArrowUpDown, ExternalLink } from 'lucide-react';
import { University } from '../types';
import axios from 'axios';

const mockUniversities: University[] = [
  {
    id: '1',
    name: 'University of Melbourne',
    location: 'Melbourne, Victoria',
    image: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A leading research university with a tradition of excellence in teaching and research, consistently ranked among the world\'s top universities.',
    ranking: 1,
    website: 'https://www.unimelb.edu.au',
    programs: ['Business', 'Engineering', 'Medicine', 'Arts'],
  },
  {
    id: '2',
    name: 'University of Sydney',
    location: 'Sydney, New South Wales',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Australia\'s first university with an outstanding global reputation for academic and research excellence.',
    ranking: 2,
    website: 'https://www.sydney.edu.au',
    programs: ['Law', 'Science', 'Architecture', 'Medicine'],
  },
  {
    id: '3',
    name: 'Australian National University',
    location: 'Canberra, ACT',
    image: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Australia\'s highest-ranked university focused on research and education, located in the nation\'s capital.',
    ranking: 3,
    website: 'https://www.anu.edu.au',
    programs: ['Politics', 'Research', 'Economics', 'Science'],
  },
  {
    id: '4',
    name: 'University of Queensland',
    location: 'Brisbane, Queensland',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A research-intensive university known for excellence in science, medicine, and engineering.',
    ranking: 4,
    website: 'https://www.uq.edu.au',
    programs: ['Medicine', 'Engineering', 'Agriculture', 'Business'],
  },
  {
    id: '5',
    name: 'Monash University',
    location: 'Melbourne, Victoria',
    image: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A public research university with a global reputation for excellence in research and teaching.',
    ranking: 5,
    website: 'https://www.monash.edu',
    programs: ['Pharmacy', 'Engineering', 'Business', 'Arts'],
  },
  {
    id: '6',
    name: 'University of Western Australia',
    location: 'Perth, Western Australia',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A research-intensive university with strong connections to industry and government in Western Australia.',
    ranking: 6,
    website: 'https://www.uwa.edu.au',
    programs: ['Mining', 'Medicine', 'Business', 'Science'],
  },
];

const UniversitiesPage: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from your API
        // const response = await axios.get('/api/universities');
        // setUniversities(response.data);
        
        // Mock data
        setUniversities(mockUniversities);
        setFilteredUniversities(mockUniversities);
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Filter universities when search term or filters change
  useEffect(() => {
    let results = universities;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(university => 
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by location
    if (selectedLocation) {
      results = results.filter(university => 
        university.location.includes(selectedLocation)
      );
    }
    
    // Filter by program
    if (selectedProgram) {
      results = results.filter(university => 
        university.programs.some(program => 
          program.toLowerCase() === selectedProgram.toLowerCase()
        )
      );
    }
    
    // Sort by ranking
    results = [...results].sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.ranking - b.ranking
        : b.ranking - a.ranking;
    });
    
    setFilteredUniversities(results);
  }, [universities, searchTerm, selectedLocation, selectedProgram, sortOrder]);

  // Extract unique locations and programs for filter options
  const locations = [...new Set(universities.map(university => university.location.split(',')[1].trim()))];
  const programs = [...new Set(universities.flatMap(university => university.programs))];

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedProgram('');
    setSortOrder('asc');
  };

  return (
    <div className="min-h-screen pt-16">
      <div 
        className="bg-cover bg-center py-20 relative"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' 
        }}
      >
        <div className="absolute inset-0 bg-primary-900 bg-opacity-70"></div>
        <div className="container-custom relative z-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Australian Universities</h1>
          <p className="text-lg max-w-2xl mb-8">
            Explore top universities in Australia and find the perfect institution for your academic journey.
          </p>
          
          <div className="bg-white rounded-lg p-1 flex max-w-2xl">
            <div className="flex-grow">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search universities or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none"
                />
              </div>
            </div>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Filter size={20} className="mr-2" /> Filters
                  </h2>
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Reset All
                  </button>
                </div>
                
                {/* Location Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Location</h3>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Program Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Program</h3>
                  <select 
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Programs</option>
                    {programs.map((program, index) => (
                      <option key={index} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Ranking Sort */}
                <div>
                  <h3 className="font-medium mb-3">Sorting</h3>
                  <button 
                    onClick={toggleSortOrder}
                    className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <span>Ranking: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}</span>
                    <ArrowUpDown size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Universities List */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {filteredUniversities.length} universities
                </p>
                <div>
                  <span className="text-gray-600 mr-2">Sort by:</span>
                  <button 
                    onClick={toggleSortOrder}
                    className="text-primary-600 font-medium flex items-center"
                  >
                    Ranking {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-12">
                  <p>Loading universities...</p>
                </div>
              ) : filteredUniversities.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600 mb-4">No universities found matching your criteria.</p>
                  <button 
                    onClick={resetFilters}
                    className="text-primary-600 font-medium"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredUniversities.map((university) => (
                    <div key={university.id} className="card overflow-hidden group hover:shadow-xl transition-shadow">
                      <div 
                        className="h-48 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${university.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center text-sm">
                            <MapPin size={16} className="mr-1" />
                            <span>{university.location}</span>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-accent-600 text-white px-2 py-1 rounded text-sm font-medium">
                          Rank #{university.ranking}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                          {university.name}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {university.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Programs:</h4>
                          <div className="flex flex-wrap gap-2">
                            {university.programs.map((program, index) => (
                              <span 
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                              >
                                {program}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <a 
                            href={`/universities/${university.id}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            View Details
                          </a>
                          <a 
                            href={university.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                          >
                            Official Website <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesPage;