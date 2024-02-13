

import { applySnapshot, getParent, types } from "mobx-state-tree";

const Todo = types.model('todoMOdel', {
    id: types.number,
    task: types.string,
    status: types.boolean
})

const TodoModel = types.model('Todo', {
    todos: types.array(Todo)
})
    .actions((value) => ({
        setTask(val: any) {
            value.todos.push(val)
        },
        delTask(id: number) {
            const index = value.todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                value.todos.splice(index, 1);
            }
        },
        ComTask(id: number) {
            value.todos.map((t) => {
                if (t.id === id) {
                    console.log(t)

                    applySnapshot(t, {
                        ...t, status: true
                    })
                }
                return t;
            });
        }
    }))
    .views((value) => ({
        get allTodos() {
            return value.todos
        },
    }))


export const todos = TodoModel.create({
    todos: [],
})   