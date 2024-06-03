import React from 'react';
import {  DatePicker, Space,Typography} from 'antd';
import moment from 'moment'; 

const { Text } = Typography;

const onOk = (value) => {
    console.log('onOk: ', value);
  };
const Task = ({ onDateChange, initialValue }) => (
    <Space direction="vertical" size={12}>
      <Text className="font" style={{ textAlign: 'left' }}>Deadline:</Text>
      <DatePicker
      
        showTime
        onChange={(_value, dateString) => {
          onDateChange(dateString);
        }}
        onOk={onOk}
        value={initialValue ? moment(initialValue, 'MM/DD/YYYY, h:mm:ss A') : null}
      />
    </Space>
  );
export default Task
