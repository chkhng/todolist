import React from 'react';
import {  DatePicker, Space,Typography} from 'antd';
// import moment from 'moment'; 

const { Text } = Typography;

const onOk = (value) => {
    console.log('onOk: ', value);
  };
const Task = ({ onDateChange, initialValue }) => {
  return <Space direction="vertical" size={12}>
  <Text className="font" style={{ textAlign: 'left' }}>Deadline:</Text>
  <DatePicker
    showTime
    onChange={(value) => {
      onDateChange(value);
    }}
    onOk={onOk}
    value={initialValue ? initialValue : null}
    />
</Space>
};
export default Task
