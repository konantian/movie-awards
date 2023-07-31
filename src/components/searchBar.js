import {AutoComplete, Button, Form, Input} from 'antd';
import {SearchOutlined} from "@ant-design/icons";

const SearchBar = ({handleSearch}) => {

    return (
        <Form onFinish={handleSearch}>
            <div className="searchFormContainer" >
                <Form.Item
                    name="title"
                    className="searchBar"
                    rules={[{ required: true, message: 'Movie title cannot be empty' }]}
                >
                    <AutoComplete>
                        <Input
                            size="large"
                            placeholder="Enter a movie title"
                            prefix={<SearchOutlined className="site-form-item-icon" />}
                        />
                    </AutoComplete>
                </Form.Item>
                <Form.Item >
                    <Button className="searchButton"  type="primary" shape="round" size="large" htmlType="submit">Search</Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default SearchBar;
