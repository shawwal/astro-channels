import React, { useEffect, useState } from "react";
import { Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import {
  categoryAtom, selectedCategory, categoryArray,
  languageAtom, selectedLanguage, languageArray,
  resolutionAtom, selectedResolution, resultionsArrayList
} from '../src/atoms';

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

  // Recoil State
  const [categoryList, setCategoryList] = useRecoilState(categoryAtom);
  const [languageList, setLanguageList] = useRecoilState(languageAtom);
  const [resList, setResList] = useRecoilState(resolutionAtom);

  // Recoil
  // Category Start

  const [categoryItems, setCategoryItems] = useRecoilState(categoryArray);
  const [items, setItems] = useRecoilState(selectedCategory);

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

  // Category End

  // Language Start

  const [languageItems, setArrayItems] = useRecoilState(languageArray);
  const [selectedLanguageItems, setLanguageItems] = useRecoilState(selectedLanguage);

  const addLanguageItems = (data) => {
    const newList = languageItems.map((item) => {
      if (item.id === data.id) {
        const updatedItem = {
          ...item,
          isChecked: !item.isChecked,
        };

        return updatedItem;
      }
      return item;
    });
    setArrayItems(newList);
    const found = selectedLanguageItems.some(obj => obj.id === data.id);
    if (!found) {
      setLanguageItems([...selectedLanguageItems, { id: data.id, category: data.value }]);
    } else {
      const filteredItems = selectedLanguageItems.filter(item => item.id !== data.id);
      setLanguageItems(filteredItems);
    }
  }
  useEffect(() => {
    const languageString = JSON.stringify(selectedLanguageItems.map(obj => obj.category));
    setLanguageList(languageString);
  }, [selectedLanguageItems]);

  // Language End

  // Resolution Start


  const [resolutionItems, setResItems] = useRecoilState(resultionsArrayList);
  const [selectedResolutionItems, setSelectedResoltuion] = useRecoilState(selectedResolution);
  
  const addResolutionItems = (data) => {
    const newList = resolutionItems.map((item) => {
      if (item.id === data.id) {
        const updatedItem = {
          ...item,
          isChecked: !item.isChecked,
        };

        return updatedItem;
      }
      return item;
    });
    setResItems(newList);
    const found = selectedResolutionItems.some(obj => obj.id === data.id);
    if (!found) {
      setSelectedResoltuion([...selectedResolutionItems, { id: data.id, category: data.value }]);
    } else {
      const filteredItems = selectedResolutionItems.filter(item => item.id !== data.id);
      setSelectedResoltuion(filteredItems);
    }
  }
  useEffect(() => {
    const resString = JSON.stringify(selectedResolutionItems.map(obj => obj.category));
    setResList(resString);
  }, [selectedResolutionItems]);

  // Resolution End

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
      <Typography>Languages</Typography>
      <div className={classes.chips}>
        {languageItems.map((obj, index) => {
          return (
            <Chip
              key={index}
              label={obj.value}
              color={obj.isChecked == true ? "primary" : "default"}
              onClick={() => addLanguageItems(obj)} />
          )
        })}
      </div>
      <Typography>Resolution</Typography>
      <div className={classes.chips}>
        {resolutionItems.map((obj, index) => {
          return (
            <Chip
              key={index}
              label={obj.value}
              color={obj.isChecked == true ? "primary" : "default"}
              onClick={() => addResolutionItems(obj)} />
          )
        })}
      </div>

    </div>

  )
}

export default FilterChips