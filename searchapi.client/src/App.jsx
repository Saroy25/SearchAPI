import { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling
function App() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                const data = await response.json();
                setCountries(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="container">
            <h1>List of Countries</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by country name..."
                className="search-input"
            />
            <table className="country-table">
                <thead>
                    <tr>
                        <th>Common Name</th>
                        <th>Official Name</th>
                        <th>ISO Code</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCountries.map((country, index) => (
                        <tr key={index}>
                            <td>{country.name.common}</td>
                            <td>{country.name.official}</td>
                            <td>{country.cca2} / {country.cca3}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default App;
