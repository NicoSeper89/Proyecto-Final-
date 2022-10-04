import { Box } from "@chakra-ui/react";
import React from "react";
// import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import StarRatings from 'react-star-ratings';

export default function Rating({rating, ratingAmount}) {
  /* const rating = 0;
  const numReviews = 0; */

  return (
    <Box>
      <Box d="flex" alignItems="center">
        {/* {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })} */}
        <StarRatings
         starDimension={"2rem"}
          rating={rating}
          starRatedColor="#F6AD55"
          numberOfStars={5}
          name='rating'
        />
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {ratingAmount} {ratingAmount > 1 && "s"}
        </Box>
      </Box>
    </Box>
  );
}
