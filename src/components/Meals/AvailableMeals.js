import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setHttpError(null);
    let response = await fetch(
      "https://react-http-f2474-default-rtdb.firebaseio.com/meals.json"
    );

    if (!response.ok) throw new Error("Something went wrong");

    let data = await response.json();

    let loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        key: key,
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler().catch((error) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, [fetchMoviesHandler]);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
