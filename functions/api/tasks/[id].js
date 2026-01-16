export async function onRequestDelete(context) {
  const { TASK_DB } = context.env;
  
  try {
    const id = context.params.id;
    
    if (!id) {
      return Response.json({ error: 'Task ID is required' }, { status: 400 });
    }
    
    await TASK_DB.prepare(
      "DELETE FROM tasks WHERE id = ?"
    ).bind(id).run();
    
    return Response.json({ success: true, id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function onRequestPut(context) {
  const { TASK_DB } = context.env;
  
  try {
    const id = context.params.id;
    const { reminder } = await context.request.json();
    
    if (!id) {
      return Response.json({ error: 'Task ID is required' }, { status: 400 });
    }
    
    const result = await TASK_DB.prepare(
      "UPDATE tasks SET reminder = ? WHERE id = ? RETURNING *"
    ).bind(reminder ? 1 : 0, id).first();
    
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
