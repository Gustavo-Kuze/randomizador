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
            let newState = state.map(s => {
                if (s.id === action.payload.id)
                    return action.payload
                return s
            })
            return newState
        case "ADD_ITEM":
            let idItem = itemIdCounter = (itemIdCounter += 1)

            let stateWithItem = state.map(l => {
                if(l.id === action.payload){
                    l.items = [...l.items, { id: idItem, text: '', enabled: true }]
                }
                return l
            })
            return stateWithItem
        case "REMOVE_ITEM":
            return state
        case "EDIT_ITEM_NAME":
            return state
        case "SET_ITEM_ENABLED_STATE":
            return state
        default:
            return state
    }
}