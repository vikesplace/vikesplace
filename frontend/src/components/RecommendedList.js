import * as React from "react";
import { useRef, useState } from "react";
import BasicCard from "./BasicCard";
import "./RecommendedList.css";


function RecommendedList(props) {
  const [scrollPosition, setScrollPostion] = useState(0);
  const containerRef = useRef();
  const { data } = props;
  return (
    <div className="container">
      <div ref={containerRef} className="container-ref">
        <div className="content-box">
          {data.map((item) => (
            <BasicCard
              id={item.id}
              title={item.title}
              price={item.price}
              status={item.status}
              location={item.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedList;
