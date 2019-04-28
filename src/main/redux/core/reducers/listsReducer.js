import types from '../actions/types/listsTypes'

const STATE = []

let listIdCounter = 0
let itemIdCounter = 0

export default (state = STATE, action) => {
    switch (action.type) {
        case types.ADD_LIST:
            let idList = listIdCounter = (listIdCounter += 1)
            return [...state, { id: idList, name: '' }]
        case types.REMOVE_LIST:
            return state.filter(l => l.id !== action.payload.id)
        case types.EDIT_LIST_NAME:
            let newState = state.map(s => s.id === action.payload.id ? action.payload : s)
            return newState
        case types.ADD_ITEM:
            let idItem = itemIdCounter = (itemIdCounter += 1)
            let stateWithItem = state.map(l => {
                if (l.id === action.payload) {
                    if (l.items) {
                        l.items = [...l.items, { id: idItem, text: '', enabled: true }]
                    } else {
                        l.items = [{ id: idItem, text: '', enabled: true }]
                    }
                }
                return l
            })

            return stateWithItem
        case types.REMOVE_ITEM:
            let listToRemoveItem = state.find(l => l.id === action.payload.listId)
            let listCloneWithoutItem = listToRemoveItem.items.filter(i => i.id !== action.payload.item.id)
            return state.map(l => l.id === action.payload.listId ? { ...l, items: listCloneWithoutItem } : l)
        case types.EDIT_ITEM_TEXT:
            let listToEditItem = state.find(l => l.id === action.payload.listId)
            let listItemsCloneWithEditedItem = listToEditItem.items.map(i => i.id === action.payload.item.id
                ? { ...i, text: action.payload.item.text } : i)
            return state.map(l => l.id === action.payload.listId ? { ...l, items: listItemsCloneWithEditedItem } : l)
        case types.SET_ITEM_ENABLED_STATE:
            let listToSetEnabledState = state.find(l => l.id === action.payload.listId)
            let listItemsCloneWithChangedState = listToSetEnabledState.items.map(i => i.id === action.payload.item.id ?
                { ...i, enabled: action.payload.item.enabled } : i)
            return state.map(l => l.id === action.payload.listId ? { ...l, items: listItemsCloneWithChangedState } : l)
        default:
            return state
    }
}