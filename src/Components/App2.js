import React, { useState, useEffect} from 'react'
import axios from 'axios'
import {Ghost} from 'react-kawaii';
import './index.css'

const App = () =>{

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    useEffect (() => {
        if(search){
            handleSearch();
        }        
    }, [ search ]);
    
    const handleSearch = async () => {
        const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: search
                }
            })
            setResults( data.query.search );
    }

    return(
        <div>
                <div className="col-auto" style={{margin: '10px'}}>
                    <input 
                    type="Search" 
                    className="form-control" 
                    id="Searchhere" 
                    placeholder="Search here" 
                    value={search}
                    onChange={(e) => setSearch( e.target.value )} />
                </div>

            {search && results.map((item) =>{
                return(
                        <div key={item.pageid} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text"><span dangerouslySetInnerHTML={{ __html: item.snippet }}></span></p>
                            <a href={`https://en.wikipedia.org?curid=${item.pageid}`} target="_blank" className="btn btn-success">View more!</a>
                        </div>
                        </div>
                        )
                    })
            }
            {!search && <div className="Ghost">
                <Ghost size={280} mood="blissful" color="#83D1FB" />
                </div>}

        </div>
    )
}

export default App;