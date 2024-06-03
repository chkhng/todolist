import { Button, DatePicker, Form, Input, Space, Table, Typography} from 'antd';
import React, { useState } from 'react';
import './App.css';

const { Text } = Typography;

const onOk = (value) => {
  console.log('onOk: ', value);
};

const Task = ({ onDateChange }) => (
  <Space direction="vertical" size={12}>
    <Text className="font" style={{ textAlign: 'left' }}>Deadline:</Text>
    <DatePicker
      showTime
      onChange={(value, dateString) => {
        onDateChange(dateString);
      }}
      onOk={onOk}
    />
  </Space>
);

const App = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      task: 'Complete Assignment',
      status: 'Completed',
      time: '10/11/2023, 12:00:00 PM',
    },
    {
      key: '2',
      task: 'Submit Project',
      status: 'Completed',
      time: '10/11/2023, 5:22:00 PM',
    },
    {
      key: '3',
      task: 'Practice DSA',
      status: 'Ongoing',
      time: '10/11/2023, 7:00:00 PM',
    },
    {
      key: '4',
      task: 'Fix the bug',
      status: 'Pending',
      time: '10/11/2023, 8:30:00 PM',
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const handleAddTask = (values) => {
    const newTask = {
      key: `${dataSource.length + 1}`,
      task: values.task,
      status: values.status,
      time: deadline,
    };
    setDataSource([...dataSource, newTask]);
    form.resetFields();
  };

  const handleDeleteTask = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleEditTask = (record) => {
    setEditingTask(record);
    form.setFieldsValue(record);
    setDeadline(record.time);
  };

  const handleUpdateTask = (values) => {
    setDataSource(
      dataSource.map((item) =>
        item.key === editingTask.key
          ? { ...item, task: values.task, status: values.status, time: deadline }
          : item
      )
    );
    setEditingTask(null);
    form.resetFields();
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
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
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
          <Table pagination={false} className="custom-table" dataSource={dataSource} columns={columns} bordered/>
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
              rules={[{message: 'Enter Task' }]}
            >
            <pre>
            <Input />
            </pre>
            </Form.Item>
            <Form.Item
              className="font"
              label="Status"
              name="status"
              rules={[{ message: 'Enter Status' }]}
            >
            <pre>
            <Input />
            </pre>
            </Form.Item>

            <pre><Task onDateChange={setDeadline} /></pre>
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
