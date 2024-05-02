import React from 'react'

export const Charts = () => {
    return (
        <div className="d-flex align-items-strech">
            <div className="card w-100">
                <div className="card-body">
                    <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                        <div className="mb-3 mb-sm-0">
                            <h5 className="card-title fw-semibold">Sales Overview</h5>
                        </div>
                        <div>
                            <select className="form-select">
                                <option value="1">March 2024</option>
                                <option value="2">April 2024</option>
                            </select>
                        </div>
                    </div>
                    <div id="chart"></div>
                </div>
            </div>
        </div>
    )
}
