import types from './types/listsTypes'

export const addList = () => {
    return {
        type: types.ADD_LIST_SAGA
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

export const removeItem = (item, list) => {
    return {
        type: types.REMOVE_ITEM_SAGA,
        payload: { item, list }
    }
}

export const editItemText = (item, list) => {
    return {
        type: types.EDIT_ITEM_TEXT_SAGA,
        payload: { item, list }
    }
}

export const setItemEnabledState = (item, list) => {
    return {
        type: types.SET_ITEM_ENABLED_STATE_SAGA,
        payload: { item, list }
    }
}

export const setAllItemsEnabledState = (enabled, list) => {
    return {
        type: types.SET_ALL_ITEMS_ENABLED_STATE_SAGA,
        payload: { enabled, list }
    }
}