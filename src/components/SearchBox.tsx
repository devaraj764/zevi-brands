import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    styles?: object
    text: string
    setText: (val: string) => void
    focused?: (val: boolean) => void
}

const SearchBox: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get the current query from the URL
    const queryParams = new URLSearchParams(location.search);
    const initialSearchQuery = queryParams.get('search') || '';

    // Update the URL query string when the state changes
    React.useEffect(() => {
        if (props.text && props.text !== '') {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?search=${props.text}`;
            window.history.pushState({ path: newurl }, '', newurl);
        } else {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({ path: newurl }, '', newurl);
        }
    }, [props, location.search, navigate]);

    React.useEffect(() => {
        if (initialSearchQuery) {
            props.setText(initialSearchQuery)
        }
        // eslint-disable-next-line
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setText(event.target.value);
    };

    return (
        <div className="search-box" style={{ ...props?.styles }}>
            <input
                onFocus={() => props.focused ? props.focused(true) : null}
                value={props.text} onChange={handleInputChange} className="search-box-input" type="text" placeholder="Search" />
            <CiSearch size={42} color='#200E3266' />
        </div>
    )
}

export default SearchBox