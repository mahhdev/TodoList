import styles from "./Task.module.css";
import clipboard from "../assets/clipboard.svg";
import { PlusCircle, Trash } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";

export interface taskProps {
  key: string;
  text: string;
  status: boolean;
}

export function Task() {
  const [newTaskText, setNewTaskText] = useState("");

  const [tasks, setTasks] = useState<taskProps[]>([]);

  const [taskCount, setTaskCount] = useState(0);

  const [taskCompletedCount, setTaskCompletedCount] = useState(0);

  function handleCompletedTask(task: taskProps) {
    const items = [...tasks];
    items[items.findIndex(el => el.key === task.key)] = {...task, status: !task.status};
    setTasks(items);
  }

  function handleCreateNewTask() {
    const newTask = {
      key: Math.random().toString(36).substr(2, 9),
      text: newTaskText,
      status: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleDeleteTask(key: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.key !== key;
    });
    setTasks(tasksWithoutDeletedOne);
  }

  useEffect(() => {
    setTaskCount(tasks.length);
    setTaskCompletedCount(tasks.filter((task) => task.status === true).length);
  }, [tasks]);

  return (
    <>
      <div className={styles.mainContainer}>

        <div className={styles.newTaskContainer}>
          <input
            type="text"
            name="Task"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
          />
          <button type="submit" onClick={handleCreateNewTask}>
            Criar
            <PlusCircle size={20} />
          </button>
        </div>

      <section className={styles.titleContainer}>
        <div className={styles.title}>
          <strong>Tarefas criadas: <a className={styles.badge}>{taskCount}</a></strong>
          {
            taskCount > 0 
              ? <strong>Concluídas: <a className={styles.badge}>{taskCompletedCount} de {taskCount}</a></strong> 
              : <strong>Concluídas: <a className={styles.badge}>{taskCount}</a></strong>
          }
        </div>  
      </section>


        <div className={styles.container}>
          {tasks.length > 0 ? (
            <>
              <main>
                <div className={styles.tasksContainer}>
                  {tasks.map((task) => (
                    <div key={task.key} className={styles.task}>
                       <div className={styles.round}>
                          <input id={task.key} type="checkbox" onChange={() => handleCompletedTask(task)}/>
                          <label htmlFor={task.key}></label>
                        </div>

                        {task.status 
                          ? <p key={task.key} className={styles.completed}>{task.text}</p>
                          : <p key={task.key}>{task.text}</p>
                        }
                      
                        <button
                          title="Deletar Task"
                          onClick={() => handleDeleteTask(task.key)}
                        >
                        <Trash size={24} />
                      </button>
                    </div>
                  ))}
                </div>
              </main>
            </>
          ) : (
            <main>
              <div className={styles.withoutTasks}>
                <img src={clipboard} alt="clipboard" width={56} height={56} />
                <div>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>

    </>
  )
}
