import React from 'react';
import { Result } from 'antd';

const ObjectNotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, Resource not found!"
        />
    );
};

export default ObjectNotFound;