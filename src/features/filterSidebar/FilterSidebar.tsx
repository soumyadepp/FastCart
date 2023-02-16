import React, { useState } from 'react'
import styles from './FilterSidebar.module.css';
import { SortOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleSortFilter, resetSortFilter, selectFilter, SortingAttributeEnum, SortTypeEnum } from './filterSlice';
import { Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { toast } from 'react-hot-toast';


export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const [priceSortOrder, setPriceSortOrder] = useState(useAppSelector(selectFilter).priceSortOrder);
  const [ratingSortOrder, setRatingSortOrder] = useState(useAppSelector(selectFilter).ratingSortOrder);
  const sortHandlerMap = new Map<SortingAttributeEnum, React.Dispatch<React.SetStateAction<SortTypeEnum | null>>>();
  sortHandlerMap.set(SortingAttributeEnum.price, setPriceSortOrder);
  sortHandlerMap.set(SortingAttributeEnum.rating, setRatingSortOrder);

  const handleSortChange = (e: any, attribute: SortingAttributeEnum) => {
    handleReset(e,false);
    const orderRequired = e.target.value;
    const functionToInvoke = sortHandlerMap.get(attribute);
    if (orderRequired === SortTypeEnum.asc) {
      dispatch(handleSortFilter({
        sortType: SortTypeEnum.asc,
        basedOn: attribute
      }));
      if (functionToInvoke) functionToInvoke(SortTypeEnum.asc);
    }
    else if (orderRequired === SortTypeEnum.desc || orderRequired === null) {
      dispatch(handleSortFilter({
        sortType: SortTypeEnum.desc,
        basedOn: attribute
      }));
      if (functionToInvoke) functionToInvoke(SortTypeEnum.desc);
    }
  }

  const handleReset = (e: any,toastShowFlag?:boolean) => {
    if (shouldBeDisabled()) return;
    if(toastShowFlag) toast.success('Filters Removed');
    setPriceSortOrder(null);
    setRatingSortOrder(null);
    dispatch(resetSortFilter());
  }

  const shouldBeDisabled = (): boolean => {
    return priceSortOrder === null && ratingSortOrder === null;
  }

  return (
    <div className={styles.filterSidebarWrapper}>
      <div className={styles.filterSidebarBody}>
        <div className={styles.sortFilterWrapper}>
          <div className={styles.sortFilterHeader}>
            <div className={styles.sortHeader}>
              <button className={shouldBeDisabled() ? styles.disabledButton : styles.resetFilterButton}
                onClick={e => handleReset(e,true)}>Reset Filters</button>
            </div>
          </div>
          <Divider/>
          <div className={styles.sortFilterHeader}>
            <h3>Sort By</h3>
            <SortOutlined/>
          </div>
          <div className={styles.sortFilterBody}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={priceSortOrder}
                onChange={e => handleSortChange(e, SortingAttributeEnum.price)}
              >
                <FormControlLabel sx={{ mt: 1 }} value={SortTypeEnum.asc} control={<Radio color='error' size='small' />} label="Low to High" />
                <FormControlLabel sx={{ mt: 1 }} value={SortTypeEnum.desc} control={<Radio color='error' size='small' />} label="High to Low" />
              </RadioGroup>
            </FormControl>
          </div>
          <Divider/>
          <div className={styles.sortFilterBody}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Rating</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={ratingSortOrder}
                onChange={e => handleSortChange(e, SortingAttributeEnum.rating)}
              >
                <FormControlLabel sx={{ mt: 1 }} value={SortTypeEnum.asc} control={<Radio color='error' size='small' />} label="Low to High" />
                <FormControlLabel sx={{ mt: 1 }} value={SortTypeEnum.desc} control={<Radio color='error' size='small' />} label="High to Low" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  )
}
