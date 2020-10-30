import React, { useState } from "react";
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  
  const checkboxes = [
    { id: 1, value: "Movies", isChecked: false },
    { id: 2, value: "Sport", isChecked: false },
    { id: 3, value: "Kids", isChecked: false },
    { id: 4, value: "Learning", isChecked: false },
    { id: 5, value: "Music", isChecked: false },
    { id: 6, value: "News", isChecked: false },
    { id: 7, value: "Lifestyle", isChecked: false },
    { id: 8, value: "Variety Entertainment", isChecked: false },
    { id: 9, value: "Special Interest", isChecked: false },
    { id: 6, value: "Radio", isChecked: false },
    
  ];
  const [checkItems, setCheckItems] = useState(checkboxes);
  const [items, setItems] = useState([]);
  const addItems = (data) => {
    const newList = checkItems.map((item) => {
      if (item.id === data.id) {
        const updatedItem = {
          ...item,
          isChecked: !item.isChecked,
        };

        return updatedItem;
      }
      return item;
    });
    setCheckItems(newList);
    const found = items.some(obj => obj.id === data.id);
    if (!found) {
      setItems([...items, data]);
    } else {
      const filteredItems = items.filter(item => item.id !== data.id);
      setItems(filteredItems);
    }
  }
  return (
    <div className={classes.chips}>
      {checkItems.map((obj, index) => {
        return (
          <Chip
            key={index}
            label={obj.value}
            color={obj.isChecked == true ? "primary" : "default"}
            onClick={() => addItems(obj)} />
        )
      })}
      {items.map((obj, index) => {
        return (
          <div key={index}>
            <p>{obj.value}</p>
          </div>
        )
      })}
    </div>

  )
}

export default FilterChips