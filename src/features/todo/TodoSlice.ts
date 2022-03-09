import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface TodoState {
    id: number,
    text: string,
    state: boolean
}

const initialState = [] as TodoState[];

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        insert: (state, action: PayloadAction<string>) => {
            if (action.payload) {
                const index = state.findIndex((i) => i.text === action.payload) === -1 ? true : false;
                if (index) {
                    const item: TodoState = {
                        id: Date.now(),
                        text: action.payload,
                        state: false,
                    }
                    state.push(item);
                } else {
                    alert('exist !');
                }
            } else {
                alert('please fill out !')
            }
        },
        changeState: (state, action: PayloadAction<{ state: boolean, id: number, text: string }>) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state[index].state = action.payload.state
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1)
        },
        editTodo: (state, action: PayloadAction<{ id: number, text: string }>) => {
            if (action.payload.text) {
                const index = state.findIndex((item) => item.id === action.payload.id);
                state[index].text = action.payload.text
            }else{
                alert("please enter your text")
            }
        }
    }
})

export const { insert, changeState, deleteTodo, editTodo } = todoSlice.actions
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;



