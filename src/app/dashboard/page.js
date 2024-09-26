"use client"

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchList from '@/components/SearchList';

function Dashboard() {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div>
            <Navbar onSearch={handleSearchResults} />
            <h1 className="text-2xl font-semibold text-center text-[#1ed760] mb-6 mt-2">Resultados de busqueda</h1>
            <SearchList data={searchResults} />
        </div>
    );
}

export default Dashboard;