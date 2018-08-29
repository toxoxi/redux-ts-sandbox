import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "./action";

interface ITask {
  id: number;
  text: string;
  done: boolean;
}

export interface ITodoState {
  tasks: ITask[];
}

export const initialReduceTodoState: ITodoState = {
  tasks: [
    {
      done: false,
      id: 1,
      text: "initial task"
    }
  ]
};

let idCounter: number = 1;

const buildTask = (text: string): ITask => ({
  done: false,
  id: ++idCounter,
  text
});

const updateDone = (tasks: ITask[], taskId: number): ITask[] =>
  tasks.map(task => {
    if (task.id === taskId) {
      task.done = true;
    }
    return task;
  });

export default reducerWithInitialState(initialReduceTodoState)
  .case(actions.addTodo, (state: ITodoState, payload) => ({
    ...state,
    tasks: state.tasks.concat(buildTask(payload))
  }))
  .case(actions.deleteTodo, (state: ITodoState, payload) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== payload)
  }))
  .case(actions.updateDoneTodo, (state: ITodoState, payload) => ({
    ...state,
    tasks: updateDone(state.tasks, payload)
  }))
  .build();
