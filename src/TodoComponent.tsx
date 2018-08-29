import * as React from "react";
import { Dispatch } from "redux";
import { addTodo, deleteTodo, updateDoneTodo } from "./action";
import { ITodoState } from "./reducer";

interface IProps extends ITodoState {
  dispatch: Dispatch<any>;
}

interface IState {
  text: string;
}

/* tslint:disable:jsx-no-lambda */
export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      text: ""
    };
  }

  public addTodo = () => {
    this.props.dispatch(addTodo(this.state.text));
  };

  public renderDoneBtn = (taskId: number) => (
    <button
      onClick={() => {
        this.props.dispatch(updateDoneTodo(taskId));
      }}
    >
      DONE
    </button>
  );

  public renderDeleteBtn = (taskId: number) => (
    <button
      onClick={() => {
        this.props.dispatch(deleteTodo(taskId));
      }}
    >
      Delete
    </button>
  );

  public renderDone = (done: boolean) => (done ? <span>done!</span> : null);

  public renderTodoList = () =>
    this.props.tasks.map(task => (
      <li key={task.id.toString()}>
        <span>{task.id}</span>
        <span>{task.text}</span>
        {this.renderDeleteBtn(task.id)}
        {this.renderDoneBtn(task.id)}
        {this.renderDone(task.done)}
      </li>
    ));

  public render() {
    return (
      <section style={{ width: "500px", margin: "0 auto" }}>
        <h1>MY TODO LIST</h1>
        <input
          type="text"
          value={this.state.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ text: e.currentTarget.value });
          }}
        />
        <button
          onClick={() => {
            this.addTodo();
          }}
        >
          Add Todo
        </button>
        <ul>{this.renderTodoList()}</ul>
      </section>
    );
  }
}
