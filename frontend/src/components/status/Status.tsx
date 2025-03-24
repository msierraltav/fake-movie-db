type StatusProps = {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    millisecondsTaken: number;
};

function Status({currentPage, totalItems, totalPages, pageSize, millisecondsTaken} : StatusProps) {
    return (
        <div className="status-container">
            Page: {currentPage} of {totalPages} | Total: {totalItems} | Size: {pageSize} | Time: {millisecondsTaken.toFixed(2)}ms
        </div>
    ) 
};

export default Status;