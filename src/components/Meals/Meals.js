import React from "react";
import MealsSumary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSumary></MealsSumary>
      <AvailableMeals></AvailableMeals>
    </React.Fragment>
  );
};

export default Meals;
