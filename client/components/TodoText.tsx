import { useState } from 'react'
import useTasks from '../hooks/useTasks'
import { ITask } from '../../models/taskModel'

function TodoText({ task }: { task: ITask }) {
  const [isEditing, setIsEditing] = useState(false)
  const { editMutation } = useTasks()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newText = form.get('text') as string
    editMutation.mutate({ ...task, text: newText })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="text"
          className="new-todo edit"
          required
          autoFocus={true}
          defaultValue={task.text}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsEditing(false)
          }}
        />
      </form>
    )
  } else {
    return (
      <label
        htmlFor="toggle"
        onDoubleClick={() => {
          setIsEditing(true)
        }}
      >
        {task.text}
      </label>
    )
  }
}
export default TodoText
