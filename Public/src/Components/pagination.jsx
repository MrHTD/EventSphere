import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const APagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <Pagination className='shadow-lg'>
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </Pagination.Prev>
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </Pagination.Next>
        </Pagination>
    );
};

export default APagination;