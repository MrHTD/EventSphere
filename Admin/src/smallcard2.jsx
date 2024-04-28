import React from 'react'

export const SmallCard2 = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row alig n-items-start">
                    <div className="col-8">
                        <h5 className="card-title mb-9 fw-semibold"> Monthly Earnings </h5>
                        <h4 className="fw-semibold mb-3">$6,820</h4>
                        <div className="d-flex align-items-center pb-1">
                            <span
                                className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-down-right text-danger"></i>
                            </span>
                            <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                            <p className="fs-3 mb-0">last year</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="d-flex justify-content-end">
                            <div
                                className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                <i className="ti ti-currency-dollar fs-6"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="earning"></div>
        </div>
    )
}
