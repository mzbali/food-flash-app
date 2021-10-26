import React, { Fragment, useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import MealsSummary from './MealsSummary';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [meals, setMeals] = useState([]);

  const mealsDataHandler = (meals) => {
    const mealsList = [];
    for (let key in meals) {
      mealsList.push({
        id: key,
        name: meals[key].name,
        description: meals[key].description,
        price: meals[key].price,
      });
    }
    setMeals(mealsList);
  };

  useEffect(() => {
    sendRequest(
      {
        url: 'https://react-http-d90c3-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json',
      },
      mealsDataHandler
    );
  }, [sendRequest]);

  let mealsList = <p>No meals Found</p>;
  if (meals.length > 0) {
    mealsList = (
      <ul>
        {meals.map((item) => (
          <MealItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </ul>
    );
  } else if (isLoading) {
    mealsList = <p>Loading...</p>;
  } else if (error) {
    mealsList = <p>Something went wrong</p>;
  }

  return (
    <Fragment>
      <MealsSummary />
      <Card className={classes.meals}>{mealsList}</Card>
    </Fragment>
  );
};

export default AvailableMeals;
