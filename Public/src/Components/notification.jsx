import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = () => {

    const notify = () => toast("Payment received from John Doe of $385.90");
    const notifySale = () => toast.success("New sale recorded #ML-3467");

    return (
        <div className="col-lg-12 d-flex align-items-stretch">
            <div className="card mb-0">
                <div className="card-body p-4 pb-5">
                    <div className="mb-4">
                        <h6 className="card-title fw-semibold">Notification</h6>
                    </div>
                    <ul className="timeline-widget mb-0 position-relative mb-n5">
                        <li className="timeline-item d-flex position-relative overflow-hidden">
                            <div className="timeline-time text-dark flex-shrink-0 text-end">12:00 pm</div>
                            <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8"></span>
                                <span className="timeline-badge-border d-block flex-shrink-0"></span>
                            </div>
                            <div className="timeline-desc fs-3 text-dark mt-n1">
                                Payment received from John Doe of $385.90
                                <button onClick={notify}>Notify Payment</button> {/* Notify button */}
                            </div>
                        </li>
                        <li className="timeline-item d-flex position-relative">
                            <div className="timeline-time text-dark flex-shrink-0 text-end">10:00 am</div>
                            <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                <span className="timeline-badge border-2 border border-info flex-shrink-0 my-8"></span>
                                <span className="timeline-badge-border d-block flex-shrink-0"></span>
                            </div>
                            <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">New sale recorded
                                <a href="" className="text-primary d-block fw-normal">#ML-3467</a>
                                <button onClick={notifySale}>Notify Sale</button> {/* Notify button */}
                            </div>
                        </li>
                    </ul>
                    {/* Place the ToastContainer within the same parent element */}
                    <ToastContainer position="top-center" />
                </div>
            </div>
        </div>
    );
}