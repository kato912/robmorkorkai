import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Star } from "lucide-react";

export const AIResultCard: React.FC<{ result: any }> = ({ result }) => {
    return (
        <Link to={`/shop/${result.id}`} className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100 hover-shadow transition-all">
                <div className="card-body">
                    <div className="d-flex align-items-start gap-3">
                        {/* Icon Box */}
                        <div className="bg-warning bg-opacity-10 p-2 rounded-3 text-warning">
                            <Trophy size={24} />
                        </div>

                        <div className="flex-grow-1">
                            {/* Match Badge */}
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3">
                                    Match {result.match}%
                                </span>
                                <small className="text-muted d-flex align-items-center gap-1">
                                    <Star size={12} className="fill-warning text-warning" /> 4.8
                                </small>
                            </div>

                            <h5 className="fw-bold text-dark mb-1">{result.name}</h5>
                            <p className="text-secondary small mb-3">"{result.reason}"</p>

                            <div className="text-primary fw-bold small">
                                ดูรายละเอียด →
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};