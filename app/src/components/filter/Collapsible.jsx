import React from "react";

const Collapsible = ({ title, children }) => {
    const [
        isExpanded,
        setIsExpanded
    ] = React.useState(false);

    const ref = React.useRef();

    const [height, setHeight] = React.useState();

    const handleToggle = e => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
        setHeight(ref.current.clientHeight);
    };

    const classes = `list-group-item ${isExpanded ? "is-expanded" : ""
        }`;
    const currentHeight = isExpanded ? height : 0;
    return (
        <div
            className={classes}
        >
            <div className="card-title"
                onClick={handleToggle}>
                {title}
            </div>
            <div
                className="card-collapse"
                style={{ height: currentHeight + "px" }}
            >
                <div className="card-body" ref={ref}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Collapsible;
