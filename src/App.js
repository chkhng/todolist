import { Button, DatePicker, Form, Input, Space, Table, Typography } from 'antd';
import React from 'react';
import './App.css';
const { Text } = Typography;

const onOk = (value) => {
  console.log('onOk: ', value);
};

const Task = () => (
  <Space direction="vertical" size={12}>
    <Text style={{ textAlign: 'left' }}>Deadline</Text>
    <DatePicker
      showTime
      onChange={(value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }}
      onOk={onOk}
    />
  </Space>
);

const App = () => {
  const [form] = Form.useForm();

  const dataSource = [
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
  ];

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
          <Button type="primary" style={{ marginRight: 8 }}>Edit</Button>
          <Button type="primary" danger>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>To-Do List</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div style={{ width: '60%'}}>
          <h1 style={{ textAlign: 'center' }}>To-Do List</h1>
          <Table pagination={false} className="custom-table" dataSource={dataSource} columns={columns} />
        </div>
        <div style={{ width: '38%'}}>
          <h1 style={{ textAlign: 'center' }}>Add Task</h1>
          <Form form={form} layout={'horizontal'} style={{ maxWidth: '100%', margin: '0 auto' , backgroundColor: 'lightgray' }}>
            <Form.Item label="Task" name="task" rules={[{ message: 'Enter Task' }]}>
            </Form.Item>
            <Input />
            <Form.Item label="Status" name="status" rules={[{ message: 'Enter Status' }]}>
            </Form.Item>
            <Input />
            <Task />
            <Form.Item>
              <Button type="primary" style={{ background: "darkgreen", marginTop: '20px' }} htmlType="submit">
                Add Task
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;
