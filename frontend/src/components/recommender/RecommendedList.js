import * as React from "react";
import "./RecommendedList.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RecommendedItem from "./RecommendedItem";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
    slidesToSlide:5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide:1
  }
};

function RecommendedList(props) {

  var { data } = props;

  return (
    <Carousel 
    responsive={responsive}
    swipeable={true}
    draggable={true}
    customTransition="all .5"
    transitionDuration={500}
    containerClass="carousel-container"
    itemClass="carousel-item-padding-40px"
  
    >
      {data?.map((item) => (
        <div key={'div' + item.id}>
        <RecommendedItem
          id={item.id}
          title={item.title}
          price={item.price}
          status={item.status}
          location={item.location}
        />
        </div>
      ))}
      </Carousel>
  );
}

export default RecommendedList;
