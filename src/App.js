import { Button, Form, Input, Table, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';
import Task from './Task.js';

const loadData = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};


const saveData = (data) => {
  localStorage.setItem('tasks', JSON.stringify(data));
};

const App = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(loadData());
  const [editingTask, setEditingTask] = useState(null);
  const [deadline, setDeadline] = useState(null);

  useEffect(() => {
    saveData(dataSource);
  }, [dataSource]);


  const handleAddTask = (values) => {
    const newTask = {
      key: `${dataSource.length + 1}`,
      task: values.task,
      status: values.status,
      deadline: deadline,
    };
    setDataSource([...dataSource, newTask]);
    form.resetFields();
    setDeadline(null);
  };

  const handleDeleteTask = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleEditTask = (record) => {
    setEditingTask(record);
    form.setFieldsValue(record);
    setDeadline(record.deadline);
  };

  const handleUpdateTask = (values) => {
    setDataSource(
      dataSource.map((item) =>
        item.key === editingTask.key
          ? { ...item, task: values.task, status: values.status, deadline: deadline }
          : item
      )
    );
    setEditingTask(null);
    form.resetFields();
    setDeadline(null);
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <span>
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => handleEditTask(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDeleteTask(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>To-Do List</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ width: '60%', height: '40px' }}>
          <h1 style={{ textAlign: 'center' }}>To-Do List</h1>
          <Table pagination={false} className="custom-table" dataSource={dataSource} columns={columns} bordered />
        </div>
        <div style={{ width: '38%' }}>
          <h1 style={{ textAlign: 'center' }}>{editingTask ? 'Edit Task' : 'Add Task'}</h1>
          <Form
            form={form}
            layout={'horizontal'}
            style={{ maxWidth: '100%', margin: '0 auto', backgroundColor: '#f0f0f0' }}
            onFinish={editingTask ? handleUpdateTask : handleAddTask}
          >
            <Form.Item
              className="font"
              label="Task"
              name="task"
              rules={[{ required: true, message: 'Enter Task' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="font"
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Select Status' }]}
            >
              <Select>
                <Select.Option value="Completed">Completed</Select.Option>
                <Select.Option value="Ongoing">Ongoing</Select.Option>
                <Select.Option value="Pending">Pending</Select.Option>
              </Select>
            </Form.Item>

            <Task onDateChange={setDeadline} initialValue={deadline} />
            <Form.Item>
              <Button type="primary" style={{ background: 'darkgreen', marginTop: '20px' }} htmlType="submit">
                {editingTask ? 'Update Task' : 'Add Task'}
              </Button>
              {editingTask && (
                <Button
                  style={{ marginLeft: '10px', marginTop: '20px' }}
                  onClick={() => {
                    setEditingTask(null);
                    form.resetFields();
                    setDeadline(null);
                  }}
                >
                  Cancel
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;
