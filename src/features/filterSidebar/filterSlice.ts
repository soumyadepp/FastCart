import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export enum SortTypeEnum {
    asc = "SORT_ASC",
    desc = "SORT_DESC"
};

export enum SortingAttributeEnum {
    rating = 'RATING',
    price = 'PRICE'
};

export interface SortState {
    sortByAttribute: SortingAttributeEnum | null;
    priceSortOrder: SortTypeEnum | null;
    ratingSortOrder: SortTypeEnum | null;
};

const initialState: SortState = {
    sortByAttribute: null,
    priceSortOrder: null,
    ratingSortOrder: null
};


export type SortActionType = {
    type: string;
    payload: {
        sortType:SortTypeEnum;
        basedOn: SortingAttributeEnum;
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        handleSortFilter: (state, action:SortActionType) => {
            const basedOn = action.payload.basedOn;
            state.sortByAttribute = basedOn;
            const order = action.payload.sortType;
            console.log(basedOn);
            console.log(order);
            if(basedOn === SortingAttributeEnum.price) {
                state.ratingSortOrder = null;
                if(order === SortTypeEnum.asc) state.priceSortOrder = SortTypeEnum.asc;
                else state.priceSortOrder = SortTypeEnum.desc;
            }
            if(basedOn === SortingAttributeEnum.rating) {
                state.priceSortOrder = null;
                if(order === SortTypeEnum.asc) state.ratingSortOrder = SortTypeEnum.asc;
                else state.ratingSortOrder = SortTypeEnum.desc;
            }
            return;
        },
        resetSortFilter: (state) => {
            state.priceSortOrder = null;
            state.ratingSortOrder = null;
            state.sortByAttribute = null;
        }
    },
});

export const selectFilter = (state: RootState) => state.filter;

export const { handleSortFilter,resetSortFilter } = filterSlice.actions;

export default filterSlice.reducer;
