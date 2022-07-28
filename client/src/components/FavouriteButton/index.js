import React, { useState, useEffect } from 'react';
import {FaHeart} from 'react-icons/fa'
import { saveBabysitterIds, getSavedBabysitterIds } from '../../utils/localStorage';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { SAVE_BABYSITTER } from '../../utils/mutations'
import Auth from '../../utils/auth';
import { QUERY_SINGLE_BABYSITTER } from '../../utils/queries';

const FavouriteButton = () => {
    const [saveBabysitter, { error }] = useMutation(SAVE_BABYSITTER);


    const [savedBabysitterIds, setSavedBabysitterIds] = useState(getSavedBabysitterIds());


    useEffect(() => {
        return () => saveBabysitterIds(savedBabysitterIds);
    });

    const { babysitterId } = useParams();

    const { data } = useQuery(QUERY_SINGLE_BABYSITTER, {

        variables: { babysitterId: babysitterId },
    });
    console.log(babysitterId)
    const babysitter = data?.babysitter || {};


    const handleSaveBabysitter = async () => {

        const babysitterId = data.babysitter._id
        console.log(babysitterId)

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {

            await saveBabysitter({
                variables: { babysitterId }
            });

            if (error) {
                throw new Error('something went wrong!');
            }

            setSavedBabysitterIds([...savedBabysitterIds, babysitterId]);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            {Auth.loggedIn() && (
                <FaHeart 
                    disabled={savedBabysitterIds?.some((savedBabysitterId) => savedBabysitterId === babysitter.babysitterId)}
                    className='icon'
                    onClick={() => handleSaveBabysitter(babysitter.babysitterId)}
                />
            )}
        </>
    );
};

export default FavouriteButton;