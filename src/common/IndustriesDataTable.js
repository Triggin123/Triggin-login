import React from 'react';

const IndustriesDataTable = ({ data }) => {
    return (
        <div>
            {Object.keys(data).map(industry => (
                <div key={industry}>
                    <h2>{industry}</h2>
                    {Object.keys(data[industry]).map(category => (
                        <div key={category}>
                            <h3>{category}</h3>
                            <ul>
                                {data[industry][category].map(subcategory => (
                                    <li key={subcategory}>{subcategory}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
    
}

export default IndustriesDataTable;