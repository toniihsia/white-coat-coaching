import React from 'react';
import { Link, hashHistory } from 'react-router-3';
// import Modal from 'react-modal';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="global-header">

                <div className="header-content">
                    <img id="web-title" src="http://res.cloudinary.com/dfrrpfeus/image/upload/v1517777016/wcc_white_mp4lww.png" />
                    <label>D.O. Residency Directory</label>
                </div>

            </div>
        );
    }
}

export default Header;
