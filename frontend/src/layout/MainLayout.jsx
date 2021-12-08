import React from 'react';

import Header from './Header';
import Title from './Title';

const MainLayout = ({ children, title }) => {
    return (
        <main className = "c-Main">
            <Header />
            <Title title={title} />
            <div className = "c-Main__Content">
                {children}
            </div>
        </main>
    )
}

export default MainLayout;