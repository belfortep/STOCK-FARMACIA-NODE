import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
export const Medicines = () => {

  const [solids, setSolids] = useState([]);
  const [liquids, setLiquids] = useState([]);
  const [psychos, setPsychos] = useState([]);

  useEffect(()=>{

    const fetchSolid = async () =>{
      const res = await axios.get('http://localhost:4000/api/solid');
      setSolids(res.data);
    };
    const fetchLiquid = async () =>{
      const res = await axios.get('http://localhost:4000/api/liquid');
      setLiquids(res.data);
    };
    const fetchPsycho = async () =>{
      const res = await axios.get('http://localhost:4000/api/psycho');
      setPsychos(res.data);
    };
    const fetchMedicines = async()=>{
      fetchSolid();
      fetchLiquid();
      fetchPsycho();
    }
    fetchMedicines();

  }, [solids, liquids, psychos]);

  return (
    <>
      <h1>Medicines</h1>
      <div>
        <ul>
          {solids.map(solid =>(
            <li key={solid._id}>{solid.name}</li>
          ))}
        </ul>
        <ul>
          {liquids.map(liquid =>(
            <li key={liquid._id}>{liquid.name}</li>
          ))}
        </ul>
        <ul>
          {psychos.map(psycho =>(
            <li key={psycho._id}>{psycho.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
