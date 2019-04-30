import types from '../actions/types/listsTypes'

const STATE = []

let listIdCounter = 0
let itemIdCounter = 0

export default (state = STATE, action) => {
    let id = 0
    let items = []
    let lists = []
    let list = {}

    switch (action.type) {
        case types.ADD_LIST:
            id = listIdCounter = (listIdCounter += 1)
            return [...state, { id, name: '' }]
        case types.REMOVE_LIST:
            return state.filter(l => l.id !== action.payload.id)
        case types.EDIT_LIST_NAME:
            lists = state.map(s => s.id === action.payload.id ? action.payload : s)
            return lists
        case types.ADD_ITEM:
            id = itemIdCounter = (itemIdCounter += 1)
            lists = state.map(l => {
                if (l.id === action.payload) {
                    if (l.items) {
                        l.items = [...l.items, { id, text: '', enabled: true }]
                    } else {
                        l.items = [{ id, text: '', enabled: true }]
                    }
                }
                return l
            })
            return lists
        case types.REMOVE_ITEM:
            list = state.find(l => l.id === action.payload.listId)
            items = list.items.filter(i => i.id !== action.payload.item.id)
            return state.map(l => l.id === action.payload.listId ? { ...l, items: items } : l)
        case types.EDIT_ITEM_TEXT:
            list = state.find(l => l.id === action.payload.listId)
            items = list.items.map(i => i.id === action.payload.item.id
                ? { ...i, text: action.payload.item.text } : i)
            return state.map(l => l.id === action.payload.listId ? { ...l, items: items } : l)
        case types.SET_ITEM_ENABLED_STATE:
            list = state.find(l => l.id === action.payload.listId)
            items = list.items.map(i => i.id === action.payload.item.id ?
                { ...i, enabled: action.payload.item.enabled } : i)
            return state.map(l => l.id === action.payload.listId ? { ...l, items: items } : l)
        case types.SET_ALL_ITEMS_ENABLED_STATE:
            list = state.find(l => l.id === action.payload.listId)
            if(list.items){
                items = list.items.map(i => ({ ...i, enabled: action.payload.enabled }))
                return state.map(l => l.id === action.payload.listId ? { ...l, items } : l)
            }
            return state
        default:
            return state
    }
}