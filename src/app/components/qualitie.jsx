import React from "react";

const Qualitie = ({ q }) => {
  return (
    <span key={q._id} className={"badge bg-" + q.color + " m-1"}>
      {q.name}
    </span>
  );
};

export default Qualitie;
