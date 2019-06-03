export const types = {
    ADD_LIST: "ADD_LIST",
    SET_LISTS: "SET_LISTS",
    REMOVE_LIST: "REMOVE_LIST",
    EDIT_LIST_NAME: "EDIT_LIST_NAME",
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    EDIT_ITEM_TEXT: "EDIT_ITEM_TEXT",
    SET_ITEM_ENABLED_STATE: "SET_ITEM_ENABLED_STATE",
    SET_ALL_ITEMS_ENABLED_STATE: "SET_ALL_ITEMs_ENABLED_STATE",
    ADD_LIST_SAGA: "ADD_LIST_SAGA",
    SET_LISTS_SAGA: "SET_LISTS_SAGA",
    REMOVE_LIST_SAGA: "REMOVE_LIST_SAGA",
    EDIT_LIST_NAME_SAGA: "EDIT_LIST_NAME_SAGA",
    ADD_ITEM_SAGA: "ADD_ITEM_SAGA",
    REMOVE_ITEM_SAGA: "REMOVE_ITEM_SAGA",
    EDIT_ITEM_TEXT_SAGA: "EDIT_ITEM_TEXT_SAGA",
    SET_ITEM_ENABLED_STATE_SAGA: "SET_ITEM_ENABLED_STATE_SAGA",
    SET_ALL_ITEMS_ENABLED_STATE_SAGA: "SET_ALL_ITEMs_ENABLED_STATE_SAGA",
}

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_LISTS:
            return [...action.payload]
        default:
            return state
    }
}

export const creators = {
    addList: (list = null) => ({
        type: types.ADD_LIST_SAGA,
        payload: list ? { ...list, date: (new Date().toLocaleString()) } : list
    }),
    setLists: (lists) => ({
        type: types.SET_LISTS_SAGA,
        payload: lists
    }),
    removeList: (id) => ({
        type: types.REMOVE_LIST_SAGA,
        payload: id
    }),
    editListName: (list, name) => ({
        type: types.EDIT_LIST_NAME_SAGA,
        payload: { list, name }
    }),
    addItem: (list, itemText = '') => ({
        type: types.ADD_ITEM_SAGA,
        payload: { itemText, list }
    }),
    removeItem: (item, list) => ({
        type: types.REMOVE_ITEM_SAGA,
        payload: { item, list }
    }),
    editItemText: (item, list) => ({
        type: types.EDIT_ITEM_TEXT_SAGA,
        payload: { item, list }
    }),
    setItemEnabledState: (item, list) => ({
        type: types.SET_ITEM_ENABLED_STATE_SAGA,
        payload: { item, list }
    }),
    setAllItemsEnabledState: (enabled, list) => ({
        type: types.SET_ALL_ITEMS_ENABLED_STATE_SAGA,
        payload: { enabled, list }
    }),
}