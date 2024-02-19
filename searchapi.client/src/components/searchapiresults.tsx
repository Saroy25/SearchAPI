/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState, useEffect } from 'react';
//import axios from 'axios';

function SearchData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [newItemName, setNewItemName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await axios.get('https://api.example.com/data');
                const response = await fetch(`https://api.example.com/search?query=${searchTerm}`);
                setData(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleNewItemChange = (event) => {
        setNewItemName(event.target.value);
    };

    //const handleAddNewItem = async () => {
    //    try {
    //        //const response = await axios.post('https://api.example.com/data', {
    //        const response = await fetch(`https://api.example.com/search?query=${searchTerm}`); { }
    //            name: newItemName
    //        });
    //        setData([...data, response.data]);
    //        setNewItemName('');
    //    } catch (error) {
    //        console.error('Error adding new item:', error);
    //    }
    //};

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Search and Add Items</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {filteredData.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Enter new item name"
                    value={newItemName}
                    onChange={handleNewItemChange}
                />
               {/* <button onClick={handleAddNewItem}>Add Item</button>*/}
            </div>
        </div>
    );
}

export default SearchData;
