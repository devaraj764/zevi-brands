import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'

interface CollapsibleProps {
    children: React.ReactNode;
    title: string
    collapsed: boolean
}

function Collapsible({ children, title, collapsed }: CollapsibleProps) {
    const [isCollapsed, setCollapsed] = useState<boolean>(collapsed);

    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };

    return (
        <div className="collapsible">
            <div className="flex-space-between" style={{ cursor: 'pointer' }} onClick={toggleCollapse}>
                <div className="collapsible-title">{title}</div>
                <div style={{ cursor: 'pointer' }}>
                    {!isCollapsed ? <SlArrowUp /> : <SlArrowDown />}
                </div>
            </div>
            {
                !isCollapsed &&
                <div className="collapsible-body">
                    {children}
                </div>
            }
        </div>
    );
}

export default Collapsible;
