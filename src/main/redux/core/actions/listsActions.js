import types from './types/listsTypes'

export const addList = () => {
    return {
        type: types.ADD_LIST
    }
}

export const removeList = (list) => {
    return {
        type: types.REMOVE_LIST,
        payload: list
    }
}

export const editListName = (list) => {
    return {
        type: types.EDIT_LIST_NAME,
        payload: list
    }
}

export const addItem = (listId) => {
    return {
        type: types.ADD_ITEM,
        payload: listId
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