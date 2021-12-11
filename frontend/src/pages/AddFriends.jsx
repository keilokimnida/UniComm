import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import MainLayout from '../layout/MainLayout';
import FriendListBox from '../components/FriendListBox';
import ENUMS from '../config/enums';

import { getToken } from '../utils/localStorageUtils';
import APP_CONFIG from '../config/appConfig';

const AddFriends = () => {
    const navigate = useNavigate();
    const token = getToken();
    let accountID;
    if (token) {
        const decodedToken = jwt_decode(token);
        accountID = decodedToken.account_id;
    }
    // State declarations
    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInput = (event) => {
        setSearchValue(() => event.target.value);
    };

    const handleSearchSubmit = async (event) => {

        event.preventDefault();

        if (searchValue === "") {
            setUsers(() => []);
            return;
        }

        try {
            const res = await axios.get(`${APP_CONFIG.baseUrl}/account/search/${searchValue}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = res.data;
            console.log(data);
            setUsers(() => data);
            console.log(users);
        }
        catch (error) {
            console.log(error);
            toast.error("Someting went wrong!");
        };
    };

    return (
        <MainLayout title="Add Friends">
            <form className="c-Add-friends" onSubmit={(event) => handleSearchSubmit(event)} >
                <div className="c-Add-friends__Card c-Card">
                    <h1>Add Friends</h1>
                    <div className="c-Add-friends__Search">
                        <IconContext.Provider value={{ color: "#9D9D9D", size: "21px" }}>
                            <AiIcons.AiOutlineSearch className="c-Search__Icon" />
                        </IconContext.Provider>
                        <input type="text" placeholder="Hit enter to search" value={searchValue} onChange={(event) => handleSearchInput(event)} />
                    </div>
                    <div className="c-Add-friends__List">
                        {
                            users.length > 0 ?
                                users.map((data, index) => {
                                    return <FriendListBox
                                        key={index}
                                        accData={data}
                                        username={data.username}
                                        type={ENUMS.friendListMode.ADD}
                                    />
                                }
                                )
                                :
                                <p className="c-List__Empty">No accounts found!</p>
                        }
                    </div>
                    <div className="c-Add-friends__Back">
                        <NavLink to="/friends" className="c-Btn c-Btn--primary-ocean">Back to Friends</NavLink>
                    </div>
                </div>
            </form>
        </MainLayout>
    )
}

export default AddFriends;