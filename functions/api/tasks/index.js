export async function onRequestGet(context) {
  const { TASK_DB } = context.env;
  
  try {
    const { results } = await TASK_DB.prepare(
      "SELECT * FROM tasks ORDER BY id DESC"
    ).all();
    
    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { TASK_DB } = context.env;
  
  try {
    const task = await context.request.json();
    
    const result = await TASK_DB.prepare(
      "INSERT INTO tasks (text, day, reminder) VALUES (?, ?, ?) RETURNING *"
    ).bind(task.text, task.day, task.reminder ? 1 : 0).first();
    
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

