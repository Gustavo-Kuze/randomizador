import types from './types/listsTypes'

export const addList = (list) => {
    return {
        type: types.ADD_LIST_SAGA,
        payload: list
    }
}

export const setLists = (lists) => {
    return {
        type: types.SET_LISTS_SAGA,
        payload: lists
    }
}

export const removeList = (id) => {
    return {
        type: types.REMOVE_LIST_SAGA,
        payload: id
    }
}

export const editListName = (list, name) => {
    return {
        type: types.EDIT_LIST_NAME_SAGA,
        payload: {list, name}
    }
}

export const addItem = (list) => {
    return {
        type: types.ADD_ITEM_SAGA,
        payload: list
    }
}

export const removeItem = (item, listId) => {
    return {
        type: types.REMOVE_ITEM,
        payload: { item, listId }
    }
}

export const editItemText = (item, listId) => {
    return {
        type: types.EDIT_ITEM_TEXT,
        payload: { item, listId }
    }
}

export const setItemEnabledState = (item, listId) => {
    return {
        type: types.SET_ITEM_ENABLED_STATE,
        payload: { item, listId }
    }
}

export const setAllItemsEnabledState = (enabled, listId) => {
    return {
        type: types.SET_ALL_ITEMS_ENABLED_STATE,
        payload: { enabled, listId }
    }
}