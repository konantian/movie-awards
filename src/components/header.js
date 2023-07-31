import { Button, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/actions';

const Header = ({showMyMovieToggle}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.username);

    const handleLogout = () => {
        dispatch(logout());
        message.success(`Thanks for using our movie search system, ${username}!`);
        navigate("/");
    };

    return (
        <div className="headerContainer">
            <Button
                className="headerButton"
                type="primary"
                size="large"
                shape="round"
                onClick={() => showMyMovieToggle()}
            >
                My movies
            </Button>
            <Button
                className="headerButton"
                type="primary"
                size="large"
                shape="round"
                onClick={handleLogout}
            >
                Log Out
            </Button>
        </div>
    );
};

export default Header;
