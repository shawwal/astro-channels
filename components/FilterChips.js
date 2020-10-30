import React, { useEffect, useState } from "react";
import { Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { filterAtom } from '../src/atoms';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const FilterChips = () => {

  const classes = useStyles();

  const [categoryList, setCategoryList] = useRecoilState(filterAtom);

  const categoryArray = [
    { id: 1, value: "Movies", isChecked: false },
    { id: 2, value: "Sport", isChecked: false },
    { id: 3, value: "Kids", isChecked: false },
    { id: 4, value: "Learning", isChecked: false },
    { id: 5, value: "Music", isChecked: false },
    { id: 6, value: "News", isChecked: false },
    { id: 7, value: "Lifestyle", isChecked: false },
    { id: 8, value: "Variety Entertainment", isChecked: false },
    { id: 9, value: "Special Interest", isChecked: false },
    { id: 10, value: "Radio", isChecked: false },
  ];

  const [categoryItems, setCategoryItems] = useState(categoryArray);
  const [items, setItems] = useState([]);
  const addItems = (data) => {
    const newList = categoryItems.map((item) => {
      if (item.id === data.id) {
        const updatedItem = {
          ...item,
          isChecked: !item.isChecked,
        };

        return updatedItem;
      }
      return item;
    });
    setCategoryItems(newList);
    const found = items.some(obj => obj.id === data.id);
    if (!found) {
      setItems([...items, { id: data.id, category: data.value }]);
    } else {
      const filteredItems = items.filter(item => item.id !== data.id);
      setItems(filteredItems);
    }
  }

  useEffect(() => {
    const categoryString = JSON.stringify(items.map(obj => obj.category));
    setCategoryList(categoryString);
  }, [items]);

  return (
    <div>
      <Typography>Categories</Typography>
      <div className={classes.chips}>
        {categoryItems.map((obj, index) => {
          return (
            <Chip
              key={index}
              label={obj.value}
              color={obj.isChecked == true ? "primary" : "default"}
              onClick={() => addItems(obj)} />
          )
        })}
      </div>
    </div>

  )
}

export default FilterChips