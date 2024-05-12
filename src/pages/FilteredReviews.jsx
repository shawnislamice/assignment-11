import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';

const FilteredReviews = () => {
   
    const reviews=useLoaderData()
    console.log(reviews);
   
    return (
        <div className='container mx-auto max-w-screen-xl my-5 md:my-10'>
           <h2>Reveiws</h2>
           
        </div>
    );
};

export default FilteredReviews;