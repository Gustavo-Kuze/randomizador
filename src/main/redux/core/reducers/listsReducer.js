const STATE = []

let listIdCounter = 0
let itemIdCounter = 0

export default (state = STATE, action) => {
    switch (action.type) {
        case "ADD_LIST":
            let idList = listIdCounter = (listIdCounter += 1)
            return [...state, { id: idList, name: '' }]
        case "REMOVE_LIST":
            return state.filter(l => l.id !== action.payload.id)
        case "EDIT_LIST_NAME_LIST":
            let newState = state.map(s => s.id === action.payload.id ? action.payload : s)
            return newState
        case "ADD_ITEM":
            let idItem = itemIdCounter = (itemIdCounter += 1)
            let stateWithItem = state.map(l => l.id === action.payload ? l.items = [...l.items, { id: idItem, text: '', enabled: true }] : l)
            return stateWithItem
        case "REMOVE_ITEM":
            let listToRemoveItem = state.find(l => l.id === action.payload.listId)
            let listCloneWithoutItem = listToRemoveItem.filter(i => i.id !== action.payload.item.id)
            return state.map(s => s.id === action.payload.listId ? listCloneWithoutItem : s)
        case "EDIT_ITEM_NAME":
            let listToEditItem = state.find(l => l.id === action.payload.listId)
            let listCloneWithEditedItem = listToEditItem.map(i => i.id === action.payload.item.id ? action.payload.item : i)
            return state.map(s => s.id === action.payload.listId ? listCloneWithEditedItem : s)
        case "SET_ITEM_ENABLED_STATE":
            let listToSetEnabledState = state.find(l => l.id === action.payload.listId)
            let listCloneWithChangedState = listToSetEnabledState.map(i => i.id === action.payload.item.id ? action.payload.item : i)
            return state.map(s => s.id === action.payload.listId ? listCloneWithChangedState : s)
        default:
            return state
    }
}