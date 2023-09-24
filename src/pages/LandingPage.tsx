import React from 'react'
import SearchBox from '../components/SearchBox';
import TrendsBox from '../components/TrendsBox';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
    const [searchKey, setSearchKey] = React.useState<string>('');
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    return (
        <div className="LandingPage">
            <div className="flex-end">
                <Logo />
            </div>
            <div className="container flex-centered" style={{ flexDirection: 'column' }}>
                <SearchBox focused={setIsFocused} text={searchKey} setText={setSearchKey} />
                {
                    isFocused &&
                    <TrendsBox searchKey={searchKey} />
                }
            </div>
        </div>
    )
}

export default LandingPage